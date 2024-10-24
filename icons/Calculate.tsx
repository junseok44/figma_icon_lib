import * as React from "react";
import type { SVGProps } from "react";
import { Ref, forwardRef } from "react";
const Calculate = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
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
        d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2m-5.44 3.53c.29-.29.77-.29 1.06 0l.88.88.88-.88c.29-.29.77-.29 1.06 0s.29.77 0 1.06l-.88.88.88.88c.29.29.29.77 0 1.06s-.77.29-1.06 0l-.88-.87-.88.88c-.29.29-.77.29-1.06 0a.754.754 0 0 1 0-1.06l.88-.88-.88-.88c-.3-.3-.3-.78 0-1.07M7 7.72h3.5c.41 0 .75.34.75.75s-.34.75-.75.75H7c-.41 0-.75-.34-.75-.75s.34-.75.75-.75M10.75 16H9.5v1.25c0 .41-.34.75-.75.75S8 17.66 8 17.25V16H6.75c-.41 0-.75-.34-.75-.75s.34-.75.75-.75H8v-1.25c0-.41.34-.75.75-.75s.75.34.75.75v1.25h1.25c.41 0 .75.34.75.75s-.34.75-.75.75m6.5 1.25h-3.5c-.41 0-.75-.34-.75-.75s.34-.75.75-.75h3.5c.41 0 .75.34.75.75s-.34.75-.75.75m0-2.5h-3.5c-.41 0-.75-.34-.75-.75s.34-.75.75-.75h3.5c.41 0 .75.34.75.75s-.34.75-.75.75"
      />
    </g>
    <defs>
      <clipPath id="prefix__a">
        <path fill="#fff" d="M0 0h24v24H0z" />
      </clipPath>
    </defs>
  </svg>
);
const ForwardRef = forwardRef(Calculate);
export default ForwardRef;
