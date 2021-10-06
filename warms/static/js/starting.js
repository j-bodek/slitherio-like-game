let choose_server_form = document.getElementById('choose_server_form')
let create_server_form = document.getElementById('create_server_form')
let join_server_form = document.getElementById('join_server_form')


document.getElementById('create_server_btn').addEventListener('click', (e) => {
    e.preventDefault()
    choose_server_form.style.display = 'none'
    create_server_form.style.display = 'block'
    join_server_form.style.display = 'none'
    document.querySelector('.close').style.display = 'block'
})

document.getElementById('join_server_btn').addEventListener('click', (e) => {
    e.preventDefault()
    choose_server_form.style.display = 'none'
    create_server_form.style.display = 'none'
    join_server_form.style.display = 'block'
    document.querySelector('.close').style.display = 'block'
})

document.querySelector('.close').addEventListener('click', (e) => {
    choose_server_form.style.display = 'block'
    create_server_form.style.display = 'none'
    join_server_form.style.display = 'none'
    document.querySelector('.close').style.display = 'none'
})