import React, { PropTypes, Component } from 'react';
import {FuiForm, Input, Checkbox, Button, Datepicker, Select, TimePicker, Dropdown, SnackBar, Panel } from 'ssp-ui';
import cloneDeep from 'lodash/cloneDeep';
import axios from 'axios';
import Paper from 'material-ui/Paper';

const UnitsList = [
    { code: 'WT_gr', name: 'Grain' },
    { code: 'WT_g', name: 'Grams' },
    { code: 'WT_kg', name: 'Kilogram' },
    { code: 'WT_mg', name: 'Miligram' }
],
paperStyle = {
  paddingBottom:'15px',
  margin: 15,
  display: 'inline-block',
},
code = [
  'A','B','C','D','E','F','G','H','I','J'
],
initialState = {
  canSubmit: false,
  releaseDate: new Date(),
  discontinuationDate: new Date(),
  internalName: '',
  productName:'',
  unitOfMeasurement: '',
  brandName: '',
  information: '',
  productWeight: '',
  productID:getRandomId()
}

function getRandomInt(min=100000,max=999999) {
  return Math.floor(min + Math.random() * Math.floor(max));
}

function getRandomId(){
  let first = getRandomInt(0,9),
      last = getRandomInt();
  return code[ first ] + last
}

class SampleForm extends React.Component{
  constructor(props){
    super(props);
    this.state = cloneDeep(initialState)
    this.resetForm = this.resetForm.bind(this);
    this.enableButton = this.enableButton.bind(this);
    this.disableButton = this.disableButton.bind(this);
    this.InputFieldChange = this.InputFieldChange.bind(this);
    this.submit = this.submit.bind(this);
    this.showSuccess = this.showSuccess.bind(this);
  }

  enableButton () {
    this.setState({
      canSubmit: true
    })
  }

  resetForm(){
    this.setState({
      ...cloneDeep(initialState),
      productID: getRandomId()
    })
  }

  disableButton () {
    this.setState({
      canSubmit: false
    })
  }

  showSuccess(){
    this.refs['snackbar'].success('Product Created Succesfully')
  }

  submit () {
    console.log('submitted')
    let model = cloneDeep(this.state)
    delete model[canSubmit];
    axios.post('http://localhost:30001/am/api/loginOfbiz',model)
    .then((response ) => {
      this.showSuccess()
    })
    .catch((error)=>{
      
    });
  }

  InputFieldChange(value,property){
    switch( property ) {
      case 'productName':
        let { internalName, brandName, productName } = this.state;
        if(!(internalName && brandName) || (internalName==productName && brandName==productName)) {
          this.setState({
            productName:value,
            internalName:value,
            brandName:value
          })
          break;
        }
      default:
        this.setState({[property]:value})
        break;
    }
    
  }

  getUnitsOfMeasurementOptions () {
    var options = []
    UnitsList.forEach((element) => {
      options.push(React.createElement('option', {value: element.code}, element.name))
    })
    return options
  }

  render () {
    let { canSubmit, productName, internalName, brandName, unitOfMeasurement, releaseDate, discontinuationDate, information, productID, productWeight } = this.state;

    return (
      <section>
        <SnackBar ref='snackbar' duration='4000' />
        <p className='product-creation-heading-main'>Product Creation</p>
        <div className='row'>
        <Paper style={paperStyle} zDepth={3} rounded={false} >
          <p className = 'header'>Create Product (basic details)</p>
          <FuiForm ref='form' onValidSubmit={this.submit} onValid={this.enableButton} onInvalid={this.disableButton}>
        
            <div className='col-xs-12'>
              <div className='row'>
              <Input
                  name='productID'
                  className='col-xs-4'
                  title='Product ID'
                  placeholder='Enter Product ID'
                  onChange={(val)=>this.InputFieldChange(val,'productID')}
                  disabled={true}
                  value={productID}/>
                  <div className='col-xs-2'></div>
                <Input
                  name='productName'
                  title='Product Name'
                  className='col-xs-4'
                  onChange={(val)=>this.InputFieldChange(val,'productName')}
                  value={productName}
                  placeholder='Enter Product Name'/>
                  <div className='col-xs-2'></div>
              </div>
            </div>
            <div className='col-xs-12'>
              <div className='row'>
              <Input
                  name='internalName'
                  className='col-xs-4'
                  title='Internal Name'
                  placeholder='Enter Product Internal Name'
                  onChange={(val)=>this.InputFieldChange(val,'internalName')}
                  value={internalName}/>
                   <div className='col-xs-2'></div>
                <Input
                  name='brandName'
                  title='Brand Name'
                  className='col-xs-4'
                  placeholder='Enter Brand Name'
                  onChange={(val)=>this.InputFieldChange(val,'brandName')}
                  value={brandName}
                  placeholder='Enter Brand Name'/>
                   <div className='col-xs-2'></div>
              </div>
            </div>
            <div className='col-xs-12'>
              <div className='row'>
              <Input
                  name='productWeight'
                  title='Product Weight'
                  className='col-xs-2'
                  placeholder='Enter Product Weight'
                  onChange={(val)=>this.InputFieldChange(val,'productWeight')}
                  value={productWeight}
                  placeholder='Enter Product Weight'/>
              <Input
              name='UnitOfMeasurement'
              type='multiselect'
              multiple={false}
              value={unitOfMeasurement}
              onChange={(val)=>this.InputFieldChange(val,'unitOfMeasurement')}
              title='Unit Of Measurement'
              disabled='false'
              label='Unit Of Measurement'
              className='col-xs-2'
              options={this.getUnitsOfMeasurementOptions()}/>
            <div className='col-xs-2'></div>
             <Datepicker
              className='col-xs-2'
              time={false}
              name='ReleaseDate'
              value={releaseDate}
              onChange={(val)=>this.InputFieldChange(val,'releaseDate')}
              label='Release Date'
              labelStyle={{fontWeight: 'normal'}}/>

            <Datepicker
              time={false}
              className='col-xs-2'
              name='DiscontinuationDate'
              value={discontinuationDate}
              onChange={(val)=>this.InputFieldChange(val,'discontinuationDate')}
              label='Discontinuation Date'
              labelStyle={{fontWeight: 'normal'}}/>
              </div>
            </div>
            <div className='col-xs-12'>
            <div className='row'>
            <Input
              type='textarea'
              name='information'
              title='Information about the product'
              value={information}
              onChange={(val)=>this.InputFieldChange(val,'information')}
              className='col-xs-4'
              placeholder='Enter information'
              labelColor='#1a3b7a'
               required />
               </div>
               </div>
          </FuiForm>
            <div style={{'width':'100%'}}>'
                <Panel title='Additional Product Details'>
                  <Panel title='Nutrition Details' fuiStyle='info'>
                 
                Item1
                Item2
                  </Panel> 
                  <Panel title='Allergen Details' fuiStyle='info'>
                  Item1
                Item2
                  </Panel>
                  <Panel title='Cost Details' fuiStyle='info'>
                  Item1
                Item2
                  </Panel>
                  <Panel title='Other Details' fuiStyle='info'>
                  Item1
                Item2
                  </Panel>
                </Panel>
            </div>
            <div className='row'>
              <div className='col-xs-2'>
                  <Button label='Clear' fuiStyle='primary' onClick={this.resetForm} type='button' style={{marginLeft:'55px'}}/>
              </div>
              <div className='col-xs-8'>
              </div>
              <div className='col-xs-2'> 
                <Button label='Create Product' fuiStyle='primary' onClick={this.submit} disabled={!canSubmit} type='button'/> 
              </div>
            </div>
          </Paper>
        </div>

      </section>
    )
  }
}

export default SampleForm
