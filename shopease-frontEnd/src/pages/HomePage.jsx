import React, { useState } from "react";
import CategoryList from './../components/Category/CategoryList';

const HomePage = () => {
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = [
    "All",
    "Electronics",
    "Fashion",
    "Home & Kitchen",
    "Books & Stationery",
    "Beauty & Personal Care",
    "Sports & Outdoors",
    "Toys & Games",
    "Automotive",
    "Health & Wellness",
    "Grocery & Gourmet Foods",
    "Baby & Kids",
    "Pet Supplies",
    "Office Supplies",
    "Jewelry",
    "Music & Entertainment",
  ];

  return (
    <div className="home-container">
      <h2 className="home-category-title">Top Categories</h2>
      <div className="home-nav-container">
        {categories.map((category) => (
          <div
            key={category}
            className={`category ${
              activeCategory === category
                ? "active hover-background hover-text"
                : ""
            }`}
            onClick={() => setActiveCategory(category)}
          >
            {category}
          </div>
        ))}
      </div>
      <CategoryList category={activeCategory} />
    </div>
  );
};

export default HomePage;
