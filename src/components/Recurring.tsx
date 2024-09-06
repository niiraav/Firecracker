import React from 'react';
import { Layout, Typography, List, Avatar } from 'antd';
import { DollarOutlined } from '@ant-design/icons';
import { CardDetails, getUpcomingTransactions } from './financialTypes';

const { Content } = Layout;
const { Title } = Typography;

interface RecurringProps {
  cards: CardDetails[];
}

const Recurring: React.FC<RecurringProps> = ({ cards }) => {
  const allTransactions = cards.flatMap(card => card.transactions);
  const upcomingTransactions = getUpcomingTransactions(allTransactions, 30);

  return (
    <Layout>
      <Content style={{ padding: '24px' }}>
        <Title level={2}>Recurring Transactions</Title>
        <List
          style={{ height: '400px', overflowY: 'auto' }}
          itemLayout="horizontal"
          dataSource={upcomingTransactions}
          renderItem={item => (
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
      </Content>
    </Layout>
  );
};

export default Recurring;