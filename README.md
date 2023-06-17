# Smart Legacy
## Introduction
In this age of emerging technologies, individuals now possess digital assets such as Bitcoin. However, due to the relatively new nature of this technology, there hasn't been much focus on integrating Smart Legacy, which are wills powered by blockchain, to manage these assets after a person's passing.

Consider a scenario where someone purchased 100 Bitcoins a decade ago, when each coin was worth approximately $300. Unfortunately, that person has since passed away, and along with them, the access to those 100 Bitcoins, now valued at around $6.1 million in 2021, has been lost.

The irreversible nature of blockchain technology means that once the private key to a wallet is lost, which should only be known to the owner, all the assets within that wallet are lost forever.

This situation could have been managed if the person had created a Smart Legacy, specifying how their Bitcoins should be managed. This would have ensured the preservation of the 100 Bitcoins, even after their passing.

However, creating a traditional, centralized will for digital assets seems outdated and introduces a new set of challenges.
</br></br>
## Metamask Setup
1. Download the Metamask extension from https://metamask.io
</br></br>
![image](https://github.com/berksaygu/SmartLegacy/assets/89379205/89ec2fdc-85b7-4669-bfb8-a5f9c077b53d)

2. Create a new wallet
</br></br>
![image](https://github.com/berksaygu/SmartLegacy/assets/89379205/1dbc64b8-1d71-4dab-8cb8-0726c7f79761)

3. Create a password which is not too easy for safety of your assets.
</br></br>
![image](https://github.com/berksaygu/SmartLegacy/assets/89379205/ae292e2d-4a9d-4d9c-bab9-9db92689c18f)

4. In case you forget your password, keep your secret phrase in a safe place to restore your wallet.
</br></br>
![image](https://github.com/berksaygu/SmartLegacy/assets/89379205/417ca53b-debb-4d4d-ab5d-0d1981e94bae)

5. After end of the setup you can use metamask.
</br></br>
![image](https://github.com/berksaygu/SmartLegacy/assets/89379205/6d51d547-1efb-4db5-bc2b-2e5c72778570)

6. You should add Celo Network to your Metamask to use our smart contract website from https://chainlist.org/?search=celo. 
</br></br>
![image](https://github.com/berksaygu/SmartLegacy/assets/89379205/4b6cbf89-1c4a-4966-ba49-8b902a82e0e9)

7. Select your address to connect Celo Network to continue.
</br></br>
![image](https://github.com/berksaygu/SmartLegacy/assets/89379205/822ce97d-e89a-492c-9722-5b9a562d2906)

8. After you added the Celo Alfojeros Testnet, you need some test tokens to use website. With the following link you can add some test tokes to your network. https://faucet.celo.org/alfajores You can simply copy your wallet address and paste it to empty field. 
</br></br>
<img width="475" alt="Faucet" src="https://github.com/berksaygu/SmartLegacy/assets/77530240/0a8afce8-7e06-4dd2-9265-5349d3580da6">

9. After getting the test tokens. You will need token contracts to interact with our smart contract. For this you can use celo docs. https://docs.celo.org/token-addresses In this page you should navigate to Alfajores Testnet and save token contracts for lates use
</br></br>
<img width="679" alt="TokenContract" src="https://github.com/berksaygu/SmartLegacy/assets/77530240/ff65dae0-d9c1-487e-9f3a-94b0d6abc955">

10. We need to create another Metamask account to send the will money.
</br></br>
![image](https://github.com/berksaygu/SmartLegacy/assets/89379205/cd28b3df-a1fd-481e-bc9a-ae5b6be296b5)

11. Now we can connect our website with this two accounts.
</br></br>
![image](https://github.com/berksaygu/SmartLegacy/assets/89379205/cc254b3e-1ecf-4992-85ae-ea7a6ef2f4ad)


## Setup Guide
1. Clone this repository
```console
git clone https://github.com/berksaygu/SmartLegacy.git
```
2. Then cd into the cloned repo and install all required NPM packages (Our version is compatible with Node.js v16.16(LTS). Other versions of Node.js may not work.
```console
cd SmartLegacy
npm install
```
3. Then to start next.js dev server using command

```console
npm run dev
```
That's all. Now you can open http://localhost:3000/ on your browser.
