var university_url='/data'

// console.log('test')
country_name_array=[]
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


        Plotly.newPlot('bar1', data1, layout);
            }); 
        };
        
// Call init funciton to populate bar graph
init()

// Poplated Dropdown Menu
d3.json(university_url).then((data) => {
    // console.log('data')
    // console.log(data)
    Object.entries(data).forEach((value)=> {
        // console.log(value)
        var country = value[0]
        // console.log(value[1]['yearly_c_o_l'])
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
    // console.log('selected country:')
    // console.log(selected_country)
    // call the data 
    d3.json('/data').then((data) => {
        // go through each element in data and see if key value matches dropdown menu value
        // console.log(data)
        // console.log(data['United States'])
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
            // console.log(country['United States']);
            // console.log(value[1]['yearly_c_o_l'])
            
            // for drop down countries, just pick the ones that have values and throw out the null values
            if (country==selected_country){
                // console.log('country')
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


                Plotly.newPlot('bar1', data1, layout);



            } 


        });
        

    });



};
