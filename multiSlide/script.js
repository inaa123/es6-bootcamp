
window.onload = () => {
    /*
    슬라이드 구현 (버튼 / 자동)
    1. 버튼 슬라이드 구현
    -버튼을 누르면 해당 방향으로 슬라이드가 이동
    -슬라이드 마지막 슬라이드 되면 처음으로 돌아가는게 아니라 무한 루프 되는 슬라이드 구현

    2.자동 슬라이드 구현
    
    */

    const slider = document.querySelector('#slider');
    const slider2 = document.querySelector('#slider2');
    const next = document.querySelector('.next');
    const prev = document.querySelector('.prev');

    const speed = 500;
    let timer; //저동실행 대입할 변수
    let nextTimer; //버튼을 클릭했을때 취소된 자동슬라이드를 재생 시킬 변수
    let enableClick = true; //버튼 클릭 여부를 상태변수로 대입


    autoSlider()
    init(slider, slider2)
    function init(...items) {
        console.log(items)
        items.forEach(el => {
            const itemSize = el.querySelectorAll('li').length//각 슬라이더에 있는 li의 갯수를 파악
            console.log(itemSize)
            const ul = el.querySelector('ul');

            //ul설정
            ul.style.width = `${100 * itemSize}%`;//li의 갯수만큼 ul의 크기를 설정
            ul.style.height = '100%';
            ul.style.marginLeft = '-100%';

            //li
            const list = el.querySelectorAll('li');
            list.forEach(el => {
                el.style.width = `${100 / itemSize}%`;
                el.style.height = '100%';
                el.style.float = 'left';
            })
            ul.insertBefore(list[itemSize - 1], ul.firstChild)

        })

    }

    next.addEventListener('click', function () {

        if (enableClick) {
            clearTimeout(nextTimer)
            stopSlide();
            onNextSlide(slider);
            onNextSlide(slider2);
            enableClick = false;

            nextTimer = setTimeout(()=>{
                autoSlider()
            },2000)
        }


    })
    prev.addEventListener('click', function () {
        onPrevSlide(slider)
        onPrevSlide(slider2)
    })

    function onNextSlide(el) {
        const ul = el.querySelector('ul');
        const liW = ul.querySelector('li').offsetWidth;
        //console.log(liW)

        ul.style.transition = `margin-left ${speed}ms`;
        ul.style.marginLeft = `-${liW * 2}px`

        setTimeout(() => {
            ul.appendChild(ul.querySelector('li:first-child'))
            ul.style.marginLeft = `-${liW}px`;
            ul.style.transition = '';
            enableClick = true
        }, speed);
    }

    function onPrevSlide(el) {
        const ul = el.querySelector('ul');
        const liW = ul.querySelector('li').offsetWidth;
        ul.style.transition = `margin-left ${speed}ms`;
        ul.style.marginLeft = '0px';

        setTimeout(() => {
            ul.prepend(ul.querySelector('li:last-child'));
            ul.style.marginLeft = `-${liW}px`;
            ul.style.transition = '';
        }, speed);
    }

    function autoSlider() {
        timer = setInterval(() => {
            onNextSlide(slider);
            onNextSlide(slider2);
        }, 2000)
    }

    function stopSlide() {
        clearInterval(timer);
    }
}

