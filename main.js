let GET_BY_ID = id => document.getElementById(id);
const nameValidation = /^[A-Za-z]{3,10}$/;
const emailValidation = /^\w\D+(\.\w\D+)?@(\w+\.\w+|net.ua|org.ua|gmail.com)$/;
const passwordValidation = /\w{8,15}/;

class NewAccount {
    constructor(fName, sName, email, password) {
        this.fName = fName;
        this.sName = sName;
        this.email = email;
        this.password = password;
    }
}


let allAccount = [];

GET_BY_ID('firstName').addEventListener('change', function () {
    const name = GET_BY_ID('firstName').value;
    if (nameValidation.test(name)) {
        GET_BY_ID('firstName').style.border = '4px solid green';
    } else {
        GET_BY_ID('firstName').style.border = '4px solid red';
    }
})

GET_BY_ID('lastName').addEventListener('change', function () {
    const sName = GET_BY_ID('lastName').value;
    if (nameValidation.test(sName)) {
        GET_BY_ID('lastName').style.border = '4px solid green';
    } else {
        GET_BY_ID('lastName').style.border = '4px solid red';
    }
})

GET_BY_ID('email').addEventListener('change', function () {
    const email = GET_BY_ID('email').value;
    if (emailValidation.test(email)) {
        GET_BY_ID('email').style.border = '4px solid green';
    } else {
        GET_BY_ID('email').style.border = '4px solid red';
    }
})

GET_BY_ID('password').addEventListener('change', function () {
    const password = GET_BY_ID('password').value;
    if (passwordValidation.test(password)) {
        GET_BY_ID('password').style.border = '4px solid green';
    } else {
        GET_BY_ID('password').style.border = '4px solid red';
    }
})


GET_BY_ID('signUp').addEventListener('click', function () {

    const name = GET_BY_ID('firstName').value;

    const sName = GET_BY_ID('lastName').value;

    const email = GET_BY_ID('email').value;

    const password = GET_BY_ID('password').value;

    const currentAccount = new NewAccount(name, sName, email, password);

    if (nameValidation.test(name) && nameValidation.test(sName) && emailValidation.test(email) && passwordValidation.test(password)) {

        if (localStorage.length > 0 && localStorage.getItem('accounts')) {

            allAccount = JSON.parse(localStorage.getItem('accounts'));

            if (allAccount.some(elem => elem.email === currentAccount['email'].toLowerCase())) {
                alert('ця пошта вже зареєстрована')
                GET_BY_ID('firstName').value = '';
                GET_BY_ID('lastName').value = '';
                GET_BY_ID('email').value = '';
                GET_BY_ID('password').value = '';
            } else {
                allAccount.push(currentAccount);

                allAccountString = JSON.stringify(allAccount);

                localStorage.setItem('accounts', allAccountString);
                GET_BY_ID('firstName').value = '';

                GET_BY_ID('lastName').value = '';

                GET_BY_ID('email').value = '';

                GET_BY_ID('password').value = '';
            }


        } else {

            allAccount.push(currentAccount);

            allAccountString = JSON.stringify(allAccount);

            localStorage.setItem('accounts', allAccountString);

            GET_BY_ID('firstName').value = '';

            GET_BY_ID('lastName').value = '';

            GET_BY_ID('email').value = '';

            GET_BY_ID('password').value = '';

        }

    }
})

GET_BY_ID('loginBtn').onclick = () => {

    GET_BY_ID('signUpWindow').style.display = 'none';

    GET_BY_ID('signInWindow').style.display = 'flex';

}

GET_BY_ID('signIn').onclick = function () {

    const allAccount = JSON.parse(localStorage.getItem('accounts'));

    const email = GET_BY_ID('emailLogin').value;
    const password = GET_BY_ID('passwordLogin').value;

    if (allAccount.some(elem => elem.email === email && elem.password === password)) {
        let profile = [];
        profile = allAccount.find(item => item.email === email);
        console.log(profile);
        GET_BY_ID('passwordLogin').style.border = 'solid 2px green';

        GET_BY_ID('emailLogin').style.border = 'solid 2px green';

        GET_BY_ID('signInWindow').style.display = 'none';

        GET_BY_ID('accountName').innerHTML = `<h1>${profile.fName} ${profile.sName}</h1>`;

        GET_BY_ID('accountEmail').innerHTML = `<h1>${profile.email}</h1>`;

        GET_BY_ID('profileWindow').style.display = 'flex';

        GET_BY_ID('signOut').onclick = function () {
            GET_BY_ID('firstName').style = '';
            GET_BY_ID('lastName').style = '';
            GET_BY_ID('email').style = '';
            GET_BY_ID('password').style = '';
            GET_BY_ID('firstName').value = '';
            GET_BY_ID('lastName').value = '';
            GET_BY_ID('email').value = '';
            GET_BY_ID('password').value = '';
            GET_BY_ID('signInWindow').style.display = 'none';
            GET_BY_ID('profileWindow').style.display = 'none';
            GET_BY_ID('signUpWindow').style.display = 'flex';


            GET_BY_ID('emailLogin').style = '';
            GET_BY_ID('passwordLogin').style = '';
            GET_BY_ID('emailLogin').value = '';
            GET_BY_ID('passwordLogin').value = '';


        };

    } else if (allAccount.some(elem => elem.email === email && elem.password != password)) {

        GET_BY_ID('passwordLogin').style.border = 'solid 2px red';

        GET_BY_ID('emailLogin').style.border = 'solid 2px green';

        GET_BY_ID('passwordLogin').value = '';

        console.log('wrong password');
    } else if (allAccount.some(elem => elem.email != email)) {
        alert('wrong email');
        GET_BY_ID('emailLogin').style.border = 'solid 2px red';
    }

}