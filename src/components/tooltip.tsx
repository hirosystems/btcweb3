import React, { FC, ReactNode } from 'react';

import { Box, BoxProps } from '@stacks/ui';
import Tippy, { TippyProps } from '@tippyjs/react';

import { ExplainerIcon } from './icons/explainer';

interface TooltipProps extends BoxProps, Partial<Pick<TippyProps, 'hideOnClick'>> {
  text: string;
}

export const Tooltip: React.FC<TooltipProps> = ({ children, text, hideOnClick, ...props }) => {
  return (
    <Tippy
      zIndex={9999999}
      hideOnClick={!!hideOnClick}
      content={
        <Box
          p="base-tight"
          color="white"
          background="black"
          borderRadius="6px"
          textStyle="body.small.medium"
          whiteSpace="normal"
          maxWidth="290px"
        >
          {text}
        </Box>
      }
    >
      <Box as="span" {...props}>
        {children}
      </Box>
    </Tippy>
  );
};

interface ExplainerLabelProps {
  text: string;
  children: ReactNode;
}

export const ExplainerLabel: FC<ExplainerLabelProps> = ({ text, children }) => (
  <>
    {' '}
    <Tooltip
      text={text}
      textDecoration="underline"
      style={{ textDecorationStyle: 'dotted' }}
      cursor="help"
    >
      {children}
    </Tooltip>{' '}
  </>
);

export const ExplainerTooltip: FC<BoxProps> = ({ children, ...props }) => {
  return (
    <Tippy
      zIndex={9999999}
      content={
        <Box
          p="base-tight"
          color="white"
          background="black"
          borderRadius="6px"
          textStyle="body.small.medium"
          whiteSpace="normal"
          maxWidth="290px"
          {...props}
        >
          {children}
        </Box>
      }
    >
      <Box mr="tight">
        <ExplainerIcon cursor="help" />
      </Box>
    </Tippy>
  );
};
