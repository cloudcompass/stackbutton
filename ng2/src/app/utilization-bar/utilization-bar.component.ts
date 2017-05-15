import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';
import * as c3 from 'c3';

@Component({
  selector: 'app-utilization-bar',
  templateUrl: './utilization-bar.component.html',
  styleUrls: ['./utilization-bar.component.css']
})
export class UtilizationBarComponent implements OnInit {
  used: number;
constructor() {

}

  ngOnInit() {
    document.body.style.backgroundColor = '#f5f5f5';
    this.used = 95;
    // render all chart types/blocks
    this.renderChart2();
    this.renderChart3();
    this.renderChart5();

    // run matchHeight jquery plugin
    this.matchHeight();
  }

  renderChart2() {
    const donutChartConfig = (<any>jQuery()).c3ChartDefaults().getDefaultDonutConfig('A');
    donutChartConfig.bindto = '#chart-pf-donut-1';
    donutChartConfig.data = {
      type: 'donut',
      columns: [
        ['Used', this.used],
        ['Available', 5]
      ],
      groups: [
        ['used', 'available']
      ],
      order: null
    };
    donutChartConfig.color = {
      pattern: ['#cc0000', '#D1D1D1']
    };
    donutChartConfig.tooltip = {
      contents: function (d) {
        return '<span className="donut-tooltip-pf" style="white-space: nowrap;">' +
          Math.round(d[0].ratio * 100) + '%' + ' MHz ' + d[0].name +
          '</span>';
      }
    };
    const chart1 = c3.generate(donutChartConfig);

    const donutChartTitle = d3.select('#chart-pf-donut-1').select('text.c3-chart-arcs-title');
    donutChartTitle.text('');
    donutChartTitle.insert('tspan').text('950').classed('donut-title-big-pf', true).attr('dy', 0).attr('x', 0);
    donutChartTitle.insert('tspan').text('MHz Used').classed('donut-title-small-pf', true).attr('dy', 20).attr('x', 0);

    const sparklineChartConfig = (<any>jQuery()).c3ChartDefaults().getDefaultSparklineConfig();
    sparklineChartConfig.bindto = '#chart-pf-sparkline-1';
    sparklineChartConfig.data = {
      columns: [
        ['%', 10, 50, 28, 20, 31, 27, 60, 36, 52, 55, 62, 68, 69, 88, 74, 88, 95],
      ],
      type: 'area'
    };
    const chart2 = c3.generate(sparklineChartConfig);
  }

  renderChart3() {
    const donutChartConfig = (<any>jQuery()).c3ChartDefaults().getDefaultDonutConfig('A');
    donutChartConfig.bindto = '#chart-pf-donut-2';
    donutChartConfig.data = {
      type: 'donut',
      columns: [
        ['Used', 41],
        ['Available', 59]
      ],
      groups: [
        ['used', 'available']
      ],
      order: null
    };
    donutChartConfig.color = {
      pattern: ['#3f9c35', '#D1D1D1']
    };
    donutChartConfig.tooltip = {
      contents: function (d) {
        return '<span className="donut-tooltip-pf" style="white-space: nowrap;">' +
          Math.round(d[0].ratio * 100) + '%' + ' GB ' + d[0].name +
          '</span>';
      }
    };
    const chart3 = c3.generate(donutChartConfig);

    const donutChartTitle = d3.select('#chart-pf-donut-2').select('text.c3-chart-arcs-title');
    donutChartTitle.text('');
    donutChartTitle.insert('tspan').text('176').classed('donut-title-big-pf', true).attr('dy', 0).attr('x', 0);
    donutChartTitle.insert('tspan').text('GB Used').classed('donut-title-small-pf', true).attr('dy', 20).attr('x', 0);

    const sparklineChartConfig = (<any>jQuery()).c3ChartDefaults().getDefaultSparklineConfig();
    sparklineChartConfig.bindto = '#chart-pf-sparkline-2';
    sparklineChartConfig.data = {
      columns: [
        ['%', 35, 36, 20, 30, 31, 22, 44, 36, 40, 41, 55, 52, 48, 48, 50, 40, 41],
      ],
      type: 'area'
    };
    const chart4 = c3.generate(sparklineChartConfig);
  }

  renderChart5() {
    const donutChartConfig = (<any>jQuery()).c3ChartDefaults().getDefaultDonutConfig('A');
    donutChartConfig.bindto = '#chart-pf-donut-3';
    donutChartConfig.data = {
      type: 'donut',
      columns: [
        ['Used', 85],
        ['Available', 15]
      ],
      groups: [
        ['used', 'available']
      ],
      order: null
    };
    donutChartConfig.color = {
      pattern: ['#EC7A08', '#D1D1D1']
    };
    donutChartConfig.tooltip = {
      contents: function (d) {
        return '<span className="donut-tooltip-pf" style="white-space: nowrap;">' +
          Math.round(d[0].ratio * 100) + '%' + ' Gbps ' + d[0].name +
          '</span>';
      }
    };
    const chart5 = c3.generate(donutChartConfig);

    const donutChartTitle = d3.select('#chart-pf-donut-3').select('text.c3-chart-arcs-title');
    donutChartTitle.text('');
    donutChartTitle.insert('tspan').text('1100').classed('donut-title-big-pf', true).attr('dy', 0).attr('x', 0);
    donutChartTitle.insert('tspan').text('Gbps Used').classed('donut-title-small-pf', true).attr('dy', 20).attr('x', 0);

    const sparklineChartConfig = (<any>jQuery()).c3ChartDefaults().getDefaultSparklineConfig();
    sparklineChartConfig.bindto = '#chart-pf-sparkline-3';
    sparklineChartConfig.data = {
      columns: [
        ['%', 60, 55, 70, 44, 31, 67, 54, 46, 58, 75, 62, 68, 69, 88, 74, 88, 85],
      ],
      type: 'area'
    };
    const chart6 = c3.generate(sparklineChartConfig);
  }


  matchHeight() {
    // matchHeight the contents of each .card-pf and then the .card-pf itself
    (<any>$('.row-cards-pf > [class*=\'col\'] > .card-pf .card-pf-title')).matchHeight();
    (<any>$('.row-cards-pf > [class*=\'col\'] > .card-pf > .card-pf-body')).matchHeight();
    (<any>$('.row-cards-pf > [class*=\'col\'] > .card-pf > .card-pf-footer')).matchHeight();
    (<any>$('.row-cards-pf > [class*=\'col\'] > .card-pf')).matchHeight();
  }

}
