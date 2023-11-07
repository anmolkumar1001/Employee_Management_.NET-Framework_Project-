import React, { useEffect, useState } from "react";
import axios from "axios";
import { Modal, Button } from "react-bootstrap";
import "./EmployeeCrud.css";

function EmployeeCrud() {
  const [id, setid] = useState("");
  const [employeeId, setemployeeId] = useState("");
  const [employeeName, setemployeeName] = useState("");
  const [department, setdepartment] = useState("");
  const [dateOfJoining, setdateOfJoining] = useState("");
  const [contact, setcontact] = useState("");
  const [employees, setemployees] = useState([]);
  const [selectedEmployee, setselectedEmployee] = useState(null);
  const [isViewing, setIsViewing] = useState(false);

  useEffect(() => {
    Load();
  }, []);

  async function Load() {
    try {
      const response = await axios.get(
        "https://localhost:7142/api/Employee/GetEmployee"
      );
      setemployees(response.data);
    } catch (error) {
      console.error("Error loading Employee: ", error);
    }
  }

  async function save(event) {
    event.preventDefault();
    try {
      await axios.post("https://localhost:7142/api/Employee/AddEmployee", {
        EmployeeId: employeeId,
        EmployeeName: employeeName,
        Department: department,
        DateOfJoining: dateOfJoining,
        Contact: contact,
      });
      alert("Employee Registration Successful");
      clearForm();
      Load();
    } catch (error) {
      console.error("Error saving Employee: ", error);
    }
  }

  async function editEmployee(Employee) {
    setemployeeId(Employee.employeeId);
    setemployeeName(Employee.employeeName);
    setdepartment(Employee.department);
    setdateOfJoining(Employee.dateOfJoining);
    setcontact(Employee.contact);
    setid(Employee.id);
  }

  async function DeleteEmployee(id) {
    try {
      await axios.delete(
        "https://localhost:7142/api/Employee/DeleteEmployee/" + id
      );
      alert("Employee deleted successfully");
      clearForm();
      Load();
    } catch (error) {
      console.error("Error deleting Employee: ", error);
    }
  }

  async function update(event) {
    event.preventDefault();
    try {
      await axios.patch(
        "https://localhost:7142/api/Employee/UpdateEmployee/" +
          (employees.find((u) => u.id === id)?.id || id),
        {
          id: id,
          EmployeeId: employeeId,
          EmployeeName: employeeName,
          Department: department,
          DateOfJoining: dateOfJoining,
          Contact: contact,
        }
      );
      alert("Registration Updated");
      clearForm();
      Load();
    } catch (error) {
      console.error("Error updating Employee: ", error);
    }
  }

  function clearForm() {
    setid("");
    setemployeeId("");
    setemployeeName("");
    setdepartment("");
    setdateOfJoining("");
    setcontact("");
    setIsViewing(false);
    setselectedEmployee(null);
  }

  function viewEmployeeDetails(Employee) {
    setselectedEmployee(Employee);
    setIsViewing(true);
  }

  const mystyle = {
    backgroundColor: "rgb(226 226 226)",
    padding: "10px",
  };

  return (
    <div>
      <div className="container mt-4" style={mystyle}>
        <div className="text-center">
          <h3>Add New Employees</h3>
        </div>
        <form>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              id="id"
              hidden
              value={id}
              onChange={(event) => {
                setid(event.target.value);
              }}
            />

            <label>
              <strong>Employee Id</strong>
            </label>
            <input
              type="text"
              className="form-control"
              id="employeeId"
              value={employeeId}
              onChange={(event) => {
                setemployeeId(event.target.value);
              }}
            />

            <label>
              <strong>Employee Name</strong>
            </label>
            <input
              type="text"
              className="form-control"
              id="employeeName"
              value={employeeName}
              onChange={(event) => {
                setemployeeName(event.target.value);
              }}
            />
          </div>
          <div className="form-group">
            <label>
              <strong>Department</strong>
            </label>
            <input
              type="text"
              className="form-control"
              id="department"
              value={department}
              onChange={(event) => {
                setdepartment(event.target.value);
              }}
            />

            <label>
              <strong>Date Of Joining</strong>
            </label>
            <input
              type="text"
              className="form-control"
              id="dateOfJoining"
              value={dateOfJoining}
              onChange={(event) => {
                setdateOfJoining(event.target.value);
              }}
            />

            <label>
              <strong>Contact</strong>
            </label>
            <input
              type="text"
              className="form-control"
              id="contact"
              value={contact}
              onChange={(event) => {
                setcontact(event.target.value);
              }}
            />
          </div>

          <div>
            <button
              className="btn btn-primary register-btn mt-4 mx-4"
              onClick={save}
            >
              Register
            </button>
            <button
              className="btn btn-warning update-btn mt-4"
              onClick={update}
            >
              Update
            </button>
          </div>
        </form>
      </div>
      <br />

      <div className="table-container">
        <div className="text-center">
          <h2>Employee Details</h2>
        </div>
        <table className="table table-striped table-bordered table-hover">
          <thead className="table-secondary">
            <tr>
              <th scope="col">Id</th>
              <th scope="col">Employee Id</th>
              <th scope="col">Employee Name</th>
              <th scope="col">Option</th>
            </tr>
          </thead>

          <tbody>
            {employees.map(function fn(Employee) {
              // Use "Employee" as the parameter name
              // console.log(Employee.EmployeeName);
              // console.log("Employees array:", Employees);
              // Employees.forEach((employee) => {
              //   console.log("Employee:", employee);
              // });
              return (
                <tr key={Employee.id}>
                  <td>{Employee.id}</td>
                  <td>{Employee.employeeId}</td>
                  <td>{Employee.employeeName}</td>
                  <td>
                    <button
                      type="button"
                      className="btn btn-primary edit-btn mx-1"
                      onClick={() => editEmployee(Employee)}
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      className="btn btn-primary register-btn mt-1"
                      onClick={() => DeleteEmployee(Employee.id)}
                    >
                      Delete
                    </button>
                    <button
                      type="button"
                      className="btn btn-primary view-btn mx-1"
                      onClick={() => viewEmployeeDetails(Employee)}
                    >
                      View
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <Modal show={isViewing} onHide={() => setIsViewing(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Employee Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedEmployee && (
            <div>
              <p>
                <strong>ID:</strong> {selectedEmployee.id}
              </p>
              <p>
                <strong>EmployeeId:</strong> {selectedEmployee.employeeId}
              </p>
              <p>
                <strong>Employee Name:</strong> {selectedEmployee.employeeName}
              </p>
              <p>
                <strong>Department:</strong>
                {selectedEmployee.department}
              </p>
              <p>
                <strong>DateOfJoining:</strong> {selectedEmployee.dateOfJoining}
              </p>
              <p>
                <strong>Contact:</strong> {selectedEmployee.contact}
              </p>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setIsViewing(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default EmployeeCrud;
