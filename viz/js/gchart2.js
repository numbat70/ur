var sec = 1000; // 1sec
var min = sec * 60 // 1min

setTimeout(function(){
   window.location.reload(9);
}, min);


      google.charts.load('current', {'packages':['timeline']});
      google.charts.setOnLoadCallback(drawChart);
      function drawChart() {
        //var container = document.getElementById('timeline');
        //var chart = new google.visualization.Timeline(container);
        var data = new google.visualization.DataTable();

        data.addColumn({ type: 'string', id: 'Testing' });
        data.addColumn({ type: 'string', id: 'Name' });
        data.addColumn({ type: 'date', id: 'Start' });
        data.addColumn({ type: 'date', id: 'End' });
    //    dataTable.addRows([
      //    [ 'Brexit', 'Brexit Rnd 2',new Date(2018, 4, 30), new Date(2018, 6, 4) ],
      //    [ 'Brexit', 'Brexit Rnd 3',new Date(2018, 6, 30), new Date(2018, 8, 30) ],
      //    [ 'Holidays', 'Christmas', new Date(2018, 11, 21),  new Date(2019, 0, 4) ]]);

//Create a Query
    var query = new google.visualization.Query('https://docs.google.com/spreadsheets/d/1cf6Mv6vEtlBDLN5u0tD_PfeOIbYaD45qFSC00qxm2TA/edit?usp=sharing');
// Populate the query with some SQL
    query.setQuery('SELECT *');
// Send the query with a callback function.
    query.send(handleQueryResponse);
//Call function to handle all this stuff and hand it the query results (handleQueryResponse)


  function handleQueryResponse(response) {

  //Query Response is now called 'response'
    if (response.isError()) {
      alert('Error in query: ' + response.getMessage() + ' ' + response.getDetailedMessage());
      return;
    }
  //Create DataTable 'data' from response
    data = response.getDataTable();
//Create Timeline
    visualization = new google.visualization.Timeline(document.getElementById('timeline'));

//Set options
var options = {
        timeline: { colorByRowLabel: true },
        timeline: {legend: 'bottom'}
};
//Draw Timeline
    visualization.draw(data, options);
  }

//////////


//    var options = {
//        timeline: { colorByRowLabel: true }
//    };


}
