import axios from 'axios';

const instance = axios.create({
  // baseURL: 'https://us-central1-challenge-4b2b2.cloudfunctions.net/api',
  baseURL: 'http://localhost:5001/clone-3f4f2/us-central1/api',
});

export default instance;
