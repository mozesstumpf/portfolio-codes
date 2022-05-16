import { StateProps, ActionProps } from './use-fetch-types';

export function useFetchReducer<Data>(
	state: StateProps<Data>,
	action: ActionProps<Data>,
) {
	switch (action.type) {
		case 'loading':
			return {
				...state,
				status: 'loading' as const,
			};
		case 'succeeded':
			return {
				...state,
				data: action.payload,
				status: 'succeeded' as const,
			};
		case 'failed':
			return { ...state, status: 'failed' as const };
		case 'idle':
			return {
				...state,
				status: 'idle' as const,
			};
		default:
			return state;
	}
}
