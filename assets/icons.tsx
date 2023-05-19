import React from 'react';
import { useColorScheme } from 'react-native';
import Svg, { SvgProps, G, Path, Defs, ClipPath } from 'react-native-svg';

interface Props extends SvgProps {
  size?: number;
  color?: string;
  xmlns?: string;
}

export const BackArrow = (props: Props) => {
  const scheme = useColorScheme();
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.size || 16}
      height={props.size || 16}
      fill="none"
      {...props}>
      <Path
        stroke={scheme === 'dark' ? '#fff' : '#15151A'}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M23.286 7H1M7 1 1 7l6 6"
      />
    </Svg>
  );
};

export const Mail = (props: Props) => {
  const scheme = useColorScheme();
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.size || 16}
      height={props.size || 16}
      fill="none"
      {...props}>
      <Path
        stroke={scheme === 'dark' ? '#fff' : '#15151A'}
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M.5 2.25h13v10.5H.5V2.25Z"
      />
      <Path
        stroke={scheme === 'dark' ? '#fff' : '#15151A'}
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m.5 3.515 5.855 4.941a1 1 0 0 0 1.29 0L13.5 3.515"
      />
    </Svg>
  );
};

export const Lock = (props: Props) => {
  const scheme = useColorScheme();
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.size || 16}
      height={props.size || 16}
      fill="none"
      {...props}>
      <Path
        stroke={scheme === 'dark' ? '#fff' : '#15151A'}
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M10 6H2a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1ZM9.5 6V4.5a3.5 3.5 0 1 0-7 0V6"
      />
      <Path
        stroke={scheme === 'dark' ? '#fff' : '#15151A'}
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6 10.5a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1Z"
      />
    </Svg>
  );
};

export const EyeIcon = (props: Props) => {
  const scheme = useColorScheme();
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.size || 24}
      height={props.size || 24}
      fill="none"
      {...props}>
      <Path
        stroke={scheme === 'dark' ? '#F9F7F6' : '#15151A'}
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15.12 5.234a1.143 1.143 0 0 1 0 1.532C13.92 8.057 11.189 10.57 8 10.57S2.08 8.057.88 6.766a1.143 1.143 0 0 1 0-1.532C2.08 3.943 4.81 1.43 8 1.43c3.188 0 5.92 2.514 7.12 3.805Z"
      />
      <Path
        stroke={scheme === 'dark' ? '#F9F7F6' : '#15151A'}
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M8 8.286a2.286 2.286 0 1 0 0-4.572 2.286 2.286 0 0 0 0 4.572Z"
      />
    </Svg>
  );
};

export const UserIcon = (props: Props) => {
  const scheme = useColorScheme();
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.size || 24}
      height={props.size || 24}
      fill="none"
      {...props}>
      <Path
        stroke={scheme === 'dark' ? '#F9F7F6' : '#15151A'}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={0.875}
        d="M7 7.5A3.25 3.25 0 1 0 7 1a3.25 3.25 0 0 0 0 6.5ZM13.18 14A6.49 6.49 0 0 0 .82 14h12.36Z"
      />
    </Svg>
  );
};

export const PhoneIcon = (props: Props) => {
  const scheme = useColorScheme();
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.size || 14}
      height={props.size || 14}
      fill="none"
      {...props}>
      <G clipPath="url(#a)">
        <Path
          stroke={scheme === 'dark' ? '#F9F7F6' : '#15151A'}
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M8.76 13.5a3.19 3.19 0 0 0 4-.44l.45-.44a1.08 1.08 0 0 0 0-1.51L11.3 9.22a1.07 1.07 0 0 0-1.5 0 1.08 1.08 0 0 1-1.51 0l-3-3a1.06 1.06 0 0 1 0-1.51 1.07 1.07 0 0 0 0-1.5l-1.9-1.9a1.08 1.08 0 0 0-1.51 0l-.44.45a3.19 3.19 0 0 0-.44 4 28.939 28.939 0 0 0 7.76 7.74Z"
        />
      </G>
      <Defs>
        <ClipPath id="a">
          <Path fill="#fff" d="M0 .5h14v14H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  );
};

export const CancelKey = (props: Props) => {
  const scheme = useColorScheme();
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.size || 24}
      height={props.size || 24}
      fill="none"
      {...props}>
      <Path
        stroke={scheme === 'dark' ? '#F9F7F6' : '#15151A'}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={0.667}
        d="M23.451 12.549 12.548 23.45M12.548 12.549 23.451 23.45M27 1.286H9A7.714 7.714 0 0 0 1.284 9v18A7.714 7.714 0 0 0 9 34.714h18A7.714 7.714 0 0 0 34.714 27V9a7.714 7.714 0 0 0-7.715-7.714Z"
      />
    </Svg>
  );
};
