// Navbar:
import React from 'react'
import "./Categories.css"
import CategoryItem from './CategoryItem'

export const categoriesNavbar = [
  {
    id: 1,
    name: "Bedroom",
    image: "http://localhost:5000/public/images/categories/1/Bedroom_1.webp",
  },
  {
    id: 2,
    name: "Dining Room",
    image: "http://localhost:5000/public/images/categories/1/DiningRoom_2.webp",
  },
  {
    id: 3,
    name: "Living Room",
    image: "http://localhost:5000/public/images/categories/1/LivingRoom_3.webp",
  },
  {
    id: 4,
    name: "Outdoor",
    image: "http://localhost:5000/public/images/categories/1/Outdoor_1.webp",
  },
  {
    id: 5,
    name: "Office",
    image: "http://localhost:5000/public/images/categories/1/Office_3.jpg",
  },
];

// category navbar component for display categories and filter products
function Categories() {
    return (
        <div className='container d-flex justify-content-center flex-wrap '>
            {
                categoriesNavbar.map(item => <CategoryItem key={item.id} {...item}/>)
            }
        </div>
    )
}

export default Categories
