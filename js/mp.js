
const typeAnimal = new TypeAnimal()
const breedAnimal = new BreedAnimal()
const travelBoxes = new TravelBoxes()
const countryInfo = new CountryInfo()
const products = new Product()
const dropDownList = new DropDownList()

window.onload = () => {


    let promise = new Promise((resolve, reject) => {
        console.log('step 1')
        travelBoxes.getBoxes( resolve)
    })

    travelBoxes.showTravelBoxCardMainPage()

    typeAnimal.getTypeAnimal()
    countryInfo.famousCoutries()

    dropDownList.focusSelector({
        arrItems: '.type_link_item',
        sel: '.type_link_block',
        back: '#view_link_inpt',
        check: '#check_link_inpt',
        list: '.list_items_links',
        wrap: '#wrapper_select_links',
        text: '.type_link_text',
        invText: '#inv_text_link'
    })


    promise.then(
        result => {
            console.log('step 2')
            travelBoxes.drawBoxesMainPage(2)
        },
        err => alert(err.message)
    )





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
        } else {
            // Если элемент не видно, то запускаем этот код
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
    })


    


    //Вопросы внизу страницы 
    let questBlock = document.querySelectorAll('.item_question_block')
    questBlock.forEach( el => {
        
        if (el.getAttribute('value') == 1) {
            el.onclick = () => {
                console.log(el)
                el.setAttribute('value', 0)
                let txt = document.querySelector('.')
                let head = el.firstChild
    
                txt.style.display = 'block'
                head.setAttribute('class', 'header_question active_head_quest')
                el.setAttribute('value', 'item_question_block active_block_quest')
            }
            
        } else {
            el.onclick = () => {
    
                el.setAttribute('value', 1)
                let txt = el.lastChild
                let head = el.firstChild

                txt.style.display = 'block'
                head.setAttribute('class', 'header_question')
                el.setAttribute('value', 'item_question_block')
            }
        }
        
    })

    travelBoxes.switchTravelBoxesMainPage(visible, opacity)


    //Взаимодействие с полем страной прибытия
    let country_inpt = document.querySelector('#country_arrival')
    let country_list = document.querySelector('#coutry_list')
    let wrapper_country = document.querySelector('#wrapper_seacrch_country')

    country_inpt.oninput = () => {
        countryInfo.clearValid()
        if (country_inpt.value.length >= 3) {
            countryInfo.searching(country_inpt)
        } else if (country_inpt.value.length < 3 && country_inpt.value.length > 0) {
            countryInfo.clearValid()
        } else if (country_inpt.value.length == 0) {
            country_inpt.classList.remove('full_list_input')
            countryInfo.famousCoutries()
        }
    }
    country_inpt.onfocus = () => {
        country_list.style.display = 'grid'
        wrapper_country.style.display = "block"
        if (country_inpt.value.length == 0) return countryInfo.famousCoutries()
        
    }
    wrapper_country.onclick = () => {
        wrapper_country.style.display = "none"
        country_list.style.display = 'none'
    }



    //Взаимодействие с полем порода животного
    let type_animal = document.querySelector('#type_animal_inpt')
    let breed_list = document.querySelector('#breed_list')
    let wrapper_breed = document.querySelector('#wrapper_breed_animal')

    type_animal.oninput = () => {
        breedAnimal.clearValid()
        if (type_animal.value.length >= 3) {
            breedAnimal.searching()
        } else if (type_animal.value.length < 3 && type_animal.value.length > 0) {
            breedAnimal.clearValid()
        } else if (type_animal.value.length == 0) {
            type_animal.classList.remove('full_list_input')
            breedAnimal.famousTypes()
        }
    }
    type_animal.onfocus = () => {
        breed_list.style.display = 'grid'
        wrapper_breed.style.display = "block"
        if (type_animal.value.length == 0) return breedAnimal.famousTypes()
    }
    wrapper_breed.onclick = () => {
        wrapper_breed.style.display = 'none'
        breed_list.style.display = 'none'
    }




    let inputs = document.querySelectorAll('.input_text')
    inputs.forEach(el => {
        el.onfocus = () => {
            el.classList.add('focus_input')
        }
        el.onblur = () => {
            if (el.value.length == 0 || el.value == '+7(___)___-__-__') {
                el.classList.remove('focus_input')
            } else if (el.value.length > 0 && !el.validity.valid ||
                el.value == '+7(___)___-__-__' && !el.validity.valid) {
                el.classList.add('invalid_input')
                el.classList.remove('valid_input')
                el.classList.remove('focus_input')
            } else if (el.value.length > 0 && el.validity.valid) {
                el.classList.add('valid_input')
                el.classList.remove('invalid_input')
                el.classList.remove('focus_input')
            }
        }
    })

    let valid_inputs = document.querySelectorAll('.text_validity')
    valid_inputs.forEach(el => {
        el.oninput = () => {
            if (el.value.length > 0 && el.validity.valid) {
                el.classList.add('valid_input')
                el.classList.remove('invalid_input')
                el.classList.remove('focus_input')
            }
        }
    })


    function departureDate() {
        let input = document.querySelector('#date_departure')
        let state = ''
        input.oninput = () => {
            if (input.value.length < 10) {
                input.classList.remove('invalid_input')
                input.classList.remove('valid_input')
            }

            let currentDate = new Date()

            let curDay = currentDate.getDate()
            let curMonth = currentDate.getMonth() + 1
            let curYear = currentDate.getFullYear()

            let val = input.value.split('')
            let arrToDraw = ''

            let day = (val[0] + val[1]) * 1
            let month
            let year

            if (val.length == 4) {
                month = val[3] * 1
            } else if (val.length > 4) {
                month = (val[3] + val[4]) * 1
            }

            if (val.length == 7) {
                year = val[6] * 1
            } else if (val.length == 8) {
                year = (val[6] + val[7]) * 1
            } else if (val.length == 9) {
                year = (val[6] + val[7] + val[8]) * 1
            } else if (val.length > 9) {
                year = (val[6] + val[7] + val[8] + val[9]) * 1
            }
            let bissextile = year % 4


            for (let i = 0; i < input.value.length; i++) {
                if (/[^0-9]/.test(val[i]) && /[^\.]/.test(val[i])) {
                    val.pop()
                    val.forEach(el => arrToDraw += el)
                    state = arrToDraw
                    input.value = arrToDraw
                    return
                }
            }

            if (input.value.length > 1 && input.value.length < 3) {
                if (/[0-9]{1,2}/.test(day)) {
                } else {
                    val.pop()
                    val.forEach(el => arrToDraw += el)
                    state = arrToDraw
                    input.value = arrToDraw
                    return
                }
            } else if (input.value.length > 3 && input.value.length < 6) {
                if (/[0-9]{1,2}/.test(day) && /[0-9]{1,2}/.test(month)) {
                } else {
                    val.pop()
                    val.forEach(el => arrToDraw += el)
                    state = arrToDraw
                    input.value = arrToDraw
                    return
                }
            } else if (input.value.length > 6) {
                if (/[0-9]{1,2}/.test(day) && /[0-9]{1,2}/.test(month) && /([0-9]{1,4})/.test(year)) {
                } else {
                    val.pop()
                    val.forEach(el => arrToDraw += el)
                    state = arrToDraw
                    input.value = arrToDraw
                    return
                }

            }


            if (val.length == 2 && state.length < val.length ||
                val.length == 5 && state.length < val.length) {
                val.push('.')
            }

            if (val.length >= 11) {
                val.pop()
            }

            if (day > 31 && month != 02) {
                val[0] = '3'
                val[1] = '1'
            } else if (bissextile == 0 && day > 29 && month == 02) {
                val[0] = '2'
                val[1] = '9'
            } else if (bissextile > 0 && day > 28 && month == 02) {
                val[0] = '2'
                val[1] = '8'
            }

            if (month > 12) {
                val[3] = '1'
                val[4] = '2'
            }


            if (year > 2025 && year.toString().length == 4) {
                val[6] = '2'
                val[7] = '0'
                val[8] = '2'
                val[9] = '5'
            } else if (year < 2020 && year.toString().length == 4) {
                val[6] = '2'
                val[7] = '0'
                val[8] = '2'
                val[9] = '0'
            } else if (year < 200 && year.toString().length == 3) {
                val[6] = '2'
                val[7] = '0'
                val[8] = '0'
            }



            if (val.length == 10) {
                if (curYear > year) {
                    input.classList.remove('valid_input')
                    input.classList.add('invalid_input')
                    document.querySelector('#inv_text_date_departure').innerText = `Укажите не раньше ${curDay}.${curMonth}.${curYear}`
                } else if (curMonth > month && curYear >= year) {
                    input.classList.remove('valid_input')
                    input.classList.add('invalid_input')
                    document.querySelector('#inv_text_date_departure').innerText = `Укажите не раньше ${curDay}.${curMonth}.${curYear}`
                    return
                } else if (curDay > day && curMonth >= month && curYear >= year) {
                    input.classList.remove('valid_input')
                    input.classList.add('invalid_input')
                    document.querySelector('#inv_text_date_departure').innerText = `Укажите не раньше ${curDay}.${curMonth}.${curYear}`
                    return
                } else {
                    input.classList.add('valid_input')
                    input.classList.remove('invalid_input')
                    document.querySelector('#inv_text_date_departure').innerText = `Укажите не раньше ${curDay}.${curMonth}.${curYear}`
                }
            }
            val.forEach(el => {
                arrToDraw += el
            })

            state = arrToDraw
            input.value = arrToDraw
        }
    }
    departureDate()
    //маска для телефона
    $('#your_telephone').mask('+7(999)999-99-99')



    let openForm = document.querySelector('#open_form')
    openForm.onclick = () => {
        let type = document.querySelector('#view_animal_inpt').getAttribute('value')
        let type_text = document.querySelector('#type_breed_text').textContent
        let breed = document.querySelector('#type_animal_inpt').value
        let country = document.querySelector('#country_arrival').value
        let date = document.querySelector('#date_departure').value
        
        console.log(type)
        if (type.length == 0) {
            document.querySelector('#view_animal_inpt').classList.add('invalid_select')
            document.querySelector('#animal_type_inv_text').style.display = 'block'
            
        }

        if (breed.length == 0) {
            breedAnimal.invalidInpt()
        }

        if (country.length == 0) {
            countryInfo.invalidInpt()
        }

        if (date.length == 0) {
            document.querySelector('#date_departure').classList.add('invalid_input')
        }


        if (type.length != 0 &&
            breed.length != 0 &&
            country.length != 0 &&
            date.length != 0) {
                localStorage.setItem('animal_type', type)
                localStorage.setItem('type_text', type_text)
                localStorage.setItem('breed', breed)
                localStorage.setItem('country', country)
                localStorage.setItem('date', date)
        
                window.open('./form_aniway.html')
        } else {
            return
        }

        
    }

    

    window.onunload = () => {
        localStorage.clear()
    }
}