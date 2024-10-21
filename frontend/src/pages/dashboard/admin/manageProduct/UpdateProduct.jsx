import { useNavigate, useParams } from "react-router-dom";
import {
  useFetchProductByIdQuery,
  useUpdateProductMutation,
  
} from "../../../../redux/features/products/productsApi";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import TextInput from "../addProduct/TextInput";
import SelectInput from "../addProduct/SelectInput";
import UploadImage from "../addProduct/UploadImage";



const categories = [
  { label: 'Select category', value: '' },
  { label: 'Food', value: 'food' },
  { label: 'Drink', value: 'drink' },
  { label: 'Dessert', value: 'dessert' },
  { label: 'Combo', value: 'combo' },
  { label: 'Skill Care', value: 'skill-care' },

]
const Size = [
  { label: 'Select size', value: '' },
  { label: 'S', value: 'S' },
  { label: 'M', value: 'M' },
  { label: 'L', value: 'L' },
  { label: 'Combo', value: 'combo' },

]
const UpdateProduct = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({
    name: "",
    category: "",
    size: "",
    price: "",
    description: "",
    image: "",
  });
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const {
    data: productData,
    isLoading: isProductLoading,
    error: fetchError,
    refetch,
  } = useFetchProductByIdQuery(id);
  const {
    name,
    category,
    size,
    description,
    image: imageURL,
    price,
  } = productData?.product || {};
  const [newImage, setNewImage] = useState(null);

  const [updateProduct, { isLoading: isUpdating, error: updateError }] =
    useUpdateProductMutation();

  useEffect(() => {
    if (productData) {
      setProduct({
        name: name   || '',
        category: category || '',
        size: size || '',
        price: price || '',
        description:  description|| '',
        image: imageURL  || ''
      });
    }
  }, [productData]);

  const handleChange = (e) =>{
    const {name,value} =e.target;
    setProduct({
        ...product,
        [name]:value
    })
  }

const handleImageChange =(image) =>{
         setNewImage(image);
}

const handleSubmit = async(e) =>{
    e.preventDefault();

    const updatedProduct =  {
        ...product,
        image :newImage ? newImage : product.image,
        author: user?._id
    }
    try {
        await updateProduct({id: id, ...updatedProduct}).unwrap();
        alert('Product updated successfully');
        await refetch();
        navigate("/dashboard/manage-products")
    } catch (error) {
        console.error('Failed to update product:', error);
    }
}
if(isProductLoading) return <div>Loading...</div>
if(fetchError) return <div>Eroorrr update</div>
  return (
  <div className="container mx-auto mt-8">
    <h2 className="text-2xl font-bold mb-6">Update Product</h2>
    <form onSubmit={handleSubmit} className="space-y-4">
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
          options={Size}
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
        value={newImage || product.image}
        placeholder="write description"
        setImage={handleImageChange}
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
          {
            isUpdating ? 'Updating...' : 'Update Product'
          }
          </button>
        </div>
    </form>
  </div>

  )
  
};

export default UpdateProduct;
