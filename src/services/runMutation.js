// src/services/runMutation.js
import Api from "@services/api";
import config from "@root/config";

const { BASE_URL } = config;

/** @params
 * data: Object with query and possibly variables
 * token: BearerAuth token
 */
const runMutation = async (data, token) => {
    // Verificar si el token o la query son válidos
    if (  !data || !data.query) {
        console.error("Los parámetros de la solicitud son inválidos");
        console.log(data);
        console.log(data.query);
        
          
        return [null, { message: "Los parámetros de la solicitud son inválidos" }];
    }

    // Configurar autenticación y encabezados
    if(token){
        Api.setBearerAuth(token);

        console.log(token);


    }
    Api.setHeaders({ "Content-Type": "application/json" });

    // Crear el hash de la query
    const hashedQuery = Api.createHashResponse(data.query);
    if (!hashedQuery) {
        console.error("Solicitud encriptada inválida");
        return [null, { message: "Solicitud encriptada inválida" }];
    }
    data.query = hashedQuery; // Asigna el hash de vuelta a la data

    // Agregar log para ver los datos enviados
    console.log("Datos enviados a la API:", { ...data });

    try {
        // Realizar la solicitud POST a la API
        const [resolve, reject] = await Api.post(BASE_URL, { ...data });

        // Manejar respuestas con errores
        if (reject) {
            console.error("Error en la respuesta de la API:", reject);
            return [null, reject];
        }

        // Verificar si hay errores en la respuesta
        if (resolve.errors) {
            console.error("Errores de la API:", resolve.errors);
            return [null, { ...resolve.errors }];
        }

        // Mensaje de éxito si la conexión fue exitosa
        console.log("Conexión exitosa con la API:", resolve.data);
        return [resolve.data, null];
    } catch (error) {
        // Manejo de errores durante la conexión
        console.error("Error en la conexión con la API:", error);
        return [null, { message: "Error al conectar con la API. Intenta de nuevo más tarde." }];
    }
};

export default runMutation; // Asegúrate de que esta línea esté presente
