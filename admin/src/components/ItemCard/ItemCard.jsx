import React, { useContext, useState } from 'react'
import './ItemCard.css'
import { addData, categories, url, urlAdd, urlEdit, urlImg, urlRemove } from '../../utils/variables'
import { assets } from '../../assets/assets' 
import axios from 'axios'
import { toast } from 'react-toastify'
import { useAuthStore } from '../../store/authStore.js';
const ItemCard = ({postData, fetchList, add=false}) => {

    const {name, description, price, category, _id} = postData ? postData : '';

    const { removeAuthItem, updateAuthItem } = useAuthStore();


    const [edit,setEdit] = useState(add);
    const [image,setImage] = useState(false);
    const [data,setData] = useState({
    name: name,
    description: description,
    price: price,
    category: category
  });

/*   const {url,token,userName } = useContext(StoreContext) */

  const onChangeHandler = (e) => {
   /*  e.preventDefault(); */
    const name = e.target.name;
    const value = e.target.value;
    setData(data=>({...data,[name]:value}))
  } 

  const handleEdit = (e) => {
 
    setEdit(!edit)

  }

/*   const handleChangeImg = (e) => {
 
    setEdit(!edit)

  }
 */
/*   useEffect(()=>{
    
    console.log(data)
  },[data]) */

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (window.confirm('czy na pewno chcesz edytować ten przedmiot?')) {


        const formData = new FormData();
        formData.append('name',data.name);
        formData.append('description',data.description);
        formData.append('price',Number(data.price));
        formData.append('category',data.category);
        formData.append('image',image);
        if(_id){
          formData.append('id',_id);
        }
        

    let newUrl = _id ? urlEdit : urlAdd

    const response = await updateAuthItem(_id,formData)

    //const response = await axios.post(`${url}${newUrl}`, formData);
 /*    console.log(response) */

 

    if(response.data.success){

      if(!add){
        await fetchList()
      }else{
        setData({
          name:'',
          description:'',
          price:'',
          category:categories[0]
        })
        setImage(false)
      }

      toast.success(response.data.message)
    }else{
      toast.error(response.data.message)
    }
  }
}

const removeItem = async(itemId) => {
  const response = await removeAuthItem(itemId);
  //const response = await axios.post(`${url}${urlRemove}`,{id:itemId});
  await fetchList();
  if(response.data.success){
    toast.success(response.data.success);
  }else{
    toast.error(errorMessage)
  }
}

let allowEdit = edit ? 'allowEdit' : '';
let disabled = edit ? '' : 'disabled'
let imageId = edit ? 'image' : ''

let placeholderImage = postData?.image ? `${url}${urlImg}${postData.image}` : assets.upload_area;
  return (
    
      <form onSubmit={onSubmitHandler} className={`addForm ${allowEdit}`}>
                                                      <p 
            							onClick={(e) => {
                            if (window.confirm('na pewno chcesz usunąć przedmiot?')) {
                              removeItem(_id)
                              e.target.parentElement.classList.add('hidden');
                            }
                          }}
                        className='itemDelete'>x</p>
        <div className='addDataBox'>

        <div className="addImgUpload flexCol">
          <p>{image ? 'zmień' : addData.addPhoto}</p>
          <label htmlFor='image'>
            <img src={image?URL.createObjectURL(image): placeholderImage} alt={assets.upload_area} />
          </label>
          <input className={`${disabled}`} onChange={(e)=>(setImage(e.target.files[0]),console.log(e.target.files[0]))} type='file' id={imageId} hidden /> 
        </div>

        <div className='addData'>
        <div className="addItemName flexCol">
          <p>{addData.itemName}</p>
          <input className={`${disabled}`} onChange={onChangeHandler} value={data.name} type='text' name='name' placeholder={addData.typeItemName}/>

          <p>{addData.itemDesc}</p>
          <textarea className={`${disabled}`} onChange={(e)=>onChangeHandler(e)} value={data.description} name='description' rows='6' placeholder={addData.typeItemDesc}></textarea>
      </div>

     <div className="addCatPrice">

    <div className="addCat flexCol">
      <p>{addData.itemCat}</p>
      <select className={`${disabled}`} onChange={onChangeHandler} value={data.category} name='category'>
        {
          categories.map((item,i)=>(
            <option key={i} value={item.replace(' ','-')}>{item}</option>
          ))
        }
      </select>
    </div>
    <div className="addPrice flexCol">
      <p>{addData.itemPrice}</p>
      <input className={`${disabled}`} onChange={onChangeHandler} value={data.price} type='number' name='price' placeholder={addData.typeItemPrice} />
    </div>
    <a onClick={handleEdit} className='addBtn'>{addData.editBtn}</a> 

      
      <button className={`addBtn ${disabled}`} type='submit'>{addData.addBtn}</button>
  
    </div>
    </div>

    </div>
      </form>
  )
}

export default ItemCard