import { useState, useReducer, useEffect } from 'react';
import { UseReducerHook, FetchRequest } from './use-fetch-types';
import { useFetchReducer } from './use-fetch-helper';

export const useFetch = <Data,>(
	initialRequest: FetchRequest,
	initialData: Data,
) => {
	const [request, setRequest] = useState(initialRequest);

	const [state, dispatch] = useReducer<UseReducerHook<Data>>(useFetchReducer, {
		status: initialRequest === 'idle' ? 'idle' : 'loading',
		data: initialData,
	});

	useEffect(() => {
		if (request === 'idle') {
			dispatch({ type: 'idle' });
			return;
		}
		dispatch({ type: 'loading' });

		const { isOrigin, url, requestInit } = request;
		const requestInfo = (isOrigin ? location.origin : '') + url;

		fetch(requestInfo, requestInit)
			.then((response) => {
				if (!response.ok) {
					throw new Error('Server error');
				}
				return response.json();
			})
			.then((response) => {
				dispatch({ type: 'succeeded', payload: response });
			})
			.catch((error) => {
				console.error(`Fetch error: ${error}`);

				dispatch({ type: 'failed' });
			});
	}, [request]);

	return { state, setRequest };
};
