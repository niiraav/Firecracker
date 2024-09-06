import React from 'react';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { Button, Card, Layout, Typography } from 'antd';
import { GoogleOutlined } from '@ant-design/icons';
import { auth } from '../firebase';

const { Content } = Layout;
const { Title } = Typography;

const SignIn: React.FC = () => {
  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      navigate('/dashboard');
    } catch (error) {
      console.error('Error signing in with Google:', error);
    }
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Content style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Card style={{ width: 300, textAlign: 'center' }}>
          <Title level={2}>Sign In</Title>
          <Button 
            icon={<GoogleOutlined />} 
            onClick={handleGoogleSignIn}
            style={{ width: '100%' }}
          >
            Sign in with Google
          </Button>
        </Card>
      </Content>
    </Layout>
  );
};

export default SignIn;