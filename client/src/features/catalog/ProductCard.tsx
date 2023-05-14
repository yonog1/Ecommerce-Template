import { LoadingButton } from "@mui/lab";
import {
    Avatar,
    Button,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    CardMedia,
    Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import { Product } from "../../app/models/product";
import { currencyFormat } from "../../app/util/util";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { addBasketItemAsync } from "../basket/basketSlice";

interface Props {
    product: Product;
}

export default function ProductCard({ product }: Props) {
    const { status } = useAppSelector((state) => state.basket);
    const dispatch = useAppDispatch();

    return (
        <>
            <Card>
                <CardHeader
                    avatar={
                        <Avatar sx={{ color: "secondary.main" }}>
                            {product.name.charAt(0).toUpperCase()}
                        </Avatar>
                    }
                    title={product.name}
                    titleTypographyProps={{
                        sx: { fontWeight: "bold", color: "primary.main" },
                    }}
                ></CardHeader>
                <CardMedia
                    sx={{
                        height: 140,
                        backgroundSize: "contain",
                        backgroundColor: "primary.light",
                    }}
                    image={product.pictureUrl}
                    title={product.name}
                />
                <CardContent>
                    <Typography gutterBottom color="primary" variant="h5">
                        {currencyFormat(product.price)}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {product.brand} / {product.type}
                    </Typography>
                </CardContent>
                <CardActions>
                    <LoadingButton
                        loading={status.includes("pendingAddItem" + product.id)}
                        onClick={() =>
                            dispatch(
                                addBasketItemAsync({ productId: product.id })
                            )
                        }
                        size="small"
                    >
                        Add to cart
                    </LoadingButton>
                    <Button
                        component={Link}
                        to={`/catalog/${product.id}`}
                        size="small"
                    >
                        View
                    </Button>
                </CardActions>
            </Card>
        </>
    );
}
