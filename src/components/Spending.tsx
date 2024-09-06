import React, { useState } from 'react';
import { Layout, Typography, Button, Modal, Form, Input, Select, DatePicker, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { CardDetails, Transaction } from './financialTypes';
import { v4 as uuidv4 } from 'uuid';

const { Content } = Layout;
const { Title } = Typography;
const { Option } = Select;

interface SpendingProps {
  cards: CardDetails[];
  onExpenseAdded: (cardId: string, transaction: Transaction) => void;
}

const Spending: React.FC<SpendingProps> = ({ cards, onExpenseAdded }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const onFinish = (values: any) => {
    const newTransaction: Transaction = {
      id: uuidv4(),
      date: values.date.toDate(),
      description: values.description,
      amount: -Math.abs(values.amount), // Ensure it's negative for expenses
      category: values.category,
      type: 'expense'
    };

    onExpenseAdded(values.cardId, newTransaction);
    message.success('Expense added successfully');
    setIsModalVisible(false);
  };

  return (
    <Layout>
      <Content style={{ padding: '24px' }}>
        <Title level={2}>Spending</Title>
        <Button type="secondary" icon={<PlusOutlined />} onClick={showModal}>
          Add Expense
        </Button>

        <Modal title="Add Expense" visible={isModalVisible} onCancel={handleCancel} footer={null}>
          <Form onFinish={onFinish} layout="vertical">
            <Form.Item name="cardId" label="Card" rules={[{ required: true }]}>
              <Select placeholder="Select a card">
                {cards.map(card => (
                  <Option key={card.id} value={card.id}>
                    {card.cardNumber.slice(-4)}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item name="amount" label="Amount" rules={[{ required: true }]}>
              <Input type="number" prefix="£" />
            </Form.Item>
            <Form.Item name="category" label="Category" rules={[{ required: true }]}>
              <Select placeholder="Select a category">
                {/* Add your expense categories here */}
              </Select>
            </Form.Item>
            <Form.Item name="description" label="Description" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item name="date" label="Date" rules={[{ required: true }]}>
              <DatePicker style={{ width: '100%' }} />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Add Expense
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </Content>
    </Layout>
  );
};

export default Spending;