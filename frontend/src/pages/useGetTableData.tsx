import { useState } from "react";

export interface ProductFilterParams {
    name?: string;
    category?: string;
    min_price?: number;
    max_price?: number;
    sort_by?: string;
    order?: "asc" | "desc";
    limit?: number;
    skip?: number;
  }
  
const useGetTableData = () => {
    const [error, setError] = useState<string | null>(null);
    const [tableData, setTableData] = useState<any>([]);
    const [loading, setLoading] = useState<boolean>(true);
    // have a api call return data
    async function fetchData(filter:ProductFilterParams) {
        const queryParams = new URLSearchParams(filter as any).toString(); //convert object to query string
        try{
            setLoading(true);
            const token = localStorage.getItem("accessToken");
            console.log('Token:',token);
            console.log('Query Params:');
            const response = await fetch(`http://localhost:8000/auth/api/product/filter${queryParams}`,{
                method: 'GET',
                mode: 'cors',
                headers: {
                    'coreAccessToken': token || '',
                }
            });
           
            const data = await response.json();
            setLoading(false);
            setTableData(data);
            console.log('Data:', tableData);
        }
        catch(err){
            setError(err instanceof Error ? err.message : "Something went wrong");
        }finally{
            setLoading(false);
        }
    }
    return { fetchData, error , loading , tableData}
}

export default useGetTableData ;
