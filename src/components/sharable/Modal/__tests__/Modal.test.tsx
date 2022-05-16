import React from 'react';
import { renderer, AllTheProviders } from 'tests/utilities';
import { Modal } from 'components/sharable';

it('should render correctly', () => {
	const tree = renderer
		.create(
			<AllTheProviders>
				<Modal
					zIndex={9999}
					maxWidth={'1000px'}
					disableScroll={false}
					isCloseOutsideClick={true}
					// eslint-disable-next-line @typescript-eslint/no-empty-function
					closeModal={() => {}}
				>
					<div>Modal content</div>
				</Modal>
			</AllTheProviders>,
		)
		.toJSON();

	expect(tree).toMatchSnapshot();
});
