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

//Requisição GET sem query - Pegar Usuarios
app.get("/users",(req:Request,res:Response)=>{
    res.status(200).send(users)
    res.send("users")
})

//Requisição GET sem query - Pegar Produtos
app.get("/products",(req:Request,res:Response)=>{
    res.status(200).send(products)
})

app.get("/purchase",(req:Request,res:Response)=>{
    res.status(200).send(purchase)
})

//Requisição GET com query - Pesquisa prod p/ nome
app.get("/products/search",(req:Request,res:Response)=>{
    const q = req.query.q as string

    const productsFilter = products.filter(
        (product)=>product.name.toLowerCase().includes(q.toLowerCase())
    )
    res.status(200).send(productsFilter)
})

//Cadastro de novo usuário
app.post("/users",(req:Request,res:Response)=>{

    const id = req.body.id as string
    const email = req.body.email as string
    const password = req.body.password as string

    const newUser:TUser = {
        id,
        email,
        password
    }

    users.push(newUser)

    res.status(201).send("Usuário 5")
    console.log("Usuário cadastrado com sucesso!")
})

//Cadastro de novo produto
app.post("/products",(req:Request,res:Response)=>{

    const id = req.body.id
    const name = req.body.name 
    const price = req.body.price
    const category = req.body.category

    const newProduct:TProduct = {
        id,
        name,
        price,
        category,
    }

    products.push(newProduct)

    res.status(201).send("Case para notebook")
    console.log("Produto cadastrado com sucesso!")
})

//Cadastro de nova Compra
app.post("/purchase",(req:Request,res:Response)=>{

    const userId = req.body.userId
    const productId = req.body.productId
    const quantity = req.body.quantity
    const totalPrice = req.body.totalPrice

    const newPurchase:TPurchase = {
        userId,
        productId,
        quantity,
        totalPrice
    }

    purchase.push(newPurchase)

    res.status(201).send("18")
    console.log("Compra realizada com sucesso!")
})

//Products by ID
app.get("/products/:id",(req:Request, res:Response)=>{

    const id = req.params.id
    const result = products.find((product)=> product.id === id);
        res.status(200).send(result)
    console.log("Produto encontrado com sucesso!")
})

//Purchase Users by ID
app.get("/users/:id/purchase",(req:Request, res:Response)=>{

    const userId = req.params.id;
    const result = purchase.filter(purchases => purchases.userId === userId)
        res.status(200).send(result)
    console.log("Array de compras do usuário:")
})

app.delete("/users/:id", (req:Request, res:Response) =>{
    const id = req.params.id
    //Encontrar índice do item a ser removido
    const indexToRemove = users.findIndex((user) => user.id === id)
    //Deletar apenas se encontrar o item:
    if(indexToRemove >= 0){
    //Splice para editar diretamente o array users
    //Primero arg é o índice alvo
    //Segundo arg serão qnts itens serão removidos a partir do primeiro arg
    users.splice(indexToRemove,1)
    }
    res.status(200).send("User apagado com sucesso!")
})

app.delete("/products/:id", (req:Request, res:Response) =>{
    const id = req.params.id
    //Encontrar índice do item a ser removido
    const indexToRemove = products.findIndex((product) => product.id === id)
    //Deletar apenas se encontrar o item:
    if(indexToRemove >= 0){
    //Splice para editar diretamente o array users
    //Primero arg é o índice alvo
    //Segundo arg serão qnts itens serão removidos a partir do primeiro arg
    products.splice(indexToRemove,1)
    }
    res.status(200).send("Produto apagado com sucesso!")
})

app.delete("/purchase/:id", (req:Request, res:Response) =>{
    const userId = req.params.userId
    //Encontrar índice do item a ser removido
    const indexToRemove = purchase.findIndex((purchases) => purchases.userId === userId)
    //Deletar apenas se encontrar o item:
    if(indexToRemove >= 0){
    //Splice para editar diretamente o array users
    //Primero arg é o índice alvo
    //Segundo arg serão qnts itens serão removidos a partir do primeiro arg
    purchase.splice(indexToRemove,1)
    }
    res.status(200).send("Produto apagado com sucesso!")
})

app.put("/users/:id", (req:Request, res:Response) =>{
    const id = req.params.id

    const newEmail = req.body.email as string | undefined
	const newPassword = req.body.password as string | undefined

    const user = users.find((user) => user.id === id)
    
    if(user){
    //user.email = (newEmail === undefined ? user.email === newEmail)
    //user.password = (newPassword === undefined ? user.password === newPassword)
    user.email = newEmail || user.email
    user.password = newPassword || user.password
    }
    res.status(200).send("Cadastro atualizado com sucesso!")
})

app.put("/products/:id", (req:Request, res:Response) =>{
    const id = req.params.id

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
    res.status(200).send("Produto atualizado com sucesso!")
})