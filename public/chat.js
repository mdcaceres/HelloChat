const socket = io();

let message = document.getElementById("message")

let userName = document.getElementById("userName")

let btn = document.getElementById("send")

let output = document.getElementById("output")

let acctions = document.getElementById("actions")


btn.addEventListener('click', () => {
    socket.emit('chat:Message', {
        userName: userName.value ,
        message: message.value
    }); 
}); 

message.addEventListener('keypress', () => {
    socket.emit('chat:typing', userName.value); 
} )

socket.on('chat:Message', (data) => {
    console.log(data); 
    acctions.innerHTML = " ";
    output.innerHTML += `<p>
    <strong>${data.userName}</strong>: ${data.message}
    </p>`
});

socket.on('chat:typing', (data) => {
    acctions.innerHTML = `<p><em>${data}</em> is typing</p>`;
})