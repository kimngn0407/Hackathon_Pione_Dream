import hre from "hardhat";
import dotenv from "dotenv";

dotenv.config();

const { ethers } = hre;

async function main() {
  const provider = new ethers.JsonRpcProvider("https://rpc.zeroscan.org");
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
  
  console.log("=================================");
  console.log("Địa chỉ ví của bạn:", wallet.address);
  console.log("=================================");
  
  const balance = await provider.getBalance(wallet.address);
  const balanceInPZO = ethers.formatEther(balance);
  
  console.log("Số dư hiện tại:", balanceInPZO, "PZO");
  console.log("=================================");
  
  if (balance === 0n) {
    console.log("❌ VÍ CHƯA CÓ PZO TOKENS!");
    console.log("");
    console.log("📝 Hướng dẫn lấy testnet tokens:");
    console.log("1. Copy địa chỉ ví ở trên");
    console.log("2. Truy cập: https://zeroscan.org");
    console.log("3. Tìm phần 'Faucet' hoặc 'Get testnet tokens'");
    console.log("4. Dán địa chỉ ví và nhận tokens miễn phí");
    console.log("5. Chờ vài phút và chạy lại script này để kiểm tra");
  } else {
    console.log("✅ VÍ CÓ ĐỦ TOKENS ĐỂ DEPLOY!");
    console.log("Bạn có thể chạy: npm run deploy");
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});


