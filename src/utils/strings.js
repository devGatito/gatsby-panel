const sanitize = str => {
	return str.replace(/  /, ' ').trimStart().trimEnd();
}

const normalize = str => str.normalize('NFD').replace(/[\u0300-\u036f]/g,"")
export { sanitize, normalize }
