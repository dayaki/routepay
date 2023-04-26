import Axios, { AxiosRequestHeaders } from 'axios';

type RequestType = 'post' | 'put' | 'get' | 'patch' | 'delete';

export const apiService = (
  url: string,
  type: RequestType,
  data?: unknown,
  headers?: AxiosRequestHeaders,
): Promise<any> => {
  if (!url || typeof url !== 'string') {
    throw new Error('Please pass a string url to this function: /path/to/api');
  }
  if (!type || typeof type !== 'string') {
    throw new Error(
      'Please add string api request type: GET, POST, PUT, PATCH, DELETE',
    );
  }

  const headerContent = () => {
    if (headers) {
      if (headers['Content-Type']) {
        return headers['Content-Type'];
      }
      return 'application/json';
    }
    return 'application/json';
  };

  const header = {
    'Content-Type': headerContent(),
    ...headers,
  };

  return new Promise((resolve, reject) => {
    console.log(`${type}: ${url}`);
    Axios({
      method: type,
      url: url,
      data,
      headers: header,
    })
      .then(res => {
        resolve(res.data || res);
      })
      .catch(error => {
        // console.log('axios error', error.response);
        if (error && !error.response) {
          console.log(
            'Could not connect to the server, please check your internet connection',
          );
          reject(new Error());
        }
        reject(error.response?.data);
      });
  });
};
