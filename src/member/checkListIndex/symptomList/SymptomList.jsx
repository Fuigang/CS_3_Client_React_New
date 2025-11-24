import { motion } from "framer-motion";
import styles from "./SymptomList.module.css";

// 더미 데이터
const SYMPTOM_DATA = [
  {
    week: "24개월 이후",
    checks: [
      { id: 1, title: "4차 영유아 건강검진" },
      { id: 2, title: "독감 예방접종" },
    ],
  },
  { week: "18개월 이후", checks: [{ id: 3, title: "3차 영유아 건강검진" }] },
];

// CheckItem 컴포넌트
const CheckItem = ({ check, index }) => {
  return (
    <motion.div
      className={styles.checkWrapper}
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5, ease: "easeOut" }}
    >
      <div className={styles.checkRow}>
        <div className={styles.checkLeft}>
          <div className={styles.checkIconDone} />
          <span className={styles.checkTitle}>{check.title}</span>
        </div>
      </div>
    </motion.div>
  );
};

// WeekSection 컴포넌트
const WeekSection = ({ data, index }) => {
  return (
    <motion.div
      className={styles.weekSection}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.2, ease: "easeOut" }}
    >
      <div className={styles.itemActive} />
      <div className={styles.weekContent}>
        <div className={styles.weekTitleWrapper}>
          <span className={styles.weekTitle}>{data.week}</span>
        </div>
        <div className={styles.checkList}>
          {data.checks.map((check, i) => (
            <CheckItem key={check.id} check={check} index={i} />
          ))}
        </div>
      </div>
    </motion.div>
  );
};

// SymptomList 메인
const SymptomList = () => {
  return (
    <div className={styles.main}>
      <div className={styles.lineWrapper}>
        <div className={styles.timelineLine} />
      </div>

      <div className={styles.sectionList}>
        {SYMPTOM_DATA.map((section, i) => (
          <WeekSection key={i} data={section} index={i} />
        ))}
      </div>
    </div>
  );
};

export default SymptomList;
