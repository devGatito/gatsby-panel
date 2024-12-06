export default function(code) {
	switch (code) {
		case 'invalid_email':
			return 'El correo electrónico no es valido.'
		case 'invalid_password':
			return 'La contraseña tiene caracteres no validos.'
		case 'invalid_login_payload':
			return 'Tus datos de acceso no son validos, porfavor revisa tu información e intenta de nuevo.'
		case 'invalid_payload':
			return 'La respuesta del servidor no es valida.'
		default:
			return false
	}
}
