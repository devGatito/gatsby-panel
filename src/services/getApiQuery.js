import Api from "@services/api";
import config from "@root/config";

const { BASE_URL } = config;

/** @params
 * data {} Object
 * data.query: String
 * data.variables: JSON Object
 */
const getApiQuery = async (data = { query: null, variables: null }) => {
	Api.setHeaders({ "Content-Type": "application/json" });
	const query = Api.createHashResponse(data?.query);
	if (!query) {
		return [null, { message: "invalid encripted request" }];
	}

	const [resolve, reject] = await Api.post(BASE_URL, { ...data, query });

	if (reject) {
		return [null, reject];
	}

	if (resolve?.errors) {
		return [null, { ...resolve.errors }];
	}

	return [resolve.data, null];
};

export default getApiQuery;
