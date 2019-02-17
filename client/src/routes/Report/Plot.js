import React, { Component } from 'react';
import './Plot.css';

export default function Plot(data) {
  const d3 = window.d3;

  var margin = { top: 10, right: 5, bottom: 30, left: 50 };
  // var margin = { top: 30, right: 30, bottom: 50, left: 35 };
  let width = parseInt(d3.select('#chart').style('width'), 10);
  width = width - margin.left - margin.right;
  let height = 500 - margin.top - margin.bottom;

  const svg = d3
    .select('#chart')
    .append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

  // console.log(data.map(d => d.adjustedTime));

  var adjustedTimeScale = d3
    .scaleLinear()
    .domain([0, d3.max(data, d => d.adjustedTime)])
    .nice()
    .rangeRound([height, 0]);

  var numberScale = d3
    .scaleBand()
    .domain(data.map((d, i) => i + 1))
    .padding(0)
    .range([0, width]);

  var timeAxis = d3.axisLeft(adjustedTimeScale).tickSizeOuter(0);

  var numberAxis = d3.axisBottom(numberScale);
  // .ticks(data.length)
  // .tickSizeOuter(0);

  var xAxis = svg //TODO change var to let
    .append('g')
    .attr('class', 'axis')
    .attr('transform', 'translate(0,' + height + ')')
    .call(numberAxis)
    .append('text')
    .attr('class', 'label')
    .attr('x', width)
    .attr('y', -10)
    // .attr('dy', '-0.8em')
    .style('text-anchor', 'end')
    // .style('alignment-baseline', 'middle')
    .text('Question');

  var yAxis = svg
    .append('g')
    .attr('class', 'y axis')
    .call(timeAxis);

  const minHeight = 1;
  svg
    .selectAll('rect')
    .data(data)
    .enter()
    .append('rect')
    .attr('class', 'adjusted-plot selected')
    .attr('x', (d, i) => numberScale(i + 1))
    .attr('y', d => adjustedTimeScale(d.adjustedTime))
    .attr('width', numberScale.step())
    .attr('height', function(d) {
      return Math.max(
        minHeight,
        adjustedTimeScale(d.elapsedTime) - adjustedTimeScale(d.adjustedTime)

        // adjustedTimeScale(d.adjustedTime - d.elapsedTime)
        // adjustedTimeScale(d[5]) - adjustedTimeScale(d[6])
      );
      // alternatively width - adjustedTimeScale(d[6] - d[5])
    });
  // .on('click', function() {
  // 	var clicked = d3.select(this);
  // 	if (!d3.event.ctrlKey) {
  // 		svg2.selectAll('.selected').classed('selected',false);
  // 		clicked.classed('selected',true);
  // 	} else {
  // 		clicked.classed('selected',!clicked.classed('selected'));
  // 	}
  // 	d3.event.stopPropagation();
  // });
}
