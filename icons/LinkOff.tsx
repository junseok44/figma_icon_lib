import * as React from "react";
import type { SVGProps } from "react";
import { Ref, forwardRef } from "react";
const LinkOff = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
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
        d="M21.94 11.23C21.57 8.76 19.32 7 16.82 7h-2.87c-.52 0-.95.43-.95.95s.43.95.95.95h2.9c1.6 0 3.04 1.14 3.22 2.73.17 1.43-.64 2.69-1.85 3.22l1.4 1.4c1.63-1.02 2.64-2.91 2.32-5.02M4.12 3.56a.996.996 0 1 0-1.41 1.41l2.4 2.4c-1.94.8-3.27 2.77-3.09 5.04C2.23 15.05 4.59 17 7.23 17h2.82c.52 0 .95-.43.95-.95s-.43-.95-.95-.95H7.16c-1.63 0-3.1-1.19-3.25-2.82a3.095 3.095 0 0 1 2.75-3.35l2.1 2.1c-.43.09-.76.46-.76.92v.1c0 .52.43.95.95.95h1.78L13 15.27V17h1.73l3.3 3.3a.996.996 0 1 0 1.41-1.41zM16 11.95c0-.52-.43-.95-.95-.95h-.66l1.49 1.49c.07-.13.12-.28.12-.44z"
      />
    </g>
    <defs>
      <clipPath id="prefix__a">
        <path fill="#fff" d="M0 0h24v24H0z" />
      </clipPath>
    </defs>
  </svg>
);
const ForwardRef = forwardRef(LinkOff);
export default ForwardRef;
