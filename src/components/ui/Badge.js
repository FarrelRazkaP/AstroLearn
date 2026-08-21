'use client';
import styles from './Badge.module.css';

export default function Badge({
  children,
  variant = 'default',
  className = ''
}) {
  return (
    <span className={`${styles.base} ${styles[variant]} ${className}`}>
      {children}
    </span>
  );
}
