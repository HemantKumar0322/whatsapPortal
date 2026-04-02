import React, { Children, useState } from 'react';
import { Layout, Menu, Dropdown, Button } from 'antd';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { LogoutOutlined, MenuFoldOutlined, MenuUnfoldOutlined, BarChartOutlined } from '@ant-design/icons';

import { clearAuth, getUser } from '../services/service';
import { usePagePreloader } from '@/hooks/useLazyLoad';
import {
  IconContacts,
  IconDashboard,
  IconFile,
  IconLogout,
  IconTarget,
  IconUser,
  IconVideoCamera,
  IconWechat,
} from '@/utils/icons';

// import { LOGO_AND_NAME_IMG } from '@/utils/image';

const { Header, Sider, Content } = Layout;

// const TAG: string = 'MainLayout: ';

const MainLayout: React.FC = () => {

  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { preloadPage } = usePagePreloader();

  const menuItems = [
    {
      key: '/dashboard',
      icon: <IconDashboard />,
      label: 'Dashboard',
    },
    {
      key: '/conversations',
      icon: <IconWechat />,
      label: 'Conversations',
    },
    {
      key: '/contacts',
      icon: <IconContacts />,
      label: 'Contacts',
    },
    {
      key: '/segments',
      icon: <IconFile />,
      label: 'Segments',
    },
    {
      key: '/broadcasts',
      icon: <IconVideoCamera />,
      label: 'Broadcasts',
    },
    {
      key: '/templates',
      icon: <BarChartOutlined />,
      label: 'Templates',
    },
    {
      key: '/campaigns',
      icon: <IconTarget />,
      label: 'Campaigns',
    },
    {
      key: '/ads-manager',
      icon: <IconDashboard />,
      label: 'Ads Manager',
    },
    {
      key: '/flow-builder',
      icon: <IconFile />,
      label: 'Flow Builder',
    },
    {
      key: '/analytics',
      icon: <IconFile />,
      label: 'Analytics',
    },
    {
      key: '/affiliate',
      icon: <IconFile />,
      label: 'Affiliate',
    },
    {
      key: '/tools',
      icon: <IconFile />,
      label: 'Tools',
    },
    {
      key: '/integrations',
      icon: <BarChartOutlined />,
      label: 'Integrations',
    },
    {
      key: '/invoices',
      icon: <IconUser />,
      label: 'Invoice',
    },
    {
      key: '/settings',
      icon: <IconUser />,
      label: 'Settings',
    },
    {
      key: 'admin',
      icon: <IconUser />,
      label: 'ADMIN',
      children: [
        {
          key: '/admin/dashboard',
          icon: <IconUser />,
          label: 'Admin Dashboard',
        },
        {
          key: '/admin/user-management',
          icon: <IconUser />,
          label: 'User Management',
        },
        {
          key: '/admin/templates',
          icon: <IconUser />,
          label: 'Templates',
        },
        {
          key: '/admin/subscriptions',
          icon: <IconUser />,
          label: 'Subscriptions',
        },
        {
          key: '/admin/invoices',
          icon: <IconUser />,
          label: 'Invoice (Admin)',
        },
        {
          key: '/admin/blog-manager',
          icon: <IconUser />,
          label: 'Blog Manager',
        }
      ]
    },

  ];

  const handleMenuClick = ({ key }: { key: string }) => {
    // Preload the target page before navigation
    const pageName = key === '/' ? 'home' : key.slice(1); // Remove leading slash
    preloadPage(pageName);
    navigate(key);
  };

  const handleLogout = () => {
    clearAuth();
  };

  const profileData = getUser();

  const userMenuItems = [
    {
      key: 'profile',
      label: 'Profile',
      icon: <IconUser />,
      onClick: () => {
        preloadPage('profile');
        navigate('/profile');
      },
    },
    {
      key: 'logout',
      label: 'Logout',
      icon: <IconLogout />,
      onClick: handleLogout,
    },
  ];

  return (
    <Layout className="min-h-screen !font-montserrat">

      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        width={250}
        breakpoint="md"
        collapsedWidth="0"
        onBreakpoint={(broken) => {
          if (broken) {
            setCollapsed(true);
          }
        }}
        className="bg-[#fcfbfb] fixed left-0 top-0 h-screen z-50 flex flex-col"
      // style={{ width: "250px" }}
      >
        <div className={`h-16 mt-4 flex items-center justify-center font-bold border-b ${collapsed ? 'text-xs' : 'text-base'}`}>
          {/* {collapsed ? 'My App' : 'My App'} */}
          <img
            src="src/assets/images/avelo-logo.png"
            alt="Logo"
            className="h-16 object-contain"
          />
        </div>
        <div style={{ height: 'calc(100vh - 150px)', overflowY: 'auto' }}>
          <Menu
            theme="light"
            mode="inline"
            selectedKeys={[location.pathname]}
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            items={menuItems}
            onClick={handleMenuClick}
          />
        </div>
        <div className="border-t pt-3 pb-3 px-2">
          <Button
            type="primary"
            danger
            block
            icon={<IconLogout />}
            onClick={handleLogout}
            className="flex items-center justify-center gap-2"
          >
            {!collapsed && 'Logout'}
          </Button>
        </div>
      </Sider>

      <Layout className="!bg-[#F0F8FF]">

        <Header className=" bg-white flex items-center relative justify-center !h-[63px] fixed top-0 z-40 shadow-[0_0_8px_8px_#00000021] overflow-hidden" style={{ left: collapsed ? '0px' : '250px', right: '0px', width: collapsed ? '100%' : 'calc(100% - 250px)' }}>

          <div className="absolute left-[1rem] flex items-center gap-2">
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              className="text-base w-16 h-16"
            />
          </div>

          <div className="absolute right-[1rem] hidden md:block">
            <Dropdown
              menu={{ items: userMenuItems }}
              placement="bottomRight"
              arrow
            >

              <div className="rounded-[22px] h-[40px] flex items-center bg-white p-1 border-[1px] border-solid border-[#D3D3D3] w-[200px]">
                <div className="w-[35px] h-[35px] flex items-center justify-center overflow-hidden shrink-0">
                  <img
                    src="https://i.ibb.co/chNczQZ6/icon-7797704-1280.png"
                    alt="logo"
                    className="w-[35px] h-[35px] rounded-[50%] object-cover object-center"
                    loading="lazy"
                  />
                </div>
                <div className="ml-2 flex-1 h-full flex items-center w-[120px]">
                  <p className="text-[12px] text-[#000000] uppercase truncate shrink-0 w-full">
                    {profileData?.email || '_'}
                  </p>
                </div>
                <div className="h-full flex items-center justify-center mr-2">
                  <svg className="w-[13px] h-auto" width="16" height="10" viewBox="0 0 16 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 1.5L8 8.5L15 1.5" stroke="#1A1A1A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>
            </Dropdown>
          </div>

          <div className="absolute right-[1rem] md:hidden">
            <Button
              type="text"
              icon={<LogoutOutlined />}
              onClick={handleLogout}
              className="text-base w-16 h-16 md:hidden"
            />
          </div>

        </Header>

        <Content className="m-0 p-3 md:p-6 min-h-[280px] bg-[#F0F8FF] pt-[63px] overflow-y-auto" style={{ marginLeft: collapsed ? '0px' : '250px', height: 'calc(100vh - 63px)', maxHeight: 'calc(100vh - 63px)' }}>
          <Outlet />
        </Content>

        {/* <footer className="hidden md:block text-center text-[12px] text-gray-500 leading-[1] py-4" style={{ marginLeft: collapsed ? '0px' : '250px' }}>
          All rights reserved by UPURCHASE © 2025
        </footer> */}

      </Layout>
    </Layout>
  );
};

export default MainLayout; 