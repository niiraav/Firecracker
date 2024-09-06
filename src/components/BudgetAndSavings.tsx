import React from 'react';
import { Layout, Row, Col } from 'antd';
import BudgetOverview from './BudgetOverview';
import SavingsGoals from './SavingsGoals';
import SavingHistory from './SavingHistory';

const { Content } = Layout;

const BudgetAndSavings: React.FC = () => {
  // Mock data for saving history
  const mockSavingHistory = [
    { id: '1', date: new Date(2023, 2, 25), amount: 500 },
    { id: '2', date: new Date(2023, 1, 15), amount: 500 },
    { id: '3', date: new Date(2023, 0, 8), amount: 500 },
  ];

  return (
    <Layout>
      <Content style={{ padding: '24px' }}>
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <BudgetOverview />
          </Col>
          <Col span={24}>
            <SavingsGoals />
          </Col>
          <Col span={24}>
            <SavingHistory history={mockSavingHistory} />
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

export default BudgetAndSavings;