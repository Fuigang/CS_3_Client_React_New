import { Routes, Route, useNavigate } from "react-router-dom";
import EverydayNavi from "../everydayNavi/EverydayNavi";
import EverydayDetail from "../everydayDetail/EverydayDetail";
import EverydayWrite from "../everydayWrite/EverydayWrite";
import styles from "./BornDiaryIndex.module.css";

//하루일기 인덱스 "/diary/" 여기까지 라우팅
const BornDiaryIndex = () => {
  const navigate = useNavigate();

  // '산모수첩' 버튼 클릭 시
  const handleNavigateBack = () => {
    navigate(-1); // 여기서는 간단히 이전 페이지로 돌아가도록 설정
  };

  return (
    <div className={styles.diaryIndexWrapper}>
      {/* 상단 산모수첩 버튼 영역 */}
      <div className={styles.topBar}>
        <button className={styles.backButton} onClick={handleNavigateBack}>
          산모수첩
        </button>
      </div>

      {/* 좌측 네비와 우측 컨텐츠를 담는 컨테이너 */}
      <div className={styles.contentLayout}>
        <div className={styles.leftPanel}>
          {/*하루일기 좌측 네비바(통계 등 나오는 곳)*/}
          <EverydayNavi />
        </div>

        <div className={styles.rightContent}>
          {/*하루일기 디테일 or 작성 페이지 라우팅*/}
          <Routes>
            <Route path="" element={<EverydayDetail />} /> {/*디테일 다이어리*/}
            <Route path="everydaywrite" element={<EverydayWrite />} />
            {/*다이어리 작성*/}
          </Routes>
        </div>
      </div>
    </div>
  );
};
export default BornDiaryIndex;
