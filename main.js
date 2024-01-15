const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,8}$/;
home();

function loadUsers(){
    return JSON.parse(localStorage.getItem("users")) || [];
}

function updateButton(){
    const userEmail = document.getElementById("email").value
    if(emailRegex.test(userEmail)){
        document.getElementById("login").disabled = false;
    }

    else{
        document.getElementById("login").disabled = true;
    }
}

function updateUser(userEmail){
    let users = loadUsers();
    const userIndex = users.findIndex(utente => utente.email === userEmail);

    if(userIndex >= 0){
        const currentDate = new Date();
        const newLogin = currentDate.getDate() +"/"+ currentDate.getMonth()+1 +"/"+ currentDate.getFullYear() + " " + currentDate.getHours() +":"+ currentDate.getMinutes() +":"+ currentDate.getSeconds();
        users[userIndex].logins++;
        users[userIndex].last_login = newLogin;
        localStorage.setItem('users', JSON.stringify(users));
    }
}

function home(){
    const emailInput = `<input id="email" type="text" placeholder="e-mail" oninput="updateButton()">`;
    const buttonInvio = `<button id="login" type="button" onclick="login()" disabled>Login</button>`;
    document.getElementById("info").innerHTML = '';
    document.getElementById("content").innerHTML = emailInput + buttonInvio;

}

function login(){
    let users = loadUsers();
    const userEmail = document.getElementById("email").value
    const user = users.find(utente => utente.email === userEmail);

    if(user){
        const logout = `<button type="button" onclick="home()">Logout</button>`
        const loginInfo = `<p>Numero di accessi: ${user.logins + 1}, data ultimo accesso: ${user.last_login}</p>`
        const welcomeBack = `<p>Bentornat* ${userEmail}</p>`

        document.getElementById("info").innerHTML = loginInfo + logout;
        document.getElementById("content").innerHTML = welcomeBack;

        updateUser(userEmail);
    }
    
    else{
        const currentDate = new Date();
        const newLogin = currentDate.getDate() +"/"+ currentDate.getMonth()+1 +"/"+ currentDate.getFullYear() + " " + currentDate.getHours() +":"+ currentDate.getMinutes() +":"+ currentDate.getSeconds();
        const newUser = {
            email: userEmail,
            logins: 1,
            last_login: newLogin
        };
        users.push(newUser);
        localStorage.setItem("users", JSON.stringify(users));

        const logout = `<button type="button" onclick="home()">Logout</button>`
        const welcome = `<p>Benvenut* ${userEmail}</p>`

        document.getElementById("info").innerHTML = logout;
        document.getElementById("content").innerHTML = welcome;
    }
}