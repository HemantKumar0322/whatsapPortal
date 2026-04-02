import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { App as AntdApp } from 'antd';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import AppWrapper from '@/components/AppWrapper';
// import ProtectedRoute from '@/components/ProtectedRoute';
import MainLayout from '@/components/Layout';
import LazyPage from '@/components/LazyPage';
import PageLoader from '@/components/PageLoader';
import {
  Login,
  DashboardMain,
  Conversations,
  Contacts,
  Segments,
  Broadcasts,
  Templates,
  Campaigns,
  AdsManager,
  FlowBuilder,
  Analytics,
  Affiliate,
  Tools,
  Integrations,
  Invoices,
  Settings,
  // Admin Pages
  AdminDashboard,
  UserManagement,
  UserTemplate,
  BlogManager,
  AdminAffiliates,
  AdminInvoices,
  Subscriptions,
  // Reports,
  // Team,
  NotFound,
  ForgotPassword,
  Signup,
  // LedgerItems,
  // Items,
} from './pages';

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});



function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AntdApp className="!font-montserrat">
        <Router>
          <AppWrapper>
            <Routes>

              {/* Public Routes */}
              <Route
                path="/login"
                element={
                  <LazyPage
                    fallback={<PageLoader message="Loading login..." />}
                    pageName="Login"
                  >
                    <Login />
                  </LazyPage>
                }
              />

              <Route path="/forgot-password" element={
                <LazyPage
                  fallback={<PageLoader message="Loading home..." />}
                  pageName="ForgotPassword"
                >
                  <ForgotPassword />
                </LazyPage>
              } />

              <Route path="/signup" element={
                <LazyPage
                  fallback={<PageLoader message="Loading home..." />}
                  pageName="Signup"
                >
                  <Signup />
                </LazyPage>
              } />


              {/* Protected Routes */}
              <Route path="/" element={
                // <ProtectedRoute>
                <MainLayout />
                // </ProtectedRoute>
              }>

                <Route path="/" element={
                  <LazyPage
                    fallback={<PageLoader message="Loading DashboardMain..." />}
                    pageName="DashboardMain"
                  >
                    <DashboardMain />
                  </LazyPage>
                } />

                <Route path="dashboard" element={
                  <LazyPage
                    fallback={<PageLoader message="Loading dashboard..." />}
                    pageName="DashboardMain"
                  >
                    <DashboardMain />
                  </LazyPage>
                } />

                <Route path="conversations" element={
                  <LazyPage
                    fallback={<PageLoader message="Loading conversations..." />}
                    pageName="conversations"
                  >
                    <Conversations />
                  </LazyPage>
                } />

                <Route path="contacts" element={
                  <LazyPage
                    fallback={<PageLoader message="Loading Contacts..." />}
                    pageName="Contacts"
                  >
                    <Contacts />
                  </LazyPage>
                } />

                <Route path="segments" element={
                  <LazyPage
                    fallback={<PageLoader message="Loading Segments..." />}
                    pageName="Segments"
                  >
                    <Segments />
                  </LazyPage>
                } />

                <Route path="broadcasts" element={
                  <LazyPage
                    fallback={<PageLoader message="Loading broadcasts..." />}
                    pageName="Broadcasts"
                  >
                    <Broadcasts />
                  </LazyPage>
                } />

                <Route path="templates" element={
                  <LazyPage
                    fallback={<PageLoader message="Loading templates..." />}
                    pageName="Templates"
                  >
                    <Templates />
                  </LazyPage>
                } />

                <Route path="campaigns" element={
                  <LazyPage
                    fallback={<PageLoader message="Loading campaigns..." />}
                    pageName="Campaigns"
                  >
                    <Campaigns />
                  </LazyPage>
                } />

                <Route path="ads-manager" element={
                  <LazyPage
                    fallback={<PageLoader message="Loading ads-manager..." />}
                    pageName="AdsManager"
                  >
                    <AdsManager />
                  </LazyPage>
                } />

                <Route path="flow-builder" element={
                  <LazyPage
                    fallback={<PageLoader message="Loading flow builder..." />}
                    pageName="FlowBuilder"
                  >
                    <FlowBuilder />
                  </LazyPage>
                } />

                <Route path="analytics" element={
                  <LazyPage
                    fallback={<PageLoader message="Loading analytics..." />}
                    pageName="Analytics"
                  >
                    <Analytics />
                  </LazyPage>
                } />

                <Route path="affiliate" element={
                  <LazyPage
                    fallback={<PageLoader message="Loading affiliate..." />}
                    pageName="Affiliate"
                  >
                    <Affiliate />
                  </LazyPage>
                } />

                <Route path="tools" element={
                  <LazyPage
                    fallback={<PageLoader message="Loading tools..." />}
                    pageName="Tools"
                  >
                    <Tools />
                  </LazyPage>
                } />

                <Route path="integrations" element={
                  <LazyPage
                    fallback={<PageLoader message="Loading integrations..." />}
                    pageName="Integrations"
                  >
                    <Integrations />
                  </LazyPage>
                } />

                <Route path="invoices" element={
                  <LazyPage
                    fallback={<PageLoader message="Loading invoices..." />}
                    pageName="Invoices"
                  >
                    <Invoices />
                  </LazyPage>
                } />

                <Route path="settings" element={
                  <LazyPage
                    fallback={<PageLoader message="Loading settings..." />}
                    pageName="Settings"
                  >
                    <Settings />
                  </LazyPage>
                } />

                {/* Admin Pages */}
                <Route path="/admin/dashboard" element={
                  <LazyPage
                    fallback={<PageLoader message="Loading admin dashboard..." />}
                    pageName="AdminDashboard"
                  >
                    <AdminDashboard />
                  </LazyPage>
                } />

                <Route path="/admin/user-management" element={
                  <LazyPage
                    fallback={<PageLoader message="Loading user management..." />}
                    pageName="UserManagement"
                  >
                    <UserManagement />
                  </LazyPage>
                } />

                <Route path="/admin/templates" element={
                  <LazyPage
                    fallback={<PageLoader message="Loading user templates..." />}
                    pageName="UserTemplate"
                  >
                    <UserTemplate />
                  </LazyPage>
                } />
                
                <Route path="admin/subscriptions" element={
                  <LazyPage
                    fallback={<PageLoader message="Loading subscriptions..." />}
                    pageName="Subscriptions"
                  >
                    <Subscriptions />
                  </LazyPage>
                } />
                
                <Route path="admin/invoices" element={
                  <LazyPage
                    fallback={<PageLoader message="Loading invoices..." />}
                    pageName="AdminInvoices"
                  >
                    <AdminInvoices />
                  </LazyPage>
                } />

                <Route path="/admin/blog-manager" element={
                  <LazyPage
                    fallback={<PageLoader message="Loading blog manager..." />}
                    pageName="BlogManager"
                  >
                    <BlogManager />
                  </LazyPage>
                } />

                <Route path="admin/affiliates" element={
                  <LazyPage
                    fallback={<PageLoader message="Loading affiliates..." />}
                    pageName="AdminAffiliates"
                  >
                    <AdminAffiliates />
                  </LazyPage>
                } />




                {/* 404 route - must be last */}
                <Route path="*" element={
                  <LazyPage
                    fallback={<PageLoader message="Loading..." />}
                    pageName="NotFound"
                  >
                    <NotFound />
                  </LazyPage>
                } />
              </Route>

            </Routes>
          </AppWrapper>
        </Router>
      </AntdApp>

      {/* React Query DevTools - only in development */}
      {/* {process.env.NODE_ENV === 'development' && <ReactQueryDevtools initialIsOpen={false} />} */}
    </QueryClientProvider>
  );
}

export default App;
