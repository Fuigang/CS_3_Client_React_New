import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./DiaryWrite.module.css";

const DiaryWrite = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const navigate = useNavigate();

  const handleComplete = () => {
    if (!title.trim()) return alert("제목을 입력해주세요");

    // 완료 시 이동할 공간

    navigate(-1);
  };

  return (
    <div className={styles.container}>
      {/* 제목 입력 */}
      <div className={styles.formGroup}>
        <label className={styles.formLabel}>제목</label>
        <div className={styles.inputField}>
          <input
            type="text"
            placeholder="제목을 입력하세요"
            className={styles.inputElement}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
      </div>

      {/* 글 작성 */}
      <label className={styles.formLabel}>글 작성</label>
      <div className={styles.editorArea}>
        <div className={styles.editorHeader}>
          <span className={styles.editorLabel}>에디터 위치</span>
        </div>
        <textarea
          placeholder="내용을 입력하세요..."
          className={styles.editorInput}
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>

      {/* 버튼 */}
      <div className={styles.actionFooter}>
        <button className={styles.backButton} onClick={() => navigate(-1)}>
          뒤로가기
        </button>
        <button className={styles.completeButton} onClick={handleComplete}>
          완료
        </button>
      </div>
    </div>
  );
};

export default DiaryWrite;
