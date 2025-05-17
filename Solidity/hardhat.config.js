require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity:{ 
    version:"0.8.28",
    
},
  networks:{
    dev:{
      url:"HTTP://127.0.0.1:7545",
      accounts:["0xa540a181c78182dcefafc30e5ab866f26800516063cc0b081cef1e8bfbc305e7"],
      chainId:1337
    }
  }
};
