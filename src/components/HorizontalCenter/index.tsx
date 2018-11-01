import * as React from 'react';
import Box, { Props as BoxProps } from '../Box';

export type Props = Omit<BoxProps, 'justifyContent'>;

export default class HorizontalCenter extends React.PureComponent<Props> {
  render() {
    return <Box justifyContent="center" {...this.props} />;
  }
}
