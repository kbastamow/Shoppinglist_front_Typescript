import { apiRequest } from "../services/apiRequest";
import { IList } from "../types/interfaces/IList";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import ListWithItems from "../components/listWithItems/ListWithItems";
import { Box, LinearProgress } from "@mui/material";
const API_URL = "http://localhost:3500";

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
        <LinearProgress />
      </Box>
    );
  }
  //Stop old data from flashing when navigating different lists
  if (data?.id == listId) {
    return <ListWithItems {...data as IList} />;
  }
};
export default ListPage;
