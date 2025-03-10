import { useState } from 'react'
import { Product } from '../../../pages/useGetTableData';


const useAddProduct = () => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [success,setSuccess]=useState<boolean>(false);

  type AddProductType = Pick<Product, 'name' | 'category' | 'cost_price' | 'selling_price'|'description'|'available_stock'|'units_sold'> ;
  async function addProduct(product:AddProductType) {
    try{
      setLoading(true);
      const token = localStorage.getItem("accessToken");
      const response = await fetch(`http://localhost:8000/auth/api/product`,{
        method: 'POST',
        mode: 'cors',
        headers: {
            'coreAccessToken': token || '',
            "Content-Type": "application/json"
        },
        body: JSON.stringify(product)
    });
    const data = await response.json();
    setLoading(false);
    setSuccess(true);
    }
    catch(err){
      setError(err instanceof Error ? err.message : "Something went wrong");
    }
    finally{
      setLoading(false);
    }    
  }
  return {addProduct,error,loading,success};
}

export default useAddProduct
