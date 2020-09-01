import React from "react";
import "./ListMessage.less";
import {
  replaceEmoticons,
  checkIsMobile,
} from "../../functions";
import moment from "moment";
import renderHTML from "react-render-html";
import { Card, Avatar, Divider, Tooltip } from "antd";
import Meta from "antd/lib/card/Meta";
import { IMessage } from "../../types";

interface IListMessageProps {
  messages: any[];
  currentUserId: string;
  yourIp: string;
  onScrollMessages: any;
  setQuote: Function;
}

class ListMessage extends React.Component<IListMessageProps> {
  state = {
    isMobile: false,
    isBottom: false,
    style: {},
  };

  constructor(props: IListMessageProps) {
    super(props);
    this.reply = this.reply.bind(this);
  }

  componentDidUpdate() {
    // scrollToBottomMessage()
  }

  componentDidMount() {
    this.setState({
      isMobile: checkIsMobile(),
    });
  }

  reply(message: IMessage) {
    this.props.setQuote({
      text: message.text,
      userAvatar: message.userAvatar,
      userFullName: message.userFullName,
      timestamp: message.timestamp,
      userId: message.userId,
      ip: message.ip,
    });
  }

  render() {
    const { messages, currentUserId, yourIp, onScrollMessages } = this.props;
    const { style, isMobile } = this.state;
    const startOfDay = moment().startOf("day").valueOf();

    return (
      <div id="messages" style={style} onScroll={onScrollMessages}>
        {messages.map((message) => {
          const messageDate = moment(message.timestamp);
          const messageQuoteDate = message.quote ? moment(message.quote.timestamp) : null;

          const isMyMessage =
            currentUserId === message.userId || yourIp === message.ip;
          let className = "";
          // console.log({ yourIp, messageUserId: message.userId, messageIp: message.ip })
          if (isMyMessage) {
            className = "my-message";
          }

          let avatar = message.userAvatar;
          const isUrl = message.userAvatar.indexOf("http") >= 0;
          if (isUrl) {
            avatar = message.userAvatar;
          }

          return (
            <Card
              key={`message-${message.id}`}
              bodyStyle={{ padding: isMobile ? 10 : 12 }}
              style={{ borderBottom: "none" }}
              className={className}
              dir={isMyMessage ? "rtl" : "ltr"}
            >
              <Meta
                avatar={<span onClick={() => this.reply(message)}><Avatar src={avatar} alt={message.userFullName} /></span>}
                title={
                  <>
                    <b onClick={() => this.reply(message)} style={{ color: "#4e4e50", fontSize: 14, cursor: "pointer" }}>{message.userFullName}</b>{" "}
                    <i style={{ fontSize: 14, color: "#a0a0ac" }}>
                      lúc
                      {messageDate.valueOf() > startOfDay
                        ? messageDate.format(" hh:mm a ")
                        : messageDate.format(" hh:mm a DD/MM ")}
                    </i>
                    {/* <FacebookOutlined  /> */}
                  </>
                }
                description={
                  <>
                    {message.quote && messageQuoteDate && (
                      <div className="blockquote-wrapper">
                        <span className="replyTo">
                          {/* <img style={{padding: 4, position: 'relative', top: -8}} src="/images/quote-start.png" width="22" height="22" alt="" /> */}
                          <Tooltip title={messageQuoteDate.valueOf() > startOfDay
                            ? messageQuoteDate.format(" hh:mm a ")
                            : messageQuoteDate.format(" hh:mm a DD/MM ")}><span onClick={() => this.reply(message.quote)}><Avatar style={{ width: 28, height: 28 }} src={message.quote.userAvatar} /></span></Tooltip> <span onClick={() => this.reply(message.quote)}>{message.quote.userFullName}</span>
                        </span>&nbsp;: {replaceEmoticons(message.quote.text)}
                        {/* <img style={{padding: 4, position: 'relative', bottom: -8}} src="/images/quote-end.png" width="22" height="22" alt="" /> */}
                      </div>
                    )}
                    {message.quote && <Divider style={{ margin: '8px 0px' }} />}
                    <span className="messageText">{message.isSystem
                      ? renderHTML(message.text)
                      : replaceEmoticons(message.text)}</span>
                  </>
                }
              />
            </Card>
          );
        })}
      </div>
    );
  }
}

export default ListMessage;
