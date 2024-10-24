import * as React from "react";
import type { SVGProps } from "react";
import { Ref, forwardRef } from "react";
const Attribution = (
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
      <path d="M12 8.5c-.91 0-2.75.46-2.75 1.38V14c0 .28.22.5.5.5h1v3.25a1.25 1.25 0 0 0 2.5 0V14.5h1c.28 0 .5-.22.5-.5V9.88c0-.91-1.84-1.38-2.75-1.38M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.48 10-10S17.52 2 12 2m0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8" />
      <path d="M12 8a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3" />
    </g>
    <defs>
      <clipPath id="prefix__a">
        <path fill="#fff" d="M0 0h24v24H0z" />
      </clipPath>
    </defs>
  </svg>
);
const ForwardRef = forwardRef(Attribution);
export default ForwardRef;