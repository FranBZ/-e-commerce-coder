const socket = io.connect()

const buttonChat = document.getElementById("send")

buttonChat?.addEventListener("click", () => {
    const f = new Date()
    const fecha = `${f.getDate()}/${f.getMonth() + 1}/${f.getFullYear()} ${f.getHours()}:${f.getMinutes()}:${f.getSeconds()}`
    const data = {
        user: document.getElementById("user").value,
        date: fecha,
        message: document.getElementById("message").value
    }
    document.getElementById('menssage').value = ''
    socket.emit('client_new_message_chat', data)
})

socket.on('server_all_message', chat => {
    document.getElementById('chat').innerHTML = ''
    chat.forEach(message => {
        document.getElementById('chat').innerHTML += `
            <div style="width:100vw">
                <span class="fw-bold" style="color: blue;">${message.usuario}</span>
                <span style="color: brown;">&nbsp[${message.fecha}]</span>
                <span class="fst-italic" style="color: green;">&nbsp: ${message.message}</span>
            </div>
        `
    })
})