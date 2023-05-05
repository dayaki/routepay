import React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

interface Props extends SvgProps {
  size?: number;
  color?: string;
}

export const BackArrow = (props: Props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    {...props}>
    <Path
      stroke="#fff"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M23.286 7H1M7 1 1 7l6 6"
    />
  </Svg>
);

export const Mail = (props: Props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    {...props}>
    <Path
      stroke="#fff"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M.5 2.25h13v10.5H.5V2.25Z"
    />
    <Path
      stroke="#fff"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="m.5 3.515 5.855 4.941a1 1 0 0 0 1.29 0L13.5 3.515"
    />
  </Svg>
);

export const Lock = (props: Props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    {...props}>
    <Path
      stroke="#fff"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M10 6H2a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1ZM9.5 6V4.5a3.5 3.5 0 1 0-7 0V6"
    />
    <Path
      stroke="#fff"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M6 10.5a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1Z"
    />
  </Svg>
);

export const CloseIcon = (props: Props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={props.size || 24}
    height={props.size || 24}
    fill="none"
    {...props}>
    <Path
      stroke="#fff"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={0.667}
      d="M23.451 12.549 12.548 23.45M12.548 12.549 23.451 23.45M27 1.286H9A7.714 7.714 0 0 0 1.284 9v18A7.714 7.714 0 0 0 9 34.714h18A7.714 7.714 0 0 0 34.714 27V9a7.714 7.714 0 0 0-7.715-7.714Z"
    />
  </Svg>
);
