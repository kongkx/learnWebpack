import React, {Component} from 'react';

class ExpertiseDesc extends Component {
  constructor(props) {
    super(props);
    this.state = Object.assign({},this.props.data);
  }
  componentWillReceiveProps(nextProps) {
    var resetState = Object.assign({}, nextProps.data);
    console.log(nextProps);
    this.setState(resetState);
  }
  handleChange(e) {
    var element = e.target;
    var value = element.value;
    var key = element.getAttribute('name');
    var updateObj = {};
    updateObj[key] = value;
    this.setState(updateObj);
  }
  getActionClass() {
    var classStr = 'quickForm__submit';
    if (this.state.isDirty) {
      return classStr
    } else {
      return classStr + ' quickForm__submit_hidden';
    }
  }
  handleSubmit(e) {
    e.preventDefault();
    var data = this.state;
    this.props.onSubmit(data);
  }
  isDirty() {
    var origin = this.props.data;
    var current = this.state;
    var isDirty = false;
    for (var i in origin) {
      origin.hasOwnProperty(i) && origin[i] != current[i] && (isDirty = true)
    }
    return isDirty;
  }
  render() {
    return (
      <form className="expertiseDesc" onSubmit={this.handleSubmit.bind(this)}>
        <div className="expertiseDesc__field">
          <input
            name="expertise"
            className="formControl formControl_noBorder"
            placeholder="Click and Write here"
            value={this.state.expertise}
            onChange={this.handleChange.bind(this)}
            />
        </div>
        <div className="expertiseDesc__field">
          <input
            name="application"
            className="formControl formControl_noBorder"
            placeholder="Click and Write here"
            value={this.state.application}
            onChange={this.handleChange.bind(this)}
            />
        </div>
        <div className="expertiseDesc__button">
          {this.isDirty() && <button>OK</button>}
        </div>
      </form>
    )
  }
}

ExpertiseDesc.propTypes = {
  onSubmit: React.PropTypes.func.isRequired,
}

export default ExpertiseDesc
