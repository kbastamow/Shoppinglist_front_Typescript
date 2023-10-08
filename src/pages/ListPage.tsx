import { apiRequest } from "../helpers/apiRequest";
import { IList } from "../types/interfaces/IList";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import ListWithItems from "../components/listWithItems/ListWithItems";
import { Box, LinearProgress } from "@mui/material";
import { ItemProvider } from "../context/ItemContext";
import { API_URL } from "../helpers/apiurl";

const ListPage = () => {
  const { listId } = useParams();
  const { error, isLoading, data } = useQuery(
    ["list"],
    async () => {
      return await apiRequest<IList>(
        `${API_URL}/lists/${listId}`,
        "GET",
      );
    },
    { refetchOnWindowFocus: false },
  );

  if (error) return <div>Error displaying list</div>;
  if (isLoading) {
    return (
      <Box sx={{ width: "100%" }}>
        <LinearProgress color="secondary" />
      </Box>
    );
  }
  //Stop old data from flashing when navigating different lists
  if (data && data.id == listId) {
    return (
      <ItemProvider initialItems={data.items}>
        <ListWithItems {...data as IList} />
      </ItemProvider>
    );
  }
};
export default ListPage;
