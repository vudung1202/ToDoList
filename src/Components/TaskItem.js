import React, { Component } from 'react';

class TaskItem extends Component {

    showStatusElement(){
        return (
            <span
                className={ this.props.task.status ? 'label label-danger' : 'label label-info' }
                
            >{ this.props.task.status === true ? 'Kích Hoạt' : 'Ẩn' }</span>
        );
    }

	render() {
        const { tasks,index } = this.props;
        return (
            <tr>
                <td>{ this.props.index }</td>
                <td>{ this.props.name }</td>
                <td className="text-center">
                     { this.showStatusElement() }
                </td>
                <td className="text-center">
                    <button type="button" className="btn btn-warning" /*onClick={ this.onSelectedItem }*/>
                        <span className="fa fa-pencil mr-5"></span>Sửa
                    </button>
                    &nbsp;
                    <button type="button" className="btn btn-danger" /*onClick={ this.onDeleteItem }*/>
                        <span className="fa fa-trash mr-5"></span>Xóa
                    </button>
                </td>
            </tr>
        );
    }
}

export default TaskItem;