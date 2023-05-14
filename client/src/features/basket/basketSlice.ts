import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Basket } from "../../app/models/basket";
import agent from "../../app/api/agent";

interface BasketState {
    basket: Basket | null;
    status: string;
}

const initialState: BasketState = {
    basket: null,
    status: "idle",
};

// redux methods to change state in front end and handling data with API through agent.ts functions

export const addBasketItemAsync = createAsyncThunk<
    Basket,
    { productId: number; quantity?: number }
>("basket/addBasketItemAsync", async ({ productId, quantity = 1 }) => {
    try {
        return await agent.Basket.addItem(productId, quantity);
    } catch (error) {
        console.log(error);
    }
});

export const removeBasketItemAsync = createAsyncThunk<
    void,
    { productId: number; quantity: number; name?: string }
>("basket/removeBasketAsync", async ({ productId, quantity }) => {
    try {
        await agent.Basket.removeItem(productId, quantity);
    } catch (error) {
        console.log(error);
    }
});

export const basketSlice = createSlice({
    name: "basket",
    initialState: initialState,
    reducers: {
        setBasket: (state, action) => {
            state.basket = action.payload;
        },
    },
    extraReducers: (builder) => {
        //handling state changes and state to show loading
        builder.addCase(addBasketItemAsync.pending, (state, action) => {
            console.log(action);
            state.status = "pendingAddItem" + action.meta.arg.productId;
        });
        builder.addCase(addBasketItemAsync.fulfilled, (state, action) => {
            state.basket = action.payload;
            state.status = "idle";
        });
        builder.addCase(addBasketItemAsync.rejected, (state) => {
            state.status = "idle";
        });

        builder.addCase(removeBasketItemAsync.pending, (state, action) => {
            state.status =
                "pendingRemoveItem" +
                action.meta.arg.productId +
                action.meta.arg.name;
        });

        builder.addCase(removeBasketItemAsync.fulfilled, (state, action) => {
            state.status = "idle";

            // logic to see if an item with productId is in the basket and decrease/remove item quantity
            const { productId, quantity } = action.meta.arg;
            const itemIndex = state.basket?.items.findIndex(
                (i) => i.productId === productId
            );

            if (itemIndex === -1 || itemIndex === undefined) return;

            // quantity = 1 in fucntion declaration above (removeBasketItemAsync)
            state.basket!.items[itemIndex].quantity -= quantity;

            if (state.basket?.items[itemIndex].quantity === 0) {
                state.basket.items.splice(itemIndex, 1);
            }
            state.status = "idle";
        });

        builder.addCase(removeBasketItemAsync.rejected, (state, action) => {
            state.status = "idle";
        });
    },
});

export const { setBasket } = basketSlice.actions;
