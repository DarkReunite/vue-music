import axios from 'axios';

export const getMp3List = () => axios.get('/mp3/list');