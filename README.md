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

- When a component has an action on it that calls `this.setState(...)` it forces the component to rerender by calling its `render` method
  - the `setState()` is inherited from React.Component
  - any child component will also be rerendered
- It looks as though you use props for the parent to pass on state(values) and behaviour(functions) while state should be used to store public or private data which you can choose to display or not(where the child component works out)
- Its pretty common to have a parent component to store state for a child component and forward properties or `props` to the child component to display the actual state
  - doing state this way allows you to store state in one place so that you could easily calculate business logic etc.
  - When doing this and child component's need to run an action to update the parent's state, you simply provide the child component with a `props` that contains a function that the child component will need to execute. This function effectively becomes a clojure so any values sent with it will be within its own scope and will not change. So in this case, we send a function with a reference to the parentsFunction

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

Data immutability
- Its recommended that in react, we don't mutate data but instead we treat it as immuatable and make copies with the changes
  - this is so that we change detect what the changes are easily
  - things become simpler
  - helps with detection for rerendering

- Function components (aka presentation/stateless/dumb components) in react are components that only contain a render method and don't contain any state
  - so rather than creating a component that extends React.Component you just write a function that takes a `props` arg and returns the jsx `return (<button>...)` of what needs to be rendered
  - you would do this as it reduces the boiler plate of a component (writing a class etc)
  - when you do this, you refer to props as `props.x` rather than `this.props.x` AND you have a choice of no longer need to use parenthesis on any function call `onClick={props.aFunc}` rather than `onClick={() => this.props.aFunc() }`

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

- You can render lists of components by doing the following

```
<ol>{myUnorderedListArray}</ol> #unordered list pointing to an array

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

- What this effectively does is create a list of first class javascript react objects, place them in a list and renders them as a list
- What we've missed out here is that the list of items need a key property (like an ID) so that react know what our intention is when changing the list, its strongly recommended to add a key for dynamic lists
  - we do this so that react will know if a key/li needs to be
    - destroyed (if it doesn't exist now) on a rerender
    - added if it didn't exist before
    - moved if the index has changed
    - all in the idea of keeping react efficient
  - keys only need to be unique within its component instance and siblings

```
<li key={i}>index {i}</li>
```

- `key` is a reserved word (like `ref`) in react
  - you can't reference it directly from `props`


#### MISC
- When importing components, you don't need to specify the extension of the file e.g. `import {Person} from './Person/Person'`
  - This is because the bundler - webpack will add it in for you
  - Also when creating new Components, its because to define the files and folders with a Capital letter, this is just a convention
