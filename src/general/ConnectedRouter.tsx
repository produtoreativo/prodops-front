import React from 'react'
import { ConnectedRouter } from 'connected-react-router';
import { History } from 'history';
import { Switch } from 'react-router-dom';
import Suspense from 'components/Suspense';
import { renderRoutes } from 'react-router-config';
import RootRoutes from 'general/RootRoutes';

type ConnectedRouterProps = {
  history: History
}

export default function ConnectedRouterApp(props: ConnectedRouterProps) {
  return (
    <ConnectedRouter history={props.history}>
      <Switch>
        <Suspense>
          {renderRoutes(RootRoutes)}
        </Suspense>
      </Switch>
    </ConnectedRouter>
  )
}
