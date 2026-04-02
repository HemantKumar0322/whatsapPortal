import { useState } from 'react';
import { Popover, Button, Menu } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';
import Sider from 'antd/es/layout/Sider';
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';

import { IconHome, IconDashboard, IconUser } from '@/utils/icons';
import { usePagePreloader } from '@/hooks/useLazyLoad';

const SliderOverlay = (props: any) => {

  const { collapsed, setCollapsed } = props;
  const { preloadPage } = usePagePreloader();
  const navigate = useNavigate();
  const location = useLocation();

  const [visible, setVisible] = useState(false);

  const handleMenuClick = ({ key }: { key: string }) => {
    // Preload the target page before navigation
    const pageName = key === '/' ? 'home' : key.slice(1); // Remove leading slash
    preloadPage(pageName);
    navigate(key);
  };

  const menuItems = [
    {
      key: '/',
      icon: <IconHome />,
      label: 'Enquiries',
    },
    {
      key: '/dashboard',
      icon: <IconDashboard />,
      label: 'Tracking',
    },
    {
      key: '/settings',
      icon: <IconUser />,
      label: 'Profile',
    },
  ];

  const content = (
    <div style={{ width: 200 }}>

      <Sider
        trigger={null}
        collapsible={true}
        collapsed={collapsed}
        breakpoint="md"
        collapsedWidth="0"
        onBreakpoint={(broken) => {
          if (broken) {
            setCollapsed(true);
          }
        }}
        className="bg-white"
      >
        <div className={`h-8 m-4 bg-white/20 rounded-lg flex items-center justify-center font-bold ${collapsed ? 'text-xs' : 'text-base'}`}>
          {collapsed ? 'SITE' : 'SITE'}
        </div>
        <Menu
          theme="light"
          mode="inline"
          selectedKeys={[location.pathname]}
          items={menuItems}
          onClick={handleMenuClick}
        />
      </Sider>
    </div>
  );

  return (
    <Popover
      content={content}
      title="Adjust Value"
      trigger="click"
      open={visible}
      onOpenChange={setVisible}
    >
      <Button
        type="text"
        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        onClick={() => setCollapsed(!collapsed)}
        className="text-base w-16 h-16 md:hidden"
      />

    </Popover>
  );
};

export default SliderOverlay;
