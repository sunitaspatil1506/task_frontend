import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class HeaderComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
                 
        }
    }

    render() {
        return (
            <div className='container mt-2'>
            <nav className="px-5 navbar navbar-expand-lg navbar-dark bg-primary">
                <div className="container-fluid">
                 <a className="navbar-brand" href="/">Task Management System</a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <Link className="btn btn-sm bg-success" to='/add-task'> Add Task</Link>
                </div>
            </nav>
        
            </div>
        )
    }
}

export default HeaderComponent
