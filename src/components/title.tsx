import React, { FC } from 'react';

import { BoxProps, Text, color } from '@stacks/ui';

type TitleProps = BoxProps;

export const Title: FC<TitleProps> = ({ children, ...props }) => {
  return (
    <Text
      as="h1"
      fontSize="40px"
      lineHeight="56px"
      display="block"
      fontWeight={500}
      fontFamily="Diatype"
      letterSpacing="-0.02em"
      color={color('text-title')}
      {...props}
    >
      {children}
    </Text>
  );
};
