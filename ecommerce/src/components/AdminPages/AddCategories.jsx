import React from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { useDispatch } from "react-redux";
import { saveCategory } from "../../store/actions";

function AddCategories() {
  const dispatch = useDispatch();
  const { register, handleSubmit, control, reset } = useForm({
    defaultValues: {
      name: "",
      subCategories: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "subCategories",
  });

  const onSubmit = (data) => {
    const { name, subCategories } = data;

    const formattedData = {
      name: name,
      subCategories: subCategories.map((subCategory) => ({
        name: subCategory.name,
      })),
    };

    console.log("Ana Kategori:", formattedData);

    dispatch(saveCategory(formattedData));

    reset(); // Formu sıfırla
  };

  const handleAddCategory = () => {
    append({ name: `` });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
      <p>Ana Kategori:</p>
      <input type="text" name="name" {...register("name")} id="name" />

      <button type="button" onClick={handleAddCategory}>
        Alt kategori ekle
      </button>

      {fields.map((item, index) => (
        <div key={item.id} className="mt-2 flex flex-col">
          <p>Alt Kategori {index + 1}</p>
          <input
            type="text"
            name={`subCategory-${index}`}
            {...register(`subCategories.${index}.name`)}
          />

          <button type="button" onClick={() => remove(index)} className="mt-2">
            Sil
          </button>
        </div>
      ))}

      <button type="submit">Kaydet</button>
    </form>
  );
}

export default AddCategories;
