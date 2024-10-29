import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import AddCategories from "./components/AdminPages/AddCategories";
import { Route, Switch } from "react-router-dom/cjs/react-router-dom.min";
import AddProducts from "./components/AdminPages/AddProducts";
function App() {
  return (
    <Switch>
      <Route exact path="/">
        <AddProducts />
      </Route>
    </Switch>
  );
}

export default App;
