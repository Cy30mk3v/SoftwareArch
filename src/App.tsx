import React from "react";
import {
  Button,
  Row,
  Col,
  PageHeader,
  Divider,
  notification,
  Avatar,
} from "antd";
import "./App.less";

import LoginForm from "./components/LoginForm/LoginForm";
import {
  getUserFullName,
  getUserAvatar,
  removeUserAvatar,
  setUserAvatar,
  getRandomHiMessage,
  setUserFullName,
  checkIsMobile,
  checkShowHelloComeback,
  getRandomIdol,
  getMasterPassword,
  isBottomOfMessageList,
  scrollToBottomMessage,
  getIframeHeight,
  replaceEmoticons,
  getMembersBirthTodayBirthday,
} from "./functions";
import { CONFIG, SOCKET_TYPES } from "./config";
import io from "socket.io-client";
import ChatForm from "./components/ChatForm/ChatForm";
import ListMessage from "./components/ListMessage/ListMessage";
import SwitchChannelForm from "./components/SwitchChannelForm/SwitchChannelForm";
import { uniqBy, get } from "lodash";
import { v4 as uuidV4 } from "uuid";
import striptags from "striptags";
import ListUsers from "./components/ListUsers/ListUsers";
import { LogoutOutlined, MessageOutlined } from "@ant-design/icons";
import { IAppState, IQuote, IMessage } from "./types";

class App extends React.Component {
  timeOut: any;
  intervalTitle: any;
  intervalBottomMessage: any;
  socket: any = null;
  state: IAppState = {
    isLoggedIn: false,
    userFullName: "",
    userAvatar: "",
    messages: [],
    isMobile: false,
    totalUser: 0,
    currentUserId: "",
    showSwitchChannelForm: false,
    channelUrl: "",
    iframeHeight: "100%",
    yourIp: "",
    listUsers: [],
    isShowListUsers: false,
    isShowCalendar: false,
    hasNewMessage: 0,
    calendars: [],
    quote: {
      text: '',
      userAvatar: '',
      userFullName: '',
      userId: '',
    },
  };

  constructor(props: any) {
    super(props);
    this.onLoginSuccess = this.onLoginSuccess.bind(this);
    this.onLogout = this.onLogout.bind(this);
    this.initSocket = this.initSocket.bind(this);
    this.onSendMessage = this.onSendMessage.bind(this);
    this.onChangeIframeUrl = this.onChangeIframeUrl.bind(this);
    this.onCancelChangeIframeUrl = this.onCancelChangeIframeUrl.bind(this);
    this.onScrollMessages = this.onScrollMessages.bind(this);
    this.setQuote = this.setQuote.bind(this);
    this.onRemoveQuote = this.onRemoveQuote.bind(this);
    this.showNewMessageNotify = this.showNewMessageNotify.bind(this);
  }

  componentWillUnmount() {
    this.socket = null;
    clearInterval(this.intervalBottomMessage);
  }

  uniqueMessages(messages: any[]) {
    return uniqBy(messages, function (e) {
      return e.id;
    });
  }

  initSocket() {
    function flashTitle(pageTitle: string, newMessageTitle: string) {
      if (document.title === pageTitle) {
        document.title = newMessageTitle;
      } else {
        document.title = pageTitle;
      }
    }
    // const isMobile = checkIsMobile();
    this.socket = io(CONFIG.ENDPOINT as string);
    this.socket.on("connect", () => {
      const currentUserId = this.socket.id;
      this.setState({
        currentUserId,
      });
      this.socket.emit(
        SOCKET_TYPES.LIST_MESSAGE,
        JSON.stringify({ timestamp: Date.now() })
      );
      this.socket.emit(SOCKET_TYPES.TOTAL_USER);
    });

    this.socket.on(SOCKET_TYPES.MESSAGE, (m: any) => {
      try {
        let { messages } = this.state;
        // if (isMobile) {
        //   messages.unshift(m);
        // } else {
        //   messages.push(m);
        // }
        const pageTitle = "Nogizaka46VN";
        const { currentUserId, yourIp } = this.state;
        if (yourIp !== get(m, "ip") && currentUserId !== get(m, "userId")) {
          const title = get(m, "text", "");
          if (title) {
            clearTimeout(this.timeOut);
            clearInterval(this.intervalTitle);
            const userFullName = get(m, "userFullName", "");
            const fullTitle = striptags(`${userFullName} chát: ${title}`);
            document.title = fullTitle;
            this.intervalTitle = setInterval(() => {
              flashTitle(pageTitle, fullTitle);
            }, 800);
            this.timeOut = setTimeout(() => {
              clearInterval(this.intervalTitle);
              document.title = "Nogizaka46VN";
            }, 8000);
          }
        }

        messages.push(m);
        messages = this.uniqueMessages(messages);
        if (messages.length > CONFIG.MAX_LIST_MESSAGE) {
          messages = messages.slice(-CONFIG.MAX_LIST_MESSAGE);
        }

        if (
          isBottomOfMessageList() ||
          yourIp === get(m, "ip") ||
          currentUserId === get(m, "userId")
        ) {
          setTimeout(() => {
            scrollToBottomMessage(200, true);
          }, 200);
        } else {
          this.setState({
            hasNewMessage: this.state.hasNewMessage + 1,
          });

          this.showNewMessageNotify(m);
        }

        this.setState({
          messages,
        });
      } catch (error) {
        console.log("Error: SOCKET_TYPES.MESSAGE", error, m);
      }
    });

    this.socket.on("reconnect", (attemptNumber: any) => {
      const userFullName = getUserFullName();
      const userAvatar = getUserAvatar();
      if (!userAvatar || !userFullName) {
        // ..
      } else {
        this.socket?.emit(SOCKET_TYPES.JOIN, {
          userFullName,
          userAvatar,
          isMobile: checkIsMobile(),
        });
      }
    });

    this.socket.on(SOCKET_TYPES.CHANGE_IFRAME_URL, (m: any) => {
      try {
        this.setState({
          channelUrl: m,
          showSwitchChannelForm: false,
        });
      } catch (error) {
        console.log("Error: SOCKET_TYPES.CHANGE_IFRAME_URL", error, m);
      }
    });

    this.socket.on(SOCKET_TYPES.RELOAD, (m: any) => {
      try {
        window.location.reload();
      } catch (error) {
        console.log("Error: SOCKET_TYPES.RELOAD", error, m);
      }
    });

    this.socket.on(SOCKET_TYPES.LIST_USERS, (listUsers: any) => {
      try {
        listUsers.sort((a: any, b: any) => b.timestamp - a.timestamp);
        this.setState({
          // listUsers:[...listUsers,...listUsers,...listUsers,...listUsers,...listUsers,...listUsers,...listUsers,...listUsers,...listUsers,...listUsers,],
          listUsers,
          isShowListUsers: true,
        });
        // const repairListUser = listUsers.map(user => ({
        //   ...user,
        //   date: new Date(user.timestamp).toISOString(),
        // }))
        // console.log(SOCKET_TYPES.LIST_USERS, JSON.stringify(repairListUser, null, 2));
      } catch (error) {
        console.log("Error: SOCKET_TYPES.LIST_USERS", error, listUsers);
      }
    });
    this.socket.on(SOCKET_TYPES.NEW_USER_JOIN, (newUser: any) => {
      const { messages, yourIp } = this.state;

      try {
        if (getMasterPassword() && localStorage.getItem("lu")) {
          const text = `<b>${newUser.userFullName}</b> đã tham nhóm!`;

          if (yourIp !== newUser.ip) {
            messages.push({
              id: uuidV4(),
              userId: "system",
              userFullName: "Hệ thống",
              isSystem: 1,
              userAvatar: "/logo.png",
              text,
              timestamp: new Date().toISOString(),
            });
            if (isBottomOfMessageList()) {
              setTimeout(() => {
                scrollToBottomMessage(200);
              }, 200);
            }
            this.setState(
              {
                messages,
              },
              () => { }
            );
          }
        }
      } catch (error) {
        console.log("Error: SOCKET_TYPES.NEW_USER_JOIN", error, newUser);
      }
    });

    this.socket.on(SOCKET_TYPES.TOTAL_USER, (totalUser: any) => {
      this.setState({
        totalUser: parseInt(totalUser, 10),
      });
    });

    this.socket.on(SOCKET_TYPES.YOUR_IP, (yourIp: any) => {
      this.setState({
        yourIp,
      });
    });

    this.socket.on(SOCKET_TYPES.CALENDAR, (calendars: any) => {
      this.setState({
        calendars,
      });
    });

    this.socket.on(SOCKET_TYPES.LIST_MESSAGE, (m: any[]) => {
      try {
        let { messages } = this.state;
        m.forEach((i: any) => messages.push(i));
        if (checkShowHelloComeback() || 1) {
          // Hard code for release Android
          messages = this.addHiMessage(messages);
          try {
            setTimeout(() => {
              let utterance = new SpeechSynthesisUtterance(`おかえり`);
              utterance.lang = "ja-JP";
              speechSynthesis.speak(utterance);
            }, 2000);
          } catch (error) {
            console.log("SpeechSynthesisUtterance", error);
          }
        }

        messages = this.uniqueMessages(messages);
        this.setState(
          {
            messages,
          }, () => {
            this.intervalBottomMessage = setInterval(() => {
              if (isBottomOfMessageList()) {
                scrollToBottomMessage(200, true);
              }
            }, 2000);
            scrollToBottomMessage(200, true);
            setTimeout(() => scrollToBottomMessage(200, true), 2000);
          },
        );
      } catch (error) {
        console.log("Error: SOCKET_TYPES.LIST_MESSAGE", error, m);
      }
    });
  }

  showNewMessageNotify(m: any) {
    let prefix = 'vừa nhắn';
    let replyTo = <span></span>;
    if (m.quote && m.quote.text) {
      prefix = 'đã trả lời';

      if (get(m, "ip") === get(m, "quote.ip") || get(m, "userId") === get(m, "quote.userId")) {
        if (this.state.isMobile) {
          prefix = 'trích dẫn';
        } else {
          prefix = 'đã trích dẫn lại 1 tin nhắn cũ';
        }
      } else {
        replyTo = <span>{m.quote.userFullName}</span>;
      }
    }

    if (this.state.isMobile) {
      notification.open({
        className: "mainNotifyNewMessage",
        key: m.id,
        // duration: 100000, // Enable to css
        top: parseInt(this.state.iframeHeight, 10) + 6,
        message: <span><Avatar src={m.userAvatar} size="small" /> <span>{m.userFullName}</span> <i style={{ fontSize: 12 }}> {prefix}: </i> {replyTo}</span>,
        description: m.text.replace(/(?:https?|ftp):\/\/[\n\S]+/g, '(img | link)'),
        onClick: () => {
          scrollToBottomMessage(200, true);
          notification.close(m.id);
        },
      });
    } else {
      notification.open({
        className: "mainNotifyNewMessage",
        key: m.id,
        // duration: 100000, // Enable to css
        message: <span><Avatar src={m.userAvatar} size="small" /> <span>{m.userFullName}</span> <i style={{ fontSize: 12 }}> {prefix}: </i> {replyTo}</span>,
        description: <div className="notifyNewMessage"><i>{replaceEmoticons(m.text)}</i></div>,
        onClick: () => {
          scrollToBottomMessage(200, true);
          notification.close(m.id);
        },
      });
    }
  }

  isLoggedIn() {
    return this.state.userFullName && this.state.userAvatar;
  }

  setQuote(quote: IQuote) {
    document.getElementById('chatInputMessage')?.focus();
    this.setState({
      quote,
    })
  }

  onRemoveQuote() {
    if (this.state.quote) {
      this.setState({
        quote: null,
      })
    }
  }

  componentDidMount() {
    let isMobile = checkIsMobile();
    this.initSocket();

    this.setState({
      iframeHeight: getIframeHeight(),
    });

    const userFullName = getUserFullName();
    const userAvatar = getUserAvatar();
    if (!userAvatar || !userFullName) {
      this.setState({
        isMobile,
        isLoggedIn: false,
      });
    } else {
      this.setState({
        isMobile,
        userFullName,
        userAvatar,
        isLoggedIn: true,
      });

      setTimeout(() => {
        this.socket?.emit(SOCKET_TYPES.JOIN, {
          userFullName,
          userAvatar,
          isMobile,
        });
      }, 1000);
    }
  }

  onLoginSuccess({
    userFullName,
    userAvatar,
  }: {
    userFullName: string;
    userAvatar: string;
  }) {
    setUserAvatar(userAvatar);
    setUserFullName(userFullName);
    this.setState({
      userFullName,
      userAvatar,
      isLoggedIn: true,
    });
    this.socket?.emit(SOCKET_TYPES.JOIN, {
      userFullName,
      userAvatar,
      isMobile: checkIsMobile(),
    });
  }

  onLogout() {
    removeUserAvatar();
    this.socket.emit(SOCKET_TYPES.LOGOUT);
    this.setState({ isLoggedIn: false });
  }

  onChangeIframeUrl(url: string, password: string) {
    this.socket.emit(SOCKET_TYPES.CHANGE_IFRAME_URL, { url, password });
  }

  onCancelChangeIframeUrl() {
    this.setState({
      showSwitchChannelForm: false,
    });
  }

  sendSystemMessage({ icon, text }: { icon?: string; text: string }) {
    this.socket.emit(SOCKET_TYPES.SYSTEM_MESSAGE, {
      text,
      userFullName: "Nogi46VN",
      userAvatar: icon ? icon : "/logo192.png",
      isSystem: 1,
    });
  }

  addHiMessage(messages: any) {
    const { userFullName } = this.state;
    const idol = getRandomIdol();
    // const isAndroid = /(android)/i.test(navigator.userAgent);
    let text;

    text = `Hi, <b>${userFullName}</b> ${getRandomHiMessage()}`;
    // if (isAndroid) {
    //   text = `Hi, <b>${userFullName}</b>, ${getRandomHiMessage()} App NogiChat <b>v5.1.0</b> (29/05/2020) đã cập nhập thêm nhiều Emoj hay ho hơn. <a href="https://nogi46vn.web.app/android-app/nogi46vn-chat-v510.apk" target="_blank">Click để Tải</a>`;
    // } else {
    //   text = `Hi, <b>${userFullName}</b>, ${getRandomHiMessage()} App NogiChat trên Android <b>v5.1.0</b> (29/05/2020) đã cập nhập thêm nhiều Emoj hay ho hơn. <a href="https://nogi46vn.web.app/android-app/nogi46vn-chat-v510.apk" target="_blank">Click để Tải</a>`;
    // }

    // text = `Hi <b>${userFullName}</b>, ${getRandomHiMessage()}`;

    // const text = `Hi <b>Ikuta Erika</b>, ${getRandomHiMessage()}`;
    messages.push({
      id: uuidV4(),
      userId: "system",
      userFullName: idol.romaji,
      // userFullName: 'Ikuta Erika',
      isSystem: 1,
      userAvatar: idol.imgUrl,
      // userAvatar: '/nogizaka46/members/1st-Ikuta Erika-North Rhine-Westphalia Germany.jpg',
      text,
      timestamp: new Date().toISOString(),
    });

    const members = getMembersBirthTodayBirthday();

    if (members.length) {
      const textBirthdayMessage = members.map(item => `<img style="object-fit: cover;" src="${item.imgUrl}" width="32" height="32"/> <b>${item.romaji}</b> <i>(${item.birthday})</i>`);

      messages.push({
        id: uuidV4(),
        userId: "system",
        userFullName: 'Hệ thống',
        isSystem: 1,
        userAvatar: "/logo.png",
        text: `🎂 Chúc mừng sinh nhật ${textBirthdayMessage.join()}!`,
        timestamp: new Date().toISOString(),
      });
    }

    return messages;
  }

  onSendMessage(text: string) {
    if (this.isLoggedIn()) {
      const lowerCaseText = text.toLowerCase().toLowerCase();
      if (
        lowerCaseText === "lu" &&
        getMasterPassword() &&
        localStorage.getItem("lu")
      ) {
        this.socket.emit(SOCKET_TYPES.LIST_USERS);
      } else if (lowerCaseText === "channel" || lowerCaseText === "chanel") {
        this.setState({
          showSwitchChannelForm: true,
        });
      } else if (
        lowerCaseText === "f5reloadlive" &&
        getMasterPassword()
      ) {
        if (localStorage.getItem("lu")) {
          this.socket.emit(SOCKET_TYPES.RELOAD, {
            password: getMasterPassword(),
          });
        }
      } else if (
        lowerCaseText.indexOf("myoshi:") >= 0 ||
        lowerCaseText.indexOf("oshi:") >= 0
      ) {
        const regexImg = RegExp(
          /((https|http)?:\/\/[^ ]+?(?:\.jpeg|\.jpg|\.png)).*$/,
          "gi"
        );
        const parts = text.split(":");
        parts.shift();
        const imageUrl = parts.join(":");
        if (parts.length >= 2 && regexImg.test(imageUrl)) {
          setUserAvatar(imageUrl);
          this.setState({ userAvatar: imageUrl });
        }
      } else {
        let repairText = text;
        if (this.state.quote) {
          repairText = text.replace(`@${this.state.quote.userFullName}`, '').trim();
        }

        if (repairText === '') {
          return;
        }

        const message: IMessage = {
          text: repairText,
          userFullName: this.state.userFullName,
          userAvatar: this.state.userAvatar,
          userAgent: navigator.userAgent || '',
          quote: this.state.quote && this.state.quote.text ? this.state.quote : null as any,
        };
        this.socket.emit(SOCKET_TYPES.MESSAGE, message);
        this.onRemoveQuote();
      }
    }
  }

  onScrollMessages() {
    if (isBottomOfMessageList() && this.state.hasNewMessage > 0) {
      this.setState({
        hasNewMessage: 0,
      });
    }
  }

  render() {
    const {
      userFullName,
      iframeHeight,
      hasNewMessage,
      isShowListUsers,
      yourIp,
      channelUrl,
      showSwitchChannelForm,
      isLoggedIn,
      isMobile,
      messages,
      totalUser,
      userAvatar,
      currentUserId,
    } = this.state;

    const size = 'middle';

    return (
      <div className="App">
        <Row
          id="main"
          style={isMobile ? { display: "flex", alignItems: "stretch" } : {}}
        >
          <Col xs={24} sm={24} md={16} lg={17} xl={17} style={{ backgroundColor: '#000' }}>
            {channelUrl !== "" && (
              <iframe
                id="iframe-video"
                width="100%"
                height={iframeHeight}
                title="Nogizaka46 Streaming Video"
                src={this.state.channelUrl}
                frameBorder="0"
                allow="autoplay; encrypted-media"
                allowFullScreen
              ></iframe>
            )}
          </Col>
          <Col
            xs={24}
            sm={24}
            md={8}
            lg={7}
            xl={7}
            style={
              isMobile
                ? {
                  flexGrow: 1,
                  overflowY: "auto",
                  maxHeight: `calc(100% - ${parseInt(iframeHeight, 10)}px)`,
                }
                : { maxHeight: "100%", display: "flex", flexDirection: "column", alignItems: "stretch" }
            }
          >
            {isLoggedIn === true && (
              <>
                <PageHeader
                  style={{ padding: "3px 8px" }}
                  title=""
                  className="site-page-header"
                  subTitle={
                    <span>
                      Hi, <b> {userFullName}</b>
                    </span>
                  }
                  extra={[
                    <span key="hasNewMessage" style={{ margin: 0 }}>{hasNewMessage > 0 ? <Button

                      onClick={() => {
                        this.setState({ hasNewMessage: 0 });
                        scrollToBottomMessage(500, true)
                      }}
                      shape="round"
                      danger
                      type="dashed"
                      size={size}
                    >
                      {hasNewMessage} <MessageOutlined />
                    </Button> : <span></span>}</span>,
                    <Button
                      size={size}
                      key="onlineUser"
                      onClick={() => {
                        this.socket.emit(SOCKET_TYPES.LIST_USERS);
                        this.setState({ isShowListUsers: true });
                      }}
                      shape="round"
                      type="dashed"
                    >
                      Online: <b> {totalUser > 0 ? totalUser : '...'}</b>
                    </Button>,
                    <Button
                      size={size}
                      key="logoutButton"
                      onClick={this.onLogout}
                      type="default"
                      shape="circle"
                      icon={<LogoutOutlined />}
                    />
                  ]}
                  avatar={{
                    src: userAvatar,
                    style: { border: "1px solid #a970ff" },
                  }}
                />
                <Divider style={{ margin: 0 }} />
              </>
            )}
            {yourIp !== "" && (
              <ListMessage
                onScrollMessages={this.onScrollMessages}
                messages={messages}
                yourIp={yourIp}
                setQuote={this.setQuote}
                currentUserId={currentUserId}
              />
            )}
            <ChatForm
              isLoggedIn={isLoggedIn}
              quote={this.state.quote}
              onRemoveQuote={this.onRemoveQuote}
              onSendMessage={this.onSendMessage}
            />
          </Col>
          {isLoggedIn === false && (
            <LoginForm onLoginSuccess={this.onLoginSuccess} />
          )}
          {isShowListUsers === true && (
            <ListUsers
              onCloseListUser={() => {
                this.setState({ isShowListUsers: false });
              }}
              members={this.state.listUsers}
            />
          )}
          {isLoggedIn === true && showSwitchChannelForm && (
            <SwitchChannelForm
              onChangeIframeUrl={this.onChangeIframeUrl}
              onCancelChangeIframeUrl={this.onCancelChangeIframeUrl}
            />
          )}
        </Row>
      </div>
    );
  }
}

export default App;
