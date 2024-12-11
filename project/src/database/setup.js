import initSqlJs from 'sql.js';
import { createReadStream, writeFileSync, existsSync } from 'fs';
import { parse } from 'csv-parse';
import chalk from 'chalk';

async function createDatabase() {
  if (!existsSync('superstore_data.csv')) {
    throw new Error('superstore_data.csv not found. Please ensure the data file exists.');
  }

  const SQL = await initSqlJs();
  const db = new SQL.Database();

  db.run(`
    CREATE TABLE IF NOT EXISTS orders (
      order_id TEXT PRIMARY KEY,
      order_date DATE,
      ship_date DATE,
      ship_mode TEXT,
      customer_id TEXT,
      segment TEXT,
      country TEXT,
      city TEXT,
      state TEXT,
      postal_code TEXT,
      region TEXT,
      product_id TEXT,
      category TEXT,
      sub_category TEXT,
      product_name TEXT,
      sales DECIMAL(10,2),
      quantity INTEGER,
      discount DECIMAL(4,2),
      profit DECIMAL(10,2)
    )
  `);

  const stmt = db.prepare(`
    INSERT OR REPLACE INTO orders VALUES (
      $order_id, $order_date, $ship_date, $ship_mode, $customer_id,
      $segment, $country, $city, $state, $postal_code, $region,
      $product_id, $category, $sub_category, $product_name,
      $sales, $quantity, $discount, $profit
    )
  `);

  return new Promise((resolve, reject) => {
    createReadStream('superstore_data.csv')
      .pipe(parse({ columns: true, skip_empty_lines: true }))
      .on('data', (row) => {
        stmt.run({
          $order_id: row.Order_ID,
          $order_date: row.Order_Date,
          $ship_date: row.Ship_Date,
          $ship_mode: row.Ship_Mode,
          $customer_id: row.Customer_ID,
          $segment: row.Segment,
          $country: row.Country,
          $city: row.City,
          $state: row.State,
          $postal_code: row.Postal_Code,
          $region: row.Region,
          $product_id: row.Product_ID,
          $category: row.Category,
          $sub_category: row.Sub_Category,
          $product_name: row.Product_Name,
          $sales: parseFloat(row.Sales) || 0,
          $quantity: parseInt(row.Quantity) || 0,
          $discount: parseFloat(row.Discount) || 0,
          $profit: parseFloat(row.Profit) || 0
        });
      })
      .on('end', () => {
        const data = db.export();
        writeFileSync('superstore.db', Buffer.from(data));
        resolve(db);
      })
      .on('error', reject);
  });
}

export async function initializeDatabase() {
  try {
    console.log(chalk.blue('Creating database...'));
    await createDatabase();
    console.log(chalk.green('Database setup completed successfully!'));
  } catch (error) {
    console.error(chalk.red('Error during database setup:'), error);
    throw error;
  }
}

// Only run initialization if this file is executed directly
if (import.meta.url === new URL(import.meta.url).href) {
  initializeDatabase().catch(() => process.exit(1));
}