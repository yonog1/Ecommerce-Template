import { useState, useEffect } from "react";
import agent from "../../app/api/agent";
import { Product } from "../../app/models/product";
import ProductList from "./ProductList";

export default function Catalog() {
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        agent.Catalog.list().then((products) => setProducts(products));
        console.log(
            agent.Catalog.list().then((products) => setProducts(products))
        );
    }, []);

    return (
        <>
            <h1>Catalog</h1>
            <ProductList products={products}></ProductList>
        </>
    );
}
