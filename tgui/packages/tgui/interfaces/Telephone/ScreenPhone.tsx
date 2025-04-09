import { Box, Icon, Stack } from 'tgui-core/components';

import { useBackend } from '../../backend';
import { Data, NavigableApps } from '.';

export const ScreenPhone = (props: {
  setApp: React.Dispatch<React.SetStateAction<NavigableApps | null>>;
}) => {
  const { setApp } = props;
  const { act, data } = useBackend<Data>();
  const { choosed_number } = data;

  return (
    <Stack vertical fill backgroundColor="#fff" textColor="#000">
      <Stack.Item>
        <Stack fill align="center" justify="space-between" ml={2} mr={2} mt={1}>
          <Stack.Item>
            <Icon name="chevron-left" size={2} />
          </Stack.Item>
          <Stack.Item>
            <Icon name="ellipsis-vertical" size={2} />
          </Stack.Item>
        </Stack>
      </Stack.Item>
      <Stack.Item>
        <Stack align="center" justify="space-around">
          <Stack.Item>Recents</Stack.Item>
          <Stack.Item
            p={1}
            className="Telephone__NumpadButton"
            onClick={() => setApp(NavigableApps.Contacts)}
          >
            Contacts
          </Stack.Item>
        </Stack>
      </Stack.Item>
      <Stack.Item mt={12}>
        <Box
          style={{
            borderTop: '2px solid #ccc',
            borderBottom: '2px solid #ccc',
          }}
          height={4}
        >
          <Stack fill align="center" justify="center">
            <Stack.Item textAlign="center" fontSize={2} grow>
              {choosed_number}
            </Stack.Item>
            <Stack.Item textAlign="center" ml={1} mr={1}>
              <Icon
                name="delete-left"
                size={2}
                style={{ cursor: 'pointer' }}
                onClick={() => act('keypad', { value: 'C' })}
              />
            </Stack.Item>
          </Stack>
        </Box>
      </Stack.Item>
      <Stack.Item>
        <Box className="Telephone__NumpadGrid" textAlign="center">
          <Box
            className="Telephone__NumpadButton"
            onClick={() => act('keypad', { value: '1' })}
          >
            <Box fontSize={2}>1</Box>
            <Icon name="voicemail" />
          </Box>
          <Box
            className="Telephone__NumpadButton"
            onClick={() => act('keypad', { value: '2' })}
          >
            <Box fontSize={2}>2</Box>
            ABC
          </Box>
          <Box
            className="Telephone__NumpadButton"
            onClick={() => act('keypad', { value: '3' })}
          >
            <Box fontSize={2}>3</Box>
            DEF
          </Box>
          <Box
            className="Telephone__NumpadButton"
            onClick={() => act('keypad', { value: '4' })}
          >
            <Box fontSize={2}>4</Box>
            GHI
          </Box>
          <Box
            className="Telephone__NumpadButton"
            onClick={() => act('keypad', { value: '5' })}
          >
            <Box fontSize={2}>5</Box>
            JKL
          </Box>
          <Box
            className="Telephone__NumpadButton"
            onClick={() => act('keypad', { value: '6' })}
          >
            <Box fontSize={2}>6</Box>
            MNO
          </Box>
          <Box
            className="Telephone__NumpadButton"
            onClick={() => act('keypad', { value: '7' })}
          >
            <Box fontSize={2}>7</Box>
            PQRS
          </Box>
          <Box
            className="Telephone__NumpadButton"
            onClick={() => act('keypad', { value: '8' })}
          >
            <Box fontSize={2}>8</Box>
            TUV
          </Box>
          <Box
            className="Telephone__NumpadButton"
            onClick={() => act('keypad', { value: '9' })}
          >
            <Box fontSize={2}>9</Box>
            WXYZ
          </Box>
          <Box
            className="Telephone__NumpadButton"
            onClick={() => act('keypad', { value: '#' })}
          >
            <Box fontSize={2} mt={0.5}>
              <Icon name="hashtag" fontWeight="1" />
            </Box>
          </Box>
          <Box
            className="Telephone__NumpadButton"
            onClick={() => act('keypad', { value: '0' })}
          >
            <Box fontSize={2}>0</Box>
          </Box>
          <Box
            className="Telephone__NumpadButton"
            onClick={() => act('keypad', { value: '_' })}
          >
            <Box fontSize={2} bold mt={0.5}>
              _
            </Box>
          </Box>
          <Box
            className="Telephone__NumpadButton"
            onClick={() => act('keypad', { value: '+' })}
          >
            <Stack fill align="center" justify="center">
              <Stack.Item>
                <Box fontSize={2}>+</Box>
              </Stack.Item>
            </Stack>
          </Box>
          <Box className="Telephone__NumpadButton" onClick={() => act('call')}>
            <Stack fill align="center" justify="center">
              <Stack.Item>
                <Box
                  backgroundColor="#18885c"
                  style={{ borderRadius: '50%' }}
                  width={4}
                  height={4}
                >
                  <Stack fill align="center" justify="center">
                    <Stack.Item>
                      <Icon name="phone" textColor="white" size={2} />
                    </Stack.Item>
                  </Stack>
                </Box>
              </Stack.Item>
            </Stack>
          </Box>
          <Box
            className="Telephone__NumpadButton"
            style={{ cursor: 'default' }}
          >
            <Box fontSize={2}>
              <Icon name="braille" />
            </Box>
            Hide
          </Box>
        </Box>
      </Stack.Item>
    </Stack>
  );
};
