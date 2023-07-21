import React from 'react'
import useContract from "../hooks/useContract";
import { toast } from 'react-toastify';
import { LineWave } from 'react-loader-spinner'

function Home() {

    const {getCertificate} = useContract();
    const [certificate, setCertificate] = React.useState(null);
    const [datas, setDatas] = React.useState(null);
    const [id, setId] = React.useState(null);
    const [loading, setLoading] = React.useState(false);
    const handleCertificate = async () => {
        setDatas(null);
        setLoading(true);
        if(!id || id <0) {
            toast('Please enter the certificate id');
            setLoading(false);
            return;
        }
        try{
            const {image_url, data} = await getCertificate(id);
            setCertificate(image_url);
            console.log(data);
            setDatas(data);

        }catch(err){
            toast('Error in fetching the certificate');
        }

        setLoading(false);

    }
  return (
    <div className='w-full h-[130vh]  flex justify-center items-center pt-[5rem] md:pt-[8rem]'>
        <div className='flex w-[22rem] md:w-[40rem] flex-col items-center gap-9'>
            <h1 className='text-2xl md:text-4xl font-semibold'>Certificate Verifier</h1>
            <div className='flex flex-col md:flex-row gap-6 md:gap-0 w-full items-center bg-[#233953] p-6 md:p-8'>
                <input type="text" placeholder='Certificate ID'
                    className='w-full bg-white outline-none text-gray-600 font-semibold p-2 md:p-3'
                    value={id} onChange={(e) => setId(e.target.value)} 
                />
                <button className='self-stretch md:self-auto bg-green-600 hover:bg-green-500 font-semibold px-8 py-2 md:py-3' onClick={handleCertificate}>Verify</button>
            </div>

            {loading && <LineWave
                                height="100"
                                width="100"
                                color="#4fa94d"
                                ariaLabel="line-wave"
                                wrapperStyle={{}}
                                wrapperClass=""
                                visible={true}
                                firstLineColor=""
                                middleLineColor=""
                                lastLineColor=""
                                />}
            {datas && <div className='pb-20 flex flex-col gap-4'>
                <div>
                    <img src={certificate} alt="" />
                </div>
                <div className='bg-[#233953] p-4 flex flex-col gap-8'>
                    <img src="https://img.freepik.com/premium-photo/young-hipster-man-with-his-arms-crossed_1368-14152.jpg" alt=""
                        className='rounded-md w-32 h-32 mx-auto'
                    />

                    <div className='flex flex-col items-center gap-2'>
                        <div className='flex items-center gap-3'>
                            <strong>First Name:</strong>
                            <span>{datas.name}</span>
                        </div>
                        <div className='flex items-center gap-3'>
                            <strong>Degree:</strong>
                            <span>{datas.degree}</span>
                        </div>

                        <div className='flex items-center gap-3'>
                            <strong>Year</strong>
                            <span>{datas.year}</span>
                        </div>

                        <div className='flex items-center gap-3'>
                            <strong>University:</strong>
                            <span>{datas.university}</span>
                        </div>

                        <div className='flex items-center gap-3'>
                            <strong>CGPA:</strong>
                            <span>{datas.cgpa}</span>
                        </div>
                    </div>
                </div>
            </div>}
        </div>
    </div>
  )
}

export default Home