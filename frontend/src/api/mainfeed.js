import api from './apiConfig.js';

export async function getMainFeed(page) {
  const res = await api.get(`api/home/?page=${page}`);

  return res.data;
}

export async function getUser(username) {
  const res = await api.get(`api/users/${username}/`);
  return res.data;
}


export async function createComment(body) {
  const res = await api.post(`api/create-comment/`, body);
  return res.data;
}
