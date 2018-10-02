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
class NutritionDetails extends React.Component{
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
            <section>
                <header>
                    <h1>Nutrition Facts</h1>
                    <p>Serving Size 1/2 cup (about 82g)</p>
                    <p>Serving Per Container 8</p>
                </header>
                <table>
                    <thead>
                        <tr>
                            <th>Amount Per Serving</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th >
                                <b>Calories </b>200
                            </th>
                            <td>
                            Calories from Fat
                            130
                            </td>
                        </tr>
                        <tr>
                            <td></td>
                            <td className='nut-rgt-col'>
                                <b>% Daily Value*</b>
                            </td>
                        </tr>
                        <tr>
                            <th >
                                <b>Total Fat </b>14g
                            </th>
                            <td className='nut-rgt-col'>
                                <b>22%</b>
                            </td>
                        </tr>
                        <tr>
                            <th className='nut-rgt-col'>Saturated Fat 9g </th>
                            <td className='nut-rgt-col'>
                                <b>22%</b>
                            </td>
                        </tr>
                        <tr>
                            <th className='nut-rgt-col'>Trans Fat 0g</th>
                            <td className='nut-rgt-col'>
                                <b>0%</b>
                            </td>
                        </tr>
                        <tr>
                            <th >
                                <b>Cholesterol </b>55mg
                            </th>
                            <td className='nut-rgt-col'>
                                <b>18%</b>
                            </td>
                        </tr>
                        <tr>
                            <th >
                                <b>Sodium </b>40mg
                            </th>
                            <td className='nut-rgt-col'>
                                <b>2%</b>
                            </td>
                        </tr>
                        <tr>
                            <th >
                                <b>Total Carbohydrate </b>17g
                            </th>
                            <td className='nut-rgt-col'>
                                <b>6%</b>
                            </td>
                        </tr>
                        <tr>
                            <th className='nut-rgt-col'>Dietary Fiber 1g</th>
                            <td className='nut-rgt-col'>
                                <b>4%</b>
                            </td>
                        </tr>
                        <tr>
                            <th className='nut-rgt-col'>Sugars 14g</th>
                            <td className='nut-rgt-col'>
                            </td>
                        </tr>
                        <tr>
                            <th >
                            <b>Protein </b>3g
                            </th>
                        </tr>
                        <tr>
                            <td >
                                Vitamin A 10%
                            </td>
                            <td>
                                Vitamin C 0%
                            </td>
                        </tr>
                        <tr>
                            <td >
                                Calcium 10%
                            </td>
                            <td>
                                Iron 6%
                            </td>
                        </tr>
                    </tbody>
                </table>
                </section>
        </div>
        )
    }
}
export default NutritionDetails;