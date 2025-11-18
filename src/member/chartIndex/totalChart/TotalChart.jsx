
import React from "react";
import styles from "./TotalChart.module.css";
import ReactECharts from 'echarts-for-react';

// TotalChart는 ChartIndex로부터 필요한 모든 데이터를 props로 받습니다.
const TotalChart = ({ menuList, activeMenu, currentWeek, standardData, actualData }) => {



  // 2. [Default] activeMenu가 0일 경우, ECharts 옵션 생성 및 차트 렌더링을 진행합니다.
  const getRadarOption = () => {
    if (!standardData || !actualData) {
      return {};
    }

    // (이전과 동일한 데이터 변환 및 옵션 설정 로직)
    const indicators = Object.keys(standardData).map(key => ({
      name: standardData[key].name, max: standardData[key].max * 1.05, unit: standardData[key].unit
    }));
    const averageValues = Object.keys(standardData).map(key => standardData[key].avg);
    const actualValues = Object.keys(standardData).map(key => actualData[key] || 0);

    return {
      title: { text: `임신 ${currentWeek}주 태아 성장 분석`, left: 'center' },
      legend: { data: ['내 아기 측정치', '표준 평균'], bottom: 0 },
      radar: {
        indicator: indicators,
        name: { formatter: (value, indicator) => `${value} (${indicator.unit})`, /* ... */ },
        radius: '65%',
      },
      series: [{
        name: `측정 vs 표준 (${currentWeek}주)`,
        type: 'radar',
        data: [
          { value: actualValues, name: '내 아기 측정치', symbolSize: 8 },
          { value: averageValues, name: '표준 평균', symbolSize: 0 }
        ]
      }]
    };
  };


  return (
    <div className={styles.contentBox}>
      {/* 실제 차트 들어가는 자리 */}
      <div className={styles.chartArea}>
        {/* 3. activeMenu=0이 Default이므로, 바로 차트를 렌더링합니다. */}
        <ReactECharts
          option={getRadarOption()}
          style={{ height: '100%', width: '100%' }}
        />
      </div>
    </div>
  );
};

export default TotalChart;