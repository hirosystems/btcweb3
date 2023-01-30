import { Box, List, Text } from "@mantine/core";
import { IconLock, IconStairs } from "@tabler/icons-react";

export function DelegatedStackingTerms() {
  return (
    <Box
      sx={(t) => ({
        borderLeft: `4px solid ${t.colors.orange[5]}`,
        paddingLeft: t.spacing.xs,
      })}
    >
      <List spacing="xs">
        <List.Item icon={<IconLock />}>
          <Text>This transaction can&apos;t be reversed</Text>
          <Text c="dimmed">
            There will be no way to unlock your STX once the pool has started
            stacking them. You will need to wait until they unlock at the end of
            the pool&apos;s chosen number of cycles.
          </Text>
        </List.Item>
        <List.Item icon={<IconStairs />}>
          <Text>Research your pool</Text>
          <Text c="dimmed">
            Paying out rewards is at the discretion of the pool. Make sure
            you’ve researched and trust the pool you’re using. All pools are
            unaffiliated with Hiro PBC.
          </Text>
        </List.Item>
      </List>
    </Box>
  );
}
