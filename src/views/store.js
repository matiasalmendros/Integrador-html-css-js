//STORE

import { setProductoActivo } from "../../main"
import { handleGetProductLocalStorage } from "../persistence/localStorage"
import { openModal } from "./modal"

export const handleGetProductToStore = () => {
    const products = handleGetProductLocalStorage()
    handleRenderList(products)
}

export const handleRenderList = (productosIngresados) => {
    const burgers = productosIngresados.filter((e) => e.categoria === "Hamburguesas")
    const papas = productosIngresados.filter((e) => e.categoria === "Papas")
    const gaseosas = productosIngresados.filter((e) => e.categoria === "Gaseosas")
    const renderProductGroup = (productos, title) => {
        if (productos.length > 0){
            const productosHTML = productos.map((producto,index)=>{
                return `
                <div id='product-${producto.categoria}-${index}' class="containerTargetItem">
                <img src="${producto.imagen}"/>
                <div>
                <h2>${producto.nombre}</h2>
                </div>
                <div>
                <p><b>Precio: </b>$ ${producto.precio}</p>
                </div>
                </div>`
            })
            return `
            <section class="sectionStore">
            <h3>${title}</h3>
            <div class="containerProductStore">
            ${productosHTML.join("")}
            </div>
            </section>
            `
        } else{
            return ""
        }
    }
    const appContainer = document.getElementById("storeContainer")
    appContainer.innerHTML = `
    ${renderProductGroup(burgers, "Hamburguesas")}
    ${renderProductGroup(papas, "Papas")}
    ${renderProductGroup(gaseosas, "Gaseosas")}
    `
    const addEvents =(productosIngresados)=>{
        if(productosIngresados){
            productosIngresados.forEach((element,index) => {
                const productContainer = document.getElementById(`product-${element.categoria}-${index}`)
                productContainer.addEventListener('click', ()=>{
                    setProductoActivo(element)
                    openModal()
                })
            });  
        }
        
    }
    addEvents(burgers)
    addEvents(papas)
    addEvents(gaseosas)
}