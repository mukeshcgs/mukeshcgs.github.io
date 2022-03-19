import './App.scss'
import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Routes from "./routes/routes";
// import "./styles/styles.css";
const App = () => {
  return (
    <main className='App'>
    <Router>
      <Route path="/" component={Routes} />
    </Router>
    </main>
      );
};

export default App;
