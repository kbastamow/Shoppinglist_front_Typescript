import { FC, Fragment, ReactElement, useState } from "react";
import ListEntry from "../listEntry/ListEntry";
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
import { IListItem } from "../../types/interfaces/IListItem";
import { useMutation } from "@tanstack/react-query";
import { IAddItem } from "../../types/interfaces/IAddItem";
import { apiRequest } from "../../services/apiRequest";

import { IList } from "../../types/interfaces/IList";
import { IDeleteItem } from "../../types/interfaces/IDeleteItem";
// import { IUpdateItem } from "../../types/interfaces/IUpdateItem";
const API_URL = 'http://localhost:3500';


// interface IListData {
//   title: string;
//   listId: string
// }

const MyList: FC<IList> = (props): ReactElement => {
  console.log("RENDERING")

    const { 
      title = "My List",
      id: listId,
      items: listItems = [
          {
            id: "id",
            name: "Bread",
            collected: false,
            category: {
              name: "No Category"
            }
          }
          ]
          } = props; //giving id a new name
    
    const [items, setItems] = useState<IListItem[]>(listItems)

  const [newItem, setNewItem] = useState<string>("");
  const [finishVisible, setFinishVisible] = useState<boolean>(false);
  const [total, setTotal] = useState<number>(0);
  const [helperText, setHelperText] = useState<string>("");

 const createDeleteMutation = useMutation(
  async(item: IListItem) => {
    const deleteResponse = await apiRequest<IDeleteItem>(
      `${API_URL}/items/${item.id}`,
      'DELETE'
    )
   if (deleteResponse) {
    const updatedItems = items.filter(
      (element) => element.name !== item.name,
    );
    setItems(updatedItems);
   }
  }
 )
 
  const createAddItemMutation = useMutation(
    async (data: IAddItem) => {
        const itemResponse = await apiRequest<IListItem>(
            `${API_URL}/items`,
            'POST',
            data
        )

        console.log(itemResponse)
        if (itemResponse) {
         
            setItems((prevItems) => ([
                {
                  id: itemResponse.id,
                  name: itemResponse.name,
                  collected: itemResponse.collected,
                  category: "No Category",
                },
                ...prevItems,
              ]) as IListItem[]);  //Gotta add this or Typescript doubts the type
              setNewItem("");
            }
        }
  )

  const createUpdateItemMutation = useMutation(
    async (data: IListItem) => {
      console.log(data)
      const updateResponse = await apiRequest<IListItem>(
          `${API_URL}/items/${data.id}`,
          'PUT',
           {...data}
          );
          console.log(updateResponse)
          if (updateResponse) {
           
            const updatedIndex = items.findIndex(element => element.id === data.id);
            const updatedItems = [...items]; 
            updatedItems[updatedIndex].name = updateResponse.name;
            setItems(updatedItems);
          }
    }
  )

  const addItem = () => {
    if (newItem.trim() !== "") {
      createAddItemMutation.mutate({name:newItem, listId: listId})
    }
  };

  const handleDeleteItem = (
    item: IListItem,
  ): void => {
    createDeleteMutation.mutate(item)
  };

  const handleEditItem = (editedItem:IListItem): void => {
    createUpdateItemMutation.mutate(editedItem)
    console.log("Edit item:", editedItem.name);
  };

  const handleFinish = () => {
    if (typeof +total === "number" && +total !== 0) {
      console.log(+total);
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
        sx={{ height: "60vh", overflow: "auto", display: "flex",
        justifyContent: "center", // Horizontally center the content
        alignItems: "center",  }}
      >
        <List
          sx={{
            width: "100%",
            maxWidth: 360,
            bgcolor: "background.paper",
          }}
          subheader={<ListSubheader>{title}</ListSubheader>}
        >
          {!items ? <p>No items</p> :  items.map(item => (
          <Fragment key={item.id}>
            <ListEntry
              item={item}
              onDelete={() => handleDeleteItem(item)}
              onEdit={(editedItem) => handleEditItem(editedItem)}
            >
            </ListEntry>
            <Divider></Divider>
          </Fragment>
))  }; 
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
  )
}

export default MyList;
