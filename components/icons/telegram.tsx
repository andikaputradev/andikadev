export function TelegramIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="24"
      height="24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M21.5 2L2 9.5l6 2.5 2 7 3.5-3.5 5 4.5L21.5 2z" />
      <path d="M8 12l10-8-7.5 9.5" />
    </svg>
  )
}
