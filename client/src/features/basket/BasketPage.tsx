import { Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import agent from "../../app/api/agent";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { Basket } from "../../app/models/basket";

export default function <BasketPage>() {
    const [loading, setLoading] = useState(true);
    const [basket, setBasket] = useState<Basket | null>(null);

    useEffect(() => {
        agent.Basket.get()
            .then((basket) => setBasket(basket))
            .catch((error) => console.log(error))
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <LoadingComponent message="Loading basket..." />;

    if (basket == null)
        return <Typography variant="h3">Your basket is empty</Typography>;

    return (
        <div>
            <h1>Buyer Id = {basket.buyerId}</h1>
        </div>
    );
}
