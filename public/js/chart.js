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
        [{v:new Date(2014, 3, 16, 0, 30), f: 'preparing for friends bday party - much excite!'}, 1, 1, 0, 1, 0],
        [{v:new Date(2014, 7, 15, 0, 30), f: 'talked with my urop mentor today, it was a good conversation I feel a lot better about moving forward now'}, 1, 0, 0, 1, 1],
        [{v:new Date(2014, 10, 15, 0, 30), f: 'I am pretty sure I bombed this test :('}, 0, 0, 1, 1, 1],
        [{v:new Date(2014, 12, 15, 0, 30), f: 'turns out I did not do so bad on the test yay'}, 1, 0, 0, 1, 0],
        [{v:new Date(2015, 1, 16, 0, 30), f: 'Studying with friends, life is great'}, 1, 1, 0, 0, 0],
        [{v:new Date(2015, 2, 16, 0, 30), f: 'yay boba tea wednesday!! come join me!!'}, 1, 1, 0, 0, 0],
        [{v:new Date(2015, 3, 16, 0, 30), f: 'merp test coming up'}, 0, 0, 1, 1, 1],
      ]);

      var options = {
        title: 'Your Emotions Over Time',
        isStacked: 'percent',
        height: 280,
        width: 1180,
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