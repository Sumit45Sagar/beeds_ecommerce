import React from 'react';
import { useShop } from '../context/ShopContext';
import { Sparkles, CheckCircle2 } from 'lucide-react';

export const QuickToast = () => {
  const { toast } = useShop();

  if (!toast) return null;

  return (
    <div style={{
      position: 'fixed',
      bottom: '28px',
      right: '28px',
      zIndex: 110,
      background: 'rgba(21, 15, 29, 0.95)',
      backdropFilter: 'blur(16px)',
      border: '1px solid rgba(217, 174, 79, 0.4)',
      boxShadow: '0 12px 32px rgba(0, 0, 0, 0.7), 0 0 20px rgba(217, 174, 79, 0.2)',
      borderRadius: '8px',
      padding: '14px 22px',
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      maxWidth: '380px',
      animation: 'fadeIn 0.25s cubic-bezier(0.16, 1, 0.3, 1)'
    }}>
      <div style={{
        width: '28px',
        height: '28px',
        borderRadius: '50%',
        background: 'rgba(217, 174, 79, 0.15)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#F5DC93',
        flexShrink: 0
      }}>
        {toast.type === 'muted' ? <CheckCircle2 size={16} /> : <Sparkles size={16} />}
      </div>
      <p style={{
        fontSize: '13px',
        fontWeight: 500,
        color: '#EDE8E1',
        margin: 0
      }}>
        {toast.message}
      </p>
    </div>
  );
};
