export function Leaf({ color = '#E8A94A', size = 40 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" aria-hidden="true">
      <path d="M32 54C17 44 14 24 32 8c18 16 15 36 0 46z" fill={color} />
      <path d="M32 14v40M32 30l-8-6M32 38l9-7" stroke="rgba(0,0,0,.25)" strokeWidth="2.5" strokeLinecap="round" fill="none" />
    </svg>
  )
}
