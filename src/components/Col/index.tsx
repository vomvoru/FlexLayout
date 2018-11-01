import * as React from 'react';
import Box, { JSXProps as BoxJSXProps, Props as BoxProps } from '../Box';

export type Props = Omit<BoxJSXProps, 'flexDirection' | 'children'> & {
  children: React.ReactElement<BoxProps>;
};

export default class Col extends React.PureComponent<Props> {
  render() {
    return <Box flexDirection="column" {...this.props} />;
  }
}
