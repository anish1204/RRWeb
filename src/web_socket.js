import { WebSocketServer } from 'ws';
import fs from 'fs-extra';
import { dataFolderName,dataFolderName1 } from './constants.js'
import path from "path";

let itr = 1;


const startWebSocketServer = () => {
  const wss = new WebSocketServer({ port: 3008 });
  wss.on('connection', (ws) => {
    console.log('WebSocket connection established.');

    // Handle incoming messages
    ws.on('message', (message) => {
      
      console.log('HI');
      itr++;
      const payload = JSON.parse(message.toString());
     // console.log(payload);
      
      processPayload(payload);
    });
  });
};







function UpdateUrl(url,itr)
{
  let dataFilePath1 = path.join(dataFolderName1, id.toString());
  const newData = {id:itr,url:url};
  console.log('Working');

   const jsonData = JSON.stringify(newData);

  fs.appendFileSync(dataFilePath1, jsonData + '\n');

  
  //fs.writeFileSync(dataFilePath1, jsonData);
  
  //fs.writeJsonSync(dataFilePath1, url, { flag: 'a' });
}


let lastUrl = null;
let id = 1;
const processPayload = (payload) => {
  const { type, url, data } = payload;

  console.log("*".repeat(80));
  console.log( {type, url, payload} );
  console.log("*".repeat(80));
  console.log(url);

  if (type !== 'rrweb events') {
    return;
  }
  const jsonData = JSON.parse(data);
  //console.log(jsonData);

  let dataFilePath;
  
    UpdateUrl(url,itr);
  
 

  if (url === lastUrl) {
     // Simply append to the same file;  No change
    dataFilePath = path.join(dataFolderName, id.toString());
    fs.writeJsonSync(dataFilePath, jsonData, { flag: 'a' });


  } else {
    dataFilePath = path.join(dataFolderName, id.toString());
    fs.writeJsonSync(dataFilePath, jsonData); // This would empty the files if there's already content
  }

  lastUrl = url;
};


export {
  startWebSocketServer,
};
