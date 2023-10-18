// javascript
let myLeads = []
const inputEl = document.querySelector("#input-el")
const saveBtn = document.querySelector("#save-btn")
const listLeads = document.querySelector("#listLeads")
const deleteBtn = document.querySelector("#delete-btn")
const tabBtn = document.querySelector("#tab-btn")

//console.log(localStorage.getItem("myLeads")) // test localStorage

if(localStorage.getItem("myLeads")){
    myLeads = JSON.parse(localStorage.getItem("myLeads"))
    renderLeads(myLeads)
}

saveBtn.addEventListener("click", function(){
    
    myLeads.push(inputEl.value)
    inputEl.value = ""
    localStorage.setItem("myLeads", JSON.stringify(myLeads))
    renderLeads(myLeads)
})

// tabBtn.addEventListener("click", function(){
//     myLeads.push(window.location.href)
//     //console.log(myLeads) // test tab button
//     localStorage.setItem("myLeads", JSON.stringify(myLeads))
//     renderLeads(myLeads)
// })

tabBtn.addEventListener("click", function(){    
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads", JSON.stringify(myLeads) )
        renderLeads(myLeads)
    })
})


function renderLeads(leadsArr){
    let createList = ""
    for (let i = 0; i < leadsArr.length; i++){
        createList += `
        <li>
            <a target="_blank" href="${leadsArr[i]}">${leadsArr[i]}</a>
        </li>`
    }
    
    listLeads.innerHTML = createList
}

deleteBtn.addEventListener("dblclick", function(){
    localStorage.clear()
    myLeads = []
    renderLeads(myLeads)
})