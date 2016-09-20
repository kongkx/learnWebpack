import React, { Component } from 'react'
import ExpertiseTable from './expertiseTable'

var initialState = {
  expertiseRecords: [
    {
      expertiseId: 1,
      expertise: "Cooking",
      application: 'Dinner',
      order: 0
    },
    {
      expertiseId: 2,
      expertise: 'Graphics',
      application: 'Ceremony',
      order: 1
    },
    {
      expertiseId: '',
      epxertise: '',
      application: '',
      order: 2
    }
  ],
  services: [
    {
      id: 1,
      expertiseId: 1,
      price: 20.00,
      unit: 'hour',
      currency: 'CNY',
      isEnabled: true,
      type: 'online'
    }
  ]
}

class ExpertiseBlock extends Component {
  updateExpertise(data) {

  }
  updateServiceItem(data) {

  }
  constructor(props) {
    super(props);
    this.state = initialState;
  }

  render() {
    var that = this;
    return (
      <div className="bioBlock bioBlock_expertise">
        <div className="bioBlock__header">
          <h2 className="bioBlock__title">Expertise</h2>
          <div className="bioBlock__hint">List in what operations you are most expertised.</div>
        </div>
        <div className="bioBlock__content">
          <ExpertiseTable
            data={this.state}
            handleExpertise={this.updateExpertise.bind(this)}
            handleServiceItem={this.updateServiceItem.bind(this)}
            initRows={5}
            />
        </div>
      </div>
    )
  }
}

export default ExpertiseBlock
