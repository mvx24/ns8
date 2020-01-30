function parseQueryString(str: string): {} {
  const re = /(\?|#|&)(.+?)=(.*?)(?=&|$)/g;
  const strSpaced: string = str.replace(/\+/g, ' ');
  const params: any = {};
  let match = null;
  while ((match = re.exec(strSpaced)) !== null) {
    params[decodeURIComponent(match[2])] = decodeURIComponent(match[3]);
  }
  return params;
}

export default parseQueryString;
