import React, { useState } from 'react';
import { Card, Button, Modal, Form, Input, Select, Progress, Tabs, List, Typography } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

const { Option } = Select;
const { TabPane } = Tabs;
const { Text } = Typography;

interface SavingGoal {
  id: string;
  name: string;
  target: number;
  current: number;
  cycle: 'Weekly' | 'Monthly' | 'Yearly';
  monthlySaving: number;
}

const SavingsGoals: React.FC = () => {
  const [goals, setGoals] = useState<SavingGoal[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const onFinish = (values: any) => {
    const newGoal: SavingGoal = {
      id: Date.now().toString(),
      name: values.name,
      target: values.target,
      current: 0,
      cycle: values.cycle,
      monthlySaving: values.monthlySaving,
    };
    setGoals([...goals, newGoal]);
    setIsModalVisible(false);
  };

  return (
    <Card 
      title="Savings" 
      extra={<Button type="primary" icon={<PlusOutlined />} onClick={showModal}>Add Saving</Button>}
    >
      {goals.length === 0 ? (
        <Button type="dashed" onClick={showModal} style={{ width: '100%', height: '100px' }}>
          Add Saving
        </Button>
      ) : (
        <Tabs defaultActiveKey="1">
          <TabPane tab="Active" key="1">
            <List
              dataSource={goals}
              renderItem={item => (
                <List.Item>
                  <div style={{ width: '100%' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Text strong>{item.name}</Text>
                      <Text>{`$${item.current.toFixed(2)} / $${item.target.toFixed(2)}`}</Text>
                    </div>
                    <Text type="secondary">{`Monthly Saving: $${item.monthlySaving.toFixed(2)}`}</Text>
                    <Progress percent={Math.round((item.current / item.target) * 100)} />
                  </div>
                </List.Item>
              )}
            />
          </TabPane>
          <TabPane tab="Collected" key="2">
            {/* Add collected savings logic here */}
          </TabPane>
        </Tabs>
      )}

      <Modal title="Add Saving" visible={isModalVisible} onCancel={handleCancel} footer={null}>
        <Form onFinish={onFinish} layout="vertical">
          <Form.Item name="name" label="Saving Name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="target" label="Saving Target" rules={[{ required: true }]}>
            <Input type="number" prefix="$" />
          </Form.Item>
          <Form.Item name="cycle" label="Saving Cycle" rules={[{ required: true }]}>
            <Select>
              <Option value="Weekly">Weekly</Option>
              <Option value="Monthly">Monthly</Option>
              <Option value="Yearly">Yearly</Option>
            </Select>
          </Form.Item>
          <Form.Item name="monthlySaving" label="Monthly Saving" rules={[{ required: true }]}>
            <Input type="number" prefix="$" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Add Saving
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </Card>
  );
};

export default SavingsGoals;