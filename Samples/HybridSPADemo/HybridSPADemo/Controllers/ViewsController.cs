using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace HybridSPADemo.Controllers
{
    public class ViewsController : Controller
    {
        //
        // GET: /Views/
        public ActionResult Orders()
        {
            return View();
        }
	}
}