import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";

const loading = () => <div>Loading...</div>;
const Home = React.lazy(() => import("./containers/Home/Home"));
const Cafe = React.lazy(() => import("./containers/Cafe/Cafe"));
const Employee = React.lazy(() => import("./containers/Employee/Employee"));

function App() {
  return (
    <div className="App">
      <Router>
        <React.Suspense fallback={loading()}>
          <Header />
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/cafe" exact component={Cafe} />
            <Route path="/employee" exact component={Employee} />
          </Switch>
          <Footer />
        </React.Suspense>
      </Router>
    </div>
  );
}

export default App;
