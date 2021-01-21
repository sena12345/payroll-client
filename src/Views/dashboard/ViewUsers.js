import React from 'react';
import ReactDOM from 'react-dom';

 function ViewUsers() { 

     function switchButtonState() {
        
        }

     
    return (
        <div className="Viewusers">
            <div className="action-btn-container">
                <button title="Disable Selected" className="btn bg-primary">
                  Disable All <i className="fa fa-times"></i>
                </button>
                <button title="Delete Selected" className="btn bg-danger">
                    Delete All <i className="fa fa-trash" ></i>
                </button>  
            </div>
      
            <table>               
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Full Name</th>
                        <th>Email</th>
                        <th>Employee ID</th>
                        <th>Position</th>
                        <th>Department</th>
                        <th>Salary</th>
                        <th>Allowance</th>
                        <th>Designation</th>
                        <th>Roles</th>
                        <th></th>
                        <th></th>
                        <th></th>
                        
                        <th>   
                        </th>
                        <th>                           
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1</td>
                        <td>Sonny Torch</td>
                        <td>torch@mail.com</td>
                        <td>XPos</td>
                        <td>123443333</td>
                        <td>Xdep</td>
                        <td>GH20</td>
                        <td>GH10</td>
                        <td>XDes</td>
                        <td>Admin</td>                        
                        <td><input  onChange={switchButtonState} type="checkbox" className="disable-btn-check" value="" /></td>
                        <td><button title="View Details" className="btn bg-success"><i className="fa fa-eye" ></i></button></td>
                        <td><button title="Edit Details" className="btn bg-warning"><i className="fa fa-pen" ></i></button></td> 
                        <td><button title="Disable Employee" className="btn bg-primary"><i className="fa fa-times"></i></button></td> 
                        <td><button title="Delete Employee" className="btn bg-danger"><i className="fa fa-trash" ></i></button></td> 
                    </tr>
                    <tr>
                        <td>2</td>
                        <td>Sonny Torch</td>
                        <td>torch@mail.com</td>
                        <td>XPos</td>
                        <td>123443333</td>
                        <td>Xdep</td>
                        <td>GH20</td>
                        <td>GH10</td>
                        <td>XDes</td>
                        <td>Admin</td>
                        <td><input type="checkbox" onChange={switchButtonState} className="disable-btn-check" value=""/></td>
                        <td><button title="View Details" className="btn bg-success"><i className="fa fa-eye" ></i></button></td>
                        <td><button title="Edit Details" className="btn bg-warning"><i className="fa fa-pen" ></i></button></td> 
                        <td><button title="Disable Employee" className="btn bg-primary"><i className="fa fa-times"></i></button></td> 
                        <td><button title="Delete Employee" className="btn bg-danger"><i className="fa fa-trash" ></i></button></td> 
                    </tr>
                    <tr>
                        <td>3</td>
                        <td>Sonny Torch</td>
                        <td>torch@mail.com</td>
                        <td>XPos</td>
                        <td>123443333</td>
                        <td>Xdep</td>
                        <td>GH20</td>
                        <td>GH10</td>
                        <td>XDes</td>
                        <td>Admin</td>
                        <td><input type="checkbox" onChange={switchButtonState} className="disable-btn-check" value=""/></td>
                        <td><button title="View Details" className="btn bg-success"><i className="fa fa-eye" ></i></button></td>
                        <td><button title="Edit Details" className="btn bg-warning"><i className="fa fa-pen" ></i></button></td> 
                        <td><button title="Disable Employee" className="btn bg-primary"><i className="fa fa-times"></i></button></td> 
                        <td><button title="Delete Employee" className="btn bg-danger"><i className="fa fa-trash" ></i></button></td> 
                    </tr>

                </tbody>
            </table>
        </div>


    );
}
export default ViewUsers;