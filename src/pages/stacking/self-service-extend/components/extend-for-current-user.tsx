import { PoxInfo, StackingClient } from '@stacks/stacking';
import { Box, Button, Text } from '@stacks/ui';
import { IconLock } from '@tabler/icons-react';
import { StackerInfoDetails } from 'src/types/stacking';

import { CenteredSpinner } from '@components/centered-spinner';
import { Hr } from '@components/hr';
import { InfoCardRow as Row } from '@components/info-card';
import { useStacksNetwork } from '@hooks/use-stacks-network';
import { formatPoxAddressToNetwork } from '@utils/stacking';

import { StackerDetailsRows } from '../../components/stacker-details-rows';
import { useDelegationStatusForUserQuery } from '../../pooled-stacking-info/use-delegation-status-query';
import { isAtEndOfStackingPeriod } from '../utils';

interface Props {
  poxInfo: PoxInfo;
  address: string;
  stackerInfoDetails: StackerInfoDetails | undefined;
  onClose: () => void;
  isContractCallExtensionPageOpen: boolean;
  setShowExtendForOtherUser: React.Dispatch<React.SetStateAction<boolean>>;
}

export function ExtendForCurrentUser({
  poxInfo,
  address,
  stackerInfoDetails,
  onClose,
  isContractCallExtensionPageOpen,
  setShowExtendForOtherUser,
}: Props) {
  const { network } = useStacksNetwork();
  const client = new StackingClient({ address, network });
  const getDelegationStatusQuery = useDelegationStatusForUserQuery({ client, address, network });

  if (getDelegationStatusQuery.isError || !getDelegationStatusQuery.data) {
    return <CenteredSpinner />;
  }

  const poxAddress = stackerInfoDetails
    ? formatPoxAddressToNetwork(network, stackerInfoDetails.pox_address)
    : undefined;

  const requiresExtension =
    stackerInfoDetails && poxInfo ? isAtEndOfStackingPeriod(stackerInfoDetails, poxInfo) : true;

  const delegationStatus = getDelegationStatusQuery.data;

  if (!delegationStatus.delegated) {
    return (
      <>
        <Text py="loose">You are not part of a pool.</Text>
        <Row m="loose" justifyContent="space-evenly">
          <Button onClick={() => setShowExtendForOtherUser(true)}>
            Lock for other pool members
          </Button>
        </Row>
      </>
    );
  }
  return (
    <>
      {stackerInfoDetails && poxAddress && (
        <>
          <StackerDetailsRows stackerInfoDetails={stackerInfoDetails} poxAddress={poxAddress} />
          <Hr />
        </>
      )}
      <Text py="loose">
        {requiresExtension
          ? 'Lock your STX for 1 more cycle.'
          : 'Your are already stacking for the next cycle.'}
      </Text>
      <Row m="loose" justifyContent="space-between">
        <Button mode="tertiary" onClick={onClose}>
          Cancel
        </Button>

        <Button
          type="submit"
          isLoading={isContractCallExtensionPageOpen}
          isDisabled={!requiresExtension}
        >
          <Box mr="loose">
            <IconLock />
          </Box>
          Lock STX
        </Button>
      </Row>
      <Row m="loose" justifyContent="space-evenly">
        <Button
          mode={!requiresExtension ? 'primary' : 'tertiary'}
          onClick={() => setShowExtendForOtherUser(true)}
        >
          Lock for other pool members
        </Button>
      </Row>
    </>
  );
}
