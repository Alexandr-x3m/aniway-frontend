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
        let type_animal = document.querySelector('#view_animal_inpt').getAttribute('value')
        let inv_text = document.querySelector('#animal_type_inv_text')
        let vakcina = document.querySelector('#vakcina_field').control.value

        if (type_animal == 0) inv_text.style.display = 'block'


    }
}


class TypeAnimal {
    constructor() {
        this.proxyUrl = 'https://cors-anywhere.herokuapp.com/'
        this.url = 'http://178.62.220.103/api/animaltype/?format=json'
        this.data = []
    }
    getTypeAnimal() {
        let preloader = document.querySelector('#preloader_conteiner')

        let promise = new Promise((resolve, reject) => {
            preloader.style.display = 'block'
            fetch(this.proxyUrl + this.url)
                .then((response) => {
                    if (response.status != 200) {
                        alert('Oops, something went wrong :(' + response.status)
                        return
                    }
                    response.clone().json()
                        .then(data => {
                            this.data = data
                            resolve()
                        })
                })
                .catch(err => alert(err.message))
        })
        promise.then(
            result => {
                this.drawTypesPets()
                preloader.style.display = 'none'
            },
            err => alert(err.message)
        )
    }
    drawTypesPets() {
        let conteiner = document.querySelector('#list_type_pets')
        let arr = this.data

        arr.forEach((el) => {
            let block = document.createElement('div')
            block.setAttribute('class', 'search_item type_pet_item')
            block.setAttribute('id', `type_pet_${el.id}`)
            block.setAttribute('value', `${el.id}`)
            conteiner.append(block)
            block.innerHTML = el.name
        })
        dropDownList.focusSelector({
            arrItems: '.type_pet_item',
            sel: '.type_pet_block',
            back: '#view_animal_inpt',
            check: '#check_animal_inpt',
            list: '.list_items_pets',
            wrap: '#wrapper_select_pets',
            text: '.type_pet_text'
        })
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
            text: '.type_link_text'
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

class TravelBoxes {
    constructor() {
        this.proxyUrl = 'https://cors-anywhere.herokuapp.com/'
        this.url = 'https://aniway.ru/api/travelbox/?format=json'
        this.data = []
        this.arrLeft = [
            {
                id: 1,
                val: '0px'
            },
            {
                id: 2,
                val: '-400px'
            },
            {
                id: 3,
                val: '-800px'
            },
            {
                id: 4,
                val: '-1200px'
            },
            {
                id: 4,
                val: '-1600px'
            },
            {
                id: 5,
                val: '-2000px'
            },
            {
                id: 6,
                val: '-2400px'
            },
            {
                id: 7,
                val: '-2800px'
            },
            {
                id: 8,
                val: '-3200px'
            }]
        this.chosenTB = []
    }
    getBoxes() {
        let box_conteiner = document.querySelector('.box_items_conteiner').getAttribute('value')

        if (box_conteiner != 0) return

        let promise = new Promise((resolve, reject) => {
            fetch(this.proxyUrl + this.url)
                .then((response) => {
                    if (response.status != 200) {
                        alert('Oops, something went wrong :(' + response.status)
                        return
                    }
                    response.clone().json()
                        .then(data => {
                            this.data = data
                            resolve()
                        })
                })
                .catch(err => alert(err.message))
        })
        promise.then(
            result => { console.log('finish') },
            err => alert(err.message)
        )
    }
    drawBoxesStageOne() {
        let type = document.querySelector('#view_animal_inpt').getAttribute('value') * 1
        let arr = this.data

        arr.forEach((el) => {
            if (type == el.animal_type) {
                this.drawBoxesStageTwo(el)
            } else return
        })
    }
    drawBoxesStageTwo(el) {
        let box_conteiner = document.querySelector('.box_items_conteiner')

        let conteiner = document.createElement('div')
        conteiner.setAttribute('class', 'box_item_block')
        conteiner.setAttribute('id', 'tr_box_1')

        let imgBl = document.createElement('div')
        imgBl.setAttribute('class', 'img_block')

        let img = document.createElement('img')
        img.src = el.images[0].thumbnail

        let notific = document.createElement('div')
        notific.setAttribute('class', 'notification_circle')
        notific.innerText = ' шт.'

        let motid_count = document.createElement('span')
        motid_count.setAttribute('id', `count_box_${el.id}`)
        if (el.count == undefined) {
            motid_count.innerText = '0'
        } else {
            motid_count.innerText = el.count
        }

        let name = document.createElement('h4')
        name.setAttribute('class', 'name_tr_box')
        name.setAttribute('id', `tr_box_name_${el.id}`)
        name.innerText = `Название: ${el.name}`

        let price = document.createElement('h4')
        price.setAttribute('class', 'price_tr_box')
        price.innerText = `Стоимость: `

        let price_text = document.createElement('span')
        price_text.setAttribute('class', 'price_text')
        price_text.setAttribute('id', `tr_box_price_${el.id}`)
        price_text.innerText = `${el.price} руб.`

        price.append(price_text)

        let btn = document.createElement('div')
        btn.setAttribute('class', 'more_info_conteiner')
        btn.setAttribute('id', `more_info_box_${el.id}`)
        btn.innerText = 'подробнее'
        btn.onclick = () => {

            document.querySelector('.travel_box_conteiner').setAttribute('value', el.id)
            document.querySelector('.form_conteiner').style.display = 'none'
            document.querySelector('.travel_box_conteiner').style.display = 'block'
            document.querySelectorAll('.slider_box_small_img').forEach(el => el.remove())
            //let tb_counter = document.querySelector('#travel_box_counter')

            let img = el.images
            img.forEach((el) => {
                let big_conteiner = document.querySelector('.slider_box_img_block')
                let small_conteiner = document.querySelector('.slider_box_nav')

                let big_img = document.createElement('img')
                big_img.setAttribute('class', 'slider_box_big_img')
                big_img.setAttribute('value', el.id)
                big_img.src = el.image

                let small_img = document.createElement('img')
                small_img.setAttribute('class', 'slider_box_small_img')
                small_img.setAttribute('value', el.id)
                small_img.src = el.thumbnail

                big_conteiner.append(big_img)
                small_conteiner.append(small_img)
            })

            let name = document.querySelector('.name_travel_box span')
            name.innerText = `"${el.name}"`

            let desc_left = document.querySelector('.desc_left')
            desc_left.innerText = el.desc_left

            let desc_right = document.querySelector('.desc_right')
            desc_right.innerText = el.desc_right

            let sum_price = document.querySelector('.text_price span')
            sum_price.innerText = `${el.price}`

            let tb_counter = document.querySelector('#travel_box_counter')

            this.boxCounter()
        }

        box_conteiner.append(conteiner)
        conteiner.append(imgBl)
        conteiner.append(name)
        conteiner.append(price)
        conteiner.append(btn)

        imgBl.append(img)
        imgBl.append(notific)
        notific.prepend(motid_count)

        box_conteiner.setAttribute('value', '1')
    }
    /* navSlider() {
         let left_btn = document.querySelector('#switch_slide_left')
         let right_btn = document.querySelector('#switch_slide_right')
         let slider_box_img_block = document.querySelector('.slider_box_img_block')
         let slider_box_nav = document.querySelectorAll('.slider_box_nav img')
         let arrLeft = this.arrLeft
 
         left_btn.onclick = () => {
             let val = slider_box_img_block.getAttribute('value') * 1
             if (val > 1) {
                 --val
                 arrLeft.forEach(el => {
                     if (el.id === val) {
                         slider_box_img_block.style.left = el.val
                         slider_box_img_block.setAttribute('value', val)
                     }
                 })
             } else {
             }
         }
         right_btn.onclick = () => {
             let val = slider_box_img_block.getAttribute('value') * 1
             if (val < 3) {
                 ++val
                 arrLeft.forEach(el => {
                     if (el.id === val) {
                         slider_box_img_block.style.left = el.val
                         slider_box_img_block.setAttribute('value', val)
                     }
                 })
             } else {
                 console.log('left block')
             }
         }
         slider_box_nav.forEach((el) => {
             el.onmousemove = (e) => {
                 let img = e.target
                 img.onclick = () => {
                     let val = img.getAttribute('value') * 1
                     slider_box_img_block.setAttribute('value', val)
                 }
                 let val = slider_box_img_block.getAttribute('value') * 1
                 arrLeft.forEach(el => {
                     if (el.id === val) {
                         slider_box_img_block.style.left = el.val
                     }
                 })
             }
         })
     }*/
    drawBoxesStageTree() {
        let type = document.querySelector('#view_animal_inpt').getAttribute('value') * 1

        let arr = this.data
        let conteiner = document.querySelector('.box_purchase_conteiner')

        let chosenTB = document.querySelectorAll('.box_purchase_item')
        if (chosenTB != null) chosenTB.forEach(el => el.remove())



        arr.forEach(el => {
            if (type == el.animal_type && el.count != undefined) {
                let block = document.createElement('div')
                block.setAttribute('class', 'box_purchase_item')
                block.setAttribute('id', `boxes_for_purchase_${el.id}`)
                block.setAttribute('value', el.id)

                let img = document.createElement('img')
                img.setAttribute('src', `${el.images[0].thumbnail}`)
                img.setAttribute('class', 'main_img')

                let textBL = document.createElement('div')
                textBL.setAttribute('class', 'name_purchase_block')
                textBL.setAttribute('value', el.count)

                let text = document.createElement('h5')
                text.innerText = 'Travel box "на природу" для кошек '

                let count_text = document.createElement('h5')
                count_text.setAttribute('class', `count_block count_block_${el.id}`)
                count_text.innerText = `(${el.count} шт.)`
                count_text.setAttribute('value', el.count)

                let hor_img = document.createElement('img')
                hor_img.setAttribute('src', `./style/img/Line_110.svg`)
                hor_img.setAttribute('class', 'hor_img')

                let priceBl = document.createElement('div')
                priceBl.setAttribute('class', 'price_block')

                let price_txt = document.createElement('h4')
                price_txt.innerText = `${el.price * el.count} \u20BD`

                let del_btn = document.createElement('div')
                del_btn.setAttribute('class', 'del_tr_box')
                del_btn.setAttribute('id', `del_box_${el.id}`)

                del_btn.onclick = () => {
                    block.remove()
                }

                conteiner.append(block)

                block.append(img)
                block.append(textBL)
                block.append(hor_img)
                block.append(priceBl)
                block.append(del_btn)

                textBL.append(text)
                textBL.append(count_text)

                priceBl.append(price_txt)


            }
        })



    }
    boxCounter() {
        let upNumber = document.querySelector('#reduce_box_travel')
        let countBox = document.querySelector('#travel_box_counter')
        let downNumber = document.querySelector('#increase_box_travel')

        upNumber.onclick = () => {
            let val = countBox.getAttribute('value') * 1
            if (val < 10) {
                ++val
                countBox.innerText = val
                countBox.setAttribute('value', val)
            }
        }
        downNumber.onclick = () => {
            let val = countBox.getAttribute('value') * 1
            if (val > 0) {
                --val
                countBox.innerText = val
                countBox.setAttribute('value', val)
            }
        }
    }
    updateChosenTB() {
        let count = document.querySelector('#travel_box_counter').getAttribute('value')
        let id_box = document.querySelector('.travel_box_conteiner').getAttribute('value')
        let number = document.querySelector(`#count_box_${id_box}`)
        let arr = this.data

        arr.forEach(el => {
            if (el.id == id_box) {
                el.count = count
                el.chosen = true
            }
        })
        number.innerText = count
        document.querySelector('#travel_box_counter').setAttribute('value', '0')
        document.querySelector('#travel_box_counter').innerText = '0'
    }
}




class Product {
    constructor() {
        this.proxyUrl = 'https://cors-anywhere.herokuapp.com/'
        this.product_neces = []
        this.product_addit = []
    }
    async load(type) {
        let animal = document.querySelector('#view_animal_inpt')
        animal = animal.getAttribute('value') * 1

        await fetch(this.proxyUrl + `https://aniway.ru/api/product/?animal_type=${animal}&format=json&polymorphic_ctype=${type}`)
            .then(response => response.json())
            .then(data => {
                if (type == 11) {
                    this.product_neces = data
                } else {
                    this.product_addit = data
                }
            })

    }
    addProducts() {
        this.product_neces.forEach(el => {
            this.drawBlocks(el, '.serv_necessary_block')
        })
        this.product_addit.forEach(el => {
            this.drawBlocks(el, '.serv_optional_block')
        })
    }
    drawBlocks(el, name_block, ) {
        let main_block = document.querySelector(name_block)

        let conteiner = document.createElement('div')
        conteiner.setAttribute('class', 'item_service full_service')

        let checkBlock = document.createElement('div')
        checkBlock.setAttribute('class', 'check_block')

        let inpt_check = document.createElement('input')
        inpt_check.setAttribute('type', 'checkbox')
        inpt_check.setAttribute('class', 'products_check')
        if (el.checked) {
            inpt_check.setAttribute('checked', '')
        }
        inpt_check.setAttribute('class', 'light_check')
        inpt_check.setAttribute('id', `${el.id}`)

        let label_check = document.createElement('label')
        label_check.setAttribute('for', `${el.id}`)
        label_check.setAttribute('class', `checkbox_label`)

        let check_bl = document.createElement('div')
        check_bl.setAttribute('class', `checkbox_block`)

        let img_tick = document.createElement('img')
        img_tick.setAttribute('src', `./style/img/Vector_180.svg`)
        img_tick.setAttribute('class', `check_tick`)

        let name = document.createElement('span')
        name.innerText = el.name

        let price = document.createElement('div')
        price.setAttribute('class', 'price_block')

        let price_txt = document.createElement('h4')
        price_txt.innerText = `${el.price} \u20BD`


        main_block.append(conteiner)
        conteiner.append(checkBlock)
        checkBlock.append(inpt_check)
        checkBlock.append(label_check)

        label_check.append(check_bl)
        check_bl.append(img_tick)

        conteiner.append(name)
        conteiner.append(price)

        price.append(price_txt)

        if (el.short_desc !== null) {
            let desc = document.createElement('p')
            desc.innerText = el.short_desc
            conteiner.append(desc)
        }
    }
}

const typeAnimal = new TypeAnimal()
const breedAnimal = new BreedAnimal()
const travelBoxes = new TravelBoxes()
const countryInfo = new CountryInfo()
const products = new Product()
const dropDownList = new DropDownList()
const formOrder = new FormOrder()



window.onload = () => {
    travelBoxes.getBoxes()
    typeAnimal.getTypeAnimal()
    //travelBoxes.navSlider()
    dropDownList.focusSelector({
        arrItems: '.type_link_item',
        sel: '.type_link_block',
        back: '#view_link_inpt',
        check: '#check_link_inpt',
        list: '.list_items_links',
        wrap: '#wrapper_select_links',
        text: '.type_link_text'
    })

    //переход на следующий шаг
    let step_one = document.querySelector('#step_one')
    let step_two = document.querySelector('#step_two')
    let header_slider = document.querySelector('.header_slider_block')
    let steps_circle = document.querySelectorAll('.step_circle')
    let btn_up_back = document.querySelector('#btn_up_back')
    let tb_next_step = document.querySelector('#tb_next_step')
    let send_form = document.querySelector('#last_step')
    let dwn_back_step = document.querySelector('#dwn_back_step_two')
    let close_tb = document.querySelectorAll('.close_tb')

    dwn_back_step


    let conteiner = document.querySelector('#slider_conteiner_btn')
    let form = document.querySelector('.form_conteiner')
    let arcs = document.querySelector('.arc_conteiner')

    let steps = [
        {
            val: 1,
            form_height: '856px',
            form_width: '582px',
            form_margin: '-431px',
            main_left: '0px',
            header_left: '0px',
            arcs_left: '0px',
            step_circle: '#step_one_circle',
            step_text: '#step_one_text'

        },
        {
            val: 2,
            form_height: '932px',
            form_width: '884px',
            form_margin: '-582px',
            main_left: '-1100px',
            header_left: '-1100px',
            arcs_left: '190px',
            step_circle: '#step_two_circle',
            step_text: '#step_two_text'

        },
        {
            val: 3,
            form_height: '1250px',
            main_left: '-2200px',
            header_left: '-2200px',
            arcs_left: '400px',
            step_circle: '#step_tree_circle',
            step_text: '#step_tree_text'
        },
        {
            val: 4,
            form_height: '700px',
            main_left: '-3300px',
            header_left: '-3300px',
        }
    ]


    function nextSlideForm(val) {
        val = val * 1
        steps.forEach(el_2 => {
            if (el_2.val === val) {
                header_slider.style.left = el_2.header_left
                conteiner.style.left = el_2.main_left
                form.style.height = el_2.form_height
                form.style.width = el_2.form_width
                form.style.marginLeft = el_2.form_margin
                arcs.style.width = el_2.arcs_left

                let circle = document.querySelector(`${el_2.step_circle}`)
                circle.removeAttribute('class')
                circle.setAttribute('class', 'step_circle full_circle')

                let text = document.querySelector(`${el_2.step_text}`)
                text.removeAttribute('class')
                text.setAttribute('class', 'number_nav full_text')
            }
        })
    }

    step_one.onclick = () => {
        formOrder.validStepOne()
        let boxes = document.querySelectorAll('.box_item_block')
        boxes.forEach(el => {
            el.remove()
        })

        let val = step_one.getAttribute('value')
        nextSlideForm(val)
        products.load(10)
        products.load(11)
        btn_up_back.style.display = 'grid'
        btn_up_back.setAttribute('value', val)
        travelBoxes.drawBoxesStageOne()
        //formOrder.validStepOne()
    }
    btn_up_back.onclick = () => {
        let val = btn_up_back.getAttribute('value')
        btn_up_back.setAttribute('value', --val)

        if (val == '1') btn_up_back.style.display = 'none'
        nextSlideForm(val)
    }
    step_two.onclick = () => {
        let services = document.querySelectorAll('.item_service')
        services.forEach(el => el.remove())
        travelBoxes.drawBoxesStageTree()

        let val = step_two.getAttribute('value')
        products.addProducts()
        nextSlideForm(val)
        btn_up_back.setAttribute('value', val)
    }
    send_form.onclick = () => {
        document.querySelector('.form_conteiner').style.display = 'none'
        document.querySelector('.nav_form_conteiner').style.display = 'none'
        document.querySelector('.success_send_four').style.display = 'block'
        formOrder.takeAllInputs()
    }
    dwn_back_step.onclick = () => {
        let val = dwn_back_step.getAttribute('value')
        btn_up_back.style.display = 'none'
        nextSlideForm(val)
    }
    close_tb.forEach(el => {
        el.onclick = () => {
            document.querySelector('.form_conteiner').style.display = 'block'
            document.querySelector('.travel_box_conteiner').style.display = 'none'
        }
    })

    /* //Тревел бокс следующий шаг
     tb_next_step.onclick = () => {
         travelBoxes.updateChosenTB()
 
         document.querySelector('.form_conteiner').style.display = 'block'
         document.querySelector('.travel_box_conteiner').style.display = 'none'
         let val = tb_next_step.getAttribute('value')
         products.addProducts()
         nextSlideForm(val)
         btn_up_back.setAttribute('value', val)
     } */


    //Взаимодействие с полем страной прибытия
    let country_inpt = document.querySelector('#country_arrival')
    let country_list = document.querySelector('#coutry_list')
    let wrapper_country = document.querySelector('#wrapper_seacrch_country')

    country_inpt.oninput = () => {
        if (country_inpt.value.length > 0) {
            countryInfo.searching(country_inpt)
        }
    }
    country_inpt.onfocus = () => {
        country_list.style.display = 'grid'
        country_inpt.setAttribute('class', 'inpt_list focus_input_with_list')
        wrapper_country.style.display = "block"
        if (country_inpt.value.length == 0) {
            return countryInfo.famousCoutries()
        }
    }
    wrapper_country.onclick = () => {
        country_list.style.display = 'none'
        wrapper_country.style.display = "none"
        country_inpt.setAttribute('class', 'inpt_list')
    }



    //Взаимодействие с полем порода животного
    let type_animal = document.querySelector('#type_animal_inpt')
    let breed_list = document.querySelector('#breed_list')
    let wrapper_breed = document.querySelector('#wrapper_breed_animal')

    type_animal.oninput = () => {
        if (type_animal.value.length > 0) {
            return breedAnimal.searching()
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

    //Переключение между шагами по 
    steps_circle.forEach(el => {
        el.onclick = () => {
            let val = el.getAttribute('value') * 1
            nextSlideForm(val)
        }
    })

    //проверка на валидность после нажатия на поле
    let inputs = document.querySelectorAll('.click_valid')
    console.log(inputs)

    inputs.forEach(el => {
        el.onclick = () => el.setAttribute('class', 'inpt_list invalid_input')
    })



    //маска для телефона
    $('#your_telephone').mask('+7 (999) 999-99-99')
    $('#vakvina_date').mask('99.99.9999', { placeholder: '-' })
    $('#date_departure').mask('99.99.9999', { placeholder: '-' })



    // Кнопка прикрепления документов
    let file = document.querySelector('#file')

    file.onchange = () => {
        console.log(document.querySelector('#file').files.length)
    }






}