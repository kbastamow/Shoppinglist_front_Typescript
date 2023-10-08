import { EnumCategory } from "../types/EnumCategory";
import { teal, lime, cyan, lightGreen, green, indigo, lightBlue } from "@mui/material/colors";

export const categoryColors = {
  [EnumCategory.babyCare]: indigo[100],
  [EnumCategory.bakedGoods]: lightBlue[100],
  [EnumCategory.bakingSupplies]: cyan[100],
  [EnumCategory.beverages]: teal[100],
  [EnumCategory.cannedGoods]: green[100],
  [EnumCategory.condimentsAndSauces]: lightGreen[100],
  [EnumCategory.dairy]: lime[100],
  [EnumCategory.fish]: lime[200],
  [EnumCategory.frozenFoods]: lightGreen[200],
  [EnumCategory.fruitAndVegetables]: green[200],
  [EnumCategory.grains]: teal[200],
  [EnumCategory.householdAndCleaning]: cyan[200],
  [EnumCategory.meat]: lightBlue[200],
  [EnumCategory.noCategory]: "white",
  [EnumCategory.other]: indigo[200],
  [EnumCategory.pasta]: indigo[400],
  [EnumCategory.personalCare]: lightBlue[400],
  [EnumCategory.petSupplies]: cyan[400],
  [EnumCategory.premadeMeals]: teal[400],
  [EnumCategory.rice]: green[400],
  [EnumCategory.snacksAndSweets]: lightGreen[400],
  [EnumCategory.spices]: lime[400],
};