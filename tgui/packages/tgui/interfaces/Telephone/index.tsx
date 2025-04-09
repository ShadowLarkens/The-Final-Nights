import { useState } from 'react';
import { useBackend } from 'tgui/backend';
import { Window } from 'tgui/layouts';
import { Box, Button, Flex, Icon, Stack } from 'tgui-core/components';
import { BooleanLike, classes } from 'tgui-core/react';

import { ScreenHome } from './ScreenHome';
import { ScreenCalling, ScreenInCall } from './ScreenInCall';
import { ScreenPhone } from './ScreenPhone';

export type Data = {
  calling: BooleanLike;
  online: BooleanLike;
  talking: BooleanLike;
  my_number: string;
  choosed_number: string;
  calling_user?: string;
};

const NumpadWindow = (props) => {
  const { act, data } = useBackend<Data>();
  const { my_number, choosed_number } = data;
  return (
    <Box m="6px">
      <Flex mb={1.5}>
        <Flex.Item width="155px">
          <Box height="60px" className="Telephone__displayBox">
            {my_number}
          </Box>
        </Flex.Item>
        <Flex.Item>
          <Flex justifyContent="space-between" alignItems="center">
            <Button
              icon="book"
              fontSize="20px"
              lineHeight={1}
              textAlign="center"
              width="35px"
              height="40px"
              className="Telephone__Button Telephone__Button--keypad"
              onClick={() => act('contacts')}
            />
            <Button
              icon="wrench"
              fontSize="20px"
              lineHeight={1}
              textAlign="center"
              width="35x"
              height="40px"
              className="Telephone__Button Telephone__Button--settings"
              onClick={() => act('settings')}
            />
          </Flex>
        </Flex.Item>
      </Flex>
      <Flex ml="3px">
        <Flex.Item>
          <PhoneKeypad phoneNumber={choosed_number} />
        </Flex.Item>
      </Flex>
    </Box>
  );
};

const PhoneKeypad = (props) => {
  const { act } = useBackend();
  const keypadKeys = [
    ['1', '4', '7', '_', 'C'],
    ['2', '5', '8', '0', '+'],
    ['3', '6', '9', '#'],
  ];
  return (
    <Box width="185px">
      <Stack>
        {keypadKeys.map((keyColumn, i) => (
          <Stack.Item key={keyColumn[i]}>
            {keyColumn.map((key) => (
              <Button
                fluid
                bold
                key={key}
                mb="6px"
                content={key}
                textAlign="center"
                fontSize="40px"
                lineHeight={1.25}
                width="55px"
                className={classes([
                  'Telephone__Button',
                  'Telephone__Button--keypad',
                  'Telephone__Button--' + key,
                ])}
                onClick={() => act('keypad', { value: key })}
              />
            ))}
            {i === 2 && (
              <Button
                fluid
                bold
                mb="6px"
                icon="phone"
                textAlign="center"
                fontSize="40px"
                lineHeight={1.25}
                width="55px"
                className={classes([
                  'Telephone__Button',
                  'Telephone__Button--keypad',
                  'Telephone__Button--Call',
                ])}
                onClick={() => act('call')}
              />
            )}
          </Stack.Item>
        ))}
      </Stack>
    </Box>
  );
};

export enum NavigableApps {
  Browser,
  Phone,
  Contacts,
  Messages,
  IRS,
}

const PhysicalScreen = (props: {
  app: NavigableApps | null;
  setApp: React.Dispatch<React.SetStateAction<NavigableApps | null>>;
}) => {
  const { act, data } = useBackend<Data>();
  const { app, setApp } = props;

  if (data.calling) {
    return <ScreenCalling />;
  } else if (data.online) {
    return <ScreenInCall />;
  }

  switch (app) {
    case NavigableApps.Phone: {
      return <ScreenPhone setApp={setApp} />;
    }
    case NavigableApps.Contacts: {
      act('contacts');
      setApp(null);
      // fallthrough
    }
    default: {
      return <ScreenHome setApp={setApp} />;
    }
  }
};

export const Telephone = (props) => {
  // TODO: change back to null
  const [app, setApp] = useState<NavigableApps | null>(null);

  return (
    <Window width={285} height={521}>
      <Window.Content fitted>
        {/* {calling ? (
          <CallingWindow />
        ) : online ? (
          <TalkingWindow />
        ) : (
          <NumpadWindow />
        )} */}
        <PhysicalScreen app={app} setApp={setApp} />
        <Box position="fixed" bottom={0} left={0} right={0} height={3}>
          <Stack
            fill
            textColor={app === NavigableApps.Phone ? '#000' : '#fff'}
            backgroundColor={app === NavigableApps.Phone ? '#0004' : null}
            align="center"
            justify="space-around"
          >
            <Stack.Item>
              <Box textAlign="center">
                <Icon name="bars" rotation={90} size={1.5} />
              </Box>
            </Stack.Item>
            <Stack.Item
              onClick={() => setApp(null)}
              className="Telephone__HomeButton"
              width={8}
              height="100%"
            >
              <Stack align="center" justify="center" fill>
                <Stack.Item>
                  <Icon name="square-o" size={1.5} />
                </Stack.Item>
              </Stack>
            </Stack.Item>
            <Stack.Item>
              <Box textAlign="center">
                <Icon name="chevron-left" size={1.5} />
              </Box>
            </Stack.Item>
          </Stack>
        </Box>
      </Window.Content>
    </Window>
  );
};
