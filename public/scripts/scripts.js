let listMapSwitch = document.querySelector('#list-map-switch')

let listMapSwitchLink = listMapSwitch.querySelector('a')
let listMapSwitchButton = listMapSwitch.querySelector('button')

let listComponent = document.querySelector('#list')

listMapSwitchLink.classList.toggle('js-disabled')
listMapSwitchButton.classList.toggle('js-disabled')

listMapSwitchButton.addEventListener('click', () => {
    listComponent.classList.toggle('open-list')
})