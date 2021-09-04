import pandas as pd
import matplotlib.pyplot as plt
import mpld3
from alpha_vantage.timeseries import TimeSeries
from alpha_vantage.techindicators import TechIndicators
from flask import Flask, jsonify

app = Flask(__name__)


@app.route('/')
def evaluate():
    api_key = "TAKUPYKN8M05N9RB"

    # user-supplied specs for investment strategy
    ticker = "IBM"
    short = 50
    long = 200
    qty = 50

    start_date = "2019-09-01"
    end_date = "2020-09-06"

    # fetch daily adjusted price data
    ts = TimeSeries(key=api_key, output_format="pandas")

    data_ts, meta_data_ts = ts.get_daily_adjusted(
        symbol=ticker, outputsize="full")

    # fetch short and long moving average data
    ti = TechIndicators(key=api_key, output_format="pandas")

    data_ti_short, meta_data_ti_short = ti.get_sma(
        symbol=ticker, interval="daily", time_period=short, series_type="close"
    )

    data_ti_long, meta_data_ti_long = ti.get_sma(
        symbol=ticker, interval="daily", time_period=long, series_type="close"
    )

    # format dataframes, isolate data by user-specified time period and save plot as html file
    df_ts = data_ts["4. close"].iloc[::-1].iloc[long - 1::]
    df_ti_short = data_ti_short.iloc[long - short::]
    df_ti_long = data_ti_long

    total_df = pd.concat([df_ts, df_ti_short, df_ti_long], axis=1)
    total_df.columns = [
        "price", f"{short}-day moving avg", f"{long}-day moving avg"]

    total_df = total_df[start_date:end_date]

    # backtest investment strategy and record earnings
    balance = 0
    num_stocks = 0

    for index, row in total_df.iterrows():
        if row[f"{short}-day moving avg"] < row[f"{long}-day moving avg"]:
            num_stocks += qty
            balance -= row["price"] * qty
        else:
            balance += row["price"] * num_stocks
            num_stocks = 0

    # fig = plt.figure()
    # axes = fig.add_subplot()
    # total_df.plot(ax=axes)

    # fig.suptitle(f"${balance}", fontsize=16)

    # data = mpld3.fig_to_html(fig=fig, no_extras=False, template_type="simple")

    total_df.index.name = str(balance)

    data = total_df.to_json(orient="records")

    return data
