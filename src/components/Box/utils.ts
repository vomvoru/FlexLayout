import * as React from 'react';

export type SizeProp = string | number | undefined;

export const sizeToStyle = (size: SizeProp): React.CSSProperties => {
  if (size === undefined) {
    return {};
  }
  if (typeof size === 'string') {
    const [width, height] = size.split(' ');
    return { width, height: height === undefined ? width : height };
  }
  return {
    flexGrow: size,
  };
};

export const isReactText = (target: React.ReactNode) =>
  typeof target === 'string' || typeof target === 'number';

const isEmptyObject = (obj: object): obj is {} => Object.keys(obj).length === 0;

type cloneElementArg = {
  element?: Exclude<React.ReactNode, React.ReactNodeArray>;
  getProps?: (props: any) => object;
  renderReactText?: (element?: React.ReactText) => React.ReactNode;
};
const cloneElement = ({
  element,
  getProps = () => ({}),
  renderReactText = ele => ele,
}: cloneElementArg): React.ReactNode => {
  if (typeof element === 'string' || typeof element === 'number') {
    return renderReactText(element);
  }

  if (
    element !== undefined &&
    element !== null &&
    typeof element !== 'boolean' &&
    'type' in element
  ) {
    return React.cloneElement(element, getProps(element.props));
  }

  return null;
};

type cloneElementsArg = cloneElementArg & {
  element: React.ReactNode;
};
export const cloneElements = ({
  element,
  getProps,
  renderReactText,
}: cloneElementsArg): React.ReactNode => {
  if (Array.isArray(element)) {
    return element.map(item =>
      cloneElement({ element: item, getProps, renderReactText }),
    );
  }

  return cloneElement({ element, getProps, renderReactText });
};
