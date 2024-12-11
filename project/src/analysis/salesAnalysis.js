import { getDatabase } from '../database/db.js';
import { salesQueries } from '../queries/salesQueries.js';
import { formatTable } from '../utils/formatOutput.js';

export async function analyzeSales() {
  console.log('\n=== Sales Analysis ===\n');
  
  const db = await getDatabase();

  // Monthly Sales Analysis
  const monthlySales = db.exec(salesQueries.monthlySales.text)[0].values.map(row => ({
    month: row[0],
    total_sales: row[1],
    total_profit: row[2],
    order_count: row[3]
  }));
  console.log('Monthly Sales Performance:');
  formatTable(monthlySales);

  // Category Performance
  const categoryPerf = db.exec(salesQueries.categoryPerformance.text)[0].values.map(row => ({
    category: row[0],
    total_sales: row[1],
    total_profit: row[2],
    total_orders: row[3],
    avg_discount: row[4]
  }));
  console.log('\nCategory Performance:');
  formatTable(categoryPerf);

  // Top Products
  const topProducts = db.exec(salesQueries.topProducts.text)[0].values.map(row => ({
    product_name: row[0],
    total_sales: row[1],
    units_sold: row[2],
    avg_profit: row[3],
    order_count: row[4]
  }));
  console.log('\nTop 10 Products by Sales:');
  formatTable(topProducts);

  // Regional Analysis
  const regionalAnalysis = db.exec(salesQueries.regionalAnalysis.text)[0].values.map(row => ({
    region: row[0],
    total_sales: row[1],
    customer_count: row[2],
    avg_discount: row[3],
    total_profit: row[4]
  }));
  console.log('\nRegional Performance:');
  formatTable(regionalAnalysis);
}