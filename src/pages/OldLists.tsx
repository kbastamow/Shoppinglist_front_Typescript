import { useMutation, useQuery } from "@tanstack/react-query";
import { FC, ReactElement, useState } from "react";
import { apiRequest } from "../helpers/apiRequest";
import { IList } from "../types/interfaces/IList";
import {
  Box,
  Collapse,
  LinearProgress,
  Stack,
  Typography,
} from "@mui/material";
import { dateConverter } from "../helpers/dateConverter";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import { styled } from "@mui/material/styles";
import OldItems from "../components/oldItems/OldItems";
import { API_URL } from "../helpers/apiurl";
import DeleteIcon from "@mui/icons-material/Delete";
import { IDeleteItem } from "../types/interfaces/IDeleteItem";

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}
const ExpandMore = styled((props: ExpandMoreProps) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
  const [expanded] = useState(false);
  const [isOpenCollapse, setIsOpenCollapse] = useState<number | null>(null);

  const { error, isLoading, data, refetch } = useQuery(
    ["lists"],
    async () => {
      return await apiRequest<IList[]>(
        `${API_URL}/lists`,
        "GET",
      );
    },
    { refetchOnWindowFocus: false },
  );

  const deleteListMutation = useMutation(
    async (listId: string) => {
      const deleteResponse = await apiRequest<IDeleteItem>(
        `${API_URL}/lists/${listId}`,
        "DELETE",
      );
      if (deleteResponse) {
        refetch();
      }
    },
  );

  const handleExpandClick = (index: number) => {
    if (isOpenCollapse === index) {
      setIsOpenCollapse(null);
    } else {
      setIsOpenCollapse(index);
    }
  };

  const handleDelete = (listId: string) => {
    deleteListMutation.mutate(listId);
  };

  if (error) return <div>Error displaying lists</div>;
  if (isLoading) {
    return (
      <Box sx={{ width: "100%" }}>
        <LinearProgress color="secondary" />
      </Box>
    );
  }

  return (
    <>
      <Typography className="subtitle" variant="h4">Old lists</Typography>
      <Stack spacing={2} direction="column" alignItems="center">
        {data?.filter((list) => !list.active).map((list, index) => (
          <>
            <Box
              key={"list-" + list.id}
              component="span"
              sx={{
                p: 1,
                border: "2px solid",
                borderColor: "primary.dark",
                width: "85%",
              }}
              onClick={() => handleExpandClick(index)}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography variant="body2">
                  {dateConverter(list.date)}
                </Typography>

                <Typography variant="h5">{list.title}</Typography>

                <Typography>{list.total?.toFixed(2)} €</Typography>
                <Box>
                  <ExpandMore
                    expand={isOpenCollapse === index}
                    onClick={() => handleExpandClick(index)}
                    aria-expanded={expanded}
                    aria-label="show more"
                  >
                    <ExpandMoreIcon />
                  </ExpandMore>
                </Box>
              </Box>

              <Collapse
                in={isOpenCollapse === index}
                timeout="auto"
                unmountOnExit
              >
                {isOpenCollapse === index && <OldItems listId={list.id} />}
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    backgroundColor: "primary.main",
                  }}
                >
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={() => handleDelete(list.id)}
                  >
                    <DeleteIcon sx={{ color: "white" }} />
                  </IconButton>
                </Box>
              </Collapse>
            </Box>
          </>
        ))}
      </Stack>
    </>
  );
};

export default OldLists;
