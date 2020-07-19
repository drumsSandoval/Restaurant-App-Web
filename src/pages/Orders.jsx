import React, { useContext, useEffect, useState } from "react";
import { FirebaseContext } from "../firebase";
import Order from "../components/ui/Order";
const Orders = () => {
  const { firebase } = useContext(FirebaseContext);
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    firebase.db
      .collection("orders")
      .where("complete", "==", false)
      .onSnapshot((snapshot) => {
        const response = snapshot.docs.map((doc) => {
          return {
            id: doc.id,
            ...doc.data(),
          };
        });
        setOrders(response);
      });
  }, []);
  return (
    <>
      <h1 className="text-3xl font-light mb-4">Ordenes</h1>
      <div className="sm:flex sm:flex-wrap -mx-3">
        {orders.map((order) => (
          <Order key={order.id} order={order} />
        ))}
      </div>
    </>
  );
};

export default Orders;
