import { useState, useCallback } from "react";

export const useApi = (apiFunc) => {
	const [data, setData] = useState(null);
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(false);

	const execute = useCallback(
		async (...params) => {
			try {
				setLoading(true);
				setError(null);
				const response = await apiFunc(...params);
				setData(response);
				return response;
			} catch (err) {
				setError(err.message || "Có lỗi xảy ra");
				throw err;
			} finally {
				setLoading(false);
			}
		},
		[apiFunc]
	);

	const reset = useCallback(() => {
		setData(null);
		setError(null);
		setLoading(false);
	}, []);

	return {
		data,
		error,
		loading,
		execute,
		reset,
	};
};
