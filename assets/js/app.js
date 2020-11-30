// We need to import the CSS so that webpack will load it.
// The MiniCssExtractPlugin is used to separate it out into
// its own CSS file.
import "../css/app.scss";

// webpack automatically bundles all modules in your
// entry points. Those entry points can be configured
// in "webpack.config.js".
//
// Import deps with the dep name or local files with a relative path, for example:
//

//     import socket from "./socket"
//
import "phoenix_html";
import React from "react";
import ReactDOM from "react-dom";
import MainComponent from "./MainComponent";

function App() {
  return (
    <div>
      <MainComponent />
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));