import React from 'react'
import { apiRequest } from '../services/apiRequest';
import { Box, Stack } from '@mui/material';
import { IList } from '../types/interfaces/IList';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router';
const API_URL = 'http://localhost:3500';

const ActiveLists = () => {

    const navigate = useNavigate()
    const { error, isLoading, data } = useQuery(
        ['active lists'],
        async () => {
          return await apiRequest<IList[]>(
            `${API_URL}/lists`,
            'GET',
          );
        },
        { refetchOnWindowFocus: false },
    )

    if (error) return <div>Error displaying list</div>
    if (isLoading) return <div>Loading</div>
    
    
  return (
    <>
    <div>ActiveLists</div>
    <Stack spacing={2}>

    {data?.map(data => (
       <Box component="span" sx={{ p: 2, border: '1px solid grey', width: '75%'}} key={data.id}  onClick={() => navigate(`/lists/${data.id}`)}>
        <span>{data.date}</span>
        <span>{data.title}</span>
        </Box>
    ))}
    </Stack>
    
 </> 
 )
}


export default ActiveLists