import CryptoJS from 'crypto-js';

const VAULT_KEY = 'password-manager-vault';

export const encryptAndSave = (data: any, masterPassword: string): boolean => {
  try {
    const jsonString = JSON.stringify(data);
    const encrypted = CryptoJS.AES.encrypt(jsonString, masterPassword).toString();
    localStorage.setItem(VAULT_KEY, encrypted);
    return true;
  } catch (error) {
    console.error("Encryption failed:", error);
    return false;
  }
};

export const loadAndDecrypt = (masterPassword: string): any | null => {
  try {
    const encryptedData = localStorage.getItem(VAULT_KEY);
    if (!encryptedData) {
      return null; // No vault found
    }
    const bytes = CryptoJS.AES.decrypt(encryptedData, masterPassword);
    const decryptedJson = bytes.toString(CryptoJS.enc.Utf8);
    if (!decryptedJson) {
      // This happens if the master password is wrong
      return null;
    }
    return JSON.parse(decryptedJson);
  } catch (error) {
    console.error("Decryption failed:", error);
    return null;
  }
};

export const vaultExists = (): boolean => {
  return localStorage.getItem(VAULT_KEY) !== null;
};