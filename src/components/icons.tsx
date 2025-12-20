import type { SVGProps } from "react";

export const Icons = {
  logo: (props: SVGProps<SVGSVGElement>) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M12.22 2h-4.44L4 10v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V10L16.22 2z" />
      <path d="M8.29 14.29L6 12l2.29-2.29" />
      <path d="M15.71 14.29L18 12l-2.29-2.29" />
      <path d="M12 6V2" />
      <path d="M12 18v-4" />
    </svg>
  ),
};
