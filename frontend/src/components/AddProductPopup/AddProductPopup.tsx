import {
    Dialog,
    DialogTitle,
    DialogContent,
    TextField,
    Button,
    DialogActions,
    IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import React, { useEffect, useState } from 'react'
import useAddProduct, { } from "../ControlPanel/hooks/useAddProduct";
import { Product } from "../../hooks/useGetTableData";
interface AddProductPopupProps {
    open: boolean;
    onClose: () => void;
}


const AddProductPopup: React.FC<AddProductPopupProps> = ({ open, onClose }) => {
    const { addProduct, success } = useAddProduct();
    const handleAddProductSubmit = () => {
        addProduct(formData);
        if (success) {
            console.log('success');
            onClose();
        }

    };

    const [formData, setFormData] = useState<Pick<Product, 'name' | 'category' | 'cost_price' | 'selling_price' | 'description' | 'available_stock' | 'units_sold'>>({
        name: "",
        category: "",
        cost_price: 0,
        selling_price: 0,
        description: "",
        available_stock: 0,
        units_sold: 0,
    });
    useEffect(() => {
        setFormData({
            name: "",
            category: "",
            cost_price: 0,
            selling_price: 0,
            description: "",
            available_stock: 0,
            units_sold: 0,

        })
    }, [])
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm" sx={{
            "& .MuiPaper-root": {
                backgroundColor: "#141515",
                color: "white"
            }
        }} >
            <DialogTitle sx={{ display: "flex", justifyContent: "space-between", color: '#0fdfb7' }}>
                <span>Add New Products</span>
                <IconButton onClick={onClose} size="small" sx={{
                    color: "#0fdfb7",
                    "&:hover": {
                        backgroundColor: "rgba(15, 223, 183, 0.1)",
                    },
                }}>
                    <CloseIcon />
                </IconButton>
            </DialogTitle>

            <DialogContent>
                <div style={{ display: "flex", flexDirection: "column", gap: "16px", fontSize: "15px", fontWeight: "lighter" }}>
                    <div>
                        <label >Product Name:</label>
                        <TextField
                            fullWidth
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Enter Product Name"
                            sx={{
                                input: { color: "white" }, // Text color
                                "& .MuiOutlinedInput-root": {
                                    backgroundColor: "#222323",
                                    "& fieldset": { borderColor: "white" }, // Border color
                                    "&:hover fieldset": { borderColor: "blue" }, // Hover effect
                                    "&.Mui-focused fieldset": { borderColor: "red" }, // Focus color
                                },
                            }}
                        />
                    </div>

                    <div>
                        <label>Product Category:</label>
                        <TextField
                            fullWidth
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            sx={{
                                input: { color: "white" }, // Text color
                                "& .MuiOutlinedInput-root": {
                                    backgroundColor: "#222323",
                                    "& fieldset": { borderColor: "white" }, // Border color
                                    "&:hover fieldset": { borderColor: "blue" }, // Hover effect
                                    "&.Mui-focused fieldset": { borderColor: "red" }, // Focus color
                                },
                            }}
                            placeholder="Enter Product Category"
                        />
                    </div>

                    <div style={{ display: "flex", gap: "10px" }}>
                        <div style={{ flex: 1 }}>
                            <label>Cost Price:</label>
                            <TextField
                                fullWidth
                                name="cost_price"
                                value={formData.cost_price}
                                onChange={handleChange}
                                sx={{
                                    input: { color: "white" }, // Text color
                                    "& .MuiOutlinedInput-root": {
                                        backgroundColor: "#222323",
                                        "& fieldset": { borderColor: "white" }, // Border color
                                        "&:hover fieldset": { borderColor: "blue" }, // Hover effect
                                        "&.Mui-focused fieldset": { borderColor: "red" }, // Focus color
                                    },
                                }}
                                placeholder="Enter Cost Price"
                            />
                        </div>
                        <div style={{ flex: 1 }}>
                            <label>Selling Price:</label>
                            <TextField
                                fullWidth
                                name="selling_price"
                                value={formData.selling_price}
                                onChange={handleChange}
                                sx={{
                                    input: { color: "white" }, // Text color
                                    "& .MuiOutlinedInput-root": {
                                        backgroundColor: "#222323",
                                        "& fieldset": { borderColor: "white" }, // Border color
                                        "&:hover fieldset": { borderColor: "blue" }, // Hover effect
                                        "&.Mui-focused fieldset": { borderColor: "red" }, // Focus color
                                    },
                                }}
                                placeholder="Enter Selling Price"
                            />
                        </div>
                    </div>

                    <div>
                        <label>Description:</label>
                        <TextField
                            fullWidth
                            multiline
                            rows={2}
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            sx={{
                                textarea: { color: "white" }, // Text color for multiline input
                                "& .MuiOutlinedInput-root": {
                                    backgroundColor: "#222323",
                                    "& fieldset": { borderColor: "white" }, // Border color
                                    "&:hover fieldset": { borderColor: "blue" }, // Hover effect
                                    "&.Mui-focused fieldset": { borderColor: "red" }, // Focus color
                                },
                            }}
                            placeholder="Enter Description"
                        />
                    </div>

                    <div style={{ display: "flex", gap: "10px" }}>
                        <div style={{ flex: 1 }}>
                            <label>Available Stock:</label>
                            <TextField
                                fullWidth
                                name="available_stock"
                                value={formData.available_stock}
                                onChange={handleChange}
                                sx={{
                                    input: { color: "white" }, // Text color
                                    "& .MuiOutlinedInput-root": {
                                        backgroundColor: "#222323",
                                        "& fieldset": { borderColor: "white" }, // Border color
                                        "&:hover fieldset": { borderColor: "blue" }, // Hover effect
                                        "&.Mui-focused fieldset": { borderColor: "red" }, // Focus color
                                    },
                                }}
                                placeholder="Enter Available Stock"
                            />
                        </div>
                        <div style={{ flex: 1 }}>
                            <label>Units Sold:</label>
                            <TextField
                                fullWidth
                                name="units_sold"
                                value={formData.units_sold}
                                onChange={handleChange}
                                sx={{
                                    input: { color: "white" }, // Text color
                                    "& .MuiOutlinedInput-root": {
                                        backgroundColor: "#222323",
                                        "& fieldset": { borderColor: "white" }, // Border color
                                        "&:hover fieldset": { borderColor: "blue" }, // Hover effect
                                        "&.Mui-focused fieldset": { borderColor: "red" }, // Focus color
                                    },
                                }}
                                placeholder="Enter Units Sold"
                            />
                        </div>
                    </div>
                </div>
            </DialogContent>

            <DialogActions>
                <Button onClick={onClose} variant="outlined" sx={{ color: 'white', "&:hover": { backgroundColor: "red" } }}>
                    Cancel
                </Button>
                <Button variant="contained" onClick={handleAddProductSubmit} sx={{
                    color: "#ffffff", backgroundColor: '#0fdfb7',
                    "&:hover": { backgroundColor: "#0bbf99" }
                }}>
                    Add
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default AddProductPopup
