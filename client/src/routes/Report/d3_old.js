
var $summaryTable = $(
  '<table id="summary-table" class="table text-right"></table>'
);
function makeRow(label, x, y) {
  return (
    '<tr><td class="text-left">' +
    label +
    '</td><td>' +
    x +
    '</td><td>' +
    y +
    '</td></tr>'
  );
}
$summaryTable.append(
  '<thead><tr><th></th>' + '<th>Time (s)</th><th>Error %</th></tr></thead>'
);
$summaryTable.append('<tbody>');
$summaryTable.append(makeRow('mean', '', ''));
$summaryTable.append(makeRow('median', '', ''));
$summaryTable.append(makeRow('std', '', ''));
$summaryTable.append(makeRow('min', '', ''));
$summaryTable.append(makeRow('max', '', ''));
$summaryTable.append('</tbody>');

// $summaryTable.append(
$('#summary-table').append($summaryTable);

// summaryTable.append('<thead><tr><td></td><th>Time</th><th>Error</th></tr></thead>')

var margin = { top: 30, right: 30, bottom: 30, left: 35 },
  width = parseInt(d3.select('#chart-1').style('width'), 10),
  width = width - margin.left - margin.right;

var errorScale = d3
  .scaleLinear()
  .domain([
    0,
    d3.max(dataSet, function(d) {
      return d[5];
    })
  ])
  .nice()
  .range([width, 0]);

// (function() {
// 	var timeScale = d3.scaleLinear()
// 		.domain(d3.extent(dataSet, function(d) {return d[6];})).nice()
// 		.range([width, 0]);

// 	var timeLine = d3.line()
// 		.x(function(d) {return numberScale(d[0]);})
// 		.y(function(d) {return timeScale(d[6]);});

// 	var svg = d3.select('#chart-1')
// 		.append('svg')
// 		.attr('width', width + margin.left + margin.right)
// 		.attr('height', width + margin.top + margin.bottom)
// 		.append('g')
// 		.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

// 	svg.append('path')
// 		.datum(dataSet)
// 		.attr('class','line')
// 		.attr('d',timeLine);

// 	svg.selectAll('circle')
// 		.data(dataSet)
// 		.enter()
// 		.append('circle')
// 		.attr('cx', function(d) {return numberScale(d[0]);})
// 		.attr('cy', function(d) {return timeScale(d[6]);})
// 		.attr('r',4)
// 		.attr('fill','steelblue');

// 	var xAxis = d3.axisBottom(numberScale)
// 		.ticks(Math.min(dataSet.length, 10))
// 		// .tickSizeInner(-width,0,0)
// 		.tickSizeOuter(0)
// 		.tickFormat(d3.format('d'));
// 	svg.append('g')
// 			.attr('transform','translate(0,' +width+ ')')
// 			.attr('class','x axis')
// 			.call(xAxis)
// 		.append('text')
// 			.attr('class','label')
// 			.attr('x', width/2)
// 			.attr('y', 20)
// 			.style('text-anchor','middle')
// 			.style('alignment-baseline','before-edge')
// 			.text('Question No.');

// 	var timeAxis = d3.axisLeft(timeScale);
// 	svg.append('g')
// 		.attr('class','y axis')
// 		.call(timeAxis);
// })();

// function() {
var svg2 = d3
  .select('#chart-2')
  .append('svg')
  .attr('width', width + margin.left + margin.right)
  .attr('height', width + margin.top + margin.bottom)
  .append('g')
  .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

var timeScale = d3
  .scaleLinear()
  .domain(
    d3.extent(dataSet, function(d) {
      return d[6];
    })
  )
  .range([0, width]);

var numberScale = d3
  .scaleLinear()
  .domain([1, dataSet.slice(-1)[0][0]])
  .range([0, width]);

var timeAxis = d3
  .axisBottom(timeScale)
  // .tickSizeInner(-width)
  .tickSizeOuter(0);
var yAxis = d3
  .axisLeft(errorScale)
  // .tickSizeInner(-width)
  .tickSizeOuter(0);
var numberAxis = d3.axisBottom(numberScale).tickSizeOuter(0);

var xAxis = svg2
  .append('g')
  .attr('class', 'x axis')
  .attr('transform', 'translate(0,' + width + ')')
  .call(timeAxis);

var xAxisLabel = xAxis
  .append('text')
  .attr('class', 'label')
  .attr('x', width)
  .attr('y', 20)
  .style('text-anchor', 'end')
  .style('alignment-baseline', 'before-edge')
  .text('Time (s)');

svg2
  .append('g')
  .attr('class', 'y axis')
  // .attr('transform', 'translate(40,0)')
  .call(yAxis)
  .append('text')
  .attr('class', 'label')
  .attr('transform', 'rotate(-90)')
  .attr('y', -25)
  .style('text-anchor', 'end')
  .style('alignment-baseline', 'after-edge')
  .text('Error %');

// var lines = d3.line()

var time_errorLine = d3
  .line()
  .x(function(d) {
    return timeScale(d[6]);
  })
  .y(function(d) {
    return errorScale(d[5]);
  });

var number_errorLine = d3
  .line()
  .x(function(d) {
    return numberScale(d[0]);
  })
  .y(function(d) {
    return errorScale(d[5]);
  });

var lines = svg2
  .append('path')
  .datum(dataSet)
  .attr('class', 'line hidden')
  .attr('d', time_errorLine);

var questionsWanted = [];
var circles = svg2
  .selectAll('circle')
  .data(dataSet)
  .enter()
  .append('circle')
  .attr('cx', function(d) {
    return timeScale(d[6]);
  })
  .attr('cy', function(d) {
    return errorScale(d[5]);
  })
  .attr('r', 4)
  .on('click', function() {
    d3.select(this).classed('selected', !d3.select(this).classed('selected'));
    var questionNumber = d3.select(this).data()[0][0],
      index = $.inArray(questionNumber, questionsWanted);
    if (index > -1) {
      questionsWanted.splice(index, 1);
    } else {
      questionsWanted.push(questionNumber);
    }
    resultTable.draw();
  });

$('#reset').click(function() {
  $('.selected').removeClass('selected');
  questionsWanted = [];
  resultTable.draw();
});

$('#main-content').append(
  '<table id="result-table" class="compact row-border order-column hover"></table>'
);

$.fn.dataTable.ext.search.push(function(settings, data, dataIndex) {
  if (
    questionsWanted.length === 0 ||
    $.inArray(parseInt(data[0]), questionsWanted) > -1
  ) {
    return true;
  } else {
    return false;
  }
});

var resultTable = $('#result-table').DataTable({
  data: dataSet,
  // searching: false,
  // paging: false,
  columns: [
    { title: 'No.', width: '2em' },
    { title: 'Question' },
    { title: 'Answer' },
    { title: 'Key' },
    { title: 'Error' },
    { title: 'Error %' },
    { title: 'Time' }
  ],
  columnDefs: [
    { className: 'dt-right', targets: [0, 1, 2, 3, 4, 5, 6] },
    { width: '13%', targets: [2, 3, 4, 5, 6] },
    { render: $.fn.DataTable.render.number('', '.', 1, '', '%'), targets: -2 },
    { render: $.fn.DataTable.render.number('', '.', 1), targets: [-4, -3, -1] }
  ]
});

var timeout = setTimeout(function() {
  d3.select('input[value="scatter"]')
    .property('checked', true)
    .each(change);
}, 2000);

d3.selectAll('.switch').on('change', change);
function change() {
  clearTimeout(timeout);
  if (this.value === 'scatter') transitionScatter();
  else transitionLine();
}

var transitionDuration = 1000;
function transitionScatter() {
  // lines.classed('hidden', true);
  var t = d3.transition().duration(transitionDuration);
  circles
    .transition(t)
    // .delay(function(d,i) {return i*10;})
    .attr('cx', function(d) {
      return timeScale(d[6]);
    });
  lines
    .transition(t)
    // .delay(function(d,i) {return i*10;})
    .attr('d', time_errorLine);
  xAxis.transition(t).call(timeAxis);
  xAxisLabel.transition(t).text('Time (s)');
}

function transitionLine() {
  lines.classed('hidden', false);
  var t = d3.transition().duration(transitionDuration);
  circles
    .transition(t)
    // .delay(function(d,i) {return i*10;})
    .attr('cx', function(d) {
      return numberScale(d[0]);
    });
  lines
    .transition(t)
    // .delay(function(d,i) {return i*10;})
    .attr('d', number_errorLine);
  xAxis.transition(t).call(numberAxis);
  xAxisLabel.transition(t).text('Question no.');
}
