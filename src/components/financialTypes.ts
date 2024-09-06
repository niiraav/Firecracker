import { v4 as uuidv4 } from 'uuid';
import { processTransaction, generateRealtimeTransaction } from './transactionUtils';

// ... (keep existing code)

const dummyTransactions = [
  { description: 'Netflix Subscription', amount: -13.99, type: 'expense' },
  { description: 'Spotify Premium', amount: -9.99, type: 'expense' },
  { description: 'Amazon Prime', amount: -12.99, type: 'expense' },
  { description: 'Uber Ride', amount: -15.50, type: 'expense' },
  { description: 'Starbucks Coffee', amount: -4.75, type: 'expense' },
  { description: 'Grocery Store', amount: -75.25, type: 'expense' },
  { description: 'Restaurant Dinner', amount: -45.00, type: 'expense' },
  { description: 'Gas Station', amount: -40.00, type: 'expense' },
  { description: 'Mobile Phone Bill', amount: -65.00, type: 'expense' },
  { description: 'Gym Membership', amount: -50.00, type: 'expense' },
];

export function getNextPayday(transactions: Transaction[]): Date | null {
  const today = new Date();
  const futureIncomes = transactions
    .filter(t => t.type === 'income' && t.date > today)
    .sort((a, b) => a.date.getTime() - b.date.getTime());
  return futureIncomes.length > 0 ? futureIncomes[0].date : null;
}

export function getUpcomingTransactions(transactions: Transaction[], days: number): Transaction[] {
  const today = new Date();
  const endDate = new Date(today.getTime() + days * 24 * 60 * 60 * 1000);
  return transactions.filter(transaction => transaction.date >= today && transaction.date <= endDate);
}


export function calculateBalance(transactions: Transaction[]): number {
  return transactions.reduce((acc, transaction) => 
    transaction.type === 'income' ? acc + transaction.amount : acc - transaction.amount, 0);
}

export function generateDummyTransactions(startDate: Date, endDate: Date): Transaction[] {
  const transactions: Transaction[] = [];
  let currentDate = new Date(startDate);

  while (currentDate <= endDate) {
    if (Math.random() < 0.3) {  // 30% chance of a transaction on any given day
      const randomTransaction = dummyTransactions[Math.floor(Math.random() * dummyTransactions.length)];
      transactions.push({
        id: uuidv4(),
        date: new Date(currentDate),
        description: randomTransaction.description,
        amount: randomTransaction.amount,
        type: randomTransaction.type as 'income' | 'expense',
        category: '',  // This will be filled by processTransaction
      });
    }

    currentDate.setDate(currentDate.getDate() + 1);
  }

  return transactions.map(processTransaction);
}

export function updateCardWithRealtimeTransactions(card: CardDetails): CardDetails {
  const newTransaction = generateRealtimeTransaction();
  if (newTransaction) {
    return {
      ...card,
      transactions: [...card.transactions, newTransaction],
      balance: card.balance + newTransaction.amount
    };
  }
  return card;
}

// ... (keep existing code)

export type { Transaction, CardDetails };
export { processTransaction };