// Task 1
var str='aaaadddddddfffffaa';
var regEx=/^(?!.*[Аа]).{6,}$/;
console.log(regEx.test(str));



// Task 2
var arr = [
    {
        userName:"Test",
        lastName:"Test",
        email:"test.test@gmail.com"
    },
    {
        userName:"Dmitro",
        lastName:"Porohov",
        email:"dmitro.porohov@yahoo.com"
    },
    {
        userName:"Andrii",
        lastName:"",
        email:"andrii@mail.ru" 
    },
]
const emailRegex = /^[a-zA-Z0-9]+([.-]?[a-zA-Z0-9]+)*@(gmail\.com|yahoo\.com)$/;

const trustedEmails = arr.filter(item => {

    return emailRegex.test(item.email)
 
 }).map(item=>item.email);;
 
 console.log(trustedEmails);