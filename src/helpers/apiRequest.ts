// import { ILoginData } from "../types/interfaces/ILoginData";
// import { IUserProfile } from "../types/interfaces/IUserProfile";
// const API_URL = 'http://localhost:3500/'

const token = localStorage.getItem("token-shoppinglist") || "";

type Method = 'GET' | 'PUT' | 'POST' | 'DELETE';


// //This helper returns correct formatting based on whether the request is get or other
// function returnCorrectRequest(
//   method: Method,
//   data: unknown,
// ): RequestInit {
//   if (method === 'GET') {
//     return {
//       method: method,
//       headers: {
//         'Content-Type': 'application/json',
//         'Authorization': token
//       },
//     };
//   }

//   return {
//     method: method,
//     body: JSON.stringify(data),
//     headers: {
//         'Content-Type': 'application/json',
//         'Authorization': token
//       },
//   }
// }

// export async function apiRequest<T>(
//   url: string,
//   method: Method,
//   data: unknown = {},
// ): Promise<T> {
//   const response = await fetch(
//     url, 
//     returnCorrectRequest(method, data));

//     if (!response.ok) {  //if response is not 
//         const message = `An error has occurred: ${response.status}`
//         throw new Error(message)
//     }
//     const apiResponse = await response.json() as Promise<T>//We need to use this dot JSON function in order to convert the response in a readable format.
//     console.log(apiResponse)
//     return apiResponse
// }

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

  const apiResponse = await response.json() as T;
  console.log(apiResponse);
  return apiResponse;
}


// export async function loginRequest(data: ILoginData): Promise<IUserProfile> {
//   console.log('Loggin in');
//   return apiRequest(`${API_URL}users/login`, 'POST', data)
// }
