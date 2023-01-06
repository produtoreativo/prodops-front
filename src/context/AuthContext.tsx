import { createContext, FC, PropsWithChildren, useContext, useEffect, useState } from 'react';
import { configureToken, loginRequest, registerRequest } from '../api';
import { useHistory } from 'react-router-dom';

interface LoginData {
  email: string;
  password: string;
}
interface SignUpData {
  name: string;
  email: string;
  password: string;
}

interface AuthContextType {
  currentUser: any;
  login(data: LoginData): void;
  register(data: SignUpData): void;
  logout(): void;
}

const AuthContext = createContext<AuthContextType | any>({});

export function useAuth() {
  return useContext(AuthContext);
}

export const AuthProvider: FC<PropsWithChildren> = (props) => {
  const [currentUser, setCurrentUser] = useState(null);
  const history = useHistory();

  async function register(data: SignUpData) {
    try {
      await registerRequest(data)
      history.push('/login');
    } catch (error) {
      console.log(error);
    }
  }

  async function login(data: LoginData) {
    try {
      const loginData = await loginRequest(data);
      configureToken(loginData.accessToken);
      setCurrentUser(loginData.user);
      localStorage.setItem('user', JSON.stringify(loginData.user));
      history.push('/');
    } catch (error) {
      console.log(error);
    }
  }
  function logout() {
    localStorage.clear();
    setCurrentUser(null);
    history.push('/login');
  }

  function loadUser() {
    try {
      return JSON.parse(localStorage.getItem('user') as string);
    } catch {
      return null;
    }
  }

  function configureSession(){
    try {
      const user = loadUser();
      if (!user) {
        return logout();
      }
      setCurrentUser(user);
    } catch (error) {
      logout();
    }
  }

  useEffect(() => {
   configureSession()
  }, []);

  const value = {
    currentUser,
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>;
};
