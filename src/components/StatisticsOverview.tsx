import React from 'react';
import { Card, Typography, Row, Col } from 'antd';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { CardDetails, getNextPayday } from './financialTypes';

const { Title, Text } = Typography;

interface StatisticsOverviewProps {
  cards: CardDetails[];
}

const StatisticsOverview: React.FC<StatisticsOverviewProps> = ({ cards }) => {
  const allTransactions = cards.flatMap(card => card.transactions);

  // Calculate average expenses
  const expenses = allTransactions.filter(t => t.type === 'expense');
  const averageExpense = expenses.reduce((acc, t) => acc + Math.abs(t.amount), 0) / expenses.length;

  // Generate data for the chart
  const data = Array.from({ length: 6 }, (_, i) => {
    const month = new Date();
    month.setMonth(month.getMonth() - 5 + i);
    const monthTransactions = allTransactions.filter(t => 
      t.date.getMonth() === month.getMonth() && t.date.getFullYear() === month.getFullYear()
    );
    const monthlyExpense = monthTransactions.filter(t => t.type === 'expense')
      .reduce((acc, t) => acc + Math.abs(t.amount), 0);
    return {
      name: month.toLocaleString('default', { month: 'short' }),
      expenses: monthlyExpense
    };
  });

  const nextPayday = getNextPayday(allTransactions);
  const daysUntilPayday = nextPayday ? Math.ceil((nextPayday.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)) : null;

  return (
    <Card title="Statistics" style={{ marginBottom: '24px' }}>
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <Title level={4}>Average Expenses</Title>
          <Title level={2}>${averageExpense.toFixed(2)}</Title>
          <Text type="danger">+6.7% compared to last month</Text>
        </Col>
        <Col span={12} style={{ textAlign: 'right' }}>
          <Title level={4}>
            {daysUntilPayday ? `Payday in ${daysUntilPayday} days` : 'No upcoming payday'}
          </Title>
        </Col>
      </Row>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="expenses" stroke="#8884d8" name="Monthly Expenses" />
        </LineChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default StatisticsOverview;