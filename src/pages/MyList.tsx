import { FC, Fragment, ReactElement, useEffect, useState } from "react";
import ListEntry from "../components/listEntry/ListEntry";
import {
  Box,
  Button,
  Container,
  Divider,
  List,
  ListSubheader,
  Stack,
  TextField,
} from "@mui/material";
import { IListItem } from "../types/interfaces/IListItem";
import { useMutation } from "@tanstack/react-query";
import { IAddItem } from "../types/interfaces/IAddItem";
import { apiRequest } from "../helpers/apiRequest";
import { IItem } from "../types/interfaces/IItem";
const API_URL = 'http://localhost:3500';
interface ITitle {
  title: string;
}

const MyList: FC<ITitle> = (props): ReactElement => {
  const [items, setItems] = useState<IListItem[]>([
    {
      id: "id",
      name: "Bread",
      collected: false,
      category: "No Category",
    },
    {
      id: "id2",
      name: "Butter",
      collected: false,
      category: "No Category",
    },
  ]);

  const [newItem, setNewItem] = useState<string>("");
  const [finishVisible, setFinishVisible] = useState<boolean>(false);
  const [total, setTotal] = useState<number>(0);
  const [helperText, setHelperText] = useState<string>("");

  const { title = "My List" } = props;

  const createAddItemMutation = useMutation(
    async (data: IAddItem) => {
        const itemResponse = await apiRequest<IItem>(
            `${API_URL}/items`,
            'POST',
            data
        )

        const result = itemResponse.item

        if (itemResponse) {
            setItems((prevItems) => ([
                {
                  id: result.id,
                  name: result.name,
                  collected: result.collected,
                  category: "No Category",
                },
                ...prevItems,
              ]) as IListItem[]);  //Gotta add this or Typescript doubts the type
              setNewItem("");
            }
        }
  )




  const addItem = () => {
    if (newItem.trim() !== "") {
    //   setItems((prevItems) => [
    //     {
    //       id: "mock id",
    //       name: newItem,
    //       collected: false,
    //       category: "No Category",
    //     },
    //     ...prevItems,
    //   ]);
    //   setNewItem("");
      createAddItemMutation.mutate({name:newItem})
    }
   
  };

  const renderListItems = () => {
    return items?.length < 1 ? <p>No items</p> : (
      items?.map((item) => (
        <>
          <Fragment key={item.id}>
            <ListEntry
              item={item}
              onDelete={() => handleDeleteItem(item.name)}
              onEdit={() => handleEditItem(item.name)}
            >
            </ListEntry>
            <Divider></Divider>
          </Fragment>
        </>
      ))
    );
  };

  useEffect(() => {
    renderListItems();
  }, [items]);

  const handleDeleteItem = (
    itemToDelete: string,
  ): void => {
    const updatedItems = items.filter(
      (item) => item.name !== itemToDelete,
    );
    setItems(updatedItems);
  };

  const handleEditItem = (itemToEdit: string): void => {
    console.log("Edit item:", itemToEdit);
  };

  const handleFinish = () => {
    if (typeof +total === "number" && +total !== 0) {
      console.log(+total);
      console.log("finish");
    }
  };

  const handleTotalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const pattern = /^[0-9.]+$/;

    console.log(
      e.target.value.length || 
        !pattern.test(e.target.value),
    );
    if (e.target.value.length > 5) {
      setHelperText(
        "Valid format: 19.99",
      );
    } else {
      setHelperText("");
    }
    setTotal(+e.target.value);
  };

  return (
    <Container
      sx={{ mt: 7 }}
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
        sx={{ height: "60vh", overflow: "auto" }}
      >
        <List
          sx={{
            width: "100%",
            maxWidth: 360,
            bgcolor: "background.paper",
          }}
          subheader={<ListSubheader>{title}</ListSubheader>}
        >
          {renderListItems()}
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
      {!finishVisible
        ? <></>
        : (
          <Stack direction="row" justifyContent="space-around">
            <TextField
              sx={{ m: 2, width: "50%" }}
              size="small"
              label="Total"
              helperText={helperText}
              value={total}
              onChange={(e) => handleTotalChange(e as React.ChangeEvent<HTMLInputElement>)}
            />
            <Button
              sx={{ m: 2 }}
              variant="contained"
              onClick={handleFinish}
            >
              Finish
            </Button>
          </Stack>
        )}
    </Container>
  );
};

export default MyList;
