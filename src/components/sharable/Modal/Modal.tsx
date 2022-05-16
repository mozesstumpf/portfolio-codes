import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';

import { ContainerProps, ContentProps, ModalProps } from './modal-types';

const Container = styled.div<ContainerProps>`
	position: fixed;
	top: 0;
	left: 0;
	z-index: ${({ zIndex }) => zIndex};

	display: flex;
	align-items: center;
	justify-content: center;
	width: 100%;
	height: 100%;

	background-color: ${({ theme }) => theme.color.gray[4]}55;
`;

const Content = styled.div<ContentProps>`
	max-width: ${({ maxWidth }) => maxWidth};
	width: 100%;
`;

export const Modal = ({
	children,
	closeModal,
	isCloseOutsideClick,
	zIndex,
	maxWidth,
	disableScroll,
}: ModalProps) => {
	const contentRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (!contentRef.current) {
			console.error({ contentRef });
			return;
		}
		if (!isCloseOutsideClick) {
			return;
		}

		const content = contentRef.current;

		function blurCloseModal(event: Event) {
			if (!event.composedPath().includes(content)) {
				window.addEventListener(
					'mouseup',
					function (event) {
						!event.composedPath().includes(content) && closeModal();
					},
					{ once: true },
				);
			}
		}

		window.addEventListener('mousedown', blurCloseModal);

		return () => {
			window.removeEventListener('mousedown', blurCloseModal);
		};
	});

	useEffect(() => {
		if (!disableScroll) {
			return;
		}

		const { style } = document.body;
		Object.assign(style, {
			top: `-${scrollY}px`,
			overflowY: 'scroll',
			position: 'fixed',
			width: '100%',
		} as CSSStyleDeclaration);

		return () => {
			const scrollPosition = style.top;
			Object.assign(style, {
				top: '',
				overflowY: '',
				position: '',
				width: '',
			} as CSSStyleDeclaration);
			window.scrollTo(0, parseInt(scrollPosition || '0') * -1);
		};
	}, [disableScroll]);

	return (
		<Container zIndex={zIndex}>
			<Content ref={contentRef} maxWidth={maxWidth}>
				{children}
			</Content>
		</Container>
	);
};
