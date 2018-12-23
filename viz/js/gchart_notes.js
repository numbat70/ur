//auto refresh mk
var sec = 1000; // 1sec
var min = sec * 60 // 1min

setTimeout(function(){
   window.location.reload(1);
}, min);


//
// get data from public Google Sheet
//


// Be sure to "Publish to the Web" so your sheet is available!


$(function() {
  
    // var googleSheetKey = '1VHVgpx5ofYKb5RbmZSOrZZixVwdrtm_VK79isKc4huA';
    //   this is the demo -- one var googleSheetKey = '1yMBe42j77K5cExEcS0wYeUdoWiKhh7gddMjJifJndCs';
    var googleSheetKey = '1v_pziJIWqXI_QSELvipoETi4rfIZ_a5XEZT7q9X1cRg';
  
    // JSONP
    // var url = 'https://spreadsheets.google.com/feeds/list/' + googleSheetKey + '/od6/public/values?alt=json-in-script';
    // $.ajax({
    //   url: url,
    //   dataType: 'jsonp',
    //   success: function(data) {
    //     doStuff(data);
    //   }
    // });
  
    // JSON
    var url = 'https://spreadsheets.google.com/feeds/list/' + googleSheetKey + '/od6/public/values?alt=json';
    $.ajax({
      url: url,
      dataType: 'json',
      success: function(data) {
        doStuff(data);
      }
    });
  
  });


//
// do stuff
//
function doStuff(data) {
  if (data) {
    // console.log('data', data);
    
    var feed = data.feed;
    var rows = feed.entry || [];
    var html = [];

    for (var i = 0; i < rows.length; ++i) {
      var row = rows[i];
      
      // if first row, create <thead>
      if (i === 0) {
        html.push('<thead>', '<tr>');
        for (var prop in row) {
          if (prop.substring(0,4) === 'gsx$') { // sheet data cell
            html.push('<th>', prop.substring(4), '</th>');
          }
        }
        html.push('</tr>', '</thead>');
      }
      
      // populate table body
      html.push('<tbody>', '<tr>');
      for (var prop in row) {
        if (prop.substring(0,4) === 'gsx$' && row[prop].$t !== 'undefined') { // sheet data cell
          html.push('<td>', row[prop].$t, '</td>');
        }
      }
      html.push('</tr>', '</tbody>');
    }
    
    // update table with generated html
    document.getElementById('sheet').innerHTML = html.join('');
  }
}
