import React, { Component } from 'react';
import { render } from 'react-dom';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Hello from './Hello';
import './style.css';
import './test.css';

const state = {eventCount: 0, username: ''};

function setLocalState(newState) {
    Object.assign(state, newState)
    renderApp()
}

function useLocalStorage(key, defaultValue = '') {
    const [localState, setLocalState] = React.useState(
      () => window.localStorage.getItem(key) || defaultValue
    )
    React.useEffect(() => {
      window.localStorage.setItem(key, localState)
    }, [key, localState])

    return [localState, setLocalState]
}

function InputCount() {
    var [count, setCount] = useLocalStorage('count', 0)
    count = parseInt(count)
    return (
      <button onClick={() => setCount(c => parseInt(c) + 1)}>{count}</button>
    )
}

function InputName() {
    const [name, setName] = useLocalStorage('name')
    const handleChange = event => setName(event.target.value)

    const element8 = (
      <div>
        <form>
          <label htmlFor="name">Name: </label>
          <input value={name} onChange={handleChange} id="name"/>
        </form>
        <br />
        {name ? <strong>Hello {name}</strong> : 'Please type your name'}
      </div>
    )

    return element8;
}

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      name: 'React'
    };
  }

   render() {
      return (
        <>
        <InputCount></InputCount>
        <InputName></InputName>
        </>
      )

/*
    function handleClick() {
      setState({eventCount: state.eventCount + 1, username: ''})
    }

    function handleChange(event) {
      setState({username: event.target.value})
    }


    const element7 = (
       <div>
         <p>There have been {state.eventCount} events.</p>
           <p>
            <button onClick={handleClick}>Click Me</button>
           </p>
          <p>You typed: {state.username}</p>
          <p>
          <input onChange={handleChange}></input>
          </p>
       </div>
     );
*/

    function Box({className = '', style, size, ...rest}) {
      const sizeClassName = size ? `box--${size}` : ''
      return (
        <div
          className={`box ${className} ${sizeClassName}`}
          style={{fontStyle: 'italic', ...style}}
          {...rest}
        />
      )
    }

    const element6 = (
      <div>
        <Box size="small" style={{backgroundColor: 'lightblue'}}>
          small lightblue box
        </Box>
        <Box size="medium" style={{backgroundColor: 'pink'}}>
          medium pink box
        </Box>
        <Box size="large" style={{backgroundColor: 'orange'}}>
          large orange box
        </Box>
      </div>
    )

    // I could use styled-components...
    const Box2 = styled.div`
      border: 15px solid #333;
      display: flex;
      flex-direction: column;
      justify-content: center;
      text-align: center;
    `;

    // Or just convert the css into JSON, but that's tedious
     const textStyles2 = {
        "border": "1px solid #333",
        "display": "flex",
        "flexDirection": "column",
        "justifyContent": "center",
        "textAlign": "center",
     }

    // Or scratch both of these and just import a css file

    const time = new Date().toLocaleTimeString()
    const element5 = (
      <div>
      <div className="box box--small" style={{backgroundColor: 'lightblue'}}>{time}</div>
      <Box2>{time}</Box2>
      </div>
    )

    const element4 = (
      <div>{time}</div>
    )

    function CharacterCount({text}) {
      return <div>
        {`the text "${text}" has `} 
        {length = text.length ? <strong>{text.length}</strong> : "no"}
        {` characters`}
      </div>
    }

    const element3 = (
      <>
        <CharacterCount text="Hello World" />
        <CharacterCount text="" />
      </>
    )

    let titleText = {
        fontSize: 36,
        color: '#c8c8c8'
    }

    function SayHello({firstName, lastName}) {
      return (
        <div>
          Hello {firstName} {lastName}!
        </div>
      )
    }

/*
    const PropTypes = {
      string(props, propName, componentName) {
        if (typeof props[propName] !== 'string') {
          return new Error(
            `Hey, the component ${componentName} needs the prop ${propName} but you passed a ${typeof props[propName]}`)
        }
      }
    }
    */

    SayHello.propTypes = {
      firstName: PropTypes.string.isRequired,
      lastName: PropTypes.string.isRequired,
    }

    const element2 = <SayHello firstName={'a'} lastName={'b'} />

    const Message = props => <div className="message" style = {titleText}>{props.children}</div>
    const element = (
      <div className="container">
      <Message>Hello World</Message>
      <Message>Goodbye World</Message>
      </div>
    )
    return element8;
   }
}

function renderApp() {
  render(<App />, document.getElementById('root'));
}
renderApp()
//setInterval(tick, 1000)

/*
import React, { Component } from 'react';
import { render } from 'react-dom';
import Hello from './Hello';
import './style.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      name: 'React'
    };
  }

  render() {
    return (
      <div>
        <Hello name={this.state.name} />
        <p>
          Start editing to see some magic happen :)
        </p>
      </div>
    );
  }
}

render(<App />, document.getElementById('root'));
*/