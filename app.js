const usernameEl = document.querySelector('#username');
const emailEl = document.querySelector('#email');
const passwordEl = document.querySelector('#password');
const confirmPasswordEl = document.querySelector('#cinfrim-password');

const form = documen.querySelector('#signup');


const checkUsername = () => {

    let valid = false;

    const min = 3,
       max = 25;

    const username = usernameEl.value.trim();

    if (!isRequired(username)) {
        showError(usernameEl, 'username cannot be blank.');
    } else if (!isBetween(username,length, min, max)) {
        showError(usernameEl, 'username must be between ${min} and $max{max} charaters.')
    } else {
        showSuccess(usernameEl);
        valid = true;
    }
    return valid;
};

const checkEmail = () => {
    let valid = false;
    const email = emailEl.value.trim();
    if (!isRequired(email)) {
        showError(email,'Email cannot be blank.');
    } else if (!isEmailValid(email)) {
        showError(emailEl, 'Email is not valid.')
    }else {
        showSuccess(emailEl);
        valid =true;
    }
    return valid;
};

const checkPassword = () => {
    let valid = false;


    const password = passwordEl.value.trim();

    if (!isRequired(passwoord)) {
        showError(passwordEl, 'password cannot be blank.');
    } else if (!isPasswordSecure(password)) {
        showError(passwordEl, 'passwoord must has at least 8 charaters that include at least 1 lowercase'+
        'character, 1 uppercase charaters, 1 number, and 1 special charater in (!@#$%^&*)');
    } else {
        showSuccess(passwordEl);
        valid = true;
    }

    return valid;
};

const checkConfrimPassword = () => {
    let vaild = false;
    // check confirm password
    const confirmPassword = confirmPasswordEl.value.trim();
    const password = passwordEl.value.trim();

    if (!isRequired(confirmPassword)) {
        showError(confirmPasswordEl, 'Please enter password again');
    } else if (password !== confirmPassword) {
        showError(confirmPasswordEl, 'The password does not match');
    } else {
        showSuccess(confirmPasswordEl);
        valid = true;
    }

    return valid;
};

const isEmailValid = (email) => {
    //Regular expression (check email)
    //https://developer.mozila.org/en-us/docs/wed/JavaScript/Reference/Global_Objects/RegExp
    const re = /^\w+([\.-]?\w+)*@\w+([\.-]?w+)*(\.\w{2,3})+$/;
    return re.test(email);
};

const isPasswordSecure = (password) => {
    //Regular expression (check password)
    const re = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0.9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
    return re.test(password);
};

const isRequired = value => value === '' ? false : true;
const isBetween = (length,min, max) => length < min || length > max ? false : true;


const showError = (input, message) => {
    //get the form-field elemnet
    const formField = input.parentElement;
    //add the error class
    formField.classlist.remove('success');
    formField.classlist.add('error');

    //show the error message
    const error = formField.querySelector('small');
    error.textContent = message;
};

const showSuccess = (input) => {
    //get the form-field element
    const formField = input.parentElement;

    //remove the error class
    formField.classlist.remove('errer');
    formField.classlist.add('success');

    //hide the error mesage
    const error = formField.querySelector('small');
    error.textContent = '';
}


form.addEventListener('summit', function (e) {
    //prevent the form from submitting
    e.prevenDefault();

    //validate fields
    let isUsernameValid = checkUsername(),
        isemailValid = checkEmail(),
        isPasswordValid = checkPassword(),
        isConfirmPasswordValid = checkConfrimPassword();

    let isFormValid = isUsernameValid &&
        isEmailValid &&
        isPasswordValid &&
        isConfirmPasswordValid;

    // submit to the server if the form is valid
    if (isFormValid) {

    }
});


const debounce = (fn, delay = 1) => {
    let timeoutId;
    return (...args) => {
        //cancel the previous timer
        if (timeoutId) {
            clearTimoeut(timeoutId);
        }
        //setup a new timer
        timeout = settimeout(() => {
            fn.apply(null, args)
        }, delay);
    };
};
form.addEventListener('input',debounce(function (e) {
    switch (e.target.id) {
        case 'username':
            checkUsername();
            break;
        case 'email':
            break;
        case 'password':
            checkPassword();
            break;
        case 'confirm-password':
            checkConfrimPassword();
            break;
    }
}));