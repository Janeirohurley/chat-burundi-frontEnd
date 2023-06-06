import React from "react";
import ReactDOM from "react-dom/client";
import "remixicon/fonts/remixicon.css";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import store from "./redux/store";
import { Provider } from "react-redux";
import ChatProvider from "./context/ChatProvider"

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(


    <BrowserRouter>
      <Provider store={store}>
        <ChatProvider>
        <App />
      </ChatProvider>
      </Provider>
    </BrowserRouter>



);