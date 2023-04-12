import { Box, BoxProps, Flex, FlexProps, Text, color } from '@stacks/ui';

import { DecrementIcon } from '@components/icons/decrement';
import { IncrementIcon } from '@components/icons/increment';
import { decrement, increment } from '@utils/mutate-numbers';
import { formatCycles } from '@utils/stacking';

interface StepperProps extends BoxProps {
  amount: number;

  onIncrement(amount: number): void;

  onDecrement(amount: number): void;
}

const border = `1px solid ${color('border')}`;

const ChangeStepButton: React.FC<FlexProps> = ({ children, ...props }) => (
  <Flex
    as="button"
    type="button"
    alignItems="center"
    justifyContent="center"
    width="52px"
    height="48px"
    border={border}
    outline={0}
    zIndex={1}
    _focus={{
      borderColor: '#C5CCFF',
      boxShadow: '0 0 0 3px rgba(170,179,255,0.75)',
    }}
    {...props}
  >
    {children}
  </Flex>
);

export const Stepper: React.FC<StepperProps> = props => {
  const { amount, onIncrement, onDecrement, ...rest } = props;
  return (
    <Box {...rest}>
      <Flex>
        <ChangeStepButton
          color={color(amount === 1 ? 'text-caption' : 'brand')}
          pointerEvents={amount === 1 ? 'none' : 'all'}
          onClick={() => onDecrement(decrement(amount))}
          borderRadius="6px 0 0 6px"
        >
          <DecrementIcon />
        </ChangeStepButton>
        <Flex
          borderTop={border}
          borderBottom={border}
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          minWidth="100px"
        >
          <Text textStyle="body.small" mb="3px" mx="base">
            {formatCycles(amount)}
          </Text>
        </Flex>
        <ChangeStepButton
          color={color(amount === 12 ? 'text-caption' : 'brand')}
          pointerEvents={amount === 12 ? 'none' : 'all'}
          onClick={() => onIncrement(increment(amount))}
          borderRadius="0 6px 6px 0"
        >
          <IncrementIcon />
        </ChangeStepButton>
      </Flex>
    </Box>
  );
};
