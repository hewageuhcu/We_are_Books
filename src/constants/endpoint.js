const BASE_URL = "http://localhost:8080";

const API_ENDPOINTS = {
  GET_ALL_BOOKS: `${BASE_URL}/books`,
  GET_REVIEWS_BY_BOOK_ID:`${BASE_URL}/reviews/book`,
  POST_REVIEW: `${BASE_URL}/reviews`,
  POST_BOOK: `${BASE_URL}/books`,
  LOG: `${BASE_URL}/users/login`,
  SIGN: `${BASE_URL}/users/signup`,
};

export default API_ENDPOINTS;