const REGEX = {
  curpRgx: /^([A-Z][AEIOUX][A-Z]{2}\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])[HM](?:AS|B[CS]|C[CLMSH]|D[FG]|G[TR]|HG|JC|M[CNS]|N[ETL]|OC|PL|Q[TR]|S[PLR]|T[CSL]|VZ|YN|ZS)[B-DF-HJ-NP-TV-Z]{3}[A-Z\d])(\d)$/,
  emailRgx: /^[a-zA-Z0-9_\-.]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/,
  specialChars: /[°"'#=?¡`<>|\\´{}¿.,\-¨[];:_`^~¬]/g,
  onlyLetterNumbers: /^[a-zA-Z0-9]_-#\|/g,
  onlyNumbers: /^[0-9]_-#\|/g,
  onlySlug: /[°"'!$%&/)(?¡][+*¿#=?¡`<>|´{}¿.,¨[];:_`^~¬]/g,
}

export default REGEX
