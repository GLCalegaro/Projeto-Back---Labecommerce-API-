export enum Category {
    ACESSORIES = "Acessories",
    CLOTHES_AND_SHOES = "Roupas e calçados",
    ELECTRONICS = "Notebooks"
    }

export type TUser = {
    id: string,
    email: string,
    password: string,
  }

export type TProduct = {
    id: string,
    name: string,
    price: number,
    category: Category,
}

export type TPurchase = {
    userId: string,
    productId: string,
    quantity: number,
    totalPrice: number,
}