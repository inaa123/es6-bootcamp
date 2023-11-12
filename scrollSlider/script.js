/*
1.특정한 클래스를 추적한다.  horizontal-scroll을 추적
    (특정한 클래스 명 : horizontal-scroll 을 만나면 스크롤 방향을 바꿔줄려고(수직 -> 수평))

2. 요소들의 위치값을 계산한다.
3. (위치값 받아오는 기준)해당 요소가 특정 위치값에 있다는 걸 확인하기 위해 특정 클래스명을 전달한다.

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
    let winScrollTop = window.pageYOffset; //현재 창의 스크롤 위치를 받아온다.
    let winW = window.innerWidth; //브라우저 창(window)의 넓이
    let winH = window.innerHeight; //브라우저 창의 높이
    //console.log(winW, winH) 1920 963

    //특정한 클래스를 넣었다 뺏다할것
    const itemClass = 'slider'; //공통적으로 들어갈 클래스 명
    const itemActive = `${itemClass}-active`; // 시작위치에 있는 요소에 들어갈 클래스명. slider-active position:fixed
    const itemEnd = `${itemClass}-end`; //끝나는 위치에 있는 요소에 들어갈 클래스명. slider-end

    const slideSection = document.querySelectorAll('.horizontal-scroll'); //.horizontal-scroll클래스가 여러개일 수 있으니 All로 찾는다.(다 찾기 위함)

    slideSection.forEach((el)=>{
        setScroll(el);
        setActive(el);
    })

    window.addEventListener('scroll', () => {
        winScrollTop = window.pageYOffset; //기존 스크롤값에서 스크롤 이벤트가 들어올 경우 재반환을 위해 재선언한다.(스크롤할때마다 값이 바껴야 함.)
        slideSection.forEach((el) => {
            //console.log(el); //<div class="horizontal-scroll item2 content ">, <div class="horizontal-scroll item4 content ">
            //새로운영역값 크기 받아오기 32~50
            /*
            const bounding = el.getBoundingClientRect(); //PAGE내에서 요소가 어디에 있는지 알려 줌
            //console.log(bounding); //ex DOMRect {x: 0, y: 2320, width: 1903, height: 963, top: 2320, …}
            el.querySelectorAll(`.${itemClass}`).forEach((itemClassEl) => {
                itemClassEl.classList.remove(itemActive);
                itemClassEl.classList.remove(itemEnd); 
            }) //기존에 있던 특정 클래스(itemClass, 'slider') 초기화
            if(bounding.bottom < 0){ //boundin
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
            
            //스크롤액션
            const scrollP = winScrollTop - el.offsetTop;
            //console.log(scrollP);
            const scrollCenter = scrollP / (el.innerHeight -(winH -winW));
            //console.log(scrollCenter);
            const transformP = scrollCenter * el.contentWrapperWinW;
            console.log(transformP);
            let toTransform = -(transformP);
            toTransform = Math.min(0, toTransform);
            toTransform - Math.max(toTransform, el.rightMax);
            el.transformX = toTransform;
            el.contentWrapper.style.transform = `translateX(${el.transformX}px)`;
            */
            setActiveScroll(el);
            setActive(el);
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

    function setActiveScroll(el){
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