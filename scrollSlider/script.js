/*
1.특정한 클래스를 추적한다.  horizontal-scroll을 추적
    (특정한 클래스 명 : horizontal-scroll 을 만나면 스크롤 방향을 바꿔줄려고(수직 -> 수평))

2. 요소들의 위치값을 계산한다.
3. (위치값 받아오는 기준)해당 요소가 특정 위치값에 있다는 걸 확인하기 위해 특정 클래스명을 전달한다.
(특정 클래스명을 자동으로 입력해줄것. 요소가 해당 위치에 도달하면 특정 클래스를 받게 해주고, 영역을 벗어나면 다른 클래스를 주어 위치에 없음을 알려줄 것)

메서드와 프로퍼티의 차이점(99%)
innerWidth : property, (앞에 있는 녀석의 넓이)
forEach: method

프로퍼티 = 객체의 속성(length, width, height, style)
        속성의 값을 알아내는 것을 말한다.
        단순히 값만 알아내기 때문에 명령어 뒤에 ()가 없다.(매개변수필요X)
        ~를 알아내!(값을 뽑아낸다.)
메소드 = 객체를 이용해서 행동하게 하는 것(for, if, while, forEach, indexOf()....)
        매개변수를 받아오기 때문에 명령어 뒤에 보통()가 붙어있다. (함수)
        ~을 해!(단순 행동)
*/

window.onload = () => {
    //먼저 스크롤 몇을 했는지 알아야 함.(그래야 어느 위치의 요소에 있는지 알 수 있음)
    let winScrollTop = window.pageYOffset; //현재 창의 스크롤 위치를 받아온다.
    let winW = window.innerWidth; //브라우저 창(window)의 넓이
    let winH = window.innerHeight; //브라우저 창의 높이
    //console.log(winW, winH) 1920 963

    //특정한 클래스를 넣었다 뺏다할 것
    const itemClass = 'slider'; //공통적으로 들어갈 클래스 명
    const itemActive = `${itemClass}-active`; // 시작위치에 있는 요소에 들어갈 클래스명. slider-active position:fixed
    //해당 위치에 접근했을 때 slider-active를 넣겠다.
    const itemEnd = `${itemClass}-end`; //끝나는 위치에 있는 요소에 들어갈 클래스명. slider-end

    //특정 요소를 찾아낸다.
    const slideSection = document.querySelectorAll('.horizontal-scroll'); //.horizontal-scroll클래스가 여러개일 수 있으니 All로 찾는다.(다 찾기 위함)

    slideSection.forEach((el)=>{
        //세팅을 미리 받아옴
        setScroll(el);
        setActive(el); 
    })

    //window에 scroll이벤트 준다.
    window.addEventListener('scroll', () => {
        winScrollTop = window.pageYOffset; //기존 스크롤값에서 스크롤 이벤트가 들어올 경우 재반환을 위해 재선언한다.(스크롤할때마다 값이 바뀌기 때문에 한 번 더 콜해줌.)
        slideSection.forEach((el) => {
            
            activeScroll(el); //activeScroll은 여기서만 돌아가면 됨
            setActive(el); //스크롤들어올때 혹시 달라지는 부분 있을 수 있으니 다시 받음

            //console.log(el); //<div class="horizontal-scroll item2 content ">, <div class="horizontal-scroll item4 content ">
            //새로운영역값 크기 받아오기 32~50
            /*
            const bounding = el.getBoundingClientRect(); //PAGE내에서 요소가 어디에 있는지 알려 줌. DOMRect{}
            //console.log(bounding); //ex DOMRect {x: 0, y: 2320, width: 1903, height: 963, top: 2320, …}
            el.querySelectorAll(`.${itemClass}`).forEach((itemClassEl) => {
                itemClassEl.classList.remove(itemActive);
                itemClassEl.classList.remove(itemEnd); 
            }) //기존에 있던 특정 클래스 초기화
            if(bounding.bottom < 0){ //<div class="horizontal-scroll item2 content "> 의 slide가 끝이나면 itemEnd가 붙음
                el.querySelectorAll(`.${itemClass}`).forEach((itemClassEl) => {
                    itemClassEl.classList.add(itemEnd); //끝났으니 itemEnd추가해줌     
                });
            }else{
                el.querySelectorAll(`.${itemClass}`).forEach((itemClassEl) => {
                    if(bounding.top <= 0){
                        itemClassEl.classList.add(itemActive);
                    }else if(bounding.bottom <= winH){
                        itemClassEl.classList.add(itemEnd);
                    }
                })
            }

            //스크롤 스크롤값 받아오기
            const sectionClass = el.classList[0]; //sectionClassd의 el 중 첫번째 classList를  받아온다. 24|slideSection.forEach((el)의 el
            //console.log(sectionClass); //horizontal-scroll
            const contentWrapper = el.querySelector(`.${sectionClass}-item`); //horizontal-scroll-item
            const contentWrapperWinW = contentWrapper.scrollWidth; //가로로 스크롤할것. height가아닌 ScrollWidth를 찾아야함
            //console.log(contentWrapperWinW); //스크롤이 될 값

            el.contentWrapper = contentWrapper; //값이 바뀌니 값 고정시켜줌
            el.contentWrapperWinW = contentWrapperWinW;

            //
            el.rightMax = -(contentWrapperWinW - winW); //contentWrapperWinW(전체길이) - winW(화면보여지는 값)
            //console.log(el.rightMax); 몇으로 이동해야할지 나옴
            el.style.height = `${el.contentWrapperWinW}px`; //가로값을 높이값으로 대입해줘야 그만큼 내려가야 끝난 줄 알게 됨.
             width값을 height값으로 넣어서 착각하게 하는 것. 아래로 내려가는만큼 옆으로 흘러가야함. 방향이 다를 뿐 스크롤은 계속 내려가야 함!
            //console.log(el.style.height);

            el.innerHeight = el.offsetHeight;
            //요소의 높이에 offsetHeight값을 대입해서 컨텐츠의 전체 높이를 저장한다.

            el.init = true; //초기화 여부를 boolean으로 변환한다.
            el.transformX = '0'; //최초 가로 슬라이드가 시작할 위치값을 반환한다.
            el.classList.add(`${sectionClass}-init`); //horizontal-scroll-init 들어오면 opacity:1 / opacity를 조절하기 위해.

            //document의 높이값 완전 달라져있음. ex) 4775 - 15064
            
            //스크롤액션
            const scrollP = winScrollTop - el.offsetTop; //scrollP 스크롤포지션 : 윈도우스크롤탑에서 현재el의 offsetTop을 빼줌
            //console.log(scrollP);
            const scrollCenter = scrollP / (el.innerHeight -(winH -winW));
            //console.log(scrollCenter);
            const transformP = scrollCenter * el.contentWrapperWinW;
            console.log(transformP);
            let toTransform = -(transformP);
            toTransform = Math.min(0, toTransform);
            toTransform - Math.max(toTransform, el.rightMax);
            el.transformX = toTransform;
            el.contentWrapper.style.transform = `translateX(${el.transformX}px)`; //가로값만 이동하면 됨
            */
        })

    })

    function setActive(el){ //bounding부터 스크롤하기 전까지
        
        const bounding = el.getBoundingClientRect(); //PAGE내에서 요소가 어디에 있는지 알려 줌
        console.log(bounding.bottom);
        //console.log(bounding); //ex DOMRect {x: 0, y: 2320, width: 1903, height: 963, top: 2320, …}
        el.querySelectorAll(`.${itemClass}`).forEach((itemClassEl) => {

            itemClassEl.classList.remove(itemActive);
            itemClassEl.classList.remove(itemEnd); 
        }) //기존에 있던 특정 클래스(itemClass, 'slider') 초기화
        if(bounding.bottom < 0){ 
            el.querySelectorAll(`.${itemClass}`).forEach((itemClassEl) => {
                itemClassEl.classList.add(itemEnd); //끝났으니 itemEnd추가해줌     
            });
        }else{
            el.querySelectorAll(`.${itemClass}`).forEach((itemClassEl) => {
                if(bounding.top <= 0){
                    itemClassEl.classList.add(itemActive);
                }else if(bounding.bottom <= winH){
                    itemClassEl.classList.add(itemEnd);
                }
            })
        }

    }

    function setScroll(el){
        //스크롤 스크롤값 받아오기
        const sectionClass = el.classList[0]; //sectionClass el의 classList중 첫번째걸 받아온다. 24|slideSection.forEach((el)의 el
        //console.log(sectionClass);
        const contentWrapper = el.querySelector(`.${sectionClass}-item`);
        const contentWrapperWinW = contentWrapper.scrollWidth; //가로로 스크롤할것
        //console.log(contentWrapperWinW);

        el.contentWrapper = contentWrapper; //값이 바뀌니 값 고정시켜줌
        el.contentWrapperWinW = contentWrapperWinW;

        el.rightMax = -(contentWrapperWinW - winW); //contentWrapperWinW(전체길이) - winW(화면보여지는 값?)
        //console.log(el.rightMax);
        el.style.height = `${el.contentWrapperWinW}px`; //width값을 height값으로 넣어서 착각하게? 함.
        //console.log(el.style.height);
        el.innerHeight = el.offsetHeight;
        //요소의 높이에 offsetHeight값을 대입해서 컨텐츠의 전체 높이를 저장한다.

        el.init = true; //초기화 여부를 boolean으로 변환한다.
        el.transformX = '0'; //최초 가로 슬라이드가 시작할 위치값을 반환한다.
        el.classList.add(`${sectionClass}-init`); //opacity를 조절하기 위해. -init이 들어오면 opacity:1    
    }

    function activeScroll(el){
        const scrollP = winScrollTop - el.offsetTop;
        //console.log(scrollP);
        const scrollCenter = scrollP / (el.innerHeight -(winH -winW));
        //console.log(scrollCenter);
        const transformP = scrollCenter * el.contentWrapperWinW;
        //console.log(transformP);
        let toTransform = -(transformP);
        toTransform = Math.min(0, toTransform);
        toTransform - Math.max(toTransform, el.rightMax);
        el.transformX = toTransform;
        el.contentWrapper.style.transform = `translateX(${el.transformX}px)`;
    }

}

/*
etBoundingClientRect() 메서드의 반환되는 값은 요소 박스에 대한 크기 정보와 위치 정보입니다,
getBoundingClientRect() 의 요소의 위치는 고정값이 아니라 문서가 브라우저에서 스크롤 될 때 마다 값이 변하게 됩니다. 
요소의 위치 값들은 현재 viewport(보여지는곳이라 생각하자)가 표시하는 곳의 좌측 위를 (0,0) 하여 구하는 상대적 위치이므로 스크롤 될 때 마다 요소의 위치값은 계속 변하게 된다.
 x, y, width, height, top, right, bottom, left 프로퍼티를 반환하며 단위는 픽셀이다.


elem.getBoundingClientRect().x : 현재 창기준 x좌표
elem.getBoundingClientRect().y : 현재 창기준 y좌표
elem.getBoundingClientRect().width : 엘리먼트 가로
elem.getBoundingClientRect().height : 엘리먼트 세로
elem.getBoundingClientRect().top : 현재 창기준 세로 시작점 부터 엘리먼트 윗변 까지의 거리
elem.getBoundingClientRect().left : 현재 창기준 가로 시작점 부터 엘리먼트 왼쪽변 까지의 거리
elem.getBoundingClientRect().right : 현재 창기준 가로 시작점 부터 엘리먼트 오른쪽변 까지의 거리
elem.getBoundingClientRect().bottom : 현재 창기준 세로 시작점 부터 엘리먼트 아래변 까지의 거리
*/