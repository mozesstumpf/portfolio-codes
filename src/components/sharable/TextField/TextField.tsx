import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { Warning, IconMenu } from 'components/sharable';

import { TextFieldProps, ValidationsProps } from './text-field-types';
import { isError } from './text-field-helper';

const Container = styled.div`
	display: flex;
	flex-direction: column;
`;

const FieldInformation = styled.div`
	display: flex;
	justify-content: space-between;
`;

const Title = styled.label`
	color: ${({ theme }) => theme.color.gray[3]};
	font-weight: bold;
	font-size: 14px;

	white-space: nowrap;
	user-select: none;
`;

const ErrorIconHolder = styled.div`
	display: inline-flex;

	color: ${({ theme }) => theme.color.red[1]};

	cursor: pointer;
`;

const FieldCssProps = css`
	width: 100%;
	padding: 6px 0;

	font-size: 14px;
	font-weight: bold;
	color: ${({ theme }) => theme.color.gray[3]};

	outline: none;
	border-width: 0 0 3px 0;
	border-color: ${({ theme }) => theme.color.gray[2]};

	&:focus {
		border-color: ${({ theme }) => theme.color.gray[3]};
	}
	transition: border-color 0.2s;

	background-color: transparent;

	&::placeholder {
		color: ${({ theme }) => theme.color.gray[5]};
		opacity: 1;
	}
`;

const Input = styled.input`
	${FieldCssProps};
`;

const Textarea = styled.textarea`
	${FieldCssProps};

	min-width: 200px;
	min-height: 150px;

	max-width: 100%;
	max-height: 500px;

	line-height: 1.4;
`;

const CharacterCounter = styled.div`
	margin-top: 5px;
	color: ${({ theme }) => theme.color.gray[5]};
	font-size: 12px;
`;

const MenuContent = styled.div`
	display: flex;
	flex-direction: column;
	padding: 10px;
`;

const ErrorMessage = styled.span`
	color: ${({ theme }) => theme.color.gray[3]};
	font-weight: bold;
	font-size: 14px;

	white-space: nowrap;
`;

export const TextField = ({ title, fieldType }: TextFieldProps) => {
	const [validations, setValidations] = useState<ValidationsProps>({
		valueMissing: false,
		patternMismatch: false,
		typeMismatch: false,
	});

	const checkValidation = (element: HTMLInputElement | HTMLTextAreaElement) => {
		const { valueMissing, patternMismatch, typeMismatch } = element.validity;

		setValidations({
			valueMissing,
			patternMismatch,
			typeMismatch,
		});
	};

	return (
		<Container>
			<FieldInformation>
				<Title htmlFor={fieldType.attrs.id}>{title}</Title>
				{isError(validations) && (
					<IconMenu
						floatingMenuProps={{
							distance: { value: 28, unit: 'px' },
							horizontalView: 'right',
						}}
					>
						<ErrorIconHolder>
							<Warning />
						</ErrorIconHolder>
						<MenuContent>
							{validations.valueMissing && (
								<ErrorMessage>It can't be empty.</ErrorMessage>
							)}
							{(validations.patternMismatch || validations.typeMismatch) && (
								<ErrorMessage>The given value isn't valid.</ErrorMessage>
							)}
						</MenuContent>
					</IconMenu>
				)}
			</FieldInformation>
			{fieldType.type === 'input' && (
				<Input
					{...fieldType.attrs}
					onBlur={(e) => checkValidation(e.target)}
					onInvalid={(e) => checkValidation(e.target as HTMLInputElement)}
				/>
			)}
			{fieldType.type === 'textarea' && (
				<Textarea
					{...fieldType.attrs}
					onBlur={(e) => checkValidation(e.target)}
					onInvalid={(e) => checkValidation(e.target as HTMLTextAreaElement)}
				/>
			)}
			{fieldType.attrs.maxLength && (
				<CharacterCounter>
					{fieldType.attrs.value.length} / {fieldType.attrs.maxLength}
				</CharacterCounter>
			)}
		</Container>
	);
};
