import React from "react";
import ContentLoader from "react-content-loader";
import { appContext } from "../../App";
import "./Card.scss";

function Card({
  id,
  srcImg,
  title,
  price,
  onPlus,
  onLiked,
  isLiked = false,
  loading = false,
}) {
  const { isItemAdded } = React.useContext(appContext);
  const [isAddedLike, setIsAddedLike] = React.useState(isLiked);
  const obj = { id, parentId: id, srcImg, title, price };

  const onClickPlus = () => {
    onPlus(obj);
  };

  const onClickLike = () => {
    onLiked(obj);
    setIsAddedLike(!isAddedLike);
  };

  return (
    <article className="sneakers__item card">
      {loading ? (
        <ContentLoader
          speed={2}
          width={155}
          height={187}
          viewBox="0 0 155 187"
          backgroundColor="#f3f3f3"
          foregroundColor="#ecebeb"
        >
          <rect x="0" y="0" rx="10" ry="10" width="155" height="91" />
          <rect x="0" y="130" rx="3" ry="3" width="96" height="15" />
          <rect x="0" y="103" rx="3" ry="3" width="155" height="15" />
          <rect x="113" y="153" rx="8" ry="8" width="32" height="32" />
          <rect x="0" y="159" rx="8" ry="8" width="80" height="25" />
        </ContentLoader>
      ) : (
        <>
          {onLiked && (
            <div
              className={
                isAddedLike
                  ? "card__like like-btn card-btn active"
                  : "card__like like-btn card-btn"
              }
              onClick={onClickLike}
            >
              <div className="ico-heart"></div>
            </div>
          )}
          <a href="#" className="card__img">
            <img src={srcImg} alt="sneakers" />
          </a>
          <a href="#" className="card__title">
            {title}
          </a>
          <div className="card__footer">
            <div className="card__price-box">
              <div className="card__price">Цена:</div>
              <b className="card__price-num">{price} грн.</b>
            </div>

            {onPlus && (
              <button
                className={
                  isItemAdded(id)
                    ? "card__plus-btn plus-btn card-btn active"
                    : "card__plus-btn plus-btn card-btn"
                }
                onClick={onClickPlus}
              >
                <div
                  className={isItemAdded(id) ? "ico-selected" : "ico-plus"}
                ></div>
              </button>
            )}
          </div>
        </>
      )}
    </article>
  );
}

export default Card;
