import React from 'react';
import Svg, { SvgProps, G, Path, Defs, ClipPath, Rect } from 'react-native-svg';
import { useAppSelector } from '@store';

interface Props extends SvgProps {
  size?: number;
  color?: string;
  xmlns?: string;
}

export const BackArrow = (props: Props) => {
  const { theme: scheme } = useAppSelector(state => state.misc);
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

export const ChevronBack = (props: Props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={22}
    height={14}
    fill="none"
    {...props}>
    <Path
      stroke="#15151A"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M23.286 7H1M7 1 1 7l6 6"
    />
  </Svg>
);

export const Mail = (props: Props) => {
  const { theme: scheme } = useAppSelector(state => state.misc);
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

export const Exclamation = (props: Props) => {
  const { theme: scheme } = useAppSelector(state => state.misc);
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      fill="none"
      {...props}>
      <Rect
        width={23.5}
        height={23.5}
        x={0.25}
        y={0.25}
        fill={scheme === 'dark' ? '#1F1F23' : '#F9F7F6'}
        stroke="#F60"
        strokeWidth={0.5}
        rx={11.75}
      />
      <Path
        fill="#F60"
        d="M11.246 14.102 11.078 7.2h1.596l-.168 6.902h-1.26Zm.672 2.982a.995.995 0 0 1-.714-.266.924.924 0 0 1-.266-.658c0-.261.089-.48.266-.658a.967.967 0 0 1 .714-.28c.27 0 .495.093.672.28.187.177.28.397.28.658a.9.9 0 0 1-.28.658.91.91 0 0 1-.672.266Z"
      />
    </Svg>
  );
};

export const ChevronDown = (props: Props) => {
  const { theme: scheme } = useAppSelector(state => state.misc);
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
        strokeWidth={0.571}
        d="M.286 1.2 3.8 4.714a.274.274 0 0 0 .4 0L7.714 1.2"
      />
    </Svg>
  );
};

export const Close = (props: Props) => {
  const { theme: scheme } = useAppSelector(state => state.misc);
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
        strokeWidth={1.125}
        d="M17.358.643.644 17.357M.644.643l16.714 16.714"
      />
    </Svg>
  );
};

export const MenuRightArrow = (props: Props) => {
  const { theme: scheme } = useAppSelector(state => state.misc);
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.size || 13}
      height={props.size || 10}
      fill="none"
      {...props}>
      <Path
        stroke={scheme === 'dark' ? '#fff' : '#15151A'}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={0.875}
        d="M.416 4h13M9.916.5l3.5 3.5-3.5 3.5"
      />
    </Svg>
  );
};

export const Lock = (props: Props) => {
  const { theme: scheme } = useAppSelector(state => state.misc);
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
  const { theme: scheme } = useAppSelector(state => state.misc);
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
  const { theme: scheme } = useAppSelector(state => state.misc);
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
  const { theme: scheme } = useAppSelector(state => state.misc);
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
  const { theme: scheme } = useAppSelector(state => state.misc);
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

export const UserTabIcon = (props: Props) => {
  const { theme: scheme } = useAppSelector(state => state.misc);
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.size || 24}
      height={props.size || 24}
      fill={props.fill || 'none'}
      {...props}>
      <Path
        stroke={scheme === 'dark' ? '#F9F7F6' : '#15151A'}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.031}
        d="M8.5 8.438a3.83 3.83 0 1 0 0-7.661 3.83 3.83 0 0 0 0 7.66ZM15.784 16.098a7.648 7.648 0 0 0-14.567 0h14.567Z"
      />
    </Svg>
  );
};

export const RewardTabIcon = (props: Props) => {
  const { theme: scheme } = useAppSelector(state => state.misc);
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.size || 24}
      height={props.size || 24}
      fill={props.fill || 'none'}
      {...props}>
      <Path
        stroke={scheme === 'dark' ? '#F9F7F6' : '#15151A'}
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M14.787 3.866H2.215c-.631 0-1.143.512-1.143 1.143v3.429c0 .63.512 1.143 1.143 1.143h12.572c.63 0 1.142-.512 1.142-1.143V5.009c0-.631-.511-1.143-1.142-1.143Z"
      />
      <Path
        stroke={scheme === 'dark' ? '#F9F7F6' : '#15151A'}
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M14.786 9.58v5.143a1.143 1.143 0 0 1-1.143 1.143H3.358a1.143 1.143 0 0 1-1.143-1.143V9.581M8.501 3.866v12M11.93 1.009 8.5 3.866 5.073 1.01"
      />
    </Svg>
  );
};

export const PaymentTabIcon = (props: Props) => {
  const { theme: scheme } = useAppSelector(state => state.misc);
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.size || 24}
      height={props.size || 24}
      fill="none"
      {...props}>
      <Path
        fill={props.fill || 'none'}
        stroke={scheme === 'dark' ? '#F9F7F6' : '#15151A'}
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M16.072 1.152H1.93c-.71 0-1.285.575-1.285 1.286v9c0 .71.575 1.285 1.285 1.285h14.143c.71 0 1.286-.575 1.286-1.285v-9c0-.71-.576-1.286-1.286-1.286Z"
      />
      <Path
        fill={props.fill || 'none'}
        stroke={scheme === 'dark' ? '#F9F7F6' : '#15151A'}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.286}
        d="M9 8.866A1.929 1.929 0 1 0 9 5.01a1.929 1.929 0 0 0 0 3.857Z"
      />
      <Path
        stroke={scheme === 'dark' ? '#F9F7F6' : '#15151A'}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.286}
        d="M3.857 4.366H4.5M13.501 9.509h.643"
      />
    </Svg>
  );
};

export const WalletTabIcon = (props: Props) => {
  const { theme: scheme } = useAppSelector(state => state.misc);
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.size || 24}
      height={props.size || 24}
      fill={props.fill || 'none'}
      {...props}>
      <Path
        stroke={scheme === 'dark' ? '#F9F7F6' : '#15151A'}
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M14.892 9.027V6.67a1.178 1.178 0 0 0-1.178-1.179H2.517A1.179 1.179 0 0 0 1.34 6.67v8.25a1.179 1.179 0 0 0 1.178 1.178h11.197a1.179 1.179 0 0 0 1.178-1.178v-2.947M5.274 2.545 11.957.8a.578.578 0 0 1 .719.425l.33 1.32"
      />
      <Path
        stroke={scheme === 'dark' ? '#F9F7F6' : '#15151A'}
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M16.07 9.027h-2.946a.59.59 0 0 0-.589.59v1.767c0 .325.264.59.59.59h2.946a.59.59 0 0 0 .59-.59V9.616a.59.59 0 0 0-.59-.59Z"
      />
    </Svg>
  );
};

export const HomeTabIcon = (props: Props) => {
  const { theme: scheme } = useAppSelector(state => state.misc);
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.size || 24}
      height={props.size || 24}
      fill={props.fill || 'none'}
      {...props}>
      <G clipPath="url(#a)">
        <Path
          stroke={scheme === 'dark' ? '#F9F7F6' : '#15151A'}
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15.928 8.369a1.143 1.143 0 0 0-.365-.846L8.5 1.01 1.437 7.523a1.143 1.143 0 0 0-.366.846v6.354a1.143 1.143 0 0 0 1.143 1.143h12.572a1.143 1.143 0 0 0 1.143-1.143V8.37Z"
        />
      </G>
      <Defs>
        <ClipPath id="a">
          <Path fill="#fff" d="M.5.438h16v16H.5z" />
        </ClipPath>
      </Defs>
    </Svg>
  );
};

export const AirtimeIcon = (props: Props) => {
  const { theme: scheme } = useAppSelector(state => state.misc);
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.size || 11}
      height={props.size || 14}
      fill="none"
      {...props}>
      <Path
        stroke="#F60"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M11.57.572H2.429c-.631 0-1.143.511-1.143 1.142v12.572c0 .631.512 1.143 1.143 1.143h9.143c.631 0 1.143-.512 1.143-1.143V1.714c0-.63-.512-1.142-1.143-1.142ZM6.143 12.572h1.714"
      />
    </Svg>
  );
};

export const DataIcon = (props: Props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    {...props}>
    <Path
      stroke="#9747FF"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M9 17A8 8 0 1 0 9 1a8 8 0 0 0 0 16ZM1 9h16"
    />
    <Path
      stroke="#9747FF"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12.077 9A13.809 13.809 0 0 1 9 17a13.81 13.81 0 0 1-3.077-8A13.81 13.81 0 0 1 9 1a13.809 13.809 0 0 1 3.077 8Z"
    />
  </Svg>
);

export const CheckMark = (props: Props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    {...props}>
    <Path
      stroke="#15151A"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.063}
      d="m1.173 4.942 1.659 2.132a.608.608 0 0 0 .947.019L9.072.688"
    />
  </Svg>
);
