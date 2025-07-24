import React from 'react';
import { AlertCircle } from 'lucide-react';

interface ErrorNotificationProps {
  message: string;
}

/**
 * ErrorNotification component displays error messages to users
 * Features:
 * - Fixed positioning at top of screen
 * - Red styling to indicate errors
 * - Icon for visual clarity
 * - Smooth animations
 */
const ErrorNotification: React.FC<ErrorNotificationProps> = ({ message }) => {
  return (
    <div className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 bg-red-100 border border-red-400 text-red-700 px-6 py-3 rounded-md shadow-lg flex items-center gap-2 animate-in slide-in-from-top duration-300">
      <AlertCircle size={18} className="text-red-600" />
      <span className="font-medium">{message}</span>
    </div>
  );
};

export default ErrorNotification;