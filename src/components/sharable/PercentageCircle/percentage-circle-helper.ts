export const counterAnimation = (
	element: HTMLElement,
	finalPercentage: number,
	duration: number,
) => {
	const isPositive = finalPercentage > 0;
	let startTimeStamp: number | undefined = undefined;

	const step = (timestamp: number) => {
		startTimeStamp ??= timestamp;

		const elapsed = timestamp - startTimeStamp;
		//Calculate the percentage according to duration
		const percentageRate = elapsed / duration;
		//Calculate the percentage according to the given finalPercentage
		const finalPercentageRate = percentageRate * Math.abs(finalPercentage);
		const percentage =
			Math[isPositive ? 'min' : 'max'](
				finalPercentage,
				isPositive ? finalPercentageRate : -finalPercentageRate,
			) | 0;

		element.textContent = `${percentage}`;

		(isPositive
			? percentage < finalPercentage
			: percentage > finalPercentage) && requestAnimationFrame(step);
	};

	requestAnimationFrame(step);
};
