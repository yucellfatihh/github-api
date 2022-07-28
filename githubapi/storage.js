class Storage{
    static getAllSearched(){
        let users;
        if(localStorage.getItem("searched")=== null){
            users=[];
        }else{
            users=JSON.parse(localStorage.getItem("searched"));
        }
        return users;
    }
    static addStorageToUsers(username){
        let users=this.getAllSearched();
        if(users.indexOf(username)=== -1){
            users.push(username);
        }

        localStorage.setItem("searched",JSON.stringify(users));
    }

    static clearAllSearched(){
        localStorage.removeItem("searched");
    }
}