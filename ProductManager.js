import fs from 'fs'


class ProductManager {
    #patchFile
    #arrayProducts 
    #fileType
    #msgError

    constructor (patchFile , typeFile){
        this.#patchFile = patchFile
        this.#fileType = typeFile
        this.#arrayProducts=[]
    }

    addProduct =async (name,description,price, thubnail,code,stock)=>{
        
        this.#retrieveData()
        this.#arrayProducts.push({id:this.#generateId(),name,description,price,thubnail,code,stock}) 
        this.#saveData()
    }

    #retrieveData = async ()=> {
        let data = null
        if (fs.existsSync(this.#patchFile)) data =  JSON.parse( await fs.promises.readFile(this.#patchFile , this.#fileType))
        this.#arrayProducts = data ? data : []
    }

    #saveData = async ()=> {
        await  fs.promises.writeFile(this.#patchFile , JSON.stringify(this.#arrayProducts))
    }

    #generateId =  ()=>{
        let id = 1 ;
        if (this.#arrayProducts.lenght !=0){
            this.#arrayProducts.forEach(element => {
               id= element.id < id ? id = 1 : ++id
            });
        }
        return id
    }
}

const productManager = new ProductManager (`./productos.json` , `utf-8`)
productManager.addProduct("Play Station 2" , "Consola de juegos" , 1500,"www.google.com","1001", 5)
productManager.addProduct("Play Station 2" , "Consola de juegos" , 1500,"www.google.com","1001", 5)


