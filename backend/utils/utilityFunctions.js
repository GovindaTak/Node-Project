
const generateRandomPassword = () => {
    const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@$!%?&";
    let password = '';
    password += chars[Math.floor(Math.random() * 26)]; // lowercase letter
    password += chars[Math.floor(Math.random() * 26) + 26]; // uppercase letter
    password += chars[Math.floor(Math.random() * 10) + 52]; // digit
    password += chars[Math.floor(Math.random() * 6) + 62]; // special character
    for (let i = 4; i < 10; i++) {
        password += chars[Math.floor(Math.random() * chars.length)];
    }
    return password.split('').sort(() => 0.5 - Math.random()).join(''); // Shuffle to ensure randomness
};

module.exports ={generateRandomPassword}