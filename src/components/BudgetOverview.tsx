import React, { useState } from 'react';
import { Card, Row, Col, Button, Modal, Form, Input, Select, message } from 'antd';
import { Progress } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

const { Option } = Select;

interface Budget {
  id: string;
  name: string;
  category: string;
  icon: string;
  amount: number;
  spent: number;
  cycle: 'Weekly' | 'Monthly' | 'Yearly';
}

const BudgetOverview: React.FC = () => {
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const getColor = (percent: number) => {
    if (percent <= 50) return '#52c41a';
    if (percent <= 75) return '#faad14';
    return '#f5222d';
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const onFinish = (values: any) => {
    const newBudget: Budget = {
      id: Date.now().toString(),
      name: values.name,
      category: values.category,
      icon: values.icon,
      amount: values.amount,
      spent: 0,
      cycle: values.cycle,
    };
    setBudgets([...budgets, newBudget]);
    setIsModalVisible(false);
    message.success('Budget added successfully');
  };

  return (
    <Card 
      title="Budgets" 
      extra={<Button type="primary" icon={<PlusOutlined />} onClick={showModal}>Add Budget</Button>}
    >
      {budgets.length === 0 ? (
        <Button type="dashed" onClick={showModal} style={{ width: '100%', height: '100px' }}>
          Add Budget
        </Button>
      ) : (
        <Row gutter={[16, 16]} justify="space-around">
          {budgets.map((budget) => {
            const percent = (budget.spent / budget.amount) * 100;
            const color = getColor(percent);
            return (
              <Col key={budget.id}>
                <Progress
                  type="circle"
                  percent={percent}
                  format={() => (
                    <span>
                      {budget.icon}<br />
                      £{budget.amount - budget.spent}
                    </span>
                  )}
                  width={80}
                  strokeColor={color}
                />
              </Col>
            );
          })}
        </Row>
      )}

      <Modal title="Add Budget" visible={isModalVisible} onCancel={handleCancel} footer={null}>
        <Form onFinish={onFinish} layout="vertical">
          <Form.Item name="name" label="Budget Name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="category" label="Budget Category" rules={[{ required: true }]}>
            <Select>
              <Option value="Travel">Travel ✈️</Option>
              <Option value="Shopping">Shopping 🛍️</Option>
              <Option value="Food">Food 🍔</Option>
              <Option value="Groceries">Groceries 🍎</Option>
              <Option value="Coffee">Coffee ☕</Option>
            </Select>
          </Form.Item>
          <Form.Item name="amount" label="Budget Amount" rules={[{ required: true }]}>
            <Input type="number" prefix="£" />
          </Form.Item>
          <Form.Item name="cycle" label="Budget Cycle" rules={[{ required: true }]}>
            <Select>
              <Option value="Weekly">Weekly</Option>
              <Option value="Monthly">Monthly</Option>
              <Option value="Yearly">Yearly</Option>
            </Select>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Add Budget
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </Card>
  );
};

export default BudgetOverview;