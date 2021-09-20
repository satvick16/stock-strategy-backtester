import React from 'react';
import { Line } from 'react-chartjs-2'

export const Plot = ({ data }) => {
    var labels = [...Array(data.length).keys()]

    var priceData = data.map(function (e) {
        return e.price;
    })

    var shortData = data.map(function (e) {
        return e.short_moving_avg;
    })

    var longData = data.map(function (e) {
        return e.long_moving_avg;
    })

    var earnings = data.map(function (e) {
        return e.balance;
    })

    return (
        <div>
            <div>
                <Line
                    data={{
                        labels: labels,
                        datasets: [
                            {
                                label: 'Raw price',
                                data: priceData,
                                backgroundColor: 'black',
                                borderColor: 'black',
                                borderWidth: 1
                            },
                            {
                                label: 'Short-term moving average',
                                data: shortData,
                                backgroundColor: 'blue',
                                borderColor: 'blue',
                                borderWidth: 1
                            },
                            {
                                label: 'Long-term moving average',
                                data: longData,
                                backgroundColor: 'red',
                                borderColor: 'red',
                                borderWidth: 1
                            }
                        ]
                    }}
                    height={250}
                    width={600}
                    options={{
                        maintainAspectRatio: false,
                    }}
                />
            </div>
            <div>
                <Line
                    data={{
                        labels: labels,
                        datasets: [
                            {
                                label: 'Earnings',
                                data: earnings,
                                backgroundColor: 'green',
                                borderColor: 'green',
                                borderWidth: 1
                            }
                        ]
                    }}
                    height={250}
                    width={600}
                    options={{
                        maintainAspectRatio: false,
                    }}
                />
            </div>
        </div>
    )
}
