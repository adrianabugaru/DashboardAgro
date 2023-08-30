using Microsoft.AspNetCore.Mvc.RazorPages;
using System.ComponentModel.DataAnnotations;

namespace DashboardAgro.Models
{
    public class Contact : PageModel
    {

        [Display(Name ="Email")]
        public string SenderEmail { get; set; }

        [Display(Name = "Name")]
        public string SenderName { get; set; }
        public string Message { get; set; }

    }
}
