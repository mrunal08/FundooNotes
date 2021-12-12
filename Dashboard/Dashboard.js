window.addEventListener('DOMContentLoaded', function () {
let descriptionServer,titleServer,archiveStatusServer;   
let title2=document.querySelector(".titleMain");
let titleDescription = document.querySelector(".takeNote")
let descIcon = document.querySelector(".descriptionIcon")
let bottomIcon = document.querySelector(".mainBottomIcons")
let closeB = document.querySelector(".closeButton")
let bigNote=document.querySelector(".notes-container")
let archiveButton = document.querySelector(".archiveButton1")
let noteContainer=document.querySelector(".notes1container")
let notesBackground=document.querySelector(".notes-background")
let colorButton=document.querySelector(".colorB")
let closeModal= document.querySelector(".close")
let colourContainer=document.querySelector(".dropdown-content")
let modeltitle=document.querySelector("#modaltitle")
console.log(modeltitle)
let modelDescription=document.querySelector("#modalDescription")
console.log(modelDescription);

let colorpopupbtn=document.querySelector(".colorButtonPopup");
let mainNoteBackgroundColor=document.querySelector(".notes-main")
let colorValue;
let noteColorPopButton=document.querySelector(".noteColor")
let colorPopupForUpdate=document.querySelector(".updatecolorPopup")
let deleteButtonInNote=document.querySelector(".deleteButtonNote")


let titleTop = document.querySelector(".topTitle")
let miniNoteIcon = document.querySelector(".noteIcon")
let getAction="Normal";
titleServer="";
descriptionServer=""
archiveStatusServer=false


let titleTopStatus="Notes"

  $(".color1").click(function(){
    $('[data-toggle="popover"]').popover()
});


function getNote(){

    let arr=[]
    let filterArray=[]
    requirejs(['../service/userService.js'], (methods) => {

        methods.ajaxGet("http://fundoonotes.incubation.bridgelabz.com/api/notes/getNotesList").then(function(response){
            
          
            let a = JSON.parse(response)
           // console.log(a)
            console.log(a.data.data)
    
            //Intially  display Normal GetNotes
            if(getAction==="Normal"){
                 filterArray = a.data.data.filter(function(note){
                    if(note.isArchived===false && note.isDeleted===false){
                        return note
                    }
                })
                arr=filterArray;

                titleTop.innerHTML=`<img id="keep" src="https://www.gstatic.com/images/branding/product/1x/keep_2020q4_48dp.png"/>
                <div class="keepTitle"><h2>Keep</h2></div>`

            }

            if(getAction==="archiveDisplayButtonClicked"){
                 filterArray = a.data.data.filter(function(note){
                    if(note.isArchived===true && note.isDeleted===false){
                        return note
                    }
                })
                arr=filterArray;

                titleTop.innerHTML=`<div id="archiveTitle">
                <h2>Archive</h2>
                </div>`

            }
            if(getAction==="trashButtonClicked"){
                 filterArray = a.data.data.filter(function(note){
                    if(note.isDeleted===true){
                        console.log("Trash button if condition")
                        return note
                    }
                })
                arr=filterArray;

                titleTop.innerHTML=`<div id="archiveTitle">
                <h2>Bin</h2>
                </div>`

            }
        
            noteContainer.innerHTML=filterArray.map((note)=>`<div class="note1" style="background-color:${note.color}" id="NoteMain">
            
                <div class="title" id=${note.id}>
                    <h6 class="search-input-notes" id=${note.id} type="text">${note.title}</h6>
                    <h4 class="search-input-notes-description" id=${note.id}>${note.description}</h4>

                </div>
                 <div class= "ownerListing"> ${note.collaborators.map(user => `
                             
                             <i class="material-icons 
                                 small">account_circle</i>
                                 `)}
                             
                             </div>
              
                <div class="noteIcon">
                    <button  class="far fa-bell noteIcon one" ></button>
                    <button class="fa fa-user-plus noteIcon"></button>

                    <button class="noteIcon noteColor Icolor" id=${note.id}><img src="../Images/paint-palette.png" width="15px" height="15px"/></button>
                    <button class="fa fa-picture-o noteIcon" aria-hidden="true"></button>
                    <button id=${note.id} class=" noteIcon archiveNote  icon material-icons">&#xe149;</button> 
                    <button class="fa fa-trash icon bin deleteButtonNote noteIcon" id=${note.id} aria-hidden="true"></button>
            </div>
           
            <div class="dypop" id=${note.id}>
                       
            </div>
           
        </div>
        
        
        `).join(''); 
 
        
        }).catch(function(error){
            console.log(error)
        })
    
    })
    

    return arr;
}


var modalNew = document.getElementById("noteModal");


var container = document.getElementsByClassName("note1");

//Code to change page content on sidebar click for trasn notes and arhive

$('body').on('click', '.sideArchive', function(e) {
    e.preventDefault()
   getAction="archiveDisplayButtonClicked";
   getNote()
   console.log("Hey.Archive Button From Sidebar has been clicked")
})

$('body').on('click', '.sideTrash', function(e) {
    e.preventDefault()
   getAction="trashButtonClicked";
   getNote()
   console.log("Hey.Trash Button From Sidebar has been clicked")
})

$('body').on('click', '.bulbContent', function(e) {
    e.preventDefault()
   getAction="Normal";
   getNote()
   console.log("Hey.Notes button From Sidebar has been clicked")
})




container.onclick=function(){
    modal.style.display="block";
}
window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "block";
    }
  }


$('body').on('click', '.title', function(e) {
    e.preventDefault()
    console.log("hey From NoteMain")
    console.log(e.currentTarget.id)
    modal.style.display = "flex";
   


    requirejs(['../service/userService.js'], (methods) => {
        methods.ajaxGet("http://fundoonotes.incubation.bridgelabz.com/api/notes/getNotesList").then(function(response){
            
          
            let a = JSON.parse(response)
            // console.log(a)
            console.log(a.data.data)
    
            let filterArray = a.data.data.filter(function(note){
                if(note.isArchived===false && note.isDeleted===false){
                    return note
                }
            })

            let noteObj = filterArray.find(note => note.id === e.currentTarget.id);
            console.log(noteObj)

            modaltitle.defaultValue=noteObj.title;
            modalDescription.defaultValue=noteObj.description;
            console.log(modeltitle.defaultValue)
           
        })
   
})



closeModal.addEventListener("click",function(event){
    console.log("heyyyyyy")
    event.preventDefault()
    const data = new FormData();
    data.append("title", modeltitle.value);
    data.append("noteId",e.currentTarget.id)
    console.log(modaltitle.value)
    data.append("description", modelDescription.value);
   console.log(e.currentTarget.id)
          // let serverobj=JSON.stringify(data)
            console.log(data)

            requirejs(['../service/userService.js'], (methods) => {
                methods.ajaxPost1("http://fundoonotes.incubation.bridgelabz.com/api/notes/updateNotes",data).then(function(response){
                    
                   // console.log(response)
                    getNote()
                    let a = JSON.parse(response)
                    getColors();

                   
                }).catch(function(error){
                    console.log(error)
                })
            
            })
}
)


window.onclick = function(event) {
    // console.log(updatedTitle)
    if (event.target === modal) {
      
      modal.style.display = "none";
   

    }}

})
getNote()

// Get the modal
var modal = document.getElementById("myModal");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}


// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}




title2.addEventListener("change",function(event){
    titleServer=title2.value
})


titleDescription.addEventListener("change",function(event){
    descriptionServer=titleDescription.value
})


 archiveButton.addEventListener("click",function(event){
    event.preventDefault()
    archiveStatusServer=true
   console.log(archiveStatusServer)
 })


console.log(archiveStatusServer)


if(archiveStatusServer===true){
    
    console.log("Hey its true from if condition to check if archive button is clicked")
}
$(document).ready(function(){
    $(".takeNote").click(function(){
        title2.style.display="inline"
        title2.style.padding="20px"
        titleDescription.style.border="white"
        titleDescription.style.padding="10px"
        titleDescription.style.paddingLeft="20px"
        titleDescription.style.fontWeight="lighter"
        descIcon.style.display="none"
        bottomIcon.style.display="flex"
        notesBackground.style.display="none"
        bottomIcon.style.height="40px"
        
    });

    $(".closeButton").click(function(){
        title2.style.display="none"
        descIcon.style.display="contents"
        bottomIcon.style.display="none"
        bottomIcon.style.height="2px"
        title2.style.background="#FFFFFF";
        titleDescription.style.background="#FFFFFF";
        mainNoteBackgroundColor.style.background="#FFFFFF";
        titleServer=" ";
        descriptionServer=" ";
        title2.value="";
        titleDescription.value="";
    })

    $(".title").click(function(){
        modal1.style.display="block";
    })

});
// var titleValue;
// //When clicked anywhere outside the note will go back to initial value
//  $(document).click((event) => {
//    if (!$(event.target).closest('.notes-main').length) {
//   titleValue= title2.value;
//     console.log(titleValue)
//         title2.style.display="none"
//         descIcon.style.display="contents"
//         bottomIcon.style.display="none"
//         bottomIcon.style.height="2px"
//         titleServer=" ";
//         descriptionServer=" ";
//         title2.value="";
//         titleDescription.value="";
          
//     }        
//   });


  //Archive Note
  $('body').on('click', '.archiveNote', function(e) {
    e.preventDefault()
    console.log("heyyyyyyy")
    console.log(e.currentTarget.id)
  
    let object ={
        noteIdList : [e.currentTarget.id],
        isArchived : true,
       
}
console.log(object)
// let objectServer=JSON.stringify(object);
// console.log(objectServer)
    requirejs(['../service/userService.js'], (methods) => {
        methods.archive("http://fundoonotes.incubation.bridgelabz.com/api/notes/archiveNotes",JSON.stringify(object)).then(function(response){
            
            console.log(response)
            
            getNote()
            let a = JSON.parse(response)
            //  console.log(a.data.data)
              // console.log(a.data.data.id)
   

           
        }).catch(function(error){
            console.log(error)
        })
    
    })
   
 });



/*Delete Note And move to Trash*/

  
  $('body').on('click', '.deleteButtonNote', function(e) {
    e.preventDefault()
    console.log("Hey Delete button inside note is clicked")
    console.log(e.currentTarget.id)
  
    let object ={
        noteIdList : [e.currentTarget.id],
        "isDeleted": true,
       
}

console.log(object)
// let objectServer=JSON.stringify(object);
// console.log(objectServer)
    requirejs(['../service/userService.js'], (methods) => {
        methods.trashNote("http://fundoonotes.incubation.bridgelabz.com/api/notes/getTrashNotesList",JSON.stringify(object)).then(function(response){
            
            console.log(response)
            
            getNote()
            let a = JSON.parse(response)
            //  console.log(a.data.data)
              // console.log(a.data.data.id)
   

           
        }).catch(function(error){
            console.log(error)
        })
    
    })
   
 });



/*Delete Note from Trash Forever*/

  
$('body').on('click', '.deleteButtonNote', function(e) {
    e.preventDefault()
    console.log("Hey Delete button inside note is clicked")
    console.log(e.currentTarget.id)
  
    let object ={
        noteIdList : [e.currentTarget.id],
        "isDeleted": true,
       
}

console.log(object)

    requirejs(['../service/userService.js'], (methods) => {
        methods.archive("http://fundoonotes.incubation.bridgelabz.com/api/notes/deleteForeverNotes",JSON.stringify(object)).then(function(response){
            
            console.log(response)
            
            getNote()
            let a = JSON.parse(response)
            //  console.log(a.data.data)
              // console.log(a.data.data.id)
   

           
        }).catch(function(error){
            console.log(error)
        })
    
    })
   
 });




/*Color Popup Added*/
/*On click
 colorpopupbtn.addEventListener("click",function(event){
    event.preventDefault()
  
    const colorArray=["#FFFFFF ","#FBBC04","#FFF475","#CCFF90","#A7FFEB","#CBF0F8","#AECBFA","#D7AEFB","#FDCFE8","#E6C9A8","#E8EAED","#D7AEFB"];
    // colourContainer.innerHTML="click"
    colourContainer.innerHTML=colorArray.map((color)=>
    `<div class="color" style="background-color:${color}" id=${color} ></div>`).join('')})
*/

//On Hover
//For Main Note
colorpopupbtn.addEventListener("mouseover",function(event){
        event.preventDefault()
      mapColorToPopp("create");
       
    
    })

function mapColorToPopp(action){
   
        let decideClass = ""
        if(action === "create"){
            decideClass="color"
        }
        else if(action ==="update"){
            decideClass="update"
        }
        console.log(decideClass)
        console.log(action)
        const colorArray=["#FFFFFF ","#FBBC04","#FFF475","#CCFF90","#A7FFEB","#CBF0F8","#AECBFA","#D7AEFB","#FDCFE8","#E6C9A8","#E8EAED","#D7AEFB"];
       
        colourContainer.innerHTML=colorArray.map((color)=>
        `<div class=${decideClass} style="background-color:${color}" id=${color} ></div>`).join('')

        console.log("hey From ColorArray")
        
}
   
    
//On clicking on a color that colour is given to the background of Main Take Note
    $('body').on('click', '.color', function(e) {
        e.preventDefault()
        console.log("hey From Color CLick")
        console.log("Color = "+e.currentTarget.id);
        colorValue=e.currentTarget.id;
        console.log(colorValue)
        title2.style.background=colorValue;
        titleDescription.style.background=colorValue;
        mainNoteBackgroundColor.style.background=colorValue;
       
    })

   
   
closeModal.addEventListener("click",function(event){
    console.log("heyyyyyy")
    event.preventDefault()
    const data = new FormData();
 
    console.log(modaltitle.value)
   // data.append("color", colorValue);
   //console.log(event.currentTarget.id)
          // let serverobj=JSON.stringify(data)
            console.log(data)

            requirejs(['../service/userService.js'], (methods) => {
                methods.ajaxPost1("http://fundoonotes.incubation.bridgelabz.com/api/notes/updateNotes",data).then(function(response){
                    
                   // console.log(response)
                    getNote()
                    let a = JSON.parse(response)
                   // getColors();

                   
                }).catch(function(error){
                    console.log(error)
                })
            
            })
}
)

 //Note Added
  closeB.addEventListener("click",function(event){
        event.preventDefault()
        const data = new FormData();
        data.append("title", titleServer);
        data.append("description", descriptionServer);
        data.append("isArchived",archiveStatusServer);
        data.append("color",colorValue)
        data.append("collaberators", JSON.stringify(collabArray1));
        console.log(collabArray1);
        console.log(titleDescription)
        console.log(archiveStatusServer)
       
               // let serverobj=JSON.stringify(data)
                console.log(data)
                
                
                requirejs(['../service/userService.js'], (methods) => {
                    methods.ajaxPost1("http://fundoonotes.incubation.bridgelabz.com/api/notes/addNotes",data).then(function(response){
                        
                        console.log(response)
                        getNote()
                        location.reload();
                        console.log(noteContainer.style.background)
                        let a = JSON.parse(response)
                       
                    }).catch(function(error){
                        console.log(error)
                    })
                
                })
  }
  )





// Click on update pop up

$(document).on("click", '.Icolor', function (event) {
    let a = "#" + event.currentTarget.id + ".dypop"
   let dy= document.querySelector(".dypop")
    // $(a).css("display", "flex")

    $(".noteIcon").css("marginBottom", "0px")
    $(".note1").css("height", "200px")

    $("#" + event.currentTarget.id + ".dypop").css("background", "white")
    
    console.log("Icolor"+a)
    console.log(event.target.id)
    let NOTEID = event.currentTarget.id
    console.log(NOTEID)
    
  
// When the user clicks anywhere outside of the modal, close it


    $(a).html(`<div class="chooseColor color1" id="#fff" style="background-color:#fff"> </div>
    <div class="chooseColor color2" id="#f28b82"" style="background-color:#f28b82"> </div>
    <div class="chooseColor color3" id="#fbbc04" style="background-color:#fbbc04"> </div>
    <div class="chooseColor color4" id="#fff475" style="background-color:#fff475"> </div>
    <div class="chooseColor color5" id="#ccff90" style="background-color:#ccff90"> </div>
    <div class="chooseColor color6" id="#a7ffeb" style="background-color:#a7ffeb"> </div>
    <div class="chooseColor color7" id="cbf0f8" style="background-color:#cbf0f8"> </div>
    <div class="chooseColor color8" id="#aecbfa" style="background-color:#aecbfa"> </div>
    <div class="chooseColor color9" id="#d7aefb" style="background-color:#d7aefb"> </div>
    <div class="chooseColor color10" id="#fdcfe8" style="background-color:#fdcfe8"> </div>
    <div class="chooseColor color11" id="#e6c9a8" style="background-color:#e6c9a8"> </div>
    <div class="chooseColor color12" id="#e8eae" style="background-color:#e8eae"> </div>
    `)

    $(a).css("display", "flex")

    $(document).on('click', '.chooseColor', function (e) {
        updateColor = e.currentTarget.id
        console.log(e.currentTarget.id)
        console.log(updateColor)
      

        let obj4 = {
            noteIdList: [NOTEID],
            color: updateColor,
        }

        console.log(obj4)
        requirejs(['../service/userService.js'], (methods) => {
            console.log(methods)
            methods.ajaxPostcolorUpdateNote("http://fundoonotes.incubation.bridgelabz.com/api/notes/changesColorNotes",JSON.stringify(obj4)).then(function(response){
               
          
                  let a = JSON.parse(response)
                  console.log(response)
                  location.reload();
                
            }).catch(function(error){
                console.log(error)
            })
        
           
        });

        let chooseC= document.querySelector(".chooseColor")
        chooseC.addEventListener("click",function(event){
            getNote()
         })
         
        

        // requirejs(['../service/userService.js'], (methods) => {
        //     methods.ajaxPost1("http://fundoonotes.incubation.bridgelabz.com/api/notes/addNotes",data).then(function(response){
                
        //         console.log(response)
        //         getNote()
        //         console.log(noteContainer.style.background)
        //         let a = JSON.parse(response)
               
        //     }).catch(function(error){
        //         console.log(error)
        //     })
        
        // })


    })
})

$(document).on("dblclick", '.Icolor', function (event) {
    let a = "#" + event.currentTarget.id + ".dypop"
    $("#" + event.currentTarget.id + ".dypop").css("display", "none")
})



// obj5 = { "searchWord": searchWord }

// window.addEventListener('DOMContentLoaded', function () {

    let Collab =document.querySelector('#collab')
    let CancelButton = document.getElementById('cancelButton')
    let art;
    let SaveButton = document.getElementById('saveButton')
    // let title2=document.querySelector(".titleMain");
    // let titleDescription = document.querySelector(".takeNote")
    // let bottomIcon = document.querySelector(".mainBottomIcons")
    let CollabContainer = document.getElementById('collabContainer')
    let collabArray1 = [];
    let collabDiv = document.querySelector(".collabDiv")
    // let descIcon = document.querySelector(".descriptionIcon")
   
    var titleValue= title2.value;
   
    var titleDescriptionValue=titleDescription.value;
   
let collabInput = document.querySelector("#collabInput")
let Colt = document.querySelector('.colt')
let Owners = document.querySelector('.owners')
let userMapping = document.querySelector('.userMapping')
let takeNoteWhole=document.querySelector('.takeNoteWhole')
// let noteContainer=document.querySelector(".notes1container")


// //When clicked anywhere outside the note will go back to initial value
// $(document).click((event) => {
//     if (!$(event.target).closest('.notes-main').length) {
//    
//      console.log(titleValue)
//      console.log(titleDescriptionValue)
//          title2.style.display="none"
//          descIcon.style.display="contents"
//          bottomIcon.style.display="none"
//          bottomIcon.style.height="2px"
//          titleServer=" ";
//          descriptionServer=" ";
//          title2.value="";
//          titleDescription.value="";
           
//      }        
//    });


Collab.addEventListener('click', function () {
 
    // title2.style.display = 'none';
    // titleDescription.style.display = 'none'
  
    CollabContainer.style.display = "block"
    takeNoteWhole.style.display="none"
    noteContainer.style.marginTop="20%"
    // noteContainer.style.border="2px solid red"
    title2.innerHTML=titleValue;
    titleDescription.innerHTML=titleDescriptionValue
  
})



CancelButton.addEventListener('click', function () {
    CollabContainer.style.display = "none"
    // titleDescription.style.display = "block"
    // title2.style.display = "block"
    noteContainer.style.marginTop="1%"
    Colt.style.display = "none"
    takeNoteWhole.style.display="block"
    title2.defaultValue=titleValue;
    titleDescription.defaultValue=titleDescriptionValue
  
})



SaveButton.addEventListener('click', function () {
    CollabContainer.style.display = "none"
    takeNoteWhole.style.display = "block"
    Colt.style.display = "none";
    title2.innerHTML=titleValue;
    titleDescription.innerHTML=titleDescriptionValue;
    noteContainer.style.marginTop="1%"

    let colArray = collabArray1.map(function (el) {
        return `<div class="own">
        
        <div class="col">
                <i class="material-icons 
                    large ">account_circle</i>
            </div>
    
        </div>`

    }).join(" ");

    Owners.innerHTML = colArray;
    // ownerMap.innerHTML =colArray;
    console.log(colArray)

})


let Responsee5;

let responseArray

collabInput.addEventListener('change', function () {
    Colt.style.display = "flex"
    Colt.style.border = "2px solid red"

    console.log(titleValue)
    let searchWord = collabInput.value
    let obj5 =
    {
        "searchWord": searchWord
    }

    console.log(searchWord)
    requirejs(['../service/userService.js'], (methods) => {
        console.log(methods)
        methods.ajaxPostCollab("http://fundoonotes.incubation.bridgelabz.com/api/user/searchUserList",JSON.stringify(obj5)).then(function(collabResponse){
            // console.log(JSON.parse(collabResponse))
            // // let a=[collabResponse]
            // Responsee5 = collabResponse.data.details;
      
              let a = JSON.parse(collabResponse)
            //   console.log(response)
            // //  console.log(a.data)
            //   Responsee5 = response.details
          console.log(a.data.details)
            responseArray=a.data.details
  
  
              let resArray = responseArray.map(function (element) {
                  return `<div class ="tesdsd"  style="background-color:"; > 
             
                  <div class ="collabDiv" id =${element.email} >
                  <div class="collabList" id = ${element.email}>${element.email} </div>
                  </div>
   
                 
                  <div>`
  
              }).join(" ");
              // console.log(resArray)
  
  
              Colt.innerHTML = resArray;
              collabInput.addEventListener('dblclick', function () {
                Colt.style.display = "flex"
                Colt.style.border = "2px solid red"
                marginTop="0"
                
            })
            //   location.reload();
  
          
        }).catch(function(error){
            console.log(error)
        })
    
       
    });


})


 
$(document).on('click', '.collabList', function (event) {
    let obj6 = responseArray.find(user => user.email == event.target.id)
    console.log(obj6)
    collabArray1.push(obj6);
    console.log(collabArray1)
    // console.log(obj6.email)
Colt.style.display="none"
    collabInput.value = obj6.email

    art = collabArray1.map(function (pop) {
        console.log(pop)

        return `<div class="own">
        
                    <div class="col">
                    <img class="profile-img" src="/Images/profile.png" id =""${pop.email} width="30px" height="30px">
                           
                                <div class = "owl" id="${pop.email}" > ${pop.email} </div>
        
                        </div>
                
                    </div>`



    }).join(' ');
    // Colt.style.display = 'none';

    // <i class="material-icons personCol" id =""${pop.email} >account_circle</i>
    userMapping.innerHTML = art;


    // map list of owners

})





// })


//end of 1st dom
})