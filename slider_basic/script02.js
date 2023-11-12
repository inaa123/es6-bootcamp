/*
class로 스크립트를 생성할 때 특징
1.직접적인 연결이 아니기 때문에 window.onload 시작 함수는 필요없다. (외부에서 가져올 것 파일 연결만 하면됨. window.onload할 필요X)


*/

class Slider{//class객체는 일반함수와 클래스함수 구분하기 위해 대문자로
    //class함수는 일반함수와 구별하기 위해 대문자로 시작한다.

    constructor(item, opt){ //item : 선택자, opt:객체
        //class함수는 인스턴스를 새로 생성할 때마다 내부의 값들을 초기화 해야 한다. = constructor 
        // 일회용으로 사용할 경우 constructor필요X
    
        //함수 분리
        this.init(item, opt) // 기본값을 정의한 함수
        this.bindingEvent() // 이벤트를 정의한 함수
        //this : 인스턴스를 의미한다.
    }

    init(item, opt){
        //class 내부에서는 function은 생략
        let itemSelector = { //어떤 객체를 선택자로
            panel : this.panel,
            btns : this.btns,
            slideSpeed : this.speed,
        }
        this.opt = Object.assign({}, itemSelector, opt);
        //선택자 객체에서 나열이 가능한 속성을 복사해서 객체로 반환해주게 할 것
        this.slide = document.querySelector(item); //슬라이드 전체 영역
        this.panel = this.slide.querySelector(this.opt.panel);
        //itemSelector안에 있는 객체를 opt로 받아와서 panel안에 들어간 선택자를 설정할 것
        this.panelItem = this.panel.querySelectorAll('li');

        this.btns = this.slide.querySelector(this.opt.btns);
        this.btnsItem = this.btns.querySelectorAll('li');

        this.btnArr = Array.from(this.btnsItem); //선택자를 배열로 받아옴
        this.speed = this.opt.speed; //설정한 시간을 받아올 매개변수
        this.enableClick = true;
        this.timer;
    }

    bindingEvent(){
        this.btnsItem.forEach((el) => {
            el.addEventListener('click', (e) => {
                let isActive = el.classList.contains('on');
                //contains() 문자열을 찾아주는 메서드
                //el에 class명이 on인 문자열이 있는지 검사해서 있으면 true 없으면 flase 출력
                let activeIndex = this.btnArr.indexOf(e.currentTarget) //'on'이 있는 것들을 배열에 activeIndex에 담아준다.
                /*
                activeIndex는 isActive가 적용되고 있는 el을 찾아서 해당 요소를 activeIndex에 담는 방식이다.
                this는 인스턴스를 지칭하기 때문에 사용할 수 없으며, 
                currentTarget이라는 이벤트 메서드를 사용해야 한다.
                currentTarget은 el(element)중에서 addEventListener을 전달받은 요소가 된다.(this와 비슷한역할을 해줌)
                * 매개변수 event, e 필요
                */
                let slideW = parseInt(getComputedStyle(this.slide).width); //한번에 얼만큼 이동할지

                if(this.enableClick){
                    this.animate(this.panel, {
                        prop : 'left',
                        val : -slideW * activeIndex,
                        duration : this.speed
                    })
                    this.activeSlide(activeIndex, this.btnsItem);
                    this.activeSlide(activeIndex, this.panelItem);
                    if(this.opt.callback){ //callback이 있으면 activeIndex +1해준다.
                        this.opt.callback(activeIndex + 1);
                    }

                    this.enableClick = false;
                }
            })
        })
    }

    activeSlide(itemNum, item){
        for (let el of item){
            el.className = '';
        }
        item[itemNum].classList.add('on')
    }

    animate(el, opt){
        let startActive = performance.now();
        let currentValue;
        //console.log(this);Slider객체
        let self = this;
        console.log(self);

        if(opt.prop === 'opacity'){
            currentValue = parseFloat(getCoumputedStyle(el)[opt.prop]);
        }else{
            currentValue = parseInt(getComputedStyle(el)[opt.prop]);
        }

        if(currentValue !== opt.value){
            requestAnimationFrame(run);
        }

        function run(time){
            //run은 특정 함수 내부에 있는 내장 함수이기 때문에 function을 생략할 수 없다.
            let lastTime = time - startActive;
            let progress = lastTime / opt.duration;
            //console.log(this); //undefined -> this가 전달이 안됨. 그래서 animate에 let self = this를 줘서 self로 this를 가져온다.
            //console.log(self);
            /*
            //this가 아닌 self를 사용하는 이유
            내부 함수에서는 this를 받아올 경우 인스턴스가 아닌 undefined를 반환한다.
            즉, 전달받지 못한다는 의미다.

            그래서 상위 함수에서 this를 변수에 저장해서 내부함수에 변수로 전달하게 되면 변수에는 this의 값이 고정되어 저장되어 있으므로
            같은 선택자를 선택할 수 있게 된다.
            */

            if(progress < 0){
                progress = 0;
            }else if(progress > 1){
                progress = 1;
            }

            if(progress < 1){
                self.timer = requestAnimationFrame(run);
            }else {
                cancelAnimationFrame(self.timer);
                self.enableClick = true;
            }

            let result = currentValue + (opt.val - currentValue) * progress;
            //console.log(result);
            if(opt.prop === 'opacity'){
                el.style[opt.prop] = result;
                //self가 아닌 el로 잡아야함.
            }else {
                el.style[opt.prop] = result + 'px';
            }
        }
    }
}