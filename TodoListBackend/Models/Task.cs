using System.ComponentModel.DataAnnotations;

namespace TodoListApi.Models
{
    public enum TaskStatus
    {
        Finished,
        Ongoing
    }

    public class Task
    {
        public int Id { get; set; }

        [Required]
        public string Name { get; set; }

        [Required]
        public TaskStatus Status { get; set; }
    }
}
