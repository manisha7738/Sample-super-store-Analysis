# Superstore Sales Data Analysis

A comprehensive SQL-based analysis of Superstore sales data using Node.js and SQLite.

## Project Structure

```
├── src/
│   ├── database/
│   │   └── setup.js          # Database initialization
│   ├── queries/
│   │   ├── salesQueries.js   # Sales-related SQL queries
│   │   └── customerQueries.js # Customer-related SQL queries
│   ├── analysis/
│   │   ├── salesAnalysis.js  # Sales analysis functions
│   │   └── customerAnalysis.js # Customer analysis functions
│   ├── utils/
│   │   └── formatOutput.js   # Output formatting utilities
│   └── index.js             # Main application entry
├── superstore.db           # SQLite database (generated)
└── README.md              # Documentation
```

## Features

- Sales Analysis:
  - Monthly sales and profit trends
  - Category performance metrics
  - Top-performing products
  - Regional sales analysis

- Customer Analysis:
  - Customer segment analysis
  - Top customers by revenue
  - Purchase patterns
  - Customer retention metrics

## Setup and Installation

1. Install dependencies:
   ```bash
   npm install
   ```

2. Initialize the database:
   ```bash
   npm run setup
   ```

3. Run the analysis:
   ```bash
   npm start
   ```

## Data Requirements

The input CSV file (superstore_data.csv) should contain the following columns:
- Order_ID
- Order_Date
- Ship_Date
- Ship_Mode
- Customer_ID
- Segment
- Country
- City
- State
- Postal_Code
- Region
- Product_ID
- Category
- Sub_Category
- Product_Name
- Sales
- Quantity
- Discount
- Profit

## License

This project is licensed under the MIT License.