import { products,
     users,
     purchase } from "./database";
import express, {Request, Response} from 'express';
import cors from 'cors';
import { Category, TProduct, TPurchase, TUser } from "./types";
import { db } from './database/knex';

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
app.get("/users", async (req:Request, res:Response)=>{
    try{
        const result = await db.raw(`
                SELECT * FROM users;        
         `)
        res.status(200).send({"Array de Users do arquivo labecommerce.db": result});
    }catch (error){
        console.log(error);

        if(res.statusCode === 200){
            res.status(500)
        }
        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }
})

// //Pegar Produtos
app.get("/products", async(req:Request, res:Response)=>{
    try{
        const result = await db.raw(`
                SELECT * FROM products;        
         `)
        res.status(200).send({"Array de Produtos do arquivo labecommerce.db": result});
    }catch (error){
        console.log(error);

        if(res.statusCode === 200){
            res.status(500)
        }
        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }
})

//Pegar Compras
app.get("/purchases", async (req:Request,res:Response)=>{
    try{
        const result = await db.raw(`
                SELECT * FROM purchases;        
         `)
        res.status(200).send({"Array de Compras do arquivo labecommerce.db": result});
    }catch (error){
        console.log(error);

        if(res.statusCode === 200){
            res.status(500)
        }
        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }
})

//Pesquisa prod p/ nome
app.get("/products/search", async(req:Request, res:Response)=>{
    try {
    const q = req.query.q as string;
        if (q.length <= 1){
            res.status(400)
            throw new Error("Query params deve possuir pelo menos um caractere.")
        }
        const product = await db.raw(`
        SELECT * FROM products
        WHERE LOWER(name) LIKE("%${q}%");      
 `)
    res.status(200).send({product: product});
}catch (error){
    console.log(error);

    if(res.statusCode === 200){
        res.status(500)
    }
    if (error instanceof Error) {
        res.send(error.message)
    } else {
        res.send("Erro inesperado")
    }
}
})

//Cadastro de novo usuário
app.post("/users", async (req:Request,res:Response)=>{
    try{
        const {id, name, email, password, createdAt} = req.body
    
        if (id !== undefined) {
        if (name !== undefined) {
        if (email != undefined){
        if (password != undefined){
        
            // validamos que é uma string
          if (typeof id !== "string") {
            res.status(400)
            throw new Error("'Id' inválida, deve ser uma string");
            }
          if (typeof name !== "string") {
            res.status(400)
            throw new Error("'Name' inválida, deve ser uma string");
            }
          if (typeof email != "string") {
            res.status(400)
            throw new Error("'Email' inválido, deve ser uma string");
            }
          if (typeof password != "string") {
            res.status(400)
            throw new Error("'Password' inválida, deve ser uma string");
            }
        }}}
            // verificamos no array clients se já existe esse cpf cadastrado
            const idExists = users.find((user) => user.id === id)
            const emailExists = users.find((user) => user.email === email)
            const passwordExists = users.find((user) => user.password === password)
    
            if (idExists) {
                res.status(400)
                throw new Error("'Id' já cadastrado, tente novamente.") // se já existir quebramos o fluxo com erro
            }
            if (emailExists) {
                res.status(400)
                throw new Error("'Email' já cadastrado, tente novamente.") // se já existir quebramos o fluxo com erro
            }
            if (passwordExists) {
                res.status(400)
                throw new Error("'Senha' já cadastrado, tente novamente.") // se já existir quebramos o fluxo com erro
            }
        }
        await db.raw(`
            INSERT INTO users (id, name, email, password) 
            VALUES ("${id}","${email}","${password}", "${createdAt}");
            `)

            res.status(201).send(`Cadastro de usuário com 'Id': ${id} realizado com sucesso`)
        // continuação do código...
    } catch (error) {
        console.log(error)

        if (res.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }
})

//Cadastro de novo produto
app.post("/products", async (req:Request,res:Response)=>{
    try{
        const {id, name, price, description, imageUrl} = req.body
    
        if (id !== undefined) {
        if (name != undefined){
        if (price != undefined){
        if(description != undefined){
        if(imageUrl != undefined){
            // validamos que é uma string
          if (typeof id !== "string") {
            res.status(400)
                throw new Error("'Id' deve ser uma string")
            }
          if (typeof name != "string") {
            res.status(400)
            throw new Error("'Name' deve ser uma string")
            }
          if (typeof price != "number") {
            res.status(400)
                throw new Error("'Price' deve ser um número")
            }
          if (typeof description != "string") {
            res.status(400)
                throw new Error("'Category' deve ser uma string")
            }
          if (typeof imageUrl != "string") {
            res.status(400)
                throw new Error("'Category' deve ser uma string")
            }
          }}}}
            // verificamos no array clients se já existe esse cpf cadastrado
            const productidExists = products.find((product) => product.id === id)
            const nameExists = products.find((product) => product.name === name)
            const priceExists = products.find((product) => product.price === price)
            
            if (productidExists) {
                res.status(400)
                throw new Error("'Id' já cadastrado, tente novamente.") // se já existir quebramos o fluxo com erro
            }
            if (nameExists) {
                res.status(400)
                throw new Error("'Id' já cadastrado, tente novamente.") // se já existir quebramos o fluxo com erro
            }
            if (priceExists) {
                res.status(400)
                throw new Error("'Email' já cadastrado, tente novamente.") // se já existir quebramos o fluxo com erro
            }
        }
        await db.raw(`
        INSERT INTO products (id, name, price, description, imageUrl) 
        VALUES ("${id}","${name}","${price}","${description}", "${imageUrl}");
        `)

        res.status(201).send(`Cadastro de produto com 'Id': ${id} realizado com sucesso`)
    // continuação do código...
} catch (error) {
    console.log(error)

    if (res.statusCode === 200) {
        res.status(500)
    }

    if (error instanceof Error) {
        res.send(error.message)
    } else {
        res.send("Erro inesperado")
    }
}
})

//Cadastro de nova Compra
app.post("/purchases", async(req:Request,res:Response)=>{
try{
    const {id, buyer_id, total_price, createdAt, paid} = req.body

    
    if (id !== undefined) {
        if (buyer_id != undefined){
        if (total_price != undefined){
            // validamos que é uma string
          if (typeof id !== "string") {
            res.status(400)
                throw new Error("'Id' deve ser uma string")
            }
          if (typeof buyer_id != "string") {
            res.status(400)
            throw new Error("'buyer_id' deve ser uma string")
            }
          if (typeof total_price != "number") {
            res.status(400)
                throw new Error("'total_price' deve ser um número")
            }
        }}}
          
        await db.raw(`
        INSERT INTO purchases (id, buyer_id, total_price, createdAt, paid) 
        VALUES ("${id}","${buyer_id}","${total_price}","${createdAt}", "${paid}");
        `)

        res.status(201).send(`Cadastro de compra com 'Id': ${id} realizada com sucesso`)
    // continuação do código...
} catch (error) {
    console.log(error)

    if (res.statusCode === 200) {
        res.status(500)
    }

    if (error instanceof Error) {
        res.send(error.message)
    } else {
        res.send("Erro inesperado")
    }
}
})

//Products by ID
app.get("/products/:id", async(req:Request, res:Response)=>{
    try{
    const id = req.params.id
    const [result] = await db.raw(`
        SELECT * FROM products
        WHERE id = "${id}"
    `)

    if(!result){
        res.status(404)
        throw new Error("ID de produto não encontrado!")
    }
            res.status(200).send({"Produto encontrado": result})
    }catch (error:any){
        console.log(error);

        if(res.statusCode === 200){
            res.status(500)
        }
        res.send(error.message)
    }
});

//Purchase Users by ID
app.get("/users/:id/purchases", async(req:Request, res:Response)=>{
try{
    const id = req.params.id;
    const [result] = await db.raw(`
        SELECT * FROM purchases
        WHERE buyer_id = "${id}"
    `)
    if(!result){
        res.status(404)
        throw new Error("O ID de usuário não existe ou não possui compras!")
    }
        res.status(200).send({"Compras do usuário": result})
    } catch (error) {
        console.log(error)

        if (res.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
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



