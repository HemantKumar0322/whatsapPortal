import { lazy } from 'react';

// Lazy load all pages
export const Login = lazy(() => import('./Login').then(module => ({ default: module.default })));
export const Home = lazy(() => import('./Home').then(module => ({ default: module.default })));
export const DashboardMain = lazy(() => import('./DashboardMain').then(module => ({ default: module.default })));
export const Conversations = lazy(() => import('./Conversations').then(module => ({ default: module.default })));
export const Broadcasts = lazy(() => import('./Broadcasts').then(module => ({ default: module.default })));
export const Contacts = lazy(() => import('./Contacts').then(module => ({ default: module.default })));
export const Segments = lazy(() => import('./Segments').then(module => ({ default: module.default })));
export const Templates = lazy(() => import('./Templates').then(module => ({ default: module.default })));
export const Campaigns = lazy(() => import('./Campaigns').then(module => ({ default: module.default })));
export const AdsManager = lazy(() => import('./AdsManager').then(module => ({ default: module.default })));
export const FlowBuilder = lazy(() => import('./FlowBuilder').then(module => ({ default: module.default })));
export const Analytics = lazy(() => import('./Analytics').then(module => ({ default: module.default })));
export const Affiliate = lazy(() => import('./Affiliate').then(module => ({ default: module.default })));
export const Tools = lazy(() => import('./Tools').then(module => ({ default: module.default })));
export const Integrations = lazy(() => import('./Integrations').then(module => ({ default: module.default })));
export const Invoices = lazy(() => import('./Invoices').then(module => ({ default: module.default })));
export const Settings = lazy(() => import('./Settings').then(module => ({ default: module.default })));

// Admin Pages
export const AdminDashboard = lazy(() => import('./AdminPages/AdminDashboard').then(module => ({ default: module.default })));
export const UserManagement = lazy(() => import('./AdminPages/UserManagement').then(module => ({ default: module.default })));
export const UserTemplate = lazy(() => import('./AdminPages/Templates').then(module => ({ default: module.default })));
export const BlogManager = lazy(() => import('./AdminPages/BlogManager').then(module => ({ default: module.default })));
export const AdminAffiliates = lazy(() => import('./AdminPages/Affiliates').then(module => ({ default: module.default })));
export const AdminInvoices = lazy(() => import('./AdminPages/Invoices').then(module => ({ default: module.default })));
export const Subscriptions = lazy(() => import('./AdminPages/Subscriptions').then(module => ({ default: module.default })));

export const DataListing = lazy(() => import('./DataListing').then(module => ({ default: module.default })));

export const Articles = lazy(() => import('./DataListing').then(module => ({ default: module.default })));
export const Vendors = lazy(() => import('./VendorsList').then(module => ({ default: module.default })));
export const LedgerItems = lazy(() => import('./LedgerItems').then(module => ({ default: module.default })));
export const ProposedOrders = lazy(() => import('./ProposedOrders').then(module => ({ default: module.default })));
export const Items = lazy(() => import('./Items').then(module => ({ default: module.default })));

export const Reports = lazy(() => import('./Reports').then(module => ({ default: module.default })));
export const Team = lazy(() => import('./Team').then(module => ({ default: module.default })));
export const NotFound = lazy(() => import('./NotFound').then(module => ({ default: module.default }))); 
export const ForgotPassword = lazy(() => import('./ForgotPassword').then(module => ({ default: module.default })));
export const Signup = lazy(() => import('./Signup').then(module => ({ default: module.default })));
