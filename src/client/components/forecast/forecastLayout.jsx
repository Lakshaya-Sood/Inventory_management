import React from 'react';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

const Units = ['cup','teaspoon','gm','lt'],
    TextFieldStyle = {
        labelStyle:{
            color: 'rgba(0, 38, 65, 0.95)'
        },
        underlineStyle: {
            borderColor: 'rgba(0, 38, 65, 0.95)'
        }
    },
    SelectFieldStyle = {
        top:'15px',
        left: '15px'
    }
class ForecastLayout extends React.Component{
    constructor(props){
        super(props);
        
        this.state={
            freeze: false,
            servingSize: 0,
            servingUnit: 'gm',
        }
        this.handleInputChange = this.handleInputChange.bind(this);
    }
    handleInputChange(val,property){
        this.setState({[property]:val})
    }
    render(){
        let self = this,
            { servingSize, servingUnit } = this.state;
        return(
        <div>
            <TextField
                id="serving-size-input"
                floatingLabelText="Serving Size"
                hintText="Serving Size"
                value={servingSize}
                underlineStyle={TextFieldStyle.labelStyle}
                floatingLabelStyle={TextFieldStyle.labelStyle}
                underlineFocusStyle={TextFieldStyle.underlineStyle}
                onChange={(event)=>{self.handleInputChange(event.target.value,'servingSize')}}
            />
            <SelectField value={servingUnit} floatingLabelText="Serving Unit" floatingLabelStyle={TextFieldStyle.labelStyle} style={SelectFieldStyle} onChange={(event)=>self.handleInputChange(event.target.textContent,'servingUnit')}>
                {
                    Units.map((ele)=>{
                        return(<MenuItem value={ele} primaryText={ele} />)
                    })
                }
            </SelectField>
        </div>
        )
    }
}
export default ForecastLayout;