import React from 'react';
import { Mail, Phone, MapPin, ExternalLink } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { t } = useLanguage();

  return (
    <footer className="bg-[#0f1a24] text-gray-300">
      {/* Main Footer Content */}
      <div className="container mx-auto px-8 py-16">
        <div className="grid md:grid-cols-4 gap-12">
          {/* Brand Column */}
          <div className="md:col-span-1">
            <h3 className="text-2xl font-serif text-white mb-4">
              English<span className="text-[#E8833A]">Online</span>
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              {t('footer.brandDescription')}
            </p>
            <a
              href="https://study-english.softr.app/sign-in"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#2980b9] hover:bg-[#3498db] text-white font-semibold px-6 py-3 rounded-md transition-colors duration-300"
            >
              {t('footer.studentLogin')}
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">{t('footer.quickLinks')}</h4>
            <ul className="space-y-3">
              <li>
                <a href="#coaching" className="text-gray-400 hover:text-[#4ADE80] transition-colors text-sm">
                  {t('footer.businessCoaching')}
                </a>
              </li>
              <li>
                <a href="#tutoring" className="text-gray-400 hover:text-[#4ADE80] transition-colors text-sm">
                  {t('footer.studentTutoring')}
                </a>
              </li>
              <li>
                <a href="#groups" className="text-gray-400 hover:text-[#4ADE80] transition-colors text-sm">
                  {t('footer.groupSessions')}
                </a>
              </li>
              <li>
                <a href="#about" className="text-gray-400 hover:text-[#4ADE80] transition-colors text-sm">
                  {t('footer.aboutKate')}
                </a>
              </li>
              <li>
                <a href="#testimonials" className="text-gray-400 hover:text-[#4ADE80] transition-colors text-sm">
                  {t('footer.testimonials')}
                </a>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-semibold mb-4">{t('footer.services')}</h4>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-gray-400 hover:text-[#4ADE80] transition-colors text-sm">
                  {t('footer.oneOnOneCoaching')}
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-[#4ADE80] transition-colors text-sm">
                  {t('footer.smallGroupClasses')}
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-[#4ADE80] transition-colors text-sm">
                  {t('footer.ieltsPreparation')}
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-[#4ADE80] transition-colors text-sm">
                  {t('footer.businessEnglish')}
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-[#4ADE80] transition-colors text-sm">
                  {t('footer.conversationPractice')}
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-4">{t('footer.getInTouch')}</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-[#E8833A] mt-0.5 flex-shrink-0" />
                <a href="mailto:kate@study-english.online" className="text-gray-400 hover:text-white transition-colors text-sm">
                  kate@study-english.online
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-[#E8833A] mt-0.5 flex-shrink-0" />
                <a href="https://wa.link/nisn2y" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors text-sm">
                  {t('footer.whatsappChat')}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#E8833A] mt-0.5 flex-shrink-0" />
                <span className="text-gray-400 text-sm">
                  {t('footer.location')}
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-sm">
              © {currentYear} {t('footer.copyright')}
            </p>
            <div className="flex items-center gap-6">
              <a href="#" className="text-gray-500 hover:text-gray-300 transition-colors text-sm">
                {t('footer.privacyPolicy')}
              </a>
              <a href="#" className="text-gray-500 hover:text-gray-300 transition-colors text-sm">
                {t('footer.termsOfService')}
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
