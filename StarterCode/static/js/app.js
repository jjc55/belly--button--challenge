// start of Juhi's js file

//check to see if connection between app.js and index.html is working
console.log("testing")

/* 1. Use the D3 library to read in samples.json from the 
URL https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json.
*/

//Create variable to store samples.json endpoint stored on Amazon server s3
const sample_data = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"

//Fetch the JSON data and console log it
d3.json(sample_data).then(function(data) {
    // console.log("This is sample data")
    console.log(data)
})


/* Build function called buildCharts
2. Create a horizontal bar chart with a dropdown menu to display the top 10 OTUs found in that individual.
Use sample_values as the values for the bar chart.
Use otu_ids as the labels for the bar chart.
Use otu_labels as the hovertext for the chart.

3. Create a bubble chart that displays each sample.
Use otu_ids for the x values.
Use sample_values for the y values.
Use sample_values for the marker size.
Use otu_ids for the marker colors.
Use otu_labels for the text values.
*/

function buildCharts(sample){
    console.log("testing buildcharts functions");

    d3.json(sample_data).then(function(data){
        console.log("This is sample data")
        console.log(data);

        //to build the barchart need the samples object
        let samples = data.samples
        //view in console
        console.log(samples);

        let sampleArray = samples.filter(sampleObject => sampleObject.id == sample);
        console.log(sampleArray);

        //unpack the object from within the array
        let sampleResult = sampleArray[0];
        console.log(sampleResult);

        //create variables 
        let sample_values = sampleResult.sample_values;
        console.log(sample_values);

        let otu_ids = sampleResult.otu_ids;
        console.log(otu_ids);

        let otu_labels = sampleResult.otu_labels;
        console.log(otu_labels);

        /* Bubble chart: 
                Use otu_ids for the x values.
                Use sample_values for the y values.
                Use sample_values for the marker size.
                Use otu_ids for the marker colors.
                Use otu_labels for the text values. */
        
                let traceBubble = {
                    x: otu_ids,
                    y: sample_values, 
                    mode: 'markers',
                    marker: {
                        size: sample_values,
                        color: otu_ids,
                        colorscale: 'YlGnBu'
                    }
                }

                let dataBubble = [traceBubble];

                let layoutBubble = {
                    title: "Bacteria in Sample",
                    showlegend: false,
                    xaxis: {title: "OTU ID"},
                    yaxis: {title: "Sample Values"}
                }

                //build bubble chart in <div id="bubble"></div>
                Plotly.newPlot('bubble', dataBubble, layoutBubble)

        /* Horizontal Bar Chart:
                Use sample_values as the values for the bar chart.
                Use otu_ids as the labels for the bar chart.
                Use otu_labels as the hovertext for the chart.*/
                
                let dataBar = [{
                    x: sample_values.slice(0,10).reverse(),
                    y: otu_ids.slice(0, 10).map(otuID => `OTU ${otuID}`).reverse(),
                    text: otu_labels.slice(0,10).reverse(),
                    type: 'bar',
                    orientation: "h"
                }];

                let layoutBar = {
                    title: "Top 10 Bacteria in Sample",
                }

                //create plot in the <div id="bar"></div>
                Plotly.newPlot('bar', dataBar, layoutBar);

            
    });

};


/* 4. Display the sample metadata, i.e., an individual's demographic information. */



/* 5. Display each key-value pair from the metadata JSON object somewhere on the page. */




/* 6. Update all the plots when a new sample is selected. Additionally, you are welcome to 
create any layout that you would like for your dashboard. */




/* 7. Deploy your app to a free static page hosting service, such as GitHub Pages. 
Submit the links to your deployment and your GitHub repo. 
Ensure that your repository has regular commits and a thorough README.md file */


//Create an initialize function called initialize
function initialize(){
    buildCharts(940);
};

initialize();