window.onload = () => {
    /*
    1.모든 메인메뉴를 hover하면 전체 서브메뉴가 내려오도록 한다.

    2. 서브메뉴의 전체 배경 태그가 다로 생성되도록
    위치는 header-bottom-wrapper의 다음 요소

    3. 서브메뉴가 닫히는 조건
    -gnb에 마우스가 떠날 때, 서브메뉴와 전체 배경 태그가 같이 사라짐
   
    */
    //div.main-bg

    const gnb = document.querySelector('.gnb');
    const div = document.createElement('div');
    const headerBottom = document.querySelector('.header-bottom-wrapper');
    div.className = 'main-bg';

    gnb.addEventListener('mouseenter', onMainBg);
    gnb.addEventListener('mouseleave', leaveMainBg);

    function onMainBg(){
        headerBottom.appendChild(div);
        div.classList.add('on');
    }

    function leaveMainBg(){
        div.classList.remove('on');
    }

}