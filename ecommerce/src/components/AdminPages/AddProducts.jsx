import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import {
  saveProduct,
  saveProductwithoutsizeandcolor,
} from "../../store/actions";
import { useDispatch } from "react-redux";

function AddProducts() {
  const dispatch = useDispatch();
  const { register, handleSubmit, setValue } = useForm();
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [colors, setColors] = useState([]);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [images, setImages] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:9000/ecom/admin/addproducts")
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.error("Bir hata oluştu:", error);
      });

    axios
      .get("http://localhost:9000/ecom/admin/addproductssizes")
      .then((response) => {
        setSizes(response.data);
      })
      .catch((error) => {
        console.error("Bir hata oluştu:", error);
      });

    axios
      .get("http://localhost:9000/ecom/admin/addproductscolors")
      .then((response) => {
        setColors(response.data);
      })
      .catch((error) => {
        console.error("Bir hata oluştu:", error);
      });
  }, []);

  const changeEventHandler = (event) => {
    const categoryId = event.target.value;
    setValue("category.id", categoryId);
    axios
      .get(`http://localhost:9000/ecom/admin/addproducts/${categoryId}`)
      .then((response) => {
        setSubCategories(response.data);
      })
      .catch((error) => {
        console.error("Bir hata oluştu:", error);
      });
  };

  const addImageField = () => {
    setImages([...images, { id: images.length + 1, url: "" }]);
  };

  const removeImageField = (id) => {
    setImages(
      images
        .filter((image) => image.id !== id)
        .map((image, index) => ({
          ...image,
          id: index + 1,
        }))
    );
  };

  const onSubmit = (data) => {
    const { category, subcategory, ...rest } = data;

    const payload = {
      ...rest,
      Images: images.map((image) => ({ image: image.url })), // Images dizisini istenilen formata dönüştürüyoruz
      stockDetails: [
        {
          stock: rest.stockDetails[0].stock,
        },
      ],
    };

    console.log("Kategori ID:", category.id);
    console.log("Alt Kategori ID:", subcategory.id);
    console.log("Seçilen Beden ID:", selectedSize);
    console.log("Seçilen Renk ID:", selectedColor);
    console.log("Payload:", payload);

    if (selectedSize == null && selectedColor == null) {
      dispatch(
        saveProductwithoutsizeandcolor(payload, category.id, subcategory.id)
      );
    } else {
      dispatch(
        saveProduct(
          payload,
          category.id,
          subcategory.id,
          selectedSize,
          selectedColor
        )
      );
    }
  };

  return (
    <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
      <p>Ürün İsmi:</p>
      <input type="text" {...register("name")} placeholder="Ürün ismi" />

      <p>Fiyatı:</p>
      <input type="number" {...register("price")} placeholder="Fiyatı" />

      <p>Açıklama:</p>
      <input type="text" {...register("description")} placeholder="Açıklama" />

      <p>Detaylı Açıklama:</p>
      <input
        type="text"
        {...register("long_description")}
        placeholder="Detaylı Açıklama"
      />

      <label htmlFor="category">Kategori Seç:</label>
      <select {...register("category.id")} onChange={changeEventHandler}>
        <option value="">Seçiniz</option>
        {categories.map((item) => (
          <option key={item.id} value={item.id}>
            {item.name}
          </option>
        ))}
      </select>

      <label htmlFor="subCategory">Alt Kategori Seç:</label>
      <select {...register("subcategory.id")}>
        <option value="">Seçiniz</option>
        {subCategories.map((item) => (
          <option key={item.id} value={item.id}>
            {item.name}
          </option>
        ))}
      </select>

      <div>
        <h2>Ürün Bedenleri</h2>
        <div className="flex gap-2">
          {sizes.map((size) => (
            <div key={size.id}>
              <input
                type="radio"
                id={`size-${size.id}`}
                name="productSize"
                onChange={() => setSelectedSize(size.id)}
              />
              <label htmlFor={`size-${size.id}`}>{size.size}</label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2>Ürün Renkleri</h2>
        <div className="flex gap-2">
          {colors.map((color) => (
            <div key={color.id}>
              <input
                type="radio"
                id={`color-${color.id}`}
                name="productColor"
                onChange={() => setSelectedColor(color.id)}
                style={{ display: "none" }}
              />
              <label
                htmlFor={`color-${color.id}`}
                style={{
                  display: "inline-block",
                  width: "20px",
                  height: "20px",
                  borderRadius: "50%",
                  backgroundColor: color.colorcode,
                  border:
                    selectedColor === color.id
                      ? "3px solid #33baff"
                      : "1px solid",
                  cursor: "pointer",
                }}
              />
            </div>
          ))}
        </div>
      </div>

      <p>Stok Miktarı:</p>
      <input
        type="number"
        {...register("stockDetails.0.stock")}
        placeholder="Stok Miktarı"
      />

      <button type="button" onClick={addImageField}>
        Resim Ekle
      </button>
      {images.map((image, index) => (
        <div key={image.id} className="image-input">
          <label>{`Resim ${image.id}`}</label>
          <input
            type="text"
            placeholder="Resim URL"
            value={image.url}
            onChange={(e) =>
              setImages(
                images.map((img) =>
                  img.id === image.id ? { ...img, url: e.target.value } : img
                )
              )
            }
          />
          <button type="button" onClick={() => removeImageField(image.id)}>
            Sil
          </button>
        </div>
      ))}

      <button type="submit">Kaydet</button>
    </form>
  );
}

export default AddProducts;
