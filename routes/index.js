const router = require('express').Router();

router.get('/', (req, res) => {
  console.log("asd")
  res.render('index');
})

router.post('/encrypt', (req, res) => {  
  res.render('index', {
    ptext : req.body.ptext,
    enkey: req.body.enkey,
    ciphertext: encrypt(req.body.ptext, req.body.enkey)
  });
})

router.post('/decrypt', (req, res) => {  
  res.render('index', {
    ptext : req.body.ptext,
    enkey: req.body.enkey,
    ciphertext: decrypt(req.body.ptext, req.body.enkey)
  });
})
/******************************AES****************************************/

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
    
    return ciphertext;
}

const decrypt = (ciphertext, key) => {

    if(key.length!=64){ // Check if the key is 256 bits
        alert("Your entered key is "+key.length+" hex digits ("+key.length*4+" bits)!\n\n"+" The length of key must be 256 bits (64 hex digits)!\n\nPlease re-enter the key!");
        document.getElementById("ciphertext").innerHTML = "size of key error";
        return false;
    }
    
    //Compute encryption result by using our api
    var decrypted_result = aes_256_ecb_decryption(ciphertext,key);
    console.log(decrypted_result);

    return hexDecode(decrypted_result);
}

//String.prototype.hexEncode = function(){
const hexEncode = (text) => {
    var hex, i;
    var result = "";
    for (i=0; i<text.length; i++) {
        hex = text.charCodeAt(i).toString(16);
        result += ("000"+hex).slice(-4);
    }
    return result
}

//String.prototype.hexDecode = function(){
const hexDecode = (text) => {
    var j;
    var hexes = text.match(/.{1,4}/g) || [];
    var back = "";
    for(j = 0; j<hexes.length; j++) {
        back += String.fromCharCode(parseInt(hexes[j], 16));
    }
    return back;
}

const aes_256_ecb_encryption = (plaintext, key) => {
    console.log(plaintext);
    //Assuming plaintext is in HEX as it was converted before calling this function.
    plaintext = aesjs.utils.hex.toBytes(hexEncode(plaintext));
    key = aesjs.utils.hex.toBytes(key);
    
    var AES_ECB = new aesjs.ModeOfOperation.ecb(key);
    var encrypted_in_bytes = AES_ECB.encrypt(plaintext);

    var ciphertext = aesjs.utils.hex.fromBytes(encrypted_in_bytes);
    return ciphertext;
}

const aes_256_ecb_decryption = (ciphertext, key) => {
    //Assuming plaintext is in HEX as it was converted before calling this function.
    ciphertext = aesjs.utils.hex.toBytes(ciphertext);
    key = aesjs.utils.hex.toBytes(key);

    var AES_ECB = new ModeOfOperation.ecb(key);
    var decrypted_in_bytes = AES_ECB.decrypt(ciphertext);

    var plaintext = aesjs.utils.hex.fromBytes(decrypted_in_bytes);
    return hexDecode(plaintext);
}

module.exports = router;