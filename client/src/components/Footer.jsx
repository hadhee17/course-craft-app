function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10 mt-20">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 px-6">
        {/* Brand */}
        <div>
          <h3 className="text-2xl font-bold text-white mb-4">CourseHub</h3>
          <p className="text-gray-400">
            Empowering learners with top-rated online courses to grow skills and
            careers.
          </p>
        </div>

        {/* Company */}
        <div>
          <h4 className="font-semibold text-white mb-3">Company</h4>
          <ul className="space-y-2">
            <li>
              <a href="/about" className="hover:text-white">
                About
              </a>
            </li>
            <li>
              <a href="/careers" className="hover:text-white">
                Careers
              </a>
            </li>
            <li>
              <a href="/contact" className="hover:text-white">
                Contact
              </a>
            </li>
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h4 className="font-semibold text-white mb-3">Resources</h4>
          <ul className="space-y-2">
            <li>
              <a href="/blog" className="hover:text-white">
                Blog
              </a>
            </li>
            <li>
              <a href="/help" className="hover:text-white">
                Help Center
              </a>
            </li>
            <li>
              <a href="/faq" className="hover:text-white">
                FAQs
              </a>
            </li>
          </ul>
        </div>

        {/* Socials */}
        <div>
          <h4 className="font-semibold text-white mb-3">Follow Us</h4>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-white">
              🐦
            </a>
            <a href="#" className="hover:text-white">
              💼
            </a>
            <a href="#" className="hover:text-white">
              📸
            </a>
          </div>
        </div>
      </div>

      <div className="text-center text-gray-500 mt-8 border-t border-gray-700 pt-6">
        © {new Date().getFullYear()} CourseCraft. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
