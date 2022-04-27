using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Data.Models
{
    public class FetchFileRequest
    {
        public string Type { get; set; }
        public int StartFrom { get; set; }
        public int Size { get; set; }
    }
}
