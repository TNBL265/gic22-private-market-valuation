

import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import { useRef, useState } from 'react';
import { Button } from '@mui/material';
import Papa from "papaparse";
import { postInstruments, postMarketValues, uploadInstruments } from '../common/Apis';
const allowedExtensions = ["csv"];
export default function InstrUpload({ showUploadModal, toggleModal }: any) {
    const [file, setFile] = useState(null);
    const [fileType, setFileType] = useState<string>("");
    // It state will contain the error when
    // correct file extension is not used
    const [error, setError] = useState("");
    const [info, setInfo] = useState("");

    const inputFileInstr = useRef<HTMLInputElement>(null)
    const inputFileMV = useRef<HTMLInputElement>(null)
    const commonFileHander = (e: any) => {
        e.stopPropagation();
        e.preventDefault();
        if (e.target.files.length == 0) {
            setError("No File Uploaded! Try again")
            return null
        }
        let file = e.target.files[0];
        const fileExtension = file?.type.split("/")[1];
        if (!allowedExtensions.includes(fileExtension)) {
            setError("Please input a csv file");
            return null
        }
        setFile(file)
        setError("")
        return file;
    }
    const onInstrumentFile = (e: any) => {
        let file = commonFileHander(e);
        if (file == null) {
            return
        }
        setFileType("INSTRUMENT")
    }

    const onMVFile = (e: any) => {
        let file = commonFileHander(e);
        if (file == null) {
            return
        }
        setFileType("MV")
    }

    const uploadFile = () => {
        if (!file) return setError("Enter a valid file");
        const reader = new FileReader();

        // Event listener on reader when the file
        // loads, we parse it and set the data.
        reader.onload = async ({ target }: any) => {
            if(target == null){
                return
            }
            const csv = Papa.parse(target.result, { header: true });
            const parsedData = csv?.data as any;
            // const columns = Object.keys(parsedData[0]);
            
            // constructs the json array
            // const to_ret = []
            // for(let i = 1; i < parsedData.length; i++){
            //     let to_add = ({} as any);
            //     console.log(`parsedData[i]: `)
            //     console.log(parsedData[i])
            //     for (let j = 0; j < columns.length; j++){
            //         to_add[columns[j]] = parsedData[i][j]
            //     }
            //     console.log(to_add)
            //     to_ret.push(to_add)
            // }
            // console.log("to_ret")
            // console.log(to_ret)
            let status = null
            switch(fileType){
                case "INSTRUMENT":
                    status = (await uploadInstruments({
                        "data":parsedData
                    }))?.status
                    break;
                case "MV":
                    status = (await postMarketValues({
                        "data":parsedData
                    }))?.status
                    break;
            }
            if (status == 200){
                setInfo("SUCCESS")
            } else {
                setError("Internal Error")
            }
        };
        reader.readAsText(file);
    }

    return (
        <Modal
            open={showUploadModal}
            onClose={toggleModal}
            closeAfterTransition
            className="h-full w-full flex justify-center items-center"
        >
            <Fade in={showUploadModal}>
                <div className="bg-white h-3/5 w-2/5 p-8 rounded-2xl flex flex-col">
                    <div className=''>
                        <CloudUploadIcon className='w-16 h-16 text-my-blue-2 mr-4' />
                        <span className="font-bold text-lg">Bulk Upload Data!</span>
                    </div>
                    <div className="h-full w-full flex items-center justify-around">

                        <div className='p-8 bg-my-blue-2 cursor-pointer rounded-lg text-white text-center' onClick={() => {
                            ((inputFileInstr.current) as HTMLElement).click()
                        }}>
                            <FormatListBulletedIcon className='w-36 h-36' />
                            <div>Instruments</div>
                            <input id="instrumentFile"
                                type="file"
                                ref={inputFileInstr}
                                style={{ display: 'none' }}
                                onChange={onInstrumentFile}
                            />
                        </div>
                        <div className="border-2 border-dashed border-my-gray-4 h-5/6 mx-6"></div>
                        <div className='p-8 bg-my-blue-2 cursor-pointer rounded-lg text-white text-center' onClick={() => {
                            ((inputFileMV.current) as HTMLElement).click()
                        }}>
                            <TrendingUpIcon className='w-36 h-36' />
                            <div>Market Valuations</div>
                            <input
                                type="file"
                                ref={inputFileMV}
                                style={{ display: 'none' }}
                                onChange={onMVFile}
                            />
                        </div>
                    </div>
                    <div className='flex justify-between'>
                        <div className='text-my-red-1'>
                            {error}
                        </div>
                        {file ? (
                            <Button variant="outlined" className='text-my-green-1 border-my-green-1' onClick={uploadFile}>CONFIRM</Button>
                        ) : (
                            <Button variant="outlined" disabled >No File Found</Button>
                        )}

                    </div>
                </div>
            </Fade>
        </Modal>
    );
}