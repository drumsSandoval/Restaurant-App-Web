import React from "react";
import { Routes, Route } from "react-router";
import firebase, { FirebaseContext } from "./firebase";
import Orders from "./pages/Orders";
import Menu from "./pages/Menu";
import NewFoodsaucer from "./pages/NewFoodSaucer";
import Sidebar from "./components/ui/Sidebar";
function App() {
  return (
    <FirebaseContext.Provider value={{ firebase }}>
      <div className="md:flex min-h-screen">
        <Sidebar />
        <div className="md:w-3/5 xl:w-4/5 p-6">
          <Routes>
            <Route exact path="/" element={<Orders />} />
            <Route exact path="/menu" element={<Menu />} />
            <Route exact path="/nuevo-platillo" element={<NewFoodsaucer />} />
          </Routes>
        </div>
      </div>
    </FirebaseContext.Provider>
  );
}

export default App;
