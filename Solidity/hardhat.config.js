require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity:"0.8.28",
  networks:{
    dev:{
      url:"http://localhost:8545",
      chainId: 31337,
    },
    sepolia:{
      url:"https://sepolia.infura.io/v3/03ca51181bb34ef1944ee841e85cddae",
      accounts:["77851f808520ea5985e776806dd79af6db35b4623b66ef05ec1fdc929f184fcd"],
      chainId: 11155111,
    }
  }
};
