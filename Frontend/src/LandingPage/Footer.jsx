import React from "react";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#161B22] text-[#A8B2C2] border-t border-white/10">
      <div className="container mx-auto">
        {/* Top Section: Responsive Grid */}
        {/* Default: 1 col, Small screens: 2 cols, Large screens: 4 cols */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 p-10">
          {/* Column 1: Logo & Newsletter */}
          {/* Spans full width on small, half on medium, quarter on large */}
          <aside className="sm:col-span-2 lg:col-span-1">
            <p className="font-bold text-2xl text-white">AITicket</p>
            <p>The Future of Support is Automated.</p>
            <div className="form-control mt-4 max-w-xs">
              <h6 className="footer-title text-white">Stay Updated</h6>
              <fieldset className="form-control">
                <div className="join">
                  <input
                    type="email"
                    placeholder="you@email.com"
                    className="input input-bordered join-item bg-base-100"
                  />
                  <button className="btn btn-primary join-item">
                    Subscribe
                  </button>
                </div>
              </fieldset>
            </div>
          </aside>

          {/* Column 2: Product Links */}
          <nav className="flex flex-col">
            <h6 className="footer-title text-white">Product</h6>
            <a
              href="#features"
              className="link link-hover hover:text-[#00F5FF]"
            >
              Features
            </a>
            <a href="#pricing" className="link link-hover hover:text-[#00F5FF]">
              Pricing
            </a>
            <a className="link link-hover hover:text-[#00F5FF]">Integrations</a>
          </nav>

          {/* Column 3: Company Links */}
          <nav className="flex flex-col">
            <h6 className="footer-title text-white">Company</h6>
            <a className="link link-hover hover:text-[#00F5FF]">About us</a>
            <a className="link link-hover hover:text-[#00F5FF]">Contact</a>
          </nav>

          {/* Column 4: Legal Links */}
          <nav className="flex flex-col">
            <h6 className="footer-title text-white">Legal</h6>
            <a className="link link-hover hover:text-[#00F5FF]">Terms of use</a>
            <a className="link link-hover hover:text-[#00F5FF]">
              Privacy policy
            </a>
          </nav>
        </div>

        {/* Bottom Section: Copyright & Social Media */}
        <div className="p-10 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center text-sm">
          <p>&copy; 2025 AITicket Inc. All rights reserved.</p>
          <div className="flex gap-4 mt-4 sm:mt-0">
            <a
              href="#"
              className="text-2xl hover:text-[#00F5FF] transition-colors"
            >
              <FaTwitter />
            </a>
            <a
              href="#"
              className="text-2xl hover:text-[#00F5FF] transition-colors"
            >
              <FaLinkedin />
            </a>
            <a
              href="#"
              className="text-2xl hover:text-[#00F5FF] transition-colors"
            >
              <FaGithub />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
