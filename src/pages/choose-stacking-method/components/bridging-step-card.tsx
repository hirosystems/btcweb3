import { Button } from '@leather.io/ui';
import { Box, Flex, styled } from 'leather-styles/jsx';
import { token } from 'leather-styles/tokens';

import { ChooseStackingMethodLayoutProps } from '../types';

type Props = ChooseStackingMethodLayoutProps & {
  title: string;
  description: React.ReactNode;
  icon: React.ReactNode;
  onButtonPress: () => void;
  buttonText: string;
  step: number;
  disabled?: boolean;
};

export function BridgingStepCard(props: Props) {
  return (
    <Flex
      justifyItems="center"
      style={{
        outline: `.5px solid ${token('colors.ink.border-default')}`,
      }}
    >
      <Flex m="space.06">
        <Box mr="space.04">{props.icon}</Box>
        <Flex flexDirection="column" justifyContent="flex-start">
          <Flex flexDirection="column" flex="1">
            <styled.p textStyle="label.02" color="ink.text-subdued" lineHeight="24px">
              Step {props.step}
            </styled.p>
            <styled.h1 textStyle="heading.01" fontSize="26px" lineHeight="36px" mb="space.03">
              {props.title}
            </styled.h1>
            <styled.p textStyle="body.01" marginTop="extra-loose" mb="space.08">
              {props.description}
            </styled.p>
          </Flex>

          <Box>
            <Button
              variant="outline"
              alignSelf="flex-start"
              fullWidth
              disabled={props.disabled}
              onClick={props.onButtonPress}
            >
              {props.buttonText}
            </Button>
          </Box>
        </Flex>
      </Flex>
    </Flex>
  );
}
