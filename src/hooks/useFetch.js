import {useState, useEffect} from 'react';
import axios from 'axios';

import useLocalStorage from 'hooks/useLocalStorage';

export default (url) => {
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [options, setOptions] = useState({});
  const [token] = useLocalStorage('token');

  const doFetch = (options = {}) => {
    setOptions(options);
    setIsLoading(true);
  };

  useEffect(() => {
    const requestOptions = {
      ...options,
      ...{
        headers: {
          authorization: token ? `Token ${token}` : '',
        }
      }
    };

    if (!isLoading) {
      return;
    }

    axios(`https://conduit.productionready.io/api/${url}`, requestOptions)
      .then((res) => {
        setIsLoading(false);
        setResponse(res.data);
      })
      .catch((error) => {
        setIsLoading(false);
        setError(error.response.data);
      });
  }, [isLoading, options, url]);

  return [{isLoading, response, error}, doFetch];
};
