import ApiClient from "@services/api";
import config from "@root/config";
import { getError } from "@utils";

const { BASE_URL } = config;

/** @params
 * @param data - {query: string, uuid: string, token: string, variables: object},
 * @param token - BearerAuth token
 */
const runQuery = async (data) => {
	try {
		const Api = new ApiClient(BASE_URL);
		let { token = null, uuid = null, query, variables } = data;
		if (!query) throw new Error("invalid_request");

		// set the uuid and bearer token
		Api.setHeaders({
			"Content-Type": "application/json",
			"X-Fingerprint": uuid,
		});

		if (!!token) {
			Api.setAuth("bearer", token);
		}

		//encrypted query
		//query = Api.createHashResponse(query, 4);
		//if (!query) throw new Error("invalid_encryption");

		const [resolve, reject] = await Api.graphql(query, variables);
		if (!resolve) throw new Error("invalid_payload");

		if (reject) {
			console.error("Error fetching data ::", reject);
			return [null, "internal_server_error"];
		}

		const {
			data: { data: payload },
			status,
			success,
		} = resolve;

		console.log(
			"%c :: Fetch request is completed :: ",
			"background: green; color: white",
		);
		console.log({ payload, status, success });
		return [{ payload, status, success }, null];
	} catch (error) {
		console.error(error);
		const errorMessage = getError(error.message);
		return [null, errorMessage];
	}
};

export default runQuery;
