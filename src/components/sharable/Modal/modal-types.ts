export interface ContainerProps {
	zIndex: number;
}

export interface ContentProps {
	maxWidth: string;
}

export interface ModalProps
	extends Pick<ContainerProps, 'zIndex'>,
		Pick<ContentProps, 'maxWidth'> {
	children: JSX.Element;
	closeModal: () => void;
	isCloseOutsideClick: boolean;
	disableScroll: boolean;
}
