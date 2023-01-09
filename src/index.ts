import { products,
     users,
     purchase } from "./database";
import express, {Request, Response} from 'express';
import cors from 'cors';
import { TProduct, TPurchase, TUser } from "./types";

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