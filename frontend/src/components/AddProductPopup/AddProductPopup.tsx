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
import { useState } from "react";

interface AddProductPopupProps {
    open: boolean;
    onClose: () => void;
}

const AddProductPopup: React.FC<AddProductPopupProps> = ({ open, onClose }) => {
    const [formData, setFormData] = useState({
        productName: "",
        productCategory: "",
        costPrice: "",
        sellingPrice: "",
        description: "",
        availableStock: "",
        unitsSold: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle sx={{ display: "flex", justifyContent: "space-between" }}>
                <span>Add New Products</span>
                <IconButton onClick={onClose} size="small">
                    <CloseIcon />
                </IconButton>
            </DialogTitle>

            <DialogContent>
                <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                    <div>
                        <label>Product Name:</label>
                        <TextField
                            fullWidth
                            name="productName"
                            value={formData.productName}
                            onChange={handleChange}
                        />
                    </div>

                    <div>
                        <label>Product Category:</label>
                        <TextField
                            fullWidth
                            name="productCategory"
                            value={formData.productCategory}
                            onChange={handleChange}
                        />
                    </div>

                    <div style={{ display: "flex", gap: "10px" }}>
                        <div style={{ flex: 1 }}>
                            <label>Cost Price:</label>
                            <TextField
                                fullWidth
                                name="costPrice"
                                value={formData.costPrice}
                                onChange={handleChange}
                            />
                        </div>
                        <div style={{ flex: 1 }}>
                            <label>Selling Price:</label>
                            <TextField
                                fullWidth
                                name="sellingPrice"
                                value={formData.sellingPrice}
                                onChange={handleChange}
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
                        />
                    </div>

                    <div style={{ display: "flex", gap: "10px" }}>
                        <div style={{ flex: 1 }}>
                            <label>Available Stock:</label>
                            <TextField
                                fullWidth
                                name="availableStock"
                                value={formData.availableStock}
                                onChange={handleChange}
                            />
                        </div>
                        <div style={{ flex: 1 }}>
                            <label>Units Sold:</label>
                            <TextField
                                fullWidth
                                name="unitsSold"
                                value={formData.unitsSold}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                </div>
            </DialogContent>

            <DialogActions>
                <Button onClick={onClose} variant="outlined">
                    Cancel
                </Button>
                <Button variant="contained" color="success">
                    Add
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default AddProductPopup;
