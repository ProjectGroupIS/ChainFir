require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity:{ 
    version:"0.8.28",
    
},
  networks:{
    dev:{
      url:"HTTP://127.0.0.1:7545",
      chainId:1337
    }
  }
};
