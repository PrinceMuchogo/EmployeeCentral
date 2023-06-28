using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Identity;

public class Admin{

    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int Id {get; set;}


    public string Name {get; set;} = "Administrator";
    public string Password {get; set;} = "admin0022";
    public string Email {get; set;} = "admin@org.co.zw";



}