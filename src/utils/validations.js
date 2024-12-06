const regex = {
	mail: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
	curp: /^([A-Z][AEIOUX][A-Z]{2}\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])[HM](?:AS|B[CS]|C[CLMSH]|D[FG]|G[TR]|HG|JC|M[CNS]|N[ETL]|OC|PL|Q[TR]|S[PLR]|T[CSL]|VZ|YN|ZS)[B-DF-HJ-NP-TV-Z]{3}[A-Z\d])(\d)$/,
	rfc: /^([A-ZÑ\x26]{3,4}([0-9]{2})(0[1-9]|1[0-2])(0[1-9]|1[0-9]|2[0-9]|3[0-1]))([A-Z\d]{3})?$/,
	date: /^\d{4}([\-/.])(0?[1-9]|1[1-2])\1(3[01]|[12][0-9]|0?[1-9])$/
}

const validations = {
	mail: (data) => {
		let isValid = true;
		let message = ''

		if(!regex.mail.test(data)) {
			message = "Email no valido"
			isValid = false
		}

		return {message, isValid};
	},
	curp: (data) => {
		let isValid = true;
		let message = ''

		if(data) {
			if(!regex.curp.test(data)) {
				message = "CURP no valida"
				isValid = false
			}
		}


		return {message, isValid};
	},
	rfc: (data) => {
		let message = ''
		let isValid = true;

		if(data) {
			if(!regex.rfc.test(data)) {
				message = "RFC no valida"
				isValid = false
			}
		}

		return {message, isValid};
	},
	clabe: (data) => {
		return data.length === 18
	}
}

export default validations
