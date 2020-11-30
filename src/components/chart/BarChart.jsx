import React, {useEffect} from "react";
import {Chart} from "chart.js";

const BarChart = (props) => {

    useEffect(() => {
        const barChartData = {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July','August','September','October','November','December'],
            datasets: [{
                label: 'Số đơn hàng',
                backgroundColor: "orange",
                yAxisID: 'y-axis-1',
                data: props.totalOrderEachMonth
            }, {
                label: 'Doanh thu',
                backgroundColor: "lightblue",
                yAxisID: 'y-axis-2',
                data: props.totalAmountEachMonth
            }]
        };
        const options = {
            responsive: true,
                title: {
                display: true,
                    text: 'Thống kê đơn hàng'
            },
            tooltips: {
                mode: 'index',
                    intersect: true
            },
            scales: {
                yAxes: [{
                    type: 'linear',
                    display: true,
                    position: 'left',
                    id: 'y-axis-1',
                }, {
                    type: 'linear',
                    display: true,
                    position: 'right',
                    id: 'y-axis-2',
                    gridLines: {
                        drawOnChartArea: false
                    }
                }],
            }
        }
        const bar = document.getElementById('bar').getContext('2d');
        const pie = document.getElementById('pie').getContext('2d');
        new Chart(bar, {
            type: 'bar',
            data: barChartData,
            options
        });
        new Chart(pie,{
            type: 'line',
            data: barChartData,
            options
        })
    },[props])
    return (
        <React.Fragment>
            <div className="col-md-6">
                <canvas id="bar"></canvas>
            </div>
            <div className="col-md-6">
                <canvas id="pie"></canvas>
            </div>
        </React.Fragment>
    );
}

export default BarChart;