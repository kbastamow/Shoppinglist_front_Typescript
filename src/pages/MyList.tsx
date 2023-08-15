import {
    FC,
    ReactElement,
    useState,
    useEffect,
    Fragment,
} from 'react';
import ListEntry from '../components/listEntry/ListEntry';
import {
    Box,
    Divider,
    List,
    ListSubheader,
    Button,
    TextField,
    Stack
} from '@mui/material';

interface ITitle {
    title: string;
}

const MyList: FC<ITitle> = (props): ReactElement => {
    const [items, setItems] = useState<string[]>([
        'Bread',
        'Butter',
        'Milk',
    ]);

    const [newItem, setNewItem] = useState<string>('');
    const [finishVisible, setFinishVisible] =
        useState<boolean>(false);
    const [total, setTotal] = useState<number>(0);
    const [helperText, setHelperText] =
        useState<string>('');

    const { title = 'My List' } = props;

    const addItem = (e) => {
        e.preventDefault();
        if (newItem.trim() !== '') {
            setItems((prevItems) => [
                newItem,
                ...prevItems,
            ]);
            setNewItem('');
        }
    };

    const renderListItems = () => {
        return items?.length < 1 ? (
            <p>No items</p>
        ) : (
            items?.map((item) => (
                <>
                    <Fragment key={item}>
                        <ListEntry
                            item={item}
                            onDelete={() =>
                                handleDeleteItem(item)
                            }
                            onEdit={() =>
                                handleEditItem(item)
                            }
                        ></ListEntry>
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
            (item) => item !== itemToDelete,
        );
        setItems(updatedItems);
    };

    const handleEditItem = (itemToEdit: string): void => {
        console.log('Edit item:', itemToEdit);
    };

    const handleFinish = () => {
        if (typeof +total === 'number' && +total !== 0) {
            console.log(+total);
            console.log('finish');
        }
    };

    const handleTotalChange = (e) => {
        const pattern = /^[0-9.]+$/;
        console.log(
            e.target.value.length ||
                !pattern.test(e.target.value),
        );
        if (e.target.value.length > 5) {
            setHelperText(
                'Valid format: 19.99',
            );
        } else {
            setHelperText('');
        }
        setTotal(e.target.value);
    };

    return (
        <Box 
        sx={{mt: 7}}>
            <Box sx={{ mb: 2 }}>
                <TextField
                    size="small"
                    value={newItem}
                    onChange={(e) =>
                        setNewItem(e.target.value)
                    }
                />
                <Button onClick={addItem}>Add item</Button>
            </Box>
            <Box
            sx={{height: '60vh',
             overflow: 'auto'}}>

            <List
                sx={{
                    width: '100%',
                    maxWidth: 360,
                    bgcolor: 'background.paper',
                }}
                subheader={
                    <ListSubheader>{title}</ListSubheader>
                }
            >
                {renderListItems()}
            </List>
            </Box>
            <Button
                fullWidth
                size="small"
                variant="contained"
                onClick={() =>
                    setFinishVisible(!finishVisible)
                }
            >
                {!finishVisible ? (
                    <>Click to finish</>
                ) : (
                    <>Hide</>
                )}
            </Button>
            {!finishVisible ? (
                <></>
            ) : (
                <Stack direction="row" justifyContent=
                "space-around"
                >
                    <TextField
                        sx={{ m: 2, width: '50%'}}
                        size= "small"
                        label="Total"
                        helperText={helperText}
                        value={total}
                        onChange={(e) =>
                            handleTotalChange(e)
                        }
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
        </Box>
    );
};

export default MyList;
