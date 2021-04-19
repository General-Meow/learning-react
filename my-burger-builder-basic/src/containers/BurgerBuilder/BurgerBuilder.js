import React, { Component } from 'react';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
};

class BurgerBuilder extends Component {

    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            meat: 0,
            cheese: 0,
        },
        totalPrice: 4,
        purchaseable: false,
        purchasing: false,
    }

    updatePurchaseState = () => {
        this.setState((prevState, props) => {
            let ingredientsCount = 0;
            for (let key in prevState.ingredients) {
                ingredientsCount += prevState.ingredients[key];
            }
            return {
                purchaseable: ingredientsCount > 0
            };
        });
    }

    addIngredientHandler = (type) => {
        this.setState((prevState, pros) => {
            const updatedIngredients = {
                ...prevState.ingredients
            };
            updatedIngredients[type] = prevState.ingredients[type] + 1
            const updatedTotalPrice = prevState.totalPrice + INGREDIENT_PRICES[type];
            return {
                ingredients: updatedIngredients,
                totalPrice: updatedTotalPrice,
            };
        });
        this.updatePurchaseState();
    }

    removeIngredientHandler = (type) => {
        this.setState((prevState, props) => {
            const updatedIngredients = {
                ...prevState.ingredients
            };
            let updatedTotalPrice = prevState.totalPrice;
            if (prevState.ingredients[type] > 0) {
                updatedIngredients[type] = prevState.ingredients[type] - 1;
                updatedTotalPrice = prevState.totalPrice - INGREDIENT_PRICES[type];
            }
            return {
                ingredients: updatedIngredients,
                totalPrice: updatedTotalPrice,
            };
        });
        this.updatePurchaseState();
    }

    purchaseHandler = () => {
        this.setState({
            purchasing: true,
        });
    }

    purchaseCancelledHandler = () => {
        this.setState({
            purchasing: false,
        });
    }

    purchaseContinueHandler = () => {
        alert('to continue');
    }

    render() {

        const disabledInfo = {
            ...this.state.ingredients
        };

        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        return (
            <>
                <Modal show={this.state.purchasing} hideModal={this.purchaseCancelledHandler}>
                    <OrderSummary
                        ingredients={this.state.ingredients}
                        cancel={this.purchaseCancelledHandler}
                        continue={this.purchaseContinueHandler}
                        price={this.state.totalPrice}
                    />
                </Modal>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls
                    addIngredient={this.addIngredientHandler}
                    removeIngredient={this.removeIngredientHandler}
                    disabled={disabledInfo}
                    price={this.state.totalPrice}
                    purchaseable={this.state.purchaseable}
                    ordered={this.purchaseHandler}
                />
            </>
        );
    }
}

export default BurgerBuilder;