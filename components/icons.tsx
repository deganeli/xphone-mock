type IconProps = { size?: number };

export function MessagesIcon({ size = 30 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 3.6c-4.9 0-8.4 3.1-8.4 6.9 0 2.3 1.3 4.3 3.4 5.5-.2 1-.8 2.2-1.7 3.1 1.7-.2 3.3-.9 4.4-1.7 .7.1 1.5.2 2.3.2 4.9 0 8.4-3.1 8.4-6.9S16.9 3.6 12 3.6Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function BankIcon({ size = 30 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M12 3 21 8H3l9-5Z" fill="currentColor" />
      <path d="M5.4 10.2h2v6.6h-2v-6.6Zm5.6 0h2v6.6h-2v-6.6Zm5.6 0h2v6.6h-2v-6.6Z" fill="currentColor" />
      <path d="M3.4 18.4h17.2V20.6H3.4v-2.2Z" fill="currentColor" />
    </svg>
  );
}

export function PhoneIcon({ size = 30 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M7.2 3.6c.8-.4 1.8-.1 2.2.7l1.4 2.4c.4.8.2 1.7-.5 2.2l-1.1.8a10.4 10.4 0 0 0 4.1 4.1l.8-1.1c.5-.7 1.4-.9 2.2-.5l2.4 1.4c.8.4 1.1 1.4.7 2.2l-.9 1.6c-.5.8-1.4 1.2-2.3 1A16.4 16.4 0 0 1 4.6 6.7c-.2-.9.2-1.8 1-2.2l1.6-.9Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function ContactsIcon({ size = 30 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="4.6" y="3" width="15" height="18" rx="3" fill="currentColor" />
      <circle cx="12" cy="10" r="2.6" fill="#0a0a0f" />
      <path d="M7.6 17.4c.7-2 2.3-3.1 4.4-3.1s3.7 1.1 4.4 3.1H7.6Z" fill="#0a0a0f" />
      <rect x="2.6" y="6.4" width="2.6" height="2" rx="1" fill="currentColor" />
      <rect x="2.6" y="11" width="2.6" height="2" rx="1" fill="currentColor" />
      <rect x="2.6" y="15.6" width="2.6" height="2" rx="1" fill="currentColor" />
    </svg>
  );
}

export function CloseIcon({ size = 26 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" />
    </svg>
  );
}

export function HeartIcon({ size = 26 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 20.6 4.6 13.4a4.7 4.7 0 0 1 0-6.7 4.7 4.7 0 0 1 6.7 0l.7.7.7-.7a4.7 4.7 0 0 1 6.7 0 4.7 4.7 0 0 1 0 6.7L12 20.6Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function HeartOutlineIcon({ size = 24 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 20.6 4.6 13.4a4.7 4.7 0 0 1 0-6.7 4.7 4.7 0 0 1 6.7 0l.7.7.7-.7a4.7 4.7 0 0 1 6.7 0 4.7 4.7 0 0 1 0 6.7L12 20.6Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function CommentIcon({ size = 24 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 3.8c-4.6 0-8.2 3.2-8.2 7.2 0 2.2 1.1 4.2 3 5.5l-.9 3.7 3.9-2a10 10 0 0 0 2.2.2c4.6 0 8.2-3.2 8.2-7.4S16.6 3.8 12 3.8Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function VistaIcon({ size = 30 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="3.4" y="3.4" width="17.2" height="17.2" rx="5" stroke="currentColor" strokeWidth="2" />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2" />
      <circle cx="16.9" cy="7.1" r="1.3" fill="currentColor" />
    </svg>
  );
}

export function MatchIcon({ size = 30 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M13.4 2.4c.5 3 3.1 4.1 4.6 6.4 2.4 3.6.7 8.6-3.6 10.4-4 1.7-8.7-.4-9.6-4.6-.6-2.9.7-5 1.7-6.2.2 1.3.9 2.2 1.9 2.5.5-3.3 1.6-6.4 5-8.5Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function MarketIcon({ size = 30 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M11.3 3h6.1c.9 0 1.6.7 1.6 1.6v6.1c0 .4-.2.8-.5 1.1l-7 7a1.6 1.6 0 0 1-2.2 0l-5.1-5.1a1.6 1.6 0 0 1 0-2.2l7-7c.3-.3.7-.5 1.1-.5Z"
        fill="currentColor"
      />
      <circle cx="15.4" cy="7.6" r="1.5" fill="#0a0a0f" />
    </svg>
  );
}

export function StoreIcon({ size = 30 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="9.6" fill="currentColor" />
      <path
        d="M8.2 15.8h-1.6M9.6 13.4h7.8M12 6.6l-4.4 7.6M12 6.6l4.4 7.6M14.6 15.8 16.8 19.6"
        stroke="#0a0a0f"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function SettingsIcon({ size = 30 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 2.6c.9 0 1.7.6 1.9 1.5l.2.8 1 .5.8-.3a2 2 0 0 1 2.3.8l.6 1a2 2 0 0 1-.4 2.4l-.6.6v1.2l.6.6a2 2 0 0 1 .4 2.4l-.6 1a2 2 0 0 1-2.3.8l-.8-.3-1 .5-.2.8a2 2 0 0 1-1.9 1.5h-1.2a2 2 0 0 1-1.9-1.5l-.2-.8-1-.5-.8.3a2 2 0 0 1-2.3-.8l-.6-1a2 2 0 0 1 .4-2.4l.6-.6v-1.2l-.6-.6a2 2 0 0 1-.4-2.4l.6-1a2 2 0 0 1 2.3-.8l.8.3 1-.5.2-.8A2 2 0 0 1 10.8 2.6H12Z"
        fill="currentColor"
      />
      <circle cx="11.4" cy="11.4" r="3" fill="#0a0a0f" />
    </svg>
  );
}

export function ChevronLeft({ size = 20 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="m14.5 5-7 7 7 7" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function ChevronRight({ size = 16 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="m9.5 5 7 7-7 7" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function FingerprintIcon({ size = 30 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
      <g stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none">
        <path d="M4.2 10.6a7.8 7.8 0 0 1 15.6 0v2.6" />
        <path d="M7.4 10.6a4.6 4.6 0 0 1 9.2 0v3.2c0 1.4-.2 2.8-.7 4.1" />
        <path d="M10.6 10.6a1.4 1.4 0 0 1 2.8 0v3.2c0 2-.3 3.9-1 5.7" />
        <path d="M4.4 15.1c.1 1.6.4 3.1 1 4.6" />
        <path d="M7.6 16.4c0 1.4-.2 2.7-.6 4" />
      </g>
    </svg>
  );
}

export function AddContactIcon({ size = 20 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="9.6" cy="8" r="3.6" stroke="currentColor" strokeWidth="1.7" />
      <path
        d="M3.4 19.4c.5-3.3 3-5.2 6.2-5.2 1.4 0 2.6.4 3.6 1"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
      <path d="M17.8 13.6v6M14.8 16.6h6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}

export function BackspaceIcon({ size = 24 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M9.5 5h8.3A2.2 2.2 0 0 1 20 7.2v9.6a2.2 2.2 0 0 1-2.2 2.2H9.5a2.2 2.2 0 0 1-1.6-.7l-4.3-4.8a1.9 1.9 0 0 1 0-2.6l4.3-4.8A2.2 2.2 0 0 1 9.5 5Z"
        stroke="currentColor"
        strokeWidth="1.7"
        fill="none"
      />
      <path d="m11.6 9.6 4.8 4.8m0-4.8-4.8 4.8" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}

export function StarIcon({ size = 16 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="m12 3 2.7 5.9 6.3.7-4.7 4.4 1.3 6.4L12 17.2 6.4 20.4l1.3-6.4L3 9.6l6.3-.7L12 3Z" fill="currentColor" />
    </svg>
  );
}

export function PlaneIcon({ size = 16 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M21 13.4 13.6 11V4.8a1.6 1.6 0 0 0-3.2 0V11L3 13.4v2.2l7.4-1.9v4l-2.2 1.5v1.6L12 19.8l3.8 1v-1.6L13.6 17.7v-4L21 15.6v-2.2Z" fill="currentColor" />
    </svg>
  );
}

export function MoonIcon({ size = 16 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M20.4 14.6A8.6 8.6 0 0 1 9.4 3.6a8.8 8.8 0 1 0 11 11Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function BellIcon({ size = 16 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M12 2.6a6 6 0 0 0-6 6v3.6L4.2 16.4h15.6L18 12.2V8.6a6 6 0 0 0-6-6Z" fill="currentColor" />
      <path d="M9.6 18.4a2.4 2.4 0 0 0 4.8 0H9.6Z" fill="currentColor" />
    </svg>
  );
}

export function PinIcon({ size = 16 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M12 2.4c-3.9 0-7 3-7 6.8 0 5 7 12.4 7 12.4s7-7.4 7-12.4c0-3.8-3.1-6.8-7-6.8Z" fill="currentColor" />
      <circle cx="12" cy="9.2" r="2.6" fill="#0a0a0f" />
    </svg>
  );
}

export function EyeIcon({ size = 16 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M12 4.6c-5 0-9 4.4-10 7.4 1 3 5 7.4 10 7.4s9-4.4 10-7.4c-1-3-5-7.4-10-7.4Z" fill="currentColor" />
      <circle cx="12" cy="12" r="3.4" fill="#0a0a0f" />
    </svg>
  );
}

export function ChipIcon({ size = 16 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="6" y="6" width="12" height="12" rx="2.6" fill="currentColor" />
      <path d="M9.4 2.6v2.6M14.6 2.6v2.6M9.4 18.8v2.6M14.6 18.8v2.6M2.6 9.4h2.6M2.6 14.6h2.6M18.8 9.4h2.6M18.8 14.6h2.6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

export function SearchIcon({ size = 16 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="10.6" cy="10.6" r="6.4" stroke="currentColor" strokeWidth="1.9" />
      <path d="m15.4 15.4 4.4 4.4" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" />
    </svg>
  );
}

export function MusicIcon({ size = 30 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" aria-hidden>
      <path d="M12 22V8.6l12-2.4V19" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
      <circle cx="9" cy="22.4" r="3.4" fill="currentColor" />
      <circle cx="21" cy="19.4" r="3.4" fill="currentColor" />
    </svg>
  );
}

export function PlayIcon({ size = 22 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M8 5.4 19 12 8 18.6V5.4Z" fill="currentColor" />
    </svg>
  );
}

export function PauseIcon({ size = 22 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M8.4 5h2.4v14H8.4zM13.2 5h2.4v14h-2.4z" fill="currentColor" />
    </svg>
  );
}

export function SkipIcon({ size = 22 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M6 5.6 16 12 6 18.4V5.6Z" fill="currentColor" />
      <path d="M18 5.4v13.2" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
    </svg>
  );
}

export function ShuffleIcon({ size = 18 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M3 6.6h3.4c1.2 0 2.3.6 3 1.6l5.2 7.6c.7 1 1.8 1.6 3 1.6H21M3 17.4h3.4c1.2 0 2.3-.6 3-1.6l1.3-1.9M14.1 9.5l1.5-2.1c.7-1 1.8-1.6 3-1.6H21"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path d="m18.6 3.4 2.6 2.4-2.6 2.4M18.6 15.2l2.6 2.4-2.6 2.4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function RepeatIcon({ size = 18 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M7 6.6h10a3.4 3.4 0 0 1 3.4 3.4v1.4M17 17.4H7A3.4 3.4 0 0 1 3.6 14v-1.4"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path d="m14.6 4.2 2.6 2.4-2.6 2.4M9.4 15 6.8 17.4l2.6 2.4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function EyeOffIcon({ size = 16 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M4.2 8.4C2.9 9.6 2 11 2 11s3.6 6 10 6c1.5 0 2.8-.3 3.9-.8M19.4 14.4C21 13.1 22 11 22 11s-3.6-6-10-6c-1 0-2 .2-2.8.4"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
      <path d="M9.9 8.9a3 3 0 0 0 4.2 4.2" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      <path d="M4 4l16 16" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}

export function MicOffIcon({ size = 20 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 3.6a2.6 2.6 0 0 1 2.6 2.6v5.2a2.6 2.6 0 0 1-5.2 0V6.2A2.6 2.6 0 0 1 12 3.6Z"
        stroke="currentColor"
        strokeWidth="1.7"
      />
      <path
        d="M6.2 11a5.8 5.8 0 0 0 11.6 0M12 16.8v3.6"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
      <path d="M4 3.6 20 20" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}

export function SpeakerIcon({ size = 20 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M4 9.4h3.4L12 5.4v13.2l-4.6-4H4a1 1 0 0 1-1-1v-3.2a1 1 0 0 1 1-1Z" fill="currentColor" />
      <path
        d="M15.6 9.2a4 4 0 0 1 0 5.6M18.4 6.4a8 8 0 0 1 0 11.2"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function SendIcon({ size = 18 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M4 12 20 4l-4 16-4.4-5.6L4 12Z" fill="currentColor" />
    </svg>
  );
}
