def calculate_demand_forecast(available_stock: int, units_sold: int) -> int:
    """ Calculate demand forecast using stock & past sales data """
    if units_sold == 0:
        return round(available_stock * 0.5)  # Assume 50% demand if no sales data
    return (units_sold / available_stock) * 100  # Percentage of stock sold



def calculate_optimized_price(cost_price: float, selling_price: float, demand_forecast: float) -> float:
    """ Calculate optimized price based on cost, selling price & demand """
    demand_factor = demand_forecast / 100  # Convert percentage to fraction

    # Adjust price: Higher demand → Higher price, Low demand → Lower price
    optimized_price = selling_price * (1 + (demand_factor * 0.2))  

    # Ensure it's not below cost price
    return max(optimized_price, cost_price * 1.1) # 10% profit margin minimum