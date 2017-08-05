import React from 'react';

const DataComponent = (ComposedComponent, url) => (
  class DataComponent extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        data: [],
        loading: false
      };

      this._getData = this._getData.bind(this);
      this.fetchByParam = this.fetchByParam.bind(this);
    }

    _getData(param = {}) {
      if (param.url) {
        url = param.url;
      }

      this.setState({ loading: true });
      fetch(url)
        .then(response => response.json())
        .then(data => this.setState({
          loading: false,
          data: data.items,
          param
        }));
    }

    fetchByParam(param) {
      this._getData(param);
    }

    componentWillMount() {
      this._getData();
    }

    componentWillReceiveProps(nextProps) {
      // console.log(nextProps.param);
      // if param doesn't pass, maybe some other props, we don't want to call it
      if (nextProps.param) {
        this._getData(nextProps.param);
      }
    }

    render() {
      return (
        <div className="data-component">
          {(this.state.loading) ?
            <p style={{ textAlign: 'center', fontSize: '20px' }}>Loading...</p> :
            <ComposedComponent {...this.state} {...this.props} fetchByParam={this.fetchByParam} />
          }
        </div>
      );
    }
  }

);

export default DataComponent;