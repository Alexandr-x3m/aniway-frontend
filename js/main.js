class FormOrder {
    constructor() {
        this.order = {
            "id": 1,
            "animal_type": 1,
            "breed": 2,
            "country": 1,
            "date_travel": "01.01.2020",
            "age": 1,
            "chip": false,
            "have_vakcina": 'true',
            "date_vaccination": "01.01.2020",
            "travelbox": [{
                id: 1,
                count: '2',
                feed_type: 'dry'
            }],
            "product": [1, 2, 3, 9, 11],
            "contact_name": "Андрей",
            "contact_email": "pipetc@gmail.com",
            "contact_phone": "89103621389",
            "type_link": ''
        }
        this.url = 'https://aniway.ru/api/order/?format=api'
    }
    takeAllInputs() {
        let type_animal = document.querySelector('#view_animal_inpt').getAttribute('value')
        let breed_animal = document.querySelector('#type_animal_inpt').getAttribute('value')
        let country = document.querySelector('#country_arrival').getAttribute('value')
        let date_travel = document.querySelector('#date_departure').value
        let age = document.querySelector('#age_anim_inpt').value
        let vakvina_date = document.querySelector('#vakvina_date').value
        let have_chip = document.querySelector('#have_chip').checked
        let have_vakcina = document.querySelector('#have_vakcina').checked
        let whats_name = document.querySelector('#whats_name').value
        let your_telephone = document.querySelector('#your_telephone').value
        let your_email = document.querySelector('#your_email').value
        let view_link_inpt = document.querySelector('#view_link_inpt').getAttribute('value')

        this.order.animal_type = type_animal
        this.order.breed = breed_animal
        this.order.country = country
        this.order.date_travel = date_travel
        this.order.age = age
        this.order.chip = have_chip
        this.order.date_vaccination = vakvina_date
        this.order.have_vakcina = have_vakcina

        this.order.contact_name = whats_name
        this.order.contact_email = your_email
        this.order.contact_phone = your_telephone
        this.order.type_link = view_link_inpt

        let products = document.querySelectorAll('.products_check')

        products.forEach(el => {
            if (el.checked == true) {
                let val = el.value
                this.order.product.push(val)
            }
        })

        let travel_boxes = document.querySelectorAll('.box_purchase_item')

        travel_boxes.forEach(el => {
            let val = el.getAttribute('value')
            let count = document.querySelector(`count_block_${val}`)
            this.order.travelbox.push({ id: val, count: count })
        })
    }
    validStepOne() {
        let type_animal = document.querySelector('#view_animal_inpt').getAttribute('value')
        let breedValid = document.querySelector('#valid_icon_breed').getAttribute('value')
        let countryValid = document.querySelector('#valid_icon_country').getAttribute('value')


        let dtTr = document.querySelector('#date_departure')
        let age = document.querySelector('#age_anim_inpt')
        let vakc = document.querySelector('#vakvina_date')
        let datetravel = document.querySelector('#date_departure').validity.valid
        let ageValid = document.querySelector('#age_anim_inpt').validity.valid
        let vakcina = document.querySelector('#vakvina_date').validity.valid
        let vakcinaCheck = document.querySelector('#have_vakcina')

        if (dtTr.value == '') {
            datetravel = false
            dtTr.classList.add('invalid_input')
            document.querySelector('#inv_text_date_departure').innerText = 'Не указана дата путешествия'
        } else { dtTr.classList.remove('invalid_input') }
        if (age.value == '') {
            ageValid = false
            age.classList.add('invalid_input')
            document.querySelector('#inv_text_age_anim').innerText = 'Не указан возраст питомца'
        } else { age.classList.remove('invalid_input') }
        if (vakc.value == '' && !vakcinaCheck.checked) {
            vakcina = false
            vakc.classList.remove('valid_input')
            vakc.classList.add('invalid_input')
            document.querySelector('#inv_text_vakcina_field').innerText = 'Не указана дата выкцинации'
        } else { vakc.classList.remove('invalid_input') }

        if (breedValid == 0) {
            breedAnimal.invalidInpt()
        }
        if (countryValid == 0) {
            countryInfo.invalidInpt()
        }
        if (type_animal == 0) {
            let select = document.querySelector('#check_animal_inpt')
            select.setAttribute('class', 'select_input invalid_input')
        }

        if (vakcina &&
            ageValid &&
            datetravel &&
            type_animal != 0 &&
            breedValid != 0 &&
            countryValid != 0) {
            return true
        }


        if (type_animal != 0) {

        } else {
            let invBreedText = document.querySelector('#animal_type_inv_text')
            document.querySelector('#view_animal_inpt').classList.add('invalid_select')
            invBreedText.style.display = 'block'
            invBreedText.innerText = 'Вы не выбрали тип животного'
        }

    }
    finallyPrice() {
        let sumCheck = document.querySelectorAll('.finally_price_check')
        let sum = document.querySelectorAll('.finally_price')
        let summArr = []
        let finalSum = 0

        sumCheck.forEach(el => {
            el.onchange = () => this.finallyPrice()
            if (el.checked) {
                finalSum += el.getAttribute('value') * 1
            }
        })
        sum.forEach(el => {
            summArr.push(el.getAttribute('value') * 1)
        })
        summArr.forEach(el => finalSum += el)

        let finish_sum = document.querySelector('.finish_summ span')
        finish_sum.innerText = `${finalSum} `
    }
    validLastStep() {
        let name = document.querySelector('#whats_name')
        let phone = document.querySelector('#your_telephone')
        let mail = document.querySelector('#your_email')
        let user_agreement = document.querySelector('#convetion_check')

        if (name.validity.valid && name.value.length != 0) {
            name.classList.remove('invalid_input')
            name.classList.add('valid_input')
        } else {
            name.classList.add('invalid_input')
            name.classList.remove('valid_input')
        }
        if (phone.validity.valid && phone.value.length != 0) {
            phone.classList.remove('invalid_input')
            phone.classList.add('valid_input')
        } else {
            phone.classList.add('invalid_input')
            phone.classList.remove('valid_input')
        }
        if (mail.validity.valid && mail.value.length != 0) {
            mail.classList.remove('invalid_input')
            mail.classList.add('valid_input')
        } else {
            mail.classList.remove('valid_input')
            mail.classList.add('invalid_input')
        }
        if (name.validity.valid && name.value.length != 0 &&
            phone.validity.valid && phone.value.length != 0 &&
            mail.validity.valid && mail.value.length != 0 &&
            user_agreement.checked) {
            return true
        }
    }
    sendForm() {
        let preloader = document.querySelector('#preloader_conteiner')
        let err_block = document.querySelector('.err_conteiner')
        let nav = document.querySelector('.nav_form_conteiner')
        let form = document.querySelector('.form_conteiner')
        let secces = document.querySelector('.success_send_four')

        let promise = new Promise((resolve, reject) => {
            let obj = this.order

            err_block.classList.add('hide_block')
            preloader.classList.remove('hide_block')

            fetch(('https://cors-anywhere.herokuapp.com/' + 'https://aniway.ru/api/order/?format=api'), {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(obj)
            })
                .then(response => {
                    console.log(response.statusText)
                    response.ok ? resolve() : reject()
                })
                .catch(err => console.log(err.message))

        })
        promise.then(
            result => {
                nav.classList.add('hide_block')
                form.classList.add('hide_block')
                preloader.classList.add('hide_block')
                secces.classList.remove('hide_block')
            },
            err => {
                preloader.classList.add('hide_block')
                err_block.classList.remove('hide_block')
            }
        )




    }
}


class DropDownList {
    constructor() {
        this.type_links = {
            arrItems: '.type_link_item',
            sel: '.type_link_block',
            back: '#view_link_inpt',
            check: '#check_link_inpt',
            list: '.list_items_links',
            wrap: '#wrapper_select_links',
            text: '.type_link_text',
            invText: '#inv_text_link'
        }
    }
    focusSelector(param) {
        let el = param
        let arrItems = document.querySelectorAll(el.arrItems)
        let sel = document.querySelector(el.sel)
        let back = document.querySelector(el.back)
        let check = document.querySelector(el.check)
        let list = document.querySelector(el.list)
        let wrap = document.querySelector(el.wrap)
        let text = document.querySelector(el.text)
        let inv_select_text = document.querySelectorAll('.inv_select_text')
        let invTxt = document.querySelector(el.invText)

        sel.onclick = () => {
            wrap.style.display = 'block'
            list.style.display = 'block'
            check.checked = true
            back.setAttribute('class', 'select_window select_list active_select')
        }
        wrap.onclick = () => {
            if (text.textContent == '') check.checked = false
            wrap.style.display = 'none'
            list.style.display = 'none'
            back.setAttribute('class', 'select_window select_list')
        }

        arrItems.forEach(el => {
            el.onclick = () => {
                wrap.style.display = 'none'
                list.style.display = 'none'
                if (invTxt == null) {
                    return
                } else {
                    invTxt.style.display = 'block'
                }
                check.checked = true
                check.value = '1'

                let val = el.getAttribute('value')
                let txt = el.textContent

                back.setAttribute('value', val)
                text.innerText = txt
                back.setAttribute('class', 'select_window select_list')

                inv_select_text.forEach(el => {
                    el.style.display = 'none'
                })
            }
        })
    }
}








const formOrder = new FormOrder()
const typeAnimal = new TypeAnimal()
const breedAnimal = new BreedAnimal()
const travelBoxes = new TravelBoxes()
const countryInfo = new CountryInfo()
const products = new Product()
const dropDownList = new DropDownList()



window.onload = () => {
    travelBoxes.getBoxes()
    typeAnimal.getTypeAnimal()


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
        } else {
            document.querySelector('#vakcina_field').innerText = 'Дата посл. вакцинации'
        }
    }


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






}