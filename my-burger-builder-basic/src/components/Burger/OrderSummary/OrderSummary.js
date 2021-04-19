import React, { Component } from 'react';
import Button from '../../UI/Button/Button';

class OrderSummary extends Component {

    componentDidUpdate() {
        console.log('Order summary did update');
    }

    render() {
        const ingredientSummary = Object.keys(this.props.ingredients)
            .map(k => {
                return (
                    <li key={k}><span>{k}</span>:{this.props.ingredients[k]}</li>
                )
            }
            );

        return (
            <>
                <h3>Your Order</h3>
                <p>A delicious burger with the following ingredients:</p>
                <ul>
                    {ingredientSummary}
                </ul>
                <p><strong>Total Price: {this.props.price.toFixed(2)}</strong></p>
                <p>Continue to checkout?</p>
                <Button btnType='Danger' clicked={this.props.cancel}>CANCEL</Button>
                <Button btnType='Success' clicked={this.props.continue}>CONTINUE</Button>
            </>
        );
    }
}

export default OrderSummary;