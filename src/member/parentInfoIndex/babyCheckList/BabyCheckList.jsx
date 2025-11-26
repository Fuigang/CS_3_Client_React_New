import React from "react";
import styles from "./BabyCheckList.module.css";
import UseBabyCheckList from "./UseBabyCheckList";

const BabyCheckList = () => {
  const {
    data, handleClick
  } = UseBabyCheckList();

  return (
    <div className={styles.container}>
      {data.map((data, index) => (
        <div
          key={data.record_seq}
          className={data.type === "past" ? styles.past : styles.future}
        >
          <div className={data.type === "past" ? styles.pastLeft : styles.futureLeft}>
            <div className={data.type === "past" ? styles.pastBadge : styles.futureBadge}>
              {data.badge}
            </div>
            <div className={data.type === "past" ? styles.pastContent : styles.futureContent}>
              <div className={data.type === "past" ? styles.pastText : styles.futureText}>
                {data.text}
              </div>
              <div className={data.type === "past" ? styles.pastDate : styles.futureDate}>
                {data.date}
              </div>
            </div>
          </div>

          <div className={data.type === "past" ? styles.pastAction : styles.futureAction}>
            <div className={data.type === "past" ? styles.pastDivider : styles.futureDivider}></div>
            <button className={data.type === "past" ? styles.pastButton : styles.futureButton} onClick={() => handleClick(data.test_code)}>
              {data.buttonText}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BabyCheckList;
