import { STATUS_CONFIG } from '../utils/helpers'

export default function StatusBadge({ status, size = 'default', isDarkMode = false }) {
  const config = STATUS_CONFIG[status] || STATUS_CONFIG['not-applied']

  const sizeClasses = {
    small: 'px-2 py-0.5 text-xs',
    default: 'px-3 py-1 text-xs',
    large: 'px-4 py-1.5 text-sm'
  }

  return (
    <span
      className={`
        inline-flex items-center rounded-pill font-medium whitespace-nowrap transition-colors duration-300
        ${sizeClasses[size]}
      `}
      style={{
        backgroundColor: isDarkMode ? config.darkBgHex : config.bgHex,
        color: isDarkMode ? config.darkTextHex : config.textHex
      }}
    >
      {config.label}
    </span>
  )
}
