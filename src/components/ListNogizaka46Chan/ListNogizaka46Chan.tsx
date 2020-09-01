import React from "react";
import Nogizaka46Members from "../../nogizaka46-members";
import { Button, Card, Avatar, Divider } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import { checkIsMobile } from "../../functions";

interface IListNogizaka46ChanProps {
  onClickClose: any;
  onSelectAvatar: any;
}

class ListNogizaka46Chan extends React.Component<IListNogizaka46ChanProps> {
  componentDidMount() { }

  render() {
    const { onClickClose, onSelectAvatar } = this.props;
    const isMobile = checkIsMobile();
    return (
      <Card
        style={{ width: "100%" }}
        bodyStyle={{
          textAlign: "center",
          padding: "12px 12px 12px 12px",
        }}
        className="emoji-dashboard"
      >
        <div>
          <Button
            onClick={() => {
              onClickClose();
            }}
            shape="circle"
            icon={<CloseOutlined />}
          />
        </div>
        <Divider style={{ margin: "12px 0" }} />
        <ul
          style={{
            padding: 0,
            maxHeight: 300,
            overflowY: isMobile ? "scroll" : "auto",
          }}
        >
          {Nogizaka46Members.map((idol, index) => {
            return (
              <li
                onClick={() => {
                  onSelectAvatar(idol.imgUrl);
                }}
                key={`idol-${index}`}
              >
                <Avatar
                  src={idol.imgUrl}
                  alt={`${idol.gen} - ${idol.romaji}`}
                  size="large"
                  style={{ width: 48, height: 48 }}
                />
              </li>
            );
          })}
        </ul>
      </Card>
    );
  }
}

export default ListNogizaka46Chan;
