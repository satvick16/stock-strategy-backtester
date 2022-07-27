import React, { useState } from 'react';
import { Plot } from './Plot'

const initialFormData = Object.freeze({
    ticker: "",
    short: 0,
    long: 0,
    qty: 0,
    start_date: "",
    end_date: ""
})

export const ValidationForm = () => {
    const [plot, setPlot] = useState([]);
    const [formData, updateFormData] = useState(initialFormData);

    const buttonStyle = {
        backgroundColor: '#b1a296'
    }

    const handleChange = (e) => {
        updateFormData({
            ...formData,

            [e.target.name]: e.target.value.trim()
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);

        fetch('/api/results', {
            headers: {
                'ticker': formData.ticker,
                'short': formData.short,
                'long': formData.long,
                'qty': formData.qty,
                'start_date': formData.start_date,
                'end_date': formData.end_date
            }
        }).then(res => res.json()).then(data => {
            console.log(data);
            setPlot(data);
        })
    }

    return (
        <div className="App">
            <form onSubmit={handleSubmit}>
                <div>
                    <label>For the stock, </label>
                    <input
                        name="ticker"
                        placeholder="enter ticker"
                        value={formData.ticker}
                        onChange={handleChange}
                    />
                    <label> monitor the </label>
                    <input
                        name="short"
                        placeholder="enter short interval"
                        onChange={handleChange}
                    />
                    <label>-day moving average as well as the </label>
                    <input
                        name="long"
                        placeholder="enter long interval"
                        onChange={handleChange}
                    />
                    <label>-day moving average. </label>
                    <br />
                    <label>When the short-term average goes <b>below</b> the long-term average, buy </label>
                    <input
                        name="qty"
                        placeholder="enter trade size"
                        onChange={handleChange}
                    />
                    <label> stocks.</label>
                    <br />
                    <label>When the short-term average goes <b>above</b> the long-term average, sell all stocks owned.</label>
                    <br />
                    <label>Backtest this strategy between </label>
                    <input
                        name="start_date"
                        placeholder="yyyy-mm-dd"
                        value={formData.start_date}
                        onChange={handleChange}
                    />
                    <label> and </label>
                    <input
                        name="end_date"
                        placeholder="yyyy-mm-dd"
                        value={formData.end_date}
                        onChange={handleChange}
                    />
                    <label>.</label>
                </div>
                <br />
                <button style={buttonStyle} type="submit">Backtest</button>
                <br />
                <Plot data={plot} />
            </form>
        </div>
    );
}
