import { Link } from 'react-router-dom';

import { IconInfoCircle } from '@tabler/icons-react';
import { css } from 'leather-styles/css';
import { Stack, styled } from 'leather-styles/jsx';
import { token } from 'leather-styles/tokens';
import { useGlobalContext } from 'src/context/use-app-context';

import { Alert } from '@components/alert';
import { OpenExternalLinkInNewTab } from '@components/external-link';
import { BUY_STACKS_URL } from '@constants/app';
import { createSearch } from '@utils/networks';

import { SignedInProps } from '../types';
import { hasExistingCommitment } from '../utils';

export function Messages({
  hasEnoughBalanceToDirectStack,
  hasEnoughBalanceToPool,
  hasExistingDelegatedStacking,
  hasExistingDelegation,
  hasExistingDirectStacking,
}: SignedInProps) {
  const { activeNetwork } = useGlobalContext();
  const linkStyles = css({
    color: 'blue.action-primary-default',
    _hover: {
      textDecoration: 'underline',
    },
  });

  const icon = <IconInfoCircle color={token('colors.red.action-primary-default')} />;

  return (
    <Stack className={css({ mb: 'space.04', mx: { base: 'space.00', xlDown: 'space.04' } })}>
      {(hasExistingDelegation || hasExistingDelegatedStacking) && (
        <Alert icon={icon}>
          <Stack>
            <styled.p textStyle="body.01">
              It appears that you&apos;re currently pooling. If you recently revoked your delegation
              after the pool unlocked your funds, you&apos;ll soon be able to pool again. This
              usually takes a few seconds.
            </styled.p>
            <Link to={`../pooled-stacking-info${createSearch(activeNetwork)}`}>
              <styled.p textStyle="label.01" className={linkStyles}>
                View your pooling info
              </styled.p>
            </Link>
          </Stack>
        </Alert>
      )}
      {hasExistingDirectStacking && (
        <Alert icon={icon}>
          <Stack>
            <styled.p textStyle="body.01">
              It appears that you&apos;re currently stacking. If your locking period recently ended,
              you&apos;ll soon be able to stack again.
            </styled.p>
            <Link to={`/direct-stacking-info${createSearch(activeNetwork)}`}>
              <styled.p textStyle="label.01" className={linkStyles}>
                View your stacking info
              </styled.p>
            </Link>
          </Stack>
        </Alert>
      )}
      {!hasExistingCommitment && !hasEnoughBalanceToPool && !hasEnoughBalanceToDirectStack && (
        <Alert icon={icon}>
          <Stack>
            <styled.p textStyle="body.01">
              It appears that you don&apos;t have enough funds yet. If you recently transferred
              funds to this account, you&apos;ll soon be able to stack.{' '}
            </styled.p>
            <OpenExternalLinkInNewTab display="inline" href={BUY_STACKS_URL}>
              <styled.p textStyle="label.01" className={linkStyles}>
                Consider topping up your account
              </styled.p>
            </OpenExternalLinkInNewTab>
          </Stack>
        </Alert>
      )}
    </Stack>
  );
}
