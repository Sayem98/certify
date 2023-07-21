import Web3 from 'web3';
import { CONTRACT_ADDRESS, CONTRACT_ABI } from '../utils/contract';
import {toast } from 'react-toastify';


const useContract = () => {

    const getWeb3 = async (type) => {

        if (!window.ethereum) {
          toast.error("Please install metamask");
          return;
        }
        if (type === "r") {
          const web3 = new Web3('https://rpc.sepolia.org/');
          return { web3 };
        } else if (type === "w") {
          const web3 = new Web3(window.ethereum);
          return { web3 };
        }
    };

    const getContract = async (abi, address, type) => {
        if (!window.ethereum) {
          toast.error("Please install metamask");
          return;
        }
        const { web3 } = await getWeb3(type);
        const contract = new web3.eth.Contract(abi, address);
        return contract;
    };

    const getCertificate = async (id) => {

        const contract = await getContract(CONTRACT_ABI, CONTRACT_ADDRESS, "w")
        // const certificate_data = await contract.methods.certificates(id).call();
        const metadata_url = await contract.methods.tokenURI(id).call();
        const url = "https://"+ metadata_url.split("/")[2] + ".ipfs.nftstorage.link/metadata.json"
        const response = await fetch(url.toString());
        const data = await response.json(); 
        const image_url ="https://"+data.image.split("/")[2] + ".ipfs.nftstorage.link/certificate.png" ;
        console.log(image_url);
        
        return {image_url, data};

    }

    const certify = async (to,issuer, registrationNumber , tokenURI, account) => {

            if(account === undefined){
                toast.error("Please connect your wallet");
                return;
            }
            
            const contract = await getContract(CONTRACT_ABI, CONTRACT_ADDRESS, "w")
            try{
              await contract.methods.Certify(to,issuer, registrationNumber , tokenURI).send({ from: account });

            }catch(err){
                toast.error(err.message);
                return;
            }
    }

    const getCertificateCount = async () => {
            
        const contract = await getContract(CONTRACT_ABI, CONTRACT_ADDRESS, "r")
        const count = await contract.methods.getCertificateCount().call();
        return count;
    
    }

    const getCertifier = async () => {
                
        const contract = await getContract(CONTRACT_ABI, CONTRACT_ADDRESS, "r")
        const certifier = await contract.methods.owner().call();
        return certifier;
    }

    const revokeCerificate = async (id, account) => {
                    
            const contract = await getContract(CONTRACT_ABI, CONTRACT_ADDRESS, "w")
            const certificate = await contract.methods.revokeCerificate(id).send({ from: account });
            return certificate;
    }

    return {
        
        getWeb3,
        getContract,
        getCertificate,
        certify,
        getCertificateCount,
        getCertifier,
        revokeCerificate
    }


}

export default useContract;