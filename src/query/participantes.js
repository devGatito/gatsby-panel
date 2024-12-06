import { gql } from "@utils";

// Mutaciones de Participantes
export const $createParticipant = gql`
	mutation CreateParticipant($input: ParticipantInput!) {
		createParticipant(input: $input) {
			id
			krm_id
			email
			phone
			segment
			folio_type
			created_at
			updated_at
		}
	}
`;

export const $registerUser = gql`
	mutation RegisterUser($input: RegisterInput!) {
		register(input: $input) {
			user {
				name
				phone
				email
				role
			}
			token
		}
	}
`;

export const $updateParticipant = gql`
	mutation UpdateParticipant($id: ID!, $input: UpdateParticipantInput!) {
		updateParticipant(id: $id, input: $input) {
			id
			krm_id
			email
			phone
			segment
			folio_type
			created_at
			updated_at
		}
	}
`;

export const $convertedClient = gql`
	mutation UpdateParticipant($id: ID!, $input: UpdateParticipantInput!) {
		updateParticipant(id: $id, input: $input) {
			id
			krm_id
			name
			converted_client
			status
			folio_type
			updated_at
		}
	}
`;

export const $deleteParticipant = gql`
	mutation DeleteParticipant($id: ID!) {
		deleteParticipant(id: $id)
	}
`;
