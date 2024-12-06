import React from 'react';

import { Box, Flex, FlexProps } from 'leather-styles/jsx';

import { ExclamationMark } from './icons/exclamation-mark';

interface ErrorLabelProps extends FlexProps {
  size?: 'sm' | 'md';
}

export const ErrorLabel: React.FC<ErrorLabelProps> = ({ children, size = 'sm', ...rest }) => (
  <Flex mt={3} {...rest}>
    <Box mr={2} position="relative" top={{ sm: '1px', md: '4px' }[size]}>
      <ExclamationMark />
    </Box>
    <Box>{children}</Box>
  </Flex>
);
