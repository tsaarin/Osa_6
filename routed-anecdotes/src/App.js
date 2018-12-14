import React from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { Table, Grid, Row, Col, FormGroup, FormControl, ControlLabel, ButtonToolbar, Button, Navbar, Nav, NavItem, Image } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

const AnecdoteList = ({ anecdotes }) => (
    <div>
      <h2>Anecdotes</h2>
      <Table bordered hover>
        <tbody>
          {anecdotes.map(anecdote => 
            <tr key={anecdote.id} >
              <td>
                <Link to={`/anecdotes/${anecdote.id}`}>{anecdote.content}</Link>
              </td>
            </tr>)}
        </tbody>
      </Table>  
    </div>
)

const Anecdote = ({ anecdote }) => (
  <div>
    <h2>{anecdote.content} by {anecdote.author}</h2>
    <p>has {anecdote.votes} votes</p>
    <p>for more info see <a href={anecdote.info}>{anecdote.info}</a></p>
  </div>
)

const About = () => (
  <div>
    <h2>About anecdote app</h2>  
    <Grid style={{ backgroundColor: "#ecf7b7" , margin: 20 }}>
      <Row className="show-grid">
        <Col sm={6}>
          <p>According to Wikipedia:</p>
          
          <em>An anecdote is a brief, revealing account of an individual person or an incident. 
            Occasionally humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke laughter but to reveal a truth more general than the brief tale itself, 
            such as to characterize a person by delineating a specific quirk or trait, to communicate an abstract idea about a person, place, or thing through the concrete details of a short narrative. 
            An anecdote is "a story with a point."</em>

          <p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>
        </Col>
        <Col sm={6}>
          <Image src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Edsger_Wybe_Dijkstra.jpg/220px-Edsger_Wybe_Dijkstra.jpg" alt="sideimage" style={{minHeight: 10, float: "right"}}/>
        </Col>
      </Row>
    </Grid>
  </div>
)

const Footer = () => (
  <div>
    Anecdote app for <a href='https://courses.helsinki.fi/fi/TKT21009/121540749'>Full Stack -sovelluskehitys</a>.

    See <a href='https://github.com/mluukkai/routed-anecdotes'>https://github.com/mluukkai/routed-anecdotes</a> for the source code. 
  </div>
)

const notificationStyle = {
  color: 'green',
  borderStyle: 'double',
  borderRadius: 10,
  padding: 5,
  margin: 5
}

/* const menuStyle = {
  backgroundColor: 'lightblue',
  padding: 10,
  margin: 10
}

const menuItemStyle = {
    fontWeight: 'bold',
    fontStyle: "italic",
    color: "red",
    backgroundColor: "yellow",
    padding: "inherit"
} */

const Notification = ({ message }) => {
  if (!message) {
    return null
  }
  return <div style={notificationStyle}>{message}</div>  
}

class CreateNew extends React.Component {
  constructor() {
    super()
    this.state = {
      content: '',
      author: '',
      info: ''
    }
  }

  handleChange = (e) => {
    console.log(e.target.name, e.target.value)
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.addNew({
      content: this.state.content,
      author: this.state.author,
      info: this.state.info,
      votes: 0
    })
    this.props.history.push('/')
  }

  render() {
    return(
      <div>
        <h2>create a new anecdote</h2>
        <form onSubmit={this.handleSubmit}>
          <FormGroup>
            <ControlLabel>Content</ControlLabel>
            <FormControl
              name="content"
              type="text"
              value={this.state.content}
              onChange={this.handleChange}
            />
            <ControlLabel>Author</ControlLabel>            
            <FormControl
              name="author"
              type="text"
              value={this.state.author}
              onChange={this.handleChange}
            />
            <ControlLabel>Info</ControlLabel>                        
            <FormControl
              name="info"
              type="text"
              value={this.state.info}
              placeholder="Url for more info"
              onChange={this.handleChange}
            />
            <ButtonToolbar>
              <Button type="submit" bsStyle="success" bsSize="large" style={{ marginTop: 15 }}>Create</Button>
            </ButtonToolbar>              
          </FormGroup>          
        </form>
      </div>  
    )

  }
}

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      anecdotes: [
        {
          content: 'If it hurts, do it more often',
          author: 'Jez Humble',
          info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
          votes: 0,
          id: '1'
        },
        {
          content: 'Premature optimization is the root of all evil',
          author: 'Donald Knuth',
          info: 'http://wiki.c2.com/?PrematureOptimization',
          votes: 0,
          id: '2'
        }
      ],
      notification: ''
    } 
  }

  addNew = (anecdote) => {
    anecdote.id = (Math.random() * 10000).toFixed(0)
    this.setState({ 
      anecdotes: this.state.anecdotes.concat(anecdote),
      notification: `a new anecdote ${anecdote.content} created!`
    })
    setTimeout(() => {
      this.setState({ notification: '' })
    }, 5000)
  }

  anecdoteById = (id) => (
    this.state.anecdotes.find(a => a.id === id)
  )

  vote = (id) => {
    const anecdote = this.anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    const anecdotes = this.state.anecdotes.map(a => a.id === id ? voted : a)

    this.setState({ anecdotes })
  }

  render() {
    return (
      <div className="container">
        <h1>Software anecdotes</h1>        
        <Router>
          <div>
            <Navbar inverse collapseOnSelect>
              <Navbar.Header>
                <Navbar.Brand>
                  Anecdote app
                </Navbar.Brand>
                <Navbar.Toggle />
              </Navbar.Header>
              <Navbar.Collapse>
                <Nav>
                  <LinkContainer to="/">
                    <NavItem>Anecdotes</NavItem>
                  </LinkContainer>  
                  <LinkContainer to="/create">
                    <NavItem>Create New</NavItem>
                  </LinkContainer>
                  <LinkContainer to="/about">
                    <NavItem>About</NavItem>
                  </LinkContainer>
                </Nav>
              </Navbar.Collapse>
            </Navbar>
            <Notification message={this.state.notification}/>
            <Route exact path="/" render={() => <AnecdoteList anecdotes={this.state.anecdotes}/>} />
            <Route path="/create" render={({history}) => <CreateNew history={history} addNew={this.addNew}/>} />
            <Route path="/about" render={() => <About />} />
            <Route exact path="/anecdotes/:id" render={({match}) =>
              <Anecdote anecdote={this.anecdoteById(match.params.id)} />}
            />
          </div>            
        </Router>
        <Footer />        
      </div>
    );
  }
}

export default App;
