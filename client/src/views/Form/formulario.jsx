import { useState, useEffect } from "react";
import style from "./formulario.module.css";
import { useSelector, useDispatch } from "react-redux";
import SearchBar from "../../components/searchBar";
import Card from "../../components/Card/Card";
import { postActivity, resetForm } from "../../redux/actions/index";

const Formulario = () => {
	const countries = useSelector((state) => state.countries);
	const countriesForm = useSelector((state) => state.form);
	const dispatch = useDispatch();

	const [activity, setActivity] = useState({
		nombre: "",
		dificultad: "",
		duracion: 1,
		temporada: "",
		countryId: [],
	});

	const [send, setSend] = useState(false);
	const countriesIds = countriesForm.map((country) => {
		const id = country.id;
		return id;
	});

	function handleChange(event) {
		event.preventDefault();
		const { name, value } = event.target;

		if (name == "duracion") {
			let isFloat = parseFloat(value);

			setActivity((prevActivity) => ({ ...prevActivity, [name]: isFloat }));
			if (isNaN(value)) {
				event.target.value = "";
				return window.alert("You can only write numbers");
			} else if (value > 100 || value <= 0) {
				event.target.value = event.target.value.slice(0, -1);
				return window.alert(
					"The duration of the activity should be 100hs maximum"
				);
			}
		}
		if (name === "dificultad") {
			setActivity((prevActivity) => ({
				...prevActivity,
				[name]: parseInt(value),
			}));
		} else {
			setActivity((prevActivity) => ({ ...prevActivity, [name]: value }));
		}
	}

	const onSubmit = async () => {
		event.preventDefault();

		await postActivity(activity);
		setSend(true);
		await dispatch(resetForm([]));
		setActivity(false);
	};

	useEffect(() => {
		setActivity((prevActivity) => ({
			...prevActivity,
			countryId: countriesIds,
		}));
	}, [event]);

	return (
		<div className={style.mainContainer}>
			<p className={style.parrafo}>
				En este formulario podras agregar una actividad a tantos paises como
				quieras
			</p>
			<form onSubmit={onSubmit}>
				<label htmlFor="Activity" className={style.label}>
					Escribe el nombre de la actividad
				</label>
				<input
					placeholder="Activity"
					id="Activity"
					name="nombre"
					onChange={handleChange}
					className={style.input}
				/>

				<label htmlFor="Dificultad" className={style.label}>
					Ingresa la dificultad de la actividad
				</label>
				<select
					id="Dificultad"
					name="dificultad"
					onChange={handleChange}
					className={style.customselect}
				>
					<option>Select</option>
					<option value={1}>1</option>
					<option value={2}>2</option>
					<option value={3}>3</option>
					<option value={4}>4</option>
					<option value={5}>5</option>
				</select>

				<label htmlFor="Duracion" className={style.label}>
					Escribe la duracion de la actividad, no puede superar un maximo de 100
					horas
				</label>
				<input
					placeholder="Duración"
					id="duracion"
					name="duracion"
					onChange={handleChange}
					className={style.input}
				/>

				<label htmlFor="Temporada" className={style.label}>
					Ingresa la epoca del año en que se puede realizar esta actividad
				</label>
				<select
					id="Temporada"
					name="temporada"
					onChange={handleChange}
					className={style.customselect}
				>
					<option>Select</option>
					<option value={"Verano"}>Verano</option>
					<option value={"Invierno"}>Invierno</option>
					<option value={"Primavera"}>Primavera</option>
					<option value={"Otoño"}>Otoño</option>
				</select>

				<div className={style.search}>
					<label htmlFor="paises" className={style.labelForm}>
						Selecciona el/los paises en los que se puede realizar esta actividad
					</label>
					<SearchBar />

					<div className={style.searchCountries}>
						{countriesForm.map((country) => {
							return (
								<Card
									id={country.id}
									key={country.nombre}
									nombre={country.nombre}
									bandera={country.bandera}
									continente={country.continente}
								/>
							);
						})}
					</div>
				</div>

				<button type="submit" className={style.buttonSubmit}>
					Submit
				</button>
			</form>
		</div>
	);
};
export default Formulario;
