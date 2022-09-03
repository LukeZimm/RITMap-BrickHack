using Microsoft.AspNetCore.Mvc;
using RITMap.Models;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using System.Security.Claims;
using Microsoft.Extensions.Hosting;
using System.Xml.Linq;
using RITMap.Context;

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
            // get post object
            return _dbcontext.Pins.ToList();
        }

        [HttpPost("createpin")]
        public void CreatePin(Pin pin)
        {
            _dbcontext.Pins.Add(pin);
            _dbcontext.SaveChanges();
        }
    }
}