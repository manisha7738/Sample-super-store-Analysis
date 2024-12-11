import * as vega from 'vega';
import * as vegaLite from 'vega-lite';
import { writeFileSync } from 'fs';

export function createAttritionChart(data, outputPath) {
  const spec = {
    $schema: 'https://vega.github.io/schema/vega-lite/v5.json',
    data: { values: data },
    mark: 'bar',
    encoding: {
      x: { field: 'Department', type: 'nominal' },
      y: { field: 'Attrition', type: 'quantitative', title: 'Attrition Rate (%)' }
    },
    title: 'Attrition Rate by Department'
  };

  const vegaSpec = vegaLite.compile(spec).spec;
  const view = new vega.View(vega.parse(vegaSpec))
    .renderer('none')
    .initialize();

  const svg = view.toSVG();
  writeFileSync(`${outputPath}/attrition_by_department.svg`, svg);
}

export function createSatisfactionChart(data, outputPath) {
  const spec = {
    $schema: 'https://vega.github.io/schema/vega-lite/v5.json',
    data: { values: data },
    mark: 'bar',
    encoding: {
      x: { field: 'JobSatisfaction', type: 'quantitative', bin: true },
      y: { aggregate: 'count' }
    },
    title: 'Distribution of Job Satisfaction'
  };

  const vegaSpec = vegaLite.compile(spec).spec;
  const view = new vega.View(vega.parse(vegaSpec))
    .renderer('none')
    .initialize();

  const svg = view.toSVG();
  writeFileSync(`${outputPath}/satisfaction_distribution.svg`, svg);
}