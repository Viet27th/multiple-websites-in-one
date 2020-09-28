import React from 'react';
import './App.scss';
import {LocalStorageUtilities} from "./utilities";
import $ from "jquery";
import {
  ToastContainer,
  toast
} from "react-toastify";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      websites: [],
      currentActive: null
    };
    this.mainTabContentRef = React.createRef();
  }

  render() {
    return (
      <div className="App">
        <ToastContainer />

        <div className="container-fluid p-0">

          <ul className="tabs">
            {
              this.state.websites.map((obj, key) => {
                return (
                  <li className={`tab ${obj.id === this.state.currentActive ? "active" : ""}`}
                    onClick={() => this.handleTabClick(obj.id)}
                    key={key}>
                    <span className="remove-tab" onClick={(e) => this.handleRemoveTab(e, obj.id)}> x </span>
                    <span>
                      {obj.tabName}
                    </span>
                  </li>
                );
              })
            }
            <li className="tab btn-add" onClick={() => $('#JS-modal').modal('show')}>+</li>
          </ul>

          <div ref={this.mainTabContentRef} className="main-tab-content">

          </div>

        </div>

        {/* Modal */}
        <div id="JS-modal" className="modal fade bd-example-modal-sm" tabIndex="-1" role="dialog" aria-labelledby="mySmallModalLabel" aria-hidden="true">
          <div className="modal-dialog modal-sm">
            <div className="modal-content">
              <form className="p-3" onSubmit={this.handleAddTab}>
                <div className="form-group">
                  <label htmlFor="tabName">Tên Website:</label>
                  <input type="text" id="tabName" name="tabName" className="form-control" placeholder="Tên Website" />
                  <small className="form-text text-muted">Tên Website là do bạn tự đặt. Ví dụ: "Báo điện tử VN Express".</small>
                </div>
                <div className="form-group">
                  <label htmlFor="link">Liên kết:</label>
                  <input type="text" className="form-control" id="link" name="link" placeholder="Đường dẫn đến trang web." />
                  <small className="form-text text-muted">Nhập đường dẫn trang Web mà bạn đang cần theo dõi. Ví dụ: "https://vnexpress.net/".</small>
                </div>

                <div className="text-right">
                  <button
                    type="button"
                    className="btn btn-danger mr-2"
                    onClick={() => $("#JS-modal").modal("hide")}>
                    Hủy bỏ
                  </button>
                  <button type="submit" className="btn btn-primary">Thêm</button>
                </div>

              </form>

            </div>
          </div>
        </div>

      </div>
    );
  }

  componentDidMount() {
    let websites = LocalStorageUtilities.getLocalStorageByName("websites");

    if(!websites || !websites.length) {
      websites = [
        {
          tabName: "VnExpress",
          link: "https://vnexpress.net/",
          id: Math.random().toString(36).substring(7)
        },
        {
          tabName: "Dân trí",
          link: "https://dantri.com.vn/",
          id: Math.random().toString(36).substring(7)
        },
        {
          tabName: "Sở giao dịch chứng khoán HCM",
          link: "https://www.hsx.vn/",
          id: Math.random().toString(36).substring(7)
        },
        {
          tabName: "Vietnambiz",
          link: "https://vietnambiz.vn/",
          id: Math.random().toString(36).substring(7)
        },
        {
          tabName: "Báo Tuổi Trẻ",
          link: "https://tuoitre.vn/",
          id: Math.random().toString(36).substring(7)
        },
        {
          tabName: "Vietnamnet",
          link: "https://vietnamnet.vn/",
          id: Math.random().toString(36).substring(7)
        },
        {
          tabName: "Báo thanh niên",
          link: "https://thanhnien.vn/",
          id: Math.random().toString(36).substring(7)
        },
        {
          tabName: "Báo nhân dân",
          link: "https://nhandan.com.vn/",
          id: Math.random().toString(36).substring(7)
        },
        {
          tabName: "Báo lao động",
          link: "http://laodong.vn/",
          id: Math.random().toString(36).substring(7)
        },
      ];

      LocalStorageUtilities.setLocalStorageByName("websites", websites);
    }

    if(websites && websites.length) {
      this.setState({
        websites: websites,
        currentActive: websites[0].id
      }, () => {
        let node = this.createNode(websites[0].id);
        this.mainTabContentRef.current.insertAdjacentHTML("beforeend", node);
      });
    } else {
      this.setState({
        websites: []
      })
    }
  }

  handleTabClick = (id) => {
    this.setState({
      currentActive: id
    }, () => {
      let nodeHasBeenExisting = false
      Array.from(document.getElementsByClassName("content-tab")).forEach(dom => {
        dom.classList.remove("active");
        if(dom.dataset.id === id) {
          nodeHasBeenExisting = true;
          dom.classList.add("active");
        }
      });
      if(!nodeHasBeenExisting) {
        let node = this.createNode(id);
        this.mainTabContentRef.current.insertAdjacentHTML("beforeend", node);
      }
    });
  }

  handleRemoveTab = (e, id) => {
    e.stopPropagation();

    let websites = this.state.websites.filter((obj, key) => obj.id !== id)

    this.setState({
      websites
    }, () => {
      Array.from(document.getElementsByClassName("content-tab")).forEach(dom => {
        dom.classList.remove("active");
        if(dom.dataset.id === id) {
          dom.remove();
        }
      });

      LocalStorageUtilities.setLocalStorageByName("websites", websites);
      if(this.state.websites.length) {
        this.setState({
          currentActive: this.state.websites[0].id
        }, () => {
          let firstNode = document.querySelector(`[data-id="${this.state.websites[0].id}"]`);
          if(firstNode) {
            firstNode.classList.add("active");
          } else {
            let node = this.createNode(this.state.websites[0].id);
            this.mainTabContentRef.current.insertAdjacentHTML("beforeend", node);
          }
        })
      } else {
        this.setState({currentActive: null});
      }
    });

  }

  handleAddTab = (event) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const data = {
      tabName: form.get("tabName"), // reference by form input's `name` tag
      link: form.get("link"),
      id: Math.random().toString(36).substring(7)
    };

    if(!data.tabName) return toast("Tên website không được để trống.");
    if(!data.link) return toast("Liên kết không được để trống.");
    let websites = LocalStorageUtilities.getLocalStorageByName("websites");
    if(websites && websites.length) {
      websites.push(data);
      LocalStorageUtilities.setLocalStorageByName("websites", websites);
    } else {
      websites = [data];
      LocalStorageUtilities.setLocalStorageByName("websites", websites);
    }

    this.setState({
      websites,
    }, () => {
      this.setState({currentActive: data.id});
      $("#JS-modal").modal("hide");
      Array.from(document.getElementsByClassName("content-tab")).forEach(dom => {
        dom.classList.remove("active");
      })
      let node = this.createNode(data.id);
      this.mainTabContentRef.current.insertAdjacentHTML("beforeend", node);

      document.getElementById("tabName").value = "";
      document.getElementById("link").value = "";
    });

  }

  createNode = (id, isActive = true) => {
    let obj = this.state.websites.find(obj => obj.id === id);
    let node = `
      <div id="JS-content-tab-${id}"
        class="content-tab ${isActive? 'active' : ''}"
        data-id=${id}>
        <iframe
          src=${obj.link}
          title=${obj.link}>
        </iframe>
      </div>
    `;

    return node;
  }

}

export default App;
