import { FC, ReactElement, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import LinearProgress from "@mui/material/LinearProgress";
import Box from "@mui/material/Box";
import { apiRequest } from "../../services/apiRequest";
import { IList } from "../../types/interfaces/IList";
const API_URL = "http://localhost:3500";

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
};

export default OldItems;
