let currentDate = new Date(); // 현재 날짜를 가져옵니다.


// 년도와 월을 업데이트하는 함수
const updateYearMonth = () => {
    const yearElement = document.querySelector('.year'); // 'year' 클래스를 가진 엘리먼트를 선택합니다.
    const monthElement = document.querySelector('.month'); // 'month' 클래스를 가진 엘리먼트를 선택합니다.

    const viewYear = currentDate.getFullYear();
    const viewMonth = currentDate.getMonth() + 1;


    yearElement.textContent = viewYear; // 연도를 엘리먼트에 표시합니다.
    monthElement.textContent = viewMonth; // 월을 엘리먼트에 표시합니다.
};

// 달력을 렌더링하는 함수
const renderCalendar = () => {

    updateYearMonth(); // 년도와 월을 업데이트합니다.

    const viewYear = currentDate.getFullYear();
    const viewMonth = currentDate.getMonth(); // +1을 제거합니다.

    // 날짜 계산을 시작합니다.
    const prevLast = new Date(viewYear, viewMonth, 0); // 이전 달의 마지막 날짜를 가져옵니다.
    const thisLast = new Date(viewYear, viewMonth + 1, 0); // 현재 달의 마지막 날짜를 가져옵니다.

    const PLDate = prevLast.getDate(); // 이전 달의 마지막 날짜를 가져옵니다.
    const PLDay = prevLast.getDay(); // 이전 달의 마지막 날짜의 요일을 가져옵니다.
    const TLDate = thisLast.getDate(); // 현재 달의 마지막 날짜를 가져옵니다.
    const TLDay = thisLast.getDay(); // 현재 달의 마지막 날짜의 요일을 가져옵니다.

    const prevDates = []; // 이전 달의 날짜를 저장할 배열
    const thisDates = [...Array(TLDate + 1).keys()].slice(1); // 현재 달의 날짜를 저장할 배열
    const nextDates = []; // 다음 달의 날짜를 저장할 배열

    if (PLDay !== 6) {
        for (let i = 0; i < PLDay + 1; i++) {
            prevDates.unshift(PLDate - i); // 이전 달의 날짜를 배열에 추가합니다.
        }
    }

    for (let i = 1; i < 7 - TLDay; i++) {
        nextDates.push(i); // 다음 달의 날짜를 배열에 추가합니다.
    }

    const dates = prevDates.concat(thisDates, nextDates); // 모든 날짜를 합친 배열을 생성합니다.
    const firstDateIndex = dates.indexOf(1); // 배열에서 첫 번째 날짜의 인덱스를 찾습니다.
    const lastDateIndex = dates.lastIndexOf(TLDate); // 배열에서 마지막 날짜의 인덱스를 찾습니다.

   // 날짜를 렌더링합니다.
// 날짜 배열을 forEach 루프로 반복합니다.
dates.forEach((calDate, i) => {
    // 조건을 확인하여 'condition' 변수에 'this' 또는 'other' 값을 할당합니다.
    // 'firstDateIndex'와 'lastDateIndex' 범위 내의 날짜는 'this', 그렇지 않은 경우 'other'로 표시됩니다.
    const condition = i >= firstDateIndex && i < lastDateIndex + 1 ? 'this' : 'other';

    // 날짜를 나타내는 <div> 요소를 시작합니다.
    let dateHtml = `<div class="date ${condition}"><span class="date-number">${calDate}</span>`;

    // 'viewMonth + 1'을 사용하여 월을 정확하게 표시
    const fullDate = `${viewYear}-${String(viewMonth + 1).padStart(2, '0')}-${String(calDate).padStart(2, '0')}`;

    // 'allMenus' 배열에서 현재 날짜에 해당하는 메뉴를 찾습니다.
    const menuForDate = allMenus.find(menu => menu.date === fullDate) || { breakfast: '영업일이 아닙니다.', lunch: '영업일이 아닙니다.' };

    // 메뉴 정보가 있을 경우에만 HTML에 추가
    if (menuForDate && (menuForDate.breakfast || menuForDate.lunch)) {
        dateHtml += `
            <span class="menu-top-left">아침메뉴</span>
            <div class="menu-info">${menuForDate.breakfast}</div>
            <span class="menu-bottom-left">점심메뉴</span>
            <div class="menu-info">${menuForDate.lunch}</div>
        `;
    }

    // 날짜를 나타내는 <div> 요소를 닫습니다.
    dateHtml += `</div>`;

    // 변경된 HTML 문자열을 배열 'dates'의 해당 인덱스에 할당합니다.
    dates[i] = dateHtml;
});


    document.querySelector('.dates').innerHTML = dates.join(''); // 달력을 업데이트합니다.

    const today = new Date(); // 현재 날짜를 가져옵니다.
    if (viewMonth === today.getMonth() && viewYear === today.getFullYear()) {
        for (let date of document.querySelectorAll('.this')) {
            if (+date.innerText === today.getDate()) {
                date.classList.add('today'); // 오늘 날짜를 강조 표시합니다.
                break;
            }
        }
    }
};

renderCalendar(); // 달력을 초기 렌더링합니다.

// 이전 달로 이동하는 함수
const prevMonth = () => {
    currentDate.setMonth(currentDate.getMonth() - 1); // 현재 월에 1을 빼고 업데이트합니다.
    renderCalendar(); // 달력을 다시 렌더링합니다.
};

// 다음 달로 이동하는 함수
const nextMonth = () => {
    currentDate.setMonth(currentDate.getMonth() + 1); // 현재 월에 1을 더하고 업데이트합니다.
    renderCalendar(); // 달력을 다시 렌더링합니다.
};

// 오늘 날짜로 이동하는 함수
const goToday = () => {
    currentDate = new Date(); // 현재 날짜로 업데이트합니다.
    renderCalendar(); // 달력을 다시 렌더링합니다.
};

// 이전 달, 다음 달, 오늘 버튼에 클릭 이벤트 리스너를 추가합니다.
document.querySelector('.go-prev').addEventListener('click', prevMonth);
document.querySelector('.go-next').addEventListener('click', nextMonth);
document.querySelector('.go-today').addEventListener('click', goToday);
