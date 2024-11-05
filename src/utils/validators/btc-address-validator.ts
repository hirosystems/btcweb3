import validate, { getAddressInfo } from 'bitcoin-address-validation';
import * as yup from 'yup';

import { SUPPORTED_BTC_ADDRESS_FORMATS } from '@constants/app';

export function validateBtcAddress(value: string, network: string): string | true {
  const isValid = validate(value);
  if (!isValid) return 'Invalid BTC address';
  const validationReport = getAddressInfo(value);
  if (!validationReport) return 'Invalid BTC address';
  if (network === 'mainnet' && validationReport.network === 'testnet') {
    return 'Testnet addresses not supported on Mainnet';
  }
  if (network === 'testnet' && validationReport.network === 'mainnet') {
    return 'Mainnet addresses not supported on Testnet';
  }
  if (
    !SUPPORTED_BTC_ADDRESS_FORMATS.includes(
      // TODO: check that all address types are properly supported
      validationReport.type as (typeof SUPPORTED_BTC_ADDRESS_FORMATS)[number]
    )
  ) {
    return 'Unsupported BTC address type';
  }
  return true;
}

interface Args {
  network: string;
}
export function createBtcAddressSchema({ network }: Args) {
  return yup
    .string()
    .defined(`Enter the BTC address where you'd like to recieve your rewards`)
    .test({
      name: 'btc-address',
      message: `The BTC address you've entered is not valid`,
      test(value: unknown) {
        if (value === null || value === undefined) return false;
        if (typeof value !== 'string') return false;
        const validationResult = validateBtcAddress(value, network);
        if (typeof validationResult === 'string') {
          return this.createError({
            message: validationResult,
          });
        }
        return validationResult;
      },
    });
}
