import React from 'react'
import useContract from "../hooks/useContract";
import { useAccount } from "wagmi"
import { toast } from 'react-toastify';
import FileDropZone from '../components/FileDropZone';
import { NFTStorage } from 'nft.storage'
import { LineWave } from 'react-loader-spinner'

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweGJlQjI4Nzk0MkJjZUQxMzVEOWFCOGFCMDNlNzk2MzY1OGRlRGY1MTQiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY3MzU2MDgyNTE3NiwibmFtZSI6Ik5GVF9qYWlsX2NvbGxlY3Rpb24ifQ.7lQjZuJqWAa58U7f9eqbHKQ_sl-rT1tds4j-B5My-9g'
function Certify() {

    const {address:account} = useAccount();
    const {certify} = useContract();

    const [receiver, setReceiver] = React.useState('');
    const [issuer, setIssuer] = React.useState('');
    const [tokenURI, setTokenURI] = React.useState('');
    const [registration, setRegistration] = React.useState('');
    const [files, setFiles] = React.useState([]);
    const [ccid, setCcid] = React.useState(null); // IPFS CID of the certificate

    const [mcid, setMcid] = React.useState(null); // IPFS CID of the certificate
    const [pcid, setPcid] = React.useState(null); // IPFS CID of the certificate

    const [status, setStatus] = React.useState(''); 
    const [loading, setLoading] = React.useState(false);

    const [name, setName] = React.useState(''); 
    const [description, setDescription] = React.useState(''); 
    const [image, setImage] = React.useState('');
    const [attributes, setAttributes] = React.useState([]);
    const [degree, setDegree] = React.useState(''); 
    const [year, setYear] = React.useState(''); 
    const [cgpa, setCgpa] = React.useState('');
    const [university, setUniversity] = React.useState('');



    const handleSubbmit = async (e) => {
        
        e.preventDefault();
        setLoading(true);
        console.log(receiver, issuer, mcid);
        //Check if the user is connected
        if(!account) {
            toast('Please connect your wallet');
            return;
        }
        //Check if the user has entered all the fields
        if(!receiver || !issuer || !registration) {
            toast('Please enter all the fields');
            return;
        }
        if(mcid === null) {
            toast('Please generate a metadata');
            return;
        }
        //Call the certify function
        try{
            const res = await certify(receiver, issuer, registration, `ipfs://${mcid}`, account);

        }catch(err) {
            toast('Something went wrong with the transaction');
        }
        setLoading(false);
    }

    

    const handleIPFSUpload = async (U_files) => {

        setLoading(true);
        console.log('IPFS Upload');

        console.log(U_files);
        const storage = new NFTStorage({ token })
        if(U_files.length !== 0) {
            try{
                const cid = await storage.storeDirectory(U_files)
                console.log({ cid })
                setCcid(cid);

                const _status = await storage.status(cid)
                console.log(_status)
                
                toast('Certificate uploaded successfully');
                setStatus(1);
            }catch(err) {
                toast('Something went wrong with the upload');
                console.log(err);
            }

        }else{
            toast('Please upload a file');
        }

        setLoading(false);
    }

    const handlePersonIPFSUpload = async (U_files) => {

        setLoading(true);
        console.log('IPFS person Upload');

        console.log(U_files);
        const storage = new NFTStorage({ token })
        if(U_files.length !== 0) {
            try{
                const cid = await storage.storeDirectory(U_files)
                console.log({ cid })
                

                const _status = await storage.status(cid)
                console.log(_status)
                
                toast('Certificate uploaded successfully');
                setPcid(cid);
                setStatus(2);
            }catch(err) {
                toast('Something went wrong with the upload');
                console.log(err);
            }

        }else{
            toast('Please upload a file');
        }

        setLoading(false);
    }

    const handleMetadataUpload = async (e) => {
        setLoading(true);
        e.preventDefault();
        // check everything is filled
        if(!name || !degree || !year || !cgpa || !university) {
            toast('Please fill all the fields');
            return;
        }
        
        
        if(ccid === null) {
            toast('Please upload a certificate');
            return;
        }

        if(pcid === null) {
            toast('Please upload the student image');
            return;
        }


        // create metadata
        const metadata = {

            name: name,
            image: `ipfs://${ccid}`,
            degree: degree,
            year: year,
            cgpa: cgpa,
            university: university,
            person: `ipfs://${pcid}`

        }
        
        console.log(metadata);

        // convert to json
        const metadataJSON = JSON.stringify(metadata);
        console.log(metadataJSON);

        // convert to blob
        const metadataBlob = new Blob([metadataJSON], { type: 'application/json' })

        // upload to IPFS
        const storage = new NFTStorage({ token })
        
            // const mcid = await storage.storeDirectory(metadataBlob)
        try{
            const mcid = await storage.storeBlob(metadataBlob)
            setMcid(mcid);
            const url = "https://"+ mcid + ".ipfs.nftstorage.link/"
            console.log(url);
            toast('Metadata uploaded successfully');
            setStatus(3);
        }catch(err) {
            toast('Something went wrong with the upload');
            console.log(err);
        }
        
        setLoading(false);
        
    }

  return (
    <div className='w-full h-[100vh] flex justify-center items-center'>

        {ccid == null && <div className='flex flex-col gap-4 w-[40rem] h-[30rem]'>
            <h1 className='text-4xl font-semibold text-center'>Upload Certificate</h1>
            <FileDropZone files={files} setFiles={setFiles} />
            <button className='bg-green-600 hover:bg-green-500 font-semibold flex justify-center items-center px-8 py-2 md:py-3' onClick={() => handleIPFSUpload(files)}>{loading?<LineWave height="50"
                                width="50"
                                color="white"
                                ariaLabel="line-wave"
                                wrapperStyle={{}}
                                wrapperClass=""
                                visible={true}
                                firstLineColor=""
                                middleLineColor=""
                                lastLineColor=""/>:"Upload"}</button>
        </div>}

        {ccid != null && pcid == null && status === 1 && <div className='flex flex-col gap-4 w-[40rem] h-[30rem]'>
            <h1 className='text-4xl font-semibold text-center'>Upload Image</h1>
            <FileDropZone files={image} setFiles={setImage} />
            <button className='bg-green-600 hover:bg-green-500 font-semibold flex justify-center items-center px-8 py-2 md:py-3' onClick={() => handlePersonIPFSUpload(image)}>{loading?<LineWave height="50"
                                width="50"
                                color="white"
                                ariaLabel="line-wave"
                                wrapperStyle={{}}
                                wrapperClass=""
                                visible={true}
                                firstLineColor=""
                                middleLineColor=""
                                lastLineColor=""/>:"Upload"}</button>
        </div>}



        { ccid !== null && status === 2 &&  <form className='bg-[#233953] p-6 w-[22rem] md:w-[40rem] rounded-md flex flex-col gap-8'>
            <h1 className='text-2xl md:text-4xl font-semibold text-center'>RU Certifier</h1>
            <div className='flex flex-col gap-2'>
                <label 
                    className='text-white md:text-lg font-semibold'
                 htmlFor="firstName">name</label>
                <input type="text" placeholder='Enter Receiver Name' 
                    className='bg-white outline-none text-gray-600 p-2 md:p-3 rounded-md'
                    id='firstName' value={name} onChange={(e) => setName(e.target.value)}
                />
            </div>
            <div className='flex flex-col gap-2'>
                <label 
                    className='text-white md:text-lg font-semibold'
                 htmlFor="lastName">Certificate</label>
                <input type="text" placeholder={ccid?ccid:'Upload Certificate'} 
                    className='bg-white outline-none text-gray-600 p-2 md:p-3 rounded-md'
                    id='lastName' defaultValue = {ccid ? ccid: ''} name='ccid' readOnly
                />
            </div>

            <div className='flex flex-col gap-2'>
                <label 
                    className='text-white md:text-lg font-semibold'
                 htmlFor="lastName">Person</label>
                <input type="text" placeholder={pcid?pcid:'Upload Certificate'} 
                    className='bg-white outline-none text-gray-600 p-2 md:p-3 rounded-md'
                    id='lastName' defaultValue = {pcid ? pcid: ''} name='pcid' readOnly
                />
            </div>

            <div className='flex flex-col gap-2'>
                <label 
                    className='text-white md:text-lg font-semibold'
                 htmlFor="lastName">Degree</label>
                <input type="text" placeholder='Enter Degree' 
                    className='bg-white outline-none text-gray-600 p-2 md:p-3 rounded-md'
                    id='lastName' value={degree} onChange={(e) => setDegree(e.target.value)}
                />
            </div>

            <div className='flex flex-col gap-2'>
                <label 
                    className='text-white md:text-lg font-semibold'
                 htmlFor="lastName">Year</label>
                <input type="text" placeholder='Enter Year' 
                    className='bg-white outline-none text-gray-600 p-2 md:p-3 rounded-md'
                    id='lastName' value={year} onChange={(e) => setYear(e.target.value)}
                />
            </div>
            <div className='flex flex-col gap-2'>
                <label 
                    className='text-white md:text-lg font-semibold'
                 htmlFor="lastName">CGPA</label>
                <input type="text" placeholder='Enter CGPA' 
                    className='bg-white outline-none text-gray-600 p-2 md:p-3 rounded-md'
                    id='lastName' value={cgpa} onChange={(e) => setCgpa(e.target.value)}
                />
            </div>

            <div className='flex flex-col gap-2'>
                <label 
                    className='text-white md:text-lg font-semibold'
                 htmlFor="lastName">University</label>
                <input type="text" placeholder='Enter University' 
                    className='bg-white outline-none text-gray-600 p-2 md:p-3 rounded-md'
                    id='lastName' value={university} onChange={(e) => setUniversity(e.target.value)}
                />
            </div>

            <button className='bg-green-600 hover:bg-green-500 font-semibold flex justify-center items-center px-8 py-2 md:py-3' onClick={handleMetadataUpload}>{loading?<LineWave height="50"
                                width="50"
                                color="white"
                                ariaLabel="line-wave"
                                wrapperStyle={{}}
                                wrapperClass=""
                                visible={true}
                                firstLineColor=""
                                middleLineColor=""
                                lastLineColor=""/>:"Generate Metadata"}</button>
        </form>}
        
        {/* form with 2 input and a submit button */}
        {status === 3 && <form className='bg-[#233953] p-6 w-[22rem] md:w-[40rem] rounded-md flex flex-col gap-8 -mt-72'>
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
                    id='lastName' defaultValue={mcid} readOnly
                />
            </div>

            <button className='bg-green-600 hover:bg-green-500 font-semibold flex justify-center items-center px-8 py-2 md:py-3' onClick={handleSubbmit}>{loading?<LineWave height="50"
                                width="50"
                                color="white"
                                ariaLabel="line-wave"
                                wrapperStyle={{}}
                                wrapperClass=""
                                visible={true}
                                firstLineColor=""
                                middleLineColor=""
                                lastLineColor=""/>:"Submit"}</button>
        </form>}
    </div>
  )
}

export default Certify