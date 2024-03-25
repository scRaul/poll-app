//https://github.com/nodejs/nodejs.org/blob/main/components/Icons/Social/LinkedIn.tsx
import type { FC, SVGProps } from "react";

const LinkedIn: FC<SVGProps<SVGSVGElement>> = (props) => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g id="Social Icon">
      <rect id="bg" width="20" height="20" rx="10" fill="#1275B1" />
      <g id="linked_in">
        <path
          d="M7.58468 5.49444C7.58468 6.16198 7.00608 6.70312 6.29234 6.70312C5.5786 6.70312 5 6.16198 5 5.49444C5 4.82691 5.5786 4.28577 6.29234 4.28577C7.00608 4.28577 7.58468 4.82691 7.58468 5.49444Z"
          fill="white"
        />
        <path
          d="M5.17673 7.59155H7.38586V14.2858H5.17673V7.59155Z"
          fill="white"
        />
        <path
          d="M10.9426 7.59155H8.73343V14.2858H10.9426C10.9426 14.2858 10.9426 12.1783 10.9426 10.8607C10.9426 10.0698 11.2126 9.27544 12.2901 9.27544C13.5079 9.27544 13.5005 10.3104 13.4949 11.1123C13.4874 12.1604 13.5052 13.2299 13.5052 14.2858H15.7143V10.7527C15.6956 8.49675 15.1077 7.45725 13.1738 7.45725C12.0253 7.45725 11.3134 7.97867 10.9426 8.4504V7.59155Z"
          fill="white"
        />
      </g>
    </g>
  </svg>
);

export default LinkedIn;
