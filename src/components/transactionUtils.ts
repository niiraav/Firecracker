import { Transaction } from './financialTypes';
import { v4 as uuidv4 } from 'uuid';

// Simple keyword-based categorization
const categories = {
  Food: ['grocery', 'supermarket', 'food', 'market'],
  Subscriptions: ['netflix', 'spotify', 'hulu', 'disney+', 'amazon prime', 'youtube premium'],
  Dining: ['restaurant', 'cafe', 'bar', 'pub', 'bistro'],
  Transport: ['uber', 'lyft', 'taxi', 'train', 'bus', 'metro'],
  Shopping: ['mall', 'store', 'shop', 'amazon', 'ebay'],
  Utilities: ['electric', 'water', 'gas', 'internet', 'phone'],
};

export const categorizeTransaction = (description: string): string => {
  const lowerDesc = description.toLowerCase();
  for (const [category, keywords] of Object.entries(categories)) {
    if (keywords.some(keyword => lowerDesc.includes(keyword))) {
      return category;
    }
  }
  return 'Other';
};

// Branded transactions
const brandedTransactions = {
  'Netflix': { icon: '/icons/netflix-icon.png', category: 'Subscriptions' },
  'Spotify': { icon: '/icons/spotify-icon.png', category: 'Subscriptions' },
  'Amazon Prime': { icon: '/icons/amazon-prime-icon.png', category: 'Subscriptions' },
  'Uber': { icon: '/icons/uber-icon.png', category: 'Transport' },
  'Starbucks': { icon: '/icons/starbucks-icon.png', category: 'Dining' },
  // Add more branded transactions here
};

export const getBrandInfo = (description: string): { icon: string | null, category: string } => {
  for (const [brand, info] of Object.entries(brandedTransactions)) {
    if (description.toLowerCase().includes(brand.toLowerCase())) {
      return info;
    }
  }
  return { icon: null, category: categorizeTransaction(description) };
};

export const processTransaction = (transaction: Transaction): Transaction => {
  const { icon, category } = getBrandInfo(transaction.description);
  return {
    ...transaction,
    category: category,
    icon: icon
  };
};

export const generateRealtimeTransaction = (): Transaction | null => {
  if (Math.random() < 0.1) { // 10% chance of generating a transaction
    const categories = ['Groceries', 'Dining', 'Transportation', 'Entertainment', 'Utilities'];
    const category = categories[Math.floor(Math.random() * categories.length)];
    return {
      id: uuidv4(),
      date: new Date(),
      description: `${category} purchase`,
      amount: -(Math.random() * 100 + 10),
      category: category,
      type: 'expense'
    };
  }
  return null;
};