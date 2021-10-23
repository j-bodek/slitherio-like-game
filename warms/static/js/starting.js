let choose_server_form = document.getElementById('choose_server_form')
let join_server_form = document.getElementById('join_server_form')
let joined_server_div = document.getElementById('joined_server_div')

// if serverId is in local storage display it as joined server
if (localStorage.getItem('serverId')) {
    choose_server_form.style.display = 'none'
    join_server_form.style.display = 'none'
    joined_server_div.style.display = 'block'
    document.querySelector('.close').style.display = 'none'
    // display server id
    document.getElementById('server_id').textContent = localStorage.getItem('serverId')
    document.querySelector('.close').style.display = 'none'
}

// leave server
document.getElementById('leave_server').addEventListener('click', (e) => {
    localStorage.clear();
    choose_server_form.style.display = 'block'
    join_server_form.style.display = 'none'
    joined_server_div.style.display = 'none'
    document.querySelector('.close').style.display = 'none'
})

// create new server
document.getElementById('create_server_btn').addEventListener('click', (e) => {
    e.preventDefault()
    serverId = Math.random().toFixed(10).replace('0.', '')
    localStorage.setItem('serverId', serverId);
    choose_server_form.style.display = 'none'
    join_server_form.style.display = 'none'
    joined_server_div.style.display = 'block'
    // display server id
    document.getElementById('server_id').textContent = serverId
    document.querySelector('.close').style.display = 'none'
})

// display form to join server
document.getElementById('join_server_btn').addEventListener('click', (e) => {
    e.preventDefault()
    choose_server_form.style.display = 'none'
    join_server_form.style.display = 'block'
    joined_server_div.style.display = 'none'
    document.querySelector('.close').style.display = 'none'
})

// closer joining to server
document.querySelector('.close').addEventListener('click', (e) => {
    choose_server_form.style.display = 'block'
    join_server_form.style.display = 'none'
    joined_server_div.style.display = 'none'
    document.querySelector('.close').style.display = 'none'
})

// join server
document.getElementById('join_btn').addEventListener('click', (e) => {
    choose_server_form.style.display = 'none'
    join_server_form.style.display = 'none'
    joined_server_div.style.display = 'block'
    document.querySelector('.close').style.display = 'none'
})