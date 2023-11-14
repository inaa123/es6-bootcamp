window.onload = () => {
    //팝업창 생성 메서드
    createPopUp({
        name : '#popUp',
        data_url : './component/popUp.html'
    })
    //함수를 하나 만들어서 동적으로 팝업창을 생성한다.
    const isCookie = document.cookie.indexOf('popUp=done'); //-1 :쿠키가 없다.
    //indexOf = 특정한 곳의 문자를 찾는 것. 그 위치 값 반환. 찾을 수 없으면 -1(반환할 값이 없다.)
    console.log(isCookie);

    if(isCookie === -1) { // 'popUp=done이 없다는 의미로 onload실행될때마다 #popUp block한다. 쿠키를 삭제했다는 의미가 아니므로
        document.querySelector('#popUp').style.display = 'block';
    }else{ // 어떠한 값이라도 있으면 popUp=done이 있다는 의미니, 팝업창 안나와도 됨.
        document.querySelector('#popUp').style.display = 'none';
    }  
    //체크박스는 쿠키의 유무를 체크해야하며 removePopUp에서 해야함
  

    document.querySelector('.closeBtn').addEventListener('click', function(){
        removePopUp(this); //this: document.querySelector('.closeBtn'), this를 이용해서 선택자가 좁아짐
        //console.log(this); //window(화살표함수의 this는 window) but windonw가 되면 안되기 때문에, this의 의미가 이벤트? 대상이 되어야 하기 때문에 일반함수를 써야한다.
    })
    document.querySelector('.del').addEventListener('click', function(){
        setCookie('popUp', 'done', 0); //0을 넣으면 늘릴 시간 없으므로 현재시간.
    });
}

function createPopUp(opt){
    let popUpName = opt.name.split('#')[1];
    //opt에서 받아온 name에 있는 #을 분리해서 제거해준다.
    let popUpContainer = document.createElement('aside');
    //팝업창을 담을 태그(aside, 상관없음)를 생성한다.
    popUpContainer.setAttribute('id', popUpName); //새로 생성되는 팝업창에 id를 지정한다.

    let content = document.createElement('div');
    content.classList.add('content');
    popUpContainer.appendChild(content);

    /* 체크박스 요소 추가하기 */
    let wrap = document.createElement('div');
    let checkBox = document.createElement('input');
    checkBox.type = 'checkbox';
    let label = document.createElement('label');
    label.innerText = '오늘 하루 그만 보기';

    wrap.classList.add('wrap'); //클래스 부여
    label.appendChild(checkBox);
    wrap.appendChild(label);

    popUpContainer.appendChild(wrap);

    //닫기버튼 생성
    const link = document.createElement('a');
    link.href = '#'; //아무데도 이동 안함
    link.classList.add('closeBtn');
    link.innerText = '닫기';
    wrap.appendChild(link);
    

    //만든거 body에 생성해 준다.
    document.body.appendChild(popUpContainer);

    const xhr = new XMLHttpRequest();//지금 문서를 호출해주는 방식으로 진행하고 있기 때문에 필요
    /*XMLHttpRequest(); = 웹 페이지에서 서버와 통신(데이터를 주고받는)을 하기 위한 방법중의 하나다. 
    서버에 데이터를 보내고 결과를 받아오는 과정을 거치는 데, 이때 주고받는 데이터를 다루는 방법이다.
    */
    console.log(xhr.readyState); //0. 데이터를 보내기 전(데이터를 보낼게 없는 상태)에는 0을 반환 (0과1로나타남)
    xhr.open('GET', opt.data_url); //GET형태로 opt옵션에 있는 data_url을 전송
    /*
    서버에 데이터를 보내는 방식이다.
    (GET, POST, DELETE, PUT), 객체 를 보내는 방식이다.

    */
    console.log(xhr.readyState); //1. 데이터를 요청한 후에는 1을 반환한다.

    xhr.onreadystatechange = () => {
        //console.log(xhr.readyState);
        //console.log(xhr.status); //200 현재 내 상태
        if(xhr.readyState === XMLHttpRequest.DONE){ //DONE : 4, 결과요청했으면
            if(xhr.status === 200 ){ //성공(200)했으면
                console.log('성공')
                content.innerHTML = xhr.responseText;
                //responseText = 응답받은 데이터를 문자로 변환
            }else{
                console.log('실패');
            }
        }
    }
    xhr.send(); // 2 3 4 출력(동시에 호출됨)
    /*xhr.onreadystatechange = XMLHttpRequest에서 받아온 state의 값이 변경되면 호출되는 이벤트다.

    readyState의 값에 따라서 처리결과를 숫자로 전송해준다.
    0(unset) : 아직 요청이 생성된 상태지만 아직 서버에 요청은 하지 않은 상태
            (어떤 값을 보낼 준비만 한 상태, 이메일 작성만한 상태(저장할수도 삭제할수도 전송할 수도있음))
    1(open) : 함수를 호출한 상태로 open()을 실행한 상태로 보며, 요청이 초기화된 상태
    2(header_received) : 함수를 호출하고, 결과를 요청한 상태로, 보통 send()로 수신한 상태에서 출력한다. (어떤 값을 보낼 건데, 결과값(수신여부)을 알려줘)
    3(loading) : 서버에 요청한 결과를 받아오는 중이다.
    4(done) : 서버에 요청한 결과를 받은 상태다.(결과는 성공 / 실패로만 나옴)

    200 = 서버에 수신이 성공
    404 = 서버에 수신이 실패(대표적으로 404)
    */
}


//닫기 버튼 클릭하면 나 뿐만아니라 전체영역이 없어져야 함.
function removePopUp(el){
    //체크박스 체크유무에 따라 값이 실행되도록, onload시 isCookie유무 판단하라 수 있음
    const isChecked = el.parentNode.querySelector('input[type=checkbox]').checked; 
    const popUpName = el.parentNode.parentNode.getAttribute('id');
    //console.log(popUpName);
    //console.log(isChecked);//check하고닫으면 true, 아니면 false

    //닫기버튼 누르면 팝업창 화면에서 사라지게(안보이게)
    el.parentNode.parentNode.style.display = 'none'; //화면에서 제거 (새로고침하면 팝업창 다시 뜸)
    //닫기버튼 누르면 아예 없어지게
    el.parentNode.parentNode.parentNode.removeChild(el.parentNode.parentNode); //구조상에서 삭제. parentNode를 더 추가한 이유 body상에서 없애야 하기 때문!
    //el.parentNode = <div class="wrap" >
    //el.parentNode.parentNode = <aside id="popUp">

    if(isChecked){//isChecked가 true면 setCookie함수 실행(매개변수 3개가 있는)
        setCookie(popUpName, 'done', 1); //popUpName대신 'popUp'으로 해도 상관없음, 'done'은 popUp=done의 done 
    }
}

function setCookie(el, val, time){ //el:popUpName, val:popUp=done의 done, time은 하루,이틀,,등등
    let today= new Date();
    let date = today.getDate(); //일을 기준으로. hour,min으로 하면 시간으로 설정할 수도 있다.
    //console.log(date); //8 8일.
    today.setDate(date + time) //쿠키에서 정한 날짜를 오늘 날짜에 더해서 연장시켜 준다.
    let dueDate = today.toUTCString();
    //toUTCString() = 브라우저 쿠키 만료일자 포맷 함수다. GMT기준으로 변경해준다.
    document.cookie = `${el}=${val}; path=/; expires=${dueDate}`; 
    //el:popUp val:'done' .체크하고 끄켠 popUp=done이 저장되고 새로고침하면 쿠기값을 먼저 체크하여 있으면 안나오고 없으면 팝업나옴. 
    //${dueDate}시간을 넣어준다.
    console.log(document.cookie); 
    console.log(document.cookie = `${el}=${val}; path=/; expires=${dueDate}`);//내일까지 안나옴 ㅠㅠ
}