import { useQuery } from "@tanstack/react-query";
import { FC, ReactElement, useRef, useState } from "react";
import { apiRequest } from "../services/apiRequest";
import { IList } from "../types/interfaces/IList";
import { Box, Collapse, LinearProgress, Stack } from "@mui/material";
import { dateConverter } from "../helpers/dateConverter";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import { styled } from "@mui/material/styles";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import OldItems from "../components/oldItems/OldItems";

const API_URL = "http://localhost:3500";

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

const OldLists: FC = (): ReactElement => {
  const [expanded, setExpanded] = useState(false);
  const [isOpenCollapse, setIsOpenCollapse] = useState(null);
  const oldItemsRef = useRef(null);
  console.log(oldItemsRef);
  const { error, isLoading, data } = useQuery(
    ["lists"],
    async () => {
      return await apiRequest<IList[]>(
        `${API_URL}/lists`,
        "GET",
      );
    },
    { refetchOnWindowFocus: false },
  );

  const oldItemsComponent = (listId) => {
    console.log("here we go", listId);
    return <OldItems listId={listId} />;
  };

  const handleExpandClick = (index, listId) => {
    if (isOpenCollapse === index) {
      setIsOpenCollapse(null);
      oldItemsRef.current = null;
    } else {
      setIsOpenCollapse(index);
      oldItemsRef.current = listId;
    }
  };

  if (error) return <div>Error displaying lists</div>;
  if (isLoading) {
    return (
      <Box sx={{ width: "100%" }}>
        <LinearProgress />
      </Box>
    );
  }

  return (
    <>
      <div>Old lists</div>
      <Stack spacing={2}>
        {data?.filter((list) => !list.active).map((list, index) => (
          <>
            <Box
              component="span"
              sx={{
                p: 2,
                border: "1px solid grey",
                width: "90%",
              }}
              key={list.title}
              onClick={() => handleExpandClick(index, list.id)}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <span>{dateConverter(list.date)}</span>
                <span>{list.title}</span>
                <span>{list.total} €</span>
                <span>
                  <ExpandMore
                    expand={isOpenCollapse === index}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                  >
                    <ExpandMoreIcon />
                  </ExpandMore>
                </span>
              </Box>

              <Collapse
                in={isOpenCollapse === index}
                timeout="auto"
                unmountOnExit
              >
                {oldItemsRef.current === list.id && oldItemsComponent(list.id)}
              </Collapse>
            </Box>
          </>
        ))}
      </Stack>
    </>
  );
};

export default OldLists;
