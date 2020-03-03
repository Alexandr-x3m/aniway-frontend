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
            text: '.type_pet_text',
            invText: '#animal_type_inv_text'
        })
    }
}