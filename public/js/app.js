const weatherForm = document.querySelector('form')
const searchKey = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = searchKey.value
    messageOne.textContent = 'Loading...'
    messageTwo.innerHTML = ''
    fetch('/weather?address=' + location).then((response) => {
    response.json().then((data) => {
        if (data.error) {
            return messageOne.textContent = data.error
        }
        messageOne.textContent = data.location
        console.log(data.forecast)
        messageTwo.innerHTML = data.forecast
    })
})

})