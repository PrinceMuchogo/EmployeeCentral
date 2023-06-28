using Employee_Management_System.Data;
using Microsoft.AspNetCore.Mvc;

namespace Employee_Management_System.Controllers

{
    [Route("api/[controller]")]
    [ApiController]

    public class TaskController : ControllerBase{

        private readonly IConfiguration _configuration;

        public TaskController(IConfiguration configuration){

            _configuration = configuration;
        }

        //Http request to create a new task including assigned employee's id
        [HttpPost]

        public JsonResult Create([FromBody] Task task){

            //checks if the request body is null
            if(task == null){

                return new JsonResult("No task added"){

                    StatusCode = 400
                };
            }

            try{

                using(var context = new AppDBContext()){

                    //checks if the tasks context exists or has been propperly configured to access the database
                    if (context.Tasks == null){

                        return new JsonResult("Tasks table is null or misconfigured."){

                            StatusCode = 400
                        };
                    }

                    //find the employee by id
                    var employee = context.Employees?.FirstOrDefault(e => e.Id == task.EmployeeId);

                    //checks if the employee was not found
                    if(employee == null){

                        return new JsonResult($"Employee not found. Could not assign task: {task.TaskName}"){

                            StatusCode = 404
                        };
                    }

                    var newTask = new Task{
                    TaskName = task.TaskName,
                    Description = task.Description,
                    Duration = task.Duration,
                    EmployeeId =task.EmployeeId
                };

        

                //adding new task to the database
                context.Tasks?.Add(newTask);
                context.SaveChanges();

                var result = new {

                    TaskName = newTask.TaskName,
                    Description = newTask.Description,
                    Duration = newTask.Duration,
                };

                return new JsonResult("Task added successfully"){

                    StatusCode = 201
                };
                }
                
            }
            catch(Exception e){

                return new JsonResult("An error occured: " + e.Message){
                    StatusCode = 400
                };
            }


        }

        //Http request to retrieve a task using employees id
        [HttpGet]

        public JsonResult Get(int Id){

            try{

                using(var context = new AppDBContext()){

                    //checks if the tasks context exists or has been propperly configured to access the database
                    if (context.Employees == null){

                        return new JsonResult("Tasks and Employees tables are null or misconfigured."){

                            StatusCode = 400
                        };
                    }

                    //creates a new employee object with the retrieved information from database
                        var employeeTasks = context.Employees
                            .Where(e => e.Id == Id)
                            .Select(e => new {
                           
                                TaskCount = e.Tasks != null ? e.Tasks.Count : 0,
                                e.Tasks
                            })
                            .FirstOrDefault();

                    //checks if the task object is null
                    if(employeeTasks == null){

                        return new JsonResult("Employee Tasks could not be found"){

                            StatusCode = 404
                        };
                    }

                    var result =new {
                        
                        Task_Count = employeeTasks.TaskCount,
                        Tasks = employeeTasks.Tasks
                    };

                    //sends a response in json format
                    return new JsonResult(result){

                        StatusCode = 201
                    };

                }
            }catch(Exception e){

                return new JsonResult($"A fatal error occured: " + e.Message){

                    StatusCode = 500
                };
            }
        }

        //Http request to update task using task id
        [HttpPut]

        public JsonResult Update([FromBody] Task updateTask){

            //checks if request body is null
            if(updateTask == null){

                return new JsonResult("Bad Request"){

                    StatusCode = 400
                };
            }

            try{

                using(var context = new AppDBContext()){

                    //checks if the tasks context exists or has been propperly configured to access the database
                    if (context.Tasks == null){

                        return new JsonResult("Tasks table is null or misconfigured."){

                            StatusCode = 400
                        };
                    }

                    var findTaskById = context.Tasks?.FirstOrDefault(t => t.Id == updateTask.Id);

                    //checks if the task exists
                    if(findTaskById == null){

                        return new JsonResult("Task not found"){

                            StatusCode = 404
                        };
                    }

                    context.Tasks?.Attach(findTaskById);
                    findTaskById.TaskName = updateTask.TaskName ?? findTaskById.TaskName;
                    findTaskById.Description = updateTask.Description ?? findTaskById.Description;
                    findTaskById.Duration = updateTask.Duration ?? findTaskById.Duration;
                    findTaskById.Report = updateTask.Report ?? findTaskById.Report;
                    findTaskById.Score = updateTask.Score == 0 ? findTaskById.Score : updateTask.Score;

                    //Task is then saved as updated
                    context.SaveChanges();

                    //sends a response in json format
                    return new JsonResult("Task updated successfully"){

                        StatusCode = 201
                    };

                }
            }catch(Exception e){

                return new JsonResult("An unexpected error occured: " + e.Message){

                    StatusCode =500
                };
            }
        }

        //Http request to delete a task using task id
        [HttpDelete]

        public JsonResult Remove([FromBody] Task deleteTask){

            //checks if the request body is null
            if(deleteTask == null){
                
                return new JsonResult("Bad request"){

                    StatusCode = 400
                };
            }

            try{

                using(var context = new AppDBContext()){

                    //checks if the tasks context exists or has been propperly configured to access the database
                    if (context.Tasks == null){

                        return new JsonResult("Tasks table is null or misconfigured."){

                            StatusCode = 400
                        };
                    }

                    //find tasks by id
                    var findTaskById = context.Tasks?.FirstOrDefault(t => t.Id == deleteTask.Id);

                    //checks if the task was not found
                    if(findTaskById == null){

                        return new JsonResult("Task was not found"){

                            StatusCode = 404
                        };
                    }

                    //if found the task is removed from the database
                    context.Tasks?.Remove(findTaskById);
                    context.SaveChanges();

                    //sends a response in json format
                    return new JsonResult("Task was removed successfully"){

                        StatusCode = 201
                    };
                }
            }catch(Exception e){

                return new JsonResult("An unexpected error occured: " + e.Message){

                    StatusCode =500
                };
            }
        }

        //Http request to update employee performance by employeeId
        [HttpPut("performance")]

        public JsonResult GetPerformance([FromBody] Employee employee){

            //checks if the request body is null
            if(employee == null){

                return new JsonResult("Bad request"){

                    StatusCode =400
                };
            }

            //error catching block
            try{
                //creating a context object using app database context and dropped after return
                using(var context = new AppDBContext()){

                    //checks if the tasks context exists or has been propperly configured to access the database
                    if (context.Tasks == null){

                        return new JsonResult("Tasks table is null or misconfigured."){

                            StatusCode = 400
                        };
                    }

                    //retrieve tasks using employee id and returns a count
                    var taskCount = context.Tasks
                        .Where(t => t.EmployeeId == employee.Id)
                        .Count();

                    //adds the scores of the tasks
                    var totalScored = context.Tasks
                        .Where( t => t.EmployeeId == employee.Id)
                        .Sum(t => t.Score);

                    //calculate expected total score
                    var expectedTotalScore = taskCount * 5;

                    //initialize the performance variable
                    decimal performance = 0;

                    //checks if the employee had no tasks assigned
                    if(taskCount == 0){
                        performance = 0;
                    } else{

                        //calculate employee perfomance as a percentage of completed tasks
                        performance = totalScored / expectedTotalScore * 100;
                    }

                    //checks if the employees context exists or has been propperly configured to access the database
                    if (context.Employees == null){

                        return new JsonResult("Employees table is null or misconfigured."){

                            StatusCode = 400
                        };
                    }

                    //fiind the employee by Id
                    var findEmployeeById = context.Employees.FirstOrDefault(e => e.Id == employee.Id);

                    //updating employee's performance
                    if(findEmployeeById != null){

                        context.Employees.Attach(findEmployeeById);
                        findEmployeeById.Performance = performance;
                    }
                    
                    //save changes to the database
                    context.SaveChanges();

                    //sends response in json format
                    return new JsonResult("Performance updated"){
                        
                        StatusCode = 201
                    };
                }
            }catch(Exception e){

                return new JsonResult("An error occured: " + e.Message);
            }
        }



    }
}