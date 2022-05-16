import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';

import {
	ContainerProps,
	ContainerAttrs,
	SmoothMenuProps,
} from './smooth-menu-types';

const Container = styled.div.attrs(({ offsetHeight }: ContainerAttrs) => ({
	style: {
		height: offsetHeight,
	},
	hidden: true,
}))<ContainerProps>`
	${({ cssProps }) => cssProps};
`;

const HeightChecker = styled.div``;

export const SmoothMenu = ({ children, isOpen, cssProps }: SmoothMenuProps) => {
	const [offsetHeight, setOffsetHeight] = useState(0);
	const containerRef = useRef<HTMLDivElement>(null);
	const heightCheckerRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (!heightCheckerRef.current) {
			console.error({ heightCheckerRef });
			return;
		}

		const heightChecker = heightCheckerRef.current;
		const heightCheckerObserver = new ResizeObserver(() => {
			setOffsetHeight(heightChecker.offsetHeight);
		});
		heightCheckerObserver.observe(heightChecker);
		return () => {
			heightCheckerObserver.disconnect();
		};
	}, []);

	useEffect(() => {
		if (!containerRef.current) {
			console.error({ containerRef });
			return;
		}

		const container = containerRef.current;

		if (isOpen) {
			container.removeAttribute('hidden');
			return;
		}

		const isNotTransition =
			getComputedStyle(container).transitionDuration === '0s';

		if (isNotTransition) {
			container.setAttribute('hidden', '');
			return;
		}

		function addHiddenAttribute(this: HTMLElement) {
			this.setAttribute('hidden', '');
		}

		container.addEventListener('transitionend', addHiddenAttribute);

		return () => {
			container.removeEventListener('transitionend', addHiddenAttribute);
		};
	}, [isOpen]);

	return (
		<Container
			ref={containerRef}
			role={'menu'}
			offsetHeight={isOpen ? offsetHeight : 0}
			cssProps={cssProps}
		>
			<HeightChecker ref={heightCheckerRef}>{children}</HeightChecker>
		</Container>
	);
};
