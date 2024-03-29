# Overseas_Education_Costs


Overseas_Education_Costs is a an app that allows web users to do explore study abroad costs.

This flask app serves an interactive dashboard with JavaScript that allows the user to call data from a mongo database about where in the world students study and how much it costs. 

## Visulizations

1. World Map - Displays the number of students traveling to and from the selected country

<image src='static\images\world_map.PNG' alt='world_map.PNG' style='hight:500px; width: 600px;'/>

2. Bar Chart - Displays tuition costs and cost of living for the selected country including private and public education

<image src='static\images\cost_living.PNG' alt='cost_living.PNG' style='hight:450px; width: 600px;'/>

3. Line Chart - Displays the number of students traveling to and from the US from the selected country.

<image src='static\images\year_in_out.PNG' alt='year_in_out.PNG' style='hight:400px; width: 600px;'/>



## Installing Dependencies

To install <Overseas_Education_Costs>, follow these steps:


Python
```
<pip install python>
```
Pymongo
```
<pip install pymongo>
```
Flask
```
<pip install flask>
```
MongoDB
```
https://www.mongodb.com/cloud/atlas?utm_content=lp0421_test_seo&utm_source=google&utm_campaign=gs_americas_united_states_search_core_brand_atlas_desktop&utm_term=mongodb&utm_medium=cpc_paid_search&utm_ad=e&utm_ad_campaign_id=12798976238&gclid=CjwKCAjwg4-EBhBwEiwAzYAlsv1p89ZKcC1aNOetCKaMMY_PXMV5ZGyOOTx76DEDUdxFbY-ogQ3GXhoC4ogQAvD_BwE
```
## Run insert_data.py to populate data to a mongo db for app to access the data

Referance the following in the index.html
Leaflet, Apexcharts, D3, Plotly, Bootstrap, Mapbox
```
<cdn script located in index html>
```
A Mapbox api key will need to be added to a config file with API_KEY as a variable file should be loacted in ../static/config/config.js


## Contributors

Thanks to the following people who have contributed to this project:


* [Anna Sours](https://github.com/acsours)
* [Erich Mitchell](https://github.com/Mitchemoto)
* [Spencer Davis](https://github.com/SMDavis19)
* [TJ Ossola](https://github.com/MtSopris)

## Resources

Outdoors - Student Destinations
```
<https://opendoorsdata.org/data/us-study-abroad/all-destinations/>
```

Workdata - Cost of Living(Source of Web Scrap)
```
https://www.worlddata.info/cost-of-living.php
```

Kaggle - University Rankings
```
https://www.worlddata.info/cost-of-living.php
```

OECD - Tuition Data
```
https://www.oecd-ilibrary.org/education/data/oecd-education-statistics/education-database-educational-expenditure-by-source-and-destination-edition-2020_f46db472-en
```

Google - Country Locations
```
https://developers.google.com/public-data/docs/canonical/countries_csv
```






