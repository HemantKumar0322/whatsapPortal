import React from 'react';
import {
  // Login/Auth icons
  UserOutlined,
  LockOutlined,
  EyeInvisibleOutlined,
  EyeTwoTone,

  // Navigation icons
  HomeOutlined,
  DashboardOutlined,
  SettingOutlined,
  FileOutlined,
  TeamOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  LogoutOutlined,

  // Action icons
  SearchOutlined,
  EditOutlined,
  DeleteOutlined,
  DownloadOutlined,
  UploadOutlined,
  SaveOutlined,

  // Status icons
  CheckCircleOutlined,
  ClockCircleOutlined,

  // Communication icons
  MailOutlined,
  PhoneOutlined,
  LinkedinOutlined,

  // Navigation icons
  ArrowLeftOutlined,

  // Notification icons
  BellOutlined,
  SecurityScanOutlined,
  GlobalOutlined,

  // sider icons< />
  WechatWorkOutlined,
  ContactsOutlined,
  VideoCameraAddOutlined 
} from '@ant-design/icons';

import { FiTarget  } from "react-icons/fi";

// TypeScript interface for icon props
interface IconProps {
  className?: string;
  style?: React.CSSProperties;
  [key: string]: any;
}

// Login/Auth icons
export const IconUser = (props: IconProps) => <UserOutlined {...props} />;
export const IconLock = (props: IconProps) => <LockOutlined {...props} />;
export const IconEye = (props: IconProps) => <EyeInvisibleOutlined {...props} />;
export const IconEyeOpen = (props: IconProps) => <EyeTwoTone {...props} />;

// Navigation icons
export const IconHome = (props: IconProps) => <HomeOutlined {...props} />;
export const IconDashboard = (props: IconProps) => <DashboardOutlined {...props} />;
export const IconSettings = (props: IconProps) => <SettingOutlined {...props} />;
export const IconFile = (props: IconProps) => <FileOutlined {...props} />;
export const IconTeam = (props: IconProps) => <TeamOutlined {...props} />;
export const IconMenuFold = (props: IconProps) => <MenuFoldOutlined {...props} />;
export const IconMenuUnfold = (props: IconProps) => <MenuUnfoldOutlined {...props} />;
export const IconLogout = (props: IconProps) => <LogoutOutlined {...props} />;

// Action icons
export const IconSearch = (props: IconProps) => <SearchOutlined {...props} />;
export const IconEdit = (props: IconProps) => <EditOutlined {...props} />;
export const IconDelete = (props: IconProps) => <DeleteOutlined color="#ff4d4f" {...props} />;
export const IconDownload = (props: IconProps) => <DownloadOutlined {...props} />;
export const IconUpload = (props: IconProps) => <UploadOutlined {...props} />;
export const IconSave = (props: IconProps) => <SaveOutlined {...props} />;

// Status icons
export const IconCheckCircle = (props: IconProps) => <CheckCircleOutlined {...props} />;
export const IconClockCircle = (props: IconProps) => <ClockCircleOutlined {...props} />;

// Communication icons
export const IconMail = (props: IconProps) => <MailOutlined {...props} />;
export const IconPhone = (props: IconProps) => <PhoneOutlined {...props} />;
export const IconLinkedin = (props: IconProps) => <LinkedinOutlined {...props} />;

// Navigation icons
export const IconArrowLeft = (props: IconProps) => <ArrowLeftOutlined {...props} />;

// Notification icons
export const IconBell = (props: IconProps) => <BellOutlined {...props} />;
export const IconSecurityScan = (props: IconProps) => <SecurityScanOutlined {...props} />;
export const IconGlobal = (props: IconProps) => <GlobalOutlined {...props} />;

// sider icons
export const IconWechat = (props: IconProps) => <WechatWorkOutlined {...props} />;
export const IconContacts = (props: IconProps) => <ContactsOutlined {...props} />;
export const IconVideoCamera = (props: IconProps) => <VideoCameraAddOutlined {...props} />;
export const IconTarget = (props: IconProps) => <FiTarget  {...props} />;


