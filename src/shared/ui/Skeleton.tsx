import styles from './Skeleton.module.css';

type SkeletonProps = {
  className?: string;
  height?: string;
  width?: string;
};

export function Skeleton({ className = '', height, width }: SkeletonProps) {
  return (
    <div
      className={`${styles.skeleton} ${className}`.trim()}
      style={{ height, width }}
      aria-hidden
    />
  );
}
