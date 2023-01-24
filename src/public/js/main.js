const socket = io.connect()

const buttonChat = document.getElementById("send")

buttonChat?.addEventListener("click", () => {
    const d = new Date()
    const date = `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()} ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`
    const data = {
        user: document.getElementById("user").value,
        date: date,
        message: document.getElementById("message").value
    }
    document.getElementById('message').value = ''
    socket.emit('client_new_message', data)
})

socket.on('server_all_menssage', chat => {
    document.getElementById('chat').innerHTML = ''
    chat.forEach(message => {
        document.getElementById('chat').innerHTML += `
            <div style="width:100vw">
                <span class="fw-bold" style="color: blue;">${message.user}</span>
                <span style="color: brown;">&nbsp[${message.date}]</span>
                <span class="fst-italic" style="color: green;">&nbsp: ${message.message}</span>
            </div>
        `
    })
})