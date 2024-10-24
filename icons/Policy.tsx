import * as React from "react";
import type { SVGProps } from "react";
import { Ref, forwardRef } from "react";
const Policy = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
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
      <path d="M21 6.3c0-.79-.47-1.51-1.19-1.83l-7-3.11c-.52-.23-1.11-.23-1.62 0l-7 3.11C3.47 4.79 3 5.51 3 6.3V11c0 5.55 3.84 10.74 9 12 2.3-.56 4.33-1.9 5.88-3.71l-3.12-3.12a4.994 4.994 0 0 1-6.29-.64 5.003 5.003 0 0 1 0-7.07 5.003 5.003 0 0 1 7.07 0 5.006 5.006 0 0 1 .64 6.29l2.9 2.9C20.29 15.69 21 13.38 21 11z" />
      <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6" />
    </g>
    <defs>
      <clipPath id="prefix__a">
        <path fill="#fff" d="M0 0h24v24H0z" />
      </clipPath>
    </defs>
  </svg>
);
const ForwardRef = forwardRef(Policy);
export default ForwardRef;
