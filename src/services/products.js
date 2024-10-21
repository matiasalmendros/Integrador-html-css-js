import Swal from "sweetalert2"
import {productoActivo } from "../../main"
import { handleGetProductLocalStorage, setInLocalStorage } from "../persistence/localStorage"
import { closeModal } from "../views/modal"
import { handleGetProductToStore, handleRenderList } from "../views/store"

const acceptButton = document.getElementById("acceptButton")
acceptButton.addEventListener('click', () => {
    handleSaveModifyElements()
})

const handleSaveModifyElements = () => {
    const nombre = document.getElementById("nombre").value,
        imagen = document.getElementById("img").value,
        precio = document.getElementById("precio"). value,
        categoria = document.getElementById("categoria").value;
    let object = null

    if (productoActivo) {
        object = {
            ...productoActivo, nombre, imagen, precio, categoria
        }
    } else {
        object = {
            id: new Date().toISOString(), nombre, imagen, precio, categoria
        }
    }

    Swal.fire({
        title: "Excelente!",
        text: "Producto guardado con éxito!",
        icon: "success"
      });

    setInLocalStorage(object)
    handleGetProductToStore()
    closeModal()
}

export const handleDeleteProduct=()=>{
    Swal.fire({
        title: "Estas seguro?",
        text: "No podrás revertirlo!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        cancelButtonText:"Cancelar",
        confirmButtonText: "Si, elimínalo!"
      }).then((result) => {
        if (result.isConfirmed) {
            const products = handleGetProductLocalStorage()
            const result = products.filter((e)=>e.id !== productoActivo.id)
            //setear el nuevo array
            localStorage.setItem("products", JSON.stringify(result))
            const newProducts = handleGetProductLocalStorage()
            handleRenderList(newProducts)
            closeModal()
          Swal.fire({
            title: "Eliminado!",
            text: "El producto fue eliminado.",
            icon: "success"
          });
        } else{
            closeModal()
        }
      });
    
}
