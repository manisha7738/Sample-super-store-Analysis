import { getDatabase } from '../database/db.js';
import { customerQueries } from '../queries/customerQueries.js';
import { formatTable } from '../utils/formatOutput.js';

export async function analyzeCustomers() {
  console.log('\n=== Customer Analysis ===\n');
  
  const db = await getDatabase();

  // Customer Segments Analysis
  const segments = db.exec(customerQueries.customerSegments.text)[0].values.map(row => ({
    segment: row[0],
    customer_count: row[1],
    total_sales: row[2],
    avg_order_value: row[3],
    avg_discount: row[4]
  }));
  console.log('Customer Segments:');
  formatTable(segments);

  // Top Customers
  const topCustomers = db.exec(customerQueries.topCustomers.text)[0].values.map(row => ({
    customer_id: row[0],
    order_count: row[1],
    total_spent: row[2],
    avg_order_value: row[3],
    total_profit: row[4]
  }));
  console.log('\nTop 10 Customers:');
  formatTable(topCustomers);

  // Customer Retention Analysis
  const retention = db.exec(customerQueries.customerRetention.text)[0].values.map(row => ({
    customer_type: row[0],
    customer_count: row[1],
    avg_lifetime_days: row[2]
  }));
  console.log('\nCustomer Retention Analysis:');
  formatTable(retention);
}