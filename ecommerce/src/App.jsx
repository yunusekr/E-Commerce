import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import AddCategories from "./components/AdminPages/AddCategories";
import { Route, Switch } from "react-router-dom/cjs/react-router-dom.min";
function App() {
  return (
    <Switch>
      <Route exact path="/">
        <AddCategories />
      </Route>
    </Switch>
  );
}

export default App;
