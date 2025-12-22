import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import SaaSAdminDashboard from '../admin-dashboard/SaaSAdminDashboard';
import { Welcome } from './Welcome';

interface WelcomeScreenProps {
  onNavigate: (path: string) => void;
}

export function WelcomeScreen({ onNavigate }: WelcomeScreenProps) {
  const { user } = useAuth();
  const navigate = useNavigate();

  // Role-based rendering
  // SaaS Admin → Platform Dashboard (Executive View)
  // Tenant users → Welcome/Onboarding Dashboard
  const isSaaSAdmin = user?.role === 'saas-admin';

  if (isSaaSAdmin) {
    return <SaaSAdminDashboard />;
  }

  return <Welcome onNavigate={onNavigate} />;
}