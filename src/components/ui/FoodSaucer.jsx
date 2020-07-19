import React, { useContext, useRef } from "react";
import { FirebaseContext } from "../../firebase";
const FoodSaucer = ({ food }) => {
  const { firebase } = useContext(FirebaseContext);
  const existenceRef = useRef(food.existence);
  const updateAvailability = () => {
    const existence = existenceRef.current.value === "true";
    try {
      firebase.db.collection("products").doc(food.id).update({
        existence,
      });
    } catch (error) {
      console.log("Error: ", error);
    }
  };
  return (
    <div className="w-full px-3 mb-4">
      <div className="p-5 shadow-md bg-white">
        <div className="lg:flex">
          <div className="lg:w-5/12 xl:w-3/12">
            <img src={food.img} alt="img-food" />
            <div className="sm:flex sm:-mx-2 pl-2">
              <label htmlFor="" className="block mt-5 sm:w-2/4">
                <span className="block text-gray-800 mb-2">Existencia</span>
                <select
                  value={food.existence}
                  className="bg-white shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                  ref={existenceRef}
                  onChange={updateAvailability}
                >
                  <option value="true">Disponible</option>
                  <option value="false">No Disponible</option>
                </select>
              </label>
            </div>
          </div>
          <div className="lg:w-7/12 xl:w-9/12 pl-5">
            <p className="font-bold text-2xl text-yellow-600 mb-4">
              {food.name}
            </p>
            <p className="text-gray-600 mb-4">
              Categoria:{" "}
              <span className="text-gray-700 font-bold">{food.category}</span>
            </p>
            <p className="text-gray-600 mb-4">{food.description}</p>
            <p className="text-gray-600 mb-4">
              Precio:{" "}
              <span className="text-gray-700 font-bold">$ {food.price}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodSaucer;
