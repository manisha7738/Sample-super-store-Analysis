import pandas as pd
import numpy as np
from typing import Dict, List
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import classification_report, confusion_matrix

def calculate_hr_metrics(df: pd.DataFrame) -> Dict[str, float]:
    """
    Calculate key HR metrics
    """
    metrics = {
        'attrition_rate': (df['Attrition'].sum() / len(df)) * 100,
        'avg_satisfaction': df['JobSatisfaction'].mean(),
        'avg_years_company': df['YearsAtCompany'].mean(),
        'avg_monthly_income': df['MonthlyIncome'].mean()
    }
    return metrics

def department_analysis(df: pd.DataFrame) -> pd.DataFrame:
    """
    Analyze metrics by department
    """
    dept_metrics = df.groupby('Department').agg({
        'Attrition': 'mean',
        'JobSatisfaction': 'mean',
        'MonthlyIncome': 'mean',
        'YearsAtCompany': 'mean'
    }).round(2)
    
    return dept_metrics

class AttritionPredictor:
    def __init__(self, random_state: int = 42):
        self.model = RandomForestClassifier(random_state=random_state)
        
    def train(self, X: pd.DataFrame, y: pd.Series) -> Dict:
        """
        Train the attrition prediction model
        """
        X_train, X_test, y_train, y_test = train_test_split(
            X, y, test_size=0.2, random_state=42
        )
        
        self.model.fit(X_train, y_train)
        y_pred = self.model.predict(X_test)
        
        return {
            'classification_report': classification_report(y_test, y_pred, output_dict=True),
            'confusion_matrix': confusion_matrix(y_test, y_pred).tolist()
        }
    
    def get_feature_importance(self, feature_names: List[str]) -> Dict[str, float]:
        """
        Get the importance of each feature in predicting attrition
        """
        importance = self.model.feature_importances_
        return dict(zip(feature_names, importance))