import { generateMnemonic, mnemonicToSeedSync } from "bip39"

export interface Wallet {
    title: string;
    privateKey: string;
    publicKey: string;
    address?: string
}

export type Blockchain = "bitcoin" | "ethereum" | "solana";

export const derivationPatterns = {
    ethereum: "m/44'/60'/0'/0/x",
    solana: "m/44'/501'/x'/0'",
};


export function generateMnemonics(length?: 12 | 24) {
    const mnemonics = generateMnemonic(length === 24 ? 256 : 128)
    return mnemonics
}

export const generateSeedBuffer = () => {
    const mnemonics = generateMnemonics();
    const seedBufferSync = mnemonicToSeedSync(mnemonics);
    return { mnemonics: mnemonics.split(" "), seedBuffer: seedBufferSync }
};