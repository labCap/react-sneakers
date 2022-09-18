import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../../hooks/useCart";
import "./Header.scss";

function Header(props) {
  const { totalPrice } = useCart();
  return (
    <header className="header">
      <Link to={"/"} className="header__start">
        <div className="header__logo">
          <img src="img/logo.svg" alt="logo" />
        </div>

        <h2 className="header__title">REACT SNEAKERS</h2>

        <p className="header__subtitle">Магазин лучших кроссовок</p>
      </Link>

      <div className="header__end">
        <button
          className="header__end-item header__cart cart"
          onClick={props.onClickCart}
        >
          <div className="ico-cart"></div>
          <span className="cart__text">{totalPrice} грн.</span>
        </button>

        <Link to={"/like"} className="header__end-item header__like like">
          <div className="ico-heart"></div>
        </Link>

        <Link to={"/orders"} className="header__end-item header__user user">
          <div className="ico-user"></div>
        </Link>
      </div>
    </header>
  );
}

export default Header;
