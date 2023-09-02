
const API_URL = 'https://localhost/3500';
import { useMutation } from '@tanstack/react-query';
import { ILoginData } from '../types/interfaces/ILoginData';
import { apiRequest } from '../helpers/apiRequest';

export const Login = async (data: ILoginData) => {
    
    const createTaskMutation = useMutation(
        (data: ILoginData) => {
          console.log('Api request starting');
          return apiRequest(
            API_URL,
            'POST',
            data,
          );
        },
      );

      createTaskMutation.mutate(data);
    
  };
  