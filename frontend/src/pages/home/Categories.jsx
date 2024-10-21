import { Link } from "react-router-dom";
import category1 from "../../assets/category-1.png";  
import category2 from "../../assets/category-2.png";  
import category3 from "../../assets/category-3.png";  
import category4 from "../../assets/category-4.png"; 

const Categories = () => {
  const categories = [
    { name: 'Food', path: 'food', image: category1},
    { name: 'Drink', path: 'drink', image: category2},
    { name: 'Dessert', path: 'dessert', image: category3},
    { name: 'Combo', path: 'combo', image: category4},
  ];

  return (
    <>
      <div className="product__grid">
        {
          categories.map((category) => ( 
            <Link key={category.path} to={`/categories/${category.path}`}
             className="categories__card" >
              <img src={category.image} alt={category.name} />
              <h4>{category.name}</h4>
            </Link>
          ))
        }
      </div>
    </>
  );
};

export default Categories;
