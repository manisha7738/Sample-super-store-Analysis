import { SQL } from 'sql-template-strings';

export const salesQueries = {
  monthlySales: SQL`
    SELECT 
      strftime('%Y-%m', order_date) as month,
      ROUND(SUM(sales), 2) as total_sales,
      ROUND(SUM(profit), 2) as total_profit,
      COUNT(DISTINCT order_id) as order_count
    FROM orders
    GROUP BY month
    ORDER BY month
  `,
  
  categoryPerformance: SQL`
    SELECT 
      category,
      ROUND(SUM(sales), 2) as total_sales,
      ROUND(SUM(profit), 2) as total_profit,
      COUNT(DISTINCT order_id) as total_orders,
      ROUND(AVG(discount), 2) as avg_discount
    FROM orders
    GROUP BY category
    ORDER BY total_sales DESC
  `,
  
  topProducts: SQL`
    SELECT 
      product_name,
      ROUND(SUM(sales), 2) as total_sales,
      SUM(quantity) as units_sold,
      ROUND(AVG(profit), 2) as avg_profit,
      COUNT(DISTINCT order_id) as order_count
    FROM orders
    GROUP BY product_name
    ORDER BY total_sales DESC
    LIMIT 10
  `,
  
  regionalAnalysis: SQL`
    SELECT 
      region,
      ROUND(SUM(sales), 2) as total_sales,
      COUNT(DISTINCT customer_id) as customer_count,
      ROUND(AVG(discount), 2) as avg_discount,
      ROUND(SUM(profit), 2) as total_profit
    FROM orders
    GROUP BY region
    ORDER BY total_sales DESC
  `
};