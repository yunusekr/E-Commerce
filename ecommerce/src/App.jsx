import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import AddCategories from "./components/AdminPages/AddCategories";
import { Route, Switch } from "react-router-dom/cjs/react-router-dom.min";
import AddProducts from "./components/AdminPages/AddProducts";
import Register from "./components/ResigterAndLoginPages/Register";
import Login from "./components/ResigterAndLoginPages/Login";
import Products from "./components/ProductsPages/Products";
import ProductCard from "./components/ProductsPages/ProductCard";

function App() {
  return (
    <Switch>
      <Route exact path="/">
        <Products />
      </Route>
      <Route path="/adpro">
        <AddProducts />
      </Route>
    </Switch>
  );
}

export default App;
