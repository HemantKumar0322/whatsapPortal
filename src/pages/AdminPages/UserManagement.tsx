import React, { useState } from 'react';
import { Table, Tag, Space, Button, Dropdown, Tooltip, message, Avatar } from 'antd';
import { UserOutlined, DeleteOutlined } from '@ant-design/icons';
import { PageTitle } from '../../components/PageTitle';
import type { MenuProps } from 'antd';

interface UserRecord {
  key: string;
  id: string;
  name: string;
  phone: string;
  role: 'User' | 'Moderator' | 'Admin';
  joinedDate: string;
}

const UserManagement: React.FC = () => {
  const [users, setUsers] = useState<UserRecord[]>([
    {
      key: '1',
      id: '28c4035c3',
      name: 'Skylark connect',
      phone: '+91 96804 10141',
      role: 'User',
      joinedDate: '10 Mar 2026, 7:20 pm',
    },
    {
      key: '2',
      id: '570df31',
      name: 'Nexusify consulting private limited',
      phone: '9636343773',
      role: 'User',
      joinedDate: '28 Feb 2026, 11:08 am',
    },
    {
      key: '3',
      id: '67066143',
      name: 'Skylark Connect',
      phone: '9680410141',
      role: 'User',
      joinedDate: '12 Feb 2026, 3:08 pm',
    },
    {
      key: '4',
      id: '328ddd001',
      name: 'Systrcode Technologies Private Limited',
      phone: '+91-9672040455',
      role: 'Admin',
      joinedDate: '22 Dec 2025, 1:45 pm',
    },
  ]);


  const getRoleColor = (role: string) => {
    const roleColorMap: { [key: string]: string } = {
      User: 'default',
      Moderator: 'processing',
      Admin: 'error',
    };
    return roleColorMap[role] || 'default';
  };

  const handleRoleChange = (userId: string, newRole: 'User' | 'Moderator' | 'Admin') => {
    setUsers(
      users.map((user) =>
        user.key === userId ? { ...user, role: newRole } : user
      )
    );
    message.success(`User role updated to ${newRole}`);
  };

  const handleDeleteUser = (userId: string) => {
    setUsers(users.filter((user) => user.key !== userId));
    message.success('User deleted successfully');
  };

  const getRoleMenuItems = (record: UserRecord): MenuProps['items'] => [
    {
      key: 'User',
      label: 'User',
      onClick: () => handleRoleChange(record.key, 'User'),
    },
    {
      key: 'Moderator',
      label: 'Moderator',
      onClick: () => handleRoleChange(record.key, 'Moderator'),
    },
    {
      key: 'Admin',
      label: 'Admin',
      onClick: () => handleRoleChange(record.key, 'Admin'),
    },
  ];

  const columns = [
    {
      title: 'User',
      dataIndex: 'name',
      key: 'name',
      width: '30%',
      render: (_: string, record: UserRecord) => (
        <div className="flex items-center gap-3">
          <Avatar size="large" icon={<UserOutlined />} />
          <div>
            <p className="font-medium mb-0">{record.name}</p>
            <p className="text-xs text-gray-500 mb-0">{record.id}</p>
          </div>
        </div>
      ),
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
      width: '18%',
      render: (phone: string) => <span>{phone}</span>,
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
      width: '15%',
      render: (role: string, record: UserRecord) => (
        <Dropdown menu={{ items: getRoleMenuItems(record) }}>
          <Tag color={getRoleColor(role)} className="cursor-pointer hover:opacity-80">
            {role}
          </Tag>
        </Dropdown>
      ),
    },
    {
      title: 'Joined',
      dataIndex: 'joinedDate',
      key: 'joinedDate',
      width: '22%',
      render: (joinedDate: string) => <span>{joinedDate}</span>,
    },
    {
      title: 'Actions',
      key: 'actions',
      width: '20%',
      render: (_: string, record: UserRecord) => (
        <Space size="middle">
          {/* <Tooltip title="View Details">
            <Button
              type="text"
              size="small"
              icon={<InfoCircleOutlined />}
              onClick={() => setSelectedUser(record)}
            />
          </Tooltip> */}
          <Tooltip title="Delete User">
            <Button
              type="text"
              size="small"
              danger
              icon={<DeleteOutlined />}
              onClick={() => handleDeleteUser(record.key)}
            />
          </Tooltip>
        </Space>
      ),
    },
  ];

  return (
    <div className="">
      <div className="mb-6 bg-white p-6 rounded-lg shadow-sm">
        <PageTitle title="User Management" />
        <p className="text-gray-500">Manage users and their roles</p>
      </div>

      <div className="bg-white p-3 rounded-lg shadow-sm overflow-hidden">
        <Table
          columns={columns}
          dataSource={users}
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showTotal: (total) => `Total ${total} users`,
          }}
          size="middle"
          className="custom-table"
        />
      </div>
    </div>
  );
};

export default UserManagement;
