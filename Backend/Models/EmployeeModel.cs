using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using BCrypt.Net;
using Employee_Management_System.Models;

public class Employee {

        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        
        public string? Name { get; set; }
        public string? PhoneNumber { get; set; }
        public string? Role { get; set;}
        public string? Email { get; set;}
        public string? PasswordHarsh {get;set;}
        public string? Department { get; set; }
        public decimal? Salary { get; set; }
        public DateTime HireDate {get; set;}
        public decimal? Performance {get; set;}
        public ICollection<LeaveRequest>? LeaveRequests {get; set;}
        public ICollection<Task>? Tasks {get; set;}
        public int? ManagerId { get; set; }

        [ForeignKey("ManagerId")]
        public Manager? Manager {get; set;}

        //sets the hire date to the current date and time when the employee is instantiated
        public Employee(){
            
            HireDate = DateTime.Now;
        }

        /*
        public void SetPassword(string password){
            string  salt = BCrypt.Net.BCrypt.GenerateSalt();
            PasswordHarsh = BCrypt.Net.BCrypt.HashPassword(password, salt);
        }

        public bool VerifyPassword(string password){
            return BCrypt.Net.BCrypt.Verify(password, PasswordHarsh);
        }

        */
}