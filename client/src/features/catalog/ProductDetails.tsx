import { LoadingButton } from "@mui/lab";
import {
    Divider,
    Grid,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    TextField,
    Typography,
} from "@mui/material";
import { color } from "@mui/system";
//import { Container } from "@mui/system";
//import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import agent from "../../app/api/agent";
import { useStoreContext } from "../../app/context/StoreContext";
import NotFound from "../../app/errors/NotFound";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { Product } from "../../app/models/product";
import { currencyFormat } from "../../app/util/util";

export default function ProductDetails() {
    const { id } = useParams<{ id: string }>();

    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState<Boolean>(true);
    const [quantity, setQuantity] = useState(0);
    const [submitting, setSubmitting] = useState(false);

    const { basket, setBasket, removeItem } = useStoreContext();
    const item = basket?.items.find((i) => i.productId === product?.id);

    useEffect(() => {
        if (item) {
            setQuantity(item.quantity);
        }
        //fetch product details from api (GET) with product ID
        id &&
            agent.Catalog.details(parseInt(id))
                .then((response) => setProduct(response))
                .catch((error) => console.log(error))
                .finally(() => setLoading(false));
    }, [id, item]);

    function handleInputChange(event: any) {
        //updates the number of the quantity text field
        if (event.target.value >= 0) setQuantity(parseInt(event.target.value));
    }

    function handleUpdateBasket() {
        setSubmitting(true);
        if (!item || quantity > item.quantity) {
            const updatedQuanity = item ? quantity - item.quantity : quantity;
            //type safety removed bcus you cant access product details if it doesnt exist
            agent.Basket.addItem(product?.id!, updatedQuanity)
                .then((basket) => setBasket(basket))
                .catch((error) => console.log(error))
                .finally(() => setSubmitting(false));
        } else {
            const updatedQuanity = item.quantity - quantity;
            agent.Basket.removeItem(product?.id!, updatedQuanity)
                .then(() => removeItem(product?.id!, updatedQuanity))
                .catch((error) => console.log(error))
                .finally(() => setSubmitting(false));
        }
    }

    if (loading) return <LoadingComponent message="Loading Product..." />;
    if (!product) return <NotFound />;

    return (
        <Grid container spacing={6}>
            <Grid item xs={6}>
                <img
                    src={product.pictureUrl}
                    alt={product.name}
                    style={{ width: "100%" }}
                ></img>
            </Grid>
            <Grid item xs={6}>
                <Typography variant="h3">{product.name}</Typography>
                <Divider sx={{ mb: 2 }} />
                <Typography variant="h4" color="secondary">
                    {currencyFormat(product.price)}
                </Typography>
                <TableContainer>
                    <Table>
                        <TableBody>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell>{product.name}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Description</TableCell>
                                <TableCell>{product.description}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Type</TableCell>
                                <TableCell>{product.type}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Brand</TableCell>
                                <TableCell>{product.brand}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Quantity in stock</TableCell>
                                <TableCell>{product.quantityInStock}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <TextField
                            onChange={handleInputChange}
                            variant="outlined"
                            type={"number"}
                            label="Quantity in cart"
                            fullWidth
                            value={quantity}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <LoadingButton
                            disabled={
                                item?.quantity === quantity ||
                                !item ||
                                quantity === 0
                            }
                            loading={submitting}
                            onClick={handleUpdateBasket}
                            sx={{ height: "55px" }}
                            color="primary"
                            size="large"
                            variant="contained"
                            fullWidth
                        >
                            {item ? "Update Quantity" : "Add to cart"}
                        </LoadingButton>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
}
