const { URL } = require('url');

const urlString1 = 'postgres://postgres:Hari@2006@localhost:5432/tutorplatform';
try {
  const parsed1 = new URL(urlString1);
  console.log("URL 1:", parsed1.host);
} catch (e) {
  console.error("URL 1 Error:", e.message);
}

const urlString2 = 'postgres://postgres:Hari%402006@localhost:5432/tutorplatform';
try {
  const parsed2 = new URL(urlString2);
  console.log("URL 2:", parsed2.host);
} catch (e) {
  console.error("URL 2 Error:", e.message);
}
