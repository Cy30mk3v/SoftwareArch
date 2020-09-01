const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 4001;
const uuidV4 = require('uuid/v4');
const admin = require("firebase-admin");

let serviceAccount;
try {
  serviceAccount = require("./serviceAccountKey.json");
} catch (err) {
  serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY);
}

let firebaseDatabaseUrl = process.env.FIREBASE_DATABASE_URL;

if (!firebaseDatabaseUrl && process.env.NODE_ENV !== 'production') {
  firebaseDatabaseUrl = "https://nogi46vn.firebaseio.com";
}

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.FIREBASE_DATABASE_URL,
});

let messagesCollectionName = process.env.NODE_ENV === 'production' ? 'messages' : 'messages_dev'

let db = admin.firestore();
let messagesRef = db.collection(messagesCollectionName);

if (process.env.NODE_ENV === 'production') {
  app.enable('trust proxy');
}

const masterPassword = 'nogichan@123';

function isURL(str) {
  var pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|' + // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
    '(\\:\\d+)?(\\/[\\:-a-z\\d%_.~+]*)*' + // port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
    '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
  return pattern.test(str);
}

const SOCKET_TYPES = {
  MESSAGE: 'm',
  LOGOUT: 'l',
  TOTAL_USER: 't',
  LIST_MESSAGE: 'lm',
  CHANGE_IFRAME_URL: 'ciu',
  RELOAD: 'r',
  YOUR_IP: 'i',
  JOIN: 'j',
  LIST_USERS: 'lu',
  NEW_USER_JOIN: 'nuj',
}

let totalUser = 0;
let ipsConnected = {};
let usersConnected = {};
const messages = [];

function prepareTwitchUrl(url) {
  if (url && url.includes('player.twitch.tv') && !url.includes('&parent=')) {
    return `${url.trim()}&parent=nogi46vn.web.app`
  }

  return url;
}

function initSocket() {
  // let messagesRef = db.collection('messages').orderBy('')
  // let chanelUrl = 'https://player.twitch.tv/?channel=barneyinvisible&autoplay=true'
  // let chanelUrl = 'https://player.twitch.tv/?channel=940046&autoplay=false'
  let chanelUrl = 'https://player.twitch.tv/?channel=minhthanhle&autoplay=true'
  const LogError = (error) => { console.log('Error: ', error) }

  app.get('/', function (req, res) {
    if(req.query.url){

      return res.send(`<!DOCTYPE html>
<html>
<body style="margin:0px;padding:0px;overflow:hidden">
  <iframe src="${req.query.url.trim()}" frameborder="0" style="overflow:hidden;overflow-x:hidden;overflow-y:hidden;height:100%;width:100%;position:absolute;top:0px;left:0px;right:0px;bottom:0px" height="100%" width="100%"></iframe>
</body>
</html>
`);
    }
    return res.sendFile(__dirname + '/index.html');
  });

  io.on('connection', function (socket) {
    // console.log('New user join');
    // console.log(io.engine.clientsCount, '111');
    // console.log(io.sockets.sockets, '222');
    // console.log(Object.keys(io.sockets.connected).length, '333')

    const ipAddress = socket.handshake.headers['x-forwarded-for'] || socket.handshake.address;
    if (!ipsConnected[ipAddress]) {
      ipsConnected[ipAddress] = socket.id;
      totalUser++;
      io.emit(SOCKET_TYPES.TOTAL_USER, totalUser);
    }

    socket.emit(SOCKET_TYPES.YOUR_IP, ipAddress);
    io.emit(SOCKET_TYPES.CHANGE_IFRAME_URL, prepareTwitchUrl(chanelUrl));

    socket.on(SOCKET_TYPES.MESSAGE, function (msg) {
      try {
        // if (msg.text && msg.text.length < 1000 && usersConnected[ipAddress] && usersConnected[ipAddress].userFullName === msg.userFullName) {
        if (msg.text && msg.text.length < 1000) {
          if (!msg.userFullName || !msg.userFullName.trim()) { return }

          msg.id = uuidV4();
          msg.userId = ipsConnected[ipAddress] || socket.id;
          msg.timestamp = new Date().toISOString();
          msg.createdAt = admin.firestore.FieldValue.serverTimestamp()
          msg.ip = ipAddress;

          if (msg.quote && Object.keys(msg.quote).length === 0) {
            delete (msg.quote);
          }

          io.emit(SOCKET_TYPES.MESSAGE, msg);

          messages.push(msg);

          if (usersConnected[ipAddress] && usersConnected[ipAddress].userFullName === msg.userFullName) {
            messagesRef.add(msg);
          }

          if (messages.length > 1000) {
            messages.shift();
          }
        } else {
          LogError('Message length too long!');
        }

      } catch (error) {
        LogError(error);
      }
    });

    socket.on(SOCKET_TYPES.CHANGE_IFRAME_URL, function (msg) {
      try {
        if (msg.password === masterPassword) {
          const isUrlOk = isURL(msg.url);
          if (isUrlOk) {
            chanelUrl = msg.url;
            io.emit(SOCKET_TYPES.CHANGE_IFRAME_URL, prepareTwitchUrl(chanelUrl));
          }
        }
      } catch (error) {
        LogError(error);
      }
    });

    socket.on(SOCKET_TYPES.RELOAD, function (msg) {
      try {
        if (msg.password === masterPassword) {
          io.emit(SOCKET_TYPES.RELOAD, prepareTwitchUrl(chanelUrl));
        }
      } catch (error) {
        LogError(error);
      }
    });

    socket.on(SOCKET_TYPES.JOIN, function (msg) {
      try {
        const newUser = { ...msg, timestamp: Date.now(), ip: ipAddress };
        if (newUser.userFullName || newUser.userFullName.trim()) {
          usersConnected[ipAddress] = newUser;
          io.emit(SOCKET_TYPES.NEW_USER_JOIN, newUser);
        }
      } catch (error) {
        LogError(error);
      }
    });

    socket.on(SOCKET_TYPES.LIST_USERS, function () {
      try {
        const users = Object.keys(usersConnected).map(key => usersConnected[key]);
        socket.emit(SOCKET_TYPES.LIST_USERS, users);
      } catch (error) {
        LogError(error);
      }
    });

    socket.on(SOCKET_TYPES.TOTAL_USER, function () {
      try {
        io.emit(SOCKET_TYPES.TOTAL_USER, totalUser);
      } catch (error) {
        LogError(error);
      }
    });

    socket.on(SOCKET_TYPES.YOUR_IP, function () {
      try {
        socket.emit(SOCKET_TYPES.YOUR_IP, ipAddress);
      } catch (error) {
        LogError(error);
      }
    });

    socket.on(SOCKET_TYPES.LIST_MESSAGE, function () {
      socket.emit(SOCKET_TYPES.LIST_MESSAGE, messages.slice(-100));
    });

    socket.on('disconnect', function () {
      if (ipsConnected[ipAddress]) {
        try {
          const listUsersWithSampleNetwork = Object
            .keys(io.sockets.sockets)
            .map(key => io.sockets.sockets[key].handshake.headers['x-forwarded-for'] || socket.handshake.address)
            .filter(ip => ip === ipAddress);

          if (listUsersWithSampleNetwork.length === 0) {
            delete (ipsConnected[ipAddress]);
            delete (usersConnected[ipAddress])
            totalUser--;
          }

          const listUsers = Object
            .keys(io.sockets.sockets)
            .map(key => io.sockets.sockets[key].handshake.headers['x-forwarded-for'] || socket.handshake.address)
            .filter((v, i, a) => a.indexOf(v) === i);
          io.emit(SOCKET_TYPES.TOTAL_USER, listUsers.length);
        } catch (error) {
          // io.emit(SOCKET_TYPES.TOTAL_USER, totalUser2);
        }
      }
    });
  });

  http.listen(port, function () {
    console.log('SocketIo *:' + port);
  });
}

messagesRef.orderBy('createdAt', 'desc')
  .limit(120)
  .get()
  .then((snapshot) => {
    snapshot.forEach((doc) => {
      messages.unshift(doc.data());
    });

    console.log('init socket');
    initSocket();
  })
  .catch((err) => {
    console.log('init socket without old message');
    initSocket();
    console.log('Error getting old message', err);
  });
