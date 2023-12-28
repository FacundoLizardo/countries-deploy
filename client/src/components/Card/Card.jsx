import style from "./Card.module.css";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const Card = (props) => {
	const { nombre, bandera, continente, id } = props;
	const location = useLocation();

	const activities = useSelector((state) => state.activities);

	return (
		<div>
			{location.pathname === "/home" && (
				<div className={style.containerHome}>
					<h2 className={style.nombre}>{nombre}</h2>
					<h2>{continente}</h2>
					<Link to={`/detail/${id}`}>
						<img src={bandera} className={style.image}></img>
					</Link>
				</div>
			)}

			{location.pathname === "/addActivity" && (
				<div className={style.containerForm}>
					<h4 className={style.nombreF}>{nombre}</h4>
					<img src={bandera} className={style.imageF}></img>
				</div>
			)}
		</div>
	);
};
export default Card;
