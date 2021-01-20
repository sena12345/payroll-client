import React from 'react';
import './RegisterUser.css';

function RegisterUser() { 
    return (
        <div className="registeruser">
            <h2>Register User</h2>
            
            <form>
                <div className="form-row">
                    <div className="col-50">
                        <h3>Personal Information</h3><br />
                         <div className="form-row">
                            <div className="col-50">
                                <label htmlFor="fname"><i className="fa fa-user"></i> Full Name</label>   
                                <input type="text" id="fname" placeholder="Moe" />         
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="col-50">
                                <label htmlFor="email"><i className="fa fa-envelope"></i> Email</label>                       
                                <input type="text" id="email" placeholder="john@example.com"/>
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="col-50">
                                <label htmlFor="ssnit"> SSNIT Number</label>
                                <input type="text" id="ssnit"/>
                            </div>
                        </div>                         
                      
                        <div className="form-row">
                            <div className="col-10">
                                <label htmlFor="zip">Zip</label>
                                <input type="text" id="zip" placeholder="+233"/>
                            </div>
                            <div className="col-50">
                                <label htmlFor="contact">Contact</label>
                                <input type="text" id="contact" maxLength='10' placeholder="0541234567"/>
                            </div>
                        </div>
                    </div>                     
                    <div className="col-50">
                    <h3>Other Details</h3><br/>
                    <div className="form-row">
                        <div className="col-50">
                            <label htmlFor="role">Role</label>
                            <input type="text" id="role" name="role" />
                        </div>
                        <div className="col-50">
                            <label htmlFor="designation">Designation</label>
                            <input type="text" id="designation" name="designation" />
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="col-50">
                        <label htmlFor="basic-salary">Basic Salary</label>
                        <input type="text" id="basic-salary" name="basic-salary"/>
                        </div>
                        <div className="col-50">
                        <label htmlFor="allowance">Allowance</label>
                        <input type="text" id="allowance" name="allowance" />
                        </div>
                    </div> 
                    <div className="form-row">
                        <div className="col-50">
                        <label htmlFor="department">Department</label>
                        <input type="text" id="department" name="department" />
                        </div>
                        <div className="col-50">
                        <label htmlFor="position">Position</label>
                        <input type="text" id="position" name="position"/>
                        </div>
                    </div>                                    
                    
                    <div className="form-row">
                        <div className="col-50">
                        <label htmlFor="cardtype">National Card Type</label>
                            <select id="cardtype" name="cardtype" >
                                <option>Passport</option>
                                <option>Voter's</option> 
                                <option>Drivers Licence</option> 
                                <option>Ghana Card</option> 
                            </select>
                        </div>
                        <div className="col-50">
                        <label htmlFor="cardnumber">National Card Number</label>
                        <input type="text" id="cardnumber" name="cardnumber" />
                        </div>
                    </div>
                    

                </div>
                </div>                    
                <input type="submit" value="Register" className="register-form-btn"/>
            </form>
        </div>


    );
}

export default RegisterUser;