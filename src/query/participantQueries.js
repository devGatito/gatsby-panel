import { gql } from "@utils";

// Consultas de Participantes
export const $getParticipant = gql`
	query GetParticipant($id: ID!) {
		getParticipant(id: $id) {
			id
			krm_id
			name
			email
			uuid
			register_type
			phone
			status
			development {
				id
				development
				segment
				number_codes
				state
				city
				country
			}
			segment
			folio_type
			created_at
			updated_at
		}
	}
`;

export const $getParticipants = gql`
	query GetParticipants {
		getParticipants {
			id
			krm_id
			name
			uuid
			email
			register_type
			phone
			status
			codes {
				id
				participant_id
				type
				code
				predict
				register_date
				updated_at
			}
			development {
				id
				development
				segment
				number_codes
				state
				city
				country
			}
			segment
			folio_type
			created_at
			updated_at
		}
	}
`;
export const $resendCodes = gql`
	mutation ResendCodes($input: ResendCodesInput!) {
		resendCodes(input: $input)
	}
`;

export const $getPredictions = gql`
	query GetAllCodes {
		getAllCodes {
			code
			predict
			created_at
			register_date
			type
			updated_at
			participant {
				id
				krm_id
				name
				email
				phone
				register_type
				folio_type
				registered {
					id
					name
					email
				}
				development {
					development
					segment
				}
			}
		}
	}
`;

export const $getParticipantByKRM = gql`
	query GetParticipantKRM($id: String!) {
		getParticipantKRM(id: $id) {
			id
			krm_id
			name
			register_type
			converted_client
			email
			phone
			status
			codes {
				code
				type
				predict
			}
			development {
				id
				development
				segment
			}
			folio_type
		}
	}
`;
