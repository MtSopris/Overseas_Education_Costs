var university_url='/data'

console.log('test')
country_col_array=[]
var country_options=d3.select('#selDataset')

d3.json(university_url).then((data) => {
    // console.log('data')
    // console.log(data)
    Object.entries(data).forEach((value)=> {
        // console.log(value)
        var country = value[0]
        // console.log(value[1]['yearly_c_o_l'])
        if (value[1]['yearly_c_o_l']){
            // console.log('checking cost of living')
            // console.log(value[1]['yearly_c_o_l'])
            country_col_array.push(country)
            
        }

        
    });

country_options
  .append("option")
  .property("value", "")
  .text("Select Country");

country_col_array.map((country) => {
  country_options
    .append("option")
    .property("value", country)
    .text(country);
}); 
    
    // // access the data["names"] and save as an array
    //     var id_list=data["names"] // data.names also works

    //     var dropdownMenu=d3.select('#selDataset')
    //     // console.log(dropdownMenu);
    //     id_list.forEach(id=> dropdownMenu.append('option').attr("value", id).text(id)); 
    //  optionChanged(id_list[0])
});


// for drop down countries, just pick the ones that have values and throw out the null values