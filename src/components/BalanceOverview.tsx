import React from 'react';
import { Card, Typography, Collapse } from 'antd';
import { WalletOutlined, DollarOutlined, BankOutlined, StockOutlined } from '@ant-design/icons';
import { CardDetails } from './financialTypes';

const { Text } = Typography;
const { Panel } = Collapse;

interface BalanceOverviewProps {
  cards: CardDetails[];
}

const BalanceOverview: React.FC<BalanceOverviewProps> = ({ cards }) => {
  const totalBalance = cards.reduce((acc, card) => acc + card.balance, 0);
  const totalSavings = cards.reduce((acc, card) => acc + card.savings, 0);

  const balances = [
    { type: 'Checking', amount: totalBalance, icon: <WalletOutlined /> },
    { type: 'Net Cash', amount: totalBalance, icon: <DollarOutlined /> },
    { type: 'Savings', amount: totalSavings, icon: <BankOutlined /> },
    { type: 'Investment', amount: 0, icon: <StockOutlined /> },
  ];

  return (
    <Card title="Balance" style={{ marginBottom: '24px' }}>
      <Collapse>
        {balances.map(item => (
          <Panel 
            header={
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span>{item.icon} {item.type}</span>
                <Text strong>£{item.amount.toFixed(2)}</Text>
              </div>
            } 
            key={item.type}
          >
            {cards.map(card => (
              <div key={card.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <Text>{card.cardNumber.slice(-4)}</Text>
                <Text>£{(item.type === 'Savings' ? card.savings : card.balance).toFixed(2)}</Text>
              </div>
            ))}
          </Panel>
        ))}
      </Collapse>
    </Card>
  );
};

export default BalanceOverview;