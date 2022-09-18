import axios from "axios";
import React from "react";
import { useCart } from "../../hooks/useCart";
import Info from "../Info";
import "./Drawer.scss";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function Cart({ onClose, onRemove, items = [], opened }) {
  const { cartItems, setCartItems, totalPrice } = useCart();
  const [orderId, setOrderId] = React.useState(null);
  const [isOrderComplete, setIsOrderComplete] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const onClickOrder = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.post(
        "https://632484f4bb2321cba92e64cb.mockapi.io/orders",
        { items: cartItems }
      );
      setOrderId(data.id);
      setIsOrderComplete(true);
      setCartItems([]);

      for (let i = 0; i < cartItems.length; i++) {
        const item = cartItems[i];
        await axios.delete(
          `https://632484f4bb2321cba92e64cb.mockapi.io/cart/${item.id}`
        );
        await delay(1000);
      }
    } catch (error) {
      alert("Не удалось создать заказ :(");
    }
    setIsLoading(false);
  };

  return (
    <div className={`overly ${opened ? "cart-open" : ""}`}>
      <div className={`drawer`}>
        <h2 className="drawer__title">
          Корзина
          <button
            className="cart__delete-btn delete-btn card-btn"
            onClick={onClose}
          >
            <div className="ico-plus"></div>
          </button>
        </h2>

        {items.length > 0 ? (
          <>
            <div className="drawer__items">
              {items.map((obj) => (
                <div key={obj.id} className="cart__item">
                  <a href="#" className="cart__img">
                    <img src={obj.srcImg} alt="sneakers" />
                  </a>
                  <div className="cart__text-box">
                    <a href="#" className="cart__title">
                      {obj.title}
                    </a>
                    <b className="cart__price-num">{obj.price} грн.</b>
                  </div>

                  <button
                    onClick={() => onRemove(obj.id)}
                    className="cart__delete-btn delete-btn card-btn"
                  >
                    <div className="ico-plus"></div>
                  </button>
                </div>
              ))}
            </div>

            <ul className="drawer__price-box price-box">
              <li className="price-box__item price-box__total">
                <span className="price-box__text">Итого:</span>
                <div className="price-box__line-dashed"></div>
                <b className="price-box__num">{totalPrice} грн.</b>
              </li>

              <li className="price-box__item price-box__account">
                <span className="price-box__text">Налог 5%:</span>
                <div className="price-box__line-dashed"></div>
                <b className="price-box__num">
                  {Math.floor(totalPrice * 0.05)} грн.
                </b>
              </li>
              <button
                disabled={isLoading}
                onClick={onClickOrder}
                className="price-box__btn green-btn"
              >
                Оформить заказ <span className="ico-arrow-btn"></span>
              </button>
            </ul>
          </>
        ) : (
          <Info
            img={isOrderComplete ? "img/list.png" : "img/box.png"}
            title={isOrderComplete ? "Заказ оформлен!" : "Корзина пустая"}
            desc={
              isOrderComplete
                ? `Ваш заказ #${orderId} скоро будет передан курьерской доставке`
                : "Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ."
            }
          />
        )}
      </div>
    </div>
  );
}

export default Cart;
