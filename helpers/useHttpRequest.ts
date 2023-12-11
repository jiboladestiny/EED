import { useState } from "react";
import axios, { AxiosRequestConfig } from "axios";
import { toast } from "react-hot-toast";

interface UseHttpRequestResponse {
    makeRequest: (config: | AxiosRequestConfig, successMessage: string) => Promise<boolean>;
    loading: boolean;
    res: String | undefined
}

const useHttpRequest = (): UseHttpRequestResponse => {
    const [loading, setLoading] = useState<boolean>(false);
    const [res, setRes] = useState<String | undefined>("");
    const makeRequest = async (config: AxiosRequestConfig, successMessage: string): Promise<boolean> => {
        try {
            setLoading(true);
            const response: any = await axios(config);

            if (response.status === 200) {
            //  console.log()
            

                toast.success(successMessage);
                setLoading(false);
  
                return true;
            }
        } catch (error: any) {
            console.log(error)
            toast.error(error.response.data.message);
        }

        setLoading(false);
        return false; // Request failed
    };

    return { makeRequest, loading,res };
};

export default useHttpRequest;
