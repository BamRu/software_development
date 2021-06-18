// docs - https://api.timepad.ru/doc/interactive/

const https = require('https');
const http = require('http');

let city = 'Томск';
let after_date = new Date(2020, 5, 10);
let before_date = new Date();
let fields = ['name', 'description_short', 'location', 'starts_at', 'ends_at'];

const options = {
  protocol: 'https:',
  hostname: 'api.timepad.ru',
  path: encodeURI(`/v1/events?fields=${fields}
						&cities=${city}
						&starts_at_min=${after_date.toISOString()}
						&starts_at_max=${before_date.toISOString()}`),
  method: 'GET',
  headers:{
    Authorization: 'Bearer a21094c0643acedfd99e67558b24f172301ac15c',
    Accept: 'application/json'
  },
}

const hostname = '127.0.0.1';
const port = 8000;

const server = http.createServer((req, res) => {
  console.log("request got!")

  let sentRes = data => {
    res.statusCode = 200;
    res.end(data);
  }

  let request = https.get(options, (res) => {
    let data = '';

    res.on('data', (chunk) => {
      data += chunk;
    });

    res.on('close', () => {
      sentRes(generateResponse(JSON.parse(data)));
    });    
  });
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

function generateResponse(json_data){
  let html_text = `<!DOCTYPE html>
  <html lang="en-US">
  
  <head>
     <meta charset="UTF-8">
     <title>Task 2</title>
  </head>
  <body>
  <h1>10 ближайших событий в Городе томск полученных при помощи Timepad API.</h1>`;
	
  for(let i = Number(json_data.total)> 10 ? 9 : Number(json_data.total); i >= 0; i--){
    html_text += `<div> <h2>${json_data.values[i].name}</h2>
    <p>${json_data.values[i].description_short}</p>
    <p>Адрес: ${json_data.values[i].location.city}, ${json_data.values[i].location.address}</p>
    <p><i>Дата начала: ${json_data.values[i].starts_at} </br> Дата окончания: ${json_data.values[i].ends_at}</i></p></div>`;
  }

  html_text += `</body>
  </html>`;
  return html_text;
}