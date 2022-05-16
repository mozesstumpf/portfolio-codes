export interface PercentageCircleProps {
	area: number;
	percentage: number;
	backgroundColor: string;
}

export interface PercentageProps {
	isNegative: boolean;
}

export interface BackgroundCircleProps
	extends Pick<PercentageCircleProps, 'backgroundColor'> {
	area: { value: number; unit: string };
}
