import React, { useState, useRef, useEffect } from 'react';
import styled, { css, keyframes } from 'styled-components';

import { LoadingProps } from './loading-types';

const Svg = styled.svg``;

const PathProps = css`
	fill: none;
`;

const Blueprint = styled.path`
	${PathProps};
`;

const RotateLoadingPath = keyframes`
	from {
		transform: rotate(0deg);
	}
	to {
		transform: rotate(360deg);
	}
`;

const LoadingSlide = styled.path`
	${PathProps};
	stroke-linecap: round;
	transform-origin: 50% 50%;
	animation: ${RotateLoadingPath} 2s linear infinite;
`;

export const Loading = ({ size, strokeWidth, color }: LoadingProps) => {
	const [blueprintLength, setBlueprintLength] = useState(0);
	const blueprintRef = useRef<SVGPathElement>(null);
	const loadingSlideRef = useRef<SVGPathElement>(null);

	const halfSize = size / 2;
	const halfStrokeWidth = strokeWidth / 2;
	const circlePath = `
	M ${halfSize} ${halfStrokeWidth} 
	A 1 1, 0, 0 1, ${halfSize} ${size - halfStrokeWidth} 
	A 1 1, 0, 0 1, ${halfSize} ${halfStrokeWidth} `;
	const pathProps = {
		d: circlePath,
		strokeWidth,
	};

	useEffect(() => {
		if (!blueprintRef.current) {
			console.error({ blueprintRef });
			return;
		}
		const blueprint = blueprintRef.current;

		setBlueprintLength(blueprint.getTotalLength());
	}, []);

	useEffect(() => {
		if (!loadingSlideRef.current) {
			console.error({ loadingSlideRef });
			return;
		}
		const loadingSlide = loadingSlideRef.current;

		loadingSlide.animate(
			[
				{ strokeDashoffset: -blueprintLength - 10 },
				{ strokeDashoffset: -blueprintLength * 3 - 10 },
			],
			{ duration: 4000, iterations: Infinity, easing: 'ease-in-out' },
		);
	}, [blueprintLength]);

	return (
		<Svg width={size} height={size} xmlns='http://www.w3.org/2000/svg'>
			<Blueprint {...pathProps} ref={blueprintRef} stroke={color.blueprint} />
			<LoadingSlide
				{...pathProps}
				ref={loadingSlideRef}
				strokeDasharray={blueprintLength}
				stroke={color.loading}
			/>
		</Svg>
	);
};
