import type { SVGProps } from "react";

export const Icons = {
  logo: (props: SVGProps<SVGSVGElement>) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      {/* Outer drop shape */}
      <path d="M12 22C7.58172 22 4 17.94 4 12.5C4 7.06 12 2 12 2s8 5.06 8 10.5C20 17.94 16.4183 22 12 22Z" strokeWidth="2" />
      
      {/* 'M' shape */}
      <path d="M9 11L10.5 8L12 11L13.5 8L15 11" />
      
      {/* 'D' shape */}
      <path d="M9 13v4h2.5c1.5 0 2.5-1 2.5-2s-1-2-2.5-2H9Z" />

      {/* 'C' shape */}
      <path d="M15.5 17c1.5 0 2.5-1 2.5-2s-1-2-2.5-2h-1" />

      {/* Red accent diamonds */}
      <path d="M12 5.5l-1-1 1-1 1 1 -1 1z" fill="red" stroke="red" />
      <path d="M10.5 7.5l-0.5-0.5 0.5-0.5 0.5 0.5 -0.5 0.5z" fill="red" stroke="red" />
      <path d="M13.5 7.5l-0.5-0.5 0.5-0.5 0.5 0.5 -0.5 0.5z" fill="red" stroke="red" />
    </svg>
  ),
};
