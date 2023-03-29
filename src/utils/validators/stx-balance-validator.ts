import BigNumber from 'bignumber.js';

import { stxToMicroStx } from '@utils/unit-convert';

export function stxBalanceValidator(balance: bigint) {
  return {
    name: 'test-balance',
    message: 'Amount must be lower than balance',
    test: (value: number | undefined) => {
      if (value === undefined) return false;

      const enteredAmount = stxToMicroStx(value);
      return enteredAmount.isLessThanOrEqualTo(new BigNumber(balance.toString()));
    },
  };
}
