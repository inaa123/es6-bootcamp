

/*
1. 마우스가 움직이는 방향을 받아와서 오브젝트의 방향에 대입한다.
2. 도트를 클릭하면 슬라이드가 실행된다.

*/

window.onload = () => {

    const chaImg = document.querySelector('.pic li.on img'); //.pic안의 li중 on이 들어간 img찾기
    //보여지는 캐릭터이미지가 하나니까 굳이 all을 사용하지 않고 하나만 찾되, 선택자로 on이 들어간이미지를 찾으면 된다.
    const deco2 = document.querySelector('.deco2 img');
    const deco3 = document.querySelector('.deco3 img');

    //버튼
    const btn = document.querySelector('.list');
    const btnItem = btn.querySelectorAll('li');

    //이미지
    const pic = document.querySelector('.pic');
    const picItem = pic.querySelectorAll('li');

    const title = document.querySelector('.title');
    const titleItem = title.querySelectorAll('li');


    btnItem.forEach((el, index)=>{
        el.addEventListener('click', () =>{ 
            /*
            for(let item of picItem){
                item.classList.remove('on');
            }
            for(let item of btnItem){
                item.classList.remove('on');
            }
            for(let item of titleItem){
                item.classList.remove('on');
            }
            picItem[index].classList.add('on');
            btnItem[index].classList.add('on');
            titleItem[index].classList.add('on');
            */
            activation(picItem, index);
            activation(titleItem, index);
            activation(btnItem, index);
        })
    })




    //움직이는 거 (특정 영역아닌 아무데서나 움직이기 때문에 document말고 window로 준다.)
    window.addEventListener('mousemove', (e) => { //mousemove는 매개변수 필요하다
        //마우스가 움직이는 방향을 알아야함.
        //let x = e.pageX;
        //let y = e.pageY;

        //chaImg.style.left = x/40 + 'px'; // 확 움직이기 때문에 x,y에 임의읙 값을 나눠줌
        //chaImg.style.top = y/40 + 'px';

        //deco2.style.left = x/35 + 'px';
        //deco2.style.top = y/35 + 'px';

        ///deco3.style.left = -x/50 + 'px'; // 반대방향으로 움직이려면 -
        //deco3.style.top = -y/50 + 'px';

        //중복제거를 위해 함수로 만들기
        moveImg(chaImg, e, 40, true);
        moveImg(deco2, e, 60, false);
        moveImg(deco3, e, 30, false);
    })

    function moveImg(el, event, speed, reverse){ //매개변수4개 (reverse : true/false)
        let x,y;
        if(reverse){ //reverse가 true면  마우스방향과 반대로(-)
            x = -event.pageX;
            y = -event.pageY;
        }else {
            x = event.pageX;
            y = event.pageY;
        }
        el.style.left = x/speed + 'px';
        el.style.top = y/speed + 'px';
    }

    function activation(item, idx){
        for(let el of item){
            el.classList.remove('on');
        }
        item[idx].classList.add('on');
    }
    
}



