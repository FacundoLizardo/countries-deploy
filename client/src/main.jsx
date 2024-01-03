import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { store } from "./redux/store/index.js";
import { Provider } from "react-redux";
import axios from "axios";

axios.defaults.baseURL =
	"https://countries-deploy-production-42d8.up.railway.app";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<BrowserRouter>
		<Provider store={store}>
			<App></App>
		</Provider>
	</BrowserRouter>
);
