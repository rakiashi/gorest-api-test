/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * This Method userService is an generic method which accepts user api method type , base path
 * and optional request body which is applicable for POST / PUT method
 * which can be used for createNewUser , getUserDetailsByUserId , updateUserDetailsByUserId, deleteUserByUserId
 * returns respective api response
 */
const baseUrl = process.env.BASE_URL;
const getBearerToken = () => process.env.BEARER_TOKEN || '';

const createHeaders = (): HeadersInit => ({
  'Content-Type': 'application/json',
  Authorization: `Bearer ${getBearerToken()}`,
});

export const userService = {
  request: async (method: string, path: string, body?: any) => {
    const options: RequestInit = {
      method,
      headers: createHeaders(),
      body: body ? JSON.stringify(body) : undefined,
    };
    const response = await fetch(`${baseUrl}${path}`, options);
    return response;
  },

  getUserDetailsByUserId: async (path: number) =>
    userService.request('GET', `/users/${path}`),
  createNewUser: async (body: any) =>
    userService.request('POST', '/users', body),
  updateUserDetailsByUserId: async (path: number, body: any) =>
    userService.request('PUT', `/users/${path}`, body),
  deleteUserByUserId: async (path: number) =>
    userService.request('DELETE', `/users/${path}`),
};
