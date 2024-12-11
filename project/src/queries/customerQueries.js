import { SQL } from 'sql-template-strings';

export const customerQueries = {
  customerSegments: SQL`
    SELECT 
      segment,
      COUNT(DISTINCT customer_id) as customer_count,
      ROUND(SUM(sales), 2) as total_sales,
      ROUND(AVG(sales), 2) as avg_order_value,
      ROUND(AVG(discount), 2) as avg_discount
    FROM orders
    GROUP BY segment
    ORDER BY total_sales DESC
  `,
  
  topCustomers: SQL`
    SELECT 
      customer_id,
      COUNT(DISTINCT order_id) as order_count,
      ROUND(SUM(sales), 2) as total_spent,
      ROUND(AVG(sales), 2) as avg_order_value,
      ROUND(SUM(profit), 2) as total_profit
    FROM orders
    GROUP BY customer_id
    ORDER BY total_spent DESC
    LIMIT 10
  `,
  
  customerRetention: SQL`
    WITH customer_orders AS (
      SELECT 
        customer_id,
        COUNT(DISTINCT strftime('%Y-%m', order_date)) as months_active,
        MIN(order_date) as first_order,
        MAX(order_date) as last_order
      FROM orders
      GROUP BY customer_id
    )
    SELECT 
      CASE 
        WHEN months_active >= 6 THEN 'Loyal'
        WHEN months_active >= 3 THEN 'Regular'
        ELSE 'New'
      END as customer_type,
      COUNT(*) as customer_count,
      ROUND(AVG(julianday(last_order) - julianday(first_order)), 2) as avg_lifetime_days
    FROM customer_orders
    GROUP BY customer_type
    ORDER BY customer_count DESC
  `
};