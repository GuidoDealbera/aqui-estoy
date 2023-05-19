const passwordGenerator=(length)=> {
    let chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let password = "";
    
    for (let i = 0; i < length; i++) {
      let randomChar = chars.charAt(Math.floor(Math.random() * chars.length));
      password += randomChar;
    }
    
    return password;
  }
  
module.exports = passwordGenerator