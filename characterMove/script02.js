
class MotionMenu{
    constructor(opt){ //인스턴스 만들 때마다 초기화시켜줌, constructor가 없으면 인스턴스 생성할 수 X
        //this.opt = opt;
        this.init(opt); //opt만 받아옴
        this.bindingEvent();
    }

    init(opt){
        this.btn = document.querySelector(opt.btn);
        this.btnItem = this.btn.querySelectorAll('li');
        this.title = document.querySelector(opt.title);
        this.titleItem = this.title.querySelectorAll('li');
        this.chaImg = document.querySelector(opt.chaImg);
        this.chaImgItem = this.chaImg.querySelectorAll('li');
    }
    
    bindingEvent(){
        this.btnItem.forEach((el, idx) => {
            el.addEventListener('click', ()=>{
                this.activation(this.btnItem, idx);
                this.activation(this.titleItem, idx);
                this.activation(this.chaImgItem, idx);
            })
        })
    }

    activation(item, index){
        for(let el of item){
            el.classList.remove('on');
        }
        item[index].classList.add('on');
    }

    
    
}

