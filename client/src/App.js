import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

class App extends Component {
  state = {
    actions: [],
    projects: []
  };
  componentDidMount() {
    const projects = axios.get('/api/projects');
    const actions = axios.get('/api/actions');
    axios.all([projects, actions]).then(
      axios.spread((...responses) => {
        this.setState({
          projects: responses[0].data,
          actions: responses[1].data
        });
      })
    );
  }
  render() {
    return (
      <div className="App">
        <h1>
          Server Side routing with <code>express.js</code>
        </h1>
        <div>
          <h2>Projects</h2>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Description</th>
                <th>Completed</th>
              </tr>
            </thead>
            <tbody>
              {this.state.projects.map(project => (
                <tr key={project.id}>
                  <td>{project.id}</td>
                  <td>{project.name}</td>
                  <td>{project.description}</td>
                  <td>{project.completed ? 'True' : 'False'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div>
          <h2>Actions</h2>
          <table>
            <thead>
              <tr>
                <th>ActionID</th>
                <th>ProjectID</th>
                <th>Description</th>
                <th>Notes</th>
                <th>Completed</th>
              </tr>
            </thead>
            <tbody>
              {this.state.actions.map(action => (
                <tr key={action.id}>
                  <td>{action.id}</td>
                  <td>{action.project_id}</td>
                  <td>{action.description}</td>
                  <td>{action.notes}</td>
                  <td>{action.completed ? 'True' : 'False'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default App;
