import React from "react";
import ReactDOM from "react-dom";

import "./index.css";

export class Extension extends React.Component {
  render() {
    return <h1>Extension is working</h1>;
  }
}
// Add our extension to the document
const extensionRoot = document.createElement("div");
extensionRoot.id = "extension";
document.body.appendChild(extensionRoot);
ReactDOM.render(<Extension />, extensionRoot);
