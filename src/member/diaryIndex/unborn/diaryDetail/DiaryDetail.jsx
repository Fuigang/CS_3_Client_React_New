import React from "react";
import styles from "./DiaryDetail.module.css";
import { Link, useNavigate } from "react-router-dom";

// 산모수첩 상세 보기
const DiaryDetail = ({ selectedWeek }) => {
  const navigate = useNavigate();

  // 선택된 주차에 일기가 존재하는지 여부 (임시 로직)
  const diaryExistsForSelectedWeek =
    selectedWeek !== null && selectedWeek !== "1"; // 예: 1주차는 데이터 없음
  const diaryContent = `${selectedWeek}`; // 임시 내용

  /* 선택된 주차가 없을 때 */
  if (selectedWeek === null) {
    return (
      <div className={styles.emptyStateContainer}>
        <div className={styles.emptyStateMessage}>
          주차를 선택하여 일기를 작성해주세요
        </div>
      </div>
    );
  }

  /* 선택된 주차는 있으나 데이터가 없을 때 */
  if (!diaryExistsForSelectedWeek) {
    return (
      <div className={styles.emptyStateContainer}>
        <div className={styles.emptyStateMessage}>
          '{selectedWeek} 주차'의 일기를 작성해주세요
        </div>
        <Link to="write" className={styles.writeLink}>
          새 기록 남기기
        </Link>
      </div>
    );
  }

  /* 선택된 주차에 일기 내용이 있을 때 */
  return (
    <div className={styles.detailContainer}>
      {/* 제목/작성자 */}
      <div className={styles.header}>
        <h2 className={styles.title}>
          [{selectedWeek}주차] 여기 제목이 들어갈 거예요
        </h2>
        <span className={styles.writer}>작성자: 사용자 닉네임</span>
      </div>

      {/* 내용 */}
      <div
        className={styles.contentBox}
        dangerouslySetInnerHTML={{ __html: diaryContent }}
      />

      {/* 수정/삭제 버튼 */}
      <div className={styles.actionButtons}>
        <button
          className={styles.deleteButton}
          onClick={() => alert("삭제 기능 구현 예정")}
        >
          삭제
        </button>
        <button className={styles.editButton} onClick={() => navigate("write")}>
          수정
        </button>
      </div>
    </div>
  );
};

export default DiaryDetail;
