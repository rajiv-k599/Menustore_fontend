import React, { useEffect, useState } from "react";
import inputHelper from "../../helper/inputHelper";
import toastNotify from "../../helper/taostNotify";
import {
  useCreateMenuItemMutation,
  useDeleteMenuItemMutation,
  useGetMenuItemByIdQuery,
  useUpdateMenuItemMutation,
} from "../../Api/menuItemApi";
import { Sd_Categories } from "../../utility/SD";
import { useNavigate, useParams } from "react-router-dom";
import { MainLoder } from "../../Components/page/common";

const Categories = [
  Sd_Categories.APPETIZER,
  Sd_Categories.BEVERAGES,
  Sd_Categories.DESSERT,
  Sd_Categories.ENTREE,
];
const menuItemData = {
  name: "",
  description: "",
  specialTag: "",
  category: Categories[0],
  price: "",
};

function MenuItemUpsert() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);
  const [imageToBeStore, setImageToStore] = useState<any>();
  const [imageToBeDisplay, setImageToBeDisplay] = useState<any>();
  const [menuItemInputs, setMenuItemInputs] = useState(menuItemData);
  const [createMenuItem] = useCreateMenuItemMutation();
  const { data } = useGetMenuItemByIdQuery(id);
  const [updateMenuItem] = useUpdateMenuItemMutation();

  useEffect(() => {
    if (data && data.result) {
      const tempData = {
        name: data.result.name,
        description: data.result.description,
        specialTag: data.result.specialTag,
        category: data.result.Categories,
        price: data.result.price,
      };
      setMenuItemInputs(tempData);
      setImageToBeDisplay(data.result.image);
    }
  }, [data]);
  const handleMenuItemInput = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const tempData = inputHelper(e, menuItemInputs);
    setMenuItemInputs(tempData);
  };
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      const imgType = file.type.split("/")[1];
      const validImgTypes = ["jpeg", "jpg", "png"];
      const isImageTypeValid = validImgTypes.filter((e) => {
        return e === imgType;
      });
      if (file.size > 1000 * 1024) {
        setImageToStore("");
        toastNotify("File Must be less then 1 MB", "error");
        return;
      } else if (isImageTypeValid.length === 0) {
        setImageToStore("");
        toastNotify("File Must be jpeg, jpg or png", "error");
        return;
      }
      const reader = new FileReader();
      reader.readAsDataURL(file);
      setImageToStore(file);
      reader.onload = (e) => {
        const imageUrl = e.target?.result as string;
        setImageToBeDisplay(imageUrl);
      };
    }
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    if (!imageToBeStore && !id) {
      toastNotify("please upload an image", "error");
      setLoading(false);
      return;
    }
    console.log(menuItemInputs);
    const formData = new FormData();
    formData.append("Name", menuItemInputs.name);
    formData.append("Description", menuItemInputs.description);
    formData.append("Price", menuItemInputs.price);
    formData.append("Categories", menuItemInputs.category);
    formData.append("SpecialTag", menuItemInputs.specialTag);
    if (imageToBeDisplay) formData.append("File", imageToBeStore);
    console.log(formData);

    let response;
    if (id) {
      //update
      formData.append("Id", id);
      response = await updateMenuItem({ data: formData, id });
      toastNotify("Menu Item update successfully", "success");
    } else {
      //create
      response = await createMenuItem(formData);
      toastNotify("Menu Item Created successfully", "success");
    }

    if (response) {
      setLoading(false);
      console.log(response);
      navigate("/menuItem/menuitemList");
    }
    setLoading(false);
  };
  return (
    <div className="container border mt-5 p-5 bg-light">
      {isLoading && <MainLoder />}
      <h3 className=" px-2 text-success">
        {id ? "Edit Menu Item" : "Add Menu Item"}
      </h3>
      <form method="post" encType="multipart/form-data" onSubmit={handleSubmit}>
        <div className="row mt-3">
          <div className="col-md-7 ">
            <input
              type="text"
              className="form-control"
              placeholder="Enter Name"
              name="name"
              value={menuItemInputs.name}
              onChange={handleMenuItemInput}
              required
            />
            <textarea
              className="form-control mt-3"
              placeholder="Enter Description"
              name="description"
              rows={10}
              value={menuItemInputs.description}
              onChange={handleMenuItemInput}
            ></textarea>
            <input
              type="text"
              className="form-control mt-3"
              placeholder="Enter Special Tag"
              name="specialTag"
              value={menuItemInputs.specialTag}
              onChange={handleMenuItemInput}
            />
            <select
              className="form-control mt-3 form-select"
              name="category"
              value={menuItemInputs.category}
              onChange={handleMenuItemInput}
            >
              {Categories.map((category) => {
                return <option value={category}>{category}</option>;
              })}
            </select>
            <input
              type="number"
              className="form-control mt-3"
              required
              placeholder="Enter Price"
              name="price"
              value={menuItemInputs.price}
              onChange={handleMenuItemInput}
            />
            <input
              type="file"
              className="form-control mt-3"
              onChange={handleFileChange}
            />
            <div className="row">
              <div className="col-6">
                <button
                  type="submit"
                  className="btn btn-success form-control mt-5"
                >
                  {id ? "Update" : " Submit"}
                </button>
              </div>
              <div className="col-6">
                <a
                  className="btn btn-secondary form-control mt-5"
                  onClick={() => navigate(-1)}
                >
                  {" "}
                  Back
                </a>
              </div>
            </div>
          </div>
          <div className="col-md-4 text-center">
            <img
              src={imageToBeDisplay}
              style={{ width: "100%", borderRadius: "30px" }}
              alt=""
            />
          </div>
        </div>
      </form>
    </div>
  );
}

export default MenuItemUpsert;
