import { FC, ReactElement } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import * as React from 'react';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import { Chip } from '@mui/material';
import { EnumCategory } from '../../types/EnumCategory';
import { useMutation } from '@tanstack/react-query';
import { apiRequest } from '../../helpers/apiRequest';
import { IUpdateItem } from '../../types/interfaces/IUpdateItem';
import { IItem } from '../../types/interfaces/IItem';
const API_URL = 'http://localhost:3500';


const categories = Object.values(EnumCategory)

export interface SimpleDialogProps {
  open: boolean;
  selectedValue: string;
  onClose: (value: string) => void;
}

function SimpleDialog(props: SimpleDialogProps) {
  const { onClose, selectedValue, open } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value: string) => {
    console.log(value)
    onClose(value);
  };
  

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Pick a category</DialogTitle>
      <List sx={{ pt: 0,  maxHeight: 300}}>
        {categories.sort().map((category) => (
           <ListItem key={category}>
          <Chip
          label= {category}
          color="primary"
          size="small"
          onClick={() => handleListItemClick(category)} key={category}
          />
          </ListItem>
          )
        )}
  </List>
    </Dialog>
  );
}


const CategoryTag: FC<string> = ({itemId}): ReactElement => {
  const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState("No category");
  console.log(itemId)

  const createUpdateCategoryMutation = useMutation(
    async (data: IUpdateItem) => {
      console.log(data.id)
      console.log(data.category)
      const categoryResponse = await apiRequest<IItem>(
          `${API_URL}/items/${data.id}`,
          'PUT',
          {category: data.category}
          );

        if(categoryResponse) {
          console.log(categoryResponse)
        }
    }
  )

  const handleClickOpen = () => {
    console.log("click category chip")
    setOpen(true);
  };

  const handleClose = (value: string) => {
    setOpen(false);
    console.log(value)

    if(value !== selectedValue) { 
    const data = {
      category: value,
      id: itemId
    }
    createUpdateCategoryMutation.mutate(data)
    setSelectedValue(value);
  }
  };

  return (
    <div>
          {/* <Box sx={{ display: 'flex', alignItems: 'center'}}> */}
                  <Chip
                    sx= {{mr: 10}}
                    label={selectedValue}
                    color="primary"
                    size="small"
                    onClick={handleClickOpen}
                />
                {/* </Box> */}
      <SimpleDialog
        selectedValue={selectedValue}
        open={open}
        onClose={handleClose}
      />
    </div>
  );
}

export default CategoryTag