import { Flex, Text, Stack, FlexProps, color } from "@stacks/ui";
import { ReactNode } from "react";

export interface StackingTermItem extends FlexProps {
  title: string;
  icon: ReactNode;
}
export function StackingTermItem(props: StackingTermItem) {
  const { title, icon, children, ...rest } = props;
  return (
    <Flex alignItems="baseline" {...rest}>
      <Flex width="16px" mr="base-tight">
        {icon}
      </Flex>
      <Stack spacing="extra-tight">
        <Text as="h3" textStyle="body.large.medium">
          {title}
        </Text>
        <Stack
          spacing="base"
          textStyle="body.large"
          color={color("text-caption")}
        >
          {children}
        </Stack>
      </Stack>
    </Flex>
  );
}
