const express = require("express");
const app = express();

const PORT = process.env.PORT || 5000;
const solanaWeb3 = require('@solana/web3.js')
const http = require('http');
var fs =  require('fs');

app.set("view engine","ejs");
app.use(express.urlencoded({extended:false}));
app.use(express.json());
var wallet;

app.get('/',(req,res)=>{
    res.render("home");
})

 app.post("/users/connect",async(req,res)=>{
    
    const lamports_per_sol= solanaWeb3.LAMPORTS_PER_SOL;
   
        try {
            
        const resp = await window.solana.connect();
        wallet = resp;
        console.log("here")
        // 26qv4GCcx98RihuK3c4T6ozB3J7L6VwCuFVc7Ta2A3Uo 
    } catch (err) {
        // { code: 4001, message: 'User rejected the request.' }
    }
    
   
    
 })
app.post("/users/sendCrypto",async(req,res)=>{
function signInTransactionAndSendMoney(destPubkeyStr,lamports){

    (async() => {

const network = "https://api.devnet.solana.com";
const connection = new solanaWeb3.Connection(network);
const transaction = new solanaWeb3.Transaction();

lamports = document.getElementById("quantity").value * lamports_per_sol;

try {
    destPubkeyStr = "CQp7cpyGiz8Q6fwnjbsPeasQnEkzEmbj2co9WfeHBS5Q"
    lamports = document.getElementById("quantity").value * lamports_per_sol;

    console.log("starting sendMoney");
    const destPubkey = new solanaWeb3.PublicKey(destPubkeyStr);
    const walletAccountInfo = await connection.getAccountInfo(
        wallet.publicKey
    );
    
    const receiverAccountInfo = await connection.getAccountInfo(destPubkey);
   
    const Buffer = buffer.Buffer;
    const instruction = solanaWeb3.SystemProgram.transfer({
      fromPubkey: wallet.publicKey,
      toPubkey: destPubkey,
      lamports, // about half a SOL
    });
    let trans = await setWalletTransaction(instruction, connection);

    let signature = await signAndSendTransaction(wallet, trans, connection);
    let result = await connection.confirmTransaction(signature, "singleGossip");
    console.log("money sent", result);
  } catch (e) {
    console.warn("Failed", e);
  }


    })()
 
     async function setWalletTransaction(
  instruction,connection
) {
  const transaction = new solanaWeb3.Transaction();
  transaction.add(instruction);
  transaction.feePayer = wallet.publicKey;
  let hash = await connection.getRecentBlockhash();
  console.log("blockhash", hash);
  transaction.recentBlockhash = hash.blockhash;
  return transaction;
}

 async function signAndSendTransaction(
  wallet,
  transaction,
  connection
) {
     // Sign transaction, broadcast, and confirm
    const { signature } = await window.solana.signAndSendTransaction(transaction);
await connection.confirmTransaction(signature);


  //let signedTrans = await wallet.signTransaction(transaction);
  console.log("sign transaction");
  //let signature = await connection.sendRawTransaction(signedTrans.serialize());
  console.log("send raw transaction");
  return signature;
}

}
});


app.listen(PORT,()=>{
    console.log(`Listening to the port ${PORT}`);
})

