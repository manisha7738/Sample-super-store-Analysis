import * as math from 'mathjs';
import { RandomForestClassifier } from 'ml-random-forest';

export function calculateHRMetrics(df) {
  const attritionRate = (df['Attrition'].sum() / df.length) * 100;
  const avgSatisfaction = math.mean(df['JobSatisfaction']);
  const avgYearsCompany = math.mean(df['YearsAtCompany']);
  const avgMonthlyIncome = math.mean(df['MonthlyIncome']);

  return {
    attrition_rate: attritionRate,
    avg_satisfaction: avgSatisfaction,
    avg_years_company: avgYearsCompany,
    avg_monthly_income: avgMonthlyIncome
  };
}

export function departmentAnalysis(df) {
  const departments = [...new Set(df['Department'])];
  return departments.map(dept => {
    const deptData = df.filter(row => row.Department === dept);
    return {
      Department: dept,
      Attrition: math.mean(deptData['Attrition']),
      JobSatisfaction: math.mean(deptData['JobSatisfaction']),
      MonthlyIncome: math.mean(deptData['MonthlyIncome']),
      YearsAtCompany: math.mean(deptData['YearsAtCompany'])
    };
  });
}

export class AttritionPredictor {
  constructor() {
    this.model = new RandomForestClassifier({
      nEstimators: 100,
      maxDepth: 10,
      seed: 42
    });
  }

  train(X, y) {
    const trainSize = Math.floor(X.length * 0.8);
    const X_train = X.slice(0, trainSize);
    const X_test = X.slice(trainSize);
    const y_train = y.slice(0, trainSize);
    const y_test = y.slice(trainSize);

    this.model.train(X_train, y_train);
    const y_pred = this.model.predict(X_test);

    return {
      accuracy: this.calculateAccuracy(y_test, y_pred),
      confusion_matrix: this.calculateConfusionMatrix(y_test, y_pred)
    };
  }

  calculateAccuracy(actual, predicted) {
    const correct = actual.filter((val, idx) => val === predicted[idx]).length;
    return correct / actual.length;
  }

  calculateConfusionMatrix(actual, predicted) {
    const matrix = [[0, 0], [0, 0]];
    actual.forEach((val, idx) => {
      matrix[val][predicted[idx]]++;
    });
    return matrix;
  }
}