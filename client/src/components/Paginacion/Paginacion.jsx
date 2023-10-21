import React, { useState } from "react";
import styles from "./Paginacion.module.css";

export const Paginacion = ({ page, setPage, cantidadDePaginas }) => {
	const [newPage, setNewPage] = useState();

	const nextPage = () => {
		if (page === cantidadDePaginas) {
			setPage(cantidadDePaginas);
		}
		if (page < cantidadDePaginas) {
			setPage(page + 1);
		}
	};

	const prevPage = () => {
		if (page <= 1) {
			setPage(1);
		}
		if (page >= 2) setPage(page - 1);
	};

	function contieneLetras(cadena) {
		return /[a-zA-Z]/.test(cadena);
	}

	const changePage = (event) => {
		event.preventDefault();
		const { value } = event.target;
		if (value === "") {
			setPage(1);
		}
		if (value <= 0) {
			setPage(1);
		}

		if (isNaN(parseInt(value))) {
			event.target.value = "";
		}
		if (contieneLetras(value)) {
			window.alert("Only numbers");
			setPage(page);
			event.target.value = "";
		}

		if (value > cantidadDePaginas) {
			window.alert("Can not exceed the maximun number of pages");
			setPage(1);
			event.target.value = "";
		}
		if (!contieneLetras(value) && value > 0 && value <= cantidadDePaginas) {
			setPage(value);
		}
	};

	return (
		<div className={styles.mainContainer}>
			<button className={styles.buttonPages} onClick={prevPage}>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="icon icon-tabler icon-tabler-arrow-left"
					width="65"
					height="65"
					viewBox="0 0 24 24"
					stroke-width="2"
					stroke="currentColor"
					fill="none"
					stroke-linecap="round"
					stroke-linejoin="round"
				>
					<path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
					<path d="M5 12l14 0"></path>
					<path d="M5 12l6 6"></path>
					<path d="M5 12l6 -6"></path>
				</svg>
			</button>

			<p className={styles.parrafoPaginacion}>
				Pagina {page} de {cantidadDePaginas}
			</p>

			<button className={styles.buttonPages} onClick={nextPage}>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="icon icon-tabler icon-tabler-arrow-right"
					width="65"
					height="65"
					viewBox="0 0 24 24"
					stroke-width="2"
					stroke="currentColor"
					fill="none"
					stroke-linecap="round"
					stroke-linejoin="round"
				>
					<path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
					<path d="M5 12l14 0"></path>
					<path d="M13 18l6 -6"></path>
					<path d="M13 6l6 6"></path>
				</svg>
			</button>

			<input
				onChange={changePage}
				type="search"
				placeholder="Page"
				className={styles.inputPage}
			/>
		</div>
	);
};
