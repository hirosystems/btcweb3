import React, { FC } from 'react';

import { styled, BoxProps } from 'leather-styles/jsx';

type TitleProps = BoxProps;

export const Title: FC<TitleProps> = ({ children, ...props }) => {
  return (
    <styled.h1
      textStyle="display.02"
      fontFamily="MarcheSuperPro"
      color="ink.text-primary"
      {...props}
    >
      {children}
    </styled.h1>
  );
};
