import React from "react";
import "./skeleton.css";
const Skeleton = () => {
  return (
    <div>
      <nav>
        <div className="container_ab">
          <div className="logo_ab skeleton"></div>
          <div className="search-bar_ab skeleton">
            <i className="ri-search-line"></i>
            <input type="search" placeholder="" />
          </div>
          <div className="create_ab">
            <label className="btn_ab  skeleton"></label>
            <div className="profile-picture_ab skeleton"></div>
          </div>
        </div>
      </nav>
      <main>
        <div className="container_ab">
          <div className="left_ab">
            <a href={() => false} className="profile_ab skeleton">
              <div className="profile-picture_ab skeleton"></div>
              <div className="handle_ab">
                <div className="skeleton"></div>
                <p className="skeleton"></p>
              </div>
            </a>

            <div className="sidebar_ab">
              <a href={() => false} className="menu-item_ab skeleton">
                <span>
                  <i></i>{" "}
                </span>
                <div></div>
              </a>
              <a href={() => false} className="menu-item_ab skeleton">
                <span>
                  <i></i>{" "}
                </span>
                <div></div>
              </a>
              <a href={() => false} className="menu-item_ab skeleton">
                <span>
                  <i></i>{" "}
                </span>
                <div></div>
              </a>
              <a href={() => false} className="menu-item_ab skeleton">
                <span>
                  <i></i>{" "}
                </span>
                <div></div>
              </a>
              <a href={() => false} className="menu-item_ab skeleton">
                <span>
                  <i></i>{" "}
                </span>
                <div></div>
              </a>
              <a href={() => false} className="menu-item_ab skeleton">
                <span>
                  <i></i>{" "}
                </span>
                <div></div>
              </a>
              <a href={() => false} className="menu-item_ab skeleton">
                <span>
                  <i></i>{" "}
                </span>
                <div></div>
              </a>
              <a href={() => false} className="menu-item_ab skeleton">
                <span>
                  <i></i>{" "}
                </span>
                <div></div>
              </a>
            </div>
            <label className="btn_ab btn-primary skeleton"></label>
          </div>

          <div className="middle_ab">
            <div className="trendings_ab skeleton"></div>

            <div className="feeds_ab">
              <div className="feed">
                <div className="head">
                  <div className="user">
                    <div className="profile-picture_ab skeleton"></div>
                    <div className="handle_ab">
                      <div className="skeleton"></div>
                      <p className="skeleton"></p>
                    </div>
                  </div>
                  <span className="edit skeleton"> </span>
                </div>
                <div className="news_ab skeleton"></div>
                <div className="photo skeleton"></div>
                <div className="action-buttons">
                  <div className="interaction-buttons_ab skeleton"></div>
                  <div className="bookmark_ab skeleton"></div>
                </div>
                <div className="liked_by">
                  <span className="skeleton"></span>
                  <span className="skeleton"></span>
                  <span className="skeleton"></span>
                  <p className="skeleton"></p>
                </div>
                <div className="comments_ab text-muted">
                  <small className="skeleton"></small>
                </div>
              </div>
            </div>
          </div>
          <div className="right_ab">
            <div className=" messages skeleton">
              <div className="heading "></div>
            </div>
            <div className="right-search">
              <div className="search-bar_ab skeleton">
                <i className="r-search-line"></i>
                <input type="search" placeholder="" />
              </div>
            </div>
            <div className="freind-requests">
              <div className="skeleton"></div>
              <div className="request skeleton"></div>
              <div className="request skeleton"></div>
              <div className="request skeleton"></div>
              <div className="request skeleton"></div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Skeleton;
