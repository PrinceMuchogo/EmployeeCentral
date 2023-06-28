using Microsoft.AspNetCore.Mvc;
using System.Data;
using Employee_Management_System.Models;
using Employee_Management_System.Data;

namespace Employee_Management_System.Controllers

{
    //defines the route to receive http request and send responses
    [Route("api/[controller]")]
    [ApiController]

    public class ManagerController : ControllerBase{

        //access configuration settings using dependency injection
        private readonly IConfiguration _configuration;
        public ManagerController(IConfiguration configuration){

            _configuration = configuration;
        }

        //Http request to authenticate manager using manager's email and password
        [HttpPost("authenticate")]

        public JsonResult Authenticate([FromBody] Manager manager){

            //checking if the reqquest body is not empty
            if (manager == null){
                //sending a response for invalid request
                return new JsonResult("Bad Request"){
                    StatusCode = 400
                };
            }

            try{
            //creaing an instance
            using (var context = new AppDBContext()){

                    //checks if the managers context has been propperly configured to access the database
                    if (context.Managers == null){
                        return new JsonResult("Managers table not found or misconfigured is null."){

                            StatusCode = 400
                        };


                    }
                    
                    //searching the manager by Email and store in a variable
                    var findManagerByEmail = context.Managers
                        .Where(m => m.Email == manager.Email)
                        .Select(m => new {
                            m.Id,
                            m.Name,
                            m.PhoneNumber,
                            m.Role,
                            m.Email,
                            m.PasswordHarsh,
                            m.Department,
                            m.Salary,
                            m.HireDate
                        })
                        .FirstOrDefault();

                    // checking if the manager exists
                    if(findManagerByEmail ==null){
                        return new JsonResult("Incorrect Email or Password!"){
                            StatusCode = 401
                        };
                    }

                    //verifying the passwords for authentication
                    if(manager.PasswordHarsh != findManagerByEmail.PasswordHarsh){

                        return new JsonResult("Incorrect Email or Password!"){

                            StatusCode = 401
                        };
                    }
                    var result = new {
                        Id = findManagerByEmail.Id,
                        Name = findManagerByEmail.Name,
                        PhoneNumber = findManagerByEmail.PhoneNumber,
                        Email = findManagerByEmail.Email,
                        Role = findManagerByEmail.Role,
                        Salary = findManagerByEmail.Salary,
                        Department = findManagerByEmail.Department
                    };
                    //sends a response in json format
                    return new JsonResult(result){

                        StatusCode = 201
                    };
                }

            }catch(Exception e){

                return new JsonResult("An error occured" + e.Message);
            }
        }

        //Http request to add a new manager
        [HttpPost]

        public JsonResult Create([FromBody] Manager manager){

            //checks if the request body is not null
            if (manager == null){

                return new JsonResult("Manager is null"){

                    StatusCode = 400

                };
            }  

            //error catching block
            try{

            //instantiates an object
            using (var context = new AppDBContext()){

                //checks if the managers context exists or has been propperly configured to access the database
                    if (context.Managers == null){

                        return new JsonResult("Managers table is null or misconfigured."){

                            StatusCode = 400
                        };
                    }

                //creates a new manager object using the attributes in the request body
                var newManager = new Manager {
                    Name = manager.Name,
                    PhoneNumber = manager.PhoneNumber,
                    Email = manager.Email,
                    PasswordHarsh = manager.PasswordHarsh,
                    Role = manager.Role,
                    Salary = manager.Salary,
                    Department =manager.Department,
                };

                //adds the new manager to the database using the managers context
                context.Managers?.Add(newManager);
                context.SaveChanges();

                var result = new {
                    Id = newManager.Id,
                    Name = newManager.Name,
                    PhoneNumber = newManager.PhoneNumber,
                    Email = newManager.Email,
                    Role = newManager.Role,
                    Salary = newManager.Salary,
                    Department = newManager.Department,
                    Employees = newManager.Employees
                };
                //sends a response in Json format
                return new JsonResult(result){

                    StatusCode = 201

                };
            }

            }
            //catches errors encounted
            catch(Exception e){
                return new JsonResult($"Could not add {manager.Name}.Maybe Duplicate entries: " + e.Message);
            }
        }

        // Http request to remove a manager from the database
        [HttpDelete]

        public JsonResult Delete([FromBody] Manager managerr){

            //checks if the request body is null
            if (managerr == null){

                return new JsonResult("Bad request"){

                    StatusCode = 400
                };
            }

            try{
                //instantiates an object
                using (var context = new AppDBContext()){

                    //checks if the managers context exists or has been propperly configured to access the database
                        if (context.Managers == null){

                            return new JsonResult("Managers table is null or misconfigured."){

                                StatusCode = 400
                            };
                        }

                    //finds the manager by Id and stores the object in a variable
                    var manager = context.Managers?
                        .FirstOrDefault(m => m.Id == managerr.Id);

                    // checks the manager object is null
                    if (manager == null){

                        return new JsonResult($"Manager not found"){

                            StatusCode = 400

                            };
                        }

                        //stores the name of the manager to be deleted
                        var managerName = manager.Name;

                        //deletes the manager from the database
                        context.Managers?.Remove(manager);
                        context.SaveChanges();

                        // creates ana object with the response message
                        var response = new {

                            message = $"{managerName} has been deleted successfully."

                        };

                        // sends a response in json format
                        return new JsonResult(response){

                            StatusCode = 200

                        };
                    }
                }catch(Exception e){

                    return new JsonResult("An error occured: " + e.Message){

                        StatusCode = 500
                    };
                }
            }

        //Http request to update the manager object in the database using manager's Id
        [HttpPut]

        public JsonResult Update([FromBody] Manager updateManager){

            //checks if the request body was empty
            if (updateManager == null){

                return new JsonResult("Manager is null"){

                    StatusCode = 400

                };
            }

            //error catching block
            try{
                //creates an instance
                using (var context = new AppDBContext()){

                    //checks if the managers context exists or has been propperly configured to access the database
                        if (context.Managers == null){

                            return new JsonResult("Managers table is null or misconfigured."){

                                StatusCode = 400
                            };
                        }

                    //retrieves the manager by manager Id
                    var manager = context.Managers?.FirstOrDefault(m => m.Id == updateManager.Id);

                    //checks if the property is null
                    if(manager ==null){

                        return new JsonResult($"Manager not found"){

                            StatusCode = 404
                        };
                    }

                    //Update the manager
                    context.Managers?.Attach(manager);
                        manager.Name = updateManager.Name ?? manager.Name;
                        manager.PhoneNumber = updateManager.PhoneNumber ?? manager.PhoneNumber;
                        manager.Email = updateManager.Email ?? manager.Email;
                        manager.PasswordHarsh = updateManager.PasswordHarsh ?? manager.PasswordHarsh;
                        manager.Role = updateManager.Role ?? manager.Role;
                        manager.Salary = updateManager.Salary ?? manager.Salary;
                        manager.Department = updateManager.Department ?? manager.Department;
                    

                    //the context is then updated
                    context.SaveChanges();

                    var result = new{
                        Id = manager.Id,
                        Name = manager.Name,
                        PhoneNumber = manager.PhoneNumber,
                        Email = manager.Email,
                        Password = manager.PasswordHarsh,
                        Role = manager.Role,
                        Salary = manager.Salary,
                        Department = manager.Department,
                        Employees = manager.Employees
                    };

                    //sends a response in Json format
                    return new JsonResult(result){

                        StatusCode = 201

                    };
                }
            }catch(Exception e){

                return new JsonResult("An error occured: " + e.Message ){

                    StatusCode = 500
                };
            }
        }
   
        //Http request to retrieve manager information from the database using the manager Id
        [HttpGet]
        public JsonResult Get(int managerId){

            //error catching block
            try{
                //instantiates the dbcontext class
                using (var context = new AppDBContext()){

                    //checks if the managers context exists or has been propperly configured to access the database
                    if (context.Managers == null){

                        return new JsonResult("Managers table is null or misconfigured."){

                            StatusCode = 400
                        };
                    }

                    //creates a new manager object with the retrieved information from database
                    var manager = context.Managers
                        .Where(m => m.Id == managerId)
                        .Select(m => new {
                            m.Id,
                            m.Name,
                            m.PhoneNumber,
                            m.Role,
                            m.Email,
                            m.Department,
                            m.Salary,
                            m.HireDate,
                            EmployeeCount = m.Employees != null ? m.Employees.Count : 0,
                            m.Employees
                        })
                        .FirstOrDefault();

                    //checks if the new manager object is null after querying the database
                    if (manager == null){

                        return new JsonResult("Not Found"){

                            StatusCode = 404
                        };
                    }

                    var result = new{
                    Id = manager.Id,
                    Name = manager.Name,
                    PhoneNumber = manager.PhoneNumber,
                    Email = manager.Email,
                    Role = manager.Role,
                    Salary = manager.Salary,
                    Department = manager.Department,
                    Subordinates = manager.EmployeeCount,
                    Employees = manager.Employees
                };

                    //sends a response in json format
                    return new JsonResult(result){

                            StatusCode = 200
                        };
                    }
                }catch(Exception e){

                    return new JsonResult("An error occured: " + e.Message){

                        StatusCode = 500
                    };
                }
            }

        // retrieves employees reporting to a manager using manager's Id
        [HttpGet("subordinates")]
        public JsonResult GetSubordinates(int managerId){

            //error catching block
            try{
                //instantiates the dbcontext class
                using (var context = new AppDBContext()){

                    //checks if the managers context is null
                    if (context.Managers == null){

                        return new JsonResult("Manager is null."){

                            StatusCode = 400
                        };
                    }

                        //creates a new manager object with the retrieved information from database
                        var manager = context.Managers
                            .Where(m => m.Id == managerId)
                            .Select(m => new {
                                m.Name,
                                EmployeeCount = m.Employees != null ? m.Employees.Count : 0,
                                m.Employees
                            })
                            .FirstOrDefault();

                        //checks if the new manager object is null after querying the database
                        if (manager == null){

                            return new JsonResult("Not Found"){

                                StatusCode = 404
                            };
                        }

                        var result = new{
                        Manager_Name = manager.Name,
                        Subordinates_Count = manager.EmployeeCount,
                        Subordinates = manager.Employees
                    };

                        //sends a response in json format
                        return new JsonResult(result){

                                StatusCode = 200
                            };
                        }
                    }catch(Exception e){

                        return new JsonResult("An error occured: " + e.Message){

                            StatusCode = 500
                        };
                    }
                }


        //Http request for all managers from the database
        [HttpGet("managers")]
        public JsonResult GetManagers(){

            //error catching block
            try{
                //instantiating the database context for this session
                using(var context = new AppDBContext()){
                    
                    //checking if the managers exist
                    if(context.Managers == null){
                        
                        return new JsonResult("Managers is null"){

                            StatusCode = 400
                        };
                    }

                    // queries the database for managers information
                    var managers = context.Managers
                        .OrderBy(m => m.HireDate)
                        .Select(m => new{
                            m.Id,
                            m.Name,
                            m.PhoneNumber,
                            m.Email,
                            m.Department,
                            m.HireDate,
                            m.Role,
                            m.Salary,
                            m.Employees
                        })
                        .ToList();

                    //checks if managers is populated
                    if(managers == null){
                        return new JsonResult("Managers not found"){
                            StatusCode = 404
                        };
                    }

                    var result = new {

                        Managers = managers
                    };

                    return new JsonResult(result){
                        StatusCode = 201
                    };
                }
                

            }catch(Exception e){

                return new JsonResult("An error occured: " + e.Message){
                    StatusCode = 500
                };
            }
        
        }
    }
}    