import Plot from 'react-plotly.js';

export default function ProteinGraph({dates, protein, recPro}) {
    const rec = Array(dates.length).fill(recPro);

    const data = [{
        x: dates,
        y: protein,
        type: 'scatter',
        name: 'Protein'
      }, {
        x: dates,
        y: rec,
        type: 'scatter',
        name: 'Recommended Protein'
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
            title: 'Protein',
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
