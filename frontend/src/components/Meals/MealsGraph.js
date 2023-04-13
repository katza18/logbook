import Plot from 'react-plotly.js';

export default function MealsGraph({dates, calories, recCal}) {
    const rec = Array(dates.length).fill(recCal);

    const data = [{
        x: dates,
        y: calories,
        type: 'scatter',
        name: 'Calories'
      }, {
        x: dates,
        y: rec,
        type: 'scatter',
        name: 'Recommended Calories'
      }
    ];

    const layout = {
        width: 600,
        height: 300,
        xaxis: {
            title: 'Time',
            type: 'date',
        },
        yaxis: {
            title: 'Calories/Protein',
        },
        margin: {
            t: 0,
            b: 0,
        },
        showlegend: true,
        legend: {
            x: 1,
            y: 0,
            bgcolor: '#FFFFFF',
            bordercolor: '#000000',
            borderwidth: 1,
            xanchor: 'right',
            yanchor: 'bottom'
        }
    }

    return(
        <Plot
            data={data}
            layout={layout}
            config={{displayModeBar: false}}
        />
    )
}
