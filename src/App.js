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
            isDisplayForm: false
        };
    }

    componentWillMount() {
        if (localStorage && localStorage.getItem('tasks')){
            var tasks = JSON.parse(localStorage.getItem('tasks'));  
            this.setState({
                tasks : tasks   
            });
        }
    }
    
    s4(){
         return  Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    }

    guid() {
        return this.s4() + this.s4() + '-' + this.s4() + '-' + this.s4() + '-' + this.s4() + '-' + this.s4() + this.s4() + this.s4();
    }

    onToggleForm = () =>{
        this.setState({
            isDisplayForm :! this.state.isDisplayForm
        });
    }  

    onCloseForm = () => {
        this.setState({
            isDisplayForm : false

        })
    }    

    onSave = ( data ) => {
        var { tasks } = this.state;
        data.id = this.guid();
        tasks.push(data);
        this.setState({
           tasks : tasks
        })
        localStorage.setItem('tasks',JSON.stringify(tasks));
    }

    render() {
        var { tasks, isDisplayForm } = this.state;
        var elmTaskForm = isDisplayForm ? <TaskForm onSave = {this.onSave}  onCloseForm= {this.onCloseForm}/> : '';

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
                           <TaskControl/>

                           <TaskList 
                               tasks = { tasks }
                            /> 
                       
                    </div>
                </div>
            </div>
        );
    }

}

export default App;