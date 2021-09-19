import React, {Fragment, ReactNode} from 'react';
import {View} from 'react-native';

import {spacing} from '../lib/theme';

interface SpaceJoinProps {
  height?: number;
}

export const SpaceJoin: React.FC<SpaceJoinProps> = (props) => {
  const {height = spacing, children} = props;
  const content: ReactNode[] = [];
  React.Children.forEach(children, (child, i) => {
    if (i > 0) {
      // eslint-disable-next-line react/no-array-index-key
      content.push(<View key={i} style={{height}} />);
    }
    content.push(child);
  });
  return <Fragment>{content}</Fragment>;
};
