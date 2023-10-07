import React from "react";
import { apiRequest } from "../services/apiRequest";
import { Box, LinearProgress, Stack } from "@mui/material";
import { IList } from "../types/interfaces/IList";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { dateConverter } from "../helpers/dateConverter";
import { API_URL } from "../helpers/apiurl";

const ActiveLists = () => {
  const navigate = useNavigate();
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
      <div>ActiveLists</div>
      <Stack spacing={2} direction="column" alignItems="center">
        {data?.filter((list) => list.active).map((list) => (
          <Box
            sx={{
              p: 2,
              border: "1px solid red",
              width: "75%",
              display: "flex",
              justifyContent: "start",
              gap: 5,
            }}
            key={list.id}
            onClick={() => navigate(`/lists/${list.id}`)}
          >
            <Box>{dateConverter(list.date)}</Box>
            <Box>{list.title}</Box>
          </Box>
        ))}
      </Stack>
    </>
  );
};

export default ActiveLists;
