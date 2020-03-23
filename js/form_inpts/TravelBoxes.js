class TravelBoxes {
    constructor() {
        this.url = 'https://aniway.ru/api/travelbox/?format=json'
        this.data = []
    }
    getBoxes(resolve) {
        //let box_conteiner = document.querySelector('.box_items_conteiner').getAttribute('value')

        //if (box_conteiner != 0) return

        let promise = new Promise((resolve, reject) => {
            fetch(this.url)
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
            result => { return resolve() },
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

        let text_block = document.createElement('div')
        text_block.setAttribute('class', 'travel_box_info_text')

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

            let img = el.images
            let imgArr = []

            img.forEach((el) => imgArr.push({ img: el.image, thumb: el.thumbnail }))

            let fr = $('#fotorama').fotorama({
                width: 380,
                height: 400,
                thumbheight: 84,
            })

            let fotorama = fr.data('fotorama');

            if (fotorama) {
                fotorama.load(imgArr)
            } else {
                $('#fotorama').fotorama({ data: imgArr });
            }


            document.querySelector('.travel_box_conteiner').style.display = 'block'
            document.querySelector('.travel_box_conteiner').setAttribute('value', el.id)
            document.querySelector('.form_conteiner').style.display = 'none'

            let name = document.querySelector('.name_travel_box span')
            name.innerText = `"${el.name}"`

            let desc_left = document.querySelector('.desc_left')
            desc_left.innerText = el.desc_left

            let desc_right = document.querySelector('.desc_right')
            desc_right.innerText = el.desc_right

            let sum_price = document.querySelector('.text_price span')
            sum_price.innerText = `${el.price}`

            this.boxCounter()
        }

        box_conteiner.append(conteiner)
        conteiner.append(imgBl)
        conteiner.append(text_block)

        text_block.append(name)
        text_block.append(price)
        text_block.append(btn)

        imgBl.append(img)
        imgBl.append(notific)
        notific.prepend(motid_count)

        box_conteiner.setAttribute('value', '1')
    }
    drawBoxesStageTree() {
        let type = document.querySelector('#view_animal_inpt').getAttribute('value') * 1

        let arr = this.data
        let conteiner = document.querySelector('.box_purchase_conteiner')

        let chosenTB = document.querySelectorAll('.box_purchase_item')
        if (chosenTB != null) chosenTB.forEach(el => el.remove())



        arr.forEach(el => {
            if (type == el.animal_type && el.count != undefined && el.count != 0) {
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

                let type_pet = ''
                switch (el.animal_type) {
                    case '1':
                        type_pet = 'кошек'
                    case '2':
                        type_pet = 'собак'
                    case '3':
                        type_pet = 'грызунов'
                }

                let text = document.createElement('h5')
                text.setAttribute('class', `count_block count_block_${el.id}`)
                text.setAttribute('value', el.count)
                text.innerText = `Travel box "${el.name}" для ${el.type_pet} (${el.count} шт.)`


                let hor_img = document.createElement('img')
                hor_img.setAttribute('src', `./style/img/Line_110.svg`)
                hor_img.setAttribute('class', 'hor_img')

                let priceBl = document.createElement('div')
                priceBl.setAttribute('class', 'price_block finally_price')
                priceBl.setAttribute('value', el.price * el.count)

                let price_txt = document.createElement('h4')
                price_txt.innerText = `${el.price * el.count}`

                let rub = document.createElement('span')
                rub.innerText = ` Р`
                rub.setAttribute('class', 'rub')

                let del_btn = document.createElement('div')
                del_btn.setAttribute('class', 'del_tr_box')
                del_btn.setAttribute('id', `del_box_${el.id}`)

                del_btn.onclick = () => {
                    block.remove()
                    formOrder.finallyPrice()
                }

                conteiner.append(block)

                block.append(img)
                block.append(textBL)
                block.append(hor_img)
                block.append(priceBl)
                block.append(del_btn)

                textBL.append(text)

                priceBl.append(price_txt)
                priceBl.append(rub)


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

    drawBoxesMainPage(val, visible, opacity) {


        let preview_1 = document.querySelector('#travel_box_preview_1')
        let preview_2 = document.querySelector('#travel_box_preview_2')
        let preview_3 = document.querySelector('#travel_box_preview_3')

        let name_1 = document.querySelector('#name_travel_box_1')
        let name_2 = document.querySelector('#name_travel_box_2')
        let name_3 = document.querySelector('#name_travel_box_3')

        let desc_1 = document.querySelector('#description_travel_box_1')
        let desc_2 = document.querySelector('#description_travel_box_2')
        let desc_3 = document.querySelector('#description_travel_box_3')

        let price_1 = document.querySelector('#price_travel_box_1')
        let price_2 = document.querySelector('#price_travel_box_2')
        let price_3 = document.querySelector('#price_travel_box_3')

        let more_1 = document.querySelector('#travel_box_1')
        let more_2 = document.querySelector('#travel_box_2')
        let more_3 = document.querySelector('#travel_box_3')


        let typeArr = []

        let type = val

        this.data.forEach(el => {

            if (el.animal_type == type * 1) {

                console.log(el)
                typeArr.push(el)
            }
        })

        typeArr.forEach(el => {

            switch (el.name) {
                case 'На природу':
                    {

                        let screenWidth = document.documentElement.clientWidth
                        if (screenWidth > 1080) {
                            let block = document.querySelector('.item_tb_one')
                            block.style.display = 'block'
                                //visible(block, opacity)
                        } else if (screenWidth <= 1080) {
                            let block = document.querySelector('.item_tb_one')
                            block.style.display = 'grid'
                                //visible(block, opacity)
                        }

                        preview_1.src = el.preview
                        name_1.innerText = el.name
                        desc_1.innerText = el.desc_left
                        price_1.innerText = el.price
                        more_1.setAttribute('value', el.id)
                        break
                    }
                case 'На море':
                    {
                        let screenWidth = document.documentElement.clientWidth
                        if (screenWidth > 1080) {
                            let block = document.querySelector('.item_tb_two')
                            block.style.display = 'block'
                                //visible(block, opacity)
                        } else if (screenWidth <= 1080) {
                            let block = document.querySelector('.item_tb_two')
                            block.style.display = 'block'
                                //visible(block, opacity)
                        }
                        preview_2.src = el.preview
                        name_2.innerText = el.name
                        desc_2.innerText = el.desc_left
                        price_2.innerText = el.price
                        more_2.setAttribute('value', el.id)
                        break
                    }
                case 'В город':
                    {
                        let screenWidth = document.documentElement.clientWidth
                        if (screenWidth > 1080) {
                            let block = document.querySelector('.item_tb_tree')
                            block.style.display = 'block'
                                //visible(block, opacity)
                        } else if (screenWidth <= 1080) {
                            let block = document.querySelector('.item_tb_tree')
                            block.style.display = 'block'
                                //visible(block, opacity)
                        }
                        preview_3.src = el.preview
                        name_3.innerText = el.name
                        desc_3.innerText = el.desc_left
                        price_3.innerText = el.price
                        more_3.setAttribute('value', el.id)
                        break
                    }
            }
        })

    }
    showTravelBoxCardMainPage() {
        let btns = document.querySelectorAll('.more_info_tb')

        btns.forEach(el => {
            el.onclick = () => {
                let id = el.getAttribute('value')
                let type = document.querySelector('.active_nav_el').getAttribute('value')
                this.downloadInfoTravelBoxCardMP(id, type)
            }
        })
    }
    downloadInfoTravelBoxCardMP(id, type) {
        let curruntTB
        let imgArr = []
        this.data.forEach(el => {
            if (el.id == id && el.animal_type == type) curruntTB = el
        })

        let conteiner = document.querySelector('.travel_box_conteiner')

        let name = document.querySelector('.name_travel_box span')
        let price = document.querySelector('#travel_box_price')
        let ware_left = document.querySelector('.list_ware_one')
        let ware_right = document.querySelector('.list_ware_two')


        name.innerText = `"${curruntTB.name}"`
        price.innerText = curruntTB.price
        ware_left.innerText = curruntTB.desc_left
        ware_right.innerText = curruntTB.desc_right

        curruntTB.images.forEach((el) => imgArr.push({ img: el.image, thumb: el.thumbnail }))
        console.log(imgArr)

        conteiner.style.display = 'block'

        let fr = $('#fotorama_main_page').fotorama({
            width: 380,
            height: 400,
            thumbheight: 84,
            thumbwidth: 84,
        })

        let fotorama = fr.data('fotorama');

        if (fotorama) {
            fotorama.load(imgArr)
        } else {
            $('#fotorama').fotorama({ data: imgArr });
        }

        let give_contact = document.querySelector('#order_only_trav_box')

        give_contact.onclick = () => {
            document.querySelector('.travel_box_mobile_conteiner').style.display = 'none'
            document.querySelector('.contacts_block').style.display = 'grid'
        }

        this.boxCounter()
    }

    switchTravelBoxesMainPage(visible, opacity) {
        let dogTb = document.querySelector('#show_dag_tb')
        let catTb = document.querySelector('#show_cat_tb')
        let rabbitTb = document.querySelector('#show_rabbit_tb')

        let listTB = document.querySelector('.list_travel_box')
        let items = document.querySelectorAll('.item_travel_box')

        dogTb.onclick = () => {
            let val = dogTb.getAttribute('value')
            items.forEach(el => el.style.display = 'none')

            let screenWidth = document.documentElement.clientWidth
            if (screenWidth > 1080) {
                listTB.style.display = 'grid'
            } else if (screenWidth <= 1080) {
                listTB.style.display = 'block'
            }

            gsap.from(listTB, { duration: 0.8, y: 100, ease: "power2.out" })

            document.querySelector('.dog_tb_block').classList.add('active_nav_el')
            document.querySelector('.cat_tb_block').classList.remove('active_nav_el')
            document.querySelector('.rabbit_tb_block').classList.remove('active_nav_el')

            document.querySelector('.dog_tb_block .nav_tavel_box_img').style.backgroundImage = 'url(./style/img/mp/nav_tb/focus_dog.svg)'
            document.querySelector('.cat_tb_block .nav_tavel_box_img').style.backgroundImage = 'url(./style/img/mp/nav_tb/cat.svg)'
            document.querySelector('.rabbit_tb_block .nav_tavel_box_img').style.backgroundImage = 'url(./style/img/mp/nav_tb/rabbit.svg)'

            this.drawBoxesMainPage(val, visible, opacity)
        }
        catTb.onclick = () => {
            let val = catTb.getAttribute('value')
            items.forEach(el => el.style.display = 'none')

            let screenWidth = document.documentElement.clientWidth
            if (screenWidth > 1080) {
                listTB.style.display = 'grid'
            } else if (screenWidth <= 1080) {
                listTB.style.display = 'block'
            }

            gsap.from(listTB, { duration: 0.8, y: 100, ease: "power2.out" })

            document.querySelector('.cat_tb_block').classList.add('active_nav_el')
            document.querySelector('.dog_tb_block').classList.remove('active_nav_el')
            document.querySelector('.rabbit_tb_block').classList.remove('active_nav_el')

            document.querySelector('.dog_tb_block .nav_tavel_box_img').style.backgroundImage = 'url(./style/img/mp/nav_tb/dog.svg)'
            document.querySelector('.cat_tb_block .nav_tavel_box_img').style.backgroundImage = 'url(./style/img/mp/nav_tb/focus_cat.svg)'
            document.querySelector('.rabbit_tb_block .nav_tavel_box_img').style.backgroundImage = 'url(./style/img/mp/nav_tb/rabbit.svg)'

            this.drawBoxesMainPage(val)
        }
        rabbitTb.onclick = () => {
            let val = rabbitTb.getAttribute('value')
            items.forEach(el => el.style.display = 'none')

            let screenWidth = document.documentElement.clientWidth
            if (screenWidth > 1080) {
                listTB.style.display = 'grid'
            } else if (screenWidth <= 1080) {
                listTB.style.display = 'block'
            }

            gsap.from(listTB, { duration: 0.8, y: 100, ease: "power2.out" })

            document.querySelector('.rabbit_tb_block').classList.add('active_nav_el')
            document.querySelector('.dog_tb_block').classList.remove('active_nav_el')
            document.querySelector('.cat_tb_block').classList.remove('active_nav_el')

            document.querySelector('.dog_tb_block .nav_tavel_box_img').style.backgroundImage = 'url(./style/img/mp/nav_tb/dog.svg)'
            document.querySelector('.cat_tb_block .nav_tavel_box_img').style.backgroundImage = 'url(./style/img/mp/nav_tb/cat.svg)'
            document.querySelector('.rabbit_tb_block .nav_tavel_box_img').style.backgroundImage = 'url(./style/img/mp/nav_tb/focus_rabbit.svg)'

            this.drawBoxesMainPage(val)
        }
    }




}