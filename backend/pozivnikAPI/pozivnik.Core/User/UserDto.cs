using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace pozivnik.Core.User
{
    public class UserDto
    {
        public string? Token { get; set; }
        public LocationDto? Location { get; set; }
    }
}
