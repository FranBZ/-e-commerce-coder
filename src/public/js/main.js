const socket = io.connect()

const buttonChat = document.getElementById("send")

buttonChat?.addEventListener("click", () => {
    const d = new Date()
    const date = `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()} ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`
    const data = {
        email: document.getElementById("email").value,
        date: date,
        message: document.getElementById("message").value
    }
    document.getElementById('message').value = ''
    socket.emit('client_new_message', data)
})

socket.on('server_all_menssage', data => {
    const { chat, usersINFO } = data
    document.getElementById('chat').innerHTML = ''
    chat.forEach(message => {
        let userFound = usersINFO.find(user => user.email == message.email)
        if (userFound && userFound.role == 'admin') {
            document.getElementById('chat').innerHTML += `
                <div style="width:100vw">
                    <span class="fw-bold" style="color: blue;">${message.email} (admin)</span>
                    <span style="color: brown;">&nbsp[${message.date}]</span>
                    <span class="fst-italic" style="color: green;">&nbsp: ${message.message}</span>
                </div>
            `
        } else if (userFound && userFound.role == 'user') {
            document.getElementById('chat').innerHTML += `
                <div style="width:100vw">
                    <span class="fw-bold" style="color: rgb(124, 0, 128);">${message.email} (registered)</span>
                    <span style="color: brown;">&nbsp[${message.date}]</span>
                    <span class="fst-italic" style="color: green;">&nbsp: ${message.message}</span>
                </div>
            `
        } else {
            document.getElementById('chat').innerHTML += `
                <div style="width:100vw">
                    <span class="fw-bold" style="color: rgb(124, 0, 128);">${message.email} (no registered)</span>
                    <span style="color: brown;">&nbsp[${message.date}]</span>
                    <span class="fst-italic" style="color: green;">&nbsp: ${message.message}</span>
                </div>
            `
        }
    })
})