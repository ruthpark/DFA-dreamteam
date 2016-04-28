google.charts.load('current', {packages: ['corechart', 'bar']});
google.charts.setOnLoadCallback(drawStacked);

function drawStacked() {
      var data = new google.visualization.DataTable();
      data.addColumn('datetime', 'Date');
      data.addColumn('number', 'worried');
      data.addColumn('number', 'tired');
      data.addColumn('number', 'sad');
      data.addColumn('number', 'excited');
      data.addColumn('number', 'happy');

      data.addRows([
        [{v:new Date(2014, 7, 15, 0, 30), f: 'yay boba'}, 1, 1, 1, 1, 1],
        [{v:new Date(2014, 10, 15, 0, 30), f: 'merp test'}, 1, 0, 1, 1, 0],
      ]);

      var options = {
        title: 'Your Emotions Over Time',
        isStacked: 'percent',
        height: 280,
        width: 1000,
        hAxis: {
          title: 'Date',
          format: 'MMM d'
        },
        vAxis: {
          title: 'Emotions',
          format: ''
        },
        explorer: { axis: 'horizontal'}
      };

      var chart = new google.visualization.ColumnChart(document.getElementById('chart_div'));
      chart.draw(data, options);
    }