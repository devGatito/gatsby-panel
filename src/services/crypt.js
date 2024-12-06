import CryptoJS from "crypto-js";

class HttpCrypt {
	constructor() {
		this._key = this.generateKey(); // Genera una clave de 32 bytes por defecto
		this._iv = this.generateIV(); // Genera un IV por defecto
	}

	// Método para generar una clave de 32 bytes (256 bits)
	generateKey() {
		// Puedes personalizar la generación de claves aquí, este ejemplo es simple.
		return CryptoJS.lib.WordArray.random(32).toString(CryptoJS.enc.Hex);
	}

	// Método para generar un Vector de Inicialización (IV)
	generateIV() {
		return CryptoJS.lib.WordArray.random(16).toString(CryptoJS.enc.Hex);
	}

	// Método para sobreescribir la clave por defecto
	setKey(key) {
		if (key.length !== 64) {
			// 32 bytes en hexadecimal son 64 caracteres
			throw new Error(
				"La clave debe tener 32 bytes (64 caracteres hexadecimales).",
			);
		}
		this._key = key;
	}

	// Método para sobreescribir el IV por defecto
	setIV(iv) {
		if (iv.length !== 32) {
			// 16 bytes en hexadecimal son 32 caracteres
			throw new Error(
				"El IV debe tener 16 bytes (32 caracteres hexadecimales).",
			);
		}
		this._iv = iv;
	}

	// Método para encriptar un mensaje
	encrypt(plainText) {
		const encrypted = CryptoJS.AES.encrypt(
			plainText,
			CryptoJS.enc.Hex.parse(this._key),
			{
				iv: CryptoJS.enc.Hex.parse(this._iv),
				mode: CryptoJS.mode.CBC,
				padding: CryptoJS.pad.Pkcs7,
			},
		);
		return encrypted.toString();
	}

	// Método para desencriptar un mensaje
	decrypt(encryptedText) {
		const decrypted = CryptoJS.AES.decrypt(
			encryptedText,
			CryptoJS.enc.Hex.parse(this._key),
			{
				iv: CryptoJS.enc.Hex.parse(this._iv),
				mode: CryptoJS.mode.CBC,
				padding: CryptoJS.pad.Pkcs7,
			},
		);
		return decrypted.toString(CryptoJS.enc.Utf8);
	}
}

export default HttpCrypt;
