import http from "./http";
import { MESSAGES } from "../utils/constants";

export class BaseApiService {
	constructor(endpoint) {
		this.endpoint = endpoint;
	}

	async get(path = "", params = {}) {
		try {
			const response = await http.get(`${this.endpoint}${path}`, { params });
			return response.data;
		} catch (error) {
			this.handleError(error);
		}
	}

	async post(path = "", data = {}) {
		try {
			const response = await http.post(`${this.endpoint}${path}`, data);
			return response.data;
		} catch (error) {
			this.handleError(error);
		}
	}

	async put(path = "", data = {}) {
		try {
			const response = await http.put(`${this.endpoint}${path}`, data);
			return response.data;
		} catch (error) {
			this.handleError(error);
		}
	}

	async delete(path = "") {
		try {
			const response = await http.delete(`${this.endpoint}${path}`);
			return response.data;
		} catch (error) {
			this.handleError(error);
		}
	}

	handleError(error) {
		if (!error.response) {
			throw new Error(MESSAGES.ERROR.NETWORK);
		}

		const { status } = error.response;
		switch (status) {
			case 401:
				throw new Error(MESSAGES.ERROR.UNAUTHORIZED);
			case 404:
				throw new Error("Resource not found");
			default:
				throw new Error(MESSAGES.ERROR.SERVER);
		}
	}
}
