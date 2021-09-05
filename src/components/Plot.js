import React from 'react';
import { List, Header } from 'semantic-ui-react';

export const Plot = ({plot}) => {
    return (
        <List>
            {plot.map(point => {
                return (
                    <List.Item key={point.index}>
                        <Header>{point.price}</Header>
                        <Header>{point.short_moving_avg}</Header>
                        <Header>{point.long_moving_avg}</Header>
                        <Header>{point.balance}</Header>
                        <br />
                    </List.Item>
                )
            })}
        </List>
    )
}
