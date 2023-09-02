import { FC, ReactElement, useState } from 'react';
import CategoryTag from '../categoryTag/CategoryTag';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import TextField from '@mui/material/TextField';
import FileDownloadDoneIcon from '@mui/icons-material/FileDownloadDone';
import { IListItem } from '../../types/interfaces/IListItem';

interface IListEntry {
    item: IListItem;
    onDelete: () => void;
    onEdit: () => void
}

const ListEntry: FC<IListEntry> = (props): ReactElement => {

    const { item, onDelete, onEdit } = props;
    const [checked, setChecked] = useState<boolean>(false);

    const [isInput, setIsInput] = useState<boolean>(false);

    const [itemValue, setItemValue] = useState<string>(item.name)

    const handleEdit = () => {
        setIsInput(!isInput)
        console.log(item)
        console.log(itemValue)
        if(itemValue !== item.name) {
        onEdit()
        }
    }

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
                    onChange={() => setChecked(!checked)}
                    inputProps={{
                        'aria-labelledby': item.id,
                    }}
                />

                {!isInput ? (
                    <ListItemButton
                        onClick={() => setIsInput(!isInput)}
                        >
                        <ListItemText
                            id={item.name}
                            primary={item.name}
                        />
                    </ListItemButton>
                ) : (
                    <>
                    <TextField
                        margin="none"
                        id="edit-item"
                        defaultValue={item}
                        onChange={(e) => setItemValue(e.target.value)}
                        size="small"
                    ></TextField>
                    <IconButton
                    onClick={handleEdit}
    
                >
                    <FileDownloadDoneIcon />
                </IconButton>
                </>
                )}

                <CategoryTag></CategoryTag>
            </ListItem>
        </>
    );
};

export default ListEntry;
