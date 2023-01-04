import { TProduct, TPurchase, TUser } from "./types";
import { Category } from "./types";

export const users: TUser[] = [
	{
		id: "549",
		email: "user1@email.com",
        password: "1111"
	},
	{
		id: "848",
		email: "user2@email.com",
        password: "2222"
	}
]

export const products: TProduct[] = [
	{
		id: "1",
		name: "Mousepad",
        price: 29.90,
        category: Category.ACESSORIES
	},
	{
		id: "2",
		name: "Monitor HD",
        price: 544.50,
        category: Category.ELECTRONICS
	}
]

export const purchase: TPurchase[] = [
	{
		userId: "1",
		productId: "1",
        quantity: 4,
        totalPrice: 119.60
	},
	{
		userId: "2",
		productId: "2",
        quantity: 2,
        totalPrice: 149
	}
]

function createUser(id:string, email:string, password:string):void{
	const user:TUser = {id, email, password}
	users.push(user)
	console.log(`Usuário com id ${id} e email ${email}, cadastrado com sucesso.`)
}
createUser("g5345", "giovanna@email.com", "sfee546");

//Mostrar usuários

function getAllUsers():void{
	users.map((user) =>{
		console.table(user)
	})
}
getAllUsers();

function createProduct(id:string, name:string, price:number, category:Category):void{
	const product:TProduct = {id, name, price, category}
	products.push(product)
	console.log(`Produto ${name} com id ${id} criado com sucesso`)
}
createProduct("P47S", "Notebook Acer Nitro 5", 3.825, Category.ELECTRONICS);

//Mostrar Produtos

function getAllProducts():void{
	products.map((product) =>{
		console.table(product)
	})
}
getAllProducts();

//Buscar produtos por id

function getProductById(idToSearch:string):void{
	console.table(
		products.find(product => product.id === idToSearch)
	)
}
console.log("Mostrar produtos por ID")
getProductById("P47S")

//Buscar produtos por nome

export const queryProductsByName = (q : string): Array<TProduct> =>{
	return products.filter((product) =>{
		return product.name.includes(q)
	})
}
console.log("Mostrando produtos por Nome")
queryProductsByName("Meertr")

function createPurchase (userId:string, productId:string, quantity:number, totalPrice:number):void{
	const purchases:TPurchase = {userId, productId, quantity, totalPrice}
	purchase.push(purchases)
	console.log(`Usuário com id ${userId} efetuou a compra de ${productId} com sucesso`)
}
console.log("Produtos criados:")
createPurchase("JS477", "Macbook 3", 2, 2.873);

function getAllPurchasesFromUserId():void{
	purchase.map((purchases) =>{
		console.table(purchases)
	})
}
getAllPurchasesFromUserId();