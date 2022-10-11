
import { useState, useEffect } from "react";

export const REQUEST_STATUS = {
    LOADING: "loading",
    SUCCESS: "success",
    FAILURE: "failure",
};

function useRequestDelay(delayTime = 1000, initialData: any[] = []) {
    const [data, setData] = useState<any[]>(initialData);
    const [requestStatus, setRequestStatus] = useState(REQUEST_STATUS.LOADING);
    const [error, setError] = useState("");

    const delay = (ms: any) => new Promise((resolve) => setTimeout(resolve, ms))

    useEffect(() => {
        async function delayFunc() {
            try {
                await delay(delayTime);

                setRequestStatus(REQUEST_STATUS.SUCCESS)
                setData(data);

            } catch (e: any) {
                setRequestStatus(REQUEST_STATUS.FAILURE)
                setError(e)

            }
        }
        delayFunc();
    }, [])

    function updateRecord(record: any) {
        const newRecords = data.map(function (rec) {
            return rec.id === record.id ? record : rec;
        });

        async function delayFunction() {
        try {
            await delay(delayTime);
            setData(newRecords);
        } catch (error) {
            console.log("error thrown inside delayFunction", error);
        }
        }
        delayFunction();
    }


    function insertRecord(record: any, doneCallback: any) {
        const originalRecords = [...data];
        const newRecords = [record, ...data]

        async function delayFunction() {
        try {
            setData(newRecords);
            await delay(delayTime);
            
        } catch (error) {
            console.log("error thrown inside delayFunction", error);
         
            if (doneCallback) {
                doneCallback();
            }
     
            setData(originalRecords);
         }
        }
        delayFunction();
    }


    function deleteRecord(record: any, doneCallback: any) {
        const originalRecords = [...data];
        const newRecords = data.filter(function (rec) {
            return rec.id != record.id;
        })

        async function delayFunction() {
        try {
            setData(newRecords);
            await delay(delayTime);
            
        } catch (error) {
            console.log("error thrown inside delayFunction", error);
      
            if (doneCallback) {
                doneCallback();
            }
      
            setData(originalRecords);
         }
        }
        delayFunction();
    }


    return {
        data, 
        requestStatus,
        error,
        updateRecord,
        insertRecord,
        deleteRecord
    };
}

export default useRequestDelay;