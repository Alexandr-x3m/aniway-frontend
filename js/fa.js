const formOrder = new FormOrder()
const typeAnimal = new TypeAnimal()
const breedAnimal = new BreedAnimal()
const travelBoxes = new TravelBoxes()
const countryInfo = new CountryInfo()
const products = new Product()
const dropDownList = new DropDownList()


window.onload = () => {
    let promise = new Promise((resolve, reject) => {
        console.log('step 1')
        travelBoxes.getBoxes(resolve)
    })

    promise.then(
        result => { },
        err => alert(err.message)
    )

    typeAnimal.getTypeAnimal()
    countryInfo.famousCoutries()
    formOrder.loadForm()

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



    //переход на следующий шаг
    let step_one = document.querySelector('#step_one')
    let step_two = document.querySelector('#step_two')
    let step_one_circle = document.querySelector('#step_one_circle')
    let step_two_circle = document.querySelector('#step_two_circle')
    let step_tree_circle = document.querySelector('#step_tree_circle')

    let tb_next_step = document.querySelector('#tb_next_step')
    let send_form = document.querySelector('#last_step')
    let repeat_send_appl = document.querySelector('#repeat_send_appl')
    let close_tb = document.querySelectorAll('.close_tb')

    let btn_up_back_step_two = document.querySelector('#btn_up_back_step_two')
    let btn_up_back_step_one = document.querySelector('#btn_up_back_step_one')
    let dwn_back_step_two = document.querySelector('#dwn_back_step_two')

    let form_step_one = document.querySelector('.form_step_one')
    let form_step_two = document.querySelector('.form_step_two')
    let form_step_tree = document.querySelector('.form_step_tree')

    let header = document.querySelector('.header_conteiner')
    let footer = document.querySelector('.footer_conteiner')
    let form = document.querySelector('.form_conteiner')
    let arcs = document.querySelector('.arc_conteiner')

    function showLeftRight(target, dist) {
        gsap.from(target, { duration: 0.2, x: dist, ease: "slow(0.7, 0.7, false)" })
        gsap.to(target, { duration: 0.2, opacity: 1, ease: "slow(0.7, 0.7, false)" })
    }

    function stepOne() {
        //Навигация по шагам
        document.querySelector('#step_two_text').classList.add('empty_text')
        document.querySelector('#step_two_text').classList.remove('full_text')
        document.querySelector('#step_tree_text').classList.add('empty_text')
        document.querySelector('#step_tree_text').classList.remove('full_text')

        let width = document.documentElement.clientWidth

        if (width > 1690) {
            header.style.width = '876px'
            footer.style.width = '876px'
            form.style.width = '876px'
            document.querySelector('.nav_form_conteiner').style.width = '582px'
            arcs.style.width = '0px'
        } else if (width < 1690 && width > 900) {
            form.style.width = '876px'
            header.style.width = '876px'
            footer.style.width = '876px'
            document.querySelector('.nav_form_conteiner').style.width = '582px'
            document.querySelector('.nav_form_conteiner').style.margin = 'auto'
            document.querySelector('.nav_form_conteiner').style.left = '0'
            arcs.style.width = '0px'
        } else if (width < 640) {
            header.style.width = '90%'
            form.style.width = '100%'
            document.querySelector('.nav_form_conteiner').style.left = '5%'
            arcs.style.width = '0px'
        }


        //Контейнер второго окна
        document.querySelector('.form_step_one').style.display = 'block'
        document.querySelector('.form_step_two').style.display = 'none'
        document.querySelector('.form_step_tree').style.display = 'none'

        //Кнопки "назад" с врехним расположением 
        btn_up_back_step_one.style.display = 'none'
        btn_up_back_step_two.style.display = 'none'
        dwn_back_step_two.style.display = 'none'

        showLeftRight(form_step_one, 500)
    }
    function stepTwo() {
        //Навигация по шагам
        step_two_circle.classList.add('full_circle')
        step_two_circle.classList.remove('empty_circle')
        step_tree_circle.classList.add('empty_circle')
        step_tree_circle.classList.remove('full_circle')

        document.querySelector('#step_two_text').classList.add('full_text')
        document.querySelector('#step_two_text').classList.remove('empty_text')
        document.querySelector('#step_tree_text').classList.add('empty_text')
        document.querySelector('#step_tree_text').classList.remove('full_text')

        let width = document.documentElement.clientWidth

        if (width > 1080) {
            header.style.width = '1050px'
            footer.style.width = '1050px'
            form.style.width = '1050px'
            document.querySelector('.nav_form_conteiner').style.width = '884px'
            arcs.style.width = '190px'
        } else if (width < 1080 && width > 640) {
            header.style.width = '90%'
            footer.style.width = '90%'
            form.style.width = '100%'
            document.querySelector('.nav_form_conteiner').style.width = '100px'
            document.querySelector('.nav_form_conteiner').style.left = '5%'
            document.querySelector('.nav_form_conteiner').style.margin = '0'
            arcs.style.width = '190px'
        } else if (width < 640) {
            header.style.width = '90%'
            footer.style.width = '90%'
            form.style.width = '100%'
            document.querySelector('.nav_form_conteiner').style.width = '100px'
            document.querySelector('.nav_form_conteiner').style.left = '5%'
            arcs.style.width = '96px'
        }


        //Контейнер второго окна
        document.querySelector('.form_step_one').style.display = 'none'
        document.querySelector('.form_step_two').style.display = 'block'
        document.querySelector('.form_step_tree').style.display = 'none'

        //Кнопки "назад" с врехним расположением 
        btn_up_back_step_one.style.display = 'grid'
        btn_up_back_step_two.style.display = 'none'
        dwn_back_step_two.style.display = 'block'

        showLeftRight(form_step_two, 500)
    }
    function stepTree() {

        //Навигация по шагам
        step_tree_circle.classList.add('full_circle')
        step_tree_circle.classList.remove('empty_circle')

        document.querySelector('#step_tree_text').classList.add('full_text')
        document.querySelector('#step_tree_text').classList.remove('empty_text')



        document.querySelector('.form_step_one').style.display = 'none'
        document.querySelector('.form_step_two').style.display = 'none'
        document.querySelector('.form_step_tree').style.display = 'block'

        let width = document.documentElement.clientWidth

        if (width > 1080) {
            header.style.width = '1050px'
            footer.style.width = '1050px'
            form.style.width = '1050px'
            arcs.style.width = '410px'
        } else if (width < 1080 && width > 640) {
            header.style.width = '90%'
            footer.style.width = '90%'
            form.style.width = '100%'
            document.querySelector('.nav_form_conteiner').style.width = '884px'
            document.querySelector('.nav_form_conteiner').style.margin = '0'
            arcs.style.width = '410px'
        } else if (width < 640) {
            header.style.width = '90%'
            footer.style.width = '90%'
            form.style.width = '100%'
            document.querySelector('.nav_form_conteiner').style.left = '5%'
            arcs.style.width = '200px'
        }

        //Кнопки "назад" с врехним расположением 
        btn_up_back_step_one.style.display = 'none'
        btn_up_back_step_two.style.display = 'grid'
        dwn_back_step_two.style.display = 'none'

        showLeftRight(form_step_tree, 500)
    }

    step_one.onclick = () => {
        if (formOrder.validStepOne()) {
            let boxes = document.querySelectorAll('.box_item_block')
            boxes.forEach(el => el.remove())

            //Услиги
            let services = document.querySelectorAll('.item_service')
            services.forEach(el => el.remove())

            products.load(10)
            products.load(11)

            travelBoxes.drawBoxesStageOne()

            stepTwo()

            step_two_circle.onclick = () => {
                stepTwo()
            }
        } else {

        }

        step_two.onclick = () => {

            stepTree()

            travelBoxes.drawBoxesStageTree()

            formOrder.finallyPrice()

            step_tree_circle.onclick = () => {
                stepTree()
            }
        }
    }



    btn_up_back_step_two.onclick = () => { stepTwo() }
    btn_up_back_step_one.onclick = () => { stepOne() }
    dwn_back_step_two.onclick = () => { stepOne() }

    send_form.onclick = () => {
        if (formOrder.validLastStep()) {
            formOrder.takeAllInputs()
            formOrder.sendForm()
        }
    }

    repeat_send_appl.onclick = () => {
        formOrder.sendForm()
    }

    close_tb.forEach(el => {
        el.onclick = () => {
            document.querySelector('.form_conteiner').style.display = 'block'
            document.querySelector('.travel_box_conteiner').style.display = 'none'
        }
    })
    step_one_circle.onclick = () => {
        stepOne()
    }

    //Тревел бокс следующий шаг
    tb_next_step.onclick = () => {
        travelBoxes.updateChosenTB()
        document.querySelector('.form_conteiner').style.display = 'block'
        document.querySelector('.travel_box_conteiner').style.display = 'none'
        let val = tb_next_step.getAttribute('value')
        products.addProducts()
        stepTwo()
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


    // Кнопка прикрепления документов
    let file = document.querySelector('#file')
    let file_block = document.querySelector('.file_block')

    file.onchange = () => {
        let count = document.querySelector('#file').files.length
        let txt = document.querySelector('.text_file_btn')
        if (count == 1) {
            txt.innerText = `Вы прикрепили ${count} файл`
        } else if (count >= 2 && count <= 4) {
            txt.innerText = `Вы прикрепили ${count} файла`
        } else if (count > 5) {
            txt.innerText = `Вы прикрепили ${count} файлов`
        }
        txt.style.lineHeight = '26px'
        txt.style.marginTop = '20px'
    }
    file_block.onmouseover = () => {
        document.querySelector('.icon_inpt_file').setAttribute('src', './style/img/add_file_orange.svg')
        document.querySelector('.js-fileName').style.borderLeft = '1px solid #F16331'
    }
    file_block.onmouseout = () => {
        document.querySelector('.icon_inpt_file').setAttribute('src', './style/img/add_file.svg')
        document.querySelector('.js-fileName').style.borderLeft = '1px solid #DBDBDB'
    }

    //Поле ввода возраста
    let left_age = document.querySelector('#year_age_anim_inpt')
    let rigth_age = document.querySelector('#month_age_anim_inpt')
    let label_age = document.querySelector('#label_age_pet')
    let back_age = document.querySelector('.composite_input_back')


    left_age.oninput = () => {
        console.log('was')
        let text = document.querySelector('.year_text_input')
        let validIcon = document.querySelector('.val_icon_age_pet')
        let invIcon = document.querySelector('.inv_icon_age_pet')


        let arrVal = []
        let val = left_age.value

        for (let i = 0; i < val.length; i++) {
            arrVal.push(val[i])
        }

        if (val == '') {
            validIcon.style.display = 'none'
            text.innerText = ''
            return left_age.value = val
        }
 
        if (val.length > 2 ||
            /[^0-9]/.test(val[val.length - 1]) ) {
            arrVal.pop()
            let txt = ''
            arrVal.forEach(el => txt += el)
            return left_age.value = txt
        }


        
        if (val * 1 > 19) {
            arrVal[0] = '1'
            arrVal[1] = '9'
        }


        let el
        if (arrVal.length == 1) {
            el = arrVal[0]
            text.style.left = '0px'
            label_age.classList.add('active_text')
        } else {
            el = arrVal[0] + arrVal[1]
            text.style.left = '10px'
            label_age.classList.add('active_text')
        }


        if (el == 0) {
            rigth_age.value = el
            text.innerText = 'лет'
            document.querySelector('.composite_input_back').classList.remove('invalid_back')
            document.querySelector('#inv_text_age_anim').style.display = 'none'
            document.querySelector('.inv_icon_age_pet').style.display = 'none'
        }
        if (el == 1 || el == 21 || el == 31 || el == 41) {
            left_age.value = el
            text.innerText = 'год'
            validIcon.style.display = 'block'
        }

        if (el >= 2 && el <= 4 ||
            el >= 22 && el <= 24 ||
            el >= 32 && el <= 34 ||
            el >= 42 && el <= 44) {
            left_age.value = el
            text.innerText = 'года'
            validIcon.style.display = 'block'
        }

        if (el >= 5 && el <= 20 ||
            el >= 25 && el <= 30 ||
            el >= 35 && el <= 40 ||
            el >= 45 && el <= 50) {
            left_age.value = el
            text.innerText = 'лет'
            validIcon.style.display = 'block'
        }

    }

    function focusLeftInpt() {
        left_age.onfocus = () => {
            left_age.classList.add('focus_left_input')
            rigth_age.classList.add('focus_right_input')
            label_age.classList.add('active_text')
            back_age.classList.add('focus_back')
        }
    }

    focusLeftInpt()
    document.querySelector('.year_text_input').onclick = () => { left_age.focus() }


    function focusRightInpt() {
        rigth_age.onfocus = () => {
            left_age.classList.add('focus_left_input')
            rigth_age.classList.add('focus_right_input')
            back_age.classList.add('focus_back')
        }
    }
    focusRightInpt()
    document.querySelector('.month_text_input').onclick = () => { rigth_age.focus() }
    rigth_age.oninput = () => {
        
        let text = document.querySelector('.month_text_input')
        let validIcon = document.querySelector('.val_icon_age_pet')
        let invIcon = document.querySelector('.inv_icon_age_pet')

        let arrVal = []
        let val = rigth_age.value
        
        for (let i = 0; i < val.length; i++) {
            arrVal.push(val[i])
            
        }

        if (val * 1 > 13) {
            arrVal[0] = '1'
            arrVal[1] = '2'
        }

        if (val == '') {
            validIcon.style.display = 'none'
            text.innerText = ''
            return rigth_age.value = val
        }
 
        if (val.length > 2 ||
            /[^0-9]/.test(val[val.length - 1]) ) {
            arrVal.pop()
            let txt = ''
            arrVal.forEach(el => txt += el)
            return rigth_age.value = txt
        }

        let el
        if (arrVal.length == 1) {
            el = arrVal[0]
            text.style.left = '86px'
            label_age.classList.add('active_text')
        } else {
            el = arrVal[0] + arrVal[1]
            text.style.left = '96px'
            label_age.classList.add('active_text')
        }

        
        if (el == 0) {
            rigth_age.value = el
            text.innerText = 'месяцев'
            document.querySelector('.composite_input_back').classList.remove('invalid_back')
            document.querySelector('#inv_text_age_anim').style.display = 'none'
            document.querySelector('.inv_icon_age_pet').style.display = 'none'
        }
        if (el == 1) {
            rigth_age.value = el
            text.innerText = 'месяц'
            validIcon.style.display = 'block'
            document.querySelector('.composite_input_back').classList.remove('invalid_back')
            document.querySelector('#inv_text_age_anim').style.display = 'none'
            document.querySelector('.inv_icon_age_pet').style.display = 'none'
        }

        if (el >= 2 && el <= 4) {
            rigth_age.value = el
            text.innerText = 'месяца'
            validIcon.style.display = 'block'
            document.querySelector('.composite_input_back').classList.remove('invalid_back')
            document.querySelector('#inv_text_age_anim').style.display = 'none'
            document.querySelector('.inv_icon_age_pet').style.display = 'none'
        }

        if (el >= 5 && el <= 12) {
            rigth_age.value = el
            text.innerText = 'месяцев'
            validIcon.style.display = 'block'
            document.querySelector('.composite_input_back').classList.remove('invalid_back')
            document.querySelector('#inv_text_age_anim').style.display = 'none'
            document.querySelector('.inv_icon_age_pet').style.display = 'none'
        }

    }

    left_age.onblur = () => {
        left_age.classList.remove('focus_left_input')
        rigth_age.classList.remove('focus_right_input')
        back_age.classList.remove('focus_back')
        if (left_age.value == 0 && rigth_age.value == 0) {
            label_age.classList.remove('active_text')
        }
    }
    rigth_age.onblur = () => {
        left_age.classList.remove('focus_left_input')
        rigth_age.classList.remove('focus_right_input')
        back_age.classList.remove('focus_back')
        if (left_age.value == 0 && rigth_age.value == 0) {
            label_age.classList.remove('active_text')
        }
    }


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






    function vakcinaDate() {
        let input = document.querySelector('#vakvina_date')
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

            if (year > 2020 && year.toString().length == 4) {
                val[6] = '2'
                val[7] = '0'
                val[8] = '2'
                val[9] = '0'
            } else if (year < 2000 && year.toString().length == 4) {
                val[6] = '2'
                val[7] = '0'
                val[8] = '0'
                val[9] = '0'
            } else if (year < 200 && year.toString().length == 3) {
                val[6] = '2'
                val[7] = '0'
                val[8] = '0'
            }


            if (val.length == 10) {
                if (curYear < year) {
                    input.classList.remove('valid_input')
                    input.classList.add('invalid_input')
                    document.querySelector('#inv_text_vakcina_field').innerText = `Укажите дату не позднее ${curDay}.${curMonth}.${curYear}`
                } else if (curMonth < month && curYear <= year) {
                    input.classList.remove('valid_input')
                    input.classList.add('invalid_input')
                    document.querySelector('#inv_text_vakcina_field').innerText = `Укажите дату не позднее ${curDay}.${curMonth}.${curYear}`
                    return
                } else if (curDay < day && curMonth <= month && curYear <= year) {
                    input.classList.remove('valid_input')
                    input.classList.add('invalid_input')
                    document.querySelector('#inv_text_vakcina_field').innerText = `Укажите дату не позднее ${curDay}.${curMonth}.${curYear}`
                    return
                } else {
                    input.classList.add('valid_input')
                    input.classList.remove('invalid_input')
                    document.querySelector('#inv_text_vakcina_field').innerText = `Укажите дату не позднее ${curDay}.${curMonth}.${curYear}`
                }
            }







            val.forEach(el => {
                arrToDraw += el
            })

            state = arrToDraw
            input.value = arrToDraw
        }
    }
    vakcinaDate()

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
                    document.querySelector('#inv_text_date_departure').innerText = `Укажите дату не раньше ${curDay}.${curMonth}.${curYear}`
                } else if (curMonth > month && curYear >= year) {
                    input.classList.remove('valid_input')
                    input.classList.add('invalid_input')
                    document.querySelector('#inv_text_date_departure').innerText = `Укажите дату не раньше ${curDay}.${curMonth}.${curYear}`
                    return
                } else if (curDay > day && curMonth >= month && curYear >= year) {
                    input.classList.remove('valid_input')
                    input.classList.add('invalid_input')
                    document.querySelector('#inv_text_date_departure').innerText = `Укажите дату не раньше ${curDay}.${curMonth}.${curYear}`
                    return
                } else {
                    input.classList.add('valid_input')
                    input.classList.remove('invalid_input')
                    document.querySelector('#inv_text_date_departure').innerText = `Укажите дату не раньше ${curDay}.${curMonth}.${curYear}`
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


    let vakcina = document.querySelector('#have_vakcina')
    vakcina.onchange = () => {
        if (!vakcina.checked) {
            document.querySelector('#vakcina_field').innerText = 'Дата посл. вакцинации*'
            document.querySelector('#vakvina_date').style.opacity = '1'
            document.querySelector('#vakvina_date').removeAttribute('disabled')
        } else {
            document.querySelector('#vakcina_field').innerText = 'Дата посл. вакцинации'
            document.querySelector('#vakvina_date').setAttribute('disabled', 'disabled')
            document.querySelector('#vakvina_date').style.opacity = '0.6'
        }
    }



    //Изменения выбранного типа животного
    let tA = document.querySelector('#view_animal_inpt')

    tA.onchange = () => {
        console.log('was')
    }



}