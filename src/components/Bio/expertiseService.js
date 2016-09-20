import React, {Component} from 'react';
import { findDOMNode } from 'react-dom';
import Portal from 'react-overlays/lib/Portal'
import Position from 'react-overlays/lib/Position'
import Overlay from 'react-overlays/lib/Overlay'

import PriceWidget from '../Plugins/priceWidget'

class ExpertiseService extends Component {
  constructor(props) {
    super(props);
    this.state = Object.assign(
      {}, this.props.data, {showWidget: false}
    )
    // TODO set initial state based on props;
  }
  toggleWidget() {
    this.setState({
      showWidget: !this.state.showWidget,
      isEnabled: true // set Enable when openPanel
    })
  }
  updatePrice(val) {
    var newValue;
    if (val == '.' && this.state.price.indexOf('.') > -1) {
      return false;
    }
    if (val == '.' && this.state.price == '') {
      newValue = '0.';
    } else if (val !== '.' && this.state.price == '0') {
      newValue = val;
    } else{
      newValue = String(this.state.price) + val;
    }
    this.setState({price: newValue});
  }
  resetPrice() {
    this.setState({price: '0'});
  }
  toggleEnabled() {
    this.setState({isEnabled: !this.state.isEnabled});
  }
  updateUnit(value) {
    this.setState({unit: value});
  }
  submitService() {
    var data = Object.assign({}, this.state);
    this.props.handleServiceItem(data);
    // hideItem;
    this.setState({showWidget: false});
    // TODO call the function to update parent state;
  }
  getLabel() {
    if (this.props.data.isEnabled) {
      return parseFloat(this.props.data.price).toFixed(2) + '/' + this.props.data.unit
    } else {
      return "Enable"
    }
  }
  render() {
    let child = (
      <PriceWidget
        {...this.state}
        updateUnit={this.updateUnit.bind(this)}
        resetPrice={this.resetPrice.bind(this)}
        updatePrice={this.updatePrice.bind(this)}
        toggleEnabled={this.toggleEnabled.bind(this)}
        submit={this.submitService.bind(this)}
      />
    );
    return (
      <div className="expertiseServiceItem">
        <span className="expertiseServiceItem__Label" ref="target" onClick={this.toggleWidget.bind(this)}>{this.getLabel()}</span>
        <Overlay
          show={this.state.showWidget}
          container={document.body}
          onHide={()=> this.setState({showWidget: false})}
          rootClose={true}
          placement="bottom" >
          {child}
        </Overlay>
      </div>
    )
  }
}

ExpertiseService.propsTypes = {
  handleServiceItem: React.PropTypes.func.isRequired,
}

// @CHANGED pass a data object only;
// ExpertisePrice.propsTypes = {
//   price: React.PropTypes.string.isRequired,
//   unit: React.PropTypes.string.isRequired,
//   currency: React.PropTypes.string.isRequired,
//   isEnabled: React.PropTypes.bool.isRequired,
// }

export default ExpertiseService;
