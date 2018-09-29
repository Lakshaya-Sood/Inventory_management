import React from 'react';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

const style = {
    marginRight: 20,
};

class ToDoList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (
            <div>
                <FloatingActionButton style={style}>
                    <ContentAdd />
                </FloatingActionButton>
            </div>)
    }
}

export default ToDoList;