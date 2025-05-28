import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css'
import { AuthProvider } from './context/AuthContext';
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';

// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import CustomerDashboard from './pages/customer/Dashboard';
import LawyerDashboard from './pages/lawyer/Dashboard';
import AdminDashboard from './pages/admin/Dashboard';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />

            {/* Customer Routes */}
            <Route path="/customer/*" element={
              <ProtectedRoute role="customer">
                <Routes>
                  <Route path="/" element={<CustomerDashboard />} />
                  <Route path="/book" element={<BookService />} />
                  <Route path="/orders" element={<MyOrders />} />
                </Routes>
              </ProtectedRoute>
            } />

            {/* Lawyer Routes */}
            <Route path="/lawyer/*" element={
              <ProtectedRoute role="lawyer">
                <Routes>
                  <Route path="/" element={<LawyerDashboard />} />
                  <Route path="/consultations" element={<Consultations />} />
                </Routes>
              </ProtectedRoute>
            } />

            {/* Admin Routes */}
            <Route path="/admin/*" element={
              <ProtectedRoute role="admin">
                <Routes>
                  <Route path="/" element={<AdminDashboard />} />
                  <Route path="/users" element={<ManageUsers />} />
                </Routes>
              </ProtectedRoute>
            } />
          </Routes>
        </Layout>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App
