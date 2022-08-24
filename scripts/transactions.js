const {ethers} = require("ethers")
const Tx = require("ethereumjs-tx");
exports.Execute = async function(profit , {tx} , walletProvider ){
    if(profit){
        await walleProvider.sendTransaction(tx)
        console.log("SUCCESS")
    }
}