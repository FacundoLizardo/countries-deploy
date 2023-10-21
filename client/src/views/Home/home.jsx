import style from "./Home.module.css";
import CardsContainer from "../../components/CardsContainer/CardsContainer";
import { Paginacion } from "../../components/Paginacion/Paginacion";
import { useSelector } from "react-redux";
import { useState } from "react";

const Home = ({ page, setPage }) => {
	const buscados = useSelector((state) => state.buscados);

	const [perPage, setPerPage] = useState(10);
	const countries = useSelector((state) => state.countries);

	let cantidadDePaginas = 1;

	if (buscados.length === 0) {
		cantidadDePaginas = Math.ceil(countries.length / perPage);
	}

	if (buscados.length > 10) {
		cantidadDePaginas = Math.ceil(buscados.length / perPage);
	}

	const renderCountries = countries.slice(
		(page - 1) * perPage,
		(page - 1) * perPage + perPage
	);

	const render = buscados.slice(
		(page - 1) * perPage,
		(page - 1) * perPage + perPage
	);

	return (
		<div className={style.mainContainer}>
			{buscados.length >= 1 && <CardsContainer buscados={render} />}
			{buscados.length === 0 && <CardsContainer buscados={renderCountries} />}
			<Paginacion
				page={page}
				setPage={setPage}
				cantidadDePaginas={cantidadDePaginas}
			/>
		</div>
	);
};

export default Home;
