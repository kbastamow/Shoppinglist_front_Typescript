import {
  createContext,
  FC,
  PropsWithChildren,
  ReactElement,
  useState,
} from "react";
import { IListItem } from "../types/interfaces/IListItem";

interface ItemProviderProps {
  initialItems: IListItem[];
}

//the object in createContext is initialState
export const ItemContext = createContext<{
  items: IListItem[];
  updateItems: (updatedValues: IListItem[]) => void;
  setInitial?: (data: IListItem[]) => void;
}>({
  items: [],
  updateItems: () => {},
  setInitial: () => {},
});

export const ItemProvider: FC<PropsWithChildren<ItemProviderProps>> = (
  { initialItems, children },
): ReactElement => {
  const [items, setItems] = useState<IListItem[]>(initialItems);

  function updateItems(updatedValues: IListItem[]) {
    setItems(updatedValues);
  }

  return (
    <ItemContext.Provider
      value={{
        items: items,
        updateItems: updateItems,
      }}
    >
      {children}
    </ItemContext.Provider>
  );
};
