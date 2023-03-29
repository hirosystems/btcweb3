import { StacksNetworkName } from '@stacks/network';
import { validateStacksAddress } from '@stacks/transactions';
import * as yup from 'yup';

import { validateAddressChain } from '@crypto/validate-address-net';

export function stxPrincipalSchema(schema: yup.StringSchema, networkName: StacksNetworkName) {
  return schema.defined('Must define a STX address').test({
    name: 'address-validation',
    test(value, context) {
      if (!value) return false;
      const [address, name] = value.split('.');
      const valid = validateStacksAddress(address);

      if (!valid || name === '') {
        return context.createError({
          message: 'Input address is not a valid STX address',
        });
      }
      if (!validateAddressChain(value, networkName)) {
        return context.createError({
          message: `Must use a ${networkName} STX address`,
        });
      }
      return true;
    },
  });
}
