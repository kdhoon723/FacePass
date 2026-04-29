import { tokens } from '@/lib/tokens';

interface FPLogoProps {
  size?: number;
  color?: string;
}

/** FacePass mark — face silhouette inside a soft squircle. */
export function FPLogo({ size = 28, color = tokens.brand }: FPLogoProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <rect x="2" y="2" width="28" height="28" rx="9" fill={color} />
      <circle cx="16" cy="13" r="4" fill="#fff" />
      <path
        d="M7 25c1.6-4.2 5.1-6.5 9-6.5s7.4 2.3 9 6.5"
        stroke="#fff"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
    </svg>
  );
}
