import React, { Component } from 'react';
import TrelloList from '../../components/TrelloList';

import './style.scss';

class OpenProject extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showMenu: false,
    };
  }

  menuHandler = e => {
    console.log('showmenu', this.state.showMenu);
    e.preventDefault();
    this.setState({
      showMenu: true,
    });
    console.log('showmenu', this.state.showMenu);
  };

  render() {
    return (
      <div className="projectViewBg">
        <div className="top-menu-bar">
          <p className="project-title">Project Title</p>
          <button className="menu-btn" onClick={this.menuHandler}>
            Menu
          </button>
        </div>
        <br />
        <div className="list">
          <TrelloList title="todo" />
          <TrelloList title="doing" />
          <TrelloList title="done" />
          <TrelloList title="list 4" />
        </div>
      </div>
    );
  }
}

export default OpenProject;
