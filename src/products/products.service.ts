import { Injectable,NotFoundException } from "@nestjs/common";
import {Product} from   './product.model'

@Injectable()
export class ProductService{
    products: Product[] = []

    insertProduct(title: string, desc:string,price: number){
        const prodId=Math.random().toString()
        const newProduct = new Product( prodId, title, desc, price)
        this.products.push(newProduct)
        return prodId
    }
    showProduct(){
        return this.products
    }
    getSingleProduct(productId:string){
        const product = this.findProduct(productId)[0]
        return {...product}
    }
    updateProduct(productId:string,title:string,desc:string, price:number){
        const [product,index] = this.findProduct(productId)
        const updateProduct={...product};
        if(title){
            updateProduct.title=title
        }
        if(desc){
            updateProduct.title=title
        }if(price){
            updateProduct.price=price
        }
        this.products[index]=updateProduct
    }

    private findProduct (id:string):[Product,number]{
        const productIndex= this.products.findIndex(prod=> prod.id===id)
        const product= this.products[productIndex]
        if(!product){
            throw new NotFoundException('could not find Product')
        } 
        return [product, productIndex]
    }
}