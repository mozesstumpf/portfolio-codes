import React, { useState, useEffect, useRef } from 'react';
import styled, { css, useTheme } from 'styled-components';

import {
	BackgroundCircleProps,
	PercentageCircleProps,
	PercentageProps,
} from './percentage-circle-types';
import { counterAnimation } from './percentage-circle-helper';

const Container = styled.div`
	position: relative;

	display: inline-flex;
`;

const BackgroundCircle = styled.div<BackgroundCircleProps>`
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);

	${({ area }) => css`
		height: ${area.value + area.unit};
		width: ${area.value + area.unit};
	`}

	border-radius: 50%;

	background-color: ${({ backgroundColor }) => backgroundColor};
`;

const Percentage = styled.div<PercentageProps>`
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);

	color: ${({ theme, isNegative }) =>
		isNegative ? theme.color.red[2] : theme.color.main[1]};
	font-size: 22px;
	font-weight: bold;

	user-select: none;
`;

const PercentageValue = styled.span``;

const Svg = styled.svg``;

const NeutralPath = styled.path`
	fill: none;
`;

const LoadingPath = styled.path`
	fill: none;
	transition: stroke-dashoffset 5s;

	filter: drop-shadow(0 0 3px ${({ theme }) => theme.color.black[2]});
`;

const Defs = styled.defs``;

const RadialGradient = styled.radialGradient``;

const Stop = styled.stop``;

export const PercentageCircle = ({
	area,
	percentage,
	backgroundColor,
}: PercentageCircleProps) => {
	const [loadingPathLength, setLoadingPathLength] = useState({
		total: 0,
		percentage: 0,
	});
	const { color } = useTheme();

	const loadingPathRef = useRef<SVGPathElement>(null);
	const percentageValueRef = useRef<HTMLSpanElement>(null);

	useEffect(() => {
		if (!loadingPathRef.current || !percentageValueRef.current) {
			console.error({ loadingPathRef, percentageValueRef });
			return;
		}

		const loadingPath = loadingPathRef.current;
		const percentageValue = percentageValueRef.current;

		const pathPercentageLength =
			loadingPath.getTotalLength() * ((100 - percentage) / 100);

		setLoadingPathLength({
			total: loadingPath.getTotalLength(),
			percentage: pathPercentageLength,
		});

		const duration = 1500;

		loadingPath.animate(
			[
				{ strokeDashoffset: loadingPath.getTotalLength() },
				{
					strokeDashoffset: pathPercentageLength,
				},
			],
			{ duration, easing: 'ease-in-out' },
		);

		counterAnimation(percentageValue, percentage, duration);
	}, [percentage]);

	const strokeWidth = 14;
	const spaces = 10;
	const halfSpaces = spaces / 2;
	const narrowedSize = area - spaces;

	const circlePath = `
	M ${narrowedSize / 2 + halfSpaces} ${strokeWidth / 2 + halfSpaces} 
	A 1 1, 0, 0 1, ${narrowedSize / 2 + halfSpaces} ${
		narrowedSize - strokeWidth / 2 + halfSpaces
	} 
	A 1 1, 0, 0 1, ${narrowedSize / 2 + halfSpaces} ${
		strokeWidth / 2 + halfSpaces
	} `;

	return (
		<Container>
			<BackgroundCircle
				area={{
					value: narrowedSize - strokeWidth * 2,
					unit: 'px',
				}}
				backgroundColor={backgroundColor}
			>
				<Percentage isNegative={percentage < 0}>
					<PercentageValue ref={percentageValueRef}>0</PercentageValue>%
				</Percentage>
			</BackgroundCircle>
			<Svg height={area} width={area} xmlns='http://www.w3.org/2000/svg'>
				<Defs>
					<RadialGradient id={'light-green'}>
						<Stop offset={'80%'} style={{ stopColor: color.green[0] }}></Stop>
						<Stop offset={'100%'} style={{ stopColor: color.green[1] }}></Stop>
					</RadialGradient>
					<RadialGradient id={'light-red'}>
						<Stop offset={'80%'} style={{ stopColor: color.red[1] }}></Stop>
						<Stop offset={'100%'} style={{ stopColor: color.red[2] }}></Stop>
					</RadialGradient>
				</Defs>
				<NeutralPath
					d={circlePath}
					strokeWidth={strokeWidth}
					stroke={color.gray[5]}
				/>
				<LoadingPath
					strokeDashoffset={loadingPathLength.percentage}
					strokeDasharray={loadingPathLength.total}
					ref={loadingPathRef}
					d={circlePath}
					strokeWidth={strokeWidth}
					stroke={`url(#light-${percentage < 0 ? 'red' : 'green'})`}
				/>
			</Svg>
		</Container>
	);
};
