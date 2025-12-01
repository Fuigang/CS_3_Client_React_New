// src/notmember/boardIndex/boardOver/BoardOver.jsx
import React from "react";
import styles from "./BoardOver.module.css";

const BoardOver = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className={styles.reportOverlay} onClick={onClose}>
      <div className={styles.reportBox} onClick={(e) => e.stopPropagation()}>

        <div className={styles.reportOptions}>
          <label><input type="radio" name="reason" /> 욕설 및 적절하지 않은 용어 사용</label>
          <label><input type="radio" name="reason" /> 광고성 게시물</label>
          <label><input type="radio" name="reason" /> 태교와 관련없는 글</label>
          <label><input type="radio" name="reason" /> 불법 복제 및 저작권 침해 글</label>
        </div>

        <div className={styles.reportBtnArea}>
          <button className={styles.reportCancelBtn} onClick={onClose}>취소</button>
          <button className={styles.reportSubmitBtn}>신고 완료</button>
        </div>
      </div>
    </div>
  );
};

export default BoardOver;
