//-----------------------------------Responsive --------------------------------
import React, { useState } from 'react';
import { Send, Sparkles, Copy, Check, Mail, Zap, ArrowRight, LogOut, Trash2, Menu, X } from 'lucide-react';
import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebase.connection";

export default function EmailGenerator() {
  const [message, setMessage] = useState('');
  const [tone, setTone] = useState('professional');
  const [mode, setMode] = useState('formal');
  const [generatedEmail, setGeneratedEmail] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState('');
  const [recipientEmail, setRecipientEmail] = useState('');
  const [emailSubject, setEmailSubject] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const tones = [
    { value: 'professional', label: 'Professional', icon: '💼' },
    { value: 'friendly', label: 'Friendly', icon: '😊' },
    { value: 'persuasive', label: 'Persuasive', icon: '🎯' },
    { value: 'apologetic', label: 'Apologetic', icon: '🙏' }
  ];

  const modes = [
    { value: 'formal', label: 'Formal', icon: '🎩' },
    { value: 'casual', label: 'Casual', icon: '👕' },
    { value: 'concise', label: 'Concise', icon: '⚡' },
    { value: 'detailed', label: 'Detailed', icon: '📝' }
  ];

  const generateEmail = async () => {
    if (!message.trim()) return;

    setIsGenerating(true);
    setError('');

    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_SERVER}/api/email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: message,
          tone: tone,
          mode: mode
        })
      });

      if (!response.ok) {
        throw new Error('Failed to generate email');
      }

      const data = await response.json();
      setGeneratedEmail(data.email || data.generatedEmail || data.content);

    } catch (err) {
      setError('Failed to generate email. Please check your server connection.');
      console.error('Error:', err);
    } finally {
      setIsGenerating(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedEmail);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const clearGenerated = () => {
    setGeneratedEmail('');
    setRecipientEmail('');
    setEmailSubject('');
    setCopied(false);
  };

  const handleLogout = async () => {
    if (window.confirm('Are you sure you want to logout?')) {
      setMessage('');
      setGeneratedEmail('');
      setRecipientEmail('');
      setEmailSubject('');
      setTone('professional');
      setMode('formal');
      setError('');
      try {
        await signOut(auth);
        alert('Logged out successfully!');
      } catch (err) {
        console.error(err.message);
      }
    }
  };

  // const openGmail = () => {
  //   if (!recipientEmail.trim() || !generatedEmail) return;

  //   const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(recipientEmail)}&su=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(generatedEmail)}`;

  //   window.open(gmailUrl, '_blank');
  // };

  const openGmail = () => {
    if (!recipientEmail.trim() || !generatedEmail) return;

    const subject = encodeURIComponent(emailSubject);
    const body = encodeURIComponent(generatedEmail);

    const mailtoUrl = `mailto:${recipientEmail}?subject=${subject}&body=${body}`;

    window.location.href = mailtoUrl; // opens Gmail app on Android
  };


  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      {/* Header */}
      <div className="bg-white sticky top-0 z-50 border-b-2 border-gray-200 py-4 md:py-6 px-4 md:px-6 shadow-sm">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            {/* Logo and Title */}
            <div className="flex items-center gap-2 md:gap-4">
              <div className="flex-shrink-0">
                <img
                  src="nora-ai-logo.png"
                  alt="Nora AI Logo"
                  className="h-12 w-12 md:h-16 md:w-16 object-contain rounded-lg"
                />
              </div>
              <div>
                <h1 style={{ color: "#02cd9f" }} className="text-xl md:text-3xl font-bold text-gray-900 bg-clip-text text-transparent">
                  Nora AI
                </h1>
                <p className="text-gray-600 text-xs md:text-sm mt-0.5 md:mt-1 hidden sm:block">
                  Create customised emails powered by artificial intelligence
                </p>
              </div>
            </div>

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 md:gap-2 px-3 md:px-4 py-2 md:py-2.5 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-lg transition-all shadow-md hover:shadow-lg text-sm md:text-base font-medium"
            >
              <LogOut className="w-3.5 h-3.5 md:w-4 md:h-4" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </div>


      <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 md:py-8">
        <div className="grid lg:grid-cols-5 gap-4 md:gap-6">
          {/* Input Section */}
          <div className="lg:col-span-2 space-y-4 md:space-y-6">
            <div className="bg-white border-2 border-blue-100 rounded-lg p-4 md:p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-4 md:mb-6 pb-3 md:pb-4 border-b-2 border-blue-50">
                <Sparkles className="w-4 h-4 md:w-5 md:h-5 text-blue-600" />
                <h2 className="text-lg md:text-xl font-semibold text-gray-800">Compose Message</h2>
              </div>

              {/* Message Input */}
              <div className="mb-4 md:mb-6">
                <label className="block text-xs md:text-sm font-semibold text-gray-700 mb-2">
                  Message Content
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Describe what you want to communicate..."
                  className="w-full h-28 md:h-32 px-3 md:px-4 py-2 md:py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors resize-none text-gray-700 text-sm md:text-base"
                />
              </div>

              {/* Tone Selection */}
              <div className="mb-4 md:mb-6">
                <label className="block text-xs md:text-sm font-semibold text-gray-700 mb-2 md:mb-3">
                  Email Tone
                </label>
                <div className="grid grid-cols-2 gap-2 md:gap-3">
                  {tones.map((t) => (
                    <button
                      key={t.value}
                      onClick={() => setTone(t.value)}
                      className={`px-3 md:px-4 py-2 md:py-3 rounded-lg text-xs md:text-base font-medium transition-all border-2 ${tone === t.value
                        ? 'bg-green-200 border-green-400 shadow-md'
                        : 'bg-white text-gray-700 border-gray-200 hover:border-blue-300'
                        }`}
                    >
                      <span className="mr-1 md:mr-2">{t.icon}</span>
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Mode Selection */}
              <div className="mb-4 md:mb-6">
                <label className="block text-xs md:text-sm font-semibold text-gray-700 mb-2 md:mb-3">
                  Writing Style
                </label>
                <div className="grid grid-cols-2 gap-2 md:gap-3">
                  {modes.map((m) => (
                    <button
                      key={m.value}
                      onClick={() => setMode(m.value)}
                      className={`px-3 md:px-4 py-2 md:py-3 rounded-lg text-xs md:text-base font-medium transition-all border-2 ${mode === m.value
                        ? 'bg-green-200 border-green-400 shadow-md'
                        : 'bg-white text-gray-700 border-gray-200 hover:border-blue-300'
                        }`}
                    >
                      <span className="mr-1 md:mr-2">{m.icon}</span>
                      {m.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <div className="mb-4 p-3 bg-red-50 border-l-4 border-red-500 text-red-700 text-xs md:text-sm">
                  {error}
                </div>
              )}

              {/* Generate Button */}
              <button
                onClick={generateEmail}
                disabled={!message.trim() || isGenerating}
                className={`w-full py-3 md:py-4 rounded-lg text-sm md:text-base font-semibold transition-all flex items-center justify-center gap-2 ${!message.trim() || isGenerating
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : 'bg-blue-600 text-white hover:bg-blue-700 shadow-md hover:shadow-lg'
                  }`}
              >
                {isGenerating ? (
                  <>
                    <div className="w-4 h-4 md:w-5 md:h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Zap className="w-4 h-4 md:w-5 md:h-5" />
                    Generate Email
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Output Section */}
          <div className="lg:col-span-3 space-y-4 md:space-y-6">
            <div className="bg-white border-2 border-blue-100 rounded-lg p-4 md:p-6 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 md:mb-6 pb-3 md:pb-4 border-b-2 border-blue-50 gap-3 sm:gap-0">
                <h2 className="text-lg md:text-xl font-semibold text-gray-800">Generated Email</h2>
                {generatedEmail && (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={clearGenerated}
                      className="flex items-center gap-1.5 md:gap-2 px-3 md:px-4 py-1.5 md:py-2 bg-red-50 hover:bg-red-100 text-red-700 rounded-lg transition-all border border-red-200 text-xs md:text-sm"
                    >
                      <Trash2 className="w-3.5 h-3.5 md:w-4 md:h-4" />
                      Clear
                    </button>
                    <button
                      onClick={copyToClipboard}
                      className="flex items-center gap-1.5 md:gap-2 px-3 md:px-4 py-1.5 md:py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg transition-all border border-blue-200 text-xs md:text-sm"
                    >
                      {copied ? (
                        <>
                          <Check className="w-3.5 h-3.5 md:w-4 md:h-4" />
                          Copied
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5 md:w-4 md:h-4" />
                          Copy
                        </>
                      )}
                    </button>
                  </div>
                )}
              </div>

              <div className="bg-gray-50 rounded-lg p-4 md:p-6 min-h-[250px] md:min-h-[300px] border border-gray-200">
                {generatedEmail ? (
                  <pre className="whitespace-pre-wrap font-sans text-gray-700 leading-relaxed text-xs md:text-sm">
                    {generatedEmail}
                  </pre>
                ) : (
                  <div className="flex flex-col items-center justify-center h-full text-gray-400 py-8 md:py-12">
                    <Mail className="w-12 h-12 md:w-16 md:h-16 mb-3 md:mb-4 text-blue-200" />
                    <p className="text-center text-gray-500 font-medium text-sm md:text-base">Your generated email will appear here</p>
                    <p className="text-xs md:text-sm text-center mt-2 text-gray-400">Fill in your message and click generate</p>
                  </div>
                )}
              </div>

              {/* Stats */}
              {generatedEmail && (
                <div className="mt-4 md:mt-6 grid grid-cols-3 gap-2 md:gap-4">
                  <div className="bg-blue-50 rounded-lg p-3 md:p-4 text-center border border-blue-100">
                    <p className="text-xs font-semibold mb-0.5 md:mb-1 text-gray-600">WORDS</p>
                    <p className="text-lg md:text-2xl font-bold text-blue-600">
                      {generatedEmail.split(' ').length}
                    </p>
                  </div>
                  <div className="bg-blue-50 rounded-lg p-3 md:p-4 text-center border border-blue-100">
                    <p className="text-xs font-semibold mb-0.5 md:mb-1 text-gray-600">CHARACTERS</p>
                    <p className="text-lg md:text-2xl font-bold text-blue-600">
                      {generatedEmail.length}
                    </p>
                  </div>
                  <div className="bg-blue-50 rounded-lg p-3 md:p-4 text-center border border-blue-100">
                    <p className="text-xs font-semibold mb-0.5 md:mb-1 text-gray-600">LINES</p>
                    <p className="text-lg md:text-2xl font-bold text-blue-600">
                      {generatedEmail.split('\n').length}
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Send Email Section */}
            {generatedEmail && (
              <div className="bg-gradient-to-br from-blue-50 to-white border-2 border-blue-200 rounded-lg p-4 md:p-6 shadow-sm">
                <div className="flex items-center gap-2 mb-4 md:mb-6">
                  <Send className="w-4 h-4 md:w-5 md:h-5 text-blue-600" />
                  <h3 className="text-base md:text-lg font-semibold text-gray-800">Send via Gmail</h3>
                </div>

                <div className="space-y-3 md:space-y-4">
                  <div>
                    <label className="block text-xs md:text-sm font-semibold text-gray-700 mb-2">
                      Recipient Email Address
                    </label>
                    <input
                      type="email"
                      value={recipientEmail}
                      onChange={(e) => setRecipientEmail(e.target.value)}
                      placeholder="recipient@example.com"
                      className="w-full px-3 md:px-4 py-2 md:py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors text-gray-700 text-sm md:text-base"
                    />
                  </div>

                  <div>
                    <label className="block text-xs md:text-sm font-semibold text-gray-700 mb-2">
                      Email Subject
                    </label>
                    <input
                      type="text"
                      value={emailSubject}
                      onChange={(e) => setEmailSubject(e.target.value)}
                      placeholder="Enter subject line (optional)"
                      className="w-full px-3 md:px-4 py-2 md:py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors text-gray-700 text-sm md:text-base"
                    />
                  </div>

                  <button
                    onClick={openGmail}
                    disabled={!recipientEmail.trim()}
                    className={`w-full py-3 md:py-4 rounded-lg text-sm md:text-base font-semibold transition-all flex items-center justify-center gap-2 ${!recipientEmail.trim()
                      ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                      : 'bg-blue-600 text-white hover:bg-blue-700 shadow-md hover:shadow-lg'
                      }`}
                  >
                    <Mail className="w-4 h-4 md:w-5 md:h-5" />
                    Open in Gmail
                    <ArrowRight className="w-3 h-3 md:w-4 md:h-4" />
                  </button>

                  <p className="text-xs text-gray-500 text-center bg-white py-2 rounded border border-blue-100">
                    Opens Gmail in a new tab with your email pre-filled and ready to send
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}