import * as React from 'react';
import Empty from './Empty';
import { SizeProp, cloneElements, sizeToStyle } from './utils';
import { isDev } from '../utils';

type BoxStyleKey =
  | 'flexGrow'
  | 'width'
  | 'height'
  | 'padding'
  | 'justifyContent'
  | 'alignItems'
  | 'flexDirection'
  | 'paddingLeft'
  | 'paddingRight'
  | 'paddingBottom'
  | 'paddingTop';

type BoxStyleProps = Pick<React.CSSProperties, BoxStyleKey>;
type NonBoxStyleProps = Omit<React.CSSProperties, BoxStyleKey>;

export type DefaultProps = {
  isColItem: boolean;
  isRowItem: boolean;
};

export type RequiredProps = {
  children: React.ReactNode;
  size?: SizeProp;
  className?: string;
  style?: NonBoxStyleProps;
  ref?: React.RefObject<Box>;
} & BoxStyleProps;

export type JSXProps = RequiredProps & Partial<DefaultProps>;

export type Props = RequiredProps & Required<DefaultProps>;

export interface State {}

const fillStyle: React.CSSProperties = {
  display: 'flex',
  boxSizing: 'border-box',
  width: '100%',
  height: '100%',
};

export default class Box extends React.PureComponent<Props, State> {
  static defaultProps: DefaultProps = {
    isColItem: false,
    isRowItem: false,
  };

  private get isRow() {
    const { flexDirection } = this.props;
    return flexDirection === 'row' || flexDirection === 'row-reverse';
  }

  private get isCol() {
    return !this.isRow;
  }

  private get flexGrow() {
    const { flexGrow, isRowItem, isColItem, width, height, size } = this.props;
    const isFlexGrow = flexGrow !== undefined;

    if (isFlexGrow) {
      return flexGrow;
    }

    const isHeight = height !== undefined || size !== undefined;
    const isWidth = width !== undefined || size !== undefined;

    if ((isColItem && isHeight === false) || (isRowItem && isWidth === false)) {
      return 1;
    }

    return undefined;
  }

  private get wrapperStyle(): React.CSSProperties {
    const {
      children,
      className,
      style,
      size,
      isColItem,
      isRowItem,
      ...boxStyle
    } = this.props;

    return {
      ...fillStyle,
      height: isColItem ? '' : '100%',
      width: isRowItem ? '' : '100%',
      flexGrow: this.flexGrow,
      ...style,
      ...sizeToStyle(size),
      ...boxStyle,
    };
  }

  private get childStyle(): React.CSSProperties {
    return {
      ...fillStyle,
      height: this.isCol ? '' : '100%',
      width: this.isRow ? '' : '100%',
    };
  }

  private get childProps() {
    return {
      isColItem: this.isCol,
      isRowItem: this.isRow,
    };
  }

  renderChildren = (children?: React.ReactNode) =>
    cloneElements({
      element: children,
      getProps: childProps => ({
        ...childProps,
        ...this.childProps,
        style: {
          ...this.childStyle,
          ...childProps.style,
        },
      }),
    });

  render() {
    const { children, className } = this.props;

    return (
      <div style={this.wrapperStyle} className={className}>
        {children === undefined && isDev
          ? this.renderChildren(Empty)
          : this.renderChildren(children)}
      </div>
    );
  }
}
