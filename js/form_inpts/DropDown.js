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
