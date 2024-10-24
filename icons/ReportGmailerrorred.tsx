import * as React from "react";
import type { SVGProps } from "react";
import { Ref, forwardRef } from "react";
const ReportGmailerrorred = (
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
      <path d="M20.71 7.98 16.03 3.3c-.19-.19-.45-.3-.71-.3H8.68c-.26 0-.52.11-.7.29L3.29 7.98c-.18.18-.29.44-.29.7v6.63c0 .27.11.52.29.71l4.68 4.68c.19.19.45.3.71.3h6.63c.27 0 .52-.11.71-.29l4.68-4.68a1 1 0 0 0 .29-.71V8.68c.01-.26-.1-.52-.28-.7M19 14.9 14.9 19H9.1L5 14.9V9.1L9.1 5h5.8L19 9.1z" />
      <path d="M12 17a1 1 0 1 0 0-2 1 1 0 0 0 0 2M12 7c-.55 0-1 .45-1 1v5c0 .55.45 1 1 1s1-.45 1-1V8c0-.55-.45-1-1-1" />
    </g>
    <defs>
      <clipPath id="prefix__a">
        <path fill="#fff" d="M0 0h24v24H0z" />
      </clipPath>
    </defs>
  </svg>
);
const ForwardRef = forwardRef(ReportGmailerrorred);
export default ForwardRef;
