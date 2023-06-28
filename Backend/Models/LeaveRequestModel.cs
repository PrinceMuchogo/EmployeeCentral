using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

public class LeaveRequest{

    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int Id {get; set;}


    public string? LeaveType {get; set;}
    public string? StartDate {get; set;}
    public string? EndDate {get; set;}
    public string Status {get; set;} = "Keep cheking!";
    public int EmployeeId {get; set;}
    
    [ForeignKey("EmployeeId")]
    public Employee? Employee {get; set;}
}
