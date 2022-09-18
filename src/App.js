// import "./App.css";
import axios from "axios";
import React from "react";
import { Route, Routes } from "react-router-dom";

import Drawer from "./components/Drawer/index";
import Header from "./components/Header/index";

import Home from "./pages/Home";
import Like from "./pages/Like";
import Orders from "./pages/Orders";

export const appContext = React.createContext({});

function App() {
  const [items, setItems] = React.useState([]);
  const [cartItems, setCartItems] = React.useState([]);
  const [like, setLike] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState("");
  const [cartOpened, setCartOpened] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    async function fetchData() {
      try {
        const [cartResponse, likeResponse, itemsResponse] = await Promise.all([
          axios.get("https://632484f4bb2321cba92e64cb.mockapi.io/cart"),
          axios.get("https://632484f4bb2321cba92e64cb.mockapi.io/like"),
          axios.get("https://632484f4bb2321cba92e64cb.mockapi.io/items"),
        ]);

        setIsLoading(false);

        setCartItems(cartResponse.data);
        setLike(likeResponse.data);
        setItems(itemsResponse.data);
      } catch (error) {
        alert("Ошибка при запросе данних");
        console.log(error);
      }
    }

    fetchData();
  }, []);

  const onAddToCart = async (obj) => {
    try {
      const findItem = cartItems.find(
        (item) => Number(item.parentId) === Number(obj.id)
      );
      if (findItem) {
        setCartItems((prev) =>
          prev.filter((item) => Number(item.parentId) !== Number(obj.id))
        );
        await axios.delete(
          `https://632484f4bb2321cba92e64cb.mockapi.io/cart/${findItem.id}`
        );
      } else {
        setCartItems((prev) => [...prev, obj]);
        const { data } = await axios.post(
          "https://632484f4bb2321cba92e64cb.mockapi.io/cart",
          obj
        );
        setCartItems((prev) =>
          prev.map((item) => {
            if (item.parentId === data.parentId) {
              return { ...item, id: data.id };
            }
            return item;
          })
        );
      }
    } catch (error) {
      alert("Ошибка при добавлении в корзину");
      console.log(error);
    }
  };

  const onRemoveItem = async (id) => {
    try {
      axios.delete(`https://632484f4bb2321cba92e64cb.mockapi.io/cart/${id}`);
      setCartItems((prev) =>
        prev.filter((item) => Number(item.id) !== Number(id))
      );
    } catch (error) {
      alert("Ошибка при удалнии из корзины");
      console.log(error);
    }
  };

  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value);
  };

  const onAddToLike = async (obj) => {
    try {
      if (like.find((likeObj) => likeObj.id === obj.id)) {
        axios.delete(
          `https://632484f4bb2321cba92e64cb.mockapi.io/like/${obj.id}`
        );
        setLike((prev) => prev.filter((item) => item.id !== obj.id));
      } else {
        const { data } = await axios.post(
          "https://632484f4bb2321cba92e64cb.mockapi.io/like",
          obj
        );
        setLike((prev) => [...prev, data]);
      }
    } catch (error) {
      alert("error liked");
    }
  };

  const isItemAdded = (id) => {
    return cartItems.some((obj) => Number(obj.parentId) === Number(id));
  };

  return (
    <appContext.Provider
      value={{
        items,
        cartItems,
        like,
        searchValue,
        setSearchValue,
        setCartOpened,
        setCartItems,
        onChangeSearchInput,
        onAddToCart,
        onAddToLike,
        isLoading,
        isItemAdded,
      }}
    >
      <div className="wrapper">
        <Drawer
          items={cartItems}
          onClose={() => {
            setCartOpened(false);
            document.body.classList.remove("lock");
          }}
          onRemove={onRemoveItem}
          opened={cartOpened}
        />

        <Header
          onClickCart={() => {
            setCartOpened(true);
            document.body.classList.add("lock");
          }}
        />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/like"
            element={
              <Like
                onClose={() => {
                  setCartOpened(false);
                  document.body.classList.remove("lock");
                }}
              />
            }
          />
          <Route path="/orders" element={<Orders />} />
        </Routes>
      </div>
    </appContext.Provider>
  );
}

export default App;
