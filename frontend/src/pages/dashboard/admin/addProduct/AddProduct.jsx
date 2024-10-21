/* eslint-disable no-unused-vars */
import { useState } from 'react'
import { useSelector } from 'react-redux'
import TextInput from './TextInput'
import SelectInput from './SelectInput'
import UploadImage from './UploadImage'
import { useAddProductMutation } from '../../../../redux/features/products/productsApi'
import { useNavigate } from 'react-router-dom'


const categories = [
  { label: 'Select category', value: '' },
  { label: 'Food', value: 'food' },
  { label: 'Drink', value: 'drink' },
  { label: 'Dessert', value: 'dessert' },
  { label: 'Combo', value: 'combo' },
  { label: 'Skill Care', value: 'skill-care' },

]
const size = [
  { label: 'Select size', value: '' },
  { label: 'S', value: 'S' },
  { label: 'M', value: 'M' },
  { label: 'L', value: 'L' },
  { label: 'Combo', value: 'combo' },
  { label: 'Skill Care', value: 'skill-care' },

]


const AddProduct = () => {
  const { user } = useSelector((state) => state.auth);
  const [product, setProduct] = useState({
    name: '',
    category: '',
    size: '',
    price: '',
    description: '',
  })

  const [image, setImage] = useState('');


  const [AddProduct, {isLoading,error}] = useAddProductMutation()
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({
      ...product,
      [name]: value
    })
  }
  const navigate = useNavigate()
  const handleSubmit =  async(e) => {
    e.preventDefault();
    if(!product.name || !product.category || !product.price || !product.description || !product.size){
      alert('Please fill all required');
      return;
     }
     try {
      await AddProduct({...product, image,author: user?._id}).unwrap();
      alert("Product added successfull")
      setProduct({
        name: '',
        category: '',
        size: '',
        price: '',
        description: '',
      })
      setImage('');
      navigate("/shop")
     } catch (error) {
      console.log("Failed to submit product",error)
     }
  }
  return (
    <div className='container mx-auto mt-8'>
      <h2 className='text-2xl font-bold mb-6'>Add new Product</h2>
      <form onSubmit={handleSubmit} className='space-y-4'>
        <TextInput
          label="Product Name"
          name="name"
          value={product.name}
          onChange={handleChange}
          type="text"
          placeholder="Product Name"
        />

        <SelectInput
          label="Category"
          name="category"
          value={product.category}
          onChange={handleChange}
          options={categories}
        />

        <SelectInput
          label="Size"
          name="size"
          value={product.size}
          onChange={handleChange}
          options={size}
        />

        <TextInput
          label="Price"
          name="price"
          value={product.price}
          onChange={handleChange}
          type="number"
          placeholder="50"
        />
        <UploadImage
        name="image"
        id= "image"
        value={e => setImage(e.target.value)}
        placeholder="write description"
        setImage={setImage}
        />
        <div>
          <label htmlFor="description" className='block text-sm font-medium text-gray-700'>description</label>
          <textarea name='description' id='description' className='add-product-InputCSS' value={product.description}
          placeholder='Write a product description'
          onChange={handleChange}
          ></textarea>
        </div>

        <div>
          <button type='submit' className='add-product-btn'>
          Add product
          </button>
        </div>
      </form>

    </div>
  )
}

export default AddProduct