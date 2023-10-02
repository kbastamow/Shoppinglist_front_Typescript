import { apiRequest } from "../services/apiRequest";
import { IList } from "../types/interfaces/IList";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import MyList from "../components/myList/MyList";
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
  if (isLoading) return <div>Loading</div>;

  if (data) {
    console.log(data);

    return <MyList {...data as IList} />;
  }
};
export default OneList;
