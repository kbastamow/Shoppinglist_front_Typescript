// import { ILoginData } from "../types/interfaces/ILoginData";
// import { IUserProfile } from "../types/interfaces/IUserProfile";
// const API_URL = 'http://localhost:3500/'

const token = localStorage.getItem("token-shoppinglist") || "";

type Method = 'GET' | 'PUT' | 'POST' | 'DELETE';

export async function apiRequest<T>(
  url: string,
  method: Method,
  data: unknown = {},
): Promise<T> {
  const requestOptions: RequestInit = {  //RequestInit is a fetch interface
    method,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token,
    },
  };
  //Add body for non-get functions
  if (method !== 'GET') {
    requestOptions.body = JSON.stringify(data);
  }

  const response = await fetch(url, requestOptions);

  if (!response.ok) {
    const message = `An error has occurred: ${response.status}`;
    throw new Error(message);
  }
  const apiResponse = await response.json() as Promise<T>;
  console.log("apiResponse:", apiResponse);
  return apiResponse;
}
