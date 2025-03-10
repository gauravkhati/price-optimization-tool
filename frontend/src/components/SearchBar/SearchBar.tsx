import { useState, useEffect } from "react";
import { TextField, Select, MenuItem, Button, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import { TableRow } from "../Table/PriceDetailTable";
interface SearchBarProps {
    data: {
        rowData: TableRow[];
    }
}
const SearchBar: React.FC<SearchBarProps> = (props) => {
    const { data } = props;
    const attributes = Object.keys(data.rowData[0]).filter((key) => key !== 'id');
    const [search, setSearch] = useState("");
    const [sortBy, setSortBy] = useState("name");
    const [order, setOrder] = useState("asc");

    const [filterColumn, setFilterColumn] = useState("");
    const [filterValue, setFilterValue] = useState("");
    const [filterValues, setFilterValues] = useState<string[]>([]);

    // Fetch unique values for selected filter column
    useEffect(() => {
        if (filterColumn) {
            fetch(`http://localhost:8000/auth/api/product/unique-values?column=${filterColumn}`)
                .then((res) => res.json())
                .then((data) => setFilterValues(data))
                .catch((err) => console.error("Error fetching filter values:", err));
        }
    }, [filterColumn]);

    const handleFilter = async () => {
        const queryParams = new URLSearchParams({
            ...(search && { name: search }),
            ...(filterColumn && filterValue && { [filterColumn]: filterValue }),
            sort_by: sortBy,
            order: order,
        });

        const response = await fetch(`http://localhost:8000/auth/api/product/filter?${queryParams}`);
        const data = await response.json();
        console.log(data); // Handle API response
    };

    return (
        <div style={{ display: "flex", gap: "10px", alignItems: "center", background: "#121212", padding: "10px" }}>
            {/* Search Field */}
            <TextField
                variant="outlined"
                placeholder="Search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                sx={{
                    input: { color: "#B8FFC9" },
                    backgroundColor: "#1A1A1A",
                    borderRadius: "6px",
                    "& .MuiOutlinedInput-root": {
                        "& fieldset": { borderColor: "#0fdfb7" },
                        "&:hover fieldset": { borderColor: "#0bbf99" },
                        "&.Mui-focused fieldset": { borderColor: "#0fdfb7" },
                    },
                }}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <SearchIcon sx={{ color: "#0fdfb7" }} />
                        </InputAdornment>
                    ),
                }}
            />

            <Select
                value={order}
                onChange={(e) => setOrder(e.target.value)}
                displayEmpty
                renderValue={(selected) => (
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        <FilterAltIcon style={{ color: "#0fdfb7" }} />
                        {selected ? selected.toUpperCase() : "Sort By"}
                    </div>
                )}
                sx={{
                    color: "#B8FFC9",
                    backgroundColor: "#1A1A1A",
                    borderRadius: "6px",
                    "& .MuiOutlinedInput-notchedOutline": { borderColor: "#0fdfb7" },
                    "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "#0bbf99" },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: "#0fdfb7" },
                }}
            >
                <MenuItem value="" disabled>Select an Attribute</MenuItem>
                {attributes.map((attr) => (
                    <MenuItem key={attr} value={attr}>
                        {attr.charAt(0).toUpperCase() + attr.slice(1)} {/* Capitalize first letter */}
                    </MenuItem>
                ))}
            </Select>


        </div>
    );
};

export default SearchBar;
