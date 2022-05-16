import { CSSObject } from 'styled-components';

export interface SmoothMenuProps {
	children: JSX.Element | JSX.Element[];
	isOpen: boolean;
	cssProps?: CSSObject;
}

export interface ContainerAttrs {
	offsetHeight: number;
}

export interface ContainerProps extends ContainerAttrs {
	cssProps?: CSSObject;
}
