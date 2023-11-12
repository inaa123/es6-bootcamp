window.onload = () => {
    /*
    1.메인메뉴를 hover하면 해당하는 서브메뉴만 드랍되게

    2.서브메뉴 영역 벗어나면 없어지게 
    */

    const mainMenu = document.querySelectorAll('.gnb > li > a'); //순번을 알 수 없어 누구한테 이벤트를 줘야하는 지 모른다. 여러개에 이벤트를 줄땐 반복문으로 꼭
    const subMenu = document.querySelectorAll('.subMenu');
    /* querySelector: 모든 요소 참조, 반환하는값은 처음값만(index0번만)
        querySelectorAll: 모든 요소 참조, 배열에 담아놓고 반환하진X */
    /*mainMenu.addEventListener('mouseenter', onMenuEnter);*/
    const gnb = document.querySelector('.gnb');

    mainMenu.forEach((el)=>{
        el.addEventListener('mouseenter', onMenuEnter);
    })
    gnb.addEventListener('mouseleave', onMenuLeave);
    
    function onMenuEnter(){
        /*subMenu.classList.add('on'); subMenu도 배열의 문제*/

        subMenu.forEach((el)=>{
            el.classList.remove('on');
        })

        const thisSubMenu = this.nextElementSibling; /*this.의 this는 a태그*/
        thisSubMenu.classList.add('on');
        //console.log(this); //이벤트를 일으킨 객체 그 자체 .gnb > li > a의 "a태그" this : a태그. 화살표함수에선 this는 window
        //this가 직접 들어가야 할 땐 화살표함수보다 일반함수가 더 나음


    }

    function onMenuLeave(){
        subMenu.forEach((el)=>{
            el.classList.remove('on');
        })
    }
}