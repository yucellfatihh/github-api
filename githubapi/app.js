const githubForm=document.getElementById("github-form");
const nameInput=document.getElementById("githubname");
const clearLastUsers=document.getElementById("clear-last-users");
const lastUsers=document.getElementById("last-users");
const github=new Github();
const ui=new UI();


eventListeners();

function eventListeners(){
    githubForm.addEventListener("submit",getData);
    clearLastUsers.addEventListener("click",clearAllSearched);
    document.addEventListener("DOMContentLoaded",getAllSearched);
};

function getData(e) {
    const username=nameInput.value.trim();
    if(username===""){
        alert("Lütfen geçerli kullanıcı adı giriniz.");
    }else{
        github.getGithubData(username)
        .then(response=>{
            if(response.user.message==="Not Found"){
                ui.displayMessages("danger","Kullanıcı Bulunamadı!");
            }else{
                ui.addSearchedUsersToUI(username);
                Storage.addStorageToUsers(username);
                ui.showUser(response.user);
                ui.showRepos(response.repo);
            
            }
        })
        .catch(err=>console.log(err));
    }
    ui.clearInput();
    e.preventDefault();
};

function clearAllSearched(){
    if (confirm("Emin misiniz?")) {
        Storage.clearAllSearched();
        ui.clearAllSearched();
    }

};

function getAllSearched(){
    let users=Storage.getAllSearched();

    let result="";
    users.forEach(user=>{
        result+=`<li class="list-group-item">${user}</li>`;
    });
    lastUsers.innerHTML=result;

};