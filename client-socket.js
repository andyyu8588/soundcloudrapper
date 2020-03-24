const socket = io(`http://localhost:3000`)
const chat = document.getElementById('chatbox')
const chatmsg = document.getElementById('text')

socket.on('message', (e)=>{
    console.log('the message is: ' + e)
    $('#1').append(`<li>${e}</li>`)
    
})

socket.on('chatmessage', (data)=>{
    console.log(data)
    $('#1').append(`<li>${data}</li>`)
})


//cancele
chat.addEventListener('submit', (e)=>{
   e.preventDefault()
   console.log('samarche')
   if(chatmsg.value){
        $('#1').append(`<li>${chatmsg.value}</li>`)
        socket.emit('chatmessage', chatmsg.value)
        chatmsg.value = ''  
   }
})