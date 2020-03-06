class TravelBoxes {
    constructor() {
        this.proxyUrl = 'https://cors-anywhere.herokuapp.com/'
        this.url = 'https://aniway.ru/api/travelbox/?format=json'
        this.data = []
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
            result => {},
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

            let img = el.images
            let imgArr = []

            img.forEach((el) => imgArr.push({img: el.image, thumb: el.thumbnail}))

            let fr = $('#fotorama').fotorama({
                width: 380,
                height: 400,
                thumbheight: 64,
            })
            let fotorama = fr.data('fotorama');
            
            if (fotorama) {
                console.log(imgArr)
                fotorama.load(imgArr)
            } else {
                $('#fotorama').fotorama({data: imgArr});
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
        conteiner.append(name)
        conteiner.append(price)
        conteiner.append(btn)

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
                priceBl.setAttribute('class', 'price_block finally_price')
                priceBl.setAttribute('value', el.price * el.count)

                let price_txt = document.createElement('h4')
                price_txt.innerText = `${el.price * el.count} \u20BD`

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