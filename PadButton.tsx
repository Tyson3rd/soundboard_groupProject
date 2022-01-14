import * as React from 'react';
import ButtonUnstyled, {
  ButtonUnstyledProps,
  buttonUnstyledClasses,
} from '@mui/base/ButtonUnstyled';
import { styled, Theme } from '@mui/system';
import { ThemeProvider } from '@mui/material';

const ButtonRoot = React.forwardRef(function ButtonRoot(
  props: React.PropsWithChildren<{}>,
  ref: React.ForwardedRef<any>,
) {
  const { children, ...other } = props;
  
  return (
    <svg width="150" height="150" {...other} ref={ref}>
      <polygon points="0,150 0,0 150,0 150,150" className="bg" />
      <polygon points="0,150 0,0 150,0 150,150" className="borderEffect" />
      <foreignObject x="0" y="0" width="150" height="50">
        <div className="content">{children}</div>
      </foreignObject>
    </svg>
  );
});

let mode;
const CustomButtonRoot = styled(ButtonRoot)(
  ({ theme }: { theme: Theme }) => `
  overflow: visible;
  cursor: pointer;
  --main-color: ${
    theme.palette.mode === 'light' ? mode.mainColor : 'rgb(144,202,249)'
  };
  --hover-color: ${
    theme.palette.mode === 'light'
      ? mode.hoverColor
      : 'rgba(144,202,249,0.08)'
  };
  --active-color: ${
    theme.palette.mode === 'light'
      ? 'rgba(25,118,210,0.12)'
      : 'rgba(144,202,249,0.24)'
  };

  & polygon {
    fill: transparent;
    transition: all 800ms ease;
    pointer-events: none;
  }
  
  & .bg {
    stroke: var(--main-color);
    stroke-width: ${mode.bgStrokeWidth};
    filter: ${mode.dropShadow}
    fill: transparent;
  }

  & .borderEffect {
    stroke: var(--main-color);
    stroke-width: ${mode.borderEffectStrokeWidth};
    stroke-dasharray: 150 600;
    stroke-dashoffset: 150;
    fill: transparent;
  }

  &:hover,
  &.${buttonUnstyledClasses.focusVisible} {
    .borderEffect {
      stroke-dashoffset: -600;
    }

    .bg {
      fill: var(--hover-color);
    }
  }

  &:focus,
  &.${buttonUnstyledClasses.focusVisible} {
    outline: none;
  }

  &.${buttonUnstyledClasses.active} { 
    & .bg {
      fill: var(--active-color);
      transition: fill 300ms ease-out;
    }
  }

  & foreignObject {
    pointer-events: none;

    & .content {
      font-family: Helvetica, Inter, Arial, sans-serif;
      font-size: 14px;
      font-weight: 200;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--main-color);
      text-transform: uppercase;
    }

    & svg {
      margin: 0 5px;
    }
  }`,
);

const SvgButton = React.forwardRef(function SvgButton(
  props: ButtonUnstyledProps,
  ref: React.ForwardedRef<any>,
) {
  return <ButtonUnstyled {...props} component={CustomButtonRoot} ref={ref} />;
});

export default function PadButton(props) {
  if (props.mode === "Moonlight") {
    mode = {
      mainColor: 'rgb(253, 192, 123)',
      hoverColor: 'rgb(247,234,198)',
      dropShadow: 'drop-shadow(0 4px 20px rgba(48, 101, 152, 1))',
      bgStrokeWidth: '2',
      borderEffectStrokeWidth: '4'
    } 
  } else if (props.mode === "Sunset") {
    mode = {
      mainColor: 'rgb(255, 255, 255)',
      hoverColor: 'rgb(255,204,51)',
      dropShadow: 'drop-shadow(0 4px 20px  rgba(209, 64, 9, 1))',
      bgStrokeWidth: '2',
      borderEffectStrokeWidth: '4'
    }
  }
  return <SvgButton></SvgButton>;
}