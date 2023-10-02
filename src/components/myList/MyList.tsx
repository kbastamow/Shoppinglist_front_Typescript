import { FC, Fragment, ReactElement, useState } from "react";
import ListEntry from "../listEntry/ListEntry";
import {
  Box,
  Button,
  Container,
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  List,
  ListSubheader,
  Radio,
  RadioGroup,
  Stack,
  TextField,
} from "@mui/material";
import { IListItem } from "../../types/interfaces/IListItem";
import { useMutation } from "@tanstack/react-query";
import { IAddItem } from "../../types/interfaces/IAddItem";
import { apiRequest } from "../../services/apiRequest";

import { IList } from "../../types/interfaces/IList";
import { IDeleteItem } from "../../types/interfaces/IDeleteItem";
import { IUpdateItem } from "../../types/interfaces/IUpdateItem";
import { IUpdateList } from "../../types/interfaces/IUpdateList";
import { useNavigate } from "react-router";

// import { IUpdateItem } from "../../types/interfaces/IUpdateItem";
const API_URL = "http://localhost:3500";

// interface IListData {
//   title: string;
//   listId: string
// }

const MyList: FC<IList> = (props): ReactElement => {
  console.log("RENDERING");
  const navigate = useNavigate();

  const {
    title = "My List",
    id: listId,
    items: listItems,
  } = props; //giving id a new name

  const [finishOption, setFinishOption] = useState("removeEmpty");
  const [items, setItems] = useState<IListItem[]>(listItems);
  const [newItem, setNewItem] = useState<string>("");
  const [finishVisible, setFinishVisible] = useState<boolean>(false);
  const [total, setTotal] = useState<string>("0");
  const [helperText, setHelperText] = useState<string>("");

  console.log("ITEMS:", items);

  const createDeleteMutation = useMutation(
    async (item: IListItem) => {
      const deleteResponse = await apiRequest<IDeleteItem>(
        `${API_URL}/items/${item.id}`,
        "DELETE",
      );
      if (deleteResponse) {
        const updatedItems = items.filter(
          (element) => element.name !== item.name,
        );
        setItems(updatedItems);
      }
    },
  );

  const createAddItemMutation = useMutation(
    async (data: IAddItem) => {
      const itemResponse = await apiRequest<IListItem>(
        `${API_URL}/items`,
        "POST",
        data,
      );

      if (itemResponse) {
        setItems((prevItems) =>
          [
            {
              id: itemResponse.id,
              name: itemResponse.name,
              collected: itemResponse.collected,
              category: "No Category",
            },
            ...prevItems,
          ] as IListItem[]
        ); //Gotta add this or Typescript doubts the type
        setNewItem("");
      }
    },
  );

  const createUpdateItemMutation = useMutation(
    async (data: IListItem) => {
      console.log("data to update backend", data);
      console.log(data.id);
      const updateResponse = await apiRequest<IListItem>(
        `${API_URL}/items/${data.id}`,
        "PUT",
        { ...data },
      );
      console.log("Response", updateResponse);
      if (updateResponse) {
        const updatedIndex = items.findIndex((element) =>
          element.id === data.id
        );
        const updatedItems = [...items];
        updatedItems[updatedIndex].name = updateResponse.name;
        updatedItems[updatedIndex].collected = updateResponse.collected;

        console.log("Items after update:", updatedItems);
        setItems(updatedItems);
      }
    },
  );

  const createFinishListMutation = useMutation(
    async (total: number) => {
      const updateResponse = await apiRequest<IUpdateList>(
        `${API_URL}/lists/${listId}`,
        "PUT",
        { active: false, total: total },
      );
      if (updateResponse) {
        navigate("/shoppingComplete");
      }
    },
  );

  const addItem = () => {
    if (newItem.trim() !== "") {
      createAddItemMutation.mutate({ name: newItem, listId: listId });
    }
  };

  const handleDeleteItem = (
    item: IListItem,
  ): void => {
    createDeleteMutation.mutate(item);
  };

  const handleEditItem = (editedItem: IListItem): void => {
    createUpdateItemMutation.mutate(editedItem);
    console.log("Edit item:", editedItem.name);
  };

  const handleFinish = async () => {
    console.log(total);
    const totalNumber = +total;
    if (!isNaN(totalNumber) && totalNumber !== 0) {
      totalNumber.toFixed(2);
      console.log("ready to finish");

      if (finishOption === "removeEmpty") {
        console.log("Remove unchecked");

        const itemsToDelete = items.filter((item) => !item.collected);
        console.log(itemsToDelete);
        const updatePromises = itemsToDelete.map((item) =>
          createDeleteMutation.mutate(item)
        );
        const updateResult = await Promise.all(updatePromises);
        console.log("After bulkdelete:", updateResult);
      } else {
        const allChecked = items.filter((item) => !item.collected).map((
          item,
        ) => ({ ...item, collected: true }));
        const updatePromises = allChecked.map((item) =>
          createUpdateItemMutation.mutate(item)
        );
        const updateResult = await Promise.all(updatePromises);
        console.log("After bulkupdate:", updateResult);
      }
      createFinishListMutation.mutate(parseFloat(totalNumber.toFixed(2)));
      setHelperText("");
    } else {
      setHelperText(
        "Valid format: 19.99",
      );
    }
  };

  return (
    <Container
      sx={{ mt: 7, mb: 4 }}
    >
      <Box sx={{ mb: 2 }}>
        <TextField
          size="small"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
        />
        <Button onClick={addItem}>Add item</Button>
      </Box>
      <Box
        sx={{
          height: "60vh",
          overflow: "auto",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <List
          sx={{
            width: "100%",
            maxWidth: 360,
            bgcolor: "background.paper",
          }}
          subheader={<ListSubheader>{title}</ListSubheader>}
        >
          {!items
            ? <p>No items</p>
            : items.map((item) => (
              <Fragment key={item.id}>
                <ListEntry
                  item={item}
                  onDelete={() => handleDeleteItem(item)}
                  onEdit={(editedItem) => handleEditItem(editedItem)}
                >
                </ListEntry>
                <Divider></Divider>
              </Fragment>
            ))};
        </List>
      </Box>
      <Button
        fullWidth
        size="small"
        variant="contained"
        onClick={() => setFinishVisible(!finishVisible)}
      >
        {!finishVisible ? <>Click to finish</> : <>Hide</>}
      </Button>

      {finishVisible && (
        <>
          <FormControl>
            <FormLabel id="options"></FormLabel>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
              value={finishOption}
              onChange={(e) => setFinishOption(e.target.value)}
            >
              <FormControlLabel
                value="removeEmpty"
                control={<Radio />}
                label="Remove unchecked items"
              />
              <FormControlLabel
                value="checkEmpty"
                control={<Radio />}
                label="Mark all as checked"
              />
            </RadioGroup>
          </FormControl>

          <Stack direction="row" justifyContent="space-around">
            <TextField
              sx={{ width: "50%" }}
              size="small"
              label="Total"
              helperText={helperText}
              value={total}
              onChange={(e) => setTotal(e.target.value)}
              // onChange={(e) => handleTotalChange(e as React.ChangeEvent<HTMLInputElement>)}
            />
            <Button
              sx={{ m: 2 }}
              variant="contained"
              onClick={handleFinish}
            >
              Finish
            </Button>
          </Stack>
        </>
      )}
    </Container>
  );
};

export default MyList;
