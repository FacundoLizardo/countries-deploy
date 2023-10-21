import { useState } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
	onSearch,
	searchCountriesForm,
	clearForm,
	clearHome,
} from "../redux/actions";
import style from "./searchBar.module.css";
const SearchBar = ({ setPage }) => {
	const dispatch = useDispatch();
	const [nombre, setNombre] = useState("");
	const location = useLocation();

	const handleChange = (event) => {
		event.preventDefault();
		setNombre(event.target.value);
	};

	const handler = async function (nombre) {
		event.preventDefault();
		if (location.pathname === "/home") {
			dispatch(await onSearch(nombre));
			setPage(1);
		}
		if (location.pathname === "/addActivity") {
			dispatch(await searchCountriesForm(nombre));
		}
		setNombre("");
	};

	const clear = function () {
		if (location.pathname === "/addActivity") {
			const newForm = [];
			dispatch(clearForm(newForm));
		}

		dispatch(clearHome());
	};

	return (
		<div className={style.mainContainer}>
			{location.pathname === "/home" && (
				<div>
					{" "}
					<input
						type="search"
						onChange={handleChange}
						id="busqueda"
						value={nombre}
					/>
					<button
						onClick={() => handler(nombre)}
						className={style.buttonSearchBar}
					>
						Search
					</button>
					<button onClick={clear} className={style.buttonSearchBar}>
						Clear
					</button>
				</div>
			)}

			{location.pathname === "/addActivity" && (
				<div className={style.mainForm}>
					{" "}
					<input
						type="search"
						onChange={handleChange}
						id="busqueda"
						value={nombre}
						className={style.inputSearch}
					/>
					<button
						onClick={() => handler(nombre)}
						className={style.buttonSearchBar}
					>
						Search
					</button>
					<button onClick={clear} className={style.buttonSearchBar}>
						Clear search
					</button>
				</div>
			)}
		</div>
	);
};
export default SearchBar;
