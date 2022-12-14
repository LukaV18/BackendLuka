const fs = require('fs');
class Contenedor {
    constructor(archivo){
        this.archivo = archivo;
    }
    async getById(id) {
        try {
            const productos = await fs.promises.readFile(this.archivo, "utf-8");
            const productosRes = await JSON.parse(productos);
            const findProducto = productosRes.find(producto => producto.id === id);
            return findProducto;
        } catch (error) {
            console.log("El producto no esta disponible")
        }
    }
    async getAll() {
        try {
        const content = await fs.promises.readFile(this.archivo, "utf-8");
        const contentJson = await JSON.parse(content);
        /* console.log(content); */
        return contentJson;
        } catch (error) {
            console.log("error al obtener los productos")
        }
    }
    async overwrite(product){
        try{
            const products = await this.getAll();
            if (products.some(el => el.id === idChange)) {
                let index = productos.findIndex(el => el.id === idChange)
                productos[index].title = newProduct.title;
                productos[index].price = newProduct.price;
                productos[index].thumbnail = newProduct.thumbnail;

                const contenidoNuevo = JSON.stringify(productos,null,2)

                await fs.promises.writeFile(this.archivo, contenidoNuevo)
                } else {
                    console.log("No hay producto con ese Id")
                }
            } catch (err){
                console.log(err);
            }
    }

    
    async save(product){
        try {
            if(fs.existsSync(this.archivo)) {
                const products = await this.getAll();
                if(products.length>0) {
                 //agregar producto adicional
                 const lastId = products.length+1;
                 product.id = lastId;
                 products.push(product);
                 await fs.promises.writeFile(this.archivo,JSON.stringify(products,null,2));
                } else{
                 // entonces primer producto
                 product.id = 1;
                 fs.promises.writeFile(this.archivo,JSON.stringify(products,null,2));
                }
            } else {
                product.id = 1;
                fs.promises.writeFile(this.archivo,JSON.stringify(products,null,2));
            }
           
        } catch (error) {
            console.log("El producto no se guardo");
        }
    }
    async deleteById(id) {
        try {
            const productos = await this.getAll();
            const deleteProducto = productos.filter(producto => producto.id !== id);
            await fs.promises.writeFile(this.filename, JSON.stringify(deleteProducto, null, 2));
        } catch (error) {
            console.log("No se pudo borrar el producto")
        }
    }
};

module.exports = Contenedor;