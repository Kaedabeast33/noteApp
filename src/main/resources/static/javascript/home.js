// USER INTERFACE
let modalBtn = document.querySelector(".modal-btn");
let modalBg = document.querySelector(".modals-bg");
let submitModal = document.getElementById("note-submit")
const div = document.createElement("div")

modalBtn.addEventListener("click",function(){
    modalBg.classList.add("bg-active")
});

let modalExit = document.querySelector(".modal-btn-close");
modalExit.addEventListener("click",function(){
    modalBg.classList.remove("bg-active")
})

//BackEnd Support
const cookieArr = document.cookie.split("=")
const userId = cookieArr[1];
const headers = {
    'Content-Type':'application/json'
}
const baseUrl = 'http://localhost:8080/api/v1/notes/'
//dom modalelements
const submitNote = document.getElementById("note-form")
const header= document.getElementById("modal-header")
const body= document.getElementById("modal-body")

//dom mini note views
const getAllNotes = document.getElementById("get-all")
const noteContainer = document.getElementById("note-container")

//note edit view
const noteEditModal = document.getElementById("modals-bg-2")
const editSubmit=document.getElementById("edit-submit")

//Handlers
function handleGetAll  (e){
    e.preventDefault()
    let getUserNotesObject = getNotes(userId)
    
}
const  handleSubmitModal= async (e)=>{
    e.preventDefault()
    let noteModalPostObject={


        header:header.value ,
        body:body.value ,
        user:null
    }
    console.log(noteModalPostObject)
    let response=await fetch(`http://localhost:8080/api/v1/notes/user/${userId}`,{
        method:"POST",
        headers:headers,
        body:JSON.stringify(noteModalPostObject)
    })
   
   
   modalBg.classList.remove("bg-active")
   let getUserNotesObject = getNotes(userId)
 
    
}
const editNote = async (id)=>{
    console.log(`edit note for box with id of ${id}`)
    noteEditModal
  
   await fetch(`${baseUrl}${id}`,{
    method:"GET",
    headers:headers
   })
   .then(response=>response.json())
   .then(data=>createModalView(data.header,data.body,id))
   
   }
//Support Methods
const createModalView =   (header,body,id)=>{
   

   const modals2= document.querySelector(".modals-bg-2")
   modals2.classList.add("bg-active")
    
    let modalHeader2=document.getElementById("modal-header-2")
    let modalBody2=document.getElementById("modal-body-2")

    modalHeader2.value = header
    modalBody2.value=body

   const formData=document.getElementById("note-edit-form")
   
   
formData.onsubmit= async (e)=>{
    e.preventDefault();

    let modalHeader2=document.getElementById("modal-header-2")
    let modalBody2=document.getElementById("modal-body-2")
    console.log(modalHeader2.value,modalBody2.value)

         let putObject= {
        id:id,
        header:modalHeader2.value,
        body:modalBody2.value,
        user:null
         }
         submitModalEdit(putObject)
   }
    // editSubmit.addEventListener("click", ()=>console.log("submitted"))
    // editSubmit.addEventListener("click", ()=>console.log(putObject))
    
    // let exitbutton=document.getElementById("modalEditButton")
    // exitbutton.addEventListener("click",myFunction())
    
    
    

}
const handleDelete= async (id)=>{
     await fetch(baseUrl + id,{
        method:"DELETE",
        headers:headers
     })
     .catch(err=> console.error(err))
     
    let getUserNotesObject = getNotes(userId)
     
    }


const createNoteCards =  (array)=>{
    // headerId=1
    // bodyId=1

noteContainer.innerHTML = ``;

    array.forEach(dbNote => {
        // console.log("click")
        let noteCard= document.createElement("div")
        noteCard.classList.add("m-2")
        noteCard.classList.add("note-cards")
// console.log(dbNote.id)

        noteCard.innerHTML = `
        <div onClick="editNote(${dbNote.id})" id="${dbNote.id}"style="width: 18rem; height: 18rem; background-color: rgba(0,0,0,.35); border-top-right-radius:8px; border-top-left-radius:8px;">
        <div class="${dbNote.id}">
            <h1 style="color:white; padding:5px;" >${dbNote.header}</h1>

        </div>
       <div class="${dbNote.id}" >
            <p style="color:white; padding:5px; word-break: break-all;
            white-space: normal;">${dbNote.body}</p>
          
        </div>
        
    </div>
    <div style="background-color: rgba(0,0,0,.35); width:100%; background-color: rgba(0,0,0,.35); border-bottom-right-radius:8px; border-bottom-left-radius:8px;">
    <button style="position: relative; left:220px; bottom:8px;" onClick="handleDelete(${dbNote.id})">Delete</button>
    </div>
        `
        noteContainer.appendChild(noteCard)

    });

}
async function getNotes(userId){
    await fetch(`${baseUrl}user/${userId}`,{
        method:"GET",
        headers:headers
    })
    .then(response => response.json())
    .then(data => createNoteCards(data))
    .catch(err=>console.error(err))
}
async function submitModalEdit(putObj){
    await fetch("http://localhost:8080/api/v1/notes",{
        method:"PUT",
        body:JSON.stringify(putObj),
        headers:headers
        
    }).catch(err=> console.error(err.message))
    
}
const myFunction=()=> {
    document.querySelector(".modals-bg-2").classList.remove("bg-active")
    getNotes(userId)
  }

//Event listeners

getAllNotes.addEventListener("click",handleGetAll)
submitModal.addEventListener("click",handleSubmitModal)

