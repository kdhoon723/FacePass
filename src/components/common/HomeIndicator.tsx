interface HomeIndicatorProps {
  /** White bar over dark backgrounds. */
  dark?: boolean;
}

export function HomeIndicator({ dark = false }: HomeIndicatorProps) {
  return (
    <div
      style={{
        height: 34,
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'center',
        paddingBottom: 8,
      }}
    >
      <div
        style={{
          width: 134,
          height: 5,
          borderRadius: 99,
          background: dark ? '#fff' : '#000',
          opacity: dark ? 0.9 : 0.85,
        }}
      />
    </div>
  );
}
