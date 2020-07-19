import React, { useState, useContext } from "react";
import { FirebaseContext } from "../../firebase";
const Order = ({ order }) => {
  const [time, setTime] = useState(0);
  const { firebase } = useContext(FirebaseContext);
  const confirmTime = (id) => {
    try {
      firebase.db.collection("orders").doc(id).update({
        time,
      });
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="sm:w-1/2 lg:w-1/3 px-2 mb-4">
      <div className="p-3 shadow-md bg-white">
        <h1 className="text-yellow-600 text-lg font-bold">{order.id}</h1>
        {order.order.map((dish) => (
          <p className="text-gray-600">
            {dish.quantity} {dish.name}
          </p>
        ))}
        <p className="text-gray-700 font-bold">Total a Pagar: ${order.total}</p>
        {order.time === 0 && (
          <div className="mb-4">
            <label htmlFor="block text-gray-700 text-sm font-bold mb-2">
              Tiempo de Entrega
            </label>
            <input
              type="number"
              className="shadow appearance-none border rounted w-full py-2 py-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              min="1"
              max="20"
              placeholder="20"
              value={time}
              onChange={(e) => setTime(parseInt(e.target.value))}
            />
            <button
              type="submit"
              className="bg-gray-800 hover:bg-gray-900 w-full mt-5 p-2 text-white uppercase font-bold"
              onClick={() => {
                confirmTime(order.id);
              }}
            >
              Definir tiempo de entrega
            </button>
          </div>
        )}
        {order.time > 0 && (
          <p className="text-gray-700">
            Tiempo de Entrega:
            <span className="font-bold">{order.time}</span>
          </p>
        )}
        {!order.complete && order.time > 0 && (
          <button
            type="button"
            className="bg-blue-800 hover:bg-blue-700 w-full mt-5 p-2 text-white uppercase font-bold"
            onClick={() => {
              try {
                firebase.db.collection("orders").doc(order.id).update({
                  complete: true,
                });
              } catch (error) {
                console.log(error);
              }
            }}
          >
            Marcar como lista
          </button>
        )}
      </div>
    </div>
  );
};

export default Order;
