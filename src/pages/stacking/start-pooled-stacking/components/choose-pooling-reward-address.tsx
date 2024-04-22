import { Box, Text, color } from '@stacks/ui';
import { useField } from 'formik';

import { ErrorLabel } from '@components/error-label';
import { ErrorText } from '@components/error-text';

import { CryptoAddressInput } from '../../components/crypto-address-form';
import { Description, Step } from '../../components/stacking-form-step';

interface Props {
  editable: boolean;
  btcAddress: string;
}
export function ChoosePoolingRewardAddress({ editable }: Props) {
  const [field, meta] = useField('rewardAddress');

  return (
    <Step title="Bitcoin address">
      <Description>
        <Text color={color('text-caption')}>
          Enter the Bitcoin address where you&apos;d like to receive your rewards.
        </Text>
      </Description>

      <Box position="relative" maxWidth="400px">
        <CryptoAddressInput
          fieldName="poxAddress"
          addressType="BTC"
          isDisabled={!editable}
          {...field}
        >
          {meta.touched && meta.error && (
            <ErrorLabel>
              <ErrorText>{meta.error}</ErrorText>
            </ErrorLabel>
          )}
        </CryptoAddressInput>
      </Box>
      {editable ? (
        <Box textStyle="body.small" color={color('feedback-alert')} mt="base-tight">
          Make sure you control this BTC address. It is written on-chain and pool operators use the
          address as is.
        </Box>
      ) : (
        <Box textStyle="body.small" color={color('text-caption')} mt="base-tight">
          This is your BTC address.
        </Box>
      )}
    </Step>
  );
}
