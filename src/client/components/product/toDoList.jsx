import React from 'react';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import ContentDelete from 'material-ui/svg-icons/content/delete-sweep';
import ContentEdit from 'material-ui/svg-icons/content/create';
import SvgIcon from 'material-ui/SvgIcon';
import { List, ListItem } from 'material-ui/List';
import TextField from 'material-ui/TextField';

const CheckboxIcon = () => (
    <SvgIcon>
        <path d="M28 0h-24c-2.2 0-4 1.8-4 4v24c0 2.2 1.8 4 4 4h24c2.2 0 4-1.8 4-4v-24c0-2.2-1.8-4-4-4zM14 24.828l-7.414-7.414 2.828-2.828 4.586 4.586 9.586-9.586 2.828 2.828-12.414 12.414z" ></path>
    </SvgIcon>
);

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
    }
};
class ToDoList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            stepsList: ['contains peanuts'],
            currentValue: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.addStep = this.addStep.bind(this);
        this.deleteStep = this.deleteStep.bind(this);
        this.editStep = this.editStep.bind(this);
    }
    handleChange(event) {
        this.setState({ currentValue: event.target.value })
    }
    addStep() {
        let { stepsList, currentValue } = this.state;
        this.setState({
            stepsList: [...stepsList, currentValue],
            currentValue: ''
        })
    }
    deleteStep(index) {
        let { stepsList } = this.state;
        stepsList.splice(index, 1);
        this.setState({ stepsList })
    }
    editStep(index) {
        let { stepsList } = this.state,
            itemToedit = stepsList.splice(index, 1);
        this.setState({ stepsList, currentValue: itemToedit.join('') })
    }
    render() {
        let self = this,
            { stepsList, currentValue } = this.state;
        return (
            <div>
                <TextField
                    id="text-field-controlled"
                    hintText="Enter items to list"
                    value={currentValue}
                    onChange={self.handleChange}
                    fullWidth={true}
                    style={{ width: '90%' }}
                />
                <FloatingActionButton mini={true} onClick={self.addStep} backgroundColor={'rgba(0, 38, 65, 0.95)'}>
                    <ContentAdd />
                </FloatingActionButton>
                <br />
                <div className='above-list-block'>
                    <List>
                        {stepsList.map((element, index) => {
                            return (
                                <ListItem
                                    key={'RStep' + index}
                                    primaryText={element}
                                    hoverColor={'#fff'}
                                    leftIcon={<CheckboxIcon />}
                                    rightIcon={(
                                        <div style={{ margin: '0px', width: '70px' }}>
                                            <ContentEdit style={iconStyle.editIcon} onClick={() => this.editStep(index)} />
                                            <ContentDelete style={iconStyle.deleteIcon} onClick={() => this.deleteStep(index)} />
                                        </div>
                                    )}
                                />)
                        })}
                    </List>
                </div>
            </div>)
    }
}

export default ToDoList;