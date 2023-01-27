export enum Category {
    ACESSORIES = "Acessories",
    CLOTHES_AND_SHOES = "Roupas e calçados",
    ELECTRONICS = "Computadores"
    }

export type TUser = {
    id: string,
    name: string,
    email: string,
    password: string
  }

  export type TUserDB = {
    id: string,
    name: string,
    email: string,
    password: string,
    createdAt: string
  }

export type TProduct = {
    id: string,
    name: string,
    price: number,
    description: string,
    imageUrl: string
}

export type TPurchaseDB = {
    id: string,
	total_price: number,
	paid: number,
    delivered_at: string,
	buyer_id: string,
	createdAt: string,
}

export type TProductsInPurchase = {
    id:string
    buyer_id: string
    total_price: number
    paid:number
    products:TProduct[]
}

export type TPurchasesProductsDB = {
    purchase_id: string, 
    product_id: string,
    quantity:number,
}

export type TProductQuantity = {
    id: string,
    name: string,
    price: number,
    description: string,
    imageUrl: string,
    quantity: number
}

export type TPurchANDProd = {
    purchaseId: string,
    buyerId: string,
    buyerName: string,
    buyerEmail: string,
    totalPrice: number,
    createdAt: string,
    paid: number,
    products:TProductQuantity[]
}