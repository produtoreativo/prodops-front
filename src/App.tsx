import React from 'react';
import HomeContainer from 'views/Home/Container';
import Layout from 'general/Layout';
import Store, { browserHistory } from 'general/Store';
import ConnectedRouter from 'general/ConnectedRouter';

function App() {
  return (
    <div className="App">
      <Store>
        <Layout>
          <ConnectedRouter history={browserHistory} />
        </Layout>
      </Store>
    </div>
  );
}

export default App;
