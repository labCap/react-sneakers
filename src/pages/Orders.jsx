import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";
import { appContext } from "../App";
import Card from "../components/Card";

export default function Orders() {
  const { like, onAddToCart, onAddToLike } = React.useContext(appContext);

  const [orders, setOrders] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(
          "https://632484f4bb2321cba92e64cb.mockapi.io/orders"
        );
        setOrders(data.reduce((prev, obj) => [...prev, ...obj.items], []));
        setIsLoading(false);
      } catch (error) {
        alert("Ошибка при запросе заказов");
        console.error(error);
      }
    })();
  }, []);

  return (
    <section className="content">
      <section className="sneakers">
        <div className="sneakers__header">
          <h2 className="sneakers__title title">
            <Link to={"/"} className="prev-btn card-btn">
              <div className="ico-arrow-slider"></div>
            </Link>
            Мои покупки
          </h2>
        </div>
        <div className="sneakers__items">
          {/* {orders.length <= 0 ? (
            <Info
              img={"img/ico2.svg"}
              title={"У вас нет заказов"}
              desc={"Оформите хотя бы один заказ."}
            />
          ) : ( */}
          <>
            {(isLoading ? [...Array(4)] : orders).map((item, index) => (
              <Card key={index} loading={isLoading} {...item} />
            ))}
          </>
          {/* )} */}
        </div>
      </section>
    </section>
  );
}
