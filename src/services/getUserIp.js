import ApiClient from "@services/api";
import config from "@root/config";

const { BASE_URL } = config;

const getUserIp = async () => {
	const Api = new ApiClient(BASE_URL);
	const { ip } = await Api.requestIp();
	return ip || null;
};

export default getUserIp;
