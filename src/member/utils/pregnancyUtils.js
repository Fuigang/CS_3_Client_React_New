// src/member/utils/pregnancyUtils.js

const MS_PER_DAY = 1000 * 60 * 60 * 24;
const TOTAL_DAYS = 280; // 40주 = 280일

/**
 * 날짜 문자열 (YYYY-MM-DD)을 Date 객체로 파싱합니다.
 * (시간대 문제 방지를 위해 UTC 자정 기준으로 설정)
 */
const parseDate = (dateString) => {
    // T00:00:00Z를 붙여 UTC 기준으로 파싱하여 로컬 시간대에 따른 오차를 방지합니다.
    return new Date(dateString + 'T00:00:00Z'); 
};

/**
 * 1. 태아 주차 계산 (FETAL WEEK)
 * @param {string} dueDateStr - 출산 예정일 (EDD, 'YYYY-MM-DD')
 * @param {string} measureDateStr - 측정일 (주로 '오늘' 날짜)
 * @returns {number} 계산된 임신 주차 (1 ~ 40)
 */
export const calculateFetalWeek = (dueDateStr, measureDateStr) => {
    const dueDate = parseDate(dueDateStr);
    const measureDate = parseDate(measureDateStr);
    
    // 임신 시작일 (Conception Start) = dueDate - 40주
    const conceptionStartMs = dueDate.getTime() - (TOTAL_DAYS * MS_PER_DAY);
    
    // 임신 시작일로부터 측정일까지 지난 일수 계산
    let daysPassed = Math.floor((measureDate.getTime() - conceptionStartMs) / MS_PER_DAY);
    
    if (daysPassed < 0) daysPassed = 0;

    // 주차 계산: (일수 / 7) + 1
    let week = Math.floor(daysPassed / 7) + 1;
    
    // 주차 범위를 1주 ~ 40주로 제한
    if (week < 1) week = 1;
    if (week > 40) week = 40;
    
    return week;
};


/**
 * 2. 영유아 주차 계산 (INFANT WEEK)
 * @param {string} birthDateStr - 실제 출생일 ('YYYY-MM-DD')
 * @param {string} measureDateStr - 측정일
 * @returns {number} 계산된 생후 주차 (1 ~ )
 */
export const calculateInfantWeek = (birthDateStr, measureDateStr) => {
    const birthDate = parseDate(birthDateStr);
    const measureDate = parseDate(measureDateStr);

    // 출생일로부터 측정일까지 지난 일수 계산
    let daysPassed = Math.floor((measureDate.getTime() - birthDate.getTime()) / MS_PER_DAY);
    
    if (daysPassed < 0) daysPassed = 0;

    // 주차 계산: (일수 / 7) + 1
    let week = Math.floor(daysPassed / 7) + 1;
    
    return week;
};


/**
 * 3. 특정 주차의 시작일과 종료일 계산 (DB 조회 범위 설정에 사용)
 * @param {string} dueDateStr - 출산 예정일 (EDD)
 * @param {number} week - 특정 주차 (예: 28)
 * @returns {[string, string]} [시작일, 종료일] (YYYY-MM-DD 형식)
 */
export const fetalWeekStartEnd = (dueDateStr, week) => {
    const dueDate = parseDate(dueDateStr);
    
    // 임신 시작일 = DueDate - 40주
    const conceptionStartMs = dueDate.getTime() - (TOTAL_DAYS * MS_PER_DAY);
    
    // 주차 시작일 = 임신 시작일 + (week - 1)주
    const startMs = conceptionStartMs + ((week - 1) * 7 * MS_PER_DAY);
    const start = new Date(startMs);

    // 주차 종료일 = 주차 시작일 + 6일
    const endMs = startMs + (6 * MS_PER_DAY);
    const end = new Date(endMs);

    // 날짜를 YYYY-MM-DD 포맷으로 변환 (toISOString은 UTC 기반)
    const formatDate = (date) => date.toISOString().split('T')[0];
    
    return [formatDate(start), formatDate(end)]; 
};