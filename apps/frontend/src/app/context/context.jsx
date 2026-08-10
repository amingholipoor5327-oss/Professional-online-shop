"use client";

import { createContext, useEffect, useState } from "react";

export const Cartcontext = createContext();

export default function Cartprovider({ children }) {
const [cart, setCart] = useState([]);
const [isloaded , setIsloaded] = useState(false)

  useEffect(() => {
    try {
        const Shop = localStorage.getItem("cart");

        if (Shop && Shop !== "undefined") {
            setCart(JSON.parse(Shop));
        }
    } catch (error) {
        console.log(error);
        localStorage.removeItem("cart");
    }finally{
        setIsloaded(true);
    }
}, []);

useEffect(() => {
    if(!isloaded) return;
    localStorage.setItem("cart", JSON.stringify(cart));
}, [cart , isloaded]);


function addcart(product) {
    setCart((prev) => {
        const exist = prev.find((item) => product.id === item.id);

        if (!exist) {
            return [...prev, { ...product, count: 1 }];
        }

        return prev.map((item) =>
            item.id === product.id
                ? { ...item, count: item.count + 1 }
                : item
        );
    });
}


function updatecount(productid, newcount) {
    if(newcount <= 0 ) return; 
    setCart((prev) =>
        prev.map((item) =>
            item.id === productid
                ? { ...item, count: newcount }
                : item
        )
    );
}

function totalprice() {
    return cart.reduce(
        (sum, item) => sum + item.count * item.price,
        0
    );
}

function deletecart(product) {
    setCart((prev) =>
        prev.filter((item) => item.id !== product.id)
    );
}

function clearcart() {
    setCart([]);
}

return (
    <Cartcontext.Provider
        value={{
            cart,
            addcart,
            deletecart,
            updatecount,
            totalprice,
            clearcart,
        }}
    >
        {children}
    </Cartcontext.Provider>
);
}
 