# Learning React

- npx create-react-app <APP_NAME>: npx runs an executable, in this case `create-react-app` with the given name



### Setup
- To create a project, use the command `npx create-react-app <APP_NAME>`, it creates an app with npm with some sensible defaults (`npm start`, `npm run build`)
- Ensure that the main file that is loaded has this so that it loads the main component

```
ReactDOM.render(
  <COMPONENT />,
  document.getElementById('root')
);
```

### Modules
- Radium
- Style-Components
- prop-types
  - modules that allows you to state/document what a component needs for it to work
  - `npm install --save prop-types`
- Axios for http requests
  - `npm install axios`


### Overview
- React is a Javascript LIBRARY for building user interfaces, unlike angular which is a framework
- React has many other associated libraries that do other things with the component building react library, such as:
  - React DOM - allows you to manipulate DOM objects on a web page
  - React Router - used for navigation on a SPA
- Uses composable components to create complex UIs
- React also uses many of the latest javascript features that may not be available on some browsers. To fix this issue, you may need to add `babel` to your project to compile the code backwards
- There are many ways to create components but at its most basic level, a react component is just a function.
- Why?
  - Highly dynamic apps have state and dealing with state can be really difficult. React can make this easier
  - Allows you to focus on business logic without fiddling with targeting components when things change
  - Efficient and fast thats maintained by a large community - that can help!
- One of the core components is the `React.Component`

```
class MyProductDescription extends React.Component {
  render() {
    return (
      <article>
        <image className="product" src="./img/product.png"/>
        <div>
          <span className="description">{this.props.description}</span>
          <span className="price">0.00</span>
        </div>
      </article>
      )
  }
}
```

- React automatically updates the component every time data changes (in this case the `{this...}` bit)
- React components (like the above) take properties or `props` for short then returns a `hierarchy of views` via the render method
  - When you compose components you attach `props` by adding properties to the html tag e.g. <CustomComp aPropertyThatGoesOnProps='x'>
  - In other words, `props` are provided by parent Components and shouldn't really be modified by the child component
  - When adding properties to components, they can be accessed by the component using a single pair of curly braces, e.g. `{this.props.aPropertyThatGoesOnProps}` will return `x`
- React components MUST implement the render method and `return` something
- The `render` method returns a `React element` which is effectively a `lightweight` description of what to render
- JSX syntax is used in the return `keyword` with parenthesis of DOM elements
  - JSX looks like HTML but it isn't exactly
  - You cannot use the `class` property on JSX tags as its a reserved keyword in JS, instead you need to use `className` to define classes for tags (this gets converted to class in the end)
  - All the JSX tags that you can use are actually provided by the React library and is these react components that provide the possible tag attributes you can use
  - When returning JSX, you can only return `1` root element containing any number of sub elements
  - The parenethesis is really used so that you can define multiple lines of tags without any errors
- The above syntax is known as JSX syntax, an alternative would be to use methods to create the individual components and nest in within each over e.g.

```
return React.createElement('image', {className: 'product'},
  React.createElement('div', {},
    React.createElement.....
    )
);
```

- What happens within the background or within the library is that the JSX returned is then converted into JS code that writes html to the DOM (in order for auto conversion to happen, you must `import` the React type into the js file)
- When using JSX, its possible to use JS expressions within them, which means you can refer to properties of the component
- Using components, you can now refer to the above component as `<MyProductDescription/>`
- Components have a `constructor` method where you can set a components `state`
- A `constructor` needs to be provided with a props argument which you should forward onto its parent class (React.Component) with `super(props)`
- When importing a component, give the component a name starting with a captital letter. this makes it obvious that in your JSX it is custom component
- You only need to provide a constructor if your new component needs handle state

```
class MyPizza extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value = null
    };
  }
}
```

- When a component has an action on it that calls `this.setState(...)` react `SCHEDULES` for the state to be updated and therefore the component to re render, so its not guaranteed to update the state straight away
  - the `setState()` is inherited from React.Component
  - `setState` takes and object and applies a patch to the current state, so it contains all of the current state plus any changes
  - You should never change the state my directly manipulating it e.g. `this.state = this.state.name = 'blah'`
  - state is managed from WITHIN a component, so should be private from change from any other component
  - any child component will also be rerendered
  - IMPORTANT! - If you have a component that sets state but it also depends on the existing value eg. incrementing a counter when clicking on a button, you may hit issues if multiple event handlers read/write to it. This is because the scheduler may not have updated the state yet and your handler may be using an old state. To fix this, there is another way to update state to take this into account
    - call `setState()` with a function that has the `prevState` and `props` and return an object that represents the updated state but also referring to the `prevState` argument for any of the state needed

```
//instead of this where we refer to the current state to increment
this.setState({
  counter: this.state.counter + 1   //this.state.counter might not be the latest value as the scheduler might not have executed
});

//do this instead to ensure your using the latest state
this.setState((prevState, props) => {
  return {
    counter: prevState.counter + 1
  };
});
```


- It looks as though you use props for the parent to pass on values and behaviour(functions) while state should be used to store public or private data which you can choose to display or not(where the child component works out)
- You typically used state only if its managed by the current component only
- Its pretty common to have a parent component to store state for a child component and forward properties or `props` to the child component to display the actual state
  - doing state this way allows you to store state in one place so that you could easily calculate business logic etc.
  - When doing this and child component's need to run an action to update the parent's state, you simply provide the child component with a `props` that contains a function that the child component will need to execute. This function effectively becomes a clojure so any values sent with it will be within its own scope and will not change, or any references to variables outside the scope. So in this case, we send a function with a reference to the parentsFunction

```
class Parent extends React.Component {
  renderChild(value) {
    return (
        <button onClick={ () => this.childClickAction(value) } />
    )
  }

  this.childClickAction(value) {
    console.log("child has clicked on the button with value: ")
  }
}
```

- When creating components, it would be good to have a way to state what `props` it requires and their types. You can do this with `prop-types`
  - `npm install --save prop-types`
  - this works for both class based and functional components
  - you add the `propTypes` property to the component after the definition and assign it to an obj containing key value pairs of the props it needs and their types
  - doing this will allow for warnings to be thrown if the components are not being used correctly

```
...
import PropTypes from 'prop-types';

class Blah....
...
  <div className={props.myCssClass} onClick={props.myClickFunc}>
  </div>

Blah.propTypes = {
  myCssClass: PropTypes.string,
  onClick: PropTypes.func
};

//or for func comp

const blah = props => (<div></div>);
blah.propTypes = {
  ...
};
```

#### Ref's
- React supports the ability to refer to specific JSX elements by adding the `ref` property to the element and do ui stuff
- You set `ref` to a function that has an argument representing the current JSX element and within the function, you can do what you want with it
- There are a number of things you can do with it both of which wont work in functional components
  - Do DOM based things with elements
  - Since React 16.3 you can use constructor to create the reference then link it
- For functional components, you have to use the `useRef` hook and use the references in a `useEffect` function

```
DOM based things
componentDidMount() {
  this.latestInputElement.focus();
}

...
<input
  ref={(element) => {this.latestInputElement = element} }
  />
```


```
constructor(){
  ...
  this.elementReference = React.createRef();
}

componentDidMount() {
  this.elementReference.current.focus(); //you must use the current property on this
}

...
<input
  ref={this.elementReference} //make the link here
  />
```

```
import React, {useRef, useEffect} from 'react';
const myFuncComp = props => {

  const buttonRef = useRef();

  useEffect(()=> {
      buttonRef.current.click();
  });
  ...

  <button ref={buttonRef}/>
}
```

#### Prop chain problems
- There are times when components will forward props to other components that will forward to other components. In this case, the properties aren't being used, just forwarded.
  - If this happens, it makes for components to be flakey
    - any changes to the components will have a cascading effect
- To fix these problems you use the `Context API`
  - The context is a globally available object/array/string, where you can decide where it is made available
    - You make it available by wrapping the context around the components that need it
  - You create one using `React.createContext({...})`
    - The properties in the object provided to the `createContext` method don't really matter as you will override them anyways, they are only providedso that you can have autocomplete with IDE's
  - Once its created and imported into a Component, you create an JSX element with it and provide a `value` `prop` containing the initial JS object with proper values from the components `state`
  - Its important to note that changes to a context object DOES NOT trigger a re render
  - To use the Context API in a component, you use the Context with a consumer element and a function with a context argument within that eg. `<Context.Consumer> { (context) => return (...) } <Context.Consumer/>`

```
//./context/authContext
import React from 'react';

const authContext = React.createContext({
  isLoggedIn: false, //dummy initial value
  login: () => {}  //empty function
});

export default authContext;

//main app
import AuthContext from '../context/authContext'

class ... {
  state = {...};
  loginHander = () => {};
  ...
  render() {
      //
      <AuthContext.Provider value={{              //notice the double curly brace as we're sending a js obj
        isLoggedIn: this.state.authenticated, login: this.loginHandler}}>
        <CustomComponentThatNeedsTheLoggedInValue/>
      </AuthContext.Provider>
  }
}

...
import AuthContext from '../context/authContext'

class CustomComponentThatNeedsTheLoggedInValue ... {
  render() {
    <AuthContext.Consumer>
    {
      (context) => return (
          <Person name='context.name'></Person>
      )
    }
    </AuthContext.Consumer>

  }
}

```
- There are alternative ways to do the Context API in both class and functional components
  - one issue with the Context API approach is that you could possibly let other components get access to the context when you don't want them to
  - another issue is you don't have access to the Contexts' properties in method handlers or lifecycle methods
- From React 16.6 you can add a static property called `contextType` and set it to the Context Object you have
  - This allows React to access the context and wire it to the Components context property so it can be accessed in other methods
  - this is now the recommended way of doing it as its simpler and less verbose
- For functional components, you use `useContext` hook


```
class Blah ... {
  state = {...};

  static contextType = AuthContext;

  componentDidMount() {
    console.log(this.context.isLoggedIn);                // you can now access the authContext via `this.context`
  }

  //and now you don't need to use the <AuthContext> elements but just use expressions accessing `this.context`
  render() {
    <div>
      {this.context.isLoggedIn ? "user is now logged in" : "user is not logged in"}
    </div>
  }
}

//func component example
import React, { useContext } from 'react';
import AuthContext from '../context/authContext';

const MyFuncComponent = props => {

  //link the context to a constant variable
  const authContext = useContext(AuthContext);

  return (
    <p>{authContext.isLoggedIn ? 'user is logged in' : 'user isnt logged in'}</p>
  );
}
```


#### Data and Immutability
- Its recommended that in react, we don't mutate data but instead we treat it as immutatable and make copies with the changes
  - this is so that we change detect what the changes are easily
  - things become simpler
  - helps with detection for rerendering

- Function components (aka presentation/stateless/dumb components) in react are components that only contain a render method and don't contain any state
  - so rather than creating a component that extends React.Component you just write a function that takes a `props` arg and returns the jsx `return (<button>...)` of what needs to be rendered
  - you would do this as it reduces the boiler plate of a component (writing a class etc)
  - when you do this, you refer to props as `props.x` rather than `this.props.x` AND you have a choice of no longer need to use parenthesis on any function call `onClick={props.aFunc}` rather than `onClick={() => this.props.aFunc() }`
  - The difference between `props.aFunc` and `() => this.props.aFunc()` is that both actually return a function but the latter can cause performance issues, so try and limit that type of style.

```
class Wheel extends React.Component {
  constructor(props) {
    super(props);
    //no state
  }

  render() {
    return (
      <button onClick={ () => this.props.aFunc() }>a button name
      </button>
      );
  }
}

//becomes...

function Wheel(props) {
  return (
    <button onClick={props.aFunc}>a button name
    </button>
    );
}

//you could even use ES6 syntax
const wheel = () => {
  return (    
      <button onClick={props.aFunc}>a button name
      </button>
      )
}

//if you stateless component has dynamic content, you can send it via props
const comp = (props) => {
  return (
    <p>Hello {props.name}</p>
    )
}
```

- If you need to pass parameters to the handler function you need to do 2 things
  - add the parameter argument to the function handler so the code has access to it
  - when referencing the handler function in the `<tag>` `props` you need to do it differently and there are 2 ways
    - call `bind` on the function you want to trigger with the arguments being the second argument onwards e.g. `this.aFuncHandler.bind(this, arg1, arg2)`. Where `this` references the component
    - return an anonymous function using the arrow function syntax that calls the handler function with the param.

```
class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      name: 'blah'
    };
  }

  buttonClickHandler = (newName) => {
    this.setState({
      name: newName
    });
  }

  render() {
    return (
      <div className='container'>
        <p>name: {this.state.name}</p>
        <button onClick="{this.buttonClickHandler.bind(this, "bob")}">button1</button> //use bind
        <button onClick={(event) => this.buttonClickHandler("bobbie")}>button2</button> //return a function using arrow syntax
      </div>
      )
  }

}
```

- Two way binding is the binding of multiple events, e.g. bind to an update field event which also triggers an update somewhere else (parent component perhaps)

```
class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      name: 'blah'
    };
  }

  updateNameHandler = (event) => {
    this.setState({
      name: event.target.value     //the event.target is the tag element that triggered this call
    });
  }

  render() {
    return(
      <Child updateNameFunc="{this.updateNameHandler}" currentName={this.state.name}/> //pass down the func reference to the child component AND the name in the state
    );
  }

//child presentation component that needs to update the parent state
const Child = (props) => {
  return(
    <div>
      <input type="text" onClick={props.updateNameFunc} value={props.currentName}/> //two way binding here as we map this tag to two things, the onClick event AND the value
    </div>
  )
}
}
```

#### Conditionals

- You can conditionally render things in 2 ways with react
  - use a javascript expression and put the content in an ternary operator
    - you can only use simple expressions here that only return true or false, so you can't use block statements here e.g. `if {} else {}`
    - don't use this too much, as it could lead to confusing jsx if you have multiple nested conditionals
  - use a variable to hold the JSX and output that but conditionally set it in code (the js way)
    - as the render method is executed every time the state changes, you can put the code here or you can reference a different method from there

```
//js expression
return (
  <div>
    ... some content
    { this.state.showContent ?
      <div>
        <p> some more conditional content </p>
      </div>
      : null
    }
  </div>
  )
```

```
render() {
  const conditionalContent = null;

  if(this.state.showContent) {
    conditionalContent = (
      <div>
        <p>some more conditional content</p>
      </div>
    );
  }

  return(
      <div>
        {conditionalContent}
      </div>
  )
}
```

#### Lists

- You can render lists of components by doing the following
  - what JSX will do when encountering an array is attempt the render them, this would work if you had a list of jsx elements

```
<ol>
  {myUnorderedListArray}
</ol> #unordered list pointing to an array

...
const result = [];
for(let i = 0; i < 10; i++){
  result.concat(
    return (
      <li>index {i}</li>
      )
    )
}
this.props.myUnorderedListArray = result;
```

- What this effectively does is create a list of first class javascript react objects, place them in a list and renders them as a list
- What we've missed out here is that the list of items need a key property (like an ID) so that react know what our intention is when changing the list, its strongly recommended to add a key for dynamic lists
  - we do this so that react will know if a key/li needs to be
    - destroyed (if it doesn't exist now) on a rerender
    - added if it didn't exist before
    - moved if the index has changed
    - all in the idea of keeping react efficient
  - keys only need to be unique within its component instance and siblings
  - You should try and use a key that isn't the `index` as removing or adding elements will suffle element after it so try and use something like the object ID e.g. persionId instead

```
<li key={i}>index {i}</li>
```

- `key` is a reserved word (like `ref`) in react
  - you can't reference it directly from `props`

- You can use an expression to output a list too
  - The map method on arrays will provide the element as the first arg and the index as the second
- Remember, when modifying lists, you should do it in an immutable fashion, which is to make a copy of the array, and apply the change then set the state with the new version

```
deleteThisIndex = (index) => {
  //use new es6 spread operator to copy elements into a new array
  const newArray = [
    ...this.state.someArray
  ];

  newArray.splice(index, 1); //remove the element from the array

  this.setState({
    someArrayOfObject: newArray
  });
}

updateName = (event, id) => {
  const index = this.someArrayOfObject.findIndex(obj =>
      return obj.id === id;
    );

    const newArray = [
      ...this.state.someArrayOfObject
    ];

    newArray[index].name = event.target.value;

    this.setState({
      someArrayOfObject: newArray
    });

}

render() {
  return (
      {
        this.state.someArrayOfObject.map( (obj, index) => {
          return (
            <div>
              <p key={obj.id} onClick={() => this.deleteThisIndex(index)}>{obj.name}<p>
              <input type="text" onChange={(event) => this.updateName(event, obj.id)}></input>
            </div>
          )
        });
      }
  )
}
```


#### Events
- In normal JS, event properties to tags are usually all lower case, in React, is Camel e.g. `onClick` vs `onclick`
- Its not required but handler methods that get triggered on these events should end with `Handler` eg. submitFormHandler = () => {...}
- Always remember to use a reference to a method by NOT including the parenthesis in the JSF. e.g. `onClick={this.submitFormHandler}`
- Some examples of well used events: (have a look here: https://reactjs.org/docs/events.html#supported-events)
 - onPaste
 - onDownKey
 - onFocus / onBlur
 - onChange / onSubmit
 - onClick

#### React Hooks
- Before React v 16.8, the only way to change a component's state is to use the `setState` method. This has since changed and now you can use React Hooks to do so
- It even works on functional/stateless components
- Looks like it the THE modern standard in newer React apps
- Just like everything else in JS, to use something, you first need to import it. `import { useState } from 'react'`
  - `useState` is the hook that allows you to manage state in a functional component
  - `useState` function when executed returns an array with 2 elements
    - 1st element is the current state, e.g. the state is was set to after the execution of the hook
    - 2nd element is a function to update the state so that we can update the state and have it rerender correctly
    - The hook is typically used with array `Destructuring` where we create 2 new variables from the 2 elements and set them to local variables
  - to use it, just call it as a method with an initial state
- Just like classes functions can also have embedded functions/method too and just like classes you just add them to the encompassing object
- One `VERY IMPORTANT` thing about the `setState` hook is that it DOES NOT merge state, instead it completely replaces it
  - Unlike class based components, where you would normally have a single state with multiple properties, you can have multiple states in stateless functions using hooks that manage specific thing
  - To get around this, You SHOULD NOT! manually manage merges by copying existing state into the update state function
  - You should call `setState` multiple times to set initial states for all of the individual components of the state and then use the `currentState` element in the next call to any call to any other update function
```
import React, {useState} from 'react'

//functional component
const App = (props) => { //props is optional, could even write it as const app = props => {}
  // use destructuring to set elements to variables
  const [currentState, updateStateFunc] = useState({
    message: 'Welcome to my app'
    });

  //create another property to the state, use the hook to create the current state and update functions
  const [currentAgeState, updateAgeFunc] = useState({
    myAge: 35
    });

  const onClickHandler = () => {
    // update the state using the destructured variable, does not touch the `myAge` state
    updateStateFunc({
      message: 'This is a different welcome message'
      });
  }

  return (
    <p>
      {currentState.message}
    </p>
    )
}
```

- Another hook is `useEffect`
  - this hook allows you to manage ALL life cycle events for functional components
  - it takes a function and runs for every event
  - you can trigger `useEffect` only when certain data (state or props) is changed by sending an optional array of variables that need to change for it to trigger
    - passing an empty array causes the effect function to only run on creation
  - You can have multiple `userEffect` in a component
  - You can have it trigger when a component is destroyed by returning a function from the function
```
import React, {useEffect} from 'react';

const myFunComponent = (props) => {
  useEffect(() => {
    console.log('use effect triggered');
  });

  //only runs when person on props is updated
  useEffect(() => {
    console.log('Hey a person object changed!');
  }, [props.person]);


  //only run during creation
  useEffect(() => {
    console.log('This component has been created');
  }, []);

  //run the returned function on destroy
  useEffect(() => {
    return () => {
      console.log('This anon func is triggered when the component is destroyed');
    };
  }, []);


  return (
    ...
  );
}
```

#### Class Component lifecycle
- Only available in class based components
- Components go through life cycles and run particular methods when it hits those events
- All you have to do is add them to your class and react will execute them
- The life cycle events are:
  - constructor()
  - getDerivedStateFromProps()
  - getSnapshotBeforeUpdate()
  - componentDidCatch()
  - componentWillUnmount()
    - triggered when component is removed
    - used for cleanup, e.g. disconnecting from a websocket endpoint
  - shouldComponentUpdate()
    - returns `true` or `false` to indicate if the component should rerender the entire component tree
    - The functional component version of this is to use `export default React.memo(funcComponentName);`
      - This will memorise the inputs to the functional component and if they change, it will rerender it
    - An alternative to using `shouldComponentUpdate` is to make the class component extend `PureComponent`
      - this will automatically have a `shouldComponentUpdate` function that will compare all of the props to see if it was changed. if so, it will trigger a render
  - componentDidUpdate()
  - componentDidMount()
  - render()

- During component creation the following methods are executed in this order
  - constructor(props)
    - if you add this method, you need to call `super(props)`. if you don't add it, it happens automatically
    - use it to set state
    - DO NOT cause side effects
  - getDerivedStateFromProps(props, state)
    - used ti sync props to the state, rare niche cases
  - render()
    - renders the component then afterwards will render child components
  - componentDidMount()
    - this is to make any required side effects
    - do not update state as that will cause a rerender and therefore call this but you can do so async as a `then` in a promise
    - typically used to make http requests

```
class Blah extends React.Component {

  //this runs first
  constructor(props) {
    super(props);
    console.log('this runs first');
    this.state = {};
  }

  //you could set state this way as its a more modern way of doing it as it calls super for you
  state = {
    ...
  };

  //this runs second. its actually a static method
  static getDerivedStateFromProps(props, state) {
    console.log('this runs second')
    return state;
  }

  render() {
    console.log('this runs third');
  }

  componentDidMount() {
    console.log('this run after render')
  }
}
```

- Component Updates for props
  - This is triggered by changes to the state or props
  - The methods triggered are in the following order:
    - getDerivedStateFromProps(props, state)
    - shouldComponentUpdate(nextProps, nextState)
      - used to decide whether or not to continue updating, mainly for performance optimisations
      - must return true or false
    - render()
    - update child components
    - getSnapshotBeforeUpdate() used for last minute DOM operations
    - componentDidUpdate()

```
class Blah extends React.Component {

  static getDerivedStateFromProps(props, state) {
    console.log('runs first during an update to state');
    return state;
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log('runs second')
    return true;
  }

  render() {
    console.log('render method runs')
    return (
        <p></p>
    );
  }

  getSnapshotBeforeUpdate(){
    console.log('after render');
  }
  componentDidUpdate(){
    console.log('runs last');
  }
}
```


#### Styling
- Just like in normal CSS, there are 2 ways in which you can style your components
  - inline
  - separate css file

- Using inline styles, you place the styles in the component file but rather than using normal css names and syntax
  - Because its in JS, there are some limitations, you will need to use modified key names that are compatible with js property names eg. `background-color` is not a valid js property name for an object so you need to use `backgroundColor`
  - Using inline styles are component specific so do not affect other components are they are not applied globally
  - When referencing the style, because its a js variable you need to use the `style={<var name>}` syntax

```
...
render() {
  const personStyle = {
    backgroundColor: 'black',
    margin: '12px auto'
  };

  return ({
    <div style='{personStyle}'>
      ...
    </div>
  })
}
```

- Separate CSS is another way, using this is just like normal css with all its features
  - You'll need to reference it in the JS component file with `import './Person.css'`, doing this will add it to the actual html page as a script tag.
  - You'll need to include the `.css` extension as webpack only works with js files
  - It WONT merge the resulting css files thought
  - Using this method will apply the css file globally, so ensure you write your target names well
  - adding css this way will also have css prefixes generated and added for you, to fix styles on other browsers

```
//Person.css

div.Person {
  background-color: black;
  margin: 12px auto;
}

//component
import './Person.css'
...
render() {
  return(
      <div className="Person">
      </div>
  );
}
```

- Dynamic styling can be done just like conditionals in the js code, you change the style based off stored properties in the state

```
render() {
    const style = {};
    if(selected) {
      backgroundColor = 'green';
    } else {
      backgroundColor = 'red';
    }
    return(
      <p style={style}>selected or not</p>
      );
}
```

- You can also set class names dynamically and provide a list of classes
  - take note of the join in the usage, you could instead use join before the usage

```
render() {
  const classes = [];
  if(this.state.listOfPeople.length <= 2){
    classes.push('red');
  }
  if(this.state.listOfPeople.length <= 1) {
    classes.push('bold'); //at this point it would be red and bold
  }

  return (
    <p className={classes.join(' ')}>some text</p>
    )
}
```

- pseudo selectors (ones with `:xxx` on the class name e.g. red:hover) and media queries are a little more difficult in js the colon messes with the inline styles, you will need to use a packing library
  - there are 3 main ones/ways you can use
    - Radium
    - Styled Components
    - CSS Modules                       
  - For Radium:
  - to fix this, we install a new package called: `radium` `npm install --save radium` to manage inline style elements
  - ensure you wrap your class in Radium when you export, this makes it a `higher order component`, doing this will add extra functionality to the component, this works on both class based components and functional ones
  - to use pseudo selectors with Radium, simply wrap the selector in quotes `const style = { ':hover': { backgroundColor: 'red' } }`
  - for media queries, you must also wrap the main application in a `StyleRoot`

```
import Radium from 'radium';
...

class Blah extends React.Component {
  ...
  render() {
    const allStyles = [];
    const style = {
      ':hover': {
          backgroundColor: 'red'
      }
    };

    const mediaQueryExample = {
      '@media(min-width: 500px)' : {
        width: '450px'
      }
    };
    //if you want to change it after it was initialized
    style[':hover'].backgroundColor = 'blue'; //because the hover property is invalid variable name, you have to use bracket notation with strings

    allStyles.push(style);
    allStyles.push(mediaQueryExample);

    return(
      <p style={allStyles}>Blah blah</p>
      )
  }
}

export default Radium(Blah); //higher order component

//Main application
import Radium, {StyleRoot} from 'radium';

class App extends React.Component {
  render() {
    ...
    return (
      <StyleRoot>             // You must add this for media queries to work
        <div></div>
      </StyleRoot>
    )
  }
}
```

- For StyleComponents
  - `npm intall --save styled-components`
  - for every type of component you can use in html, the is a method on the `styled` type  that represents it
  - `styled.div... styled.p... `
  - each of those methods returns a react component, so you can assign the result to a variable
  - you'll need to use the backtick notation from standard js to provide a `template` in css
  - the way we use backticks with styled components is to provide the styled component a template as a parameter
  - You only put the css properties within the backticks
  - Styled components get a generated class name applied
  - Because they are react components, you can send `props` to them and use them to dynamically set styles using ternary operators
  - Just like all other react components, you can apply event props to them like `onClick`


```
import styled from 'style-components';
...

class Blah extends React.Component {
  ...
  //create a div element with the styling
  const MyStyledDiv = styled.div`
     background-color: ${props => props.problem ? 'red' : 'green' };   //dynamic styling using props
     width: 500px;

     &:hover {
       background-color: lightgreen;     // note here the & for pseudo selectors
     }
  `

  render() {

    return(
      <MyStyledDiv problem={this.state.hasProblem}> //usage of the div with styling
        <p style={allStyles}>Blah blah</p>
      </MyStyledDiv>
      )
  }
}

export default Blah
```

- CSS modules
  - One of the issues with the previous libs for css styling is that most tend to put the css in the js file, this can make things confusing and you don't get the benefits of your IDE like autocomplete
  - CSS modules allow you to split out the CSS in its own file AND scope the style to a specific component
  - CSS styles now go into a `<COMPONENT_NAME>.module.css`
  - CSS styles now get a generated class name so it will only work on the defined component
  - You must import the css using the syntax `import classes from './blah.css'`, doing this will assign all the style definitions to the `classes` variable for you to access in the js and assign to components


```
//MyComp.module.css
.button {
  ...
}

.red {
  ...
}

...

//component
import classes from './MyComp.modules.css';
...

class MyComp extends React.Component {
   render() {
     return (
        <div>
          <p className={classes.red}></p>
          <p className={classes.button}></p>
        </div>
    )
   }
}
```

- Assets
  - You can't just refer to images or other assets in your JSX as something like `<img src='../../assets/x.jpg'/>` as these sort of files won't be in the same directory structure when you package the application up for production.
  - To fix this you will need to make webpack aware that you want to use assets much like you do with css

```
import logo from '../../assets/logo.png'
...
const logo = (props) => (
    <img src={logo}/>
);
```

#### HTTP / Ajax
- JS has `XMLHttpRequest` which allows you to make http requests
- Using `XMLHttpRequest` can be combersome because its pretty low level, you can use a number of other third party packages to make http requests. One of which is `Axios`
- `Axios` is a promise based http client. Can be installed with `npm install axios`
- If you'd like to stick to the basic's / standards then perhaps look into using `fetch` API
- When you need to make a HTTP request to call an endpoint for data, the call should typically be made in the `componentDidMount` lifecycle hook
  - this will cause the component to render twice (seeing as the method runs after a render) but it will only render to the user once
- Have a look the the `http--01-starting-setup` subfolder to see an example
- Axios has a number of methods that repressent the standard request methods, the `get` method at its most basic just requires the URL to make the request to
```
import axios from 'axios';
...

class ... {
  componentDidMount() {
    axios.get('http://...').then(response => console.log(response));
  }
}
```

- Because axios is promise based, you can handle errors easily with the `catch` method

```
axios.get('error triggering url').then(response => console.log(response)).catch(error => console.log('error', error));
```

#### Debugging
- You can use the chrome react extension to inspect components and their state
- Error Boundries can be used to return nice error messages
  - The type of components will wrap normal react components and if an error is thrown and not caught, the boundry component can show a better message, this will allow only parts of a react app to fail

#### Project structure
- Its usually a good idea to keep your main container component clean with very little html element tags, instead try and reference other react components
- project structure could be done in the following way

```
+ components
  - component_name
    - tightly linked component
+ assets
+ containers
```


#### The DOM
- React uses both the real DOM and a virtual DOM
- The render method doesn't actually make changes to the DOM, rather its a suggestion of what the HTML should look like
  - What it actually does is compares old virtual DOM to the new one to see if there are any differences
    - Virtual DOMs are just DOMs represented in JS
    - Virtual DOMs are used as its faster
    - If there are differences, then it reaches out to the real DOM and asks it to rerender
    - Then it renders only the parts that needs it
- Why? all of this? because updating the real DOM is very slow and should be done as little as possible


#### MISC
- When importing components, you don't need to specify the extension of the file e.g. `import {Person} from './Person/Person'`
  - This is because the bundler - webpack will add it in for you
  - Also when creating new Components, its because to define the files and folders with a Capital letter, this is just a convention

- Its possible to send not only text to child components but also HTML/JSX with a component/structured hiearchy. If you want to access these inner nodes of the component, you can access them via the `props.children` property

```
... //parent component
return (
  <ChildComponent aName="bah">Some very important text I want to send to the child</ChildComponent> //send some text or even some html
  )

...
//child component
return (
  <p name={props.aName}>
    <span>{props.children}<span> //access the text and wrap it into a span
  </p>   
  )

```

- Most of the time you can only return one root JSX node in a component, this isn't always the case
  - With lists, you can return a single array of JSX nodes and it will still work
  - If you don't want to use lists, you can use something called an `Aux` component, which is basically a wrapper component that returns all the child components. This is an example of a Hight Order Component or HOC

```
//aux.js
const aux = props => props.children

export default aux;

//component
import Aux from './aux';

class MyComponent extends React.Component {
  render() {
    return(
      <Aux>
        <p></p>
        <p></p>
      </Aux>
    );
  }
}
```

- From React 16 onwards you could use `React.Fragment` instead of Aux it comes ootb

```
import React, {Fragment} from 'react';

class MyComponent extends React.Component {
  render() {
    return(
      <Fragment>
        <p></p>
        <p></p>
      </Fragment>
    );
  }
}

//another syntax for Fragments is to use the empty element tag
//<>...</>
```

#### HOC Higher Order Components
- HOC's are basically components that wrap other components
- It's sometimes common to see HOC's add additional behaviour etc like Radium
- There are 2 main ways of writing HOC's
  - ones where they are more functional and just tweak the JSX
  - others that may change the behaviour
```
//functional component example where you can use it as a tag element
const MyHOC = props => return (
  <div>
    {props.children}
  </div>
  );
export default MyHOC

//function the returns a HOC that is used during export
const exportHOC = (WrappedComponent, classes) => {
  return props => (
    <div className=classes>
      <WrappedComponent {...props}/>  //you need to extract any props given to the wrapped obj here
    </div>
  );
}

export default exportHOC;

//usage
import exportHOC from './hoc/exportHOC';
export default exportHOC(App, classes.App);
```
