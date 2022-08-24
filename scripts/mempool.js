const {ethers} = require("ethers")
require("dotenv").config()


exports.getMempool =  async function(provider , tx){
    const txInfo = await provider.getTransaction(tx)
    const newTx = {
       to : txInfo.to ,
       from : "0x485b14c3a26809A53107ffb6BA043d5F66AEaDc7",
       fromPrivateKey : process.env.PRIVATE_KEY,
       value : txInfo.value,
       gasPrice : txInfo.gasPrice,
       gasLimit : ethers.utils.hexlify(21000)
    }
    
    waitFor(1000)
    return newTx
   


}

// funciton used to wait before returning the result , to make it more readable in the propmpt
async function waitFor(time){
    return new Promise((resolve)=>setTimeout(resolve,time))
    
}