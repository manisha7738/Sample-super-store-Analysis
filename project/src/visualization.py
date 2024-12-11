import matplotlib.pyplot as plt
import seaborn as sns
import plotly.express as px
from typing import Dict
import pandas as pd

def plot_attrition_by_department(df: pd.DataFrame, output_path: str) -> None:
    """
    Plot attrition rates by department
    """
    plt.figure(figsize=(10, 6))
    dept_attrition = df.groupby('Department')['Attrition'].mean() * 100
    dept_attrition.plot(kind='bar')
    plt.title('Attrition Rate by Department')
    plt.xlabel('Department')
    plt.ylabel('Attrition Rate (%)')
    plt.tight_layout()
    plt.savefig(f'{output_path}/attrition_by_department.png')
    plt.close()

def plot_satisfaction_distribution(df: pd.DataFrame, output_path: str) -> None:
    """
    Plot distribution of job satisfaction
    """
    plt.figure(figsize=(8, 6))
    sns.histplot(data=df, x='JobSatisfaction', bins=20)
    plt.title('Distribution of Job Satisfaction')
    plt.xlabel('Job Satisfaction Level')
    plt.ylabel('Count')
    plt.savefig(f'{output_path}/satisfaction_distribution.png')
    plt.close()

def create_salary_boxplot(df: pd.DataFrame, output_path: str) -> None:
    """
    Create boxplot of salary by job role
    """
    plt.figure(figsize=(12, 6))
    sns.boxplot(data=df, x='JobRole', y='MonthlyIncome')
    plt.xticks(rotation=45)
    plt.title('Salary Distribution by Job Role')
    plt.tight_layout()
    plt.savefig(f'{output_path}/salary_by_role.png')
    plt.close()

def plot_feature_importance(importance_dict: Dict[str, float], output_path: str) -> None:
    """
    Plot feature importance for attrition prediction
    """
    plt.figure(figsize=(10, 6))
    features = pd.DataFrame({
        'Feature': importance_dict.keys(),
        'Importance': importance_dict.values()
    }).sort_values('Importance', ascending=True)
    
    plt.barh(y=features['Feature'], width=features['Importance'])
    plt.title('Feature Importance in Attrition Prediction')
    plt.xlabel('Importance Score')
    plt.tight_layout()
    plt.savefig(f'{output_path}/feature_importance.png')
    plt.close()