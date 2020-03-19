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
    loadForm() {
        let type = localStorage.getItem('animal_type')
        let type_text = localStorage.getItem('type_text')
        let country = localStorage.getItem('country')
        let breed = localStorage.getItem('breed')
        let date = localStorage.getItem('date')

        //date_departure
        let date_inpt = document.querySelector('#date_departure')
        date_inpt.value = date
        date_inpt.classList.add('valid_input')

        //Country arrival
        let country_inpt = document.querySelector('#country_arrival')
        country_inpt.value = country
        countryInfo.validInpt()

        //Порода животного
        let breed_inpt = document.querySelector('#type_animal_inpt')
        breed_inpt.value = breed
        breedAnimal.validInpt()
        
        //Тип животного
        document.querySelector('#view_animal_inpt').setAttribute('value', type)
        document.querySelector('#type_breed_text').innerText = type_text
        document.querySelector('#check_animal_inpt').checked = true
    }
    takeAllInputs() {
        let type_animal = document.querySelector('#view_animal_inpt').getAttribute('value')
        let breed_animal = document.querySelector('#type_animal_inpt').getAttribute('value')
        let country = document.querySelector('#country_arrival').getAttribute('value')
        let date_travel = document.querySelector('#date_departure').value
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
        let vakc = document.querySelector('#vakvina_date')
        let datetravel = document.querySelector('#date_departure').validity.valid
        let vakcina = document.querySelector('#vakvina_date').validity.valid
        let vakcinaCheck = document.querySelector('#have_vakcina')
        let year_age_pet = document.querySelector('#year_age_anim_inpt')
        let month_age_pet = document.querySelector('#month_age_anim_inpt')
        

        if (year_age_pet.value == 0 && month_age_pet.value == 0) {
            document.querySelector('.composite_input_back').classList.add('invalid_back')
            document.querySelector('#inv_text_age_anim').style.display = 'block'
            document.querySelector('#inv_text_age_anim').innerText = 'Необходимо указать возраст питомца'
            document.querySelector('.inv_icon_age_pet').style.display = 'block'
        }

        if (dtTr.value == '') {
            datetravel = false
            dtTr.classList.add('invalid_input')
            document.querySelector('#inv_text_date_departure').innerText = 'Не указана дата путешествия'
        } else { dtTr.classList.remove('invalid_input') }
        
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

            fetch(('https://aniway.ru/api/order/?format=api'), {
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