import React from "react";
import "./ChatForm.less";
import ListNogizaka46EmojChans from "../ListNogizaka46EmojChans/ListNogizaka46EmojChans";
import { checkIsMobile } from "../../functions";
import { Input, Row, Button } from "antd";
import { SmileOutlined, SendOutlined } from "@ant-design/icons";
import { IQuote } from "../../types";
import { isEqual } from 'lodash';
interface IChatFormProps {
  onSendMessage: Function;
  isLoggedIn: boolean;
  quote: IQuote;
  onRemoveQuote: Function;
}

class ChatForm extends React.Component<IChatFormProps> {
  constructor(props: any) {
    super(props);
    this.toggleListNogizaka46EmojChans = this.toggleListNogizaka46EmojChans.bind(
      this
    );
    this.onSelectEmojChan = this.onSelectEmojChan.bind(this);
    this.onReceiveImageObject = this.onReceiveImageObject.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.isEnableSendButton = this.isEnableSendButton.bind(this);
  }

  state = {
    message: "",
    showNogizakaEmojChans: false,
    isMobile: false,
  };

  isEnableSendButton() {
    if (this.props.quote?.userFullName) {
      return this.state.message.replace(`@${this.props.quote?.userFullName}`, '').trim() !== '';
    }

    return this.state.message.trim() !== '';
  }

  toggleListNogizaka46EmojChans() {
    this.setState({ showNogizakaEmojChans: !this.state.showNogizakaEmojChans });
  }

  componentDidMount() {
    const isMobile = checkIsMobile();
    this.setState({ isMobile });
  }

  componentWillReceiveProps(nextProps: IChatFormProps) {
    if (!isEqual(nextProps.quote, this.props.quote)) {
      this.setState({ message: nextProps.quote?.userFullName ? `@${nextProps.quote?.userFullName} ` : '' });
    }
  }

  handleChange(event: any) {
    if (event.target.value === '' || (this.props.quote !== null && !event.target.value.includes(`@${this.props.quote.userFullName}`))) {
      this.props.onRemoveQuote();
    }
    this.setState({ message: event.target.value });
  }

  onSelectEmojChan(emojOrImage: string, isImage: boolean) {
    this.toggleListNogizaka46EmojChans();
    const { message } = this.state;
    this.setState({
      message: (
        message.trim() + (isImage ? ` [${emojOrImage}] ` : ` ${emojOrImage} `)
      ).trim(),
    });
  }

  onReceiveImageObject(imageObject: any) {
    this.toggleListNogizaka46EmojChans();
    const { message } = this.state;
    this.setState({
      message: `${message.trim()} ${imageObject.link}`,
    });
  }

  sendMessage() {
    if (this.state.message) {
      this.props.onSendMessage(this.state.message.trim());
      this.setState({
        message: "",
      });
    }
  }

  handleKeyDown(e: any) {
    if (e.key === "Enter") {
      this.sendMessage();
    }
  }

  render() {
    const { showNogizakaEmojChans } = this.state;

    return (
      <Row
        style={{
          display: "flex",
          padding: "8px 12px",
          backgroundColor: "#fafafa",
        }}
        id="chatForm"
      >
        <Input
          style={{ flexGrow: 1, width: 0, margin: "0px 4px", fontSize: 16 }}
          disabled={!this.props.isLoggedIn}
          placeholder="Nhập tin nhắn"
          type="text"
          autoComplete="off"
          value={this.state.message}
          onChange={this.handleChange}
          onKeyPress={this.handleKeyDown}
          id="chatInputMessage"
        />
        {/* <Button
          style={{ margin: "0px 2px" }}
          type="default"
          shape="circle"
          icon={<GifOutlined />}
          size="large"
          onClick={this.toggleListNogizaka46EmojChans}
        /> */}
        <Button
          style={{ margin: "0px 4px" }}
          type="default"
          shape="circle"
          icon={<SmileOutlined />}
          size="large"
          onClick={this.toggleListNogizaka46EmojChans}
        />
        <Button
          style={{ margin: "0px 4px" }}
          type={this.isEnableSendButton() ? "primary" : "default"}
          shape="circle"
          icon={<SendOutlined />}
          size="large"
          onClick={this.sendMessage}
        />
        {showNogizakaEmojChans === true && (
          <ListNogizaka46EmojChans
            onSelectEmojChan={this.onSelectEmojChan}
            onReceiveImageObject={this.onReceiveImageObject}
            onClickClose={this.toggleListNogizaka46EmojChans}
          />
        )}
      </Row>
    );
  }
}

export default ChatForm;
