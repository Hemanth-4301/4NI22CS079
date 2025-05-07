import axios from "axios";

const BASE_URL = "http://20.244.56.144/evaluation-service";

export const fetchUsers = () => axios.get(`${BASE_URL}/users`);
export const fetchPostsByUser = (userId) =>
  axios.get(`${BASE_URL}/users/${userId}/posts`);
export const fetchCommentsByPost = (postId) =>
  axios.get(`${BASE_URL}/posts/${postId}/comments`);
