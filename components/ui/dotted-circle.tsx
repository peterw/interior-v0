export function DottedCircle() {
  return (
    <div className="flex size-8 items-center justify-center rounded-full text-gray-400">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="10" strokeDasharray="2 2"/>
      </svg>
    </div>
  )
}
