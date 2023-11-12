window.onload = () => {
    /*
    1. 객체를 생성할 위치 = 클릭한 위치 = position값
    2. 랜덤한 이미지를 생성한다 = 값이 일정 영역안에서 랜덤으로 뿌려지도록
    - 클래스명이 누적되지 않도록 한다.
    - 애니메이션이 끝나면 이미지도 사라지도록 하기.(영역도..?)

    */

    //clickEvent(); 에러. 호이스팅 현상 막고있음
    const clickEvent = () => {
        //클릭시 이미지가 들어갈 div를 만들어 줘야한다.
        const img = document.createElement('div'); //이미지가 들어갈 div생성
        img.id = 'click-img'; //img에 click-img란 id를 넣어준다.
        let timer;


        document.body.addEventListener('click', onImgShow);

        function onImgShow(e){
            //e = 마우스 이벤트를 받아오는 매개변수. e / event
            
            const positionX = e.pageX;
            const positionY = e.pageY;
            //const {pageX : positionX, pageY : positionY} = e; 위를 줄이면 이렇게 쓸 수 있음.

            const randomImg = Math.floor(Math.random()*5)+1;
            //1 2 3 4 5번 나오는 데 뭐가 나올지는 모름. random한 식 - Math.random요소 이용

            //console.log(positionX);
            //console.log(positionY);
            //console.log(randomImg);

            if(img.parentNode){ //img가 parentNode에 있을 때만 removeChild로 없애주고 appendChild
                img.parentNode.removeChild(img);
            }

            document.body.appendChild(img);
            img.className = ''; //클릭시 클래스명이 누적되지 않도록
            img.classList.add('active', `bg0${randomImg}`);
            img.style.top = `${positionY}px`; //px없음 ``으로 감싸서 단위까지 넣어준다.
            img.style.left = `${positionX}px`;

            //img.parentNode.removeChild(img); 시간차X, 생성됨과 동시에 없어짐 -> setTimeout
            clearTimeout(timer); //겹치는 timeout 계속 빨라지는거 막기위해 clear한다.

            //timer = setTimeout(function(){
            //    img.parentNode.removeChild(img);
            //}, 2000);

            timer = setTimeout(onImgOut, 2000);
            //setTimeout은 자체적으로 리셋하지 않은다. 그래서 내가clear해줘야 한다.

        }
        function onImgOut(){
            if(img.parentNode){ //img가 parentNode에 있을 때만 removeChild해준다.
                img.parentNode.removeChild(img);
            }
        }
    }
    clickEvent();
}