import React from 'react';
import classes from './Burger.module.css'
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';
import PropTypes from 'prop-types';

const burger = props => {
    //grab the keys off the object, and iterate through them
    //for each key, create an array of the required quantity and for those arrays
    //return a BurgerIngredient component, this will end up giving an array of 
    //arrays because of inner map, now we'll need to flatten it with reduce
    let transformedIngredients = Object.keys(props.ingredients)
        .map(igKey => {
        return [...Array(props.ingredients[igKey])]
            .map((_, index) => { return <BurgerIngredient key={igKey + index} type={igKey} /> });
        })
        .reduce((runningResult, currentElement) => { return runningResult.concat(currentElement) }, []);

    if(transformedIngredients.length === 0){
        transformedIngredients = <p>Please start adding ingredients</p>
    }

    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top" />
            {transformedIngredients}
            <BurgerIngredient type="bread-bottom" />
        </div>
    );
}

burger.propTypes = {
    ingredients: PropTypes.object.isRequired
}

export default burger;