import axios from "axios";
import {
	GET_COUNTRIES,
	SEARCH_COUNTRIES,
	SEARCH_COUNTRIES_FORM,
	GET_ACTIVITIES,
	SET_ACTIVITY,
	CLEAR_FORM,
	CLEAR_HOME,
	FILTER_BY_ACTIVITY,
	FILTER_BY_CONTINENT,
	ORDER_MEN_MAY,
	ORDER_MAY_MEN,
	ORDER_AZ,
	ORDER_ZA,
	RESTORE_BUSCADOS,
	RESET_FORM,
} from "./actionTypes";

export function getCountries() {
	return async function (dispatch) {
		const response = await axios.get(`/countries`);
		return dispatch({
			type: GET_COUNTRIES,
			payload: response.data,
		});
	};
}

export async function onSearch(payload) {
	try {
		if (payload === null || payload === "") {
			return;
		}
		const { data } = await axios(`/countries?name=${payload}`);

		const search = { data };

		return { type: SEARCH_COUNTRIES, payload: search.data };
	} catch (error) {
		window.alert("Error:" + error.message);
	}
}

export async function searchCountriesForm(payload) {
	if (payload === null || payload === "") {
		return;
	}
	const { data } = await axios(`/countries?name=${payload}`);

	const search = { data };

	return { type: SEARCH_COUNTRIES_FORM, payload: search.data };
}

export async function postActivity(activity) {
	try {
		if (activity.countryId.length === 1) {
			try {
				const id = activity.countryId[0];
				activity.countryId = id;

				const { data } = await axios.post("/activities", activity);

				return {
					type: SET_ACTIVITY,
					payload: data,
				};
			} catch (error) {
				window.alert("Error: Error en la informacion proporcionada");
			}
		} else if (activity.countryId.length >= 2) {
			try {
				activity.countryId.map(async (id) => {
					const actividad = { ...activity, countryId: id };
					const { data } = await axios.post("/activities", actividad);

					return {
						type: SET_ACTIVITY,
						payload: data,
					};
				});
			} catch (error) {
				window.alert("Error: Error en la informacion proporcionada");
			}
		}
	} catch (error) {
		window.alert("Error: Error en la informacion proporcionada");
	}
}

export async function getActivities(data) {
	try {
		if (data) {
			const activity = await axios.get(`/activities${data}`);
			return dispatch({
				type: GET_ACTIVITIES,
				payload: activity,
			});
		}

		if (!data) {
			const activity = await axios.get(`/activities`);
			return dispatch({
				type: GET_ACTIVITIES,
				payload: activity,
			});
		}
	} catch (error) {}
}

export function clearForm(newForm) {
	try {
		return {
			type: CLEAR_FORM,
			payload: newForm,
		};
	} catch (error) {
		window.alert(error.message);
	}
}

export function filterByActivity(value) {
	try {
		if (value === "- Actividad -") {
			return {
				type: RESTORE_BUSCADOS,
				payload: value,
			};
		}
		return {
			type: FILTER_BY_ACTIVITY,
			payload: value,
		};
	} catch (error) {
		throw new Error(error.message);
	}
}

export function filterByContinent(value) {
	try {
		if (value === "- Continente -") {
			return {
				type: RESTORE_BUSCADOS,
				payload: value,
			};
		}
		return {
			type: FILTER_BY_CONTINENT,
			payload: value,
		};
	} catch (error) {
		throw new Error(error.message);
	}
}

export function orderAz(value) {
	try {
		return {
			type: ORDER_AZ,
			payload: value,
		};
	} catch (error) {
		throw new Error(error.message);
	}
}

export function orderZa(value) {
	try {
		return {
			type: ORDER_ZA,
			payload: value,
		};
	} catch (error) {
		throw new Error(error.message);
	}
}

export function orderMenMay(value) {
	try {
		return {
			type: ORDER_MEN_MAY,
			payload: value,
		};
	} catch (error) {
		throw new Error(error.message);
	}
}

export function orderMayMen(value) {
	try {
		return {
			type: ORDER_MAY_MEN,
			payload: value,
		};
	} catch (error) {
		throw new Error(error.message);
	}
}

export const clearHome = () => async (dispatch) => {
	try {
		const response = await axios.get(`/countries`);
		dispatch({
			type: CLEAR_HOME,
			payload: response.data,
		});
	} catch (error) {
		throw new Error(error.message);
	}
};

export function resetForm(data) {
	try {
		return {
			type: RESET_FORM,
			payload: data,
		};
	} catch (error) {
		throw new Error(error.message);
	}
}
