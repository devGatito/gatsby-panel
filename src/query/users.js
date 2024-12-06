import { gql } from "@utils";

// Mutaciones de Usuarios
export const $updateUser = gql`
	mutation UpdateUser($id: ID!, $input: UpdateUserInput!) {
		updateUser(id: $id, input: $input) {
			id
			uuid
			name
			phone
			email
			role
			updated_at
		}
	}
`;

export const $deleteUser = gql`
	mutation DeleteUser($id: ID!) {
		deleteUser(id: $id)
	}
`;

export const $createUser = gql`
	mutation CreateUser($input: CreateUserInput!) {
		createUser(input: $input) {
			id
			name
			phone
			email
			role
			created_at
		}
	}
`;
