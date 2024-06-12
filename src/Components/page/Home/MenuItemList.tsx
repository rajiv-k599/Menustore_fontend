import React from "react";
import { useState, useEffect } from "react";
import { MenuItemModel } from "../../../interface";
import MenuItemCard from "./MenuItemCard";
import { useGetMenuItemsQuery } from "../../../Api/menuItemApi";
import { useDispatch, useSelector } from "react-redux";
import { setMenuItem } from "../../../Storage/Redux/menuItemSlice";
import { MainLoder } from "../common";
import { RootState } from "../../../Storage/Redux/store";
import { Sd_SortTypes } from "../../../utility/SD";

function MenuItemList() {
  const [menuItems, setMenuItems] = useState<MenuItemModel[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [categoryList, setCategoryList] = useState([""]);
  const dispatch = useDispatch();
  const [sortName, setSortName] = useState(Sd_SortTypes.NAME_A_Z);
  const { data, isLoading } = useGetMenuItemsQuery(null);
  const sortOptions: Array<Sd_SortTypes> = [
    Sd_SortTypes.PRICE_LOW_HIGH,
    Sd_SortTypes.PRICE_HIGH_LOW,
    Sd_SortTypes.NAME_A_Z,
    Sd_SortTypes.NAME_Z_A,
  ];
  const searchValue = useSelector(
    (state: RootState) => state.menuItemStore.search
  );
  useEffect(() => {
    if (data && data.result) {
      const tempMenuArray = handleFilters(
        sortName,
        selectedCategory,
        searchValue
      );
      setMenuItems(tempMenuArray);
    }
  }, [searchValue]);
  useEffect(() => {
    if (!isLoading) {
      dispatch(setMenuItem(data.result));
      setMenuItems(data.result);
      const tempCategoryList = ["ALL"];
      data.result.forEach((item: MenuItemModel) => {
        if (tempCategoryList.indexOf(item.categories) === -1) {
          tempCategoryList.push(item.categories);
        }
      });
      setCategoryList(tempCategoryList);
    }
  }, [isLoading]);
  const handleSortClick = (i: number) => {
    setSortName(sortOptions[i]);
    const tempArray = handleFilters(
      sortOptions[i],
      selectedCategory,
      searchValue
    );
    setMenuItems(tempArray);
  };
  const handleCategoryClick = (i: number) => {
    const buttons = document.querySelectorAll(".custom-buttons");
    let localCategory;
    buttons.forEach((button, index) => {
      if (index === i) {
        button.classList.add("active");
        if (index === 0) {
          localCategory = "All";
        } else {
          localCategory = categoryList[index];
        }
        setSelectedCategory(localCategory);
        const tempArray = handleFilters(sortName, localCategory, searchValue);
        setMenuItems(tempArray);
      } else {
        button.classList.remove("active");
      }
    });
  };

  const handleFilters = (
    sortTypes: Sd_SortTypes,
    category: string,
    search: String
  ) => {
    let tempArray =
      category === "All"
        ? [...data.result]
        : data.result.filter(
            (item: MenuItemModel) =>
              item.categories.toUpperCase() === category.toUpperCase()
          );
    if (search) {
      const tempSearchMenuItem = [...tempArray];
      tempArray = tempSearchMenuItem.filter((item: MenuItemModel) =>
        item.name.toUpperCase().includes(search.toUpperCase())
      );
    }
    //sort
    if (sortTypes === Sd_SortTypes.PRICE_LOW_HIGH) {
      tempArray.sort((a: MenuItemModel, b: MenuItemModel) => a.price - b.price);
    }
    if (sortTypes === Sd_SortTypes.PRICE_HIGH_LOW) {
      tempArray.sort((a: MenuItemModel, b: MenuItemModel) => b.price - a.price);
    }
    if (sortTypes === Sd_SortTypes.NAME_A_Z) {
      tempArray.sort(
        (a: MenuItemModel, b: MenuItemModel) =>
          a.name.toUpperCase().charCodeAt(0) -
          b.name.toUpperCase().charCodeAt(0)
      );
    }
    if (sortTypes === Sd_SortTypes.NAME_A_Z) {
      tempArray.sort(
        (a: MenuItemModel, b: MenuItemModel) =>
          b.name.toUpperCase().charCodeAt(0) -
          a.name.toUpperCase().charCodeAt(0)
      );
    }
    return tempArray;
  };
  if (isLoading) {
    return <MainLoder />;
  }
  return (
    <div className="container row">
      <div className="my-3">
        <ul className="nav w-100 d-flex justify-content-center">
          {categoryList.map((categoryName, index) => (
            <li className="nav-item" key={index}>
              <button
                className={`nav-link p-0 pb-2 custom-buttons fs-5 ${
                  index === 0 && "active"
                }`}
                onClick={() => handleCategoryClick(index)}
              >
                {" "}
                {categoryName}
              </button>
            </li>
          ))}
          <li className="nav-item dropdown" style={{ marginLeft: "auto" }}>
            <div
              className="nav-link dropdown-toggle text-dark fs-6 border"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              {sortName}
            </div>
            <ul className="dropdown-menu">
              {sortOptions.map((sortTypes, index) => (
                <li
                  className="dropdown-item"
                  onClick={() => handleSortClick(index)}
                >
                  {sortTypes}
                </li>
              ))}
            </ul>
          </li>
        </ul>
      </div>
      {menuItems.length > 0 &&
        menuItems.map((menuItem: MenuItemModel, index: number) => (
          <MenuItemCard menuItem={menuItem} key={index} />
        ))}
    </div>
  );
}

export default MenuItemList;
