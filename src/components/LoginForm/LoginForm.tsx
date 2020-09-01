import React from "react";
import ListNogizaka46Chan from "../ListNogizaka46Chan/ListNogizaka46Chan";
import "./LoginForm.less";
import {
  getUserFullName,
  checkIsMobile,
  capitalizeFirstLetter,
} from "../../functions";
import { Modal, Input, Row, Avatar, Button } from "antd";

interface ILoginFormProps {
  onLoginSuccess: Function;
}

class LoginForm extends React.Component<ILoginFormProps> {
  constructor(props: any) {
    super(props);
    this.toggleListNogizaka46Chan = this.toggleListNogizaka46Chan.bind(this);
    this.toggleListNogizaka46Chan = this.toggleListNogizaka46Chan.bind(this);
    this.onSelectAvatar = this.onSelectAvatar.bind(this);
    this.checkLogin = this.checkLogin.bind(this);
    this.onTouchLogin = this.onTouchLogin.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  state = {
    showNogizakaChan: false,
    userAvatarCustom: "",
    userFullName: "",
    userAvatar: "",
    errorMessage: "",
    isMobile: false,
  };

  componentDidMount() {
    this.setState({ isMobile: checkIsMobile() });
    const userFullName = getUserFullName();
    if (userFullName) {
      this.setState({
        userFullName,
      });
    }
  }

  toggleListNogizaka46Chan() {
    this.setState({ showNogizakaChan: !this.state.showNogizakaChan });
  }

  handleChange(event: any) {
    this.setState({ [event.target.name]: event.target.value });
  }

  onTouchLogin() {
    const { userFullName, userAvatar, userAvatarCustom } = this.state;
    const { onLoginSuccess } = this.props;

    if (this.checkLogin()) {
      onLoginSuccess({
        userFullName: capitalizeFirstLetter(userFullName),
        userAvatar: userAvatarCustom || userAvatar,
      });
    }
  }

  checkLogin() {
    const { userFullName, userAvatar, userAvatarCustom } = this.state;

    const regexImg = RegExp(
      /((https|http)?:\/\/[^ ]+?(?:\.jpeg|\.jpg|\.png)).*$/,
      "gi"
    );

    if (userAvatarCustom && !regexImg.test(userAvatarCustom)) {
      this.setState({
        errorMessage: "Đường dẫn ảnh phải là jpg hoặc png",
        userAvatarCustom: "",
      });

      return false;
    }

    if (
      userFullName &&
      userFullName.trim() &&
      userFullName.length <= 30 &&
      (userAvatar || userAvatarCustom)
    ) {
      return true;
    } else {
      if (!userFullName) {
        this.setState({
          errorMessage: "Vui lòng nhập tên hiển thị",
        });
      }

      if (userFullName.length > 30) {
        this.setState({
          errorMessage: "Tên tối đa 30 ký tự",
        });
      }

      if (!userAvatar) {
        this.setState({
          errorMessage: "Vui lòng chọn ảnh đại diện",
        });
      }
    }

    return false;
  }

  onSelectAvatar(userAvatar: string) {
    this.toggleListNogizaka46Chan();
    this.setState({ userAvatar });
    if (this.state.errorMessage === "Vui lòng chọn ảnh đại diện") {
      this.setState({ errorMessage: "" });
    }
  }

  handleKeyDown(e: any) {
    if (e.key === "Enter") {
      this.onTouchLogin();
    }
  }

  render() {
    const { showNogizakaChan, userAvatar, errorMessage } = this.state;

    return (
      <>
        <Modal
          title="Nogi, Xin chào"
          visible={true}
          closable={false}
          footer={[
            <Button
              type="primary"
              shape="round"
              onClick={this.onTouchLogin}
              size="large"
            >
              Đăng nhập
            </Button>,
          ]}
          className="loginForm rocketModal"
        >
          <Row
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div onClick={this.toggleListNogizaka46Chan}>
              <Avatar
                src={userAvatar || "/images/avatar-default.png"}
                size="large"
                style={{ width: 72, height: 72, cursor: 'pointer' }}
              />
            </div>
            <Button type="link" onClick={this.toggleListNogizaka46Chan}>
              Chọn ảnh đại diện
            </Button>
          </Row>
          <br />
          <Input
            name="userFullName"
            maxLength={30}
            placeholder="Tên hiển thị"
            autoComplete="off"
            value={this.state.userFullName}
            onChange={this.handleChange}
            onKeyPress={this.handleKeyDown}
            size="large"
          />
          <br />
          <br />
          <Input
            name="userAvatarCustom"
            placeholder="Đường dẫn ảnh đại diện (jpg, png)"
            value={this.state.userAvatarCustom}
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
        {showNogizakaChan === true && (
          <ListNogizaka46Chan
            onSelectAvatar={this.onSelectAvatar}
            onClickClose={this.toggleListNogizaka46Chan}
          />
        )}
      </>
    );
  }
}

export default LoginForm;
