import * as React from 'react';
import Box, { Props as BoxProps } from '../Box';

export type Props = Omit<BoxProps, 'alignItems'>;

export default class VerticalCenter extends React.PureComponent<Props> {
  render() {
    return <Box alignItems="center" {...this.props} />;
  }
}
