import { FC, ReactElement } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import * as React from 'react';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import { Chip } from '@mui/material';
import { EnumCategory } from '../../types/EnumCategory';
import { useMutation } from '@tanstack/react-query';
import { apiRequest } from '../../services/apiRequest';
import { IUpdateItem } from '../../types/interfaces/IUpdateItem';
// import { IItem } from '../../types/interfaces/IItem';
import { IListItem } from '../../types/interfaces/IListItem';
const API_URL = 'http://localhost:3500';


interface CategoryProps {
  itemId: string,
  catName: string
}

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

const CategoryTag: FC<CategoryProps> = (props): ReactElement => {
  const { itemId, catName } = props
  const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState(catName);


  const createUpdateCategoryMutation = useMutation(
    async (data: IUpdateItem) => {
      const categoryResponse = await apiRequest<IListItem>(
          `${API_URL}/items/category/${data.id}`,
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