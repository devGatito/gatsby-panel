import React from 'react'
import { Flex } from '@components';

const Center = ({children, ...props}) => (
	<Flex items="center" justify="center" {...props}>
		{children}
	</Flex>
)

export default Center
