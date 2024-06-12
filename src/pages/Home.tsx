import React from "react";
import MenuItemList from "../Components/page/Home/MenuItemList";
import Banner from "../Components/page/common/Banner";
//import MenuItemList from "../Components/page/MenuItems/index";

function Home() {
  return (
    <div>
      <Banner />
      <div className="container p-2">
        <MenuItemList />
      </div>
    </div>
  );
}

export default Home;
