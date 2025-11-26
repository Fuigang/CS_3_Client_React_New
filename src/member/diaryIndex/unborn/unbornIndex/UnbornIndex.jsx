import { useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import DiaryNavi from "../diaryNavi/DiaryNavi";
import DiaryDetail from "../diaryDetail/DiaryDetail";
import DiaryWrite from "../diaryWrite/DiaryWrite";
import styles from "./UnbornIndex.module.css";

//산모수첩 인덱스 "/diary/" 여기까지 라우팅
const UnBornDiaryIndex = () => {
  return (
    <div className={styles.container}>
      <div className={styles.left}>
        {/*산모수첩 좌측 주차별네비바*/}
        <DiaryNavi />
      </div>

      <div className={styles.rigth}>
        {/*산모수첩 디테일 or 작성 페이지 라우팅*/}
        <Routes>
          <Route path="" element={<DiaryDetail />} /> {/*디테일 다이어리*/}
          <Route path="write" element={<DiaryWrite />} /> {/*다이어리 작성*/}
        </Routes>
      </div>
    </div>
  );
};
export default UnBornDiaryIndex;


