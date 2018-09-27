// In a nutshell, components are supposed to be concerned only with displaying stuff.
// The only place they are supposed to get information from is their props.
// data and event handler functions should come as props
// layout components should be stateless
// purpose is to group all other components in the page together
import React, { Component } from 'react';
import { GridList, GridTile } from 'material-ui/GridList';
import { Tabs, Tab } from 'material-ui';
import { Button } from 'ssp-ui';
import Add from 'material-ui/svg-icons/content/add';


export default class RecipeLayout extends Component {
  constructor(props)
  {
    super(props);
    this.state = {
      sortDir: 1,
      showAll: false,
      currentTab: 'detail',
      openModal: false,
      exportTemplate: false,
      deleteTemplate: false,
      makeCopy: false,
      currentKey: '',
      currentTemplate: '',
      currentTemplateName: ''
    };
    this.onTabChange = this.onTabChange.bind( this );
    this.handleNewBtnClick = this.handleNewBtnClick.bind( this );
  }

  onTabChange( tab ) {
    this.setState({
      currentTab: tab
    })
    
  }

  handleNewBtnClick()
  {
    
  }

  updateUrl( value, countryCode ) {
   // commonClientUtils.updateUrlLandingPage( value, countryCode );
  }

  renderNewButton() {
    return <Button
      icon={<Add/>}
      id='msp-create-new-template-btn'
      size='large'
      label='Create New Recipe'
      fuiStyle='primary'
      onClick={this.handleNewBtnClick}
      title='Create New Recipe'>
    </Button>
  }

  render () {
    let countryCode = 'de';
    return (
      <div>
        <GridList cellHeight={'auto'} className='msp-header-grid-list' cols={12}>
          <GridTile id='msp-header' cols={5}>
            <Tabs id='msp-template-tabs' tabItemContainerStyle={{ backgroundColor: 'transparent' }} onChange={this.onTabChange}
              inkBarStyle={{ backgroundColor: '#0099FF' }} value = {this.state.currentTab} >
              <Tab className='msp-header-tab' id='msp-poster-tab' label='Recipe Details' value='detail' onClick = {this.updateUrl.bind( this, 'poster', countryCode )}/>
              {/* <Tab className='msp-header-tab' id='msp-shelf-tab'  label='Ingredients' value='shelf' onClick = {this.updateUrl.bind( this, 'set', countryCode )}/> */}
              <Tab className='msp-header-tab' id='msp-article-tab' label='Nutritional value' value='nutrition' onClick = {this.updateUrl.bind( this, 'label', countryCode )}/>
              <Tab className='msp-header-tab' id='msp-inventory-tab' label='Allergens' value='allergen' onClick = {this.updateUrl.bind( this, 'inventory', countryCode )}/>
            </Tabs>
          </GridTile>
          <GridTile cols={4}></GridTile>
          <GridTile className='msp-header-grid-tile-btns' cols={3}>
            {this.renderNewButton()}
          </GridTile>
        </GridList>
        
      </div>
    )
  }
  }

