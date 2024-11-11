import React, { useState, useEffect } from 'react'
//import './List.css'
import axios from 'axios';
import { listData, urlList, url, urlImg, urlRemove, tableTitle, errorMessage, urlUpdate } from '../../utils/variables'
import { toast } from 'react-toastify';

import './AuthPages.css'
import ItemCard from '../../components/ItemCard/ItemCard';

const ListPage = () => {

  const [list,setList] = useState([]);

 
  const fetchList = async () => {
    const response = await axios.get(`${url}${urlList}`);
    if(response.data.success){
      setList(response.data.data)
    }else{
      toast.error(errorMessage)
    }
  }

  const removeItem = async(itemId) => {
    const response = await axios.post(`${url}${urlRemove}`,{id:itemId});
    await fetchList();
    if(response.data.success){
      toast.success(response.data.success);
    }else{
      toast.error(errorMessage)
    }
  }

  const updateItem = async(item) => {
    const response = await axios.post(`${url}${urlUpdate}`,{
      name: item.name,
      urlUpdate: item.urlUpdate,
      price: item.price,
      category: item.category,
      image: item.image
    });
    await fetchList();
    if(response.data.success){
      toast.success(response.data.success);
    }else{
      toast.error(errorMessage)
    }
  }

  useEffect(()=>{
    fetchList();
  },[])

  

  return (

    <>




      <div className="listBox">


            {list.map((item,i)=>(

            <ItemCard key={i} postData={item} />
          ))}
          </div>
        
        </>
  )
}

export default ListPage