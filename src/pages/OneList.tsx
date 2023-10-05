import { apiRequest } from "../services/apiRequest";
import { IList } from "../types/interfaces/IList";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import MyList from "../components/myList/MyList";
import { Box, LinearProgress } from "@mui/material";
const API_URL = "http://localhost:3500";

const OneList = () => {
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
    console.log(data);

    return <MyList {...data as IList} />;
  }
};
export default OneList;
