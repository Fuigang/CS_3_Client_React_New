import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { useMemo, useState, useEffect } from "react";
import TotalChart from "./totalChart/TotalChart";
import DetailChart from "./detailChart/DetailChart";
import ChartInput from "./chartInput/ChartInput"; // 오른쪽 입력 폼 컴포넌트
import styles from "./ChartIndex.module.css";
import { FETAL_STANDARDS } from "./FetalStandardData";
import { caxios } from "../../config/config";
import { useChartIndex } from "./UseChartIndex";

// const ChartIndex = () => {
//   // 상단 메뉴튼버튼
//   const menuList = [
//     "성장",
//     "몸무게",
//     "머리직경",
//     "머리둘레",
//     "복부둘레",
//     "허벅지 길이",
//   ];


//   const [currentWeek, setCurrentWeek] = useState(14);
//   const [activeMenu, setActiveMenu] = useState(0);



//   const [actualData, setActualData] = useState(null);
//   // 정적 표준 데이터
//   const currentStandardData = useMemo(() => {
//     // FETAL_STANDARDS에서 현재 주차의 Min/Avg/Max 데이터를 추출합니다.
//     return FETAL_STANDARDS[currentWeek];
//   }, [currentWeek]);

//   console.log(activeMenu);
//   // 실제 입력 데이터


//   //  2. 데이터 조회 비동기 로직 (caxios 사용)
//   useEffect(() => {
//     const fetchCurrentData = async () => {
//       setActualData(null); // 로딩 중 상태

//       try {
//         //  1. caxios.get 호출: 파라미터를 params 객체로 전달합니다.
//         const response = await caxios.get(`/api/fetal/measurement/current`, {
//           params: {
//             babyId: 1, //  실제 아기 ID로 대체해야 합니다.
//             week: currentWeek
//           }
//         });

//         const data = response.data;

//         // 2. 데이터가 없는 경우 처리 (API가 빈 객체 {} 를 반환했을 때)
//         if (!data || Object.keys(data).length === 0) {
//           setActualData({});
//           return;
//         }

//         // 3. 데이터 저장
//         setActualData(data);

//       } catch (error) {
//         //  4. Axios 오류 처리: 4xx/5xx 응답은 catch 블록으로 들어옵니다.
//         if (error.response && error.response.status === 404) {
//           // 404 Not Found는 데이터 없음으로 간주
//           setActualData({});
//         } else {
//           console.error("데이터 조회 오류:", error);
//           setActualData({});
//         }
//       }
//     };

//     fetchCurrentData();
//   }, [currentWeek]); // currentWeek가 바뀔 때마다 실행


const ChartIndex = () => {
  // 2.  Hook을 호출하여 모든 상태와 데이터를 가져옵니다.
  const {
    menuList,
    currentWeek,
    activeMenu,
    setActiveMenu,
    currentStandardData,
    currentActualData: actualData,
  } = useChartIndex();

  // 3.  로딩 상태 처리
  if (currentWeek === 0 || actualData === null || !currentStandardData) {
    return <div className={styles.loading}>데이터를 계산하고 로딩 중입니다...</div>;
  }




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
              path="/" // URL은 고정됩니다.
              element={
                //  activeMenu 값에 따라 TotalChart와 DetailChart 중 하나만 렌더링됩니다.
                activeMenu === 0 ? (
                  <TotalChart
                    menuList={menuList} activeMenu={activeMenu}
                    currentWeek={currentWeek}
                    standardData={currentStandardData}
                    actualData={actualData}
                  />
                ) : (
                  // activeMenu가 1 이상일 때 DetailChart가 렌더링됩니다.
                  <DetailChart menuList={menuList} activeMenu={activeMenu}
                    currentWeek={currentWeek}
                    standardData={currentStandardData}
                    actualData={actualData}
                  />
                )
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
