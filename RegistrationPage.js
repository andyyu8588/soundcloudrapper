const socket = io(`http://localhost:3000`)
const homepage = 'http://localhost:3000/Welcome.html'

var element = (e)=>{
    return document.getElementById(e)
}

const form = element('form')
var username = element('username')
var password = element('password')
var email = element('email')
Empty = []

 form.addEventListener('submit',(e)=>{
    e.preventDefault()
    console.log('buttonpushed')
    socket.emit('createUser',{username:username.value,password:password.value,email:email.value,rooms:Empty})

    //listen for validation, set cookie and redirect to homepage
    socket.on('create_user_confirmation', (data)=>{
        if(data === 'user created'){
            document.cookie = ''    
            window.location.replace(homepage)
    }
        else{
            alert('an error occured')
            username.value = ''
            password.value = ''
            email.value = ''
        }
    })
})