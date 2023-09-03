// const API_URL = 'https://localhost/3500';
// import { useMutation } from '@tanstack/react-query';
// import { apiRequest } from './apiRequest';
// import { IUpdateItem } from '../types/interfaces/IUpdateItem';
// import { IListItem } from '../types/interfaces/IListItem';

// const itemApi = () => {
//     const createUpdateCategoryMutation = useMutation(
//         async (data: IUpdateItem) => {
//           const categoryResponse = await apiRequest<IListItem>(
//               `${API_URL}/items/${data.id}`,
//               'PUT',
//               {category: data.category}
//               );
    
//             if(categoryResponse) {
//               console.log(categoryResponse)
//             }
//         }
//       )
    
//   return (
//     <></>
//   )
// }

export default itemApi
