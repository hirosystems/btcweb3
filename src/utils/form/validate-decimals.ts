import BigNumber from "bignumber.js";

/**
 * Returns a fn that validates a number is within the specified decimal precision Useful in
 * conjunction with a form validation schema.
 */
export function validateDecimalPrecision(allowedPrecision: number) {
  return (value: number) => {
    // Explicit base ensures BigNumber doesn't use exponential notation
    const decimals = new BigNumber(value).toString(10).split(".")[1];
    return decimals === undefined || decimals.length <= allowedPrecision;
  };
}
