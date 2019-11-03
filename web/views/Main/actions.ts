import { Action } from 'react-fetching-library';

export const getVideos: Action = () => {
  return {
    method: 'GET',
    endpoint: 'http://localhost:4000/videos'
  };
};
