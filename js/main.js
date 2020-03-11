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
        console.log(this.order)
    }
    validStepOne() {
        return true
        let type_animal = document.querySelector('#view_animal_inpt').getAttribute('value')
        let breedValid = document.querySelector('#valid_icon_breed').getAttribute('value')
        let countryValid = document.querySelector('#valid_icon_country').getAttribute('value')
        let datetravel = document.querySelector('#date_departure').validity.valid
        let ageValid = document.querySelector('#age_anim_inpt').validity.valid
        let vakcina = document.querySelector('#vakvina_date').validity.valid
        
        if (vakcina &&
            ageValid &&
            datetravel &&
            type_animal != 0 &&
            breedValid != 0 &&
            countryValid != 0) {
                console.log('vse 4etko')
                return true
            }        

        if (type_animal != 0) {

        } else {
            let invBreedText = document.querySelector('#animal_type_inv_text')
            invBreedText.style.display = 'block'
            invBreedText.innerText = 'Вы не выбрали тип животного'
        }

    }
    finallyPrice() {
        let sumCheck = document.querySelectorAll('.finally_price_check')
        let sum = document.querySelectorAll('.finally_price')
        let summArr = []
        let finalSum = 0

        sumCheck.forEach( el => {
            el.onchange = () => this.finallyPrice()
            if (el.checked) {
                finalSum += el.getAttribute('value')*1
            }
        })
        sum.forEach(el => {
            summArr.push(el.getAttribute('value')*1)
        })
        summArr.forEach(el => finalSum += el)

        console.log(finalSum)
        let finish_sum = document.querySelector('.finish_summ span')
        console.log(finish_sum)
        finish_sum.innerText = `${finalSum} `
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
    let close_tb = document.querySelectorAll('.close_tb')

    let btn_up_back_step_two = document.querySelector('#btn_up_back_step_two')
    let btn_up_back_step_one = document.querySelector('#btn_up_back_step_one')
    let dwn_back_step_two = document.querySelector('#dwn_back_step_two')
    
    let form_step_one = document.querySelector('.form_step_one')
    let form_step_two = document.querySelector('.form_step_two')
    let form_step_tree = document.querySelector('.form_step_tree')


    let form = document.querySelector('.form_conteiner')
    let arcs = document.querySelector('.arc_conteiner')


    function showLeftRight(target, dist) {
        gsap.from(target, { duration: 0.8, x: dist, ease: "slow(0.7, 0.7, false)" })
        gsap.to(target, { duration: 0.8, opacity: 1, ease: "slow(0.7, 0.7, false)" })
    }

    function stepOne() {
        //Навигация по шагам
        document.querySelector('#step_two_text').classList.add('empty_text')
        document.querySelector('#step_two_text').classList.remove('full_text')
        document.querySelector('#step_tree_text').classList.add('empty_text')
        document.querySelector('#step_tree_text').classList.remove('full_text')

        arcs.style.width = '0px'

        form.style.width = '50%'
        document.querySelector('.nav_form_conteiner').style.left = '186px'
        
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

        arcs.style.width = '190px'

        form.style.width = '64%'
        document.querySelector('.nav_form_conteiner').style.left = '166px'

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

        arcs.style.width = '410px'
        
        document.querySelector('.form_step_one').style.display = 'none'
        document.querySelector('.form_step_two').style.display = 'none'
        document.querySelector('.form_step_tree').style.display = 'block'

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
                document.querySelector('.form_step_one').style.display = 'none'
                document.querySelector('.form_step_two').style.display = 'block'
                document.querySelector('.form_step_tree').style.display = 'none'
            }
        }     

        step_two.onclick = () => {
            
            stepTree()
    
            travelBoxes.drawBoxesStageTree()            
    
            formOrder.finallyPrice()

            step_tree_circle.onclick = () => {
                document.querySelector('.form_step_one').style.display = 'none'
                document.querySelector('.form_step_two').style.display = 'none'
                document.querySelector('.form_step_tree').style.display = 'block'
            }
        }

        

        
        let select = document.querySelector('#check_animal_inpt')        
        select.setAttribute('class', 'select_input invalid_input')
        breedAnimal.invalidInpt() 
        countryInfo.invalidInpt()
        
    }
    


    btn_up_back_step_two.onclick = () => stepTwo()
    btn_up_back_step_one.onclick = () => stepOne()
    dwn_back_step_two.onclick = () => stepOne()
    

    send_form.onclick = () => {
        document.querySelector('.form_conteiner').style.display = 'none'
        document.querySelector('.nav_form_conteiner').style.display = 'none'
        document.querySelector('.success_send_four').style.display = 'block'
        formOrder.takeAllInputs()
    }

    close_tb.forEach(el => {
        el.onclick = () => {
            document.querySelector('.form_conteiner').style.display = 'block'
            document.querySelector('.travel_box_conteiner').style.display = 'none'
        }
    })
    step_one_circle.onclick = () => {
        let val = step_one_circle.getAttribute('value') * 1
        nextSlideForm(val)
    }
    
    //Тревел бокс следующий шаг
     tb_next_step.onclick = () => {
         travelBoxes.updateChosenTB()
         document.querySelector('.form_conteiner').style.display = 'block'
         document.querySelector('.travel_box_conteiner').style.display = 'none'
         let val = tb_next_step.getAttribute('value')
         products.addProducts()
         nextSlideForm(val)
         btn_up_back.setAttribute('value', val)
     }


    //Взаимодействие с полем страной прибытия
    let country_inpt = document.querySelector('#country_arrival')
    let country_list = document.querySelector('#coutry_list')
    let wrapper_country = document.querySelector('#wrapper_seacrch_country')

    country_inpt.oninput = () => {
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
        el.onblur = () => {
            if (el.value.length == 0 || el.value == '--.--.----' || el.value == '+7 (___) ___-__-__') {
                return
            } else if (el.value.length > 0 && !el.validity.valid) {
                el.classList.add('invalid_input')
                el.classList.remove('valid_input')
            } else if (el.value.length > 0 && el.validity.valid) {
                el.classList.remove('invalid_input')
                el.classList.add('valid_input')
            }
        }
    })



    //маска для телефона
    $('#your_telephone').mask('+7 (999) 999-99-99')
    $('#vakvina_date').mask('99.99.9999', { placeholder: '-'})
    $('#date_departure').mask('99.99.9999', { placeholder: '-' })



    // Кнопка прикрепления документов
    let file = document.querySelector('#file')

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






}