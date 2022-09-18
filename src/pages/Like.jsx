import React from "react";
import { Link } from "react-router-dom";
import { appContext } from "../App";
import Card from "../components/Card";
import Info from "../components/Info";

export default function Like({}) {
  const { like, onAddToCart, onAddToLike } = React.useContext(appContext);

  return (
    <section className="content">
      <section className="sneakers">
        <div className="sneakers__header">
          <h2 className="sneakers__title title">
            <Link to={"/"} className="prev-btn card-btn">
              <div className="ico-arrow-slider"></div>
            </Link>
            Мои закладки
          </h2>
        </div>
        <div className="sneakers__items">
          {like.length <= 0 ? (
            <Info
              img={"img/ico1.svg"}
              title={"Закладок нет :("}
              desc={"Вы ничего не добавляли в закладки"}
            />
          ) : (
            <>
              {like.map((item, index) => (
                <Card
                  key={index}
                  onPlus={(obj) => onAddToCart(obj)}
                  onLiked={(obj) => onAddToLike(obj)}
                  isLiked={true}
                  {...item}
                />
              ))}
            </>
          )}
        </div>
      </section>
    </section>
  );
}
