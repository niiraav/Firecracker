import React from 'react';
import { Layout, Menu } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import { 
  DashboardOutlined, 
  ReconciliationOutlined, 
  DollarOutlined,
  PieChartOutlined,
  UserOutlined
} from '@ant-design/icons';
import type { MenuProps } from 'antd';

const { Sider } = Layout;

const SideNav: React.FC = () => {
  const location = useLocation();

  const menuItems: MenuProps['items'] = [
    {
      key: '/dashboard',
      icon: <DashboardOutlined />,
      label: <Link to="/dashboard">Dashboard</Link>,
    },
    {
      key: '/recurring',
      icon: <ReconciliationOutlined />,
      label: <Link to="/recurring">Recurring</Link>,
    },
    {
      key: '/spending',
      icon: <DollarOutlined />,
      label: <Link to="/spending">Spending</Link>,
    },
    {
      key: '/budget-and-savings',
      icon: <PieChartOutlined />,
      label: <Link to="/budget-and-savings">Budget & Savings</Link>,
    },
    {
      key: '/profile',
      icon: <UserOutlined />,
      label: <Link to="/profile">Profile</Link>,
    },
  ];

  return (
    <Sider width={200} className="site-layout-background">
      <Menu
        mode="inline"
        selectedKeys={[location.pathname]}
        style={{ height: '100%', borderRight: 0 }}
        items={menuItems}
      />
    </Sider>
  );
};

export default SideNav;