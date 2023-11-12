import { Input } from 'antd';
import React, { Component } from 'react';

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchQuery: this.props.searchQuery,
      changeHandler: this.props.changeHandler,
    };
  }

  render() {
    const { searchQuery, changeHandler } = this.state;
    return (
      <Input
        value={searchQuery}
        placeholder="Type to search..."
        onChange={(evt) => {
          this.setState({
            searchQuery: evt.target.value,
          });
          changeHandler(evt.target.value);
        }}
      />
    );
  }
}

export default Search;
