let listMapSwitch = document.querySelector('#list-map-switch')

let listMapSwitchLink = listMapSwitch.querySelector('a')
let listMapSwitchButton = listMapSwitch.querySelector('button')

let listComponent = document.querySelector('#list')
let mapComponent = document.querySelector('#map')

let flightsList = listComponent.querySelector('.flights')

let searchBar = document.querySelector('#searchbar')
let noContentState = document.querySelector('.state#no-content')

console.log(noContentState)

if (window.location.pathname == "/") {
    listMapSwitchLink.classList.toggle('js-disabled')
    listMapSwitchButton.classList.toggle('js-disabled')
    searchBar.classList.toggle('js-disabled')

    listMapSwitchButton.addEventListener('click', () => {
        listComponent.classList.toggle('open-list')
        listComponent.classList.contains('open-list') ? 
        listMapSwitchButton.ariaExpanded = true : 
        listMapSwitchButton.ariaExpanded = false;
        if(listMapSwitchButton.getAttribute('aria-expanded') === 'true') {
            setTimeout(function() {listComponent.querySelector('input').focus()}, 180);
        }
    })
} else {
    window.location.pathname = "/"
}

searchBar.addEventListener('input', () => {
    let input = searchBar.value.toLowerCase();
    
    let flightCards = document.querySelectorAll('.flight')
    
    flightCards.forEach(flightCard => {
        !flightCard.innerHTML.toLowerCase().includes(input) ? flightCard.classList.add('hide') : flightCard.classList.remove('hide')
    })

    flightsList.querySelectorAll('.flight.hide').length == flightsList.querySelectorAll('.flight').length ? noContentState.classList.remove('hide') : noContentState.classList.add('hide')
})