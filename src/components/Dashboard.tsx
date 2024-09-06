import React from 'react';
import { Layout, Row, Col } from 'antd';
import StatisticsOverview from './StatisticsOverview';
import BalanceOverview from './BalanceOverview';
import UpcomingTransactions from './UpcomingTransactions';
import MyCards from './MyCards';
import BudgetOverview from './BudgetOverview';
import ExpenseChart from './ExpenseChart';
import { CardDetails } from './financialTypes';
import { processTransaction } from './transactionUtils';

const { Content } = Layout;

interface DashboardProps {
  cards: CardDetails[];
  onCardAdded: (newCard: CardDetails) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ cards, onCardAdded }) => {
  // Process all transactions to ensure they have categories and icons
  const processedCards = cards.map(card => ({
    ...card,
    transactions: card.transactions.map(processTransaction)
  }));

  const allTransactions = processedCards.flatMap(card => card.transactions);

  return (
    <Layout>
      <Content style={{ padding: '24px' }}>
        <Row gutter={[16, 16]}>
          <Col span={16}>
            <StatisticsOverview cards={processedCards} />
            <UpcomingTransactions cards={processedCards} limit={6} />
            <ExpenseChart transactions={allTransactions} />
          </Col>
          <Col span={8}>
            <BalanceOverview cards={processedCards} />
            <MyCards cards={processedCards} onCardAdded={onCardAdded} />
            <BudgetOverview />
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

export default Dashboard;