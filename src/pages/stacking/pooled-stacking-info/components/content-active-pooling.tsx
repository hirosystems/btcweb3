import { useState } from 'react';

import { intToBigInt } from '@stacks/common';
import { AccountExtendedBalances, StackerInfo } from '@stacks/stacking';
import { Box, Button, Text, color } from '@stacks/ui';
import { DelegationInfoDetails } from 'src/types/stacking';

import { Address } from '@components/address';
import { Hr } from '@components/hr';
import { CancelIcon } from '@components/icons/cancel';
import {
  InfoCardGroup as Group,
  InfoCardLabel as Label,
  InfoCardRow as Row,
  InfoCardSection as Section,
  InfoCardValue as Value,
} from '@components/info-card';
import routes from '@constants/routes';
import { useNavigate } from '@hooks/use-navigate';
import { useStacksNetwork } from '@hooks/use-stacks-network';
import { formatPoxAddressToNetwork } from '@utils/stacking';
import { toHumanReadableStx } from '@utils/unit-convert';

import { StackerDetailsRows } from '../../components/stacker-details-rows';
import { PoxContractName } from '../../start-pooled-stacking/types-preset-pools';
import { getPoxContracts } from '../../start-pooled-stacking/utils-preset-pools';
import { IncreasePoolingAmount } from './increase-pooling-amount';
import { PercentageRow } from './percentage-row';
import { SelfServiceRows } from './self-service-rows';

interface ActivePoolingContentProps {
  delegationInfoDetails: DelegationInfoDetails;
  isStacking: boolean;
  poolAddress: string;
  isContractCallExtensionPageOpen: boolean;
  stackerInfo: StackerInfo;
  extendedStxBalance: AccountExtendedBalances['stx'];
  handleStopPoolingClick: () => void;
}
export function ActivePoolingContent({
  delegationInfoDetails,
  poolAddress,
  isContractCallExtensionPageOpen,
  handleStopPoolingClick,
  extendedStxBalance,
  stackerInfo,
}: ActivePoolingContentProps) {
  const navigate = useNavigate();
  const isStacking = stackerInfo.stacked;
  const [showIncreasePoolingAmount, setShowIncreasePoolingAmount] = useState(false);
  const { network } = useStacksNetwork();
  const isSelfService =
    delegationInfoDetails.delegated_to ===
      getPoxContracts(network)[PoxContractName.WrapperFastPool] ||
    delegationInfoDetails.delegated_to === getPoxContracts(network)[PoxContractName.WrapperRestake];
  return (
    <>
      <Text textStyle="body.large.medium">You&apos;re pooling</Text>
      <Text
        fontSize="24px"
        fontFamily="Diatype"
        fontWeight={500}
        letterSpacing="-0.02em"
        mt="extra-tight"
        mb="extra-loose"
      >
        {toHumanReadableStx(delegationInfoDetails.amount_micro_stx)}
      </Text>

      <Hr />

      <Group my="extra-loose">
        <Section>
          <Row>
            <Label>Status</Label>
            <Value color={isStacking ? 'green' : color('text-caption')}>
              {isStacking ? 'Active' : 'Waiting on pool'}
            </Value>
          </Row>
          <PercentageRow extendedStxBalances={extendedStxBalance} />
          {isStacking && (
            <>
              <StackerDetailsRows
                stackerInfoDetails={stackerInfo.details}
                poxAddress={formatPoxAddressToNetwork(network, stackerInfo.details.pox_address)}
              />
              <Row>
                <Label>Stacked amount</Label>
                <Value>{toHumanReadableStx(intToBigInt(extendedStxBalance.locked, false))}</Value>
              </Row>
            </>
          )}
          <Row>
            <Label>Type</Label>
            <Value>
              {delegationInfoDetails.until_burn_ht ? 'Limted permission' : 'Indefinite permission'}
            </Value>
          </Row>
          <Row>
            <Label>Pool address</Label>
            <Value>
              <Address address={poolAddress} />
            </Value>
          </Row>
          {isSelfService && isStacking && !showIncreasePoolingAmount && <SelfServiceRows />}
          {showIncreasePoolingAmount ? (
            <IncreasePoolingAmount
              isSelfService={isSelfService}
              handleStopPoolingClick={() => {
                setShowIncreasePoolingAmount(false);
                handleStopPoolingClick();
              }}
              handleKeepPoolingClick={() => setShowIncreasePoolingAmount(false)}
              handleDelegateAgainClick={() => navigate(routes.START_POOLED_STACKING)}
            />
          ) : (
            <Row justifyContent="space-evenly">
              <Button mode="tertiary" onClick={() => setShowIncreasePoolingAmount(true)}>
                Increase pooling amount
              </Button>
            </Row>
          )}
        </Section>
      </Group>

      <Hr />

      <Group my="extra-loose">
        <Section>
          {!showIncreasePoolingAmount && (
            <Row>
              <Label>
                <Button
                  variant="link"
                  isDisabled={isContractCallExtensionPageOpen}
                  onClick={() => {
                    handleStopPoolingClick();
                  }}
                  color={color('text-caption')}
                >
                  <Box pr="tight">
                    <CancelIcon />
                  </Box>{' '}
                  Stop pooling
                </Button>
              </Label>
            </Row>
          )}
        </Section>
      </Group>
    </>
  );
}
