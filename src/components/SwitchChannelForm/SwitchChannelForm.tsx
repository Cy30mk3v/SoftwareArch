import React from "react";
import "./SwitchChannelForm.less";
import {
  getMasterPassword,
  setMasterPassword,
  checkIsMobile,
  youtubeParser,
  isURL,
} from "../../functions";
import { Modal, Button, Input } from "antd";
import { CHANNEL_REGISTRY } from "../../config";

interface ISwitchChannelFormProps {
  onChangeIframeUrl: Function;
  onCancelChangeIframeUrl: Function;
}

class SwitchChannelForm extends React.Component<ISwitchChannelFormProps> {
  constructor(props: any) {
    super(props);
    this.checkChangeIframeUrl = this.checkChangeIframeUrl.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.changeURl = this.changeURl.bind(this);
  }

  state = {
    channelUrl: "",
    password: "",
    errorMessage: "",
    isMobile: false,
    visible: true,
  };

  componentDidMount() {
    this.setState({ isMobile: checkIsMobile() });
    const password = getMasterPassword();
    if (password) {
      this.setState({
        password,
      });
    }
  }

  handleChange(event: any) {
    this.setState({ [event.target.name]: event.target.value });
  }

  checkChangeIframeUrl() {
    const { channelUrl, password } = this.state;
    const { onChangeIframeUrl } = this.props;
    const isCheckChanelOk = isURL(channelUrl);
    if (isCheckChanelOk && channelUrl && password) {
      setMasterPassword(password);
      const youtubeVideoId = youtubeParser(channelUrl);
      if (youtubeVideoId) {
        onChangeIframeUrl(
          `https://www.youtube.com/embed/${youtubeVideoId}?autoplay=1`,
          password
        );
      } else {
        onChangeIframeUrl(channelUrl, password);
      }
    } else {
      if (!channelUrl) {
        this.setState({
          errorMessage: "Vui lòng nhập đường dẫn kênh",
        });
        return;
      }

      if (!password) {
        this.setState({
          errorMessage: "Vui lòng nhập mật khẩu",
        });
        return;
      }

      if (!isCheckChanelOk) {
        this.setState({
          errorMessage: "Vui lòng xem lại đường dẫn kênh",
        });
        return;
      }

      this.setState({
        errorMessage: "Có gì đó lỗi...",
      });
    }
  }

  handleKeyDown(e: any) {
    if (e.key === "Enter") {
      this.checkChangeIframeUrl();
    }
  }

  changeURl(channelUrl: string) {
    this.setState({ channelUrl });
  }

  render() {
    const { errorMessage } = this.state;

    return (
      <Modal
        className="rocketModal"
        title="Đổi Stream URL"
        visible={this.state.visible}
        onCancel={() => {
          this.setState({ visible: false });
          this.props.onCancelChangeIframeUrl();
        }}
        footer={[
          <Button
            type="dashed"
            shape="round"
            onClick={() => this.changeURl(CHANNEL_REGISTRY.niyo0525)}
            size="large"
            style={{ float: "left" }}
          >
            Niyo
          </Button>,
          <Button
            type="dashed"
            shape="round"
            onClick={() => this.changeURl(CHANNEL_REGISTRY.k940046)}
            size="large"
            style={{ float: "left" }}
          >
            940046
          </Button>,
          <Button
            type="dashed"
            shape="round"
            onClick={() => this.changeURl(CHANNEL_REGISTRY.yunaito4846)}
            size="large"
            style={{ float: "left" }}
          >
            YunaIto
          </Button>,
          <Button
            type="dashed"
            shape="round"
            onClick={() => this.changeURl(CHANNEL_REGISTRY.fcNogi)}
            size="large"
            style={{ float: "left" }}
          >
            FcNogi
          </Button>,
          <Button
            type="dashed"
            shape="round"
            onClick={() => this.changeURl(CHANNEL_REGISTRY.FBI)}
            size="large"
            style={{ float: "left" }}
          >
            FBI
          </Button>,
          <p>
            <Button
            style={{display: 'inline-block', marginTop: 16}}
            type="primary"
            shape="round"
            onClick={this.checkChangeIframeUrl}
            size="large"
          >
            Đổi kênh
          </Button>
          </p>,
        ]}
      >
        <Input
          name="channelUrl"
          placeholder="Đường dẫn kênh"
          autoComplete="off"
          value={this.state.channelUrl}
          onChange={this.handleChange}
          onKeyPress={this.handleKeyDown}
          size="large"
        />
        <br />
        <br />
        <Input
          type="password"
          name="password"
          placeholder="Mật khẩu"
          value={this.state.password}
          onChange={this.handleChange}
          onKeyPress={this.handleKeyDown}
          size="large"
        />
        {errorMessage !== "" && (
          <p style={{ textAlign: "center", color: "red", marginTop: 10 }}>
            {errorMessage}
          </p>
        )}
      </Modal>
    );
  }
}

export default SwitchChannelForm;
