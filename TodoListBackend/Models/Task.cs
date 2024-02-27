using System.ComponentModel.DataAnnotations;

namespace TodoListApi.Models
{


    public class Task
    {
        public int Id { get; set; }

        [Required]
        public string Name { get; set; }

        [Required]
        public String Status { get; set; }
    }
}
