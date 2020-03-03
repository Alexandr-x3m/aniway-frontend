class CountryInfo {
    constructor() {
        this.proxyUrl = 'https://cors-anywhere.herokuapp.com/'
        this.data = [],
            this.item = [],
            this.country_inpt = document.querySelector('#country_arrival')
    }
    searching(country_inpt) {

        let promise = new Promise((resolve, reject) => {

            let val = country_inpt.value
            
            val.toLowerCase()

            if (val.length == 0) {
                
                this.invalidInpt('Вы неверно заполнили поле')
            }

            fetch(this.proxyUrl + `https://aniway.ru/api/country/?search=${val}`)
                .then(
                    (response) => {
                        if (response.status != 200) {
                            alert('Oops, something went wrong :(' + response.status)
                            return
                        }
                        response.clone().json()
                            .then(data => {
                                this.item = data
                                resolve()
                            })
                    }
                )
                .catch(err => alert(err.message))
        })
        promise.then(
            result => {
                if (this.item.length == 0) {
                    let all_items = document.querySelectorAll('.country_search_item')
                    all_items.forEach((el) => {el.remove()})
                    return this.invalidInpt('Неверно заполнено поле')
                }
                this.drawListSearch()
            },
            err => alert(err.message)
        )
    }
    famousCoutries() {
        let promise = new Promise((resolve, reject) => {

            fetch(this.proxyUrl + `https://aniway.ru/api/country/?common=true&format=json`)
                .then(
                    (response) => {
                        if (response.status !== 200) {
                            alert('Oops, something went wrong :(' + response.status)
                            return
                        } else {
                            response.clone().json()
                                .then(data => {
                                    this.data = data
                                    resolve()
                                })
                        }
                    })
                .catch(err => console.log(err.message))
        })
        promise.then(
            resolve => this.drawListSearch(),
            error => console.log(error.message)
        )
    }
    drawListSearch() {
        let conteiner = document.querySelector('#coutry_list')
        let all_items = document.querySelectorAll('.country_search_item')

        all_items.forEach((el) => {el.remove()})

        this.item.forEach((el) => {
            let item = document.createElement('div')
            item.setAttribute('class', 'search_item country_search_item')
            item.setAttribute('value', `item_country_${el.id}`)
            item.innerText = `${el.name}`

            conteiner.prepend(item)

            item.onclick = () => {
                let country_inpt = document.querySelector('#country_arrival')
                let country_list = document.querySelector('#coutry_list')
                let wrapper_country = document.querySelector('#wrapper_seacrch_country')

                let txt = item.textContent
                country_inpt.value = txt
                country_inpt.setAttribute('value', el.id)
                country_list.style.display = 'none'
                wrapper_country.style.display = 'none'
                country_inpt.setAttribute('class', 'inpt_list')
                this.validInpt()
            }
        })
    }
    invalidInpt(inv_text) {
        let text = document.querySelector('#contry_invalid_text')
        let invalid_icon = document.querySelector('#inv_icon_country')
        let inpt = document.querySelector('#country_arrival')
        let wrap = document.querySelector('#wrapper_seacrch_country')

        text.style.display = 'block'
        invalid_icon.style.display = 'block'
        wrap.style.display = 'none'
        inpt.setAttribute('class', 'inpt_list invalid_input focus_input_with_list')
        text.innerText = inv_text
    }
    validInpt() {
        let text = document.querySelector('#contry_invalid_text')
        let invalid_icon = document.querySelector('#inv_icon_country')
        let valid_icon = document.querySelector('#valid_icon_country')
        let inpt = document.querySelector('#country_arrival')

        inpt.blur()
        text.style.display = 'none'
        text.innerText = ''
        valid_icon.style.display = 'block'
        invalid_icon.style.display = 'none'
        inpt.setAttribute('class', 'inpt_text')
    }
} 


