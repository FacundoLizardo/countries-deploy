import { Link } from "react-router-dom";
import SearchBar from "./searchBar";
import style from "./NavBar.module.css";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
	filterByActivity,
	filterByContinent,
	orderAz,
	orderZa,
	orderMenMay,
	orderMayMen,
} from "../redux/actions";
import { useState } from "react";

const NavBar = ({ setPage }) => {
	const location = useLocation();
	const dispatch = useDispatch();
	const buscados = useSelector((state) => state.buscados);
	const countries = useSelector((state) => state.countries);
	const [selectedActividad, setSelectedActividad] = useState("- Actividad -");
	const [selectedContinente, setSelectedContinente] =
		useState("- Continente -");
	const [selectedOrder, setSelectedOrder] = useState("Order");

	let activitiesNames = [];
	let arrayContinentes = [];

	if (buscados.length === 0) {
		console.log(countries);
		const nombresUnicos = countries.reduce((result, objeto) => {
			objeto.Activities.forEach((activity) => {
				result.add(activity.nombre);
			});
			return result;
		}, new Set());

		console.log(nombresUnicos);

		activitiesNames = [...nombresUnicos];
		console.log(activitiesNames);

		const continentes = new Set(countries.map((country) => country.continente));
		arrayContinentes = [...continentes];
		console.log(arrayContinentes);
	}
	console.log(activitiesNames);
	console.log(arrayContinentes);

	if (buscados.length > 1) {
		const nombresUnicos = buscados.reduce((result, objeto) => {
			objeto.Activities.forEach((activity) => {
				result.add(activity.nombre);
			});
			return result;
		}, new Set());

		activitiesNames = [...nombresUnicos];

		const continentes = new Set(buscados.map((country) => country.continente));
		arrayContinentes = [...continentes];
	}

	const filterAct = (event) => {
		if (event === "- Actividad -") {
			dispatch(filterByActivity(event));
		}
		setSelectedActividad(event.target.value);
		dispatch(filterByActivity(event.target.value));

		if (event.target.value === "- Actividad -") {
			setSelectedContinente("- Continente -");
		}
		setPage(1);
	};

	const filterContinent = (event) => {
		if (event === "- Continente -") {
			dispatch(filterByContinent(event));
		}
		setSelectedContinente(event.target.value);
		dispatch(filterByContinent(event.target.value));

		if (event.target.value === "- Continente -") {
			setSelectedActividad("- Actividad -");
		}
		setPage(1);
	};

	const clearFilters = () => {
		setSelectedActividad("- Actividad -");
		setSelectedContinente("- Continente -");
		filterAct("- Actividad -");
		filterByContinent("- Continente -");
	};

	const handleOrder = (event) => {
		if (event.target.value === "az") {
			dispatch(orderAz(event.target.value));
			event.target.value = "Order";
		}
		if (event.target.value === "za") {
			dispatch(orderZa(event.target.value));
			event.target.value = "Order";
		}
		if (event.target.value === "menenorMayor") {
			dispatch(orderMenMay(event.target.value));
			event.target.value = "Order";
		}
		if (event.target.value === "mayorMenor") {
			dispatch(orderMayMen(event.target.value));
			setPage(1);
			event.target.value = "Order";
		}
	};

	return (
		<div className={style.mainContainer}>
			{location.pathname != "/addActivity" &&
				!location.pathname.includes("/detail") && (
					<SearchBar setPage={setPage} />
				)}

			{location.pathname != "/home" && (
				<Link to="/home">
					<button className={style.buttonNavbar}>← BACK TO HOME</button>
				</Link>
			)}

			{location.pathname != "/addActivity" &&
				!location.pathname.includes("/detail") && (
					<div>
						<label className={style.orderLabel}>Order :</label>
						<select onChange={handleOrder} className={style.order}>
							<option value={"Order"}>Orden</option>
							<option value={"az"}>A → Z</option>
							<option value={"za"}>Z → A</option>
							<option value={"menenorMayor"}>Poblacion Men → May</option>
							<option value={"mayorMenor"}>Poblacion May → Men</option>
						</select>

						<label>Filter by:</label>
						<select
							onChange={filterAct}
							id="selectActividad"
							value={selectedActividad}
							className={style.selectActivity}
						>
							<option>- Actividad -</option>
							{activitiesNames.map((name, index) => (
								<option key={index} value={name}>
									{name}
								</option>
							))}
						</select>

						<select
							onChange={filterContinent}
							id="selectContinente"
							value={selectedContinente}
							className={style.selectContient}
						>
							<option>- Continente -</option>
							{arrayContinentes.map((continente, index) => (
								<option key={index} value={continente}>
									{continente}
								</option>
							))}
						</select>

						<button onClick={clearFilters} className={style.buttonClearFilters}>
							Clear filters
						</button>
					</div>
				)}

			{location.pathname != "/addActivity" &&
				!location.pathname.includes("/detail") && (
					<Link to="/addActivity">
						<button className={style.buttonNavbar}>ADD AN ACTIVITY →</button>
					</Link>
				)}
		</div>
	);
};

export default NavBar;
