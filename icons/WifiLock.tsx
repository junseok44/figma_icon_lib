import * as React from "react";
import type { SVGProps } from "react";
import { Ref, forwardRef } from "react";
const WifiLock = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    viewBox="0 0 24 24"
    ref={ref}
    {...props}
  >
    <g clipPath="url(#prefix__a)">
      <path
        fill="#fff"
        d="M21.31 9.58 24 6c-3.34-2.51-7.5-4-12-4S3.34 3.49 0 6l10.4 13.87c.8 1.07 2.4 1.07 3.2 0l1.9-2.53V14.5c0-2.76 2.24-5 5-5 .28 0 .55.04.81.08M23 16v-1.5a2.5 2.5 0 0 0-5 0V16c-.55 0-1 .45-1 1v4c0 .55.45 1 1 1h5c.55 0 1-.45 1-1v-4c0-.55-.45-1-1-1m-1 0h-3v-1.5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5z"
      />
    </g>
    <defs>
      <clipPath id="prefix__a">
        <path fill="#fff" d="M0 0h24v24H0z" />
      </clipPath>
    </defs>
  </svg>
);
const ForwardRef = forwardRef(WifiLock);
export default ForwardRef;
