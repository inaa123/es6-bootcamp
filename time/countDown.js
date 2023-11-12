window.onload = () => {
    countDown("2023/12/25 00:00:00");
}

function countDown(dday){ // 기준시간(max)이 필요 - 직접연결하기 위해 매개변수 디데이dday를 받아옴
    //const coountDate = newDate() 현재시간을 받아오
    //const countDate = new Date(dday);//매개변수에 입력된 시간을 받아옴
    const countDate = new Date(dday).getTime(); //ms로. 시분초단위로 쪼갠다.
    const second = 1000; //1초. 1000ms로 잡아둠
    const min = second * 60; //1분
    const hour = min * 60;//1시간
    const day = hour * 24;//1일
    //dday시간을 1초에 한번씩 나눠 계산

    //현재 시간을 받아서 위 시간을 빼줘야 함
    const timer = setInterval(() =>{
        const nowDate = new Date().getTime(); //현재 시간을 ms로 받아옴
        const disTime = countDate - nowDate;
        //console.log(disTime)
        let disD = Math.floor(disTime / day);//큰거부터 나눔.
        let disH = Math.floor((disTime % day) / hour); //disTime을 day로 나눈 나머지 값을 hour로 나눈다.
        let disM = Math.floor((disTime % hour) / min); 
        let disS = Math.floor((disTime % min) / second);

        if(disD < 0){ //-1되지 않고 0되면 타이머가 끝난다.
            disD = 0;
            disH = 0;
            disM = 0;
            disS = 0;
            clearInterval(timer);
        }

        document.querySelector('.day').textContent = disD;
        document.querySelector('.hour').textContent = disH;
        document.querySelector('.min').textContent = disM;
        document.querySelector('.sec').textContent = disS;
    },1000);
}