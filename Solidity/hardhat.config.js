require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.28",
  networks:{
    dev:{
      url:"http://127.0.0.1:7545",
      accounts:["0x03e3c1c482b36453ef6d659efe6f5fc8e9d5d1812c8c7e63aad6e32e7643d16f"],
      chainId:1337

    }
  }
};
