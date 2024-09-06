import React, { useState } from 'react';
import { Card, Button, Modal, Form, Input, message, Empty } from 'antd';
import { PlusOutlined, CreditCardOutlined } from '@ant-design/icons';
import { CardDetails, generateDummyTransactions, calculateBalance } from './financialTypes';
import { v4 as uuidv4 } from 'uuid';

interface MyCardsProps {
  cards: CardDetails[];
  onCardAdded: (card: CardDetails) => void;
}

const MyCards: React.FC<MyCardsProps> = ({ cards, onCardAdded }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const onFinish = (values: Omit<CardDetails, 'id' | 'transactions' | 'balance' | 'savings'>) => {
    const startDate = new Date();
    startDate.setMonth(startDate.getMonth() - 1);
    const endDate = new Date();
    endDate.setMonth(endDate.getMonth() + 1);

    const transactions = generateDummyTransactions(startDate, endDate);
    const balance = calculateBalance(transactions);

    const newCard: CardDetails = {
      ...values,
      id: uuidv4(),
      cardNumber: values.cardNumber.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim(),
      balance: balance,
      savings: Math.random() * 10000,
      transactions: transactions
    };

    onCardAdded(newCard);
    setIsModalVisible(false);
    message.success('Card added successfully');
  };

  return (
    <Card 
      title="My Cards" 
      extra={cards.length > 0 && <Button type="primary" icon={<PlusOutlined />} onClick={showModal}>Add Card</Button>}
    >
      {cards.length === 0 ? (
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          description={
            <span>
              No cards added yet. Click "Add Card" to get started.
            </span>
          }
        >
          <Button type="primary" onClick={showModal}>Add Card</Button>
        </Empty>
      ) : (
        cards.map((card) => (
          <Card.Grid style={{ width: '100%', textAlign: 'left', padding: '12px' }} key={card.id}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <CreditCardOutlined style={{ fontSize: '24px' }} />
              <span>{card.cardNumber.slice(-4)}</span>
              <span>£{card.balance.toFixed(2)}</span>
            </div>
          </Card.Grid>
        ))
      )}

      <Modal title="Add New Card" visible={isModalVisible} onCancel={handleCancel} footer={null}>
        <Form
          name="add_card"
          onFinish={onFinish}
          layout="vertical"
        >
          <Form.Item
            name="cardNumber"
            label="Card Number"
            rules={[{ required: true, message: 'Please input the card number!' }]}
          >
            <Input maxLength={19} />
          </Form.Item>
          <Form.Item
            name="cardHolder"
            label="Card Holder"
            rules={[{ required: true, message: 'Please input the card holder name!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="expiryDate"
            label="Expiry Date"
            rules={[{ required: true, message: 'Please input the expiry date!' }]}
          >
            <Input placeholder="MM/YY" maxLength={5} />
          </Form.Item>
          <Form.Item
            name="cvv"
            label="CVV"
            rules={[{ required: true, message: 'Please input the CVV!' }]}
          >
            <Input maxLength={3} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Add Card
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </Card>
  );
};

export default MyCards;