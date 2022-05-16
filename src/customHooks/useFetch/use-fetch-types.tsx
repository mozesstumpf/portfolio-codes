import { Dispatch, Reducer, SetStateAction } from 'react';

export type FetchRequest =
	| { isOrigin: boolean; url: string; requestInit?: RequestInit }
	| 'idle';

export type SetRequest = Dispatch<SetStateAction<FetchRequest>>;

export type StateProps<Data> = {
	status: 'idle' | 'loading' | 'succeeded' | 'failed';
	data: Data;
};

export type ActionProps<Data> =
	| { type: 'succeeded'; payload: Data }
	| { type: 'loading' }
	| { type: 'failed' }
	| { type: 'idle' };

export type UseReducerHook<Data> = Reducer<StateProps<Data>, ActionProps<Data>>;
