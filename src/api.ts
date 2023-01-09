import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8888',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.defaults.headers.common = { Authorization: '' };

export const configureToken = (token: string) =>
  (axiosInstance.defaults.headers.common.Authorization = `Bearer ${token}`);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async function (error: any) {
    const originalConfig = error.config;
    if (error.response) {
      const user = localStorage.getItem('user');
      if (error.response.status === 401 && user && !originalConfig._retry) {
        originalConfig._retry = true;
        try {
          const { accessToken } = await refreshTokenRequest();
          configureToken(accessToken);
          return axiosInstance(originalConfig);
        } catch (_error: any) {
          localStorage.clear();
          window.location.assign("/login");
          return Promise.reject(_error);
        }
      }
    }
    return Promise.reject(error);
  }
);

export async function refreshTokenRequest() {
  const response = await axiosInstance.get(`/auth/refresh`);
  return response.data;
}

export const loginRequest = async (data: { email: string; password: string }) => {
  const response = await axiosInstance.post('/auth/login', data);
  return response.data;
};

export const registerRequest = async (data: { name: string, email: string; password: string }) => {
  const response = await axiosInstance.post('/auth/register', data);
  return response.data;
};

export const saveValueStreamRequest = async (data: any) => {
  const response = await axiosInstance.post('/value-streams', data);
  return response.data;
};
export const updateValueStreamRequest = async (data: any) => {
  const response = await axiosInstance.patch(`/value-streams/${data.id}`, data);
  return response.data;
};

export const getValueStreamsRequest = async (id?: string) => {
  const response = await axiosInstance.get(`/value-streams/${id ? id : ''}`);
  return response.data;
};

export const removeValueStreamsRequest = async (id?: string) => {
  const response = await axiosInstance.delete(`/value-streams/${id ? id : ''}`);
  return response.data;
};

export const getScan = async (id?: number) => {
  const response = await axiosInstance.get(`/scans/${id ? id : ''}`);
  return response.data;
};

export default axiosInstance;
