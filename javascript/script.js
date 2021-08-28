'use strict'

// 통합 검색
// 변수 지정
const   SchDivision = document.querySelector('.search_division'),
        SchList = document.querySelector('.search_list');

SchDivision.addEventListener('click', (e) => {
    e.preventDefault();
    SchList.classList.toggle('sch_on');
    for(let i = 0; i < SchList.children.length; i++){
        SchList.children[i].addEventListener('click', (e) => {
            e.preventDefault();
            SchDivision.innerText = SchList.children[i].innerText;
            SchList.classList.remove('sch_on');
        });
    }
});

/* 최상단 이동 버튼 */
// 변수 지정
const   TopBtn = document.querySelector('.gotop');

// 버튼 이벤트
TopBtn.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
    });
});


/* 통합 카테고리 메뉴 */
// 변수 지정
const   Category = document.querySelector('.categorynav'),
        Category_on = document.querySelector('.category'),
        CategoryBtn = document.querySelector('.allcategory'),
        Sub1 = document.getElementsByClassName('sub_1'),
        Sub2 = document.getElementsByClassName('sub_2');

// 통합카테고리 버튼 호버액션
CategoryBtn.addEventListener('mouseenter',() => {
    Category_on.classList.add('category_on');
    Category.style.display = 'block';
});
CategoryBtn.addEventListener('mouseleave',() => {
    Category_on.classList.remove('category_on');
    Category.style.display = 'none';
});

// 카테고리 메뉴 호버 액션
for(let i = 0; i < Sub1.length ;i++){
    Sub1[i].parentNode.addEventListener('mouseenter',() => {
        Sub1[i].style.display = 'block';
    });
    Sub1[i].parentNode.addEventListener('mouseleave',() => {
        Sub1[i].style.display = 'none';
    });
}
for(let i = 0; i < Sub2.length ;i++){
    Sub2[i].parentNode.addEventListener('mouseenter',() => {
        Sub2[i].style.display = 'block';
    });
    Sub2[i].parentNode.addEventListener('mouseleave',() => {
        Sub2[i].style.display = 'none';
    });
}

/* 슬라이드 */
// 변수 지정
const   SlideContainer = document.querySelector('.slide_continer'),
        Slider = document.querySelector('.slider'),
        Slide = document.getElementsByClassName('slide'),
        Pager = document.createElement('ul'),
        PrevBtn = document.querySelector('.prevbtn'),
        NextBtn = document.querySelector('.nextbtn'),
        SlideCount = Slide.length;

let SlideTimer = undefined,
    CurrentIdx = 0;
// 슬라이드 가로 배열 및 Pager 버튼 만들기
for(let i = 0; i < SlideCount; i++){
    Slide[i].style.left = 100 * i + '%';
    Pager.innerHTML += '<li></li>';
}
Pager.classList.add('pager');
SlideContainer.append(Pager);
// 무한 슬라이드 용 클론 만들기
const   FirstClone = Slide[0].cloneNode(true),//무한 슬라이드용 클론
        LastClone = Slide[SlideCount - 1].cloneNode(true);//무한 슬라이드용 클론
Slider.append(FirstClone);
Slider.prepend(LastClone);
FirstClone.classList.add('clone');
LastClone.classList.add('clone');

LastClone.style.left = -100 + '%';
FirstClone.style.left = 100 * SlideCount + '%';
// 슬라이드 움직이는 함수
function SlideMove(idx){
    Slider.style.left = -100 * idx + '%';
    Slider.classList.add('slide_animate');
    CurrentIdx = idx;
    for(let i = 0; i < Pager.children.length; i++){
        Pager.children[i].classList.remove('page_on');
    }
    CloneSlide(idx);
}
// 클론 배치
function CloneSlide(idx){
    if(idx == SlideCount){
        Pager.children[0].classList.add('page_on');
        setTimeout(function(){
            Slider.classList.remove('slide_animate');
            Slider.style.left = '0%';
            CurrentIdx = 0;
        }, 400);
        setTimeout(() => {Slider.classList.add('slide_animate')}, 500);
    }else if(idx < 0){
        Pager.children[SlideCount - 1].classList.add('page_on');
        setTimeout(() => {
            Slider.classList.remove('slide_animate');
            Slider.style.left = -100 * (SlideCount - 1) + '%';
            CurrentIdx = SlideCount - 1;
        }, 400);
        setTimeout(() => {Slider.classList.add('slide_animate')}, 500);
    }
    else{
        Pager.children[idx].classList.add('page_on');
    }
}
// 자동 슬라이드
function autoSlide(){
    SlideTimer = setInterval(() => {
        let Timeidx = (CurrentIdx + 1);
        SlideMove(Timeidx);
    }, 4000);
}
// 슬라이드 이벤트
SlideContainer.addEventListener('mouseenter', () => {clearInterval(SlideTimer)});
SlideContainer.addEventListener('mouseleave', () => {autoSlide()});
PrevBtn.addEventListener('click', () => {SlideMove(CurrentIdx - 1);});
NextBtn.addEventListener('click', () => {SlideMove(CurrentIdx + 1);});
for(let i = 0; i < Pager.children.length; i++){
    Pager.children[i].addEventListener('click', () => {SlideMove(i)});
}
// 슬라이드 초기값
SlideMove(0);
autoSlide();

// 인기 상품
// 변수 지정
const   MallContainer = document.querySelector('.mall_container'),
        MallContent = document.querySelector('.mall_content'),
        MallList = document.getElementsByClassName('mall_list'),
        MallTabBtn = document.querySelector('.mall_tab'),
        MallCount = MallList.length;
let MallIdx = 0;
// 인기상품 가로정렬
for(let i = 0; i < MallCount; i++){
    MallList[i].style.left = 100 * i + '%';
}
// 인기상품 움직이게 하기
function MoveMall(idx){
    MallContent.style.left = -100 * idx + '%';
    MallContent.classList.add('mall_list_on');
    MallIdx = idx;
    for(let i = 0; i < MallTabBtn.children.length; i++){
        MallTabBtn.children[i].classList.remove('mall_tab_on');
    }
    MallTabBtn.children[idx].classList.add('mall_tab_on');
}
for(let i = 0; i < MallTabBtn.children.length; i++){
    MallTabBtn.children[i].addEventListener('click', (e) => {
        e.preventDefault();
        MoveMall(i);
    });
}

// 신상품
// 변수지정
const   NewArrivals = document.querySelector('.new_arrivals');

for(let i = 0; i < NewArrivals.children.length; i++){
    NewArrivals.children[i].addEventListener('mouseenter',() => {NewArrivals.children[i].classList.add('hover_on');});
    NewArrivals.children[i].addEventListener('mouseleave',() => {
        for(let i = 0; i < NewArrivals.children.length; i++){
            NewArrivals.children[i].classList.remove('hover_on');
        }
    });
}

// 패밀리 사이트
// 변수 지정
const   FamilySite = document.querySelector('.family_sitelist'),
        FamilySiteBtn = document.querySelector('.family_sitebtn');

// 패밀리 사이트 버튼 이벤트
FamilySiteBtn.addEventListener('click', (e) => {
    e.preventDefault();
    FamilySite.classList.toggle('family_sitebtn_on');
});

// 카피라이트
// 변수 지정
const   Copyright = document.querySelector('.copyright'),
        CopyrightBtn = document.querySelector('.copyright_btn');

// 카피라이트 버튼 이벤트
CopyrightBtn.addEventListener('click',(e) => {
    e.preventDefault();
    Copyright.classList.toggle('copyright_btn_off');
    }
);