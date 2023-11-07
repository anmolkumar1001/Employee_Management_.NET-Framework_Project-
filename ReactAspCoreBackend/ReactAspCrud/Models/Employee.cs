using System.ComponentModel.DataAnnotations;

namespace ReactAspCrud.Controllers.Models
{
    public class Employee
    {
        [Key]
        public int id { get; set; }
        public string EmployeeId { get; set; }
        public string EmployeeName { get; set; }
        public string Department { get; set;}
        public string DateOfJoining { get; set;}
        public string Contact { get; set; }
    }
}
