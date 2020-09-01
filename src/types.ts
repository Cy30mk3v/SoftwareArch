export interface IAppState {
  isLoggedIn: boolean;
  userFullName: string;
  userAvatar: string;
  messages: any[];
  isMobile: boolean;
  totalUser: number;
  currentUserId: string;
  showSwitchChannelForm: boolean;
  channelUrl: string;
  iframeHeight: string;
  isShowListUsers: boolean;
  isShowCalendar: boolean;
  yourIp: string;
  listUsers: any[];
  calendars: any[];
  hasNewMessage: number;
  quote: IQuote;
}

export interface IQuote {
  text: string;
  userFullName: string;
  userAvatar: string;
  timestamp?: number;
  userId: string,
  ip?: string,
}

export interface IMessage {
  id?: string;
  userId?: string;
  text: string;
  userFullName: string;
  timestamp?: number;
  userAvatar: string;
  userAgent?: string;
  quote?: IQuote;
  ip?: string,
}
