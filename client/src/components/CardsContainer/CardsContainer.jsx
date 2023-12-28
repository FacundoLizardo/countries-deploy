import Card from "../Card/Card";
import style from "./CardsContainer.module.css";

const CardsContainer = ({ buscados }) => {
	return (
		<div className={style.cardsContainer}>
			{buscados.map((country) => {
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
	);
};

export default CardsContainer;
