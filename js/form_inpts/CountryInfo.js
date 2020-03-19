class CountryInfo {
    constructor() {
        this.data = [],
        this.item = [],
        this.country_inpt = document.querySelector('#country_arrival')
    }
    searching(country_inpt) {
        let promise = new Promise((resolve, reject) => {
            this.data = []

            let val = country_inpt.value
            val.toLowerCase()

            fetch(`https://aniway.ru/api/country/?search=${val}`)
                .then(
                    (response) => {
                        if (response.status != 200) return alert('Oops, something went wrong :(' + response.status)
                        response.clone().json()
                            .then(data => {
                                this.data = data
                                resolve()
                            })
                    }
                )
                .catch(err => alert(err.message))
        })
        promise.then(
            result => {
                if (this.data.length == 0) {
                    let all_items = document.querySelectorAll('.country_search_item')
                    all_items.forEach((el) => { el.remove() })
                    return this.invalidInpt('Не найдено, ни одного совпадения')
                }
                this.drawListSearch()
            },
            err => alert(err.message)
        )
    }
    famousCoutries() {
        let promise = new Promise((resolve, reject) => {

            fetch(`https://aniway.ru/api/country/?common=true&format=json`)
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
            resolve => {
                this.drawListSearch()
            console.log(this.data)},
            error => console.log(error.message)
        )
    }
    drawListSearch() {
        let conteiner = document.querySelector('#coutry_list')
        let all_items = document.querySelectorAll('.country_search_item')

        all_items.forEach((el) => { el.remove() })

        this.data.forEach((el) => {
            let item = document.createElement('div')
            item.setAttribute('class', 'search_item country_search_item')
            item.setAttribute('value', `item_country_${el.id}`)

            let span = document.createElement('p')

            span.innerText = `${el.name}`

            conteiner.prepend(item)
            item.append(span)
            

            item.onclick = () => {
                let country_inpt = document.querySelector('#country_arrival')
                let country_list = document.querySelector('#coutry_list')
                let wrapper_country = document.querySelector('#wrapper_seacrch_country')

                country_list.style.display = 'none'
                
                let txt = item.textContent
                country_inpt.value = txt
                country_inpt.setAttribute('value', el.id)
                wrapper_country.style.display = 'none'
                country_inpt.setAttribute('class', 'input_list')
                this.validInpt()

                let all_items = document.querySelectorAll('.country_search_item')
                all_items.forEach((el) => { el.remove() })
            }
        })
    }
    invalidInpt(inv_text) {
        let text = document.querySelector('#contry_invalid_text')
        let invalid_icon = document.querySelector('#inv_icon_country')
        let wrap = document.querySelector('#wrapper_seacrch_country')
        let valid_icon = document.querySelector('#valid_icon_country')
        let inpt = document.querySelector('#country_arrival')

        
        valid_icon.style.display = 'none'
        valid_icon.setAttribute('value', 0)

        text.style.display = 'block'
        invalid_icon.style.display = 'block'
        wrap.style.display = 'none'
        if (inv_text != undefined) text.innerText = inv_text
        
        inpt.classList.remove('valid_list_input')
        inpt.classList.add('invalid_list_input')
    }
    validInpt() {
        let text = document.querySelector('#contry_invalid_text')
        let invalid_icon = document.querySelector('#inv_icon_country')
        let valid_icon = document.querySelector('#valid_icon_country')
        let inpt = document.querySelector('#country_arrival')

        text.style.display = 'none'
        text.innerText = ''

        valid_icon.style.display = 'block'
        valid_icon.setAttribute('value', 1)
        invalid_icon.style.display = 'none'

        inpt.classList.remove('invalid_list_input')
        inpt.classList.add('valid_list_input')
        inpt.blur()
    }
    clearValid() {
        let text = document.querySelector('#contry_invalid_text')
        let invalid_icon = document.querySelector('#inv_icon_country')
        let valid_icon = document.querySelector('#valid_icon_country')
        let inpt = document.querySelector('#country_arrival')

        text.style.display = 'none'
        valid_icon.style.display = 'none'
        valid_icon.setAttribute('value', 0)
        invalid_icon.style.display = 'none'

        inpt.classList.add('full_list_input')
        inpt.classList.remove('invalid_list_input')
        inpt.classList.remove('valid_list_input')
    }
}


