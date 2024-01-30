import { useState } from "react"
import axios from "axios";
import { Copy } from "./Copy";


export function CreateUrl() {
    const [link, setLink] = useState('');
    const [inputValue, setInputValue] = useState('');
    async function updateDb() {

        const response = await axios.post("http://localhost:3000/url", {
            url: inputValue
        })

        return setLink(response.data.shortid)
    }
    return (
        <div >
            <div className="flex flex-row justify-center my-20 items-center">
                <input type="text" className="border-solid rounded-lg shadow-lg border-2 p-2"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)} />
                <button className="border-solid rounded-lg shadow-lg border-2 p-2 mx-5 text-white bg-black font-medium" onClick={updateDb}>Get Link</button>
            </div>

            {link && <p className="flex items-center justify-center border-2 border-orange-300 bg-orange-300 rounded-lg mx-96  mb-4 ">Your Shortern Link : <span className=" font-semibold mx-4">http://localhost:3000/{link}</span></p>}

           <Copy link={link}></Copy>


        </div>
    )
}