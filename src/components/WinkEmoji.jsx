// Lightweight CSS wink — replaces the old lottie-web player, which pulled
// in ~300 KB of JS plus a network request just for one small emoji.
export default function WinkEmoji({ size = 32, className = '' }) {
  return (
    <span
      className={`wink-emoji ${className}`.trim()}
      role="img"
      aria-label="wink"
      style={{ fontSize: size, width: size, height: size, lineHeight: 1 }}
    >
      😉
    </span>
  )
}
