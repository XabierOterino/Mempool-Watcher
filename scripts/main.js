const { ethers } = require("ethers")
const {getMempool} = require("./mempool")
const { isProfitable } = require("./simulations")
const {Execute} = require("./transactions")
require("dotenv").config()

async function init(){
    /*
        Using more than one provider makes our script faster as its dividing the computation work
        Also , it prevents us from reaching the computation rate limit stablished by INFURA nodes

    */
    const provider1 = new ethers.providers.WebSocketProvider(`wss://eth-goerli.g.alchemy.com/v2/${process.env.API_KEY1}`)
    const provider2 = new ethers.providers.WebSocketProvider(`wss://eth-goerli.g.alchemy.com/v2/${process.env.API_KEY2}`)
    // We also need a wallet provider to sign the transacions
    const walletProvider = new ethers.Wallet(process.env.PRIVATE_KEY, provider1);
    provider1.on('pending' , async(tx) => {
         getMempool(provider2 , tx)
            .then(txInfo=> isProfitable(txInfo))
            .then((prof , tx )=>Execute(prof, tx, walletProvider))
            .catch(e=> console.log(e))
        
    })

}

init()
    