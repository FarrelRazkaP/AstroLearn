'use client';
import styles from './GlassPanel.module.css';

export default function GlassPanel({ 
  children, 
  variant = 'panel', 
  className = '', 
  as: Component = 'div', 
  ...rest 
}) {
  const variantClassMap = {
    'panel': 'glass-panel',
    'panel2': 'glass-panel-2',
    'card': 'glass-card',
    'active': 'glass-active'
  };

  const globalClass = variantClassMap[variant] || 'glass-panel';

  return (
    <Component className={`${styles.base} ${globalClass} ${className}`} {...rest}>
      {children}
    </Component>
  );
}
