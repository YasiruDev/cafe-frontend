import React from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";

const loading = () => <div>Loading...</div>;
const Home = React.lazy(() => import("./containers/Home/Home"));
const Cafe = React.lazy(() => import("./containers/Cafe/Cafe"));
const NewCafe = React.lazy(() => import("./containers/Cafe/AddNewCafe"));
const Employee = React.lazy(() => import("./containers/Employee/Employee"));
const AddNewEmployee = React.lazy(() => import("./containers/Employee/AddNewEmployee"));

function App() {
  return (
    <div className="App">
      <Router>
        <React.Suspense fallback={loading()}>
          <Header />
          <Switch>
            {/* <Route path="/" exact component={Home} /> */}
            <Route path="/" exact component={Home}>
              <Redirect from="/" to="/cafe" />
            </Route>
            <Route path="/cafe" exact component={Cafe} />
            <Route path="/new-cafe" exact component={NewCafe} />
            <Route path="/edit-cafe/:id" exact component={NewCafe} />
            <Route path="/employee" exact component={Employee} />
            <Route path="/employee/:id" exact component={Employee} />
            <Route path="/new-employee" exact component={AddNewEmployee} />
            <Route path="/edit-employee/:id" exact component={AddNewEmployee} />
          </Switch>
          <Footer />
        </React.Suspense>
      </Router>
    </div>
  );
}

export default App;
