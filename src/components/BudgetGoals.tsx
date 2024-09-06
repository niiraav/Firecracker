import React, { useState } from 'react';
import { Card, Form, Input, Button, Progress, List } from 'antd';

interface Goal {
  id: string;
  name: string;
  targetAmount: number;
  currentAmount: number;
}

const BudgetGoals: React.FC = () => {
  const [goals, setGoals] = useState<Goal[]>([]);

  const onFinish = (values: any) => {
    const newGoal: Goal = {
      id: Date.now().toString(),
      name: values.name,
      targetAmount: values.targetAmount,
      currentAmount: 0,
    };
    setGoals([...goals, newGoal]);
  };

  return (
    <Card title="Budget Goals">
      <Form onFinish={onFinish} layout="inline">
        <Form.Item name="name" rules={[{ required: true }]}>
          <Input placeholder="Goal name" />
        </Form.Item>
        <Form.Item name="targetAmount" rules={[{ required: true }]}>
          <Input type="number" placeholder="Target amount" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Add Goal
          </Button>
        </Form.Item>
      </Form>
      <List
        itemLayout="horizontal"
        dataSource={goals}
        renderItem={goal => (
          <List.Item>
            <List.Item.Meta
              title={goal.name}
              description={
                <Progress 
                  percent={Math.round((goal.currentAmount / goal.targetAmount) * 100)}
                  format={() => `£${goal.currentAmount} / £${goal.targetAmount}`}
                />
              }
            />
          </List.Item>
        )}
      />
    </Card>
  );
};

export default BudgetGoals;