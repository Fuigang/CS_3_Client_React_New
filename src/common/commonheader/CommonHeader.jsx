import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "./CommonHeader.module.css";
import { HelpCircle, Menu } from "lucide-react";
import log from "./imgs/log.svg";
import BabySideNavi from "../babySideNavi/BabySideNavi";

const CommonHeader = ({ isLogin }) => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const location = useLocation();

  const toggleSideNav = () => setIsNavOpen(!isNavOpen);
  const closeSideNav = () => setIsNavOpen(false);

  const isPathActive = (path) => location.pathname === path;

  return (
    <div>
      {isNavOpen && <BabySideNavi onClose={closeSideNav} />}

      <div className={styles.topbar}>
        <div className={styles.headerContentWrapper}>
          {/* Left Section */}
          <div className={styles.leftSection}>
            <Link to="/">
              <img src={log} className={styles.logoIcon} alt="로고 이미지" />
            </Link>

            <div className={styles.menuItems}>
              {/* 커뮤니티 메뉴 (항상 보임) */}
              <div
                className={`${styles.menuItemBox} ${
                  isPathActive("/board") ? styles.menuActive : ""
                }`}
              >
                <Link to="/board" className={styles.menuItem}>
                  커뮤니티
                </Link>
              </div>

              {/* 로그인한 경우만 마이페이지 표시 */}
              {isLogin && (
                <div
                  className={`${styles.menuItemBox} ${
                    isPathActive("/mypage") ? styles.menuActive : ""
                  }`}
                >
                  <Link to="/mypage" className={styles.menuItem}>
                    마이페이지
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Right Section */}
          <div className={styles.rightSection}>
            {/* 로그인한 경우만 아이콘 표시 */}
            {isLogin && (
              <>
                <button className={styles.iconButton}>
                  <HelpCircle className={styles.helpIcon} />
                </button>
                <button onClick={toggleSideNav} className={styles.iconButton}>
                  <Menu className={styles.menuIcon} />
                </button>
              </>
            )}

            {/* 로그인 안했을 때만 로그인/회원가입 버튼 표시 */}
            {!isLogin && (
              <div className={styles.authButtons}>
                <Link to="/signup" className={styles.signUpBtn}>
                  회원가입
                </Link>
                <Link to="/login" className={styles.loginBtn}>
                  로그인
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommonHeader;
