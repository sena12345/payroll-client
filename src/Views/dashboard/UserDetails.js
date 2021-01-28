import React from "react";
import { Link } from "react-router-dom";
import Image from "../../assets/images/avataaars.png";
import "../../assets/css/Form.css";

import { useAuth } from "../../_services/auth-context";

function UserDetails() {
  const { logout, resetPassword, currentUser } = useAuth();

  return (
    <div id="printform" className="userdetails">
      <div className="container">
        <h3>Employee Details</h3>
        <hr />
        <br />
        <form>
          <div className="personal-section">
            <div className="form-row">
              <div className="left-col">
                <div className="form-row">
                  <div className="col-25">
                    <div className="imgcontainer">
                      <img src={Image} alt="image" className="image" />
                    </div>
                    <div className="details-box">
                      <label htmlFor="username">
                        <b>Employee ID :</b>
                      </label>
                      <pre id="username">
                        <i>123456789</i>
                      </pre>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-50">
                <div className="form-row">
                  <div className="col-50">
                    <div className="details-box">
                      <label htmlFor="username">
                        <b>Full Name :</b>
                      </label>
                      <pre id="username">
                        <i>Mr. Something something</i>
                      </pre>
                    </div>
                    <div className="details-box">
                      <label htmlFor="username">
                        <b>Email :</b>
                      </label>
                      <pre id="username">
                        <i>Mr. Something something</i>
                      </pre>
                    </div>
                    <div className="details-box">
                      <label htmlFor="username">
                        <b>Contact :</b>
                      </label>
                      <pre id="username">
                        <i>Mr. Something something</i>
                      </pre>
                    </div>
                    <div className="details-box">
                      <label htmlFor="username">
                        <b>Gender :</b>
                      </label>
                      <pre id="username">
                        <i>Mr. Something something</i>
                      </pre>
                    </div>
                    <div className="details-box">
                      <label htmlFor="username">
                        <b>SSNIT Number :</b>
                      </label>
                      <pre id="username">
                        <i>Mr. Something something</i>
                      </pre>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="department-section">
            <div className="form-row">
              <div className="col-50 left-col">
                <div className="form-row">
                  <div className="col-50">
                    <table>
                      <tr>
                        <th>Department</th>
                      </tr>
                      <tr>
                        <td>Depx</td>
                      </tr>
                      <tr>
                        <td>DepY</td>
                      </tr>
                    </table>
                  </div>
                  <div className="col-50">
                    <table>
                      <tr>
                        <th>Positon</th>
                      </tr>
                      <tr>
                        <td>Posx</td>
                      </tr>
                      <tr>
                        <td>Posy</td>
                      </tr>
                    </table>
                  </div>
                </div>
              </div>
              <div className="col-50">
                <div className="form-row">
                  <div className="col-50">
                    <table>
                      <tr>
                        <th>Sal</th>
                      </tr>
                      <tr>
                        <td>Depx</td>
                      </tr>
                      <tr>
                        <td>DepY</td>
                      </tr>
                    </table>
                  </div>
                  <div className="col-50">
                    <table>
                      <tr>
                        <th>Department</th>
                      </tr>
                      <tr>
                        <td>Depx</td>
                      </tr>
                      <tr>
                        <td>DepY</td>
                      </tr>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UserDetails;
