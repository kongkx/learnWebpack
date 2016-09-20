import React, { Component } from 'react'
import ExpertiseRecord from './expertiseRecord'

var GLOBAL_CURRENCY = "CNY";

var EXPERTISE_RECORD_TEMPLATE = {
  expertiseId: '',
  expertise: '',
  application: '',
  order: 0,
}

var SERVICE_TEMPLATE = {
  expertiseId: '',
  id: '',
  price: '0',
  unit: 'hour', // hour, case
  currency: '',
  isEnabled: false,
  type: '', // online, onsite, workplace
}

class ExpertiseTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      records: this.initialRecords()
    }
    // this.state = this.initialState();f
    // console.log(this.state);
  }
  componentWillReceiveProps(nextProps) {
    // TODO if data was passed from up level;
  }
  updateExpertise(data) {
    var records = this.state.records;
    var updateRow = data.row;
    var newRecords = [].concat(
      records.slice(0, updateRow),
      Object.assign({}, records[updateRow], data.data),
      records.slice(updateRow+1)
    );
    this.setState({records: newRecords});
  }
  updateServiceItem(data) {
    var records = this.state.records;
    var updateRow = data.row;
    var type = data.data.type;
    records[updateRow]['services'][type] = data.data;
    this.setState({records: records});
  }
  getServicesBaseObj(id) {
    id = id || "";
    return {
      online: Object.assign({}, SERVICE_TEMPLATE, { expertiseId: id, currency: GLOBAL_CURRENCY, type: 'online'}),
      onsite: Object.assign({}, SERVICE_TEMPLATE, { expertiseId: id, currency: GLOBAL_CURRENCY, type: 'onsite'}),
      workplace: Object.assign({}, SERVICE_TEMPLATE, { expertiseId: id, currency: GLOBAL_CURRENCY, type: 'workplace'})
    }
  }
  initialRecords() {
    var that = this;
    var deltaRows, records;
    var expertises = this.props.data.expertiseRecords;
    var services = [].concat(this.props.data.services);

    records = expertises.map(function(expertise) {
      var serviceBase = that.getServicesBaseObj(expertise.expertiseId);
      services.forEach(function(service) {
        if (service.expertiseId == expertise.expertiseId) {
            serviceBase[service.type] = service;
        }
      });
      // map services;
      return Object.assign({}, expertise, {services: serviceBase});
    })

    records.sort(function(prev, next) { return prev.order > next.order});
    // add delta;
    deltaRows = this.props.initRows - expertises.length;
    for (var i = 0; i< deltaRows; i++) {
      records.push(
        Object.assign({},EXPERTISE_RECORD_TEMPLATE,{services: this.getServicesBaseObj()})
      );
    }
    return records;
  }
  render() {
    var that = this;
    return (
      <div className="expertiseTable">
        <div className="expertiseTable__head">
        <div className="expertiseTable__cell expertiseTable__cell_expertise">
          <div className="expertiseDesc">
            <div className="expertiseDesc__field">Services</div>
            <div className="expertiseDesc__field">Relate to events or business</div>
            <div className="expertiseDesc__button">Btn</div>
          </div>
        </div>
        <div className="expertiseTable__cell expertiseTable__cell_serviceItem">
            <div className="expertiseServices" >
                <div className="expertiseServiceItem">On-line</div>
                <div className="expertiseServiceItem">On-site</div>
                <div className="expertiseServiceItem">Workplace</div>
            </div>
        </div>
        </div>
        { this.state.records.map(function(row, index) {
          return <ExpertiseRecord
              key={'expertiserRecord' + index}
              data={row}
              row = {index}
              updateExpertise={that.updateExpertise.bind(that)}
              updateServiceItem={that.updateServiceItem.bind(that)}
            />
        })}
      </div>
    )
  }
}

ExpertiseTable.propTypes = {
  initRows: React.PropTypes.number.isRequired
}

export default ExpertiseTable
