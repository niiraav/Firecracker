import React, { useState } from 'react';
import { Layout, Typography, Form, Input, Button, Upload, Select, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { auth } from '../firebase';

const { Content } = Layout;
const { Title } = Typography;
const { Option } = Select;

const Profile: React.FC = () => {
  const [form] = Form.useForm();
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const onFinish = (values: any) => {
    // Here you would typically send this data to your backend
    console.log('Profile updated:', values);
    message.success('Profile updated successfully');
  };

  const handleImageUpload = (info: any) => {
    if (info.file.status === 'done') {
      setImageUrl(info.file.response.url);
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  };

  const professions = ['Design', 'Finance', 'Technology', 'Healthcare', 'Education', 'Other'];

  return (
    <Layout>
      <Content style={{ padding: '24px' }}>
        <Title level={2}>Profile</Title>
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          initialValues={{
            email: auth.currentUser?.email,
          }}
        >
          <Form.Item label="Profile Picture">
            <Upload
              name="avatar"
              listType="picture-card"
              className="avatar-uploader"
              showUploadList={false}
              action="https://www.mocky.io/v2/5cc8019d300000980a055e76" // Replace with your actual upload URL
              onChange={handleImageUpload}
            >
              {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : <UploadOutlined />}
            </Upload>
          </Form.Item>
          <Form.Item name="fullName" label="Full Name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="email" label="Email" rules={[{ required: true, type: 'email' }]}>
            <Input disabled />
          </Form.Item>
          <Form.Item name="profession" label="Profession" rules={[{ required: true }]}>
            <Select placeholder="Select your profession">
              {professions.map(profession => (
                <Option key={profession} value={profession}>{profession}</Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Update Profile
            </Button>
          </Form.Item>
        </Form>
        <Button onClick={() => auth.sendPasswordResetEmail(auth.currentUser?.email || '')}>
          Change Password
        </Button>
      </Content>
    </Layout>
  );
};

export default Profile;