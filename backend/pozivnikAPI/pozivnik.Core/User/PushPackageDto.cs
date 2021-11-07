using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace pozivnik.Core.User
{
    public class PushPackageDto
    {
        public List<string> Tokens { get; set; }
        public string Message { get; set; }
    }
}
