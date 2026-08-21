'use client';
import styles from './Button.module.css';

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  href,
  ...rest
}) {
  const Component = href ? 'a' : 'button';
  const classNames = `${styles.base} ${styles[variant]} ${styles[size]} ${className}`;

  if (href) {
    return (
      <Component href={href} className={classNames} {...rest}>
        {children}
      </Component>
    );
  }

  return (
    <Component className={classNames} {...rest}>
      {children}
    </Component>
  );
}
