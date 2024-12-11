import os
import json
from typing import Dict, Any
import pandas as pd

def create_output_directory() -> None:
    """
    Create output directory structure
    """
    directories = ['outputs', 'outputs/visualizations', 'outputs/reports']
    for directory in directories:
        if not os.path.exists(directory):
            os.makedirs(directory)

def save_metrics(metrics: Dict[str, Any], filepath: str) -> None:
    """
    Save metrics to a JSON file
    """
    with open(filepath, 'w') as f:
        json.dump(metrics, f, indent=4)

def export_analysis(analysis_df: pd.DataFrame, filename: str) -> None:
    """
    Export analysis results to CSV
    """
    analysis_df.to_csv(f'outputs/reports/{filename}.csv')