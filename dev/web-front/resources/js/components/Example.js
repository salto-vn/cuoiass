// Example.js

import React, { Component } from 'react';
import ReactDOM from 'react-dom';

export default class Example extends Component {
    constructor() {
        super();

        this.state = {
            pitchers: []
        };
    }

    componentDidMount() {
       fetch('/api/foo').then(response => {
           return response.json();
        }).then(objects => {
           this.setState({pitchers:objects});
       })
    }

    renderPitchers() {
        return this.state.pitchers.map(pitcher => {
            return (
                <li key={pitcher.key}>
                    Name : {pitcher.name}<br/>
                    Win : {pitcher.win}<br/>
                    Era : {pitcher.era}<br/>
                </li>
            );
        });
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-8 col-md-offset-2">
                        <div className="panel panel-default">
                            <div className="panel-heading">Customer Example Component</div>

                            <div className="panel-body">
                                <ul>
                                    {this.renderPitchers()}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
if (document.getElementById('example')) {
    ReactDOM.render(<Example />, document.getElementById('example'));
}
