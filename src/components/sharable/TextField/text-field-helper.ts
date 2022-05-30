import { ValidationsProps } from './text-field-types';

export const isError = (validations: ValidationsProps) =>
	Object.values(validations).some((value) => value);
