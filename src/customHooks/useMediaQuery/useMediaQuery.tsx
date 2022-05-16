import { useState, useEffect } from 'react';
import { useTheme } from 'styled-components';

export const useMediaQuery = () => {
	const [views, setViews] = useState({
		isMobileView: true,
		isTabletView: false,
		isDesktopView: false,
		isLargeDesktopView: false,
	});

	const { breakpoints } = useTheme();

	useEffect(() => {
		const mobileViewQuery = matchMedia(`(min-width: ${breakpoints.xs}`);
		const tabletViewQuery = matchMedia(`(min-width: ${breakpoints.sm}`);
		const desktopViewQuery = matchMedia(`(min-width: ${breakpoints.md}`);
		const largeDesktopViewQuery = matchMedia(`(min-width: ${breakpoints.lg}`);

		const createQueryId = (
			viewQuery: MediaQueryList,
			viewName: keyof typeof views,
		) => ({ viewQuery, viewName });

		setViews({
			isMobileView: mobileViewQuery.matches,
			isTabletView: tabletViewQuery.matches,
			isDesktopView: desktopViewQuery.matches,
			isLargeDesktopView: largeDesktopViewQuery.matches,
		});

		const viewQueries = [
			createQueryId(mobileViewQuery, 'isMobileView'),
			createQueryId(tabletViewQuery, 'isTabletView'),
			createQueryId(desktopViewQuery, 'isDesktopView'),
			createQueryId(largeDesktopViewQuery, 'isLargeDesktopView'),
		];

		const changeCurrentView = (
			viewName: keyof typeof views,
			event: MediaQueryListEvent,
		) => {
			setViews((prevViews) => ({
				...prevViews,
				[viewName]: event.matches,
			}));
		};

		viewQueries.forEach(({ viewQuery, viewName }) => {
			viewQuery.addEventListener(
				'change',
				changeCurrentView.bind(null, viewName),
			);
		});

		return () => {
			viewQueries.forEach(({ viewQuery, viewName }) => {
				viewQuery.removeEventListener(
					'change',
					changeCurrentView.bind(null, viewName),
				);
			});
		};
	}, [breakpoints]);

	return views;
};
