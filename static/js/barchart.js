var university_url='/data'

console.log('test')
country_name_array=[]
var inbound = []
var outbound = []
var country_options=d3.select('#selDataset')
function init() {
    // call the data
    d3.json(university_url).then((data) => {
        // Get the US object and relevant values
        var us = data['United States']
        var us_pvt_bach_tuit= us['private_avg_tuit']['pvt_bachelor']
        // console.log(`private tuition ${us_pvt_bach_tuit}`)
        var us_pub_bach_tuit= us['public_avg_tuit']['pub_bachelor']
        // console.log(`public tuition ${us_pub_bach_tuit}`)
        var us_col = us['yearly_c_o_l']
        // console.log(`cost of living ${us_col}`)
        // data for bar graph
        var trace1 = {
            x: ['United States private', 'United States public'],
            y: [us_col, us_col],
            name: 'Yearly cost of living',
            type: 'bar',
            width: [0.5, 0.5]
        };
        var trace2 = {
            x: ['United States private', 'United States public'],
            y: [us_pvt_bach_tuit, us_pub_bach_tuit],
            name: 'Yearly tution, bachelors degree',
            type: 'bar',
            width: [0.5, 0.5]
        };
        var data1 = [trace1, trace2];
        var layout = {barmode: 'stack',
                    //   yaxis: {range: [0, 100000]},
                    paper_bgcolor: 'rgba(169,206,244,1)',
                    title: 'Can I afford it?'
                    };
        var config = {responsive: true}
        Plotly.newPlot('bar1', data1, layout, config);
            });
        };
// Call init funciton to populate bar graph
init()
// Poplated Dropdown Menu
d3.json(university_url).then((data) => {
    // console.log(‘data’)
    // console.log(data)
    Object.entries(data).forEach((value)=> {
        // console.log(value)
        var country = value[0]
        // console.log(value[1][‘yearly_c_o_l’])
        // for drop down countries, just pick the ones that have values and throw out the null values
        if (value[1]['yearly_c_o_l']){
            // add these country names to an array for drop down menu
            country_name_array.push(country)
        }
    });
    // Initial value of dropdown menu
    country_options
    .append("option")
    .property("value", "")
    .text("Select Country for Comparison");
    // for each country name, append it as an option to the drop down menu
    country_name_array.map((country) => {
    country_options
        .append("option")
        .property("value", country)
        .text(country);
    });
});
function optionChanged(selected_country) {
    // when the dropdown menu is adjusted, it calls the optionChanged function and the value of dropdown is named selected_country
    // console.log(‘selected country:‘)
    // console.log(selected_country)
    // call the data
    d3.json('/data').then((data) => {
        // go through each element in data and see if key value matches dropdown menu value
        // console.log(data)
        // console.log(data[‘United States’])
        var us = data['United States']
        var us_pvt_bach_tuit= us['private_avg_tuit']['pvt_bachelor']
        // console.log(`private tuition ${us_pvt_bach_tuit}`)
        var us_pub_bach_tuit= us['public_avg_tuit']['pub_bachelor']
        // console.log(`public tuition ${us_pub_bach_tuit}`)
        var us_col = us['yearly_c_o_l']
        // console.log(`cost of living ${us_col}`)
        Object.entries(data).forEach((value)=> {
            // console.log(value)
            var country = value[0]
            // console.log(country[‘United States’]);
            // console.log(value[1][‘yearly_c_o_l’])
            // for drop down countries, just pick the ones that have values and throw out the null values
            if (country==selected_country){
                // console.log(‘country’)
                // console.log(country)
                var yearly_col=value[1]['yearly_c_o_l']
                // console.log(yearly_c_o_l)
                var selected_pvt_tuit=value[1]['private_avg_tuit']['pvt_bachelor']
                // console.log(selected_pvt_tuit)
                var selected_pub_tuit=value[1]['public_avg_tuit']['pub_bachelor']
                // console.log(selected_pub_tuit)
                // create bar chart with data
                var trace1 = {
                    x: ['United States private', `${selected_country} private`, `${selected_country} public`, 'United States public'],
                    y: [us_col, yearly_col, yearly_col, us_col],
                    name: 'Yearly cost of living',
                    type: 'bar',
                    width: [0.5, 0.5, 0.5, 0.5]
                };
                var trace2 = {
                    x: ['United States private', `${selected_country} private`, `${selected_country} public`, 'United States public'],
                    y: [us_pvt_bach_tuit, selected_pvt_tuit, selected_pub_tuit, us_pub_bach_tuit],
                    name: 'Yearly tution, bachelors degree',
                    type: 'bar',
                    width: [0.5, 0.5, 0.5, 0.5]
                };
                var data1 = [trace1, trace2];
                var layout = {barmode: 'stack',
                            //   yaxis: {range: [0, 100000]},
                            paper_bgcolor: 'rgba(169,206,244,1)',
                            title: 'Can I afford it?'
                            };
                            
                var config = {responsive: true}

                Plotly.newPlot('bar1', data1, layout, config);
                inbound_dict=value[1]['inbound']
                // console.log(Object.values(inbound_dict))
                inbound=Object.values(inbound_dict)
                dates=Object.keys(inbound_dict)
                // loop through country and get the inbound values, add to empty array
                outbound_dict=value[1]['outbound']
                // console.log(Object.values(outbound_dict))
                outbound=Object.values(outbound_dict)
                console.log('inbound: ')
                console.log(inbound.slice(0,5))
                console.log('outbound: ')
                console.log(outbound)
                console.log('complete')
                // this is the apex chart
                var options = {
                    series: [{
                    name: "Inbound students",
                    data: inbound.slice(0,5)
                    },
                    {
                    name: "Outbound students",
                    data: outbound
                    }
                ],
                    chart: {
                    height: 350,
                    type: 'line',
                    zoom: {
                    enabled: false
                    },
                },
                dataLabels: {
                    enabled: false
                },
                stroke: {
                    width: [5, 7, 5],
                    curve: 'straight',
                    dashArray: [0, 8, 5]
                },
                title: {
                    text: 'Inbound Vs Outbound Students',
                    align: 'left'
                },
                legend: {
                    tooltipHoverFormatter: function(val, opts) {
                    return val + ' - ' + opts.w.globals.series[opts.seriesIndex][opts.dataPointIndex] + ''
                    }
                },
                markers: {
                    size: 0,
                    hover: {
                    sizeOffset: 6
                    }
                },
                xaxis: {
                    categories: dates, //[‘2014’, ‘2015’, ‘2016’, ‘2017’, ‘2018’],
                },
                tooltip: {
                    y: [
                    {
                        title: {
                        formatter: function (val) {
                            return val + " (mins)"
                        }
                        }
                    },
                    {
                        title: {
                        formatter: function (val) {
                            return val + " per session"
                        }
                        }
                    },
                    {
                        title: {
                        formatter: function (val) {
                            return val;
                        }
                        }
                    }
                    ]
                },
                grid: {
                    borderColor: '#F1F1F1',
                }
                };
                //RUNS/CREATES NEW CHART
                var chart = new ApexCharts(document.querySelector("#chart"), options);
                chart.render();
                // UPDATE AND RUN NEW DATA CHART
                // Do not know how it works but it does!
                chart.updateSeries([{
                    name: "Inbound students",
                    data: inbound.slice(0,5)
                    },
                    {
                    name: "Outbound students",
                    data: outbound
                }])
            }
        });
    });
};


