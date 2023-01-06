import { BrowserRouter as Router } from 'react-router-dom';
import Layout from './components/Layout';
import { AuthProvider } from './context/AuthContext';

import Routes from './routes';



function App() {
  return (
    <Router>
      <AuthProvider>
        <Layout>
          <Routes />
        </Layout>
      </AuthProvider>
    </Router>
  );
}

export default App;
