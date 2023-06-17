let listMapSwitch = document.querySelector('#list-map-switch')

let listMapSwitchLink = listMapSwitch.querySelector('a')
let listMapSwitchButton = listMapSwitch.querySelector('button')

let listComponent = document.querySelector('#list')
let mapComponent = document.querySelector('#map')

if (window.location.pathname == "/") {
    listMapSwitchLink.classList.toggle('js-disabled')
    listMapSwitchButton.classList.toggle('js-disabled')

    listMapSwitchButton.addEventListener('click', () => {
        listComponent.classList.toggle('open-list')
        listComponent.classList.contains('open-list') ? 
        listMapSwitchButton.ariaExpanded = true : 
        listMapSwitchButton.ariaExpanded = false;
        if(listMapSwitchButton.ariaExpanded = true) {
            setTimeout(function() {listComponent.querySelector('input').focus()}, 350);
        }
    })
} else {
    window.location.pathname = "/"
}