window.onload = () =>{
    /*
        1. 스크롤 이벤트로 한번에 스크롤 된 값 알아내기
        2. 전체 document 의 길이에서 스크롤된 값을 퍼센테이지로 변환 시켜주기
    */
    const progressBar = document.querySelector('.progressBar'); //progress잡기
    // 찾고자하는 객체가 복수냐 단수냐에 따라 어떤것으로 찾을지 정할 수 있다. 
    const imgs = document.querySelectorAll('.parallax_image'); //전체를 구하면 개수를 구할 수 있음. for문으로 돌리면서 한 번에 여러개를 복수 선택할 수 있음.
    const imgNum = imgs.length; //7
    let scrollTop = 0; // 최초로 시작할 스크롤의 위치값을 받아올 변수다. 값이 변하니 let으로
    console.log(imgNum);

    // document길이가 window(화면의 길이) 기준을 넘치면  스크롤바가 생기기 때문에 window 객체에 이벤트를 걸어줘야함(document는 크기 그대로만 가지고 있고, 화면이 document보다 작을 때 스크롤이 나옴)
    // document는 body안에 넣은 컨텐츠의 길이 전체가 document의 길이다. window는 브라우저, 화면의 길이다.
    //BUT. 의도적으로 document안에 스크롤을 넣어야 경우 documet에 스크롤이벤트를 주기도 한다.(여기선X)
    window.addEventListener('scroll',onScroll)
    // body 의 크기는 스크롤바가 이동한 거리 + 윈도우에 표시된 화면 height 값
    function onScroll(){
        scrollTop = document.documentElement.scrollTop || window.pageYOffset;
        //scrollTop = window.pageYOffset; //스크롤 한 번에 여러개의 스크롤 이벤트를 받아옴.
        //scrollTop = document.documentElement.scrollTop; 에러
        /*
            document.documentElement.scrollTop 와 window.pageYOffset 는 같은 역할을 하지만 scroll 을 받아오는게 브라우저 마다 엔진이 다르기 때문에 오류를 방지하기 위해서는 두가지 같이 써주는것이 좋다.
            물론 특정 브라우저만 지원하겠다면 한가지만 사용하여도 문제 없다.  
        */

        //console.log(scrollTop);
        let documentH = document.body.clientHeight; //clientHeight는 실제 document 의 총 길이
        let winH = window.innerHeight // window 에 표시되는 길이 
        //console.log(documentH);
        //console.log(winH);
        // documentH - winH = 스크롤의최대 거리(최대로 이동할 수 있는 거리) | ex) 6223(문서전체길이) - 945(윈도우길이) = 5278(스크롤 최대 길이)
        const percent = Math.floor(scrollTop / (documentH - winH) * 100); //백분율 구하는 법
        //scrollTop / (documentH - winH) 스크롤 끝까지 내리면 나눠지는 두 값이 같아지므로 1이됨, 백분율로 100%
        //console.log(percent);
        
        progressBar.style.width = `${percent}%`; //백분율 progressBar에 적용(스크롤따라 bar width변하게)

        imgs.forEach(function(el, idx){  //imgs에 스크롤한 값을 대입해서 scrollTop값을 translateZ축으로 이동시켜 줄 것 //imgs에 바로 넣을 수 없음(forEach문)
            //const transZ = scrollTop; scrollTop 100px씩(한번스크롤할때 값) 그대로 받아오고 있음. imgNum이용해서 나누기
            const transZ = scrollTop / (imgNum *(imgNum-idx)); // 조금씩 움직이게 하기 위함.((imgNum *(imgNum-idx))는 임의로 지정)
            el.style.transform = `perspective(300px) translateZ(${transZ}px`; //perscpective100밖에 안되서(너무 얕음) 조금 늘려줌
        })

    }
}