import React, { Component } from 'react'

import ExpertiseDesc from './expertiseDesc'
import ExpertiseService from './expertiseService'


class ExpertiseRecord extends Component {
  handleExpertise(data) {
    var row = this.props.row;
    this.props.updateExpertise({
      row: row,
      data: data
    })
  }
  handleServiceItem(data) {
    var row = this.props.row;
    this.props.updateServiceItem({
      row: row,
      data:data
    });
  }
  render() {
    return (
    <div className="expertiseTable__row expertiseRecord">
        <div className="expertiseTable__cell expertiseTable__cell_expertise">
          <ExpertiseDesc onSubmit={this.handleExpertise.bind(this)} data={this.props.data} />
        </div>
        <div className="expertiseTable__cell expertiseTable__cell_serviceItem">
          <div className="expertiseServices">
            <ExpertiseService data={this.props.data.services.online} handleServiceItem={this.handleServiceItem.bind(this)}/>
            <ExpertiseService data={this.props.data.services.onsite} handleServiceItem={this.handleServiceItem.bind(this)}/>
            <ExpertiseService data={this.props.data.services.workplace} handleServiceItem={this.handleServiceItem.bind(this)}/>
          </div>
        </div>
    </div>
    )
  }
}

ExpertiseRecord.propTypes = {
  data: React.PropTypes.object.isRequired,
  updateExpertise: React.PropTypes.func.isRequired,
  updateServiceItem: React.PropTypes.func.isRequired,
}

export default ExpertiseRecord
