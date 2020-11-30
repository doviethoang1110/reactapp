import React, {useEffect, useState} from "react";
import BarChart from "../components/chart/BarChart";
import callApi from "../utils/api";

const Dashboard = (props) => {

    const [dataChart, setDataChart] = useState({
        totalAmountEachMonth: null,
        totalOrderEachMonth: null,
        customers: null,
        products: null,
        orders: null,
        totalAmount: null
    });

    useEffect(() => {
        callApi('orders/chart').then(res => {
            setDataChart(res.data);
        }).catch(error => {
            console.log(error)
            setDataChart({
                totalAmountEachMonth: null,
                totalOrderEachMonth: null,
                customers: null,
                products: null,
                orders: null,
                totalAmount: null
            })
        })
    },[]);

    const { totalAmount, orders, customers, products, totalAmountEachMonth, totalOrderEachMonth} = dataChart;

    return (
        <React.Fragment>
            <div className="row">
                <div className="col-lg-3 col-6">
                    <div className="small-box bg-info">
                        <div className="inner">
                            <h3>{orders}</h3>
                            <p>Đơn hàng mới</p>
                        </div>
                        <div className="icon">
                            <i className="ion ion-bag" />
                        </div>
                    </div>
                </div>
                <div className="col-lg-3 col-6">
                    <div className="small-box bg-success">
                        <div className="inner">
                            <h3>{totalAmount}</h3>
                            <p>Doanh thu</p>
                        </div>
                        <div className="icon">
                            <i className="ion ion-stats-bars" />
                        </div>
                    </div>
                </div>
                <div className="col-lg-3 col-6">
                    <div className="small-box bg-warning">
                        <div className="inner">
                            <h3>{customers}</h3>
                            <p>Khách hàng đăng kí</p>
                        </div>
                        <div className="icon">
                            <i className="ion ion-person-add" />
                        </div>
                    </div>
                </div>
                <div className="col-lg-3 col-6">
                    <div className="small-box bg-danger">
                        <div className="inner">
                            <h3>{products}</h3>
                            <p>Sản phẩm</p>
                        </div>
                        <div className="icon">
                            <i className="ion ion-pie-graph" />
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <BarChart totalAmountEachMonth={totalAmountEachMonth} totalOrderEachMonth={totalOrderEachMonth}/>
            </div>
        </React.Fragment>
    );
}
export default Dashboard;