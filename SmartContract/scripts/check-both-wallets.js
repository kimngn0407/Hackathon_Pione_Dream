import { ethers } from "ethers";
import dotenv from "dotenv";

dotenv.config();

async function main() {
  const provider = new ethers.JsonRpcProvider("https://rpc.zeroscan.org");
  
  // Kiểm tra ví từ .env
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
  const balance1 = await provider.getBalance(wallet.address);
  
  // Kiểm tra ví bạn yêu cầu faucet
  const requestedAddress = "0xeF58A95e514E6c83b6F73C26B644df75a2042aEa";
  const balance2 = await provider.getBalance(requestedAddress);
  
  console.log("=================================");
  console.log("🔍 KIỂM TRA SỐ DƯ CÁC VÍ");
  console.log("=================================\n");
  
  console.log("📍 Ví từ Private Key trong .env:");
  console.log("   Địa chỉ:", wallet.address);
  console.log("   Số dư:", ethers.formatEther(balance1), "PZO");
  console.log("");
  
  console.log("📍 Ví bạn yêu cầu Faucet:");
  console.log("   Địa chỉ:", requestedAddress);
  console.log("   Số dư:", ethers.formatEther(balance2), "PZO");
  console.log("");
  
  console.log("=================================");
  
  if (wallet.address.toLowerCase() === requestedAddress.toLowerCase()) {
    console.log("✅ HAI VÍ TRÙNG KHỚP!");
    if (balance1 > 0n) {
      console.log("✅ CÓ ĐỦ TOKENS ĐỂ DEPLOY!");
      console.log("\nBạn có thể chạy: npm run deploy");
    } else {
      console.log("⏳ Chờ tokens từ faucet (có thể mất 1-5 phút)");
      console.log("Sau đó chạy lại: node scripts/check-both-wallets.js");
    }
  } else {
    console.log("⚠️  HAI VÍ KHÁC NHAU!");
    console.log("\n📝 Bạn cần chọn 1 trong 2:");
    console.log("1. Cập nhật Private Key trong .env để khớp với", requestedAddress);
    console.log("2. Yêu cầu faucet cho ví", wallet.address);
  }
  
  console.log("=================================");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});


