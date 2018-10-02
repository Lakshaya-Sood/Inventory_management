import React from 'react';
import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
  } from 'material-ui/Table';
import ContentDelete from 'material-ui/svg-icons/content/delete-sweep';
import ContentEdit from 'material-ui/svg-icons/content/create';
import ContentSave from 'material-ui/svg-icons/content/save';
import ContentCancel from 'material-ui/svg-icons/navigation/cancel';
import SelectField from 'material-ui/SelectField';
import cloneDeep from 'lodash/cloneDeep';
import MenuItem from 'material-ui/MenuItem';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import TextField from 'material-ui/TextField';

const iconStyle = {
    deleteIcon: {
        width: 35,
        height: 31,
        margin: 0
    },
    editIcon: {
        width: 35,
        height: 31,
        margin: 0
    },
    saveIcon: {
        width: 35,
        height: 31,
        margin: 0
    },
    cancelIcon: {
        width: 35,
        height: 31,
        margin: 0
    },
    addIcon: {
        width: 40,
        height: 40,
        marginTop: 5
    }
},
underlineStyle= {
            borderColor: 'rgba(0, 38, 65, 0.95)'
},
products = ['Tomatoes','Salt','Pepper','Milk','Butter','Cheese','Walnut','Cream'],
units = ['ml','lt','gm','kg'];
class IngredientsTable extends React.Component{
    constructor(props){
        super(props);
        let data = [
            {
                productName: 'Milk',
                qty: '10',
                unit: 'lt',
                percent: '20',
                cost: '400',
                costPercent: '35',
                editMode: false
            },
            {
                productName: 'Walnut',
                qty: '1',
                unit: 'kg',
                percent: '20',
                cost: '1200',
                costPercent: '34',
                editMode: false
            }
        ]
        this.state={
            data,
            currentEditMode: null,
            currentValues: null
        }
        this.editRow = this.editRow.bind(this);
        this.deleteRow = this.deleteRow.bind(this);
        this.saveRow = this.saveRow.bind(this);
        this.cancelRow = this.cancelRow.bind(this);
        this.handleEditChanges = this.handleEditChanges.bind(this);
        this.addRow = this.addRow.bind(this);
    }
    editRow(index){
        let { data, currentEditMode } = this.state;
        if( currentEditMode !== null ){
            data[currentEditMode]['editMode'] = false;
        }
        data[index]['editMode'] = true;
        this.setState({
            data,
            currentEditMode: index,
            currentValues: cloneDeep(data[index])
        }) 
    }
    deleteRow(index){
        let { data } = this.state;
        data.splice(index, 1);
        this.setState({ data })
    }
    saveRow(index){
        let { data, currentValues } = this.state;
        data[index] = cloneDeep(currentValues);
        data[index]['editMode'] = false
        this.setState({
            data,
            currentEditMode: null,
            currentValues: null
        })
    }
    cancelRow(index){
        let { data } = this.state;
        data[index]['editMode'] = false;
        this.setState({
            data,
            currentEditMode: null,
            currentValues: null
        })
    }
    handleEditChanges(val,property){
        let { currentValues } = this.state;
        currentValues[property] = val;
        this.setState({currentValues})
    }
    addRow(){
        let newRow = {
            productName: 'Walnut',
            qty: '1',
            unit: 'kg',
            percent: '20',
            cost: '1200',
            costPercent: '34',
            editMode: true
        },
        { data, currentEditMode } = this.state;
        if( currentEditMode !== null ){
            data[currentEditMode]['editMode'] = false;
        }
        data.push(cloneDeep(newRow));
        this.setState({
            data,
            currentEditMode: data.length - 1,
            currentValues: cloneDeep(newRow)
        })
    }
    renderRows(item,index,self){
        if( item.editMode ) {
            let { currentValues } = this.state;
            return(
                <TableRow>
                    <TableRowColumn>
                        <SelectField value={currentValues.productName} onChange={(event)=>self.handleEditChanges(event.target.textContent,'productName')}>
                            {
                                products.map((ele)=>{
                                    return(<MenuItem value={ele} primaryText={ele} />)
                                })
                            }
                        </SelectField>
                    </TableRowColumn>
                    <TableRowColumn>
                        <TextField id="quantity-input" value={currentValues.qty} onChange={(event)=>self.handleEditChanges(event.target.value,'qty')} underlineFocusStyle={underlineStyle}/>
                    </TableRowColumn>
                    <TableRowColumn>
                        <SelectField value={currentValues.unit} onChange={(event)=>self.handleEditChanges(event.target.textContent,'unit')}>
                            {
                                units.map((ele)=>{
                                    return(<MenuItem value={ele} primaryText={ele} />)
                                })
                            }
                        </SelectField>
                    </TableRowColumn>
                    <TableRowColumn>
                        <TextField id="percent-input" value={currentValues.percent} onChange={(event)=>self.handleEditChanges(event.target.value,'percent')} underlineFocusStyle={underlineStyle}/>
                    </TableRowColumn>
                    <TableRowColumn>
                        <TextField id="cost-input" value={currentValues.cost} onChange={(event)=>self.handleEditChanges(event.target.value,'cost')} underlineFocusStyle={underlineStyle}/>
                    </TableRowColumn>
                    <TableRowColumn>
                        <TextField id="costPercent-input" value={currentValues.costPercent} onChange={(event)=>self.handleEditChanges(event.target.value,'costPercent')} underlineFocusStyle={underlineStyle}/>
                    </TableRowColumn>
                    <TableRowColumn>
                        <ContentSave style={iconStyle.saveIcon} onClick={() => self.saveRow(index)} />
                        <ContentCancel style={iconStyle.cancelIcon} onClick={() => self.cancelRow(index)} />
                   </TableRowColumn>
                </TableRow>
            )
        } else {
            return(
                <TableRow>
                    <TableRowColumn>{item.productName}</TableRowColumn>
                    <TableRowColumn>{item.qty}</TableRowColumn>
                    <TableRowColumn>{item.unit}</TableRowColumn>
                    <TableRowColumn>{item.percent}</TableRowColumn>
                    <TableRowColumn>{item.cost}</TableRowColumn>
                    <TableRowColumn>{item.costPercent}</TableRowColumn>
                    <TableRowColumn>
                        <ContentEdit style={iconStyle.editIcon} onClick={() => self.editRow(index)} />
                        <ContentDelete style={iconStyle.deleteIcon} onClick={() => self.deleteRow(index)} />            
                    </TableRowColumn>
                </TableRow>
            )
        }

    }
    render(){
    let self = this,
        { data } = this.state
        return(
            <div>
                <Table>
                    <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                    <TableRow>
                        <TableHeaderColumn>Product Name</TableHeaderColumn>
                        <TableHeaderColumn>Quantity</TableHeaderColumn>
                        <TableHeaderColumn>Unit</TableHeaderColumn>
                        <TableHeaderColumn>Percent</TableHeaderColumn>
                        <TableHeaderColumn>Cost</TableHeaderColumn>
                        <TableHeaderColumn>Cost Percent</TableHeaderColumn>
                        <TableHeaderColumn>Actions</TableHeaderColumn>
                    </TableRow>
                    </TableHeader>
                    <TableBody displayRowCheckbox={false}>
                        {data.map((item,index)=>self.renderRows(item,index,self))}
                    </TableBody>
                </Table>
                <FloatingActionButton onClick={self.addRow} backgroundColor={'rgba(0, 38, 65, 0.95)'}>
                    <ContentAdd style={iconStyle.addIcon}/>
                </FloatingActionButton>
            </div>
        )
    }
}
export default IngredientsTable;