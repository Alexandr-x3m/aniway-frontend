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