import initSqlJs from 'sql.js';
import { readFileSync, existsSync } from 'fs';
import { initializeDatabase } from './setup.js';

let db = null;

export async function getDatabase() {
  if (db) return db;
  
  try {
    if (!existsSync('superstore.db')) {
      await initializeDatabase();
    }
    
    const SQL = await initSqlJs();
    const buffer = readFileSync('superstore.db');
    db = new SQL.Database(new Uint8Array(buffer));
    return db;
  } catch (error) {
    throw new Error(`Failed to initialize database: ${error.message}`);
  }
}