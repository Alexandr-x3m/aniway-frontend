window.onload = () => {





    function openCards() {
        let btns = document.querySelectorAll('.more_info_сards')

        btns.forEach(el => {
            el.onclick = () => {
                let val = el.getAttribute('value')
                let conteiner = document.querySelector(`#card_conteiner_${val}`)

                conteiner.style.display = 'block'

                gsap.from(conteiner, {
                    duration: 0.5,
                    scale: 0.1,
                    ease: "power2.out"
                })

            }
        })
    }


    function closeCard() {
        let btns = document.querySelectorAll('.btn_close_card_worker')

        btns.forEach(el => {
            el.onclick = () => {
                let val = el.getAttribute('value')
                let conteiner = document.querySelector(`#card_conteiner_${val}`)
                conteiner.style.display = 'none'
            }
        })
    }

    openCards()
    closeCard()

 
    function visible(target, func, dist) {
        // Все позиции элемента
        var targetPosition = {
            top: window.pageYOffset + target.getBoundingClientRect().top,
            left: window.pageXOffset + target.getBoundingClientRect().left,
            right: window.pageXOffset + target.getBoundingClientRect().right,
            bottom: window.pageYOffset + target.getBoundingClientRect().bottom
        },
            // Получаем позиции окна
            windowPosition = {
                top: window.pageYOffset,
                left: window.pageXOffset,
                right: window.pageXOffset + document.documentElement.clientWidth,
                bottom: window.pageYOffset + document.documentElement.clientHeight
            };
        if (targetPosition.bottom > windowPosition.top && // Если позиция нижней части элемента больше позиции верхней чайти окна, то элемент виден сверху
            targetPosition.top < windowPosition.bottom && // Если позиция верхней части элемента меньше позиции нижней чайти окна, то элемент виден снизу
            targetPosition.right > windowPosition.left && // Если позиция правой стороны элемента больше позиции левой части окна, то элемент виден слева
            targetPosition.left < windowPosition.right) { // Если позиция левой стороны элемента меньше позиции правой чайти окна, то элемент виден справа
            // Если элемент полностью видно, то запускаем следующий код
                
            let val = target.getAttribute('value')

            if (val == '1') {
                target.setAttribute('value', 0)
                func(target, dist)
            }

            console.clear();
            console.log('Вы видите элемент :)');
        } else {
            // Если элемент не видно, то запускаем этот код
            console.clear();
        };
    };


    function showTopBottom(target, dist) {
        gsap.from(target, { duration: 0.8, y: dist, ease: "slow(0.7, 0.7, false)" })
        gsap.to(target, { duration: 0.8, opacity: 1, ease: "slow(0.7, 0.7, false)" })
    }
    
    function opacity(target) {
        gsap.to(target, { duration: 1.5, opacity: 1, ease: "slow(0.7, 0.7, false)" })
    }

    

    window.addEventListener('scroll', () => {

        let windowScroll = document.body.scrollTop || document.documentElement.scrollTop
        let windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight
        let windowClient = document.documentElement.clientHeight

        console.log(windowClient)

        let textVideoBL = document.querySelector('.video_text_block')
        visible(textVideoBL, showTopBottom, 100)

        let head = document.querySelectorAll('.header_window')
        head.forEach(el => visible(el, showTopBottom, 100))

        let unHead = document.querySelectorAll('.under_header_window')
        unHead.forEach(el => visible(el, showTopBottom, 50))

        let onlineBlock = document.querySelector('.service_online_block')
        let offlineBlock = document.querySelector('.service_ofline_block')
        visible(offlineBlock, showTopBottom, 300)
        visible(onlineBlock, showTopBottom, 300)

        let travelBox = document.querySelectorAll('.item_travel_box')
        travelBox.forEach( el => visible(el, opacity))

        let cardsBlock = document.querySelectorAll('.item_cards_block')
        cardsBlock.forEach(el => visible(el, showTopBottom, 200))

        let hintText = document.querySelector('.hint_text_block')
        let supportText = document.querySelector('.support_text_block')
        visible(hintText, showTopBottom, 100)
        visible(supportText, showTopBottom, 100)

        let questions = document.querySelectorAll('.item_question_block')
        questions.forEach(el => visible(el, showTopBottom, 50))

        let socialBlock = document.querySelectorAll('.item_social_block')
        socialBlock.forEach(el => visible(el, showTopBottom, 100))
        

        console.log(windowScroll)

    })


    let dogTb = document.querySelector('#show_dag_tb')
    let catTb = document.querySelector('#show_cat_tb')
    let rabbitTb = document.querySelector('#show_rabbit_tb')

    let listCat = document.querySelector('.list_travel_box_cat')
    let listDog = document.querySelector('.list_travel_box_dog')
    let listRabbit = document.querySelector('.list_travel_box_rabbit')

    dogTb.onclick = () => {
        listCat.style.display = 'none'
        listRabbit.style.display = 'none'
        listDog.style.display = 'grid'
        gsap.from(listDog, { duration: 0.8, y: 100, ease: "power2.out" })


        dogTb.setAttribute('class', 'active_nav_el')
        catTb.setAttribute('class', '')
        rabbitTb.setAttribute('class', '')
        let travelBox = document.querySelectorAll('.item_travel_box')
        travelBox.forEach( el => visible(el, opacity))
    }
    catTb.onclick = () => {
        listDog.style.display = 'none'
        listRabbit.style.display = 'none'
        listCat.style.display = 'grid'
        gsap.from(listCat, { duration: 0.8, y: 100, ease: "power2.out" })

        catTb.setAttribute('class', 'active_nav_el')
        dogTb.setAttribute('class', '')
        rabbitTb.setAttribute('class', '')
        let travelBox = document.querySelectorAll('.item_travel_box')
        travelBox.forEach( el => visible(el, opacity))
    }
    rabbitTb.onclick = () => {
        listCat.style.display = 'none'
        listDog.style.display = 'none'
        listRabbit.style.display = 'grid'
        gsap.from(listRabbit, { duration: 0.8, y: 100, ease: "power2.out" })

        rabbitTb.setAttribute('class', 'active_nav_el')
        catTb.setAttribute('class', '')
        dogTb.setAttribute('class', '')
        let travelBox = document.querySelectorAll('.item_travel_box')
        travelBox.forEach( el => visible(el, opacity))
    }


    //Вопросы внизу страницы 
    let questBlock = document.querySelectorAll('.item_question_block')
    questBlock.forEach( el => {
        
        if (el.getAttribute('value') == 1) {
            el.onclick = () => {
                console.log(el)
                debugger
                el.setAttribute('value', 0)
                let txt = document.querySelector('.')
                let head = el.firstChild
    
                txt.style.display = 'block'
                head.setAttribute('class', 'header_question active_head_quest')
                el.setAttribute('value', 'item_question_block active_block_quest')
            }
            
        } else {
            el.onclick = () => {
                debugger
                el.setAttribute('value', 1)
                let txt = el.lastChild
                let head = el.firstChild

                txt.style.display = 'block'
                head.setAttribute('class', 'header_question')
                el.setAttribute('value', 'item_question_block')
            }
        }
        
    })

}