using Microsoft.AspNetCore.Mvc;
using Employee_Management_System.Data;

namespace Employee_Management_System.Controllers
{

    //the route to to receive http requests nad sending responses
    [Route("api/[controller]")]
    [ApiController]

    public class EmployeeController : ControllerBase{

        //access configuration settings
        private readonly IConfiguration _configuration;

        public EmployeeController(IConfiguration configuration){
            _configuration = configuration;
        }

        //Http request to authenticate employee using employee's email and password
        [HttpPost("authenticate")]

        public JsonResult Authenticate([FromBody] Employee employee){

            if (employee == null){

                return new JsonResult("Bad Request"){
                    StatusCode = 400
                };
            }

            //error catching block            
            
            //creaing an instance
            using (var context = new AppDBContext()){

                //checks if the context exists or has been propperly configured to access the database
                if (context.Employees == null){

                    return new JsonResult("Employee table is null or misconfigured."){

                        StatusCode = 400
                    };
                }
                //searching the manager by Id and store in a variable
                //var findEmployeeByEmail = context.Employees?.FirstOrDefault(e => e.Email == employee.Email);

                var findEmployeeByEmail = context.Employees
                        .Where(e => e.Email == employee.Email)
                        .Select(e => new {
                            e.Id,
                            e.Name,
                            e.PhoneNumber,
                            e.Role,
                            e.Email,
                            e.PasswordHarsh,
                            e.Department,
                            e.Salary,
                            e.HireDate,
                            e.Manager
                        })
                        .FirstOrDefault();
                // checking if the employee exists
                if(findEmployeeByEmail ==null){
                    return new JsonResult("Incorrect Email or Password!"){
                        StatusCode = 401
                    };
                }
                //verifies password
                if(employee.PasswordHarsh != findEmployeeByEmail.PasswordHarsh){

                    return new JsonResult("Incorrect Email or Password!"){

                        StatusCode = 401
                    };
                }

                var result = new {
                    Id = findEmployeeByEmail.Id,
                    Name = findEmployeeByEmail.Name,
                    PhoneNumber = findEmployeeByEmail.PhoneNumber,
                    Email = findEmployeeByEmail.Email,
                    Password = findEmployeeByEmail.PasswordHarsh,
                    Role = findEmployeeByEmail.Role,
                    Salary = findEmployeeByEmail.Salary,
                    HireDate = findEmployeeByEmail.HireDate,
                    Department = findEmployeeByEmail.Department,
                    Manager = findEmployeeByEmail.Manager
                };

                return new JsonResult(result){
                    StatusCode = 200
                };
            }
        }

        //Http request to remove an employee from the database using employee's id
        [HttpDelete]

        public JsonResult Delete([FromBody] Employee employe){

            try{

            }catch(Exception e){

                return new JsonResult("An error occured: ", e.Message){
                    StatusCode= 500
                };
            }

            // creating an instance
            using (var context = new AppDBContext()){

                //checks if the employees table exists or has been propperly configured to access the database
                    if (context.Employees == null ){
                        return new JsonResult("Employee is null."){

                            StatusCode = 400
                        };


                    }
                //removing associated leave requests and tasks
                var leaveRequests = context.LeaveRequests.Where(l => l.EmployeeId == employe.Id);
                context.LeaveRequests.RemoveRange(leaveRequests);

                //removing associated tasks
                var tasks = context.Tasks.Where(t => t.EmployeeId == employe.Id);
                context.Tasks.RemoveRange(tasks);
                
                //searches employee by Id
                var findEmployeeById = context.Employees?
                    .FirstOrDefault(e => e.Id == employe.Id);
                
                
                //checks if the employee is null
                if (findEmployeeById == null){

                    return new JsonResult($"Employee not found"){

                        StatusCode = 404

                        };
                    }

                    var name = findEmployeeById.Name;

                    //if found the employee is deleted from the database
                    context.Employees?.Remove(findEmployeeById);
                    //the context is then updated
                    context.SaveChanges();

                    //new object with success message
                    var response = new {
                        message = $"{name} has been deleted successfully."
                    };

                    //sends the response in json format
                    return new JsonResult(response){

                        StatusCode = 200

                    };
                }
            }

        // Http request to update employee information using employee's Id
        [HttpPut]

        public JsonResult Update([FromBody] Employee updateEmployee){

            //checks if the request body was empty
            if (updateEmployee == null){

                return new JsonResult("Employee is null"){

                    StatusCode = 400

                };
                }

            try{

            }catch(Exception e){

                return new JsonResult("An error occured: ", e.Message){
                    StatusCode = 500
                };
            }
            //creates an instance
            using (var context = new AppDBContext()){

                //checks if the context exists or has been propperly configured to access the database
                if (context.Employees == null){

                    return new JsonResult("Employee table is null or misconfigured."){

                        StatusCode = 400
                    };
                }                

                //retrieves the employee by employee Id
                var employee = context.Employees?.FirstOrDefault(e => e.Id == updateEmployee.Id);

                //checks if the property is null
                if(employee ==null){

                    return new JsonResult($"{employee?.Name} not found."){

                        StatusCode = 404
                    };
                }


                //Update the employee
                context.Employees?.Attach(employee);
                    employee.Name = updateEmployee.Name ?? employee.Name;
                    employee.PhoneNumber = updateEmployee.PhoneNumber ?? employee.PhoneNumber;
                    employee.Email = updateEmployee.Email ?? employee.Email;
                    employee.PasswordHarsh = updateEmployee.PasswordHarsh ?? employee.PasswordHarsh;
                    employee.Role = updateEmployee.Role ?? employee.Role;
                    employee.Salary = updateEmployee.Salary ?? employee.Salary;
                    employee.Department = updateEmployee.Department ?? employee.Department;
                    employee.ManagerId = updateEmployee.ManagerId ?? employee.ManagerId;
                
                //the context is then updated
                context.SaveChanges();

                var result = new {
                    Id = employee.Id,
                    Name = employee.Name,
                    PhoneNumber = employee.PhoneNumber,
                    Email = employee.Email,
                    Password = employee.PasswordHarsh,
                    Role = employee.Role,
                    Salary = employee.Salary,
                    Department = employee.Department,
                    Manager = employee.Manager?.Name
                };

                return new JsonResult(result){
                    StatusCode = 201
                };
        }
}
        
        //Http request to add a new employee into the database
        [HttpPost]

        public IActionResult Create([FromBody] Employee employee){

            //checks if the request body was empty
            if (employee == null){

                return new JsonResult("Employee is null"){

                    StatusCode = 400

                };
                }  

            //employee.SetPassword(employee.PasswordHarsh!);
            try{
            //creates an instance
            using (var context = new AppDBContext()){

                //checks if the manager table exists or has been propperly configured to access the database
                if (context.Managers == null){

                    return new JsonResult("Employee table is null or misconfigured."){

                        StatusCode = 400
                    };
                }

                //retrieves the manager by manager Id
                var manager = context.Managers?.FirstOrDefault(m => m.Id == employee.ManagerId);

                //checks if the property is null
                if(manager ==null){

                    return new JsonResult("Manager not found."){

                        StatusCode = 404
                    };
                }
            
                //creates a new employee
                var newEmployee = new Employee {
                    Name = employee.Name,
                    PhoneNumber = employee.PhoneNumber, 
                    Email = employee.Email,
                    PasswordHarsh = employee.PasswordHarsh,
                    Role = employee.Role,
                    Salary = employee.Salary,
                    Department =employee.Department,
                    ManagerId = employee.ManagerId
                };

                //checks if the employees context exists or has been propperly configured to access the database
                if (context.Employees == null){

                    return new JsonResult("Employee table is null or misconfigured."){

                        StatusCode = 400
                    };
                }

                //the employee is added using the appdbcontext
                context.Employees?.Add(newEmployee);

                //the context is then updated
                context.SaveChanges();

                var result = new {
                    Id = newEmployee.Id,
                    Name = newEmployee.Name,
                    PhoneNumber = newEmployee.PhoneNumber,
                    Email = newEmployee.Email,
                    Role = newEmployee.Role,
                    Salary = newEmployee.Salary,
                    Department = newEmployee.Department,
                    Manager = newEmployee.Manager?.Name
                };

                return new JsonResult(result){
                    StatusCode = 201
                };
            }

            }
            catch(Exception e){
                return new JsonResult($"message: An error occurred Error Message: {e.Message}"){
                        StatusCode = 400
                };
            }
            }
    }
}