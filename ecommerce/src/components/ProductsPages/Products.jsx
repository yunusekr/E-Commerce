import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../store/actions";
import ProductCard from "./ProductCard";

function Products() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);
  const totalPages = useSelector((state) => state.totalPages);

  const [page, setPage] = useState(0);

  useEffect(() => {
    dispatch(getProducts(page, 10)); // Her sayfada 10 ürün gösteriyoruz
  }, [dispatch, page]);

  return (
    <div className="flex flex-col gap-5">
      <div className="flex gap-[6rem]">
        {products.map((product) => (
          <ProductCard product={product} />
        ))}
      </div>
      <div>
        <button disabled={page === 0} onClick={() => setPage(page - 1)}>
          Previous
        </button>
        <span>
          {page + 1} / {totalPages}
        </span>
        <button
          disabled={page >= totalPages - 1}
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Products;
