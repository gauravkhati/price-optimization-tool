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


export type Product = {
    id:string
    name: string;
    description: string;
    cost_price: number;
    selling_price: number;
    category: string;
    available_stock: number;
    units_sold: number;
    customer_rating: number;
    demand_forecast: number;
    optimized_price: number;
};

export type ProductResponse = {
    total: number;
    limit: number;
    skip: number;
    products: Product[];
};


const useGetTableData = () => {
    const [error, setError] = useState<string | null>(null);
    const [tableData, setTableData] = useState<ProductResponse>();
    const [loading, setLoading] = useState<boolean>(true);
    // have a api call return dataxx
    async function fetchData(filter: ProductFilterParams) {
        const queryParams = new URLSearchParams(
            Object.entries(filter).reduce((acc, [key, value]) => {
                if (value !== undefined) {
                    acc[key] = String(value);
                }
                return acc;
            }, {} as Record<string, string>)
        ).toString();
        try {
            setLoading(true);
            const token = localStorage.getItem("accessToken");
            console.log('Token:', token);
            console.log('Query Params:');
            const response = await fetch(`http://localhost:8000/auth/api/product/filter${queryParams}`, {
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
        catch (err) {
            setError(err instanceof Error ? err.message : "Something went wrong");
        } finally {
            setLoading(false);
        }
    }

    return { fetchData, error, loading, tableData }
}

export default useGetTableData;
