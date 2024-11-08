import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function ProductCard({ product }) {
  let randomInt = Math.floor(Math.random() * product.Images.length);
  return (
    <div className="w-[300px] p-4 bg-white rounded-lg shadow-md transform hover:scale-105 transition-transform duration-300 ease-in-out flex flex-col justify-center items-center hover:cursor-pointer">
      <img
        className="w-[200px] h-[200px] object-cover rounded-t-lg"
        alt="Card Image"
        src={product.Images[randomInt].image}
      />
      <div className="p-4">
        <h2 className="text-xl font-semibold">{product.name}</h2>
        <p
          className="text-gray-600"
          style={{
            overflowWrap: "break-word",
            wordBreak: "break-word",
            maxWidth: "100%",
          }}
        >
          {product.description}
        </p>
        <div className="flex justify-center items-center mt-4">
          <div className="price text-black font-extrabold text-[50px] text-shadow-md">
            {product.price}₺
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
