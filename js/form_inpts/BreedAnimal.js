class BreedAnimal {
    constructor() {
        this.proxyUrl = 'https://cors-anywhere.herokuapp.com/'
        this.url = 'http://178.62.220.103/api/animaltype/?format=json'
        this.data = []
    }
    searching() {

        let promise = new Promise((resolve, reject) => {

            let type = document.querySelector('#view_animal_inpt')
            type = type.getAttribute('value') * 1
            let val = document.querySelector('#type_animal_inpt').value
            val.toLowerCase()

            fetch(this.proxyUrl + `https://aniway.ru/api/breed/?animal_type=${type}&search=${val}`)
                .then(
                    (response) => {
                        if (response.status !== 200) {
                            return
                        }
                        response.clone().json()
                            .then(data => {
                                this.data = data
                                resolve()
                            })
                    }
                )
                .catch(err => console.log(err.message))
        })
        promise.then(
            resolve => {
                if (this.data.length == 0) {
                    let all_items = document.querySelectorAll('.breed_search_item')
                    all_items.forEach(el => el.remove())
                    return this.invalidInpt('Неверно заполнено поле')
                }
                this.drawList()
            },
            error => console.log(error.message)
        )
    }
    famousTypes() {
        let type_val = document.querySelector('#view_animal_inpt').getAttribute('value')
        if (type_val == 0) return this.invalidInpt('Вы не выбрали тип животного')

        let promise = new Promise((resolve, reject) => {

            let type = document.querySelector('#view_animal_inpt')
            type = type.getAttribute('value') * 1

            fetch(this.proxyUrl + `https://aniway.ru/api/breed/?animal_type=${type}&common=true&format=json`)
                .then(
                    (response) => {
                        if (response.status !== 200) {
                            alert('Ошибка при поиске животного')
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
            resolve => this.drawList(),
            error => console.log(error.message)
        )
    }
    drawList() {
        let conteiner = document.querySelector('#breed_list')
        let all_items = document.querySelectorAll('.breed_search_item')
        let type_animal = document.querySelector('#type_animal_inpt')
        let wrapper_breed = document.querySelector('#wrapper_breed_animal')

        all_items.forEach(el => el.remove())

        this.data.forEach((el) => {
            let item = document.createElement('div')
            item.setAttribute('class', 'search_item breed_search_item')
            item.setAttribute('id', `item_breed_${el.id}`)
            item.setAttribute('value', `${el.id}`)
            item.innerText = `${el.name}`

            conteiner.prepend(item)

            item.onclick = () => {
                let txt = item.textContent

                type_animal.value = txt
                type_animal.setAttribute('value', el.id)
                type_animal.setAttribute('class', 'inpt_list')

                conteiner.style.display = 'none'
                wrapper_breed.style.display = 'none'
                conteiner.style.display = 'none'
                all_items.forEach(el => el.remove())
                
                this.validInpt()
            }
        })
    }
    invalidInpt(inv_text) {
        let text = document.querySelector('#breed_invalid')
        let invalid_icon = document.querySelector('#inv_icon_breed')
        let inpt = document.querySelector('#type_animal_inpt')
        let wrap = document.querySelector('#wrapper_breed_animal')
        let valid_icon = document.querySelector('#valid_icon_breed')

        text.style.display = 'block'
        text.innerText = inv_text

        inpt.setAttribute('class', 'inpt_list invalid_input')

        valid_icon.style.display = 'none'
        invalid_icon.style.display = 'block'
        wrap.style.display = 'none'
    }
    validInpt() {
        let text = document.querySelector('#breed_invalid')
        let invalid_icon = document.querySelector('#inv_icon_breed')
        let valid_icon = document.querySelector('#valid_icon_breed')
        let inpt = document.querySelector('#type_animal_inpt')

        inpt.blur()
        text.style.display = 'none'
        text.innerText = ''
        invalid_icon.style.display = 'none'
        valid_icon.style.display = 'block'
        inpt.setAttribute('class', 'inpt_list')
    }
}


