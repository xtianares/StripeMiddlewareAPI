import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import NoMatch from "./pages/NoMatch";
import Header from "./components/Header";
import CreateAccount from "./pages/CreateAccount";
import BillingInformation from "./pages/BillingInformation";
import Receipt from "./pages/Receipt";
import Login from "./pages/Login";

import "./scss/App.scss";

class App extends Component {
  render() {
    return (
      <Router>
        <header>
          <Header />
        </header>
        <main>
          <Switch>
            <Route exact path="/" component={CreateAccount} />
            <Route exact path="/create-account/" component={CreateAccount} />
            <Route exact path="/create-account/:productId" component={CreateAccount} />
            <Route exact path="/billing-information/:productId" component={BillingInformation} />
            <Route exact path="/receipt/:productId" component={Receipt} />
            <Route exact path="/login/" component={Login} />
            <Route exact path="/login/:productId" component={Login} />
            <Route component={NoMatch} />
          </Switch>
        </main>
        {/* <Footer /> */}
      </Router>
    );
  }
}

export default App;
