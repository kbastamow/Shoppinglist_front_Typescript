import { FC, ReactElement } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import * as React from 'react';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import { Box, Chip } from '@mui/material';
import { EnumCategory } from '../../types/EnumCategory';



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


const CategoryTag: FC = (): ReactElement => {
  const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState("No category");

  const handleClickOpen = () => {
    console.log("click catgory chip")
    setOpen(true);
  };

  const handleClose = (value: string) => {
    setOpen(false);
    setSelectedValue(value);
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