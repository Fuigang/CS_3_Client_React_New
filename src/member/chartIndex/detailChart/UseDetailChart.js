import { FETAL_STANDARDS } from '../FetalStandardData';
import { caxios } from '../../../config/config';
import { calculateFetalWeek, calculateInfantWeek } from '../../utils/pregnancyUtils';
import { INFANT_STANDARDS } from '../InfantStandardData';

/**
 * 아기 측정 데이터를 가져와서 ECharts 옵션 생성
 */
export const UseDetailChart = (activeMenu, currentWeek, menuList, standardData, babySeq, babyDueDate, isFetalMode) => {
    const selectedMetricName = menuList[activeMenu];
    const metricKeyMap = isFetalMode
        ? { "몸무게": "EFW", "머리둘레": "HC", "머리직경": "OFD", "복부둘레": "AC", "허벅지 길이": "FL" }
        : { "몸무게": "BW", "머리둘레": "HC", "신장": "HT" };
    const selectedMetricKey = metricKeyMap[selectedMetricName];

    if (!selectedMetricKey) return {};


    return caxios.get(`/chart/detail?babySeq=${babySeq}`)
        .then(res => {
            const records = res.data;
            const actual = {};
            const metricKeys = Object.values(metricKeyMap);

            // measure_date -> 주차
            records.forEach(r => {
                let idx;
                if (isFetalMode) {
                    idx = calculateFetalWeek(babyDueDate, r.measure_date);
                } else {
                    idx = calculateInfantWeek(babyDueDate, r.measure_date);
                }
                if (!actual[idx]) actual[idx] = {};
                metricKeys.forEach(typeKey => {
                    if (r[typeKey] !== undefined) {
                        actual[idx][typeKey] = r[typeKey]; // Key (EFW) : Value (3.1) 저장
                        console.log("idx : ", idx, "r.measure_date: ", r.measure_date);
                    }
                });
                actual[idx][r.measure_type] = r.measure_value;
            });

            const START = isFetalMode ? 14 : 0;
            const END = isFetalMode ? 40 : 24;
            const xAxis = [];
            const avgData = [];
            const actualBabyData = [];
            let unit = '';

            //let unit = FETAL_STANDARDS[START_WEEK][selectedMetricKey].unit;

            for (let i = START; i <= END; i++) {
                xAxis.push(i);
                if (actual[i]?.[selectedMetricKey] !== undefined) {
                    actualBabyData.push(actual[i][selectedMetricKey]);
                } else {
                    actualBabyData.push(null); // 없으면 null
                }

                if (isFetalMode) {
                    avgData.push(FETAL_STANDARDS[i]?.[selectedMetricKey]?.avg ?? null);
                    unit = FETAL_STANDARDS[i]?.[selectedMetricKey]?.unit ?? '';
                } else {
                    avgData.push(INFANT_STANDARDS[i]?.[selectedMetricKey]?.avg ?? null);
                    unit = INFANT_STANDARDS[i]?.[selectedMetricKey]?.unit ?? '';
                }
            }

            return {
                title: { text: `${selectedMetricName} 성장 추이 `, left: 'center' },
                tooltip: {
                    trigger: 'axis',
                    formatter: (params) => {
                        const idx = params[0].name;
                        const values = params.map(p => `${p.marker} ${p.seriesName}: ${p.value} ${unit}`);
                        return `${isFetalMode ? '주차' : '개월'}: ${idx}<br/>` + values.join('<br/>');
                    }
                },
                legend: { data: ['태아 표준 기록 (평균)', '내 아기 성장 기록'], bottom: 0 },
                xAxis: { type: 'category', data: xAxis, name: '임신 주수 (Week)', boundaryGap: false },
                yAxis: { type: 'value', name: `측정값 (${unit})` },
                series: [
                    { name: '태아 표준 기록 (평균)', type: 'line', data: avgData, lineStyle: { color: 'green', width: 2 }, smooth: true, showSymbol: false },
                    { name: '내 아기 성장 기록', type: 'line', data: actualBabyData, lineStyle: { color: 'blue', width: 3 }, symbolSize: 8, connectNulls: true }
                ]
            };
        })
        .catch(err => {
            console.error("그래프 데이터 로딩 실패:", err);
            return {};
        });
};
