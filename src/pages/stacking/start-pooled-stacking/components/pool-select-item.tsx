import { OpenExternalLinkInNewTab } from '@components/external-link';
import { Box, color, Flex, FlexProps, Text } from '@stacks/ui';
import { useFocus } from 'use-events';
import { PoolName } from '../types-preset-pools';
import { CustomPoolAddressInput } from './custom-pool-address-input';

interface PoolSelectItemProps extends Omit<FlexProps, 'onChange'> {
  name: PoolName;
  description: string;
  url: string;
  icon: JSX.Element;
  activePoolName: PoolName;
  onChange(poolName: PoolName): void;
}

export function PoolSelectItem(props: PoolSelectItemProps) {
  const { name, description, url, icon, activePoolName, onChange, ...rest } = props;
  const [isFocused, bind] = useFocus();
  return (
    <Flex
      minHeight="72px"
      p="base-loose"
      as="label"
      htmlFor={name}
      border={`1px solid ${color('border')}`}
      borderRadius="12px"
      position="relative"
      {...(isFocused
        ? {
            _before: {
              content: '""',
              position: 'absolute',
              top: '-1px',
              left: '-1px',
              right: '-1px',
              bottom: '-1px',
              borderRadius: '12px',
              border: '2px solid #CEDAFA',
            },
          }
        : {})}
      {...rest}
    >
      <Flex width="100%">
        <Box position="relative" top="-3px">
          {icon}
        </Box>
        <Flex ml="base-loose" width="100%" flexDirection={['column', 'row']}>
          <Box>
            <Text
              textStyle="body.small"
              fontWeight={500}
              display="block"
              style={{ wordBreak: 'break-all' }}
            >
              {name}
            </Text>
            <Text
              textStyle="body.small"
              color={color('text-caption')}
              mt="tight"
              display="inline-block"
              lineHeight="18px"
            >
              {description}
            </Text>

            {name == PoolName.CustomPool ? (
              <CustomPoolAddressInput />
            ) : (
              url && (
                <OpenExternalLinkInNewTab href={url}>
                  <Text
                    textStyle="body.small"
                    color={color('text-caption')}
                    mt="tight"
                    display="inline-block"
                    lineHeight="18px"
                  >
                    Learn more
                  </Text>
                </OpenExternalLinkInNewTab>
              )
            )}
          </Box>
        </Flex>
        <Flex ml="loose" alignItems="center">
          <input
            type="radio"
            id={name}
            name="poolName"
            value={name}
            checked={name === activePoolName}
            style={{ transform: 'scale(1.2)', outline: 0 }}
            onChange={e => onChange(e.target.value as PoolName)}
            {...bind}
          />
        </Flex>
      </Flex>
    </Flex>
  );
}
