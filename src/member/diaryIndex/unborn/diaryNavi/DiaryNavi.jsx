import React, { useState } from "react";
import styles from "./DiaryNavi.module.css";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

// 주차 데이터
const initialWeeks = [
  { week: 13, id: 13, diaries: [] },
  { week: 12, id: 12, diaries: [1, 2, 3, 4, 5, 6, 7] }, // 스크롤 테스트용 데이터
  { week: 11, id: 11, diaries: [] },
  { week: 10, id: 10, diaries: [] },
];

// 일기 항목 컴포넌트
const DiaryItem = ({ title = "산모일기 제목", date = "작성 날짜" }) => (
  <div className={styles.diaryItemContent}>
    <b className={styles.diaryTitle}>{title}</b>
    <div className={styles.diaryDate}>{date}</div>
  </div>
);

// 산모수첩 주차별 네비
const DiaryNavi = () => {
  const [selectedWeek, setSelectedWeek] = useState(null); // 초기값: 아무것도 선택되지 않음
  const [selectedDiaryId, setSelectedDiaryId] = useState(null); // 일기 선택 상태 추가

  // 주차 항목 클릭 핸들러
  const handleWeekClick = (week) => {
    setSelectedWeek((prevWeek) => (prevWeek === week ? null : week));
  };

  const navigate = useNavigate();

  // 플러스 버튼 클릭 핸들러 (다이어리 작성 페이지로 이동)
  const handleAddDiary = (e, week) => {
    e.stopPropagation(); // 목록 접힘 방지
    navigate("write");
    console.log(`[${week}주차] 다이어리 작성 페이지로 이동`);
  };

  // 일기 상세 보기 핸들러
  const handleViewDiary = (e, week, id) => {
    e.stopPropagation(); // 목록 접힘 방지

    // 클릭된 일기의 고유 ID를 생성하여 상태에 저장
    const newId = `${week}-${id}`;
    setSelectedDiaryId(newId);

    console.log(`[${week}주차] ${id}번째 일기 상세 보기`);
  };

  return (
    <div className={styles.naviContainer}>
      {initialWeeks.map((w) => {
        const isSelected = selectedWeek === w.week;

        // 선택되면 selected, 아니면 inactive 클래스를 적용
        const blockClass = isSelected
          ? styles.weekBlockSelected
          : styles.weekBlockInactive;

        return (
          <div
            key={w.id}
            className={blockClass}
            onClick={() => handleWeekClick(w.week)}
          >
            {/* 주차 제목과 플러스 버튼을 포함하는 토글 헤더 영역 (스타일링/컨테이너) */}
            <div className={styles.weekToggleHeader}>
              {/* 1. 주차 태그 (항상 표시) */}
              <div className={styles.weekTag}>
                <b className={styles.weekText}>{w.week}주차</b>
              </div>

              {/* 2. 플러스 버튼 (선택된 경우에만 표시) */}
              {isSelected && (
                <button
                  className={styles.addButton}
                  onClick={(e) => handleAddDiary(e, w.week)}
                >
                  <Plus size={20} color="#fff" />
                </button>
              )}
            </div>

            {/* 일기 목록 래퍼 (펼쳐짐 애니메이션 적용) */}
            <div
              className={styles.diaryListWrapper}
              style={{
                maxHeight: isSelected ? "400px" : "0",
                opacity: isSelected ? 1 : 0,
                // 패딩도 애니메이션 대상에 포함시키기 위해 동적 설정
                paddingTop: isSelected ? "10px" : "0",
              }}
            >
              <div className={styles.diaryList}>
                {w.diaries.map((d, i) => {
                  // 현재 일기의 고유 ID와 선택 상태 확인
                  const currentId = `${w.week}-${d}`;
                  const isSelectedDiary = selectedDiaryId === currentId;

                  return (
                    <button
                      key={i}
                      // isSelectedDiary 값에 따라 클래스 동적 적용
                      className={`${styles.diaryButton} ${
                        isSelectedDiary ? styles.diaryButtonSelected : ""
                      }`}
                      onClick={(e) => handleViewDiary(e, w.week, d)}
                    >
                      <DiaryItem
                        title={`[${w.week}주차] ${d}번째 일기`}
                        date={`2025-11-25`}
                      />
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default DiaryNavi;
