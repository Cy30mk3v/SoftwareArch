import React from "react";
import {
  nogizakaEmojChans,
  nogizakaEmojGif,
  nogizakaEmojGifRepo,
  emojIcons,
  checkIsMobile,
  getIframeHeight,
  nogizakaEmojChansPngRepo,
} from "../../functions";
import "./ListNogizaka46EmojChans.less";
import { Button, Row } from "antd";

interface IListNogizaka46EmojChansProps {
  onClickClose: any;
  onSelectEmojChan: any;
  onReceiveImageObject: any;
}

const iconTypes = {
  gif: 1,
  image: 2,
  emoj: 3,
  upload: 4,
};

class ListNogizaka46EmojChans extends React.Component<
  IListNogizaka46EmojChansProps
  > {
  constructor(props: IListNogizaka46EmojChansProps) {
    super(props);
    this.buildFileSelector = this.buildFileSelector.bind(this);
  }

  state: any = {
    isShowGifEmoj: iconTypes.image,
    isPhone: false,
    paddingBottom: 12,
    uploading: false,
    uploadedData: null,
  };

  fileSelector: any;

  componentDidMount() {
    this.fileSelector = this.buildFileSelector();
  }

  handleFileSelect = (e: any) => {
    e.preventDefault();
    if (!this.state.uploading) {
      this.fileSelector.click();
    }
  }

  buildFileSelector() {
    const fileSelector = document.createElement('input');
    fileSelector.setAttribute('type', 'file');
    fileSelector.setAttribute('accept', 'image/*');
    fileSelector.onchange = (e: any) => {
      this.setState({ uploading: true });
      const formData = new FormData();
      const file = e.path ? e.path[0]['files'][0] : e.target['files'][0];

      if (file.size > 10000000) {
        alert('Giới hạn ảnh 10Mb thôi bạn nhé!');
        this.setState({ uploading: false });
        return;
      }

      formData.append('image', file);

      fetch('https://api.imgur.com/3/image', {
        method: 'POST',
        headers: {
          'Authorization': 'Client-ID fb46cb4ab6a2f7e',
        },
        body: formData
      })
        .then(response => response.json())
        .then(result => {
          this.setState({ uploading: false, uploadedData: result.data });
        })
        .catch((error) => {
          this.setState({ uploading: false });
          alert('Lỗi tải ảnh lên, bạn thử lại sau nhé!');
        });

    }
    return fileSelector;
  }

  render() {
    const { onClickClose, onSelectEmojChan } = this.props;
    const { isShowGifEmoj, uploadedData, uploading } = this.state;
    const isMobile = checkIsMobile();
    const iframeHeight = getIframeHeight();

    return (
      <div
        className="chat-form-emoji"
        style={
          isMobile
            ? {
              position: "fixed",
              height: `calc(100% - ${parseInt(iframeHeight, 10)}px)`,
            }
            : { maxHeight: "100%", position: "absolute" }
        }
      >
        <Row dir="rtl">
          <Button
            onClick={() => {
              onClickClose();
            }}
            type="default"
            shape="round"
          >
            Đóng
          </Button>
          <Button
            onClick={() => {
              this.setState({ isShowGifEmoj: iconTypes.gif });
            }}
            type="primary"
            shape="round"
          >
            Gif
          </Button>
          <Button
            onClick={() => {
              this.setState({ isShowGifEmoj: iconTypes.image });
            }}
            shape="round"
            style={{ backgroundColor: "rgb(33, 150, 243)", color: "#ffffff" }}
          >
            Ảnh
          </Button>
          <Button
            onClick={() => {
              this.setState({ isShowGifEmoj: iconTypes.emoj });
            }}
            shape="round"
            style={{ backgroundColor: "rgb(0, 188, 212)", color: "#ffffff" }}
          >
            Emoj
          </Button>
          <Button
            onClick={(e) => {
              this.setState({ isShowGifEmoj: iconTypes.upload });
              this.handleFileSelect(e);
            }}
            shape="round"
            style={{ backgroundColor: "#3f51b5", color: "#ffffff" }}
          >
            Upload
          </Button>
        </Row>
        <div
          className="nogizaka-chan"
          style={
            isMobile
              ? {
                overflowY: "scroll",
                maxHeight: `calc(100% - 44px)`,
              }
              : {}
          }
        >
          <ul className="emojis" style={{ float: "left", width: "100%" }}>
            {isShowGifEmoj === iconTypes.image &&
              nogizakaEmojChans.map((idol, index) => {
                return (
                  <li
                    onClick={() => {
                      onSelectEmojChan(idol, true);
                    }}
                    key={`idol-${index}`}
                  >
                    <img
                      src={nogizakaEmojChansPngRepo[idol]}
                      height="42"
                      width="42"
                      alt={idol}
                    />
                  </li>
                );
              })}
            {isShowGifEmoj === iconTypes.gif &&
              nogizakaEmojGif.map((idol, index) => {
                return (
                  <li
                    onClick={() => {
                      onSelectEmojChan(idol, true);
                    }}
                    key={`idol-${index}`}
                  >
                    <img
                      src={nogizakaEmojGifRepo[idol]}
                      className="emoj-gif"
                      alt={idol}
                    />
                  </li>
                );
              })}
            {isShowGifEmoj === iconTypes.emoj &&
              emojIcons.map((emoj, index) => {
                return (
                  <li
                    style={{ margin: 5 }}
                    onClick={() => {
                      onSelectEmojChan(emoj, false);
                    }}
                    key={`idol-${index}`}
                  >
                    <span style={{ fontSize: 24 }}>{emoj}</span>
                  </li>
                );
              })}
            {isShowGifEmoj === iconTypes.upload &&
              (
                <div style={{ width: '100%', height: 300 }}>
                  {!uploading && uploadedData &&
                    <p style={{ textAlign: 'center', padding: 15 }}>
                      <img src={uploadedData.link} style={{ maxWidth: '68%', maxHeight: 200, borderRadius: 8 }} alt="" />
                      <br />
                      <Button
                        onClick={(e) => {
                          this.props.onReceiveImageObject(uploadedData);
                          this.setState({ isShowGifEmoj: iconTypes.upload });
                        }}
                        shape="round"
                        style={{ backgroundColor: "rgb(0, 188, 212)", color: "#ffffff", float: 'none', marginTop: 10 }}
                      >
                        Sử dụng ảnh này
                    </Button>
                    </p>
                  }
                  {uploading &&
                    (
                      <p style={{ textAlign: 'center', padding: 20 }}>
                        <b><i>Đang tải ảnh, vui lòng đợi!</i></b>
                      </p>
                    )
                  }
                </div>
              )
            }
          </ul>
        </div>
      </div>
    );
  }
}

export default ListNogizaka46EmojChans;
