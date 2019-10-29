import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import NoMatch from "./pages/NoMatch";
import Header from "./components/Header";
import CreateAccount from "./pages/CreateAccount";
import BillingInformation from "./pages/BillingInformation";

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
            <Route exact path="/create-account/:productId" component={CreateAccount} />
            <Route exact path="/billing-information/:productId" component={BillingInformation} />
            <Route component={NoMatch} />
          </Switch>
        </main>
        {/* <Footer /> */}
      </Router>
    );
  }
}

export default App;
