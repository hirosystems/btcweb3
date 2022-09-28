import React, { FC } from 'react';
import { Flex, FlexProps, Box, Spinner, FailedIcon, color } from '@stacks/ui';

import { SentArrow } from '@components/icons/sent-arrow';
import { ReceivedArrow } from '@components/icons/received-arrow';
import { LockedIcon } from '@components/icons/locked';
import { StxTxDirection } from '@utils/get-stx-transfer-direction';
import { DelegatedIcon } from '@components/icons/delegated-icon';
import { RevokedDelegationIcon } from '../../icons/revoked-delegation-icon';

export type TransactionIconVariants =
  | StxTxDirection
  | 'pending'
  | 'locked'
  | 'delegated'
  | 'revoked'
  | 'failed'
  | 'default';

const iconMap: Record<TransactionIconVariants, FC> = {
  sent: SentArrow,
  received: ReceivedArrow,
  locked: LockedIcon,
  delegated: DelegatedIcon,
  revoked: RevokedDelegationIcon,
  failed: () => <FailedIcon size="16px" />,
  pending: () => <Spinner size="xs" color={color('brand')} />,
  default: () => (
    <Box width="16px" height="16px" borderRadius="50%" backgroundColor={color('text-caption')} />
  ),
};

function getTxTypeIcon(direction: TransactionIconVariants) {
  const Icon = iconMap[direction];
  return <Icon />;
}

interface TransactionIconProps extends FlexProps {
  variant: TransactionIconVariants;
}

export const TransactionIcon: FC<TransactionIconProps> = ({ variant, ...props }) => {
  const contents = getTxTypeIcon(variant);

  return (
    <Flex
      justifyContent="center"
      alignItems="center"
      border={`1px solid ${color('border')}`}
      background={color('bg')}
      borderRadius="8px"
      minWidth="48px"
      minHeight="48px"
      maxWidth="48px"
      maxHeight="48px"
      color={color('brand')}
      {...props}
    >
      {contents}
    </Flex>
  );
};
