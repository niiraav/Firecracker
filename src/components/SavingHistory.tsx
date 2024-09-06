import React from 'react';
import { Card, List, Typography } from 'antd';

const { Text } = Typography;

interface SavingHistoryItem {
  id: string;
  date: Date;
  amount: number;
}

interface SavingHistoryProps {
  history: SavingHistoryItem[];
}

const SavingHistory: React.FC<SavingHistoryProps> = ({ history }) => {
  return (
    <Card title="Saving History">
      <List
        dataSource={history}
        renderItem={item => (
          <List.Item>
            <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
              <Text>{item.date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</Text>
              <Text type="success">+${item.amount.toFixed(2)}</Text>
            </div>
          </List.Item>
        )}
      />
    </Card>
  );
};

export default SavingHistory;