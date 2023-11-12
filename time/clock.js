window.onload = () =>{
    clock(); //함수가 onload밖에 있어도 호출은 onload안에서 하니 ㄱㅊ
}

function clock(){//함수의 위치(onload 안,밖)는 상관없음.
    setInterval(()=>{ //업데이트 위해 setInterval
        const currentDate = new Date(); //현재 시간을 모두 받아오기
        const currentYear = currentDate.getFullYear(); //연도
        const currentMonth = currentDate.getMonth() + 1;//월
        //월은 0부터 시작하기 때문에 값에 +1을 해줘야 한다.(외국에선 1월X 명칭으로하기 때문)
        const currentDay = currentDate.getDate();//일 (1부터 시작)
        const currentWeek = currentDate.getDay(); //요일. 변환작업 필요
        //요일은 일요일부터 0으로 시작
    
        const currentHour = currentDate.getHours();//시 24시기준
        const currentMin = currentDate.getMinutes();//분
        const currentSec = currentDate.getSeconds();//초. 
        //시계 역할할 수 없음 -> 로드될때 값 1번만 받아옴. 초 등은 계속 바꿔줘야 함. -> 1초에 한번씩 시간을 받아오도록 하기 위해 setInterval 안에 넣는다.
        
        const dateResult = `현재 시간은 : 
            ${String(currentHour).padStart(2,'0')} /
            ${String(currentMin).padStart(2,'0')} /
            ${String(currentSec).padStart(2,'0')}입니다.`;
            //숫자 -> 문자열로 바꿈, padStart 2자리숫자 표현, 앞에'0'붙인다.0
        document.querySelector('.date').innerHTML = dateResult; //여기서 내용 바꿀 땐, innerHTML, innerText, 등 상관없음.

        /*
        padStart(), padEnd()
        es8버전에 새로 추가된 메서드다.
        좌우에 특정한 문자열로 채우는 기능을 가진 메서드다.
        */
    }, 1000);
    
}