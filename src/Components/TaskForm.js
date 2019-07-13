import React, { Component } from 'react';

class TaskForm extends Component {

    onCloseForm = () => {
          this.props.onCloseForm();
    }
    render() {
        return (
            <div className="panel panel-warning">
                <div className="panel-heading">
                    <h3 className="panel-title">
                        Thêm Công Việc
                        <span
                            className="fa fa-times-circle text-right"
                            onClick = {this.onCloseForm}
                        ></span>
                    </h3>
                </div>
                <div className="panel-body">
                    <form /*onSubmit={this.onHandleSubmit}*/ >
                        <div className="form-group">
                            <label>Tên :</label>
                            <input
                                type="text"
                                className="form-control"
                                name="name"
                                /*value={this.state.name}
                                onChange={ this.onHandleChange }*/
                            />
                        </div>
                        <label>Trạng Thái :</label>
                        <select
                            className="form-control"
                            /*value={this.state.status}
                            onChange={this.onHandleChange}*/
                            name="status"
                        >
                            <option value={true}>Kích Hoạt</option>
                            <option value={false}>Ẩn</option>
                        </select><br/>
                        <div className="text-center">
                            <button type="submit" className="btn btn-warning">
                                <span className="fa fa-plus mr-5"></span>Lưu Lại
                            </button>&nbsp;
                            <button type="button" /*onClick={ this.onClear }*/ className="btn btn-danger">
                                <span className="fa fa-close mr-5"></span>Hủy Bỏ
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default TaskForm;
