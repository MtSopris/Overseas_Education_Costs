var university_url='/data'

console.log('test')
country_name_array=[]
var country_options=d3.select('#selDataset')

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
            //we can add the & statement to check for tuition and pvt bachelor & public bachelor
            // console.log('checking cost of living')
            // console.log(value[1]['yearly_c_o_l'])
            country_name_array.push(country)
            
        }
        // to create the bar graph -> use country_col_array, 
        
    });

    country_options
    .append("option")
    .property("value", "")
    .text("Select Country");

    country_name_array.map((country) => {
    country_options
        .append("option")
        .property("value", country)
        .text(country);
    }); 
        

});

function optionChanged(selected_country) {
    // when the dropdown menu is adjusted, it calls the optionChanged function and the value of dropdown is named selected_country
    console.log('selected country:')
    console.log(selected_country)
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
                console.log(selected_pvt_tuit)
                var selected_pub_tuit=value[1]['public_avg_tuit']['pub_bachelor']
                console.log(selected_pub_tuit)

                var trace1 = {
                    x: ['United States', selected_country],
                    y: [us_col, yearly_col],
                    name: 'Yearly cost of living',
                    type: 'bar',
                    width: [0.5, 0.5]

                };
                
                var trace2 = {
                    x: ['United States', selected_country],
                    y: [us_pub_bach_tuit, selected_pub_tuit],
                    name: 'Yearly tution, public bachelors degree',
                    type: 'bar', 
                    width: [0.5, 0.5]
                };

                var trace3 = {
                    x: ['United States', selected_country],
                    y: [us_pvt_bach_tuit, selected_pvt_tuit],
                    name: 'Yearly tution, Private bachelors degree',
                    type: 'bar',
                    width: [0.5, 0.5]

                };
                
                var data1 = [trace1, trace2];

                var data2 = [trace1, trace3];

                
                var layout = {barmode: 'stack', 
                              yaxis: {range: [0, 100000]}};


                Plotly.newPlot('bar1', data1, layout);

                Plotly.newPlot('bar2', data2, layout);

        // to do: 
        // reduce bar width
        //put next to each other
        //put selected country in center center, us far left and far right

            } 


        });
        

    });



};

//what would the plot look like if no value for the tuition? Can plotly handle it? 
//error message: if tution cost do not show up, data was not available