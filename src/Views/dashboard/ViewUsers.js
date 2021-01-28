import React, { useEffect, useState } from "react";
import EmployeeInstance from "../../data-operations/data-queries/employees";
import { showConfirmAlert } from "../my-alerts";
import { useAlert } from "react-alert";
import { useAuth } from "../../_services/auth-context";
import { MyLoader } from "./my-spiner";
import { useHistory } from "react-router-dom";
function ViewUsers() {
  const { currentUser } = useAuth();
  const history = useHistory();
  const empInstance = EmployeeInstance(currentUser);
  const [employeesData, setEmployeesData] = useState([]);
  const [selectedEmployee, setSeletecEmployee] = useState();
  const [load, setLoading] = useState(true);
  const alert = useAlert();
  const selectedEmployees = [];
  useEffect(() => {
    if (load) {
      empInstance
        .getEmployees()
        .then((res) => {
          setEmployeesData(res.data.content);
          setLoading(false);
        })
        .catch((err) => {
          setLoading(false);
          console.log(err);
        });
    }
  }, [load]);

  const handleConfirm = (title, message, action) => {
    showConfirmAlert({
      title: title,
      message: message,
      buttons: [
        {
          label: "No",
          onClick: () => {
            console.log("cancel");
          },
        },
        {
          label: "Yes",
          onClick: () => action(),
        },
      ],
    });
  };

  const handleCheck = (e, employee) => {
    if (e.target.checked === true) {
      selectedEmployees.push(employee);
      return;
    }

    selectedEmployees.splice(selectedEmployees.indexOf(employee), 1);
    return;
  };

  const handleMultiDisable = () => {
    setLoading(true);
    empInstance
      .disableEmployees(selectedEmployees)
      .then((res) => {
        alert.success("successfully change state of employees!");
        for (const emp of selectedEmployees) {
          const index = employeesData.indexOf(emp);
          employeesData[index] = { ...emp, disable: !emp.disable };
          setEmployeesData([...employeesData]);
        }
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        alert.error(`oops! error due to ${err.message}`);
      });
  };

  const handleMultiDelete = () => {
    setLoading(true);
    empInstance
      .deleteEmployees(selectedEmployees)
      .then((res) => {
        setLoading(true);
        alert.success("successfully deleted employees!");
      })
      .catch((err) => {
        setLoading(false);
        alert.error(`oops! error due to ${err.message}`);
      });
  };

  const handleSingleDisable = () => {
    // setLoading(true);
    empInstance
      .disableEmployees([selectedEmployee])
      .then((res) => {
        alert.success("successfully change state employees!");
        setLoading(true);
      })
      .catch((err) => {
        setLoading(false);
        alert.error(`oops! error due to ${err.message}`);
      });
  };

  const handleSingleDelete = () => {
    setLoading(true);
    empInstance
      .deleteEmployees([selectedEmployee])
      .then((res) => {
        alert.success("successfully deleted employees!");
        setLoading(false);
      })
      .catch((err) => {
        alert.error(`oops! error due to ${err.message}`);
        setLoading(false);
      });
  };

  const handleMultiDisableAndDeleteList = (isDelete) => {
    if (!isDelete) {
      handleConfirm(
        "Confirm",
        `Continue to change status of ${selectedEmployees.length} employees?`,
        handleMultiDisable
      );
    } else {
      handleConfirm(
        "Warning",
        `You are about to permanently delete ${selectedEmployees.length} employees?`,
        handleMultiDelete
      );
    }
  };

  const handleConfirmSingleDisable = (employee) => {
    if (!employee) return;

    handleConfirm(
      "Confirm",
      `Continue to changes status of ${employee.name}?`,
      handleSingleDisable
    );
  };

  const handleConfirmSingleDelete = (employee) => {
    if (!employee) return;
    handleConfirm(
      "Confirm",
      `Continue to changes status of ${employee.name}?`,
      handleSingleDelete
    );
  };

  return load ? (
    <MyLoader />
  ) : (
    <div className="Viewusers">
      <div className="action-btn-container">
        <button
          className="bg-primary"
          title="enable or disable Selected"
          onClick={() => {
            if (selectedEmployees.length < 1) {
              alert.info("kindly select employees to disable!");
              return null;
            }
            handleMultiDisableAndDeleteList(false);
          }}
        >
          Change state <i className="fa fa-times " />
        </button>
        <button
          className="bg-danger"
          title="Delete Selected"
          onClick={() => {
            if (selectedEmployees.length < 1) {
              alert.info("kindly select employees to delete!");
              return;
            }
            handleMultiDisableAndDeleteList(true);
          }}
        >
          Delete selected <i className="fa fa-trash" />
        </button>
      </div>

      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Full Name</th>
            <th>Email</th>
            <th>Employee ID</th>
            <th>Department</th>
            <th>Designation</th>
            <th>Salary</th>
            <th>Roles</th>
            <th>Status</th>
            <th>Select</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employeesData.length > 0 ? (
            employeesData.map((emp) => {
              const index = employeesData.indexOf(emp) + 1;
              return (
                <tr key={index}>
                  <td>{index}</td>
                  <td>{emp.name}</td>
                  <td>{emp.email}</td>
                  <td>{emp.employee_id}</td>

                  <td>
                    <ol>
                      {" "}
                      {emp.departments.map((d) => {
                        return <li key={d.department_id}>{d.department}</li>;
                      })}
                    </ol>
                  </td>
                  <td>
                    <ol>
                      {" "}
                      {emp.designations.map((d) => {
                        return <li key={d.designation_id}>{d.designation}</li>;
                      })}
                    </ol>
                  </td>
                  <td>{emp.basic_salary}</td>

                  <td>
                    <ol>
                      {" "}
                      {emp.roles.map((r) => {
                        return <li key={r.role_id}>{r.role}</li>;
                      })}
                    </ol>
                  </td>
                  <td>
                    {<pre>{emp.disable == true ? "Disabled" : "Active"}</pre>}
                  </td>
                  <td>
                    <input
                      type="checkbox"
                      className="disable-btn-check"
                      onChange={(e) => {
                        handleCheck(e, emp);
                      }}
                    />
                  </td>
                  <td>
                    <button
                      className="bg-success"
                      title="View Details"
                      onClick={(e) => {
                        if (e) {
                          history.push({
                            pathname: "/userdetails",
                            state: { data: emp },
                          });
                        }
                      }}
                    >
                      <i className="fa fa-eye" />
                    </button>

                    <button
                      className="bg-warning"
                      onClick={(e) => {
                        if (e) {
                          history.push({
                            pathname: "/edituserdetails",
                            state: { data: emp },
                          });
                        }
                      }}
                    >
                      <i className="fa fa-pen" />
                    </button>
                    <button
                      className="bg-primary"
                      title="Disable Employee"
                      onClick={(e) => {
                        if (e.target.dispatchEvent) {
                          setSeletecEmployee(emp);
                          handleConfirmSingleDisable(emp);
                        }
                      }}
                    >
                      <i className="fa fa-times" />
                    </button>
                    <button
                      className="bg-danger"
                      title="Delete Employee"
                      onClick={(e) => {
                        if (e.target.dispatchEvent) {
                          setSeletecEmployee(emp);
                          handleConfirmSingleDelete(emp);
                        }
                      }}
                    >
                      <i className="fa fa-trash" />
                    </button>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan="10">No data found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
export default ViewUsers;
