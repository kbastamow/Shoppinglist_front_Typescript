import {
  FC,
  Fragment,
  ReactElement,
  useContext,
  useEffect,
  useState,
} from "react";
import ListEntry from "../listEntry/ListEntry";
import {
  Box,
  Button,
  Chip,
  Container,
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  List,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { IListItem } from "../../types/interfaces/IListItem";
import { useMutation } from "@tanstack/react-query";
import { IAddItem } from "../../types/interfaces/IAddItem";
import { apiRequest } from "../../helpers/apiRequest";
import { IList } from "../../types/interfaces/IList";
import { IDeleteItem } from "../../types/interfaces/IDeleteItem";
import { IUpdateList } from "../../types/interfaces/IUpdateList";
import { useNavigate } from "react-router";
import { ItemContext } from "../../context/ItemContext/ItemContext";
import { API_URL } from "../../helpers/apiurl";

// interface IListData {
//   title: string;
//   listId: string
// }

const ListWithItems: FC<IList> = (props): ReactElement => {
  const navigate = useNavigate();

  const {
    title = "My List",
    id: listId,
    items: listItems,
  } = props; //giving id a new name

  const [finishOption, setFinishOption] = useState("removeEmpty");
  // const [items, setItems] = useState<IListItem[] | []>([]);
  const { items, updateItems } = useContext(ItemContext);
  const [newItem, setNewItem] = useState<string>("");
  const [finishVisible, setFinishVisible] = useState<boolean>(false);
  const [total, setTotal] = useState<string>("0");
  const [helperText, setHelperText] = useState<string>("");

  useEffect(() => {
    updateItems(listItems);
  }, [listItems]);

  useEffect(() => {
    console.log("items have changed:", items);
  }, [items]);

  const createDeleteMutation = useMutation(
    async (item: IListItem) => {
      const deleteResponse = await apiRequest<IDeleteItem>(
        `${API_URL}/items/${item.id}`,
        "DELETE",
      );
      if (deleteResponse) {
        const updatedItems = items.filter(
          (element) => element.id !== item.id,
        );
        updateItems(updatedItems);
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
        const updated = [{
          id: itemResponse.id,
          name: itemResponse.name,
          collected: itemResponse.collected,
          category: {
            name: "No Category",
          },
        }, ...items];
        updateItems(updated);
        setNewItem("");
      }
    },
  );

  const createUpdateItemMutation = useMutation(
    async (data: IListItem) => {
      const updateResponse = await apiRequest<IListItem>(
        `${API_URL}/items/${data.id}`,
        "PUT",
        { ...data },
      );
      if (updateResponse) {
        const updatedIndex = items.findIndex((element) =>
          element.id === data.id
        );
        const updatedItems = [...items];
        updatedItems[updatedIndex].name = updateResponse.name;
        updatedItems[updatedIndex].collected = updateResponse.collected;
        updateItems(updatedItems);
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
  };

  const handleFinish = async () => {
    const totalNumber = +total;
    if (!isNaN(totalNumber) && totalNumber !== 0) {
      totalNumber.toFixed(2);

      if (finishOption === "removeEmpty") {
        console.log("Remove unchecked");
        const itemsToDelete = items.filter((item) => !item.collected);
        const updatePromises = itemsToDelete.map((item) =>
          createDeleteMutation.mutate(item)
        );
        await Promise.all(updatePromises);
      } else {
        const allChecked = items.filter((item) => !item.collected).map((
          item,
        ) => ({ ...item, collected: true }));
        const updatePromises = allChecked.map((item) =>
          createUpdateItemMutation.mutate(item)
        );
        await Promise.all(updatePromises);
      }
      createFinishListMutation.mutate(parseFloat(totalNumber.toFixed(2)));
      setHelperText("");
    } else {
      setHelperText(
        "Valid format: 19.99",
      );
    }
  };

  const sortUncheckedFirst = () => {
    const newOrder = items.slice().sort((a, b) => {
      if (a.collected && !b.collected) {
        return 1;
      } else if (!a.collected && b.collected) {
        return -1;
      } else {
        return 0;
      }
    });
    updateItems(newOrder);
  };

  const groupByCategory = () => {
    const newOrder = items.slice().sort((a, b) => {
      const categoryA = a.category;
      const categoryB = b.category;
      if (categoryA === null) {
        return 1;
      } else if (categoryB === null) {
        return -1;
      } else if (categoryA?.name && categoryB?.name) { //only necessary to be explicit to keep typescript happy
        console.log(categoryA);
        console.log(categoryB);
        return (categoryA.name).localeCompare(categoryB.name);
      }
      return 0; // In case both are null
    });
    console.log(newOrder);
    updateItems(newOrder);
  };

  return (
    <Container
      sx={{ mt: 2, mb: 4 }}
    >
      <Box sx={{ mb: 2, py: 2, background: "beige" }}>
        <TextField
          size="small"
          value={newItem}
          onChange={(e) =>
            setNewItem(
              e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1),
            )}
        />
        <Button onClick={addItem}>Add item</Button>
      </Box>
      <Box>
        <Typography className="subtitle" variant="h5">
          {title}
        </Typography>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Chip label="Order by category" onClick={() => groupByCategory()} />
        <Chip label="Unchecked first" onClick={() => sortUncheckedFirst()} />
      </Box>
      <Box
        sx={{
          height: "60vh",
          overflow: "auto",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <List
          sx={{
            width: "100%",
            maxWidth: 360,
            bgcolor: "background.paper",
          }}
        >
          {(!items || items.length === 0)
            ? <p>No items</p>
            : items.map((item) => (
              <Fragment key={item.id}>
                <ListEntry
                  item={item}
                  onDelete={() => handleDeleteItem(item)}
                  onEdit={(editedItem) => handleEditItem(editedItem)}
                />
                <Divider></Divider>
              </Fragment>
            ))}
        </List>
      </Box>
      <Button
        fullWidth
        size="small"
        variant="contained"
        onClick={() => {
          setFinishVisible(!finishVisible);
        }}
      >
        {!finishVisible ? <>Click to finish</> : <>Hide</>}
      </Button>

      {finishVisible && (
        <>
          <Box sx={{ display: "flex" }}>
            <TextField
              sx={{ width: "50%", mt: 2 }}
              size="small"
              label="Total"
              helperText={helperText}
              value={total}
              onChange={(e) => setTotal(e.target.value)}
            />
          </Box>
          <Stack direction="row" justifyContent="space-around">
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

export default ListWithItems;
