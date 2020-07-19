import React, { useState, useEffect, useContext } from "react";
import { FirebaseContext } from "../firebase";
import { Link } from "react-router-dom";
import FooSaucer from "../components/ui/FoodSaucer";
const Menu = () => {
  const { firebase } = useContext(FirebaseContext);
  const [foodSaucers, setFoodSaucers] = useState([]);

  useEffect(() => {
    firebase.db.collection("products").onSnapshot(onSnapshot);
  }, []);

  const onSnapshot = (snapshot) => {
    const response = snapshot.docs.map((doc) => {
      return {
        id: doc.id,
        ...doc.data(),
      };
    });
    setFoodSaucers(response);
  };

  return (
    <>
      <h1 className="text-3xl font-light mb-4">Menu</h1>
      <Link
        to="/nuevo-platillo"
        className="bg-blue-800 hover:bg-blue-700, inline-block mb-5 p-2 text-white uppercase font-bold"
      >
        Agregar Platillo
      </Link>
      {foodSaucers.map((food) => (
        <FooSaucer key={food.id} food={food} />
      ))}
    </>
  );
};

export default Menu;
