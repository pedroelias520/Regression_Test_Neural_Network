const { ipcRenderer } = require('electron');
const body = document.querySelector("body");
const sidebar = body.querySelector(".sidebar");
const toggle = body.querySelector(".toggle");
const searchBtn = body.querySelector(".search-box");
const modeSwitch = body.querySelector(".toggle-switch");
const modeText = body.querySelector(".mode-text");
const logOutButton = body.querySelector(".logout");
const Products = body.querySelector(".products");


modeSwitch.addEventListener("click", ()=> {
    body.classList.toggle("dark") 
    
    if(body.classList.contains("dark")){
        modeText.innerHTML = "Light Mode"
    }else{
        modeText.innerHTML = "Dark Mode"
    }    
})

toggle.addEventListener("click", ()=> {
    sidebar.classList.toggle("close");           
})

logOutButton.addEventListener("click", ()=>{
    ipcRenderer.send('ExitApp')
})

Products.addEventListener("click", ()=>{
    ipcRenderer.send('Products')
})