import { products,
     users,
     purchase } from "./database";
import express, {Request, Response} from 'express';
import cors from 'cors';
import { Category, TProduct, TPurchase, TUser } from "./types";

const app = express();

app.use(express.json());
app.use(cors());

app.listen(3003, () => {
    console.log("Servidor rodando na porta 3003")
})

app.get("/ping",(req:Request,res:Response)=>{
    res.send("Pong")
})

// Pegar Usuarios
app.get("/users", (req:Request, res:Response)=>{
    try{
        res.status(200).send(users);//res.statusCode = 400
    }catch (error:any){
        console.log(error);

        if(res.statusCode === 200){
            res.status(500)
        }
        res.send(error.message)
    }
});

// //Pegar Produtos
app.get("/products", (req:Request, res:Response)=>{
    try{
        res.status(200).send(products);//res.statusCode = 400
    }catch (error:any){
        console.log(error);

        if(res.statusCode === 200){
            res.status(500)
        }
        res.send(error.message)
    }
});

//Pegar Compras
app.get("/purchase",(req:Request,res:Response)=>{
    try{
        res.status(200).send(purchase);//res.statusCode = 400
    }catch (error:any){
        console.log(error);

        if(res.statusCode === 200){
            res.status(500)
        }
        res.send(error.message)
    }
});

//Pesquisa prod p/ nome
app.get("/products/search",(req:Request,res:Response)=>{
    let productsFilter;
    try {
    const q = req.query.q as string;
        if (q.length < 1){
            res.status(400)
            throw new Error("Query params deve possuir pelo menos um caractere.")
        }
    productsFilter = products.filter((product) => { 
        return product.name.toLowerCase().includes(q.toLowerCase());
    });
    res.status(200).send(productsFilter)
    } catch (error: any){
        console.log(error);
        
        if(res.statusCode === 200){
            res.status(500)
        }
    res.send(error.message);
    }
});

//Cadastro de novo usuário
app.post("/users",(req:Request,res:Response)=>{
    try{
        const id = req.body.id as string
        const email = req.body.email as string
        const password = req.body.password as string
    
        if (id !== undefined) {
        if (email != undefined){
        if (password != undefined){
            // validamos que é uma string
          if (typeof id !== "string") {
                throw new Error("O 'Id' deve ser uma string")
            }
          if (typeof email != "string") {
            throw new Error("O 'Email' deve ser uma string")
            }
          if (typeof password != "string") {
                throw new Error("A 'Senha' deve ser uma string")
            }
          }}
            // verificamos no array clients se já existe esse cpf cadastrado
            const idExists = users.find((user) => user.id === id)
            const emailExists = users.find((user) => user.email === email)
            const passwordExists = users.find((user) => user.password === password)
    
            if (idExists) {
                throw new Error("'Id' já cadastrado, tente novamente.") // se já existir quebramos o fluxo com erro
            }
            if (emailExists) {
                throw new Error("'Email' já cadastrado, tente novamente.") // se já existir quebramos o fluxo com erro
            }
            if (passwordExists) {
                throw new Error("'Senha' já cadastrado, tente novamente.") // se já existir quebramos o fluxo com erro
            }
        }
        const newUser:TUser = {
                    id,
                    email,
                    password
                }
            
                users.push(newUser)
            
                res.status(201).send(newUser)
                console.log("Usuário cadastrado com sucesso!")
        // continuação do código...
    } catch(error: any) {
        console.log(error) // print do erro no terminal para facilitar o debug
        res.status(400).send(error.message)
    }})

//Cadastro de novo produto
app.post("/products",(req:Request,res:Response)=>{
    try{
        const id = req.body.id as string
        const name = req.body.name as string
        const price = req.body.price as number
        const category = req.body.category as Category
    
        if (id !== undefined) {
        if (name != undefined){
        if (price != undefined){
        if(category != undefined){
            // validamos que é uma string
          if (typeof id !== "string") {
                throw new Error("O 'Id' deve ser uma string")
            }
          if (typeof name != "string") {
            throw new Error("O 'Email' deve ser uma string")
            }
          if (typeof price != "number") {
                throw new Error("A 'Senha' deve ser um número")
            }
          if (typeof category != "string") {
                throw new Error("A 'Categoria' deve ser uma string")
            }
          }}}
            // verificamos no array clients se já existe esse cpf cadastrado
            const idExists = products.find((product) => product.id === id)
            
            if (idExists) {
                throw new Error("'Id' já cadastrado, tente novamente.") // se já existir quebramos o fluxo com erro
            }
        }
            const newProduct:TProduct = {
                id,
                name,
                price,
                category,
            }
            products.push(newProduct)
        
            res.status(201).send(newProduct)
            console.log("Produto cadastrado com sucesso!")
        
        // continuação do código...
    } catch(error: any) {
        console.log(error) // print do erro no terminal para facilitar o debug
        res.status(400).send(error.message)
    }})

//Cadastro de nova Compra
app.post("/purchase",(req:Request,res:Response)=>{

    const userId = req.body.userId
    const productId = req.body.productId
    const quantity = req.body.quantity
    const totalPrice = req.body.totalPrice

    const findUser = purchase.find((purch)=> purch.userId === userId);
    if(!findUser){
        res.status(400)
        throw new Error("ID não consta na base de dados.")
    }

    const findProduct = products.find((product)=> product.id === productId);
    if(!findProduct){
        res.status(400)
        throw new Error("Produto não consta na base de dados.")
    }

    //Comparar se o preço é igual ao total recebido pelo body (o preço total não tem soma, então considerará somente o que foi passado na database como certo.)
    if(findProduct.price * quantity != totalPrice){
        res.status(400)
        throw new Error("Valor total incorreto.")
    }
    const newPurchase:TPurchase = {
        userId,
        productId,
        quantity,
        totalPrice
    }

    purchase.push(newPurchase)

    res.status(201).send(newPurchase)
    console.log("Compra realizada com sucesso!")
})

//Products by ID
app.get("/products/:id",(req:Request, res:Response)=>{
    try{
    const id = req.params.id
    const result = products.find((product)=> product.id === id);

    if(!result){
        res.status(404)
        throw new Error("ID de produto não encontrado!")
    }
        res.status(200).send(result)
    }catch (error:any){
        console.log(error);

        if(res.statusCode === 200){
            res.status(500)
        }
        res.send(error.message)
    }
});

//Purchase Users by ID
app.get("/users/:id/purchase",(req:Request, res:Response)=>{
try{
    const id = req.params.id;
    const result = purchase.find((purchases) => purchases.userId === id);

    if(!result){
        res.status(404)
        throw new Error("O ID de usuário não existe ou não possui compras!")
    }
        res.status(200).send(result)
    }catch (error:any){
        console.log(error);

        if(res.statusCode === 200){
            res.status(500)
        }
        res.send(error.message)
    console.log("Array de compras do usuário:")
    }
})

//Remove user by ID
app.delete("/users/:id", (req:Request, res:Response) =>{
try{
    const id = req.params.id
    const result = users.find((user)=> user.id === id);

    if(!result){
        res.status(404)
        throw new Error("ID de usuário não consta na base de dados!")
    }
    //Encontrar índice do item a ser removido
    const indexToRemove = users.findIndex((user) => user.id === id)
    //Deletar apenas se encontrar o item:
    if(indexToRemove >= 0){
    //Splice para editar diretamente o array users
    //Primero arg é o índice alvo
    //Segundo arg serão qnts itens serão removidos a partir do primeiro arg
    users.splice(indexToRemove,1)
    }
    res.status(200).send("Usuário removido com sucesso!")
}catch (error:any){
    console.log(error);

    if(res.statusCode === 200){
        res.status(500)
    }
    res.send(error.message)
}
});

//Remove product by ID
app.delete("/products/:id", (req:Request, res:Response) =>{
    try{
    const id = req.params.id
    const result = products.find((product)=> product.id === id);

    if(!result){
        res.status(404)
        throw new Error("ID do produto não consta na base de dados!")
    }
    //Encontrar índice do item a ser removido
    const indexToRemove = products.findIndex((product) => product.id === id)
    //Deletar apenas se encontrar o item:
    if(indexToRemove >= 0){
    //Splice para editar diretamente o array users
    //Primero arg é o índice alvo
    //Segundo arg serão qnts itens serão removidos a partir do primeiro arg
    products.splice(indexToRemove,1)
    }
    res.status(200).send("Produto removido com sucesso!")
}catch (error:any){
    console.log(error);

    if(res.statusCode === 200){
        res.status(500)
    }
    res.send(error.message)
}
});

//Remove purchase by ID
app.delete("/users/:id/purchase", (req:Request, res:Response) =>{
    try{
    const id = req.params.id
    const result = purchase.find((purch)=> purch.userId === id);

    if(result){
        res.status(404)
        throw new Error("ID da compra não consta na base de dados!")
    }
    //Encontrar índice do item a ser removido
    const indexToRemove = purchase.findIndex((purch) => purch.userId === id)
    //Deletar apenas se encontrar o item:
    if(indexToRemove >= 0){
    //Splice para editar diretamente o array users
    //Primero arg é o índice alvo
    //Segundo arg serão qnts itens serão removidos a partir do primeiro arg
    purchase.splice(indexToRemove,1)
    }
    res.status(200).send("Compra removida com sucesso!")
}catch (error:any){
    console.log(error);

    if(res.statusCode === 200){
        res.status(500)
    }
    res.send(error.message)
}
});

app.put("/users/:id", (req:Request, res:Response) =>{
    try{
        const id = req.params.id
        const result = users.filter((user)=> user.id === id);
    
        if(!result){
            res.status(404)
            throw new Error("ID de usuário não existe na base dados para edição!")
        }

    const newEmail = req.body.email as string | undefined
	const newPassword = req.body.password as string | undefined

    const user = users.find((user) => user.id === id)
    
    if(user){
    //user.email = (newEmail === undefined ? user.email === newEmail)
    //user.password = (newPassword === undefined ? user.password === newPassword)
    user.email = newEmail || user.email
    user.password = newPassword || user.password
    }
    const newUser = {
        newEmail,
        newPassword
    }
    
    res.status(200).send("Cadastro de usuário atualizado com sucesso!")
}catch (error:any){
    console.log(error);

    if(res.statusCode === 200){
        res.status(500)
    }
    res.send(error.message)
}
});


app.put("/products/:id", (req:Request, res:Response) =>{
    try{
        const id = req.params.id
        const result = products.filter((product)=> product.id === id);
    
        if(!result){
            res.status(404)
            throw new Error("ID de produto não existe na base dados para edição!")
        }

    const newName = req.body.name as string | undefined
	const newPrice = req.body.price as number | undefined
    const newCategory = req.body.category as Category | undefined

    const product = products.find((product) => product.id === id)
    
    if(product){
    //user.email = (newName === undefined ? user.email === newName)
    //user.password = (newPrice === undefined ? user.password === newPrice)
    product.name = newName || product.name
    product.price = newPrice || product.price
    product.category = newCategory || product.category
    }
    res.status(200).send("Cadastro de produto atualizado com sucesso!")
}catch (error:any){
    console.log(error);

    if(res.statusCode === 200){
        res.status(500)
    }
    res.send(error.message)
}
});



