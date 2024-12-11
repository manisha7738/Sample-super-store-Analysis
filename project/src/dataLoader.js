import { createReadStream } from 'fs';
import { parse } from 'csv-parse';
import * as dfd from 'danfojs-node';

export async function loadData(filepath) {
  return new Promise((resolve, reject) => {
    const records = [];
    createReadStream(filepath)
      .pipe(parse({ columns: true }))
      .on('data', (data) => records.push(data))
      .on('end', () => {
        const df = new dfd.DataFrame(records);
        resolve(df);
      })
      .on('error', reject);
  });
}

export function preprocessData(df) {
  // Convert numeric columns
  const numericColumns = ['Age', 'YearsAtCompany', 'MonthlyIncome', 'JobSatisfaction'];
  numericColumns.forEach(col => {
    df[col] = df[col].map(val => Number(val));
  });

  // Encode categorical variables
  const categoricalColumns = ['Gender', 'Department', 'JobRole'];
  categoricalColumns.forEach(col => {
    const encoded = dfd.LabelEncoder().fit(df[col]);
    df[col] = encoded.transform(df[col]);
  });

  return df;
}