import { useBackend } from 'tgui/backend';
import { Window } from 'tgui/layouts';
import {
  Box,
  Button,
  Dimmer,
  Flex,
  Section,
  Stack,
} from 'tgui-core/components';
import { BooleanLike, classes } from 'tgui-core/react';

type Data = {
  calling: BooleanLike;
  online: BooleanLike;
  talking: BooleanLike;
  my_number: string;
  choosed_number: string;
  calling_user?: string;
};

const CallingWindow = (props) => {
  const { act } = useBackend();
  return (
    <Dimmer>
      <Section>
        <Box inline ml={1}>
          {'Calling...'}
        </Box>
        <br />
        <Box inline ml={1}>
          <Button
            icon="phone-slash"
            color="red"
            onClick={() => {
              act('hang');
            }}
          />
        </Box>
      </Section>
    </Dimmer>
  );
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

const TalkingWindow = (props) => {
  const { act, data } = useBackend<Data>();
  const { calling_user, talking } = data;
  return (
    <Dimmer>
      <Section>
        {talking ? (
          <>
            <Box inline ml={1}>
              {'Current call: ' + calling_user}
            </Box>
            <br />
            <Box inline ml={1}>
              <Button
                icon="phone-slash"
                color="red"
                onClick={() => {
                  act('hang');
                }}
              />
            </Box>
          </>
        ) : (
          <>
            <Box inline ml={1}>
              {'Calling to ' + calling_user + '...'}
            </Box>
            <br />
            <Box inline ml={1}>
              <Button
                icon="phone"
                color="green"
                onClick={() => {
                  act('accept');
                }}
              />
              <Button
                icon="phone-slash"
                color="red"
                onClick={() => {
                  act('decline');
                }}
              />
            </Box>
          </>
        )}
      </Section>
    </Dimmer>
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

export const Telephone = (props) => {
  const { act, data } = useBackend<Data>();
  const { online, calling } = data;
  return (
    <Window width={200} height={470} theme="retro">
      <Window.Content>
        {calling ? (
          <CallingWindow />
        ) : online ? (
          <TalkingWindow />
        ) : (
          <NumpadWindow />
        )}
      </Window.Content>
    </Window>
  );
};
