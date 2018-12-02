import React, { Component } from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route } from "react-router-dom";
import AppHeader from "./components/AppHeader";
import MissionControl from "./components/MissionControl";
import MissionReport from "./components/MissionReport";
import AppFooter from "./components/AppFooter";
import ErrorBar from "./components/ErrorBar";
import store from "./store";
class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <AppHeader />
            <Route exact path="/" component={MissionControl} />
            <Route exact path="/report" component={MissionReport} />
            <ErrorBar />
            <AppFooter />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
