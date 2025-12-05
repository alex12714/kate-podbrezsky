import React, { useState } from 'react';
import { 
  ArrowRight, 
  ArrowLeft, 
  Check, 
  User, 
  Mail, 
  Phone, 
  Globe, 
  Briefcase, 
  GraduationCap, 
  Users, 
  Sparkles,
  Target,
  Clock,
  DollarSign,
  Heart,
  Zap,
  MessageCircle
} from 'lucide-react';

const IntakeForm = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    // Section 1
    fullName: '',
    email: '',
    whatsapp: '',
    country: '',
    timezone: '',
    studyDuration: '',
    currentLevel: '',
    englishUse: [],
    mainDifficulty: [],
    // Section 2
    englishType: '',
    studyPreference: '',
    importantFactor: '',
    readyToInvest: '',
    // Section 3
    goalResult: '',
    blockers: [],
    importanceScale: 5,
    lifeChange: '',
    wantRecommendation: '',
    // Optional
    budgetRange: '',
    funQuestion: ''
  });
  const [showResult, setShowResult] = useState(false);

  const steps = [
    { title: 'Get Started', icon: <Sparkles className="w-5 h-5" /> },
    { title: 'Profile', icon: <User className="w-5 h-5" /> },
    { title: 'Format', icon: <Target className="w-5 h-5" /> },
    { title: 'Goals', icon: <Heart className="w-5 h-5" /> },
    { title: 'Result', icon: <Check className="w-5 h-5" /> }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleMultiSelect = (field, value) => {
    setFormData(prev => {
      const current = prev[field] || [];
      if (current.includes(value)) {
        return { ...prev, [field]: current.filter(v => v !== value) };
      }
      return { ...prev, [field]: [...current, value] };
    });
  };

  const getRecommendation = () => {
    const { englishType, studyPreference, readyToInvest, englishUse } = formData;
    
    const isBusiness = englishType === 'business' || 
      englishUse.includes('Work') || 
      englishUse.includes('Business');
    const isStudent = englishType === 'academic' || englishUse.includes('Study');
    const wants1on1 = studyPreference === '1on1';
    const wantsGroup = studyPreference === 'group';
    const isReady = readyToInvest === 'ready';
    const isExploring = readyToInvest === 'exploring';

    if (isBusiness && wants1on1 && isReady) {
      return {
        type: 'premium',
        title: 'High-Ticket Coaching Strategy Call',
        duration: '60 minutes',
        description: 'Perfect for professionals who want accelerated results. Get a personalized roadmap to confident business English.',
        color: 'from-amber-500 to-orange-500'
      };
    }
    
    if (isStudent || wantsGroup) {
      return {
        type: 'group',
        title: 'Group Placement Session',
        duration: '30 minutes',
        description: 'Find your perfect group and level. Learn with peers who share your goals and timeline.',
        color: 'from-blue-500 to-cyan-500'
      };
    }
    
    if (isExploring) {
      return {
        type: 'intro',
        title: 'Free English Diagnostic Call',
        duration: '20 minutes',
        description: 'No pressure, no commitment. Let&apos;s assess your level and explore what&apos;s possible for you.',
        color: 'from-green-500 to-emerald-500'
      };
    }

    return {
      type: 'standard',
      title: 'Personalized Strategy Session',
      duration: '45 minutes',
      description: 'Get clarity on your English journey with a customized plan designed for your unique situation.',
      color: 'from-purple-500 to-pink-500'
    };
  };

  const nextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(prev => prev + 1);
      if (currentStep === 3) {
        setShowResult(true);
      }
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
      setShowResult(false);
    }
  };

  // Initial "Ready to Start" Section
  if (!showForm) {
    return (
      <section className="relative overflow-hidden">
        {/* Seamless gradient continuation from hero */}
        <div className="bg-gradient-to-br from-[#1a2b3c] via-[#1f3345] to-[#2a3f4f] pt-4 pb-16 px-8">
          {/* Decorative separator line */}
          <div className="container mx-auto max-w-5xl mb-10">
            <div className="flex items-center gap-4">
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
              <span className="text-white/40 text-sm uppercase tracking-widest">Choose Your Path</span>
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            </div>
          </div>
          
          <div className="container mx-auto max-w-5xl relative z-10">
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-serif text-white mb-3">
                Ready to <span className="text-[#E8833A]">Start</span>?
              </h2>
              <p className="text-gray-300 text-base max-w-2xl mx-auto">
                Tell us about yourself and we&apos;ll recommend the perfect learning path for your English journey.
              </p>
            </div>

            {/* Three Options */}
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              <div 
                onClick={() => { setFormData(prev => ({ ...prev, englishType: 'business' })); setShowForm(true); }}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 cursor-pointer hover:bg-white/20 transition-all duration-300 hover:scale-105 hover:-translate-y-1 border border-white/10 group"
              >
                <div className="w-16 h-16 bg-[#E8833A]/20 rounded-full flex items-center justify-center mb-6 group-hover:bg-[#E8833A]/30 transition-colors">
                  <Briefcase className="w-8 h-8 text-[#E8833A]" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Business Coaching</h3>
                <p className="text-gray-400 text-sm">
                  For professionals who need confident English for work, meetings, and career growth.
                </p>
                <div className="mt-4 flex items-center text-[#E8833A] text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                  Get started <ArrowRight className="w-4 h-4 ml-1" />
                </div>
              </div>

              <div 
                onClick={() => { setFormData(prev => ({ ...prev, englishType: 'academic' })); setShowForm(true); }}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 cursor-pointer hover:bg-white/20 transition-all duration-300 hover:scale-105 hover:-translate-y-1 border border-white/10 group"
              >
                <div className="w-16 h-16 bg-[#4ADE80]/20 rounded-full flex items-center justify-center mb-6 group-hover:bg-[#4ADE80]/30 transition-colors">
                  <GraduationCap className="w-8 h-8 text-[#4ADE80]" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Student Tutoring</h3>
                <p className="text-gray-400 text-sm">
                  For students preparing for exams, improving grades, or building academic English skills.
                </p>
                <div className="mt-4 flex items-center text-[#4ADE80] text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                  Get started <ArrowRight className="w-4 h-4 ml-1" />
                </div>
              </div>

              <div 
                onClick={() => { setFormData(prev => ({ ...prev, englishType: 'conversation' })); setShowForm(true); }}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 cursor-pointer hover:bg-white/20 transition-all duration-300 hover:scale-105 hover:-translate-y-1 border border-white/10 group"
              >
                <div className="w-16 h-16 bg-[#3b82f6]/20 rounded-full flex items-center justify-center mb-6 group-hover:bg-[#3b82f6]/30 transition-colors">
                  <Users className="w-8 h-8 text-[#3b82f6]" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Group Sessions</h3>
                <p className="text-gray-400 text-sm">
                  Learn with others in small, interactive groups. Great for practice and community.
                </p>
                <div className="mt-4 flex items-center text-[#3b82f6] text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                  Get started <ArrowRight className="w-4 h-4 ml-1" />
                </div>
              </div>
            </div>

            <div className="text-center">
              <button 
                onClick={() => setShowForm(true)}
                className="text-gray-400 hover:text-white transition-colors underline"
              >
                Not sure? Take our quick assessment →
              </button>
            </div>
          </div>
        </div>
        
        {/* Diagonal white divider at bottom */}
        <div className="bg-gradient-to-br from-[#1a2b3c] via-[#1f3345] to-[#2a3f4f]">
          <svg
            viewBox="0 0 1440 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-20 lg:h-24"
            preserveAspectRatio="none"
          >
            <path
              d="M0 100L1440 0V100H0Z"
              fill="white"
            />
          </svg>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 px-8 bg-gray-50 min-h-screen">
      <div className="container mx-auto max-w-3xl">
        {/* Progress Steps */}
        <div className="flex items-center justify-between mb-12">
          {steps.map((step, index) => (
            <div key={index} className="flex items-center">
              <div className={`
                flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300
                ${index <= currentStep 
                  ? 'bg-[#4ADE80] text-white' 
                  : 'bg-gray-200 text-gray-400'}
              `}>
                {index < currentStep ? <Check className="w-5 h-5" /> : step.icon}
              </div>
              {index < steps.length - 1 && (
                <div className={`w-12 md:w-24 h-1 mx-2 rounded transition-all duration-300 ${
                  index < currentStep ? 'bg-[#4ADE80]' : 'bg-gray-200'
                }`} />
              )}
            </div>
          ))}
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12">
          
          {/* Step 0: Initial Selection */}
          {currentStep === 0 && (
            <div className="space-y-8">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-800 mb-2">What brings you here today?</h3>
                <p className="text-gray-500">Select the option that best describes your needs</p>
              </div>

              <div className="grid gap-4">
                {[
                  { value: 'business', label: 'Business & Career', icon: <Briefcase />, desc: 'Work, meetings, presentations' },
                  { value: 'academic', label: 'Academic / Exams', icon: <GraduationCap />, desc: 'IELTS, TOEFL, school' },
                  { value: 'conversation', label: 'Daily Conversation', icon: <MessageCircle />, desc: 'Travel, social, confidence' },
                  { value: 'relocation', label: 'Travel & Relocation', icon: <Globe />, desc: 'Moving abroad, visa prep' },
                  { value: 'personal', label: 'Personal Development', icon: <Sparkles />, desc: 'Self-improvement, hobbies' }
                ].map(option => (
                  <button
                    key={option.value}
                    onClick={() => handleInputChange('englishType', option.value)}
                    className={`flex items-center gap-4 p-4 rounded-xl border-2 transition-all duration-200 text-left ${
                      formData.englishType === option.value
                        ? 'border-[#4ADE80] bg-[#4ADE80]/5'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                      formData.englishType === option.value ? 'bg-[#4ADE80] text-white' : 'bg-gray-100 text-gray-500'
                    }`}>
                      {option.icon}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">{option.label}</p>
                      <p className="text-sm text-gray-500">{option.desc}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 1: Profile & Current Level */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-800 mb-2">Tell us about yourself</h3>
                <p className="text-gray-500">Basic information to personalize your experience</p>
              </div>

              {/* Basic Info */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      value={formData.fullName}
                      onChange={(e) => handleInputChange('fullName', e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#4ADE80] focus:border-transparent outline-none"
                      placeholder="Your name"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#4ADE80] focus:border-transparent outline-none"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">WhatsApp / Telegram</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="tel"
                      value={formData.whatsapp}
                      onChange={(e) => handleInputChange('whatsapp', e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#4ADE80] focus:border-transparent outline-none"
                      placeholder="+1 234 567 8900"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Country & Time Zone</label>
                  <div className="relative">
                    <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      value={formData.country}
                      onChange={(e) => handleInputChange('country', e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#4ADE80] focus:border-transparent outline-none"
                      placeholder="Country, GMT+X"
                    />
                  </div>
                </div>
              </div>

              {/* Current Level */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">What&apos;s your current English level?</label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {[
                    { value: 'beginner', label: 'Beginner (A0-A1)' },
                    { value: 'elementary', label: 'Elementary (A2)' },
                    { value: 'intermediate', label: 'Intermediate (B1)' },
                    { value: 'upperIntermediate', label: 'Upper-Intermediate (B2)' },
                    { value: 'advanced', label: 'Advanced (C1+)' }
                  ].map(level => (
                    <button
                      key={level.value}
                      onClick={() => handleInputChange('currentLevel', level.value)}
                      className={`p-3 rounded-lg border-2 text-sm transition-all ${
                        formData.currentLevel === level.value
                          ? 'border-[#4ADE80] bg-[#4ADE80]/5 text-[#4ADE80]'
                          : 'border-gray-200 hover:border-gray-300 text-gray-600'
                      }`}
                    >
                      {level.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* English Use */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">How do you currently use English? (Select all that apply)</label>
                <div className="flex flex-wrap gap-2">
                  {['Work', 'Business', 'Study', 'Travel', 'Relocation', 'Social life', 'Not using yet'].map(use => (
                    <button
                      key={use}
                      onClick={() => handleMultiSelect('englishUse', use)}
                      className={`px-4 py-2 rounded-full text-sm transition-all ${
                        formData.englishUse.includes(use)
                          ? 'bg-[#4ADE80] text-white'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {use}
                    </button>
                  ))}
                </div>
              </div>

              {/* Main Difficulty */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">What&apos;s your main difficulty right now? (Choose 1-2)</label>
                <div className="flex flex-wrap gap-2">
                  {[
                    'Speaking with confidence',
                    'Understanding fast speech',
                    'Vocabulary',
                    'Grammar',
                    'Pronunciation',
                    'Business communication',
                    'Interviews & presentations'
                  ].map(difficulty => (
                    <button
                      key={difficulty}
                      onClick={() => {
                        if (formData.mainDifficulty.length < 2 || formData.mainDifficulty.includes(difficulty)) {
                          handleMultiSelect('mainDifficulty', difficulty);
                        }
                      }}
                      className={`px-4 py-2 rounded-full text-sm transition-all ${
                        formData.mainDifficulty.includes(difficulty)
                          ? 'bg-[#E8833A] text-white'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {difficulty}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Format & Coaching Type */}
          {currentStep === 2 && (
            <div className="space-y-8">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-800 mb-2">How would you like to learn?</h3>
                <p className="text-gray-500">Help us find the perfect format for you</p>
              </div>

              {/* Study Preference */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">How do you prefer to study?</label>
                <div className="grid md:grid-cols-2 gap-3">
                  {[
                    { value: '1on1', label: '1-on-1 Coaching', icon: <User />, desc: 'Personal attention, customized pace' },
                    { value: 'group', label: 'Small Group (3-6)', icon: <Users />, desc: 'Learn with peers, practice together' },
                    { value: 'self', label: 'Self-Study + Support', icon: <Sparkles />, desc: 'Independent learning with coach guidance' },
                    { value: 'unsure', label: 'Not sure', icon: <Target />, desc: 'Want a recommendation' }
                  ].map(pref => (
                    <button
                      key={pref.value}
                      onClick={() => handleInputChange('studyPreference', pref.value)}
                      className={`flex items-center gap-3 p-4 rounded-xl border-2 transition-all text-left ${
                        formData.studyPreference === pref.value
                          ? 'border-[#4ADE80] bg-[#4ADE80]/5'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        formData.studyPreference === pref.value ? 'bg-[#4ADE80] text-white' : 'bg-gray-100 text-gray-500'
                      }`}>
                        {pref.icon}
                      </div>
                      <div>
                        <p className="font-medium text-gray-800">{pref.label}</p>
                        <p className="text-xs text-gray-500">{pref.desc}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Important Factor */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">What is most important for you?</label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {[
                    { value: 'fast', label: 'Fast results', icon: <Zap className="w-4 h-4" /> },
                    { value: 'flexible', label: 'Flexible schedule', icon: <Clock className="w-4 h-4" /> },
                    { value: 'cost', label: 'Low cost', icon: <DollarSign className="w-4 h-4" /> },
                    { value: 'structure', label: 'Strong structure', icon: <Target className="w-4 h-4" /> },
                    { value: 'support', label: 'Personal support', icon: <Heart className="w-4 h-4" /> }
                  ].map(factor => (
                    <button
                      key={factor.value}
                      onClick={() => handleInputChange('importantFactor', factor.value)}
                      className={`flex items-center justify-center gap-2 p-3 rounded-lg border-2 text-sm transition-all ${
                        formData.importantFactor === factor.value
                          ? 'border-[#4ADE80] bg-[#4ADE80]/5 text-[#4ADE80]'
                          : 'border-gray-200 hover:border-gray-300 text-gray-600'
                      }`}
                    >
                      {factor.icon}
                      {factor.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Ready to Invest */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Are you currently ready to invest in your English?</label>
                <div className="space-y-2">
                  {[
                    { value: 'ready', label: 'Yes, I\'m ready to invest', emoji: '✅' },
                    { value: 'considering', label: 'I\'m considering it', emoji: '🤔' },
                    { value: 'exploring', label: 'Not right now, just exploring', emoji: '👀' }
                  ].map(option => (
                    <button
                      key={option.value}
                      onClick={() => handleInputChange('readyToInvest', option.value)}
                      className={`w-full flex items-center gap-3 p-4 rounded-xl border-2 transition-all text-left ${
                        formData.readyToInvest === option.value
                          ? 'border-[#4ADE80] bg-[#4ADE80]/5'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <span className="text-xl">{option.emoji}</span>
                      <span className="text-gray-700">{option.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Budget Range (Optional) */}
              <div className="p-4 bg-gray-50 rounded-xl">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Monthly investment comfort zone (optional)
                </label>
                <div className="flex flex-wrap gap-2">
                  {['€50-100', '€100-300', '€300-800', '€800+'].map(range => (
                    <button
                      key={range}
                      onClick={() => handleInputChange('budgetRange', range)}
                      className={`px-4 py-2 rounded-full text-sm transition-all ${
                        formData.budgetRange === range
                          ? 'bg-[#E8833A] text-white'
                          : 'bg-white border border-gray-200 text-gray-600 hover:border-gray-300'
                      }`}
                    >
                      {range}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Goals, Blocks & Motivation */}
          {currentStep === 3 && (
            <div className="space-y-8">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-800 mb-2">Your Goals & Motivation</h3>
                <p className="text-gray-500">Help us understand what drives you</p>
              </div>

              {/* Goal Result */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  What result do you want to achieve in 3-6 months?
                </label>
                <textarea
                  value={formData.goalResult}
                  onChange={(e) => handleInputChange('goalResult', e.target.value)}
                  className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#4ADE80] focus:border-transparent outline-none resize-none"
                  rows={3}
                  placeholder="e.g., Speak confidently with foreign clients, Pass IELTS, Get a higher-paid job..."
                />
              </div>

              {/* Blockers */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  What has stopped you from speaking English confidently so far?
                </label>
                <div className="flex flex-wrap gap-2">
                  {[
                    'Fear of mistakes',
                    'Bad previous experience',
                    'No time',
                    'No clear system',
                    'No speaking practice',
                    'Lack of motivation'
                  ].map(blocker => (
                    <button
                      key={blocker}
                      onClick={() => handleMultiSelect('blockers', blocker)}
                      className={`px-4 py-2 rounded-full text-sm transition-all ${
                        formData.blockers.includes(blocker)
                          ? 'bg-red-500 text-white'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {blocker}
                    </button>
                  ))}
                </div>
              </div>

              {/* Importance Scale */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  On a scale of 1-10, how important is English for your life right now?
                </label>
                <div className="flex items-center gap-4">
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={formData.importanceScale}
                    onChange={(e) => handleInputChange('importanceScale', parseInt(e.target.value))}
                    className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#4ADE80]"
                  />
                  <span className="w-12 h-12 rounded-full bg-[#4ADE80] text-white flex items-center justify-center font-bold text-lg">
                    {formData.importanceScale}
                  </span>
                </div>
              </div>

              {/* Life Change */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  If you spoke English confidently, what would change in your life?
                </label>
                <textarea
                  value={formData.lifeChange}
                  onChange={(e) => handleInputChange('lifeChange', e.target.value)}
                  className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#4ADE80] focus:border-transparent outline-none resize-none"
                  rows={3}
                  placeholder="Dream big! Tell us how confident English would transform your life..."
                />
              </div>

              {/* Fun Question */}
              <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  🎯 Fun question: If English were a superpower, what would you do with it first?
                </label>
                <input
                  type="text"
                  value={formData.funQuestion}
                  onChange={(e) => handleInputChange('funQuestion', e.target.value)}
                  className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent outline-none bg-white"
                  placeholder="Travel the world? Close a million-dollar deal? Make friends everywhere?"
                />
              </div>
            </div>
          )}

          {/* Step 4: Result */}
          {currentStep === 4 && showResult && (
            <div className="space-y-8">
              <div className="text-center mb-8">
                <div className="w-16 h-16 mx-auto bg-[#4ADE80] rounded-full flex items-center justify-center mb-4">
                  <Sparkles className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">Your Personalized Recommendation</h3>
                <p className="text-gray-500">Based on your answers, here&apos;s what we suggest</p>
              </div>

              {/* Recommendation Card */}
              {(() => {
                const rec = getRecommendation();
                return (
                  <div className={`p-8 rounded-2xl bg-gradient-to-r ${rec.color} text-white`}>
                    <h4 className="text-2xl font-bold mb-2">{rec.title}</h4>
                    <p className="text-white/80 mb-4">{rec.duration}</p>
                    <p className="text-white/90">{rec.description}</p>
                  </div>
                );
              })()}

              {/* Final Question */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Would you like us to book your first session?
                </label>
                <div className="space-y-2">
                  {[
                    { value: 'yes', label: 'Yes, I want a personalized session', emoji: '✅' },
                    { value: 'later', label: 'Maybe later', emoji: '⏳' },
                    { value: 'no', label: 'No, thanks', emoji: '❌' }
                  ].map(option => (
                    <button
                      key={option.value}
                      onClick={() => handleInputChange('wantRecommendation', option.value)}
                      className={`w-full flex items-center gap-3 p-4 rounded-xl border-2 transition-all text-left ${
                        formData.wantRecommendation === option.value
                          ? 'border-[#4ADE80] bg-[#4ADE80]/5'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <span className="text-xl">{option.emoji}</span>
                      <span className="text-gray-700">{option.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {formData.wantRecommendation === 'yes' && (
                <div className="p-6 bg-[#4ADE80]/10 rounded-xl border-2 border-[#4ADE80] text-center">
                  <p className="text-gray-700 mb-4">🎉 Amazing! We&apos;ll be in touch within 24 hours to schedule your session.</p>
                  <a 
                    href="https://wa.link/nisn2y"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-[#4ADE80] text-white px-6 py-3 rounded-full font-semibold hover:bg-[#22c55e] transition-colors"
                  >
                    <Phone className="w-5 h-5" />
                    Chat on WhatsApp Now
                  </a>
                </div>
              )}
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-10 pt-6 border-t border-gray-100">
            {currentStep > 0 ? (
              <button
                onClick={prevStep}
                className="flex items-center gap-2 px-6 py-3 text-gray-600 hover:text-gray-800 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                Back
              </button>
            ) : (
              <button
                onClick={() => setShowForm(false)}
                className="flex items-center gap-2 px-6 py-3 text-gray-600 hover:text-gray-800 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                Back to options
              </button>
            )}

            {currentStep < 4 && (
              <button
                onClick={nextStep}
                className="flex items-center gap-2 px-8 py-3 bg-[#4ADE80] text-white rounded-full font-semibold hover:bg-[#22c55e] transition-colors"
              >
                Continue
                <ArrowRight className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default IntakeForm;
