/* eslint-disable no-useless-escape */

const ValidateEmail = (emailParam) => {
    let mailformat = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    if(emailParam.match(mailformat)){
        return true;
    }
    else {
        return false;
    }
}

const ValidateName = (nameParam) => {
    if(nameParam.length <= 3){
        return false;
    }
    else {
        return true;
    }
}

const ValidatePassword = (passwordParam) => {
    if(passwordParam.length <= 3){
        return false;
    }
    else {
        return true;
    }
}

module.exports = {
    ValidateEmail,
    ValidatePassword,
    ValidateName
}