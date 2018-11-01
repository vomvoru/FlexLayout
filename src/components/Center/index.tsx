import * as React from 'react';
import Box, { JSXProps as BoxJSXProps } from '../Box';

export type Props = Omit<BoxJSXProps, 'alignItems' | 'justifyContent'>;

export default class Center extends React.PureComponent<Props> {
  render() {
    return <Box alignItems="center" justifyContent="center" {...this.props} />;
  }
}
