import type { CSSProperties } from 'react';

interface SkeletonProps {
  width?: string | number;
  height?: string | number;
  borderRadius?: string | number;
  style?: CSSProperties;
}

export default function Skeleton({ width = '100%', height = 20, borderRadius = 8, style }: SkeletonProps) {
  return (
    <div
      style={{
        width,
        height,
        borderRadius,
        background: 'linear-gradient(90deg, #E5E8EB 25%, #F2F4F6 50%, #E5E8EB 75%)',
        backgroundSize: '400% 100%',
        animation: 'skeleton-shimmer 1.4s ease infinite',
        ...style,
      }}
    />
  );
}

// Inject keyframe once
if (typeof document !== 'undefined' && !document.getElementById('skeleton-style')) {
  const style = document.createElement('style');
  style.id = 'skeleton-style';
  style.textContent = `@keyframes skeleton-shimmer { 0%{background-position:100% 50%} 100%{background-position:0% 50%} }`;
  document.head.appendChild(style);
}
