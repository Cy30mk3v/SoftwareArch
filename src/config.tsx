const CONFIG = {
  MASTER_PASSWORD: "MASTER_PASSWORD",
  USER_FULL_NAME: "USER_FULL_NAME",
  USER_FULL_AVATAR: "USER_FULL_AVATAR",
  LAST_ACTIVE: "LAST_ACTIVE",
  COME_BACK: "COME_BACK",
  MAX_LIST_MESSAGE: 200,
  ENDPOINT: 'https://nogi46vn.herokuapp.com',
  // ENDPOINT: 'https://young-lake-79728.herokuapp.com',
  // ENDPOINT: process.env.REACT_APP_SOCKET_ENDPOINT,
};

const SOCKET_TYPES = {
  MESSAGE: "m",
  LOGOUT: "l",
  TOTAL_USER: "t",
  LIST_MESSAGE: "lm",
  CHANGE_IFRAME_URL: "ciu",
  SYSTEM_MESSAGE: "sm",
  YOUR_IP: "i",
  JOIN: "j",
  LIST_USERS: "lu",
  NEW_USER_JOIN: "nuj",
  RELOAD: "r",
  CALENDAR: "c",
};

const CHANNEL_REGISTRY = {
  niyo0525: "https://player.twitch.tv/?channel=niyo0525&autoplay=true",
  k940046: "https://player.twitch.tv/?channel=940046&autoplay=true",
  yunaito4846: "https://player.twitch.tv/?channel=yunaito4846&autoplay=true",
  fcNogi: "https://player.twitch.tv/?channel=fcnogizaka46&autoplay=true",
  FBI: "https://player.twitch.tv/?channel=minhthanhle&autoplay=true",
};

export { CONFIG, SOCKET_TYPES, CHANNEL_REGISTRY };
