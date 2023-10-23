import { useState, useEffect } from "react";
import { Home, Landing, Formulario, SearchBar, NavBar, Detail } from "./views";
import { Routes, Route, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import { getCountries } from "./redux/actions";
import style from "./App.module.css";

axios.defaults.baseURL =
	"https://countries-deploy-production-4492.up.railway.app";

function App() {
	const dispatch = useDispatch();
	const [countries, setCountries] = useState([]);
	const location = useLocation();
	const [page, setPage] = useState(1);
	useEffect(() => {
		dispatch(getCountries());
	}, []);

	return (
		<div className={style.App}>
			{location.pathname != "/" && <NavBar setPage={setPage} />}
			<Routes>
				<Route path="/" element={<Landing />} />
				<Route
					path="/home"
					element={<Home countries={countries} page={page} setPage={setPage} />}
				/>
				<Route path="/detail/:id" element={<Detail />} />
				<Route path="/addActivity" element={<Formulario />} />
			</Routes>
		</div>
	);
}

export default App;
