using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

public class Task{

    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int Id {get; set;}


    public string? TaskName {get; set;}
    public string? Description {get; set;}
    public string? Duration {get; set;}
    public string? Report {get; set;}
    public int Score {get; set;} = 0;
    public int? EmployeeId {get; set;}

    [ForeignKey("EmployeeId")]
    public Employee? Employee {get; set;}
}
