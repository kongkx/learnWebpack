import React, { Component } from 'react'

class CareerRecord extends Component {
  render() {
    console.log(this.props);
    return (
      <div className="careerRecord" data-record-id={this.props.id}>
        <p>{this.props.organization}</p>
        <p>{this.props.jobTitle}</p>
        <p>{this.props.achievement}</p>
        <p>{this.props.from}--{this.props.to}</p>
      </div>
    )
  }
}

class CareerList extends Component {

  render() {
    var that = this;
    return (
      <div>
        {
          this.props.records.map(function(record){
            return (<CareerRecord {...record} key={record.id} />)
          })
        }
      </div>
    )
  }
}

export default CareerList
