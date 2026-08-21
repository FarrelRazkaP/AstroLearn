'use client';
import styles from './ProgressBar.module.css';

export default function ProgressBar({
  value = 0,
  variant = 'gradient',
  className = '',
  showLabel = false,
  size = 'sm'
}) {
  const clampedValue = Math.min(100, Math.max(0, value));
  
  return (
    <div className={`${styles.container} ${className}`}>
      <div className={`${styles.track} ${styles[size]}`}>
        <div 
          className={`${styles.fill} ${styles['fill' + variant.charAt(0).toUpperCase() + variant.slice(1)]} ${clampedValue === 100 && variant === 'primary' ? styles.fillComplete : ''}`} 
          style={{ width: `${clampedValue}%` }}
        />
      </div>
      {showLabel && (
        <div className={styles.label}>
          {clampedValue}%
        </div>
      )}
    </div>
  );
}
