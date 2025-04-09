import { useState } from 'react';
import { useBackend, useSharedState } from 'tgui/backend';
import { Window } from 'tgui/layouts';
import { Box, Icon, Stack } from 'tgui-core/components';
import { BooleanLike } from 'tgui-core/react';

import { ScreenContacts } from './ScreenContacts';
import { ScreenHome } from './ScreenHome';
import { ScreenCalling, ScreenInCall } from './ScreenInCall';
import { ScreenPhone } from './ScreenPhone';

export type Contact = {
  name: string;
  number: string;
};

export type Data = {
  calling: BooleanLike;
  online: BooleanLike;
  talking: BooleanLike;
  my_number: string;
  choosed_number: string;
  calling_user?: string;
  our_number: string;

  published_numbers: Contact[];
  our_contacts: Contact[];
  our_blocked_contacts: Contact[];
};

export enum NavigableApps {
  // Browser, // TODO: Set up a server wiki that allows iframes
  Phone,
  Recents,
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

  const [enteredNumber, setEnteredNumber] = useSharedState('enteredNumber', '');

  switch (app) {
    case NavigableApps.Phone: {
      return (
        <ScreenPhone
          enteredNumber={enteredNumber}
          setEnteredNumber={setEnteredNumber}
          setApp={setApp}
        />
      );
    }
    case NavigableApps.Contacts: {
      return (
        <ScreenContacts
          enteredNumber={enteredNumber}
          setEnteredNumber={setEnteredNumber}
          setApp={setApp}
        />
      );
    }
    default: {
      return <ScreenHome setApp={setApp} />;
    }
  }
};

const NavigationBar = (props: {
  app: NavigableApps | null;
  setApp: React.Dispatch<React.SetStateAction<NavigableApps | null>>;
}) => {
  const { app, setApp } = props;

  let textColor = '#fff';
  if (app === NavigableApps.Phone || app === NavigableApps.Contacts) {
    textColor = '#000';
  }

  let backgroundColor: string | null = null;
  if (app === NavigableApps.Phone || app === NavigableApps.Contacts) {
    backgroundColor = '#0004';
  }

  return (
    <Box position="fixed" bottom={0} left={0} right={0} height={3}>
      <Stack
        fill
        textColor={textColor}
        backgroundColor={backgroundColor}
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
  );
};

export const Telephone = (props) => {
  const [app, setApp] = useState<NavigableApps | null>(null);

  return (
    <Window width={285} height={521}>
      <Window.Content fitted>
        <PhysicalScreen app={app} setApp={setApp} />
        <NavigationBar app={app} setApp={setApp} />
      </Window.Content>
    </Window>
  );
};
