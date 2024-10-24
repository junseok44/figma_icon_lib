import * as React from "react";
import type { SVGProps } from "react";
import { Ref, forwardRef } from "react";
const AmpStories = (
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
      <path d="M16 4H8c-.55 0-1 .45-1 1v13c0 .55.45 1 1 1h8c.55 0 1-.45 1-1V5c0-.55-.45-1-1-1M4 6c-.55 0-1 .45-1 1v9c0 .55.45 1 1 1s1-.45 1-1V7c0-.55-.45-1-1-1M20 6c-.55 0-1 .45-1 1v9c0 .55.45 1 1 1s1-.45 1-1V7c0-.55-.45-1-1-1" />
    </g>
    <defs>
      <clipPath id="prefix__a">
        <path fill="#fff" d="M0 0h24v24H0z" />
      </clipPath>
    </defs>
  </svg>
);
const ForwardRef = forwardRef(AmpStories);
export default ForwardRef;
