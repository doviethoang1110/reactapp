import React, {useEffect} from "react";
import {Chart} from "chart.js";
import callApi from "../../utils/api";

const BarChart = (props) => {

    useEffect(() => {
        callApi('orders/chart').then(res => {
            const {totalAmountEachMonth, totalOrderEachMonth} =  res.data;
            const barChartData = {
                labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July','August','September','October','November','December'],
                datasets: [{
                    label: 'Số đơn hàng',
                    backgroundColor: "orange",
                    yAxisID: 'y-axis-1',
                    data: totalOrderEachMonth
                }, {
                    label: 'Doanh thu',
                    backgroundColor: "lightblue",
                    yAxisID: 'y-axis-2',
                    data: totalAmountEachMonth
                }]
            };
            const ctx = document.getElementById('canvas').getContext('2d');
            new Chart(ctx, {
                type: 'bar',
                data: barChartData,
                options: {
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
            });
        }).catch(error => {
            console.log(error)
        })
    },[])
    return (
        <div style={{width: '85%'}}>
            <canvas id="canvas"></canvas>
        </div>
    );
}

export default BarChart;