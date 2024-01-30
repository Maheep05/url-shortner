import { useEffect, useState } from "react";
import axios from "axios";
import { Cards } from "./Cards";

export function GetHistory() {
    const [history, setHistory] = useState([])

    async function retrieveHistory() {
        try {
            const response = await axios.get("http://localhost:3000/url/list");
            setHistory(response.data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }



    useEffect(() => {
        retrieveHistory();
    }, [])


    return (
        <div>
           <div className="flex justify-center items-center pb-5">
  <button className="border-solid rounded-lg shadow-lg border-2 p-2 text-white bg-black font-medium" onClick={retrieveHistory}>
    Get History
  </button>
</div>
            <div className="grid grid-cols-3 gap-2 max-w-40em px-20">
                {history && history.map((url, index) => (
                    <Cards key={index} >
                        <div>
                            <strong>Short Url:</strong> http://localhost:3000/{url.shortid}
                        </div>
                        <div>
                            <strong>Redirect Url:</strong> {url.redirectUrl}
                        </div>
                        <div>
                            <strong>Clicks:</strong> {url.clicks}
                        </div>
                    </Cards>

                ))}

            </div>

        </div>
    )
}