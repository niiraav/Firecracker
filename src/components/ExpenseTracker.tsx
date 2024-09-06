import React, { useState } from 'react';
import { Card, Form, Input, Button, Select, DatePicker, message } from 'antd';
import { Transaction, CardDetails } from './financialTypes';
import { v4 as uuidv4 } from 'uuid';

const { Option } = Select;

interface ExpenseTrackerProps {
  cards: CardDetails[];
  onExpenseAdded: (cardId: string, transaction: Transaction) => void;
}

const ExpenseTracker: React.FC<ExpenseTrackerProps> = ({ cards, onExpenseAdded }) => {
  const [form] = Form.useForm();

  const categories = [
    'Food & Dining', 'Transportation', 'Utilities', 'Entertainment', 
    'Shopping', 'Healthcare', 'Education', 'Personal', 'Travel', 'Other'
  ];

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
    form.resetFields();
  };

  return (
    <Card title="Add Expense" style={{ marginBottom: '24px' }}>
      <Form form={form} onFinish={onFinish} layout="vertical">
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
            {categories.map(category => (
              <Option key={category} value={category}>{category}</Option>
            ))}
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
    </Card>
  );
};

export default ExpenseTracker;