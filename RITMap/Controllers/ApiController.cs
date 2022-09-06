using Microsoft.AspNetCore.Mvc;
using RITMap.Models;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using System.Security.Claims;
using Microsoft.Extensions.Hosting;
using System.Xml.Linq;
using RITMap.Context;
using System.Xml.XPath;

namespace RITMap.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ApiController : ControllerBase
    {

        private readonly ApplicationContext _dbcontext;

        public ApiController(ApplicationContext dbcontext)
        {
            _dbcontext = dbcontext;
        }

        [HttpGet("getpins")]
        public List<Pin> GetPins()
        {
            return _dbcontext.Pins.ToList();
        }

        [HttpGet("getpins/{category}")]
        public List<Pin> GetPins(string category)
        {
            return _dbcontext.Pins.Where(x => x.Category == category).ToList();
        }

        [HttpPost("createpin")]
        public void CreatePin(Pin pin)
        {
            // check pin is in bounds
            if (pin.Longitude > -77.68697 && pin.Longitude < -77.6537
                && pin.Latitude > 43.07808 && pin.Latitude < 43.09281)
            {
                pin.Reports = 0;
                _dbcontext.Pins.Add(pin);
                _dbcontext.SaveChanges();
            }
        }
        [HttpPost("api/report/{id}")]
        public void ReportPin(int id)
        {
            // get pin with id
            var pin = _dbcontext.Pins.FirstOrDefault(x => x.Id == id);
            if (pin != null)
            {
                pin.Reports++;
                _dbcontext.SaveChanges();
            }
        }
    }
}