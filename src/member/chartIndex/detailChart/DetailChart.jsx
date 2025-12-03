import React, { useState, useEffect } from "react";
import styles from "./DetailChart.module.css";
import { UseDetailChart } from "./UseDetailChart";
import ReactECharts from 'echarts-for-react';
import useAuthStore from "../../../store/useStore";
//디테일 차트 인덱스 "/chart/detail" 여기까지 라우팅
const DetailChart = ({ menuList, activeMenu, currentWeek, standardData, isFetalMode }) => {

  const [option, setOption] = useState({});
  const babySeq = useAuthStore((state) => state.babySeq);
  const babyDueDate = useAuthStore((state) => state.babyDueDate);


  useEffect(() => {
    if (!babySeq || !babyDueDate) {
      console.warn("DetailChart: babySeq 또는 dueDate 없음");
      return;
    }

    const chartOption = UseDetailChart(
      activeMenu,
      currentWeek,
      menuList,
      standardData,
      babySeq,
      babyDueDate,
      isFetalMode
    );
    setOption(chartOption);
  }, [activeMenu, currentWeek, menuList, standardData, babySeq, babyDueDate, isFetalMode]);


  // 3. 렌더링
  return (
    <div className={styles.contentBox}>
      <div className={styles.chartArea}>
        {/* 3. ReactECharts를 사용하여 꺾은선 그래프 렌더링 */}

        <ReactECharts
          option={option}
          style={{ height: '100%', width: '100%' }}

        />
      </div>
    </div>

  );

};

export default DetailChart;