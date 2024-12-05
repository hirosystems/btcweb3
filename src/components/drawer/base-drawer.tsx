import { ReactNode, Suspense, memo, useCallback, useRef } from 'react';

import { css } from '@emotion/react';
import { Box, Flex, FlexProps, transition, useEventListener } from '@stacks/ui';

import { hideScrollbarStyle } from '@components/styles/hide-scrollbar';
import { useNavigate } from '@hooks/use-navigate';
import { useOnClickOutside } from '@hooks/use-onclickoutside';

import { DrawerHeader } from './components/drawer-header';
import { token } from 'leather-styles/tokens';

function useDrawer(isShowing: boolean, onClose: () => void, pause?: boolean) {
  const ref = useRef(null);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (isShowing && e.key === 'Escape') {
        onClose();
      }
    },
    [onClose, isShowing]
  );

  useOnClickOutside(ref, !pause && isShowing ? onClose : null);
  useEventListener('keydown', handleKeyDown);

  return ref;
}

interface BaseDrawerProps extends Omit<FlexProps, 'title'> {
  children?: ReactNode;
  enableGoBack?: boolean;
  icon?: JSX.Element;
  isShowing: boolean;
  isWaitingOnPerformedAction?: boolean;
  onClose?(): void;
  pauseOnClickOutside?: boolean;
  title?: string;
  waitingOnPerformedActionMessage?: string;
}
const BaseDrawerComponent = (props: BaseDrawerProps) => {
  const {
    children,
    enableGoBack,
    icon,
    isShowing,
    isWaitingOnPerformedAction,
    onClose,
    pauseOnClickOutside,
    title,
    waitingOnPerformedActionMessage,
    ...rest
  } = props;
  const ref = useDrawer(
    isShowing,
    onClose
      ? onClose
      : () => {
          return;
        },
    pauseOnClickOutside
  );
  const navigate = useNavigate();

  const onGoBack = () => navigate(-1);

  return (
    <Flex
      display={isShowing ? 'flex' : 'none'}
      bg={`rgba(0,0,0,0.${isShowing ? 4 : 0})`}
      transition={transition}
      position="fixed"
      top={0}
      left={0}
      height="100%"
      pt="loose"
      width="100%"
      alignItems={['flex-end', 'center', 'center']}
      justifyContent="center"
      flexDirection="column"
      zIndex={1000}
      style={{
        pointerEvents: !isShowing ? 'none' : 'unset',
        userSelect: !isShowing ? 'none' : 'unset',
        willChange: 'background',
      }}
      {...rest}
    >
      <Flex
        flexDirection="column"
        flexGrow={0}
        ref={ref}
        opacity={isShowing ? 1 : 0}
        transform={isShowing ? 'none' : 'translateY(35px)'}
        transition={isShowing ? transition + ' 0.1s' : transition}
        transitionDuration="0.4s"
        willChange="transform, opacity"
        width="100%"
        maxWidth="472px"
        bg={token('colors.ink.text-primary')}
        borderTopLeftRadius="16px"
        borderTopRightRadius="16px"
        borderBottomLeftRadius={[0, '16px', '16px', '16px']}
        borderBottomRightRadius={[0, '16px', '16px', '16px']}
        position="relative"
        mt={['auto', 'unset', 'unset', 'unset']}
        maxHeight={['calc(100vh - 24px)', 'calc(100vh - 96px)']}
      >
        <Box
          css={css`
            overflow-y: scroll;
            ${hideScrollbarStyle}
          `}
        >
          <DrawerHeader
            enableGoBack={enableGoBack}
            icon={icon}
            isWaitingOnPerformedAction={isWaitingOnPerformedAction}
            onClose={onClose}
            onGoBack={onGoBack}
            title={title}
            waitingOnPerformedActionMessage={waitingOnPerformedActionMessage}
          />
          <Flex maxHeight="100%" flexGrow={1} flexDirection="column">
            <Suspense fallback={<></>}>{children}</Suspense>
          </Flex>
        </Box>
      </Flex>
    </Flex>
  );
};
export const BaseDrawer = memo(BaseDrawerComponent);
