import React from "react";
import {
  useDeleteMenuItemMutation,
  useGetMenuItemsQuery,
} from "../../Api/menuItemApi";
import { MainLoder } from "../../Components/page/common";
import { MenuItemModel } from "../../interface";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function MenuItemList() {
  const { data, isLoading } = useGetMenuItemsQuery(null);
  const [deleteMenuItem] = useDeleteMenuItemMutation();
  const navigate = useNavigate();
  const handleDeleteMenu = async (id: number) => {
    toast.promise(
      deleteMenuItem(id),
      {
        pending: "Processing Your Request.....",
        success: "Menu Item Deleted Successfully ",
        error: "Error encounter ",
      },
      {
        theme: "dark",
      }
    );
  };
  return (
    <>
      {isLoading && <MainLoder />}
      {!isLoading && (
        <div className="table p-5">
          <div className="d-flex align-items-center justify-content-between">
            <h1 className="text-success">MenuItem List</h1>
            <button
              className="btn btn-success"
              onClick={() => navigate("/menuitem/menuitemUpsert")}
            >
              Add New MenuItem
            </button>
          </div>
          <div className="p-2">
            <div className="row border">
              <div className="col-1">Image</div>
              <div className="col-1">ID</div>
              <div className="col-2">Name</div>
              <div className="col-2">Category</div>
              <div className="col-1">Price</div>
              <div className="col-2">Special Tag</div>
              <div className="col-2">Action</div>
            </div>
            {data.result.map((item: MenuItemModel, index: number) => {
              return (
                <div className="row border" key={index}>
                  <div className="col-1">
                    <img
                      src={item.image}
                      alt="no content"
                      style={{ width: "100%", maxWidth: "120px" }}
                    />
                  </div>
                  <div className="col-1">{item.id}</div>
                  <div className="col-2">{item.name}</div>
                  <div className="col-2">{item.categories}</div>
                  <div className="col-1">{item.price}</div>
                  <div className="col-2">{item.specialTag}</div>
                  <div className="col-2">
                    <button className="btn btn-success">
                      <i
                        className="bi bi-pencil-fill"
                        onClick={() =>
                          navigate("/menuitem/menuitemUpsert/" + item.id)
                        }
                      ></i>
                    </button>
                    <button
                      className="btn btn-danger mx-2"
                      onClick={() => handleDeleteMenu(item.id)}
                    >
                      <i className="bi bi-trash-fill"></i>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}

export default MenuItemList;
