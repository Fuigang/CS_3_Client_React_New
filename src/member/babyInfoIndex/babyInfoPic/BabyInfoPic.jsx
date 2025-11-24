import styles from "./BabyInfoPic.module.css";
import backImg from "./img/back.png";
import jionebabyImg from "./img/jionebaby.png";
import childrenImg from "./img/children.png";

const BabyInfoPic = ({ type = "mom" }) => {
  return (
    <div className={styles.leftcontainer}>
      {/* 배경 이미지 */}
      <img src={backImg} alt="back" className={styles.backImage} />

      {/* 아기 이미지 */}
      <img
        src={type === "mom" ? jionebabyImg : childrenImg}
        alt="baby"
        className={styles.jionewbabyImage}
      />
    </div>
  );
};

export default BabyInfoPic;
