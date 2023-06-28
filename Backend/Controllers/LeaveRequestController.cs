using Employee_Management_System.Data;
using Microsoft.AspNetCore.Mvc;

namespace Employee_Management_System.Controllers

{
    [Route("api/[controller]")]
    [ApiController]

    public class LeaveRequestController : ControllerBase{

        private readonly IConfiguration _configuration;

        public LeaveRequestController(IConfiguration configuration){

            _configuration = configuration;
        }

        //Http request to create a leave request
        [HttpPost]

        public JsonResult Create([FromBody] LeaveRequest leaveRequest){

            //checks if the request body is null
            if(leaveRequest == null){

                return new JsonResult("Bad request"){

                    StatusCode = 400 
                };
            }

            try{

                using(var context = new AppDBContext()){

                    //checks if the LeaveRequest context exists or has been propperly configured to access the database
                    if (context.LeaveRequests == null){

                        return new JsonResult("Leave requests table is null or misconfigured."){

                            StatusCode = 400
                        };
                    }

                    var newLeaveRequest = new LeaveRequest{

                        LeaveType = leaveRequest.LeaveType,
                        StartDate = leaveRequest.StartDate,
                        EndDate = leaveRequest.EndDate,
                        Status = leaveRequest.Status,
                        EmployeeId = leaveRequest.EmployeeId

                    };

                    //adds the leave request to the database
                    context.LeaveRequests?.Add(newLeaveRequest);
                    context.SaveChanges();

                    //sends response in json format
                    return new JsonResult("Your request has been successfully send"){

                        StatusCode = 201
                    };
                }
            }catch(Exception e){

                return new JsonResult("An unexpected error occured" + e.Message){

                    StatusCode = 404
                };
            }
        }

        //Http request to retrieve leave request using employee id
        [HttpGet]

        public JsonResult Get(int Id){

            try{

                using(var context = new AppDBContext()){

                    //checks if the Employees context exists or has been propperly configured to access the database
                    if (context.Employees == null){

                        return new JsonResult("Employee table is null or misconfigured."){

                            StatusCode = 400
                        };
                    };

                    //if employee is found by id then query the employees using employeeId
                    var employeeLeaveRequest = context.Employees
                        .Where(e => e.Id == Id)
                        .Select(e => new {
                            LeaveRequests_Count = e.LeaveRequests != null ? e.LeaveRequests.Count : 0,
                            e.LeaveRequests
                        }).FirstOrDefault();


                    //checks if the employee is not found
                    if(employeeLeaveRequest == null){

                        return new JsonResult("No leave requests"){

                            StatusCode = 400
                        };
                    }

                    //if leave request found
                    var result = new{
                        LeaveRequests = employeeLeaveRequest.LeaveRequests,
                        Count = employeeLeaveRequest.LeaveRequests_Count
                    };

                    //sends a response in json format
                    return new JsonResult(result){

                        StatusCode = 201
                    };

                }
            }catch(Exception e){

                return new JsonResult("An error occured: " + e.Message);
            }
        }

        //Http request to update the leave request using leave request id
        [HttpPut]

        public JsonResult Update([FromBody] LeaveRequest leaveRequest){

            //checks if the request body is null
            if(leaveRequest == null){

                return new JsonResult("Bad request"){

                    StatusCode = 400
                };
            }

            try{

                using(var context = new AppDBContext()){

                    //checks if the leave request context exists or has been propperly configured to access the database
                    if (context.LeaveRequests == null){

                        return new JsonResult("Leave requests table is null or misconfigured."){

                            StatusCode = 400
                        };
                    }

                    var findLeaveRequestById = context.LeaveRequests?.FirstOrDefault(l => l.Id == leaveRequest.Id);

                    //checks if the leave request is found
                    if(findLeaveRequestById == null){

                        return new JsonResult("Leave request could not be found"){

                            StatusCode = 400 
                        };
                    }

                    //if leave request is found
                    context.LeaveRequests?.Attach(findLeaveRequestById);
                    findLeaveRequestById.Status = leaveRequest.Status ?? findLeaveRequestById.Status;
                    findLeaveRequestById.StartDate = leaveRequest.StartDate ?? findLeaveRequestById.StartDate;
                    findLeaveRequestById.EndDate = leaveRequest.EndDate ?? findLeaveRequestById.EndDate;

                    //the leave request is then updated
                    context.SaveChanges();

                    //sends response in json format
                    return new JsonResult("Updated");


                }
            }catch(Exception e){

                return new JsonResult("An unexpected error occured: " + e.Message){

                    StatusCode = 404
                };
            }
        }

        //Http request to delete leave request using leave request id
        [HttpDelete]

        public JsonResult Delete([FromBody] LeaveRequest leaveRequestId){

            try{

                using(var context = new AppDBContext()){

                    //checks if the leave requests context exists or has been propperly configured to access the database
                    if (context.LeaveRequests == null){

                        return new JsonResult("leave request table is null or misconfigured."){

                            StatusCode = 400
                        };
                    }

                    //find the leave request uing leaverequest ID
                    var findLeaveRequestById = context.LeaveRequests?.FirstOrDefault(l => l.Id == leaveRequestId.Id);

                    //checks if the leave request was not found
                    if(findLeaveRequestById == null){

                        return new JsonResult("Could not delete: leave request not found"){

                            StatusCode = 404
                        };
                    }

                    //if found the leave request is removed from the database
                    context.LeaveRequests?.Remove(findLeaveRequestById);
                    context.SaveChanges();

                    //sends response in json format
                    return new JsonResult("Deleted successfully"){

                        StatusCode = 201
                    };
                }
            }catch(Exception e){

                return new JsonResult("A fatal error occured: " + e.Message){

                    StatusCode = 401
                };
            }
        }


    }
}