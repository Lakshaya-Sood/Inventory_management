import React from 'react';
import { FuiForm, Input, Button, Datepicker, SnackBar } from 'ssp-ui';
import cloneDeep from 'lodash/cloneDeep';
import axios from 'axios';
import { Card, CardHeader, CardText } from 'material-ui/Card';
import LinearProgress from 'material-ui/LinearProgress';
import IngredientsTable from './ingredientsTable';
import NutritionDetails from './nutritionDetails';
const TypeOfRecipe = [
  { code: 'Bread', name: 'Bread' },
  { code: 'Breakfast', name: 'Breakfast' },
  { code: 'Dessert', name: 'Dessert' },
  { code: 'Drink', name: 'Drink' },
  { code: 'Side Dish', name: 'Side Dish' },
  { code: 'Snacks', name: 'Snacks' },
  { code: 'Pies', name: 'Pies' },
  { code: 'Main Dishes', name: 'Main Dishes' },
  { code: 'Starter', name: 'Starter' }
],
  BrandsList = [
    { code: 'Le Grand Comptoir', name: 'Le Grand Comptoir' },
    { code: 'Upper Crust', name: 'Upper Crust' },
    { code: 'Caffè Ritazza', name: 'Caffè Ritazza' },
    { code: 'Starbucks', name: 'Starbucks' },
    { code: 'Burger King', name: 'Burger King' },
    { code: 'YO! Sushi', name: 'YO! Sushi' },
    { code: 'Le Train Bleu', name: 'Le Train Bleu' },
    { code: 'Main Dishes', name: 'Main Dishes' },
    { code: 'Walter', name: 'Walter' }
  ],
  StoreList = [
    { code: 'Airport Store', name: 'Airport Store' },
    { code: 'Railway Store', name: 'Railway Store' },
    { code: 'Mini Store', name: 'Mini Store' },
    { code: 'Doorstep Delivery Store', name: 'Doorstep Delivery Store' }
  ],
  UnitsList = [
    { code: 'WT_gr', name: 'Grain' },
    { code: 'WT_g', name: 'Grams' },
    { code: 'WT_kg', name: 'Kilogram' },
    { code: 'WT_mg', name: 'Miligram' }
  ],
  LocationList = [
    { code: 'London', name: 'London' },
    { code: 'Tokyo', name: 'Tokyo' },
    { code: 'Melbourne', name: 'Melbourne' },
    { code: 'Montreal', name: 'Montreal' },
    { code: 'Paris', name: 'Paris' },
    { code: 'Munich', name: 'Munich' },
    { code: 'Berlin', name: 'Berlin' },
    { code: 'Zurich', name: 'Zurich' }
  ],
  UnitOfTime = [
    { code: 'Days', name: 'Days' },
    { code: 'Hours', name: 'Hours' },
    { code: 'Minutes', name: 'Minutes' },
    { code: 'Seconds', name: 'Seconds' }
  ],
  initialState = {
    canSubmit: false,
    recipeName: '',
    brandName: '',
    typeOfRecipe: '',
    StoreList: [],
    yieldValue: 0,
    unitOfMeasurementForYield: '',
    location: [],
    singleProductYield: 0,
    unitOfMeasurementForSingleProduct: '',
    preprationTime: '00:00:00:00',
    preprationTimeUnitsOrder: ['Days', 'Hours', 'Minutes', 'Seconds'],
    loading: false
  },
  cardStyle = {
    backgroundColor: '#fff !important',
    fontFamily: 'arial',
    color: '#002D72',
    fontSize: '20px',
    fontWeight: 'normal'
  }

class recipeLayout extends React.Component {
  constructor(props) {
    super(props);
    this.state = cloneDeep(initialState)
    this.resetForm = this.resetForm.bind(this);
    this.enableButton = this.enableButton.bind(this);
    this.disableButton = this.disableButton.bind(this);
    this.InputFieldChange = this.InputFieldChange.bind(this);
    this.submit = this.submit.bind(this);
    this.showSuccess = this.showSuccess.bind(this);
  }

  enableButton() {
    this.setState({
      canSubmit: true
    })
  }

  resetForm() {
    this.setState(cloneDeep(initialState));
  }

  disableButton() {
    this.setState({
      canSubmit: false
    })
  }

  showSuccess() {
    this.refs['snackbar'].success('Recipe Created Succesfully')
  }

  submit(model) {
    console.log('submitted', model)
    axios.post('http://localhost:30001/am/api/loginOfbiz', model)
      .then((response) => {
        this.showSuccess()
        this.resetForm()
      })
      .catch((error) => {
        this.resetForm()
      });
    this.setState({ loading: true })
  }

  InputFieldChange(value, property) {
    this.setState({ [property]: value })
  }

  getDropDownOptions(list) {
    var options = []
    list.forEach((element) => {
      options.push(React.createElement('option', { value: element.code }, element.name))
    })
    return options
  }

  render() {
    let { canSubmit, recipeName, brandName, typeOfRecipe, storeType, yieldValue,
      unitOfMeasurementForYield, location, singleProductYield, unitOfMeasurementForSingleProduct,
      preprationTime, preprationTimeUnitsOrder, loading } = this.state;

    return (
      <div>
        <p className='product-creation-heading-main'>Recipe Creation</p>
        <SnackBar ref='snackbar' duration='1000000' style={{ left: '92%', top: '60px' }} />
        <Card
          showExpandableButton={true}
          expanded={true}>
          <CardHeader title="Create Recipe (details)" titleStyle={cardStyle} showExpandableButton={false} />
          <CardText expandable={true}>
            <FuiForm ref='form' onValidSubmit={this.submit} onValid={this.enableButton} onInvalid={this.disableButton}>
              <div className='container-fluid'>
                <div className='col-xs-12 col-md-12 col-lg-12'>
                  <div className='row'>
                    <Input
                      name='recipeName'
                      className='col-xs-12 col-md-5 col-lg-4'
                      title='Recipe Name'
                      placeholder='Enter Recipe Name'
                      onChange={(val) => this.InputFieldChange(val, 'recipeName')}
                      value={recipeName} />
                    <div className='col-md-1 col-lg-2'></div>
                    <Input
                      name='brandName'
                      type='multiselect'
                      multiple={false}
                      value={brandName}
                      onChange={(val) => this.InputFieldChange(val, 'brandName')}
                      title='Brand Name'
                      disabled='false'
                      label='Enter Brand Name'
                      className='col-xs-12 col-md-5 col-lg-4'
                      options={this.getDropDownOptions(BrandsList)} />
                    <div className='col-md-1 col-lg-2'></div>
                  </div>
                </div>
                <div className='col-xs-12 col-md-12 col-lg-12'>
                  <div className='row'>
                    <Input
                      name='typeOfRecipe'
                      type='multiselect'
                      multiple={false}
                      value={typeOfRecipe}
                      onChange={(val) => this.InputFieldChange(val, 'typeOfRecipe')}
                      title='Type Of Recipe'
                      disabled='false'
                      label='Type Of Recipe'
                      className='col-xs-12 col-md-5 col-lg-4'
                      options={this.getDropDownOptions(TypeOfRecipe)} />
                    <div className='col-md-1 col-lg-2'></div>
                    <Input
                      name='storeType'
                      type='multiselect'
                      multiple={true}
                      value={storeType}
                      onChange={(val) => this.InputFieldChange(val, 'storeType')}
                      title='Select Store'
                      disabled='false'
                      label='Select Store'
                      className='col-xs-12 col-md-5 col-lg-4'
                      options={this.getDropDownOptions(StoreList)} />
                    <div className='col-md-1 col-lg-2'></div>
                  </div>
                </div>
                <div className='col-xs-12 col-sm-12 col-md-12 col-lg-12'>
                  <div className='row'>
                    <div className='col-md-6 col-lg-6'></div>
                    <Input
                      name='location'
                      type='multiselect'
                      multiple={true}
                      value={location}
                      onChange={(val) => this.InputFieldChange(val, 'location')}
                      title='Location'
                      disabled='false'
                      label='Enter Location'
                      className='col-xs-12 col-md-5 col-lg-4'
                      options={this.getDropDownOptions(LocationList)} />
                    <div className='col-md-1 col-lg-2'></div>
                  </div>
                </div>
                <div className='col-xs-12 col-sm-12 col-md-12 col-lg-12'>
                  <div className='row'>
                    <Input
                      name='yieldValue'
                      title='Yield'
                      className='col-xs-12 col-sm-6 col-md-5 col-lg-4'
                      placeholder='Enter Yield'
                      onChange={(val) => this.InputFieldChange(val, 'yieldValue')}
                      value={yieldValue} />
                    <div className='col-md-1 col-lg-2'></div>
                    <Input
                      name='unitOfMeasurementForYield'
                      type='multiselect'
                      multiple={false}
                      value={unitOfMeasurementForYield}
                      onChange={(val) => this.InputFieldChange(val, 'unitOfMeasurementForYield')}
                      title='Unit Of Measurement'
                      disabled='false'
                      label='Unit Of Measurement'
                      className='col-xs-12 col-sm-6 col-md-5 col-lg-4'
                      options={this.getDropDownOptions(UnitsList)} />
                  </div>
                </div>
                <div className='col-xs-12 col-sm-12 col-md-12 col-lg-12'>
                  <div className='row'>
                    <Input
                      name='singleProductYield'
                      title='Single Product Yield'
                      className='col-xs-12 col-sm-6 col-md-5 col-lg-4'
                      placeholder='Enter Single Product Yield'
                      onChange={(val) => this.InputFieldChange(val, 'singleProductYield')}
                      value={singleProductYield} />
                    <div className='col-md-1 col-lg-2'></div>
                    <Input
                      name='unitOfMeasurementForSingleProduct'
                      type='multiselect'
                      multiple={false}
                      value={unitOfMeasurementForSingleProduct}
                      onChange={(val) => this.InputFieldChange(val, 'unitOfMeasurementForSingleProduct')}
                      title='Unit Of Measurement'
                      disabled='false'
                      label='Unit Of Measurement'
                      className='col-xs-12 col-sm-6 col-md-5 col-lg-4'
                      options={this.getDropDownOptions(UnitsList)} />
                  </div>
                </div>
                <div className='col-xs-12 col-sm-12 col-md-12 col-lg-12'>
                  <div className='row'>
                    <Input
                      name='preprationTime'
                      title='Prepration Time'
                      className='col-xs-12 col-sm-6 col-md-5 col-lg-4'
                      placeholder='Enter Prepration '
                      onChange={(val) => this.InputFieldChange(val, 'preprationTime')}
                      value={preprationTime} />
                    <div className='col-md-1 col-lg-2'></div>
                    <Input
                      name='preprationTimeUnitsOrder'
                      type='multiselect'
                      multiple={true}
                      value={preprationTimeUnitsOrder}
                      onChange={(val) => this.InputFieldChange(val, 'preprationTimeUnitsOrder')}
                      title='Units'
                      disabled='false'
                      label='Units'
                      className='col-xs-12 col-sm-6 col-md-5 col-lg-4'
                      options={this.getDropDownOptions(UnitOfTime)} />
                  </div>
                </div>
                <div className='row'>
                  <CardHeader className='col-xs-12 col-md-12 col-lg-12' title="Additional Recipe Details" showExpandableButton={false} titleStyle={cardStyle} />
                  <CardText>
                    <Card className='col-xs-12 col-md-12 col-lg-11'>
                      <CardHeader title="Recipe Formula" actAsExpander={true} showExpandableButton={true} actAsExpander={true} titleStyle={cardStyle} />
                      <CardText expandable={true}><IngredientsTable /></CardText>
                    </Card>
                    <Card className='col-xs-12 col-md-12 col-lg-11'>
                      <CardHeader title="Labour Cost" actAsExpander={true} showExpandableButton={true} actAsExpander={true} titleStyle={cardStyle} />
                      <CardText expandable={true}>---Content---</CardText>
                    </Card>
                    <Card className='col-xs-12 col-md-12 col-lg-11'>
                      <CardHeader title="Describe Procedure" actAsExpander={true} showExpandableButton={true} actAsExpander={true} titleStyle={cardStyle} />
                      <CardText expandable={true}>---Content---</CardText>
                    </Card>
                    <Card className='col-xs-12 col-md-12 col-lg-11'>
                      <CardHeader title="Nutrition Details" actAsExpander={true} showExpandableButton={true} actAsExpander={true} titleStyle={cardStyle} />
                      <CardText expandable={true}><NutritionDetails /></CardText>
                    </Card>
                    <Card className='col-xs-12 col-md-12 col-lg-11'>
                      <CardHeader title="Allergen Details" actAsExpander={true} showExpandableButton={true} actAsExpander={true} titleStyle={cardStyle} />
                      <CardText expandable={true}>---Content---</CardText>
                    </Card>
                  </CardText>
                </div>
                <br />
                <div className='row'>
                  <div className='col-xs-7 col-md-8 col-lg-8'>
                  </div>
                  <div className='col-xs-5 col-md-4 col-lg-4'>
                    <Button label='Clear' className="fab-btn fab-btn-ghost" onClick={this.resetForm} type='button' />
                    {loading ? <LinearProgress mode="indeterminate" style={{ height: '12px', width: '50%', display: 'inline-block', marginLeft: '26px' }} /> :
                      <Button label='Create Recipe' fuiStyle='primary' onClick={this.submit} disabled={!canSubmit} type='submit' style={{ marginLeft: '25px' }} />}
                  </div>
                </div>
              </div>
            </FuiForm>
          </CardText>
        </Card>
      </div>
    )
  }
}

export default recipeLayout
