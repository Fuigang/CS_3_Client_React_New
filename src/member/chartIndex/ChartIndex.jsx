import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { useMemo, useState } from "react";
import TotalChart from "./totalChart/TotalChart";
import DetailChart from "./detailChart/DetailChart";
import ChartInput from "./chartInput/ChartInput"; // 오른쪽 입력 폼 컴포넌트
import styles from "./ChartIndex.module.css";
import { FETAL_STANDARDS } from "./FetalStandardData";

const ChartIndex = () => {
  // 상단 메뉴튼버튼
  const menuList = [
    "전체",
    "몸무게",
    "머리직경",
    "머리둘레",
    "복부둘레",
    "허벅지 길이",
  ];

  const MOCK_ACTUAL_MEASUREMENTS = {
    // EFW, HC, OFD, AC, FL 순서의 값들을 넣습니다.
    28: { EFW: 1500, HC: 265.0, OFD: 95.0, AC: 235.0, FL: 57.0 }, // 28주 실측치
    29: { EFW: 1850, HC: 275.0, OFD: 97.0, AC: 245.0, FL: 59.0 }, // 29주 실측치
    // ... (다른 주차 데이터)
  };


  const [currentWeek, setCurrentWeek] = useState(28);
  const [activeMenu, setActiveMenu] = useState(0);

  // 정적 표준 데이터
  const currentStandardData = useMemo(() => {
    // FETAL_STANDARDS에서 현재 주차의 Min/Avg/Max 데이터를 추출합니다.
    return FETAL_STANDARDS[currentWeek];
  }, [currentWeek]);

  console.log(activeMenu);
  // 실제 입력 데이터
  const currentActualData = useMemo(() => {
    // MOCK 데이터에서 현재 주차의 아기 실제 측정 데이터를 추출합니다.
    return MOCK_ACTUAL_MEASUREMENTS[currentWeek];
  }, [currentWeek]);

  return (
    <div className={styles.body}>
      {/* 상단 버튼 영역 */}
      <div className={styles.menuSection}>
        {menuList.map((item, idx) => (
          <button
            key={idx}
            className={
              idx === activeMenu ? styles.menuActive : styles.menuButton
            }
            onClick={() => setActiveMenu(idx)} // 클릭 이벤트 추가
          >
            {item}
          </button>
        ))}
      </div>

      {/* 메인 컨텐츠 영역 */}
      <div className={styles.contentWrapper}>
        <div className={styles.chartRouteArea}>
          <Routes>
            {/* TotalChart와 DetailChart에 필요한 데이터를 props로 전달 */}
            <Route
              path=""
              element={
                <TotalChart menuList={menuList} activeMenu={activeMenu}
                  currentWeek={currentWeek}          // 현재 주차 (State)
                  standardData={currentStandardData}  // 표준 데이터 (JS File)
                  actualData={currentActualData}      // 실제 측정 데이터 (DB Mock)


                />
              }
            />
            <Route
              path="detail"
              element={
                <DetailChart menuList={menuList} activeMenu={activeMenu}
                  currentWeek={currentWeek}
                  standardData={currentStandardData}
                  actualData={currentActualData} />
              }
            />
          </Routes>
        </div>

        {/* 입력폼 */}
        <ChartInput menuList={menuList} activeMenu={activeMenu} />
      </div>
    </div>
  );
};
export default ChartIndex;
