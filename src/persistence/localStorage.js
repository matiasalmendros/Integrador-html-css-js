export const handleGetProductLocalStorage = () => {
    const products = JSON.parse(localStorage.getItem("products"))
    if (products) {
        return products
    } else {
        return []
    }
}

export const setInLocalStorage = (productoIngresado) => {
    if(productoIngresado){
        let productsInLocal = handleGetProductLocalStorage()

        const existingIndex = productsInLocal.findIndex((productsLocal)=>
            productsLocal.id === productoIngresado.id)
        if (existingIndex !== -1){
            productsInLocal[existingIndex] = productoIngresado
        } else{
            productsInLocal.push(productoIngresado)
        }
        localStorage.setItem("products", JSON.stringify(productsInLocal))
    }  
}