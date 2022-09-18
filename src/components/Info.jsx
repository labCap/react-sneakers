import React from "react";
import { Link } from "react-router-dom";
import { appContext } from "../App";

export default function Info({ img, title, desc }) {
  const { setCartOpened } = React.useContext(appContext);

  return (
    <div className="info-box">
      <div className="info-box__img">
        <img src={img} alt="box" />
      </div>
      <h2 className="info-box__title">{title}</h2>
      <p className="info-box__text">{desc}</p>
      <Link
        to={"/"}
        onClick={() => {
          setCartOpened(false);
          document.body.classList.remove("lock");
        }}
        className="info-box__btn green-btn"
      >
        <span className="ico-arrow-btn"></span> Вернуться назад
      </Link>
    </div>
  );
}
