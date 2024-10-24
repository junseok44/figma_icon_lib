import * as React from "react";
import type { SVGProps } from "react";
import { Ref, forwardRef } from "react";
const DynamicFeed = (
  props: SVGProps<SVGSVGElement>,
  ref: Ref<SVGSVGElement>
) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    viewBox="0 0 24 24"
    ref={ref}
    {...props}
  >
    <g fill="#fff" clipPath="url(#prefix__a)">
      <path d="M7 8c-.55 0-1 .45-1 1v6c0 1.1.9 2 2 2h8c.55 0 1-.45 1-1s-.45-1-1-1H8V9c0-.55-.45-1-1-1" />
      <path d="M20 3h-8c-1.1 0-2 .9-2 2v6c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2m-.5 8h-7c-.28 0-.5-.22-.5-.5V7h8v3.5c0 .28-.22.5-.5.5M3 12c-.55 0-1 .45-1 1v6c0 1.1.9 2 2 2h8c.55 0 1-.45 1-1s-.45-1-1-1H4v-6c0-.55-.45-1-1-1" />
    </g>
    <defs>
      <clipPath id="prefix__a">
        <path fill="#fff" d="M0 0h24v24H0z" />
      </clipPath>
    </defs>
  </svg>
);
const ForwardRef = forwardRef(DynamicFeed);
export default ForwardRef;
