const button = document.querySelector('button')
const inputField = document.querySelector('input')
const h1 = document.querySelector('h1')
const form = document.querySelector('form')
const msg1 = document.querySelector('#msg1')
const msg2 = document.querySelector('#msg2')
const weatherBox = document.querySelector('.weather')

form.addEventListener('submit', e => {
    e.preventDefault()
    msg2.innerHTML = ''
    msg1.innerHTML = 'Loading.....'
    const address = document.querySelector('input').value
    fetch(`/weather?address=${address}`).then(res => {
        res.json().then(data => {
            console.log(data)
            inputField.value = ''
            if (data.error) {
                msg1.innerHTML = data.error

            } else {
                msg1.innerHTML = data.geoData.country

                msg2.innerHTML = `${data.forcastData.temperature}${String.fromCharCode(176)}C<br>
                ${data.forcastData.description}<br>
                Pressure - ${data.forcastData.pressure}<br>
                Chance of rain - ${data.forcastData.humidity}<br>
                Longitude - (${data.geoData.longitude})<br>
                Latitude - (${data.geoData.latitude})<br>
                Wind speed - ${data.forcastData.windSpeed}`;

                h1.style.top = '6%'
                h1.style.left = '20%'
                h1.style.fontSize = '15pt'
                inputField.style.top = '24%'
                inputField.style.left ='43%'
                button.style.top = '24%'
                button.style.left = '65%'
                weatherBox.style.top = '30%'
                weatherBox.style.height = '400px'
            }
        })
    })
})
// openTab.addEventListener('click', () => {

//     // window.open(`/weather?address=${address}`)
// })

