import React from "react";
import "./ListUsers.less";
import { checkIsMobile } from "../../functions";
import moment from "moment";
import { Modal, Button, Avatar, Row, Divider } from "antd";

interface IListUsersProps {
  onCloseListUser: Function;
  members: any[];
}

class ListUsers extends React.Component<IListUsersProps> {
  constructor(props: any) {
    super(props);
    this.onClickClose = this.onClickClose.bind(this);
  }

  state = {
    isMobile: false,
    visible: true,
  };

  componentDidMount() {
    this.setState({ isMobile: checkIsMobile() });
  }

  onClickClose() {
    const { onCloseListUser } = this.props;
    onCloseListUser();
  }

  render() {
    const { members } = this.props;

    return (
      <Modal
        className="listUserOnline rocketModal"
        title="Nogi Members Online"
        centered
        visible={this.state.visible}
        onCancel={() => {
          this.setState({ visible: false });
          this.onClickClose();
        }}
        bodyStyle={{ padding: 12 }}
        footer={[
          <Button
            type="primary"
            shape="round"
            onClick={this.onClickClose}
            size="large"
            block
          >
            Đóng
          </Button>,
        ]}
      >
        {members.map((member, index) => {
          return (
            <>
              <Row style={{ display: "flex" }}>
                <Avatar src={member.userAvatar} style={{ marginRight: 8 }} />
                <span style={{ alignSelf: "center" }}>
                  <b>{member.userFullName}</b>{" "}
                  <i> {member.isMobile ? "📱" : "💻"} - {moment(member.timestamp).format("hh:mm a DD/MM")}</i>
                </span>
              </Row>
              {index + 1 < members.length && <Divider style={{ margin: "12px 0" }} />}
            </>
          );
        })}
      </Modal>
    );
  }
}

export default ListUsers;
