import HttpCrypt from "./crypt";

class ApiClient extends HttpCrypt {
	#encryption = false;
	#initialHeaders = {
		Accept: "*/*",
		"Content-Type": "application/json",
	};

	constructor(baseURL, headers = {}, options = {}) {
		super();
		this.baseURL = baseURL || "";
		this.headers = { ...this.#initialHeaders, ...headers };
		this.options = { ...options };
		this.middlewares = [];
	}

	get encryption_enabled() {
		return this.#encryption;
	}

	get options_enabled() {
		return this.options;
	}

	get headers_enabled() {
		return this.headers;
	}

	get middlewares_enabled() {
		return this.middlewares;
	}

	get base_url() {
		return this.baseURL;
	}

	get key() {
		return this._key;
	}

	get iv() {
		return this._iv;
	}

	// Agregar y ejecutar middlewares
	registerMiddleware(fn) {
		this.middlewares.push(fn);
		return this;
	}

	enableEncryption(key = null, iv = null) {
		if (key) this.setKey(key); // Sobrescribir la clave si se pasa una
		if (iv) this.setIV(iv); // Sobrescribir el IV si se pasa uno
		this.#encryption = true;
		return this;
	}

	async execMiddlewares() {
		for (const middleware of this.middlewares) {
			const result = await middleware();
			if (!result) return false;
		}
		return true;
	}

	// Setter para las opciones
	setOptions(newOptions) {
		this.options = { ...this.options, ...newOptions };
		return this;
	}

	// Setter para los headers
	setHeaders(newHeaders) {
		this.headers = { ...this.headers, ...newHeaders };
		return this;
	}

	// reset para los headers
	setDefaultHeaders() {
		this.headers = this.#initialHeaders;
		return this;
	}

	// Método genérico de autenticación
	setAuth(type, token) {
		const authType =
			type === "bearer" ? `Bearer ${token}` : `Basic ${btoa(token)}`;
		this.setHeaders({ Authorization: authType });
		return this;
	}

	// Checkear JWT con renovación automática de token
	async checkJWToken(token) {
		try {
			const response = await fetch(`${this.baseURL}/check-jwt`, {
				method: "GET",
				headers: { ...this.headers, Authorization: `Bearer ${token}` },
			});
			if (!response.ok || response.status === 401) {
				// Lógica para renovar token
				const newToken = await this.renewToken();
				if (newToken) {
					this.setBearerAuth(newToken);
					return [true, null];
				}
				return [false, "Session expired"];
			}
			return [true, null];
		} catch (error) {
			return [false, error.message];
		}
	}

	// Método para renovar el token (Ejemplo simple)
	async renewToken() {
		const response = await fetch(`${this.baseURL}/renew-token`, {
			method: "POST",
			headers: this.headers,
		});
		if (response.ok) {
			const data = await response.json();
			return data.token;
		}
		return null;
	}

	// Método de petición genérico que ejecuta middlewares y maneja errores
	async request(path, body = null, isFormData = false) {
		const proceed = await this.execMiddlewares();
		if (!proceed) {
			throw new Error("Request blocked by middleware");
		}

		const url = `${this.baseURL}${path}`;
		const headers = isFormData
			? { ...this.headers, "Content-Type": undefined } // Evita establecer 'Content-Type' para `FormData`
			: this.headers;

		const options = {
			headers,
			...this.options,
		};

		if (body && !isFormData) {
			options.body = JSON.stringify(body);
		} else if (body && isFormData) {
			options.body = body; // Enviar `FormData` directamente
		}

		try {
			const response = await fetch(url, options);
			const data = await response.json();

			if (!response.ok) {
				throw new Error(`${JSON.stringify({ response, data })}`);
			}

			// Desencriptar la respuesta si la encriptación está habilitada
			if (this.encryption_enabled && data.encrypted_response) {
				// const decryptedResponse = this.decrypt(data.payload);
				// return {
				// 	success: true,
				// 	data: JSON.parse(decryptedResponse),
				// 	status: response.status,
				// };
			}

			return [
				{
					data,
					success: true,
					status: response.status,
				},
				null,
			];
		} catch (error) {
			const payloadIsValid = this.validatePatyloadError(error.message);

			if (payloadIsValid) {
				const { response, data } = JSON.parse(error.message);
				console.error(":: Error Api Response :: " + { response, data });
				return [
					null,
					{
						data,
						response,
						success: false,
						status: response.status,
					},
				];
			}

			console.error(error);
			return [null, error];
		} finally {
			this.setDefaultHeaders();
		}
	}

	// Métodos específicos para cada tipo de solicitud HTTP
	async get(path) {
		return this.setOptions({ method: "GET" }).request(path);
	}

	async post(path, body, isFormData = false) {
		return this.setOptions({ method: "POST" }).request(
			path,
			body,
			isFormData,
		);
	}

	async put(path, body, isFormData = false) {
		return this.setOptions({ method: "PUT" }).request(
			path,
			body,
			isFormData,
		);
	}

	async delete(path) {
		return this.setOptions({ method: "DELETE" }).request(path);
	}

	// Método para peticiones GraphQL
	async graphql(query, variables = {}, method = "POST") {
		let options = {};
		let body = {
			query,
			variables,
		};

		// Encriptar la query si la encriptación está habilitada
		if (this.encryption_enabled) {
			const plainTextBody = JSON.stringify(body);
			const encryptedQuery = this.encrypt(plainTextBody);
			options = {
				...options,
				"X-Channel": this.iv,
				"X-Fingerprint": this.key,
			};
			body = { ...body, query: encryptedQuery };
		}

		return this.setOptions({ ...options, method }).request(
			"/graphql",
			body,
		);
	}

	// Obtener la IP del cliente
	async requestIp() {
		try {
			const response = await fetch("https://api.ipify.org?format=json");
			const res = await response.json();
			return res;
		} catch (error) {
			return { ip: "0.0.0.0" };
		}
	}

	validatePatyloadError(str) {
		try {
			JSON.parse(str);
			return true; // El string es un JSON válido
		} catch (e) {
			return false; // No es un JSON válido
		}
	}
}

/**
 *
 * @param {String} baseUrl - String de url base para las peticiones
 * @param {Object} headers - Objeto de headers para las solicitudes
 * @param {Object} options - Objeto de opciones adicionales como method, mode, etc.
 * @returns
 */
export const createClient = (baseUrl, headers = {}, options = {}) =>
	new ApiClient(baseUrl, headers, options);
export default ApiClient;

// // Uso de la clase:
// const apiClient = new ApiClient('https://api.example.com');

// // Establecer autenticación Bearer
// apiClient.setBearerAuth('mi-token');

// // Registrar middleware
// apiClient.registerMiddleware(async () => {
//     console.log('Middleware ejecutado');
//     return true;
// });

// // Ejemplo de solicitud GET
// apiClient.get('/users')
//     .then(response => {
//         if (response.success) {
//             console.log('Datos recibidos:', response.data);
//         } else {
//             console.error('Error en la solicitud:', response.error);
//         }
//     });

// // Ejemplo de solicitud POST con FormData
// const formData = new FormData();
// formData.append('file', fileInput.files[0]); // Ejemplo de archivo
// apiClient.post('/upload', formData, true)
//     .then(response => {
//         if (response.success) {
//             console.log('Archivo subido:', response.data);
//         } else {
//             console.error('Error en la subida:', response.error);
//         }
//     });

// // Ejemplo de solicitud PUT
// apiClient.put('/update/1', { name: 'Nuevo Nombre' })
//     .then(response => {
//         if (response.success) {
//             console.log('Datos actualizados:', response.data);
//         } else {
//             console.error('Error en la actualización:', response.error);
//         }
//     });

// // Ejemplo de solicitud DELETE
// apiClient.delete('/delete/1')
//     .then(response => {
//         if (response.success) {
//             console.log('Recurso eliminado');
//         } else {
//             console.error('Error al eliminar:', response.error);
//         }
//     });

// // Ejemplo de solicitud GraphQL
// const query = `
//   query GetUsers($limit: Int) {
//     users(limit: $limit) {
//       id
//       name
//     }
//   }
// `;

// apiClient.graphql(query, { limit: 10 })
//     .then(response => {
//         if (response.success) {
//             console.log('Datos GraphQL:', response.data);
//         } else {
//             console.error('Error en GraphQL:', response.error);
//         }
//     });
