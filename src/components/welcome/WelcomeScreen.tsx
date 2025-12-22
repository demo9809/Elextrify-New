import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import TenantWelcomeDashboard from './TenantWelcomeDashboard';
import SaaSFinanceDashboard from '../saas-finance/SaaSFinanceDashboard';

interface WelcomeScreenProps {
  onNavigate: (path: string) => void;
}

export function WelcomeScreen({ onNavigate }: WelcomeScreenProps) {
  const { userRole } = useAuth();
  const navigate = useNavigate();

  // Role-based rendering
  // SaaS Admin / Host Admin → SaaS Finance Dashboard
  // Tenant users → Welcome/Onboarding Dashboard
  const isSaaSAdmin = userRole === 'saas-admin' || userRole === 'host-admin';

  if (isSaaSAdmin) {
    return <SaaSFinanceDashboard />;
  }

  return <TenantWelcomeDashboard onNavigate={onNavigate} />;
}