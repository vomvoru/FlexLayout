import * as React from 'react';
import Box, { Props as BoxProps } from '../Box';

export type Props = Omit<BoxProps, 'flexDirection' | 'children'> & {
  children: React.ReactElement<BoxProps>;
};

export default class Row extends React.PureComponent<Props> {
  render() {
    return <Box flexDirection="row" {...this.props} />;
  }
}
