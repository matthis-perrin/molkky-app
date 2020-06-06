import {FC} from 'react';
import {TextProps, ViewProps} from 'react-native';

export type CustomView<Props = Record<string, unknown>> = FC<Props & ViewProps>;
export type CustomText<Props = Record<string, unknown>> = FC<Props & TextProps>;
