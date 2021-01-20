import React from 'react';
import 'react-bootstrap';
import {Table} from 'react-bootstrap';

function ViewUsers() { 

    return (
        <div className="viewusers">
      
        <Table striped bordered hover>
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
                </tr>
                <tr>
                    <td>4</td>
                    <td>Sonny Torch</td>
                    <td>torch@mail.com</td>
                    <td>XPos</td>
                    <td>123443333</td>
                    <td>Xdep</td>
                    <td>GH20</td>
                    <td>GH10</td>
                    <td>XDes</td>
                    <td>Admin</td>
                </tr>
                <tr>
                    <td>5</td>
                    <td>Sonny Torch</td>
                    <td>torch@mail.com</td>
                    <td>XPos</td>
                    <td>123443333</td>
                    <td>Xdep</td>
                    <td>GH20</td>
                    <td>GH10</td>
                    <td>XDes</td>
                    <td>Admin</td>
                </tr>
                
                <tr>
                    <td>6</td>
                    <td>Sonny Torch</td>
                    <td>torch@mail.com</td>
                    <td>XPos</td>
                    <td>123443333</td>
                    <td>Xdep</td>
                    <td>GH20</td>
                    <td>GH10</td>
                    <td>XDes</td>
                    <td>Admin</td>
                </tr>
            </tbody>
        </Table>
        </div>


    );
}
export default ViewUsers;