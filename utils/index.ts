import {
  Connection,
  Cluster,
  clusterApiUrl,
  LAMPORTS_PER_SOL,
  Keypair,
} from "@solana/web3.js";

// *Step 3*: implement a function that gets an account's balance
const refreshBalance = async (network: Cluster, account: Keypair | null) => {
  if (!account) return 0;

  try {
    const connection = new Connection(clusterApiUrl(network), "confirmed");
    const publicKey = account.publicKey;
    const balance = await connection.getBalance(publicKey);
    return balance / LAMPORTS_PER_SOL;
  } catch (error) {
    console.log(error);
    return 0;
  }
};

// *Step 4*: implement a function that airdrops SOL into devnet account
const handleAirdrop = async (network: Cluster, account: Keypair | null) => {
  if (!account) return;

  try {
    const connection = new Connection(clusterApiUrl(network), "confirmed");
    const publicKey = account.publicKey;
    const confirmation = await connection.requestAirdrop(
      publicKey,
      LAMPORTS_PER_SOL
    );
    const result = await connection.confirmTransaction(confirmation, "confirmed");
    return await refreshBalance(network, account);
  } catch (error) {
    console.log(error);
    return;
  }
};

export { refreshBalance, handleAirdrop };
