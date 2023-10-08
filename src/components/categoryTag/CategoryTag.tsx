import { FC, ReactElement, useContext, useState } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import * as React from "react";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import { Chip } from "@mui/material";
import { EnumCategory } from "../../types/EnumCategory";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "../../helpers/apiRequest";
import { IUpdateItem } from "../../types/interfaces/IUpdateItem";
import { IListItem } from "../../types/interfaces/IListItem";
import { ItemContext } from "../../context/ItemContext/ItemContext";
import { API_URL } from "../../helpers/apiurl";
import { categoryColors } from "../../assets/colors";

interface CategoryProps {
  itemId: string;
  catName: string;
}

const categories = Object.values(EnumCategory);

export interface CategoryDialogProps {
  open: boolean;
  selectedValue: string;
  onClose: (value: string) => void;
}

function CategoryDialog(props: CategoryDialogProps) {
  const { onClose, selectedValue, open } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value: string) => {
    onClose(value);
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Pick a category</DialogTitle>
      <List sx={{ pt: 0, maxHeight: 300 }}>
        {categories.sort().map((category) => (
          <ListItem key={category}>
            <Chip
              label={category}
              sx={{ bgcolor: categoryColors[category] }}
              size="small"
              onClick={() => handleListItemClick(category)}
              key={category}
            />
          </ListItem>
        ))}
      </List>
    </Dialog>
  );
}

const CategoryTag: FC<CategoryProps> = (props): ReactElement => {
  const { itemId, catName } = props;
  const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = useState(catName);
  const { items, updateItems } = useContext(ItemContext);

  const createUpdateCategoryMutation = useMutation(
    async (data: IUpdateItem) => {
      const categoryResponse = await apiRequest<IListItem>(
        `${API_URL}/items/category/${data.id}`,
        "PUT",
        { category: data.category },
      );

      if (categoryResponse) {
        const updated = items.map((item) => {
          if (item.id === data.id) {
            item.category = {
              ...item.category,
              name: categoryResponse.category?.name
                ? categoryResponse.category.name
                : "No Category",
            };
            return item;
          }
          return item;
        });
        updateItems(updated);
      }
    },
  );

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value: string) => {
    setOpen(false);

    if (value !== selectedValue) {
      const data = {
        category: {
          name: value,
        },
        id: itemId,
      };
      createUpdateCategoryMutation.mutate(data);
      setSelectedValue(value);
    }
  };

  return (
    <div>
      {/* <Box sx={{ display: 'flex', alignItems: 'center'}}> */}
      <Chip
        sx={{ mr: 10, bgcolor: categoryColors[selectedValue] }}
        label={selectedValue}
        // color="primary"

        size="small"
        onClick={handleClickOpen}
      />
      {/* </Box> */}
      <CategoryDialog
        selectedValue={selectedValue}
        open={open}
        onClose={handleClose}
      />
    </div>
  );
};

export default CategoryTag;
