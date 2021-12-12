window.addEventListener("DOMContentLoaded",function(){

    let fnameServer,lnameServer,passwordMainServer,passwordConfirmServer,usernameServer;

    let fname=document.querySelector("#firstname");
    let lname=document.querySelector("#lastname");
    let passwordM=document.querySelector("#passwordMain1");
    let passwordC = document.querySelector("#passwordConfirm1");
    let userName=document.querySelector("#username");
    let button = document.querySelector(".next")

    let fnameHelper = document.querySelector(".helperTextFName")
    let lnameHelper = document.querySelector(".helperTextLName")
    let userNameHelper = document.querySelector(".helperTextUsername")
    let passwordMHelper = document.querySelector(".helperTextMPassword")
    let passwordCHelper = document.querySelector(".helperTextCPassword")

    let regexfName = RegExp('^[A-Z]{1}[a-z]{3,}$');
    let regexlName = RegExp('^[A-Z]{1}[a-z]{3,}$');
    let regexuserName = RegExp('^[a-zA-Z]+[a-zA-Z0-9]*[- . + _]?[a-zA-Z0-9]+[@]{1}[a-z0-9]+[.]{1}[a-z]+[.]?[a-z]+$');
    let regexMainPassword = RegExp('^[A-Z]{1}[a-z]{1,}[0-9]{1,}$');
    let regexConfirmPassword= RegExp('^[A-Z]{1}[a-z]{1,}[0-9]{1,}$');
  
    fname.addEventListener("change",function(event){
        fnameServer=fname.value;
    })

    lname.addEventListener("change",function(event){
        lnameServer=lname.value;
    })

    passwordM.addEventListener("change",function(event){
        passwordMainServer=passwordM.value;
    })

    passwordC.addEventListener("change",function(event){
        passwordConfirmServer=passwordC.value;
    })


    userName.addEventListener("change",function(event){
        usernameServer=userName.value;
    })


    button.addEventListener("click",function(e){
        e.preventDefault()


        let fnameStatus = regexfName.test(fnameServer);
        let lnameStatus = regexlName.test(lnameServer);
        let usernameStatus = regexuserName.test(usernameServer);
        let pConfirmStatus = regexMainPassword.test(passwordConfirmServer);
        let pMainStatus = regexConfirmPassword.test(passwordMainServer);
    
          //First Name Validation
        if(fnameStatus === true){
            fname.style.border="1px solid #dddddd"
            fnameHelper.innerHTML=""
        }
        else if(fnameStatus === false){
            fname.style.border="1px solid red"
            fnameHelper.innerHTML="Please enter a valid first name."
            fnameHelper.style.color="red"
        }
    
       
          //Last Name Validation
        if(lnameStatus === true){
            lname.style.border="1px solid #dddddd"
            lnameHelper.innerHTML=""
        }
        else if(lnameStatus === false){
            lname.style.border="1px solid red"
            lnameHelper.innerHTML="Please enter a valid last name."
            lnameHelper.style.color="red"
        }
      
    
        //Password Validation
        if(usernameStatus === true){
            userName.style.border="1px solid #dddddd"
            userNameHelper.innerHTML=""
        }
        else if(usernameStatus === false){
            userName.style.border="1px solid red"
            userNameHelper.innerHTML="Please enter valid user name."
            userNameHelper.style.color="red"
        }
    
          //Password Main Validation
          if(pMainStatus === true){
            passwordM.style.border="1px solid #dddddd"
            passwordMHelper.innerHTML=""
        }
        else if(pMainStatus === false){
            passwordM.style.border="1px solid red"
            passwordMHelper.innerHTML="Please enter a valid last name."
            passwordMHelper.style.color="red"
        }
    
          //Password COnfirm Validation
          if(pConfirmStatus === true){
            passwordC.style.border="1px solid #dddddd"
            passwordCHelper.innerHTML=""
        }
        else if(pConfirmStatus === false){
            passwordC.style.border="1px solid red"
            passwordCHelper.innerHTML="Please enter a valid last name."
            passwordCHelper.style.color="red"
        }
    
        console.log(fnameStatus,lnameStatus,usernameStatus,pMainStatus,pConfirmStatus)
    


       if(fnameStatus === true && lnameStatus=== true && usernameStatus === true && pMainStatus === true && pConfirmStatus === true){
            let object ={
                "firstName":fnameServer,
                "lastName":lnameServer,
                "password":passwordMainServer,
                "email":usernameServer,
                "service" : "advance"
            }
            let serverobj=JSON.stringify(object)
            console.log(object)

            requirejs(['../service/userService.js'], (methods) => {
                methods.ajaxPost("http://fundoonotes.incubation.bridgelabz.com/api/user/userSignUp",serverobj).then(function(response){
                    
                    window.location="../Login/login.html"
                }).catch(function(error){
                    console.log(error)
                })
            
        
            
            })
        }

    })
})