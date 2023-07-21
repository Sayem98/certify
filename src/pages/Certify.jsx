import React from 'react'
import useContract from "../hooks/useContract";
import { useAccount } from "wagmi"
import { toast } from 'react-toastify';

function Certify() {

    const {address:account} = useAccount();
    const {certify} = useContract();

    const [receiver, setReceiver] = React.useState('');
    const [issuer, setIssuer] = React.useState('');
    const [tokenURI, setTokenURI] = React.useState('');
    const [registration, setRegistration] = React.useState('');

    console.log(account);

    const handleSubbmit = async (e) => {
        e.preventDefault();
        console.log(receiver, issuer, tokenURI);
        //Check if the user is connected
        if(!account) {
            toast('Please connect your wallet');
            return;
        }
        //Check if the user has entered all the fields
        if(!receiver || !issuer || !tokenURI) {
            toast('Please enter all the fields');
            return;
        }
        //Call the certify function
        try{
            const res = await certify(receiver, issuer, tokenURI, registration, account);

        }catch(err) {
            alert('Something went wrong with the transaction');
        }

    }
  return (
    <div className='w-full h-[100vh] flex justify-center items-center'>
        {/* form with 2 input and a submit button */}
        <form className='bg-[#233953] p-6 w-[22rem] md:w-[40rem] rounded-md flex flex-col gap-8 -mt-72'>
            <h1 className='text-2xl md:text-4xl font-semibold text-center'>RU Certifier</h1>
            <div className='flex flex-col gap-2'>
                <label 
                    className='text-white md:text-lg font-semibold'
                 htmlFor="firstName">Receiver address</label>
                <input type="text" placeholder='Enter Receiver address' 
                    className='bg-white outline-none text-gray-600 p-2 md:p-3 rounded-md'
                    id='firstName' value={receiver} onChange={(e) => setReceiver(e.target.value)}
                />
            </div>
            <div className='flex flex-col gap-2'>
                <label 
                    className='text-white md:text-lg font-semibold'
                 htmlFor="lastName">Issuer</label>
                <input type="text" placeholder='Enter Issuer name' 
                    className='bg-white outline-none text-gray-600 p-2 md:p-3 rounded-md'
                    id='lastName' value={issuer} onChange={(e) => setIssuer(e.target.value)}
                />
            </div>

            <div className='flex flex-col gap-2'>
                <label 
                    className='text-white md:text-lg font-semibold'
                 htmlFor="lastName">Registration ID</label>
                <input type="text" placeholder='Enter Token URI' 
                    className='bg-white outline-none text-gray-600 p-2 md:p-3 rounded-md'
                    id='lastName' value={registration} onChange={(e) => setRegistration(e.target.value)}
                />
            </div>

            <div className='flex flex-col gap-2'>
                <label 
                    className='text-white md:text-lg font-semibold'
                 htmlFor="lastName">Token URI</label>
                <input type="text" placeholder='Enter Token URI' 
                    className='bg-white outline-none text-gray-600 p-2 md:p-3 rounded-md'
                    id='lastName' value={tokenURI} onChange={(e) => setTokenURI(e.target.value)}
                />
            </div>

            <button className='bg-green-600 hover:bg-green-500 font-semibold px-8 py-2 md:py-3' onClick={handleSubbmit}>Submit</button>
        </form>
    </div>
  )
}

export default Certify