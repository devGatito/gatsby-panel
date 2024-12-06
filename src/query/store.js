import { gql } from "@utils";

export const $loginAnonymous = gql`
	mutation LoginAnonymous {
		generateAnonymousToken {
			token
			uuid
		}
	}
`;
export const $validateCode = gql`
	mutation ValidateCode($code: String!) {
		validateCode(code: $code)
	}
`;
export const $getCode = gql`
	query GetCode($code: String!) {
		getCode(code: $code) {
			code
			type
			participant {
				name
				phone
				email
			}
		}
	}
`;

export const $loginUser = gql`
	mutation LoginUser($credentials: LoginInput!) {
		login(credentials: $credentials) {
			token
			user {
				id
				name
				email
				role
			}
		}
	}
`;

export const $refreshUser = (token) => gql`
	mutation {
		refreshToken(token: "${token}") {
			token
			user {
				id
				name
				email
				role
			}
		}
	}
`;

export const $checkToken = (token) => gql`
	mutation {
		checkTokenStatus(token: "${token}")
	}
`;

export const $sendPrediction = gql`
	mutation SendPrediction(
		$code: String!
		$predict: Int!
		$register_date: String!
	) {
		sendPrediction(
			code: $code
			predict: $predict
			register_date: $register_date
		)
	}
`;

export const $getDevelopments = gql`
	query GetDevelopments {
		getDevelopments {
			id
			development
			segment
		}
	}
`;

export const $logout = gql`
	mutation {
		logout
	}
`;
