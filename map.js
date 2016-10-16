$(function () {

	var mapChart;
	var data = [];
	var pmax_line=0
		
		//define initial value 100 yr period//		
		for (var code in counties) {
			var value = null,
				year,
				itemData = counties[code].data,
				i = itemData.length;
				value = itemData[0]  // 100-yr return period
					if (itemData[itemData.length - 1] > pmax_line){
					pmax_line=itemData[itemData.length - 1]
					} // finding max value for return period
				data.push({
					name: code,
					code: code,
					value: value,
				});
		}
		
	var mapData = Highcharts.geojson(NYC_CT2010);

		
		//Map
		mapChart = $('#map').highcharts('Map', {  
			chart: {
				spacingTop: 10,
				width : 400,
				height : 400
			},
			title : {
				text : 'NYC - 311 Flooding Complaints'
			},
			mapNavigation: {
				enabled: true,
				buttonOptions: {
				align: 'left',
				verticalAlign: 'top',
				}
			},
			tooltip: {
				valueSuffix: ' Complaints/Month',
				footerFormat: '<span>(<em>Shift + Click to compare counties</em>)</span>'
			},
			credits: {
				enabled: false
			},
			series : [{    	
				data : data,
				mapData: mapData,
				joinBy: ['BoroCT2010', 'code'],
				name: 'Monthly Average',
				allowPointSelect: true,
				cursor: 'pointer',
			}], 	
		colorAxis: {
                min: 0,
                minColor: '#0066ff',
                maxColor: '#001433',
                stops: [
                    [0.1, '#0066ff'],
                    [0.2, '#0052cc'],
                    [0.3, '#003d99'],
                    [0.6, '#002966'],
                    [0.9, '#001433']
                ]
            },		
		navigation: {
			buttonOptions: {
				align: 'right',
				enabled: true
			}
		}
		});
});
