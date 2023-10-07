import { FC, ReactElement } from "react";
import { useQuery } from "@tanstack/react-query";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import LinearProgress from "@mui/material/LinearProgress";
import Box from "@mui/material/Box";
import { apiRequest } from "../../helpers/apiRequest";
import { IList } from "../../types/interfaces/IList";
import { API_URL } from "../../helpers/apiurl";

interface OldItemProps {
  listId: string;
}

const OldItems: FC<OldItemProps> = ({ listId }: OldItemProps): ReactElement => {
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
  if (error) return <div>Error displaying lists</div>;
  if (isLoading) {
    return (
      <Box sx={{ width: "100%" }}>
        <LinearProgress />
      </Box>
    );
  }

  if (data) {
    return (
      <>
        {(data?.items?.length > 0)
          ? (
            <List sx={{ width: "100%" }}>
              {data.items.map((item) => (
                <ListItem key={item.id} disablePadding>
                  <ListItemText primary={item.name} />
                </ListItem>
              ))}
            </List>
          )
          : <></>}
      </>
    );
  }

  return <></>;
};

export default OldItems;
