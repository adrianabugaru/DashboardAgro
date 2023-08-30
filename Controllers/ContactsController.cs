using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using DashboardAgro.Models;
using Microsoft.AspNetCore.Identity.UI.Services;
using Microsoft.Extensions.Configuration;

namespace DashboardAgro.Controllers
{
    public class ContactsController : Controller
    {
        private readonly IEmailSender _emailSender;
        private readonly IConfiguration _configuration;

        public ContactsController(IEmailSender emailSender, IConfiguration configuration)
        {
            _emailSender = emailSender;
            _configuration = configuration;
        }

        [HttpGet]
        public IActionResult ContactMail()
        {
            return View();
        }

        public async Task<IActionResult> Send(string subject, string message)
        {
            var receiverAddress = "agromonlicenta@gmail.com";

            await _emailSender.SendEmailAsync(receiverAddress, subject, message);

            return RedirectToAction("ContactMail");
        }
    }
}
