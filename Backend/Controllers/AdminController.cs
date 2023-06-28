using Microsoft.AspNetCore.Mvc;
using Employee_Management_System.Data;
using Employee_Management_System.Models;
using Microsoft.EntityFrameworkCore;

namespace Employee_Management_System.Controllers
{
    [Route("api/[controller]")]
    [ApiController]

public class AdminController : ControllerBase{

    private readonly IConfiguration _configuration;

    public AdminController(IConfiguration configuration){

        _configuration = configuration;
    }

    //Http request to authenticate administrator
    [HttpPost("authenticate")]

    public JsonResult Authenticate([FromBody] Admin admin){

        //checks if the request body is null
        if(admin == null){

            return new JsonResult("Bad Request"){

                StatusCode = 400
            };
        }

        try{
            using(var context = new AppDBContext()){

                //checks if the admin table exists or has been propperly configured to access the database
                    if (context.Admins == null){
                        return new JsonResult("Adimn table does not exist."){

                            StatusCode = 400
                        };
                    }

                //find the admin by email
                var findAdminByEmail = context.Admins?.
                    FirstOrDefault(a => a.Email == admin.Email);

                //checks if the admin is not found
                if(findAdminByEmail == null){

                    return new JsonResult("Incorrect Email or Password"){

                        StatusCode = 401
                    };
                }

                //authenticates admin by password
                if(findAdminByEmail.Password != admin.Password){

                    return new JsonResult("Incorrect Email or Password"){

                        StatusCode = 401
                    };
                }

                var userAdmin = new{
                    Name = findAdminByEmail.Name,
                    Email = findAdminByEmail.Email,
                    Password = findAdminByEmail.Password
                };

                //sends response in json format if successfully authenticated
                return new JsonResult(userAdmin){

                    StatusCode = 200
                };
            }
        }catch(Exception e){

            return new JsonResult("An unexpected error occured" + e.Message){

                StatusCode = 500
            };
        }
    }

    //Http request to retrieve all employees from the database using managerId
        [HttpGet("employees")]

        public JsonResult Get([FromBody] Manager managerr){

            //checks if the request body is null
            if(managerr == null){

                return new JsonResult("Bad request"){

                    StatusCode = 400
                };
            }

            try{
            //creaing an instance
            using (var context = new AppDBContext()){

                    //checks if the manager table exists or has been propperly configured to access the database
                    if (context.Managers == null){
                        return new JsonResult("Manager is null."){

                            StatusCode = 400
                        };


                    }
                //searching the manager by Id and store in a variable
                var manager = context.Managers?.
                    FirstOrDefault(m => m.Id == managerr.Id);

                // checking if the manager exists
                if(manager ==null){
                    return new JsonResult("Manager not found."){
                        StatusCode = 404
                    };
                }
                
                //Retrieving the employee information using the manager Id
                var resultManager = context.Managers?          //gets all managers from the database context
                    .Include(manager => manager.Employees)     //loads the related Employees for each employee
                    .Where(m => m.Id == managerr.Id)           //filters to the specific manager with managerr.Id
                    .FirstOrDefault();                         //gets the first nand only manager with that id

                // checks if the manager exists
                if (resultManager == null){
                    return new JsonResult("Manager not found"){
                        StatusCode = 404
                    };
                }

                //Access the loaded Employees data
                var employees = resultManager.Employees;

                var result = new{
                    ManagerName = resultManager.Name,
                    employees
                };
                
                return new JsonResult(result){
                    StatusCode = 201
                };
            }
            }catch(Exception e){

                return new JsonResult("An unexpected error occured: " + e.Message);
            }
        }

    //Http request to retrieve all managers from the database
    [HttpGet("managers")]

    public JsonResult GetManagers(){

        try{

            using(var context = new AppDBContext()){

                //checks if managers context exists
                if(context.Managers == null){

                    return new JsonResult("Managers not found"){

                        StatusCode = 404
                    };
                }

                //retrieves all managers from the database context
                var managers = context.Managers.ToList();

                //sends a json formatted response
                return new JsonResult(managers){

                    StatusCode = 201
                };

            }

        }catch(Exception e){

            return new JsonResult("An error occured: " + e.Message){

                StatusCode = 404
            };
        }
    }


    }
}