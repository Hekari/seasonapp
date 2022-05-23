import React from "react";
import "./style.scss";
import { createRoot } from "react-dom/client";
import SeasonDisplay from "./SeasonDisplay.js";
import Spinner from "./Spinner.js";

const container = document.querySelector("#root");
const root = createRoot(container);

class App extends React.Component {
  state = { lat: null, errorMessage: "" };

  componentDidMount() {
    window.navigator.geolocation.getCurrentPosition(
      (position) => this.setState({ lat: position.coords.latitude }),
      (err) => this.setState({ errorMessage: err.message })
    );
  }
  componentDidUpdate() {
    console.log(`component has just updated itself!`);
  }
  renderContent() {
    if (this.state.lat && !this.state.errorMessage) {
      return <SeasonDisplay lat={this.state.lat}></SeasonDisplay>;
    } else if (!this.state.lat && this.state.errorMessage) {
      return <div>Error:{this.state.errorMessage}</div>;
    } else {
      return <Spinner message="Awaiting your location request" />;
    }
  }
  render() {
    return <div className="border red">{this.renderContent()}</div>;
  }
}
root.render(<App></App>);
