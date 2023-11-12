window.onload = () => {
    slider();
}

function slider(){
    /* 들어가기 전 로직 구현하기
    1. .navi에 있는 버튼을 클릭하면 해당하는 순번의 pannel이 슬라이드되는  방식이다.
    2. 슬라이드가 이동이 되면서 circle이미지도 class가 변환되는 방식이다.(css .circle)

    3.navi에서 클릭하는 버튼의 인덱스를 알아내기 
    */
    const canvas = document.querySelector('#slider');
    const panel = document.querySelector('.panel'); //li가 아닌 ul인 panel을 찾아야 함. li가 움직이는게 아니라 panel(ul)이 움직이기 때문
    const btns = document.querySelectorAll('.navi > li');
    const btnsArr = Array.from(btns);
    const panelItem = panel.querySelectorAll('li');
    const circle = document.querySelector('#circle');

    const speed = 1000;//슬라이드 진행 시간
    let timer;
    let enableClick = true; // //이벤트 중첩 막기 위해, true일때만 실행
    
    //btns에 이벤트 먼저 넣자.
    btns.forEach((el, idx) => { //el필요 li에 이벤트 줘야하기 때문
        //console.log(el[idx]);
        el.addEventListener('click', () => {
            /*
            btns.forEach((item) => { //btns에 또 forEach 돌림//el이름겹치니 item으로
                item.classList.remove('on');
            }) 
            el.classList.add('on');

            panelItem.forEach((item, panelIdx) => {
                item.classList.remove('on');
                if(panelIdx === activeIdx){
                    item.classList.add('on');
                }
            })
            */
            let activeIdx = btnsArr.indexOf(el); //indexOf = 특정 문자의 위치(순번)를 찾아주는 메서드
            console.log(activeIdx);

            if(enableClick){ //이벤트 중첩 막기 위해
               
                activeSlide(activeIdx, btns); //객체랑 순번 
                activeSlide(activeIdx, panelItem);
    
                let canvasWidth = parseInt(getComputedStyle(canvas).width);//panel의 width찾기
                console.log(canvasWidth);
                //panel.style.left = `${-canvasWidth * activeIdx}px`; 이동만됨(애니메이션x)
    
                animate(panel, {
                    prop : 'left',
                    val : -canvasWidth * activeIdx,
                    duration : speed
                })
                circle.className = '';
                circle.classList.add(`rot${activeIdx +1}`);
                enableClick = false; //중첩실행 막기 위해!
            }
        })
    })

    //btns.foreach에서 실행 시킬 것
    function animate(el, option){ 
        let startActive = performance.now(); //애니메이션이 시작되는 시간
        //시간을 실시간으로 모니터링해주는 메서드다. Date.now()로도 대체가 가능하지만, 기준점이 다르므로 일반적인 애니메이션을 실행할 때에는 performance.now()가 좀 더 좋다.
        //Date.now()에서 Date는 현재시간을 반환. animate는 애니메이션 실행시간을........
        let currentValue; //변동되는 속성을 넣을 것
        console.log(this);

        //option매개변수로 받아올 것. 객체형식으로
        if(option.prop === 'opacity'){
            currentValue = parseFloat(getComputedStyle(el)[option.prop]);
        }else{
            currentValue = parseInt(getComputedStyle(el)[option.prop]);
        }
        //option으로 받아오는 prop의 값이 opacity라면 소숫점을 포함한 숫자를 출력해 주고,
        //아니라면 소숫점을 제외한 정수만 출력해준다.
        //parseFloat() : 숫자만 변환, 소숫점까지 parseInt() : 숫자만 반환, 소숫점빼고정수만 

        if(currentValue !== option.val){
            requestAnimationFrame(run);
            //현재 currentValue값이 option.val 값에 도달하지 못했다면, 애니메이션을 실행하도록 .
            //ex)현재 slider의 위치가 0인 상태이고, 클릭한 버튼의 위치가  2000이라면 값이 서로 맞지 않으므로 requestAnimationFramet이 실행되도록 하는 것이다.
        }
        function run(time){//time을 받아와서
            let lastTime = time - startActive; //경과된 시간
            let progress = lastTime / option.duration;
            //progress가 1이되면 애니메이션이 종료된다.


            if(progress < 0){
                progress = 0;
            }
            if(progress > 1){
                progress = 1;
            }

            if(progress < 1){
                timer = requestAnimationFrame(run);
            }else{ //1이되면
                cancelAnimationFrame(timer);//다른 이벤트 종료되기 전까지 이벤트를 받아오지 않을
                enableClick = true; //이벤트가 다끝났으니 다시 이벤트 실행하기 위해 true로!
            }
            
            let result = currentValue + (option.val - currentValue) * progress;

            if(option.prop === 'opacity'){
                el.style[option.prop] = result;
            }else{
                el.style[option.prop] = result + 'px';
            }
        }
    }

    function activeSlide(idx, item){
        for(let el of item){
            el.classList.remove('on');
        }
        item[idx].classList.add('on');
    }
}