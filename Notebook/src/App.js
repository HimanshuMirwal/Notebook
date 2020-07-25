import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import EditExercise from "./component/AdminComponents/EditExercise";
// import CreateExercise from "./component/CreateExercise";
// import CreateUser from "./component/CreateUser";
import Webpage from "./component/UserComponents/Webpage";
import books from "./component/UserComponents/books";
import BooksCategory from "./component/UserComponents/BooksCategory";
import AdminDashboard from "./component/AdminComponents/AdminDashboard";
import AdminLogin from "./component/AdminComponents/AdminLogin";
import Logout from "./component/AdminComponents/Logout";



function App() {
  return (
      <div className="container-fluid constainer-class">
      <Router>
        <Route path="/"  exact component={Webpage} />
        <Route path="/EditExercise/:id" component={EditExercise} />
        <Route path="/books/:name" component={books} />
        {/* <Route path="/CreateExercise" component={CreateExercise} /> */}
        <Route path="/AdminDashboard" component={AdminDashboard} />
        {/* <Route path="/CreateUser" component={CreateUser} /> */}
        <Route path="/Logout" component={Logout} />
        <Route path="/BooksCategory" component={BooksCategory} />
        <Route path="/AdminLogin" component={AdminLogin} />
      </Router>
    </div>

  );
}

export default App;
