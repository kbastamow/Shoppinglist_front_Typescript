import React from "react";
import { apiRequest } from "../services/apiRequest";
import { Box, LinearProgress, Stack } from "@mui/material";
import { IList } from "../types/interfaces/IList";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { dateConverter } from "../helpers/dateConverter";
const API_URL = "http://localhost:3500";

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
      <Stack spacing={2}>
        {data?.filter((list) => list.active).map((list) => (
          <Box
            component="span"
            sx={{ p: 2, border: "1px solid grey", width: "75%" }}
            key={list.id}
            onClick={() => navigate(`/lists/${list.id}`)}
          >
            <span>{dateConverter(list.date)}</span>
            <span>{list.title}</span>
          </Box>
        ))}
      </Stack>
    </>
  );
};

export default ActiveLists;
