import React, { useContext, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { FirebaseContext } from "../firebase";
import { useNavigate } from "react-router-dom";
import FileUploader from "react-firebase-file-uploader";

const NewFoodSaucer = () => {
  const { firebase } = useContext(FirebaseContext);
  const [state, setState] = useState({
    loadImg: false,
    progress: 0,
    urlImg: "",
  });
  const { urlImg } = state;
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      name: "",
      price: "",
      category: "",
      img: "",
      description: "",
    },
    onSubmit: (data) => {
      try {
        data["existence"] = true;
        data["img"] = urlImg;
        firebase.db.collection("products").add(data);
        navigate("/menu");
      } catch (error) {
        console.log(error);
      }
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .min(4, "Los Platillos deben tener al menos 4 caracteres")
        .required("El Nombre del Platillo es obligatorio"),
      price: Yup.number()
        .min(1, "Debes agregar un numero positivo")
        .required("El precio es obligatorio"),
      category: Yup.string().required("Selecciona una categoria"),
      description: Yup.string()
        .min(10, "La descripcion debe ser mas larga")
        .required("La descripcion es oblogatoria"),
    }),
  });
  const uploadStart = () => {
    setState({ ...state, progress: 0, loadImg: true });
  };
  const uploadError = (err) => {
    setState({ ...state, loadImg: false });
    console.log(err);
  };
  const uploadSuccess = async (name) => {
    const url = await firebase.storage
      .ref("products")
      .child(name)
      .getDownloadURL();
    setState({
      loadImg: false,
      progress: 100,
      urlImg: url,
    });
    console.log("URL", url);
  };
  const uploadProgress = (value) => {
    setState({
      ...state,
      progress: value,
    });
    console.log(value);
  };
  return (
    <>
      <h1 className="text-3xl font-light mb-4">Agregar Platillo</h1>
      <div className="flex justify-center mt-10">
        <div className="w-full max-w-3xl">
          <form onSubmit={formik.handleSubmit}>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="name"
              >
                Nombre
              </label>
              <input
                className="shadow appearance-none boder rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                name="name"
                id="name"
                placeholder="Nombre Platillo"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>
            {formik.touched.name && formik.errors.name ? (
              <div
                className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-5"
                role="alert"
              >
                <p className="font-bold">Hubo un error: </p>
                <p>{formik.errors.name}</p>
              </div>
            ) : null}
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="price"
              >
                Precio
              </label>
              <input
                className="shadow appearance-none boder rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="number"
                name="price"
                id="price"
                placeholder="Precio del Platillo"
                min="0"
                value={formik.values.price}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>
            {formik.touched.price && formik.errors.price ? (
              <div
                className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-5"
                role="alert"
              >
                <p className="font-bold">Hubo un error: </p>
                <p>{formik.errors.price}</p>
              </div>
            ) : null}
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="category"
              >
                Categoria
              </label>
              <select
                className="shadow appearance-none boder rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="category"
                name="category"
                value={formik.values.category}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              >
                <option value="">-- Seleccione --</option>
                <option value="desayuno">Desayuno</option>
                <option value="comida">Comida</option>
                <option value="cena">Cena</option>
                <option value="bebida">Bebidas</option>
                <option value="postre">Postre</option>
                <option value="ensalada">Ensalada</option>
              </select>
            </div>
            {formik.touched.category && formik.errors.category ? (
              <div
                className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-5"
                role="alert"
              >
                <p className="font-bold">Hubo un error: </p>
                <p>{formik.errors.category}</p>
              </div>
            ) : null}
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="img"
              >
                Imagen
              </label>
              <FileUploader
                accept="image/*"
                id="img"
                name="img"
                randomizeFilename
                storageRef={firebase.storage.ref("products")}
                onUploadStart={uploadStart}
                onUploadError={uploadError}
                onUploadSuccess={uploadSuccess}
                onProgress={uploadProgress}
              />
            </div>
            {state.loadImg && (
              <div className="h-12 relative w-full border">
                <div
                  className="bg-green-500 absolute left-0 top-0 text-white px-2 text-sm h-12 flex items-center"
                  style={{ width: `${state.progress}%` }}
                >
                  {state.progress} %
                </div>
              </div>
            )}
            {urlImg && (
              <p className="bg-green-500 text-white p-3 text-center my-5">
                La imagen se subio correctamente
              </p>
            )}
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="description"
              >
                Descripcion
              </label>
              <textarea
                className="shadow appearance-none boder rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-40"
                name="description"
                id="description"
                placeholder="Descripcion del platillo"
                value={formik.values.description}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              ></textarea>
            </div>
            {formik.touched.description && formik.errors.description ? (
              <div
                className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-5"
                role="alert"
              >
                <p className="font-bold">Hubo un error: </p>
                <p>{formik.errors.description}</p>
              </div>
            ) : null}
            <input
              type="submit"
              className="bg-gray-800 hover:bg-gray-900 w-full mt-5 p-2 text-white uppercase font-bold"
              value="Agregar Platillo"
            />
          </form>
        </div>
      </div>
    </>
  );
};

export default NewFoodSaucer;
