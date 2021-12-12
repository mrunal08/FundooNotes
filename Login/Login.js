window.addEventListener("DOMContentLoaded",function(){
    console.log("hi");
    let emailServer,passwordServer;
    let email1= document.querySelector(".form_input");

    let password1=document.querySelector(".form_input1");
    let button = document.querySelector(".next")
    let emailHelper = document.querySelector(".helperTextEmail")
    let passwordHelper = document.querySelector(".helperTextPassword")

    let regexEmail = RegExp('^[a-zA-Z]+[a-zA-Z0-9]*[- . + _]?[a-zA-Z0-9]+[@]{1}[a-z0-9]+[.]{1}[a-z]+[.]?[a-z]+$');
    let regexPass = RegExp('^[A-Z]{1}[a-z]{1,}[0-9]{1,}$');

    email1.addEventListener("change",function(event){
        emailServer=email1.value
    })

    password1.addEventListener("change",function(event){
        passwordServer=password1.value
    })

    button.addEventListener("click",function(e){
        e.preventDefault()

        let emailStatus = regexEmail.test(emailServer);
        let passwordStatus = regexPass.test(passwordServer);


        //Email Validation
        if(emailStatus === true){
            email1.style.border="1px solid #dddddd"
            emailHelper.innerHTML=""
        }
        else if(emailStatus === false){
            email1.style.border="1px solid red"
            emailHelper.innerHTML="Please enter a valid email address."
            emailHelper.style.color="red"
        }

        //Password Validation
        if(passwordStatus === true){
            password1.style.border="1px solid #dddddd"
            passwordHelper.innerHTML=""
        }
        else if(passwordStatus === false){
            password1.style.border="1px solid red"
            passwordHelper.innerHTML="Please enter correct password."
            passwordHelper.style.color="red"
        }


        if(emailStatus === true && passwordStatus=== true){
                let object ={
                        "email":emailServer,
                        "password":passwordServer
                }
                let serverobj=JSON.stringify(object)
            console.log(object)
                requirejs(['../service/userService.js'], (methods) => {
                    methods.ajaxPost("http://fundoonotes.incubation.bridgelabz.com/api/user/login",serverobj).then(function(response){
                        
                        window.location="../Dashboard/dashboard.html"
                        console.log(response)
                        let a = JSON.parse(response)
                        console.log(a.id)

                        localStorage.setItem("token",a.id)
                    }).catch(function(error){
                        console.log(error)
                    })
                
            
                
                })
        }
    })

  
   

})

/*const data = new FormData();
        data.append("title", TITLE);
        data.append("description", TITLENOTES); */