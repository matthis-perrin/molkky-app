import React, {Fragment, ReactNode} from 'react';
import {View} from 'react-native';

import {spacing} from '../lib/theme';

interface SpaceJoinProps {
  height?: number;
}

export const SpaceJoin: React.FC<SpaceJoinProps> = (props) => {
  const {height = spacing} = props;
  const content: ReactNode[] = [];
  React.Children.forEach(props.children, (child, i) => {
    if (i > 0) {
      content.push(<View key={i} style={{height}} />);
    }
    content.push(child);
  });
  return <Fragment>{content}</Fragment>;
};
