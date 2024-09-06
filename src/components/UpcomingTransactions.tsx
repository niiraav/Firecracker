import React from 'react';
import { Card, List, Avatar } from 'antd';
import { DollarOutlined } from '@ant-design/icons';
import { CardDetails, getUpcomingTransactions, Transaction } from './financialTypes';

interface UpcomingTransactionsProps {
  cards: CardDetails[];
  limit?: number;
}

const UpcomingTransactions: React.FC<UpcomingTransactionsProps> = ({ cards, limit = 6 }) => {
  const allTransactions = cards.flatMap(card => card.transactions);
  const upcomingTransactions = getUpcomingTransactions(allTransactions, 7);

  return (
    <Card 
      title="Coming up this week" 
      style={{ marginBottom: '24px' }}
      extra={<a href="/recurring">View All</a>}
    >
      <List
        itemLayout="horizontal"
        dataSource={upcomingTransactions.slice(0, limit)}
        renderItem={(item: Transaction) => (
          <List.Item>
            <List.Item.Meta
              avatar={item.icon ? <Avatar src={item.icon} /> : <Avatar icon={<DollarOutlined />} />}
              title={item.description}
              description={`${item.date.toLocaleDateString()} - ${item.category}`}
            />
            <div>{item.amount.toFixed(2)}</div>
          </List.Item>
        )}
      />
    </Card>
  );
};

export default UpcomingTransactions;