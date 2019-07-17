import React, { Component } from 'react';
import './App.css';
import TaskForm from './Components/TaskForm';
import TaskControl from './Components/TaskControl';
import TaskList from './Components/TaskList';

class App extends Component {

    constructor(props){
        super(props);
        this.state = {
            tasks : [],
            isDisplayForm : false,
            itemEditing : null,
            keyword : '',
            filterName : '',
            filterStatus : '-1',
            sortBy : 'name',
            sortValue : 1
        };
    }

//Save data to Local Storage
    componentWillMount() {
        if (localStorage && localStorage.getItem('tasks')){
            var tasks = JSON.parse(localStorage.getItem('tasks'));  
            this.setState({
                tasks : tasks   
            });
        }
    }

// Tạo số ID ngẫu nhiên cho từng tên Công việc
    s4(){
         return  Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    }

    guid() {
        return this.s4() + this.s4() + '-' + this.s4() + '-' + this.s4() + '-' + this.s4() + '-' + this.s4() + this.s4() + this.s4();
    }

    onToggleForm = () =>{
        if(this.state.itemEditing !== null ){
            this.setState({
                itemEditing : null,
            });
        }else{
            this.setState({
                isDisplayForm : !this.state.isDisplayForm,
            });
        }
    }  

    onCloseForm = () => {
        this.setState({
            isDisplayForm : false,
            itemEditing : null
        })
    }  

    onShowForm = () => {
        this.setState({
            isDisplayForm : true
        })
    }  

// Sửa dữ liệu bằng cách tìm ID
    onSave = ( data ) => {
        var { tasks } = this.state;
        data.status = data.status === 'true' ? true : false;
        if (data.id === ''){
            data.id = this.guid();
            tasks.push(data);
        }else{
            var index = this.findIndex( data.id );
            tasks[index] = data;
        }
        this.setState({
           tasks : tasks,
        })
        localStorage.setItem('tasks',JSON.stringify(tasks));
    }


// Thay đổi trạng thái công việc
    onUpdateStatus = (id) => {
        var { tasks } = this.state;
        var index = this.findIndex(id);
        tasks[index].status = ! tasks[index].status;
        this.setState({
                tasks : tasks
            });
        localStorage.setItem('tasks',JSON.stringify(tasks))
    }

// Xóa công việc
    onDeleteItem = (id) => {
        var { tasks } = this.state;
        var index = this.findIndex(id);
        tasks.splice( index , 1 );
            this.setState({
                tasks : tasks
            });
        localStorage.setItem('tasks',JSON.stringify(tasks))
        this.onCloseForm();
    }

// Tìm ID của công việc
    findIndex = (id) => {
        var { tasks } = this.state;
        var result = -1;
        tasks.forEach(( task, index) => {
            if ( task.id === id ){
                result = index;
            }
        });
        return result;
    }

    onSearch = (keyword) =>{
        this.setState({
            keyword : keyword
        });
    }

    onFilter = (filterName, filterStatus) => {
        this.setState({
            filterName : filterName,
            filterStatus : filterStatus
        });
    }

    onSelectedItem = (item) => {
        this.setState({
            itemEditing : item,
            isDisplayForm : true
        })
    }

    onSort = (sortBy, sortValue) => {
        this.setState({
            sortBy : sortBy,
            sortValue : sortValue
        })
    }

    render() {
        var { 
            tasks, 
            isDisplayForm, 
            itemEditing,
            keyword,
            filterStatus,
            filterName,
            sortBy,
            sortValue
        } = this.state;

        // Tìm kiếm
        tasks = tasks.filter((task) => {
            return task.name.toLowerCase().indexOf(keyword.toLowerCase()) !== -1;
        });

        // Lọc công việc theo tên hoặc trạng thái
        if(filterName){
            tasks = tasks.filter((task) => {
                return task.name.toLowerCase().indexOf(filterName.toLowerCase()) !== -1
            });
        }
        if(filterStatus){
            tasks = tasks.filter((task) => {
                if(filterStatus === '-1' || filterStatus === -1){
                    return task;
                }else{
                    return task.status === (parseInt(filterStatus, 10) === 1 ? true : false);
                }
            });
        }

        // Sắp xếp theo tên và trạng thái
        if(sortBy === 'name'){
            tasks.sort((a, b) => {
                if(a.name > b.name) return sortValue;
                else if(a.name < b.name) return -sortValue;
                else return 0;
            });
        }else{
            tasks.sort((a, b) => {
                if(a.status > b.status) return -sortValue;
                else if(a.status < b.status) return sortValue;
                else return 0;
            });
        }


        var elmTaskForm = isDisplayForm ? <TaskForm 
                                                onSave = { this.onSave }  
                                                onCloseForm = { this.onCloseForm }
                                                itemEditing  = { itemEditing }
                                            /> : '';

        return (
            <div className="container">
                <div className="text-center">
                    <h1>Quản Lý Công Việc</h1><hr/>
                </div>
                <div className="row">
                    <div className= { isDisplayForm ? 'col-xs-4 col-sm-4 col-md-4 col-lg-4' : ''}>
                        { elmTaskForm }
                    </div>
                    <div className= { isDisplayForm ? 'col-xs-8 col-sm-8 col-md-8 col-lg-8' : 'col-xs-12 col-sm-12 col-md-12 col-lg-12'} >
                        <button 
                            type="button" 
                            className="btn btn-primary"  
                            onClick = { this.onToggleForm }
                        >
                            <span className="fa fa-plus mr-5"></span> Thêm Công Việc
                        </button>                        
                           <TaskControl
                                onSearch={this.onSearch}
                                onSort={this.onSort}
                                sortBy={sortBy}
                                sortValue={sortValue}
                           />

                           <TaskList 
                               tasks = { tasks }
                               onUpdateStatus = { this.onUpdateStatus }
                               onDeleteItem = { this.onDeleteItem }
                               onSelectedItem={this.onSelectedItem}
                               filterName={filterName}
                               filterStatus={filterStatus}
                               onFilter={this.onFilter}
                            /> 
                       
                    </div>
                </div>
            </div>
        );
    }

}

export default App;