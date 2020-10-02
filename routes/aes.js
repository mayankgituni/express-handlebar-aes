var aesjs = require('aes-js');
//encrypt();

//This is the encryption function
const encrypt = (plaintext, key) => {
    
    if(plaintext.length%8!=0){
        alert("Your entered plaintext is "+plaintext.length+" hex digits ("+plaintext.length*4+" bits)!\n\n"+" The length of plaintext must be a multiple of 32 hex digits (128 bits)!\n\nPlease re-enter the plaintext!");
        document.getElementById("ciphertext").innerHTML = "size of plaintext error. The text character must be in a multiples of 8 including spaces";
        return false;
    }

    if(key.length!=64){ // Check if the key is 256 bits
        alert("Your entered key is "+key.length+" hex digits ("+key.length*4+" bits)!\n\n"+" The length of key must be 256 bits (64 hex digits)!\n\nPlease re-enter the key!");
        document.getElementById("ciphertext").innerHTML = "size of key error. The hex string must be 64 Hex digits";
        return false;
    }
    //document.getElementById("ciphertext").innerHTML = plaintext;
    //console.log(plaintext);
    //var plaintext = "vvvvvvvv";
    //var key = "1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef";
    
    //Compute encryption result bu using our api
    var ciphertext = aes_256_ecb_encryption(plaintext,key);

    console.log(ciphertext);
    //console.log(ciphertext);
    
    return ciphertext;
}

function decrypt() {
    var ciphertext = document.getElementById('ctext').value;
    var key = getElementById('dekey').value;
    if(key.length!=64){ // Check if the key is 256 bits
        alert("Your entered key is "+key.length+" hex digits ("+key.length*4+" bits)!\n\n"+" The length of key must be 256 bits (64 hex digits)!\n\nPlease re-enter the key!");
        document.getElementById("ciphertext").innerHTML = "size of key error";
        return false;
    }
    
    //Compute encryption result by using our api
    var decrypted_result = aes_256_ecb_decryption(ciphertext,key);
    console.log(decrypted_result);
    //print cipher on the page
    //document.getElementById("decrpyted_result").innerHTML = decrypted_result.hexDecode();
}

//String.prototype.hexEncode = function(){
function hexEncode(text) {
    var hex, i;
    var result = "";
    for (i=0; i<text.length; i++) {
        hex = text.charCodeAt(i).toString(16);
        result += ("000"+hex).slice(-4);
    }
    return result
}

//String.prototype.hexDecode = function(){
function hexDecode(text) {
    var j;
    var hexes = text.match(/.{1,4}/g) || [];
    var back = "";
    for(j = 0; j<hexes.length; j++) {
        back += String.fromCharCode(parseInt(hexes[j], 16));
    }
    return back;
}

function aes_256_ecb_encryption(plaintext, key) {
    console.log(plaintext);
    //Assuming plaintext is in HEX as it was converted before calling this function.
    plaintext = aesjs.utils.hex.toBytes(hexEncode(plaintext));
    key = aesjs.utils.hex.toBytes(key);
    
    var AES_ECB = new aesjs.ModeOfOperation.ecb(key);
    var encrypted_in_bytes = AES_ECB.encrypt(plaintext);

    var ciphertext = aesjs.utils.hex.fromBytes(encrypted_in_bytes);
    return ciphertext;
}

function aes_256_ecb_decryption(ciphertext, key) {
    //Assuming plaintext is in HEX as it was converted before calling this function.
    ciphertext = utils.hex.toBytes(ciphertext);
    key = utils.hex.toBytes(key);

    var AES_ECB = new ModeOfOperation.ecb(key);
    var decrypted_in_bytes = AES_ECB.decrypt(ciphertext);

    var plaintext = utils.hex.fromBytes(decrypted_in_bytes);
    return hexDecode(plaintext);
}