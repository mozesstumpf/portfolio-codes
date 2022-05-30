import {
	ChangeEvent,
	ComponentPropsWithRef,
	HTMLInputTypeAttribute,
} from 'react';

type CommonRequiredProps = {
	name: string;
	value: string;
	onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
};

type InputRequiredProps = CommonRequiredProps & {
	type: HTMLInputTypeAttribute;
};

type TextareaRequiredProps = CommonRequiredProps;

type InputProps = ComponentPropsWithRef<'input'> & InputRequiredProps;
type TextareaProps = ComponentPropsWithRef<'textarea'> & TextareaRequiredProps;

interface InputFieldType {
	type: 'input';
	attrs: InputProps;
}

interface TextareaFieldType {
	type: 'textarea';
	attrs: TextareaProps;
}

export interface TextFieldProps {
	fieldType: InputFieldType | TextareaFieldType;
	title: string;
}

export type ValidationsProps = Pick<
	ValidityState,
	'valueMissing' | 'patternMismatch' | 'typeMismatch'
>;
