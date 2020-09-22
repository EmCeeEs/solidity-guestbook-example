import Web3 from 'web3'

declare global {
  interface Window {
    web3: Web3 | undefined
  }
}

export const createWeb3 = () => {
  // Checking if Web3 has been injected by the browser (Mist/MetaMask)
  const web3Injected = window.web3
  if (typeof web3Injected !== 'undefined') {
    // Use Mist/MetaMask's provider
    // (web3Injected.currentProvider as any).enable()
    return new Web3(web3Injected.currentProvider)
  }
  throw new Error('Metamask not installed.')
}

