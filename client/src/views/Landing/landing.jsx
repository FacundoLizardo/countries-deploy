import countries from "../../imagen/countries.png";
import styles from "./landing.module.css";
import { Link } from "react-router-dom";
const Landing = () => {
	return (
		<div className={styles.mainContainer}>
			<p className={styles.p}>
				Bienvenido! En esta aplicacion web podras buscar informacion sobre todos
				los paises del mundo. Ademas de poder agregar actividades para realizar
				en cada pais que quieras!
			</p>
			<Link to="/home">
				<button className={styles.boton}>Comenzar →</button>
			</Link>
		</div>
	);
};
export default Landing;
