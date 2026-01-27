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
import { useLanguage } from '../contexts/LanguageContext';

const IntakeForm = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    whatsapp: '',
    country: '',
    timezone: '',
    studyDuration: '',
    currentLevel: '',
    englishUse: [],
    mainDifficulty: [],
    englishType: '',
    studyPreference: '',
    importantFactor: '',
    readyToInvest: '',
    goalResult: '',
    blockers: [],
    importanceScale: 5,
    lifeChange: '',
    wantRecommendation: '',
    budgetRange: '',
    funQuestion: '',
  });
  const [showResult, setShowResult] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const { t, language } = useLanguage();

  const WEBHOOK_URL = 'https://hook.eu1.make.com/moqlfmmk99jm1n3lqwkkgop5v76k18bx';

  const steps = [
    { title: t('intakeForm.steps.getStarted'), icon: <Sparkles className="w-5 h-5" /> },
    { title: t('intakeForm.steps.profile'), icon: <User className="w-5 h-5" /> },
    { title: t('intakeForm.steps.format'), icon: <Target className="w-5 h-5" /> },
    { title: t('intakeForm.steps.goals'), icon: <Heart className="w-5 h-5" /> },
    { title: t('intakeForm.steps.result'), icon: <Check className="w-5 h-5" /> }
  ];

  const submitToWebhook = async (finalFormData) => {
    if (hasSubmitted || isSubmitting) return;

    setIsSubmitting(true);
    try {
      const recommendation = getRecommendation();
      const payload = {
        ...finalFormData,
        language: language,
        recommendation: recommendation.type,
        recommendationTitle: recommendation.title,
        submittedAt: new Date().toISOString(),
        source: 'kate.podbrezsky.com',
      };

      await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        mode: 'no-cors',
        body: JSON.stringify(payload),
      });

      setHasSubmitted(true);
    } catch (error) {
      console.error('Webhook submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field, value) => {
    const newFormData = { ...formData, [field]: value };
    setFormData(newFormData);

    if (field === 'wantRecommendation' && !hasSubmitted) {
      submitToWebhook(newFormData);
    }
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
        title: t('intakeForm.recommendations.premium.title'),
        duration: t('intakeForm.recommendations.premium.duration'),
        description: t('intakeForm.recommendations.premium.description'),
        color: 'from-amber-500 to-orange-500'
      };
    }

    if (isStudent || wantsGroup) {
      return {
        type: 'group',
        title: t('intakeForm.recommendations.group.title'),
        duration: t('intakeForm.recommendations.group.duration'),
        description: t('intakeForm.recommendations.group.description'),
        color: 'from-blue-500 to-cyan-500'
      };
    }

    if (isExploring) {
      return {
        type: 'intro',
        title: t('intakeForm.recommendations.intro.title'),
        duration: t('intakeForm.recommendations.intro.duration'),
        description: t('intakeForm.recommendations.intro.description'),
        color: 'from-green-500 to-emerald-500'
      };
    }

    return {
      type: 'standard',
      title: t('intakeForm.recommendations.standard.title'),
      duration: t('intakeForm.recommendations.standard.duration'),
      description: t('intakeForm.recommendations.standard.description'),
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
        <div className="bg-gradient-to-br from-[#1a2b3c] via-[#1f3345] to-[#2a3f4f] pt-4 pb-16 px-8">
          <div className="container mx-auto max-w-5xl mb-10">
            <div className="flex items-center gap-4">
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
              <span className="text-white/40 text-sm uppercase tracking-widest">{t('intakeForm.chooseYourPath')}</span>
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            </div>
          </div>

          <div className="container mx-auto max-w-5xl relative z-10">
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-serif text-white mb-3">
                {t('intakeForm.readyToStart')}
              </h2>
              <p className="text-gray-300 text-base max-w-2xl mx-auto">
                {t('intakeForm.readyToStartDesc')}
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div
                onClick={() => { setFormData(prev => ({ ...prev, englishType: 'business' })); setShowForm(true); }}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 cursor-pointer hover:bg-white/20 transition-all duration-300 hover:scale-105 hover:-translate-y-1 border border-white/10 group"
              >
                <div className="w-16 h-16 bg-[#E8833A]/20 rounded-full flex items-center justify-center mb-6 group-hover:bg-[#E8833A]/30 transition-colors">
                  <Briefcase className="w-8 h-8 text-[#E8833A]" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{t('intakeForm.businessCoaching')}</h3>
                <p className="text-gray-400 text-sm">{t('intakeForm.businessCoachingDesc')}</p>
                <div className="mt-4 flex items-center text-[#E8833A] text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                  {t('common.getStarted')} <ArrowRight className="w-4 h-4 ml-1" />
                </div>
              </div>

              <div
                onClick={() => { setFormData(prev => ({ ...prev, englishType: 'academic' })); setShowForm(true); }}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 cursor-pointer hover:bg-white/20 transition-all duration-300 hover:scale-105 hover:-translate-y-1 border border-white/10 group"
              >
                <div className="w-16 h-16 bg-[#4ADE80]/20 rounded-full flex items-center justify-center mb-6 group-hover:bg-[#4ADE80]/30 transition-colors">
                  <GraduationCap className="w-8 h-8 text-[#4ADE80]" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{t('intakeForm.studentTutoring')}</h3>
                <p className="text-gray-400 text-sm">{t('intakeForm.studentTutoringDesc')}</p>
                <div className="mt-4 flex items-center text-[#4ADE80] text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                  {t('common.getStarted')} <ArrowRight className="w-4 h-4 ml-1" />
                </div>
              </div>

              <div
                onClick={() => { setFormData(prev => ({ ...prev, englishType: 'conversation' })); setShowForm(true); }}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 cursor-pointer hover:bg-white/20 transition-all duration-300 hover:scale-105 hover:-translate-y-1 border border-white/10 group"
              >
                <div className="w-16 h-16 bg-[#3b82f6]/20 rounded-full flex items-center justify-center mb-6 group-hover:bg-[#3b82f6]/30 transition-colors">
                  <Users className="w-8 h-8 text-[#3b82f6]" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{t('intakeForm.groupSessions')}</h3>
                <p className="text-gray-400 text-sm">{t('intakeForm.groupSessionsDesc')}</p>
                <div className="mt-4 flex items-center text-[#3b82f6] text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                  {t('common.getStarted')} <ArrowRight className="w-4 h-4 ml-1" />
                </div>
              </div>
            </div>

            <div className="text-center">
              <button
                onClick={() => setShowForm(true)}
                className="text-gray-400 hover:text-white transition-colors underline"
              >
                {t('intakeForm.notSure')}
              </button>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-[#1a2b3c] via-[#1f3345] to-[#2a3f4f]">
          <svg viewBox="0 0 1440 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-20 lg:h-24" preserveAspectRatio="none">
            <path d="M0 100L1440 0V100H0Z" fill="white" />
          </svg>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 px-8 bg-gray-50 min-h-screen">
      <div className="container mx-auto max-w-3xl">
        <div className="flex items-center justify-between mb-12">
          {steps.map((step, index) => (
            <div key={index} className="flex items-center">
              <div className={`flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300 ${index <= currentStep ? 'bg-[#4ADE80] text-white' : 'bg-gray-200 text-gray-400'}`}>
                {index < currentStep ? <Check className="w-5 h-5" /> : step.icon}
              </div>
              {index < steps.length - 1 && (
                <div className={`w-12 md:w-24 h-1 mx-2 rounded transition-all duration-300 ${index < currentStep ? 'bg-[#4ADE80]' : 'bg-gray-200'}`} />
              )}
            </div>
          ))}
        </div>

        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12">

          {/* Step 0: Initial Selection */}
          {currentStep === 0 && (
            <div className="space-y-8">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-800 mb-2">{t('intakeForm.step0.title')}</h3>
                <p className="text-gray-500">{t('intakeForm.step0.subtitle')}</p>
              </div>

              <div className="grid gap-4">
                {[
                  { value: 'business', label: t('intakeForm.step0.businessCareer'), icon: <Briefcase />, desc: t('intakeForm.step0.businessCareerDesc') },
                  { value: 'academic', label: t('intakeForm.step0.academicExams'), icon: <GraduationCap />, desc: t('intakeForm.step0.academicExamsDesc') },
                  { value: 'conversation', label: t('intakeForm.step0.dailyConversation'), icon: <MessageCircle />, desc: t('intakeForm.step0.dailyConversationDesc') },
                  { value: 'relocation', label: t('intakeForm.step0.travelRelocation'), icon: <Globe />, desc: t('intakeForm.step0.travelRelocationDesc') },
                  { value: 'personal', label: t('intakeForm.step0.personalDevelopment'), icon: <Sparkles />, desc: t('intakeForm.step0.personalDevelopmentDesc') }
                ].map(option => (
                  <button
                    key={option.value}
                    onClick={() => handleInputChange('englishType', option.value)}
                    className={`flex items-center gap-4 p-4 rounded-xl border-2 transition-all duration-200 text-left ${formData.englishType === option.value ? 'border-[#4ADE80] bg-[#4ADE80]/5' : 'border-gray-200 hover:border-gray-300'}`}
                  >
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${formData.englishType === option.value ? 'bg-[#4ADE80] text-white' : 'bg-gray-100 text-gray-500'}`}>
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

          {/* Step 1: Profile */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-800 mb-2">{t('intakeForm.step1.title')}</h3>
                <p className="text-gray-500">{t('intakeForm.step1.subtitle')}</p>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">{t('intakeForm.step1.fullName')}</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input type="text" value={formData.fullName} onChange={(e) => handleInputChange('fullName', e.target.value)} className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#4ADE80] focus:border-transparent outline-none" placeholder={t('intakeForm.step1.fullNamePlaceholder')} />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">{t('intakeForm.step1.email')}</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input type="email" value={formData.email} onChange={(e) => handleInputChange('email', e.target.value)} className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#4ADE80] focus:border-transparent outline-none" placeholder={t('intakeForm.step1.emailPlaceholder')} />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">{t('intakeForm.step1.whatsapp')}</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input type="tel" value={formData.whatsapp} onChange={(e) => handleInputChange('whatsapp', e.target.value)} className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#4ADE80] focus:border-transparent outline-none" placeholder={t('intakeForm.step1.whatsappPlaceholder')} />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">{t('intakeForm.step1.countryTimezone')}</label>
                  <div className="relative">
                    <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input type="text" value={formData.country} onChange={(e) => handleInputChange('country', e.target.value)} className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#4ADE80] focus:border-transparent outline-none" placeholder={t('intakeForm.step1.countryPlaceholder')} />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">{t('intakeForm.step1.currentLevel')}</label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {[
                    { value: 'beginner', label: t('intakeForm.step1.levels.beginner') },
                    { value: 'elementary', label: t('intakeForm.step1.levels.elementary') },
                    { value: 'intermediate', label: t('intakeForm.step1.levels.intermediate') },
                    { value: 'upperIntermediate', label: t('intakeForm.step1.levels.upperIntermediate') },
                    { value: 'advanced', label: t('intakeForm.step1.levels.advanced') }
                  ].map(level => (
                    <button key={level.value} onClick={() => handleInputChange('currentLevel', level.value)} className={`p-3 rounded-lg border-2 text-sm transition-all ${formData.currentLevel === level.value ? 'border-[#4ADE80] bg-[#4ADE80]/5 text-[#4ADE80]' : 'border-gray-200 hover:border-gray-300 text-gray-600'}`}>
                      {level.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">{t('intakeForm.step1.englishUse')}</label>
                <div className="flex flex-wrap gap-2">
                  {['Work', 'Business', 'Study', 'Travel', 'Relocation', 'Social life', 'Not using yet'].map(use => (
                    <button key={use} onClick={() => handleMultiSelect('englishUse', use)} className={`px-4 py-2 rounded-full text-sm transition-all ${formData.englishUse.includes(use) ? 'bg-[#4ADE80] text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
                      {t('intakeForm.step1.uses.' + use.toLowerCase().replace(' ', '')) || use}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">{t('intakeForm.step1.mainDifficulty')}</label>
                <div className="flex flex-wrap gap-2">
                  {[
                    { key: 'speakingConfidence', label: t('intakeForm.step1.difficulties.speakingConfidence') },
                    { key: 'understandingFastSpeech', label: t('intakeForm.step1.difficulties.understandingFastSpeech') },
                    { key: 'vocabulary', label: t('intakeForm.step1.difficulties.vocabulary') },
                    { key: 'grammar', label: t('intakeForm.step1.difficulties.grammar') },
                    { key: 'pronunciation', label: t('intakeForm.step1.difficulties.pronunciation') },
                    { key: 'businessCommunication', label: t('intakeForm.step1.difficulties.businessCommunication') },
                    { key: 'interviewsPresentations', label: t('intakeForm.step1.difficulties.interviewsPresentations') }
                  ].map(difficulty => (
                    <button key={difficulty.key} onClick={() => { if (formData.mainDifficulty.length < 2 || formData.mainDifficulty.includes(difficulty.key)) { handleMultiSelect('mainDifficulty', difficulty.key); }}} className={`px-4 py-2 rounded-full text-sm transition-all ${formData.mainDifficulty.includes(difficulty.key) ? 'bg-[#E8833A] text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
                      {difficulty.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Format */}
          {currentStep === 2 && (
            <div className="space-y-8">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-800 mb-2">{t('intakeForm.step2.title')}</h3>
                <p className="text-gray-500">{t('intakeForm.step2.subtitle')}</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">{t('intakeForm.step2.studyPreference')}</label>
                <div className="grid md:grid-cols-2 gap-3">
                  {[
                    { value: '1on1', label: t('intakeForm.step2.preferences.oneOnOne'), icon: <User />, desc: t('intakeForm.step2.preferences.oneOnOneDesc') },
                    { value: 'group', label: t('intakeForm.step2.preferences.smallGroup'), icon: <Users />, desc: t('intakeForm.step2.preferences.smallGroupDesc') },
                    { value: 'self', label: t('intakeForm.step2.preferences.selfStudy'), icon: <Sparkles />, desc: t('intakeForm.step2.preferences.selfStudyDesc') },
                    { value: 'unsure', label: t('intakeForm.step2.preferences.notSure'), icon: <Target />, desc: t('intakeForm.step2.preferences.notSureDesc') }
                  ].map(pref => (
                    <button key={pref.value} onClick={() => handleInputChange('studyPreference', pref.value)} className={`flex items-center gap-3 p-4 rounded-xl border-2 transition-all text-left ${formData.studyPreference === pref.value ? 'border-[#4ADE80] bg-[#4ADE80]/5' : 'border-gray-200 hover:border-gray-300'}`}>
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${formData.studyPreference === pref.value ? 'bg-[#4ADE80] text-white' : 'bg-gray-100 text-gray-500'}`}>{pref.icon}</div>
                      <div><p className="font-medium text-gray-800">{pref.label}</p><p className="text-xs text-gray-500">{pref.desc}</p></div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">{t('intakeForm.step2.importantFactor')}</label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {[
                    { value: 'fast', label: t('intakeForm.step2.factors.fastResults'), icon: <Zap className="w-4 h-4" /> },
                    { value: 'flexible', label: t('intakeForm.step2.factors.flexibleSchedule'), icon: <Clock className="w-4 h-4" /> },
                    { value: 'cost', label: t('intakeForm.step2.factors.lowCost'), icon: <DollarSign className="w-4 h-4" /> },
                    { value: 'structure', label: t('intakeForm.step2.factors.strongStructure'), icon: <Target className="w-4 h-4" /> },
                    { value: 'support', label: t('intakeForm.step2.factors.personalSupport'), icon: <Heart className="w-4 h-4" /> }
                  ].map(factor => (
                    <button key={factor.value} onClick={() => handleInputChange('importantFactor', factor.value)} className={`flex items-center justify-center gap-2 p-3 rounded-lg border-2 text-sm transition-all ${formData.importantFactor === factor.value ? 'border-[#4ADE80] bg-[#4ADE80]/5 text-[#4ADE80]' : 'border-gray-200 hover:border-gray-300 text-gray-600'}`}>
                      {factor.icon}{factor.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">{t('intakeForm.step2.readyToInvest')}</label>
                <div className="space-y-2">
                  {[
                    { value: 'ready', label: t('intakeForm.step2.investOptions.ready'), emoji: '✅' },
                    { value: 'considering', label: t('intakeForm.step2.investOptions.considering'), emoji: '🤔' },
                    { value: 'exploring', label: t('intakeForm.step2.investOptions.exploring'), emoji: '👀' }
                  ].map(option => (
                    <button key={option.value} onClick={() => handleInputChange('readyToInvest', option.value)} className={`w-full flex items-center gap-3 p-4 rounded-xl border-2 transition-all text-left ${formData.readyToInvest === option.value ? 'border-[#4ADE80] bg-[#4ADE80]/5' : 'border-gray-200 hover:border-gray-300'}`}>
                      <span className="text-xl">{option.emoji}</span>
                      <span className="text-gray-700">{option.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-4 bg-gray-50 rounded-xl">
                <label className="block text-sm font-medium text-gray-700 mb-3">{t('intakeForm.step2.budgetRange')}</label>
                <div className="flex flex-wrap gap-2">
                  {t('intakeForm.step2.budgetOptions').map(range => (
                    <button key={range} onClick={() => handleInputChange('budgetRange', range)} className={`px-4 py-2 rounded-full text-sm transition-all ${formData.budgetRange === range ? 'bg-[#E8833A] text-white' : 'bg-white border border-gray-200 text-gray-600 hover:border-gray-300'}`}>
                      {range}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Goals */}
          {currentStep === 3 && (
            <div className="space-y-8">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-800 mb-2">{t('intakeForm.step3.title')}</h3>
                <p className="text-gray-500">{t('intakeForm.step3.subtitle')}</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">{t('intakeForm.step3.goalResult')}</label>
                <textarea value={formData.goalResult} onChange={(e) => handleInputChange('goalResult', e.target.value)} className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#4ADE80] focus:border-transparent outline-none resize-none" rows={3} placeholder={t('intakeForm.step3.goalResultPlaceholder')} />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">{t('intakeForm.step3.blockers')}</label>
                <div className="flex flex-wrap gap-2">
                  {[
                    { key: 'fearOfMistakes', label: t('intakeForm.step3.blockerOptions.fearOfMistakes') },
                    { key: 'badExperience', label: t('intakeForm.step3.blockerOptions.badExperience') },
                    { key: 'noTime', label: t('intakeForm.step3.blockerOptions.noTime') },
                    { key: 'noSystem', label: t('intakeForm.step3.blockerOptions.noSystem') },
                    { key: 'noPractice', label: t('intakeForm.step3.blockerOptions.noPractice') },
                    { key: 'lackMotivation', label: t('intakeForm.step3.blockerOptions.lackMotivation') }
                  ].map(blocker => (
                    <button key={blocker.key} onClick={() => handleMultiSelect('blockers', blocker.key)} className={`px-4 py-2 rounded-full text-sm transition-all ${formData.blockers.includes(blocker.key) ? 'bg-red-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
                      {blocker.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">{t('intakeForm.step3.importanceScale')}</label>
                <div className="flex items-center gap-4">
                  <input type="range" min="1" max="10" value={formData.importanceScale} onChange={(e) => handleInputChange('importanceScale', parseInt(e.target.value))} className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#4ADE80]" />
                  <span className="w-12 h-12 rounded-full bg-[#4ADE80] text-white flex items-center justify-center font-bold text-lg">{formData.importanceScale}</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">{t('intakeForm.step3.lifeChange')}</label>
                <textarea value={formData.lifeChange} onChange={(e) => handleInputChange('lifeChange', e.target.value)} className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#4ADE80] focus:border-transparent outline-none resize-none" rows={3} placeholder={t('intakeForm.step3.lifeChangePlaceholder')} />
              </div>

              <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl">
                <label className="block text-sm font-medium text-gray-700 mb-2">{t('intakeForm.step3.funQuestion')}</label>
                <input type="text" value={formData.funQuestion} onChange={(e) => handleInputChange('funQuestion', e.target.value)} className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent outline-none bg-white" placeholder={t('intakeForm.step3.funQuestionPlaceholder')} />
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
                <h3 className="text-2xl font-bold text-gray-800 mb-2">{t('intakeForm.step4.title')}</h3>
                <p className="text-gray-500">{t('intakeForm.step4.subtitle')}</p>
              </div>

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

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">{t('intakeForm.step4.bookSession')}</label>
                <div className="space-y-2">
                  {[
                    { value: 'yes', label: t('intakeForm.step4.bookOptions.yes'), emoji: '✅' },
                    { value: 'later', label: t('intakeForm.step4.bookOptions.later'), emoji: '⏳' },
                    { value: 'no', label: t('intakeForm.step4.bookOptions.no'), emoji: '❌' }
                  ].map(option => (
                    <button key={option.value} onClick={() => handleInputChange('wantRecommendation', option.value)} disabled={isSubmitting} className={`w-full flex items-center gap-3 p-4 rounded-xl border-2 transition-all text-left ${formData.wantRecommendation === option.value ? 'border-[#4ADE80] bg-[#4ADE80]/5' : 'border-gray-200 hover:border-gray-300'} ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}>
                      <span className="text-xl">{option.emoji}</span>
                      <span className="text-gray-700">{option.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {formData.wantRecommendation === 'yes' && (
                <div className="p-6 bg-[#4ADE80]/10 rounded-xl border-2 border-[#4ADE80] text-center">
                  <p className="text-gray-700 mb-4">{t('intakeForm.step4.successMessage')}</p>
                  {language === 'zh' ? (
                    <button className="inline-flex items-center gap-2 bg-[#07C160] text-white px-6 py-3 rounded-full font-semibold hover:bg-[#06AD56] transition-colors">
                      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                        <path d="M8.691 2.188C3.891 2.188 0 5.476 0 9.53c0 2.212 1.17 4.203 3.002 5.55a.59.59 0 01.213.665l-.39 1.48c-.019.07-.048.141-.048.213 0 .163.13.295.29.295a.326.326 0 00.167-.054l1.903-1.114a.864.864 0 01.717-.098 10.16 10.16 0 002.837.403c.276 0 .543-.027.811-.05-.857-2.578.157-4.972 1.932-6.446 1.703-1.415 3.882-1.98 5.853-1.838-.576-3.583-4.196-6.348-8.596-6.348zM5.785 5.991c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 01-1.162 1.178A1.17 1.17 0 014.623 7.17c0-.651.52-1.18 1.162-1.18zm5.813 0c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 01-1.162 1.178 1.17 1.17 0 01-1.162-1.178c0-.651.52-1.18 1.162-1.18zm5.34 2.867c-1.797-.052-3.746.512-5.28 1.786-1.72 1.428-2.687 3.72-1.78 6.22.942 2.453 3.666 4.229 6.884 4.229.826 0 1.622-.12 2.361-.336a.722.722 0 01.598.082l1.584.926a.272.272 0 00.14.045c.134 0 .24-.111.24-.247 0-.06-.023-.12-.038-.177l-.327-1.233a.582.582 0 01-.023-.156.49.49 0 01.201-.398C23.024 18.48 24 16.82 24 14.98c0-3.21-2.931-5.837-6.656-6.088V8.89c-.135-.01-.27-.027-.407-.03zm-2.53 3.274c.535 0 .969.44.969.982a.976.976 0 01-.969.983.976.976 0 01-.969-.983c0-.542.434-.982.97-.982zm4.844 0c.535 0 .969.44.969.982a.976.976 0 01-.969.983.976.976 0 01-.969-.983c0-.542.434-.982.969-.982z"/>
                      </svg>
                      添加微信联系
                    </button>
                  ) : (
                    <a href="https://wa.link/nisn2y" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-[#4ADE80] text-white px-6 py-3 rounded-full font-semibold hover:bg-[#22c55e] transition-colors">
                      <Phone className="w-5 h-5" />
                      {t('intakeForm.step4.chatOnWhatsApp')}
                    </a>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Navigation */}
          <div className="flex justify-between mt-10 pt-6 border-t border-gray-100">
            {currentStep > 0 ? (
              <button onClick={prevStep} className="flex items-center gap-2 px-6 py-3 text-gray-600 hover:text-gray-800 transition-colors">
                <ArrowLeft className="w-5 h-5" />{t('common.back')}
              </button>
            ) : (
              <button onClick={() => setShowForm(false)} className="flex items-center gap-2 px-6 py-3 text-gray-600 hover:text-gray-800 transition-colors">
                <ArrowLeft className="w-5 h-5" />{t('common.backToOptions')}
              </button>
            )}

            {currentStep < 4 && (
              <button onClick={nextStep} className="flex items-center gap-2 px-8 py-3 bg-[#4ADE80] text-white rounded-full font-semibold hover:bg-[#22c55e] transition-colors">
                {t('common.continue')}<ArrowRight className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default IntakeForm;
