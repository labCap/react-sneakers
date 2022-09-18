import React from "react";
import { appContext } from "../App";
import Card from "../components/Card";
import Slider from "../components/Slider/index";

export default function Home({}) {
  const {
    items,
    searchValue,
    setSearchValue,
    onChangeSearchInput,
    onAddToCart,
    onAddToLike,
    isLoading,
  } = React.useContext(appContext);

  const renderItems = () => {
    return (
      isLoading
        ? [...Array(10)]
        : items.filter((item) =>
            item.title.toLowerCase().includes(searchValue.toLowerCase())
          )
    ).map((item, index) => (
      <Card
        key={index}
        onPlus={(obj) => onAddToCart(obj)}
        onLiked={(obj) => onAddToLike(obj)}
        loading={isLoading}
        {...item}
      />
    ));
  };

  return (
    <section className="content">
      <Slider />
      <section className="sneakers">
        <div className="sneakers__header">
          <h2 className="sneakers__title title">
            {searchValue
              ? `Поиск по запросу: "${searchValue}"`
              : "Все кроссовки"}
          </h2>
          <div className="sneakers__form form">
            <label htmlFor="search">
              <div className="ico-search"></div>
            </label>
            <input
              onChange={onChangeSearchInput}
              value={searchValue}
              type="text"
              name="search"
              id="search"
              className="form__input"
              placeholder="Поиск..."
            />
            {searchValue && (
              <button
                className="input-clear delete-btn card-btn"
                onClick={() => setSearchValue("")}
              >
                <div className="ico-plus"></div>
              </button>
            )}
          </div>
        </div>
        <div className="sneakers__items">{renderItems()}</div>
      </section>
    </section>
  );
}
