import { FC, ReactElement, useState } from "react";
import CategoryTag from "../categoryTag/CategoryTag";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import TextField from "@mui/material/TextField";
import FileDownloadDoneIcon from "@mui/icons-material/FileDownloadDone";
import { IListItem } from "../../types/interfaces/IListItem";

interface IListEntry {
  item: IListItem;
  onDelete: () => void;
  onEdit: (editedItem: IListItem) => void;
}

const ListEntry: FC<IListEntry> = (props): ReactElement => {
  const { item, onDelete, onEdit } = props;
  const [checked, setChecked] = useState<boolean>(item.collected || false);

  const [isInput, setIsInput] = useState<boolean>(false);

  const [itemValue, setItemValue] = useState<string>(item.name);

  const handleEdit = () => {
    console.log(item.name);
    if (itemValue !== item.name) {
      onEdit({ ...item, name: itemValue }); //passing argument back to parent
    }
    setIsInput(!isInput);
  };

  const handleCheck = () => {
    console.log(checked);
    onEdit({ ...item, collected: !checked });
    setChecked(!checked);
  };

  return (
    <>
      <ListItem
        key={item.id}
        disablePadding
        secondaryAction={
          <IconButton
            edge="end"
            aria-label="delete"
            onClick={onDelete}
          >
            <DeleteIcon />
          </IconButton>
        }
      >
        <Checkbox
          edge="start"
          checked={checked}
          onChange={handleCheck}
          inputProps={{
            "aria-labelledby": item.id,
          }}
        />

        {!isInput
          ? (
            <ListItemButton
              onClick={() => setIsInput(!isInput)}
            >
              <ListItemText
                id={item.name}
                primary={itemValue}
              />
            </ListItemButton>
          )
          : (
            <>
              <TextField
                margin="none"
                id="edit-item"
                onChange={(e) =>
                  setItemValue(
                    e.target.value.charAt(0).toUpperCase() +
                      e.target.value.slice(1),
                  )}
                size="small"
              >
              </TextField>
              <IconButton
                onClick={handleEdit}
              >
                <FileDownloadDoneIcon />
              </IconButton>
            </>
          )}

        <CategoryTag
          itemId={item.id}
          catName={item.category?.name ?? "No Category"}
        >
        </CategoryTag>
      </ListItem>
    </>
  );
};

export default ListEntry;
