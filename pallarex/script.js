window.onload = () => {
    
    /*
    1. 마우스 휠을 스크롤하면 윈도우의 높이값 만큼 이동한다.
    2. 도트를 클릭하면 해당하는 index의 section으로 이동해준다.
    3. 각 section마다 화면에 들어오면 on이라는 class를 추가돼야 한다.(그 외 모든 section은 on 삭제된다.)
    */

    const content = document.querySelectorAll('section'); //section여러개 찾아야함
    const dotList = document.querySelectorAll('#navi li');
    

    let posArr = []; //빈 배열
    //section마다 가지고 있는 위치값을 배열로 반환할 것
    //scroll값으로 이동X, 스크롤 (방향; 위,아래로) 했는지 여부에 따라
    let base = -400;

    window.addEventListener('resize', onResize);
    window.addEventListener('scroll', onScroll);
    onResize(); //onload되고 onResize를 먼저 실행하면 posArr값을 먼저 받아온다.

    function onResize(){
        posArr=[...content].map((el)=>el.offsetTop);
        console.log(posArr);
    }
    function onScroll(){
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        //console.log(scrollTop);
        [...dotList].forEach((el, idx) => {
            if(scrollTop >= posArr[idx] + base){
                dotList.forEach((el) => {
                    el.children[0].classList.remove('on'); //모든요소의 on을 없애고
                })
                el.children[0].classList.add('on');

                [...content].forEach((el)=>{
                    el.classList.remove('on');
                })
                content[idx].classList.add('on');
            }
        });
        /*[...content].forEach((el,idx) => {
            if(scrollTop >= posArr[idx] + base){
                content.forEach((el)=>{
                    el.classList.remove('on');
                })
                el.classList.add('on');
            }
        });*/
    }

    //스크롤할 때 마다
    // content를 받아와서 배열을 하나하나 주겠다.
    [...content].forEach((el)=>{
        el.addEventListener('wheel', onWheel); //wheel: 위로 /아래로 내렸는 지 
    });
    [...dotList].forEach((el) => {
        el.addEventListener('click', onClick);
    })
    
    
    function onWheel(e){
        //console.log(e);
        /*
        wheel이벤트는 event를 받아와야 하므로 매개변수가 필요하다. (e, event)
        
        wheel과 scroll의 차이점
        wheel = 마우스 휠의 작용 유무를 판단한다.
        scroll = 휠로 페이지 내부에 위치값이 얼마나 이동했는지를 반환한다.
        휠 이벤트는 브라우저마다 적용되는 이벤트가 다르다.
        이전 버전에서는 mouseWheel과 DOMMouseScroll이라는 이벤트로 분류해서 사용했다.
        mouseWheel은 익스, 사파리, 크롬
        DOMMouseScroll은 파이어폭스
        최신버전은 wheel 이벤트로 모두 대체됐다. 

        */

        const deltaY = e.deltaY || e.detail || -e.wheelDelta;
        //console.log(deltaY);

        if(deltaY < 0){
            if([...content].indexOf(this) !== 0){
                const index = [...content].indexOf(this);
                //console.log(index - 1);
                MoveScroll(index-1);
            }
        }else{
            if([...content].indexOf(this) !== content.length - 1){
                const index = [...content].indexOf(this);
                //console.log(index + 1);
                MoveScroll(index+1);
            }
        }
    }

    function MoveScroll(index){ 
        const targetPosition = posArr[index]; //targetPosition :  스크롤해야 하는 index 위치값(외부에서 받아오는 index를 전달해주는 역할을 한다.)
        //console.log(targetPosition);
        const currentPosition = window.pageYOffset || document.documentElement.scrollTop; //현재 스크롤의 위치. 현재 스크롤값 받아올 때 (movescroll되기 전 현재 위치값)
        const dist = targetPosition - currentPosition; //현재 위치에서 index로 받아온 위치까지 격차 (targetPosition만큼 가야하는 위치)
        const duration = 500; // 애니메이션 시간
        let isStart; //이동하고 있는 값을 매개변수로 처리하기 위함. 
        //isStart에 값이 들어가게 되면 애니메이션이 시작되었다는 뜻으로 본다.(변수값, 아무값도 없음(값이 있으면 애니메이션이 시작됐다는 의미))

        //무브스크롤 반복적으로 실행될 것
        function step(time){
            //console.log(time); //현재 적용시간(시간이 계속 누적된다.)
            if(!isStart) isStart = time; //애니메이션이 시작하기 전인지 판단할 것. 시간이 들어오게 되면 시작잉라는 의미로 본다 //!isStart = isStart가 아니라면 
            const progress = time - isStart; //현재 애니메이션이 시작되고 지난 시간이다.(얼마나 경과했는지)
            const percent = Math.min(progress / duration, 1);//애니메이션의 진행도를 받아온다. (1은 최소한의 비율값이다)
            //경과된 시간을 기준을로 완료된 애니메이션의 백분율을 계산한다.
            //여기서 1은 100%를 의미하며, 100%를 넘지 못하도록 하기 위함.
            //progress/duration한 값과 1 중에 더 작은 값을 선택하게 된다.
            window.scrollTo(0, currentPosition + dist * percent); // 이 영역만큼으로 스크롤해라. (0부터 시작함)

            if(progress < duration){
                window.requestAnimationFrame(step);//requestAnimationFrame은 setInterval과 비슷한 느낌. 
                
            }
            //애니메이션이 지속시간보다 짧으면 실행한다.
        }
        window.requestAnimationFrame(step);
        //애니메이션이 완료되지 않았으면 콜백으로 다음 애니메이션을 요청한다.
    }
    function onClick(){
        const index = Array.from(dotList).indexOf(this);//내가 선택한dotList의 첫번째요소만 반환하면 된다.
        //console.log(index);
        MoveScroll(index);//MoveScroll 함수에 index를 전달.
    }
}