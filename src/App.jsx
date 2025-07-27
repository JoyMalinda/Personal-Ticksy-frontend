import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import AttendeeProfile from './pages/attendee/AttendeeProfile';
import OrgProfile from './pages/organizer/OrgProfile';
import AdminDashboard from './pages/admin/adminDash';
import Unauthorized from './pages/Unauthorized';
import Login from './pages/Login';
import Register from "./pages/Register";
import Events from './pages/Events';


import AdminProfile from './pages/admin/AdminProfile';
import UpcomingEvents from './pages/organizer/UpcomingPage';

import AttendeeUpcoming from './pages/attendee/AttUpcoming'


function ProtectedRoute({ children, roles }) {
  const user = useSelector((state) => state.auth.currentUser);

  if (!user) return <Navigate to="/login" />;
  if (roles && !roles.includes(user.role)) return <Unauthorized />;

  return children;
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/events" element={<Events />} />

        {/* Attendee Protected Routes */}
        <Route path="/attendee/:id/profile" element={
            <ProtectedRoute roles={['attendee']}>
              <AttendeeProfile />
            </ProtectedRoute>
          }
        />
        <Route path="/attendee/:id/upcoming-events" element={
            <ProtectedRoute roles={['attendee']}>
              <AttendeeUpcoming />
            </ProtectedRoute>
          }
        />

        {/* Organizer Protected Routes */}
        <Route path="/organizer/:id/dashboard" element={
            <ProtectedRoute roles={['organizer']}>
              <UpcomingEvents />
            </ProtectedRoute>
          }
        />
        <Route path="/organizer/:id/profile" element={
            <ProtectedRoute roles={['organizer']}>
              <OrgProfile />
            </ProtectedRoute>
          }
        />

        {/* Admin Protected Routes */}
        <Route
          path="/admin/:id/dashboard"
          element={
            <ProtectedRoute roles={['admin']}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/:id/profile"
          element={
            <ProtectedRoute roles={['admin']}>
              <AdminProfile />
            </ProtectedRoute>
          }
        />

        {/* Unauthorized */}
        <Route path="/unauthorized" element={<Unauthorized />} />

        {/* Catch-all: Redirect unknown routes */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
