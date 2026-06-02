import React, { useState } from 'react';
import './App.css';

const API_BASE_URL = (import.meta.env.VITE_API_URL as string) || 'https://backend-zyanjob.onrender.com';

const Icons = {
  Home: ({ size = 20, color = 'currentColor' }: { size?: number, color?: string }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ transition: 'stroke 0.2s ease' }}>
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  ),
  Bookmark: ({ size = 20, color = 'currentColor', filled = false }: { size?: number, color?: string, filled?: boolean }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={filled ? color : 'none'} stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ transition: 'all 0.2s ease' }}>
      <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
    </svg>
  ),
  Messages: ({ size = 20, color = 'currentColor' }: { size?: number, color?: string }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ transition: 'stroke 0.2s ease' }}>
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  ),
  User: ({ size = 20, color = 'currentColor' }: { size?: number, color?: string }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ transition: 'stroke 0.2s ease' }}>
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  ),
  Bell: ({ size = 20, color = 'currentColor' }: { size?: number, color?: string }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
      <path d="M13.73 21a2 2 0 0 1-3.46 0" />
    </svg>
  ),
  Search: ({ size = 18, color = 'currentColor' }: { size?: number, color?: string }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  ),
  MapPin: ({ size = 18, color = 'currentColor' }: { size?: number, color?: string }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  ),
  Visa: ({ size = 16, color = 'currentColor' }: { size?: number, color?: string }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
    </svg>
  ),
  Accommodation: ({ size = 16, color = 'currentColor' }: { size?: number, color?: string }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <line x1="9" y1="22" x2="9" y2="16" />
      <line x1="15" y1="16" x2="15" y2="22" />
    </svg>
  ),
  Flight: ({ size = 16, color = 'currentColor' }: { size?: number, color?: string }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 2L11 13" />
      <path d="M22 2l-7 20-4-9-9-4 20-7z" />
    </svg>
  ),
  Bolt: ({ size = 14, color = 'currentColor' }: { size?: number, color?: string }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  ),
  Trash: ({ size = 14, color = 'currentColor' }: { size?: number, color?: string }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="3 6 5 6 21 6" />
      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
    </svg>
  ),
  Dislike: ({ size = 16, color = 'currentColor' }: { size?: number, color?: string }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 15h3a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3v8z" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M14 15V9a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h9z" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M10 15v4a3 3 0 0 0 6 0v-4H9" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  Camera: ({ size = 12, color = 'currentColor' }: { size?: number, color?: string }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
      <circle cx="12" cy="13" r="4" />
    </svg>
  ),
  Wifi: ({ size = 14, color = 'currentColor' }: { size?: number, color?: string }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12.55a11 11 0 0 1 14.08 0" />
      <path d="M1.42 9a16 16 0 0 1 21.16 0" />
      <path d="M8.53 16.11a6 6 0 0 1 6.95 0" />
      <line x1="12" y1="20" x2="12.01" y2="20" strokeWidth="3" />
    </svg>
  ),
  Signal: ({ size = 14, color = 'currentColor' }: { size?: number, color?: string }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="2" y1="20" x2="2" y2="17" />
      <line x1="7" y1="20" x2="7" y2="13" />
      <line x1="12" y1="20" x2="12" y2="9" />
      <line x1="17" y1="20" x2="17" y2="5" />
      <line x1="22" y1="20" x2="22" y2="1" />
    </svg>
  ),
  Battery: ({ size = 16, color = 'currentColor' }: { size?: number, color?: string }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="1" y="6" width="18" height="12" rx="2" ry="2" />
      <line x1="23" y1="11" x2="23" y2="13" strokeWidth="3" />
      <rect x="4" y="9" width="11" height="6" fill="#10b981" stroke="none" />
    </svg>
  ),
  Google: ({ size = 16 }: { size?: number }) => (
    <svg width={size} height={size} viewBox="0 0 24 24">
      <path
        fill="#4285F4"
        d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v3.927h6.6c-.28 1.5-.12 3-.3 4.01l3.2 2.48c1.87-1.73 2.94-4.28 2.94-7.337z"
      />
      <path
        fill="#34A853"
        d="M12 24c3.24 0 5.97-1.08 7.96-2.91l-3.2-2.48c-.9.6-2.05.96-3.76.96-3.13 0-5.78-2.11-6.73-4.96L1 17.06c2.01 3.99 6.13 6.94 11 6.94z"
      />
      <path
        fill="#FBBC05"
        d="M5.27 14.61A7.12 7.12 0 0 1 4.8 12c0-.92.16-1.82.47-2.68L2.06 6.84A11.94 11.94 0 0 0 0 12c0 1.83.41 3.57 1.15 5.12l4.12-2.51z"
      />
      <path
        fill="#EA4335"
        d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.44-3.44C17.96 1.19 15.24 0 12 0 7.13 0 3.01 2.95 1 6.94l4.27 2.47c.95-2.85 3.6-4.96 6.73-4.96z"
      />
    </svg>
  ),
  Sparkles: ({ size = 16, color = 'currentColor' }: { size?: number, color?: string }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3v4M12 17v4M3 12h4M17 12h4M5.64 5.64l2.83 2.83M15.53 15.53l2.83 2.83M5.64 18.36l2.83-2.83M15.53 8.47l2.83-2.83" />
    </svg>
  ),
  Error: ({ size = 16, color = '#ef4444' }: { size?: number, color?: string }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="8" x2="12" y2="12" />
      <line x1="12" y1="16" x2="12.01" y2="16" strokeWidth="3" />
    </svg>
  ),
  Success: ({ size = 16, color = '#10b981' }: { size?: number, color?: string }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  ),
  Document: ({ size = 20, color = 'currentColor' }: { size?: number, color?: string }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
      <polyline points="10 9 9 9 8 9" />
    </svg>
  ),
  Info: ({ size = 20, color = 'currentColor' }: { size?: number, color?: string }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="16" x2="12" y2="12" />
      <line x1="12" y1="8" x2="12.01" y2="8" strokeWidth="3" />
    </svg>
  ),
  Dollar: ({ size = 16, color = 'currentColor' }: { size?: number, color?: string }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="1" x2="12" y2="23" />
      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
    </svg>
  ),
  Briefcase: ({ size = 16, color = 'currentColor' }: { size?: number, color?: string }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
    </svg>
  ),
  Send: ({ size = 14, color = 'currentColor' }: { size?: number, color?: string }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="22" y1="2" x2="11" y2="13" />
      <polygon points="22 2 15 22 11 13 2 9 22 2" />
    </svg>
  ),
  Eye: ({ size = 14, color = 'currentColor' }: { size?: number, color?: string }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  ),
  Graduation: ({ size = 20, color = 'currentColor' }: { size?: number, color?: string }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
      <path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5" />
    </svg>
  ),
  Edit: ({ size = 14, color = 'currentColor' }: { size?: number, color?: string }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
      <path d="M18.5 2.5a2.121 2.121 0 1 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
    </svg>
  ),
  Close: ({ size = 14, color = 'currentColor' }: { size?: number, color?: string }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  ),
  Folder: ({ size = 32, color = 'currentColor' }: { size?: number, color?: string }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
    </svg>
  ),
  ChatBubble: ({ size = 32, color = 'currentColor' }: { size?: number, color?: string }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  )
};

interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  rating: string;
  salary: string;
  responds: string;
  visa: boolean;
  room: boolean;
  type: string;
  logoText: string;
  logoBg: string;
}

export default function App() {
  const [activeTab, setActiveTab] = useState<'home' | 'myjobs' | 'messages' | 'profile'>('home');
  const [profileSubTab, setProfileSubTab] = useState<'profile' | 'preferences' | 'resume'>('profile');
  
  // Starting state: app (Home feed is loaded directly, just like Zyan!)
  const [screen, setScreen] = useState<'auth' | 'onboarding' | 'app'>('app');
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selectedJob, setSelectedJob] = useState<any | null>(null);
  const [selectedCompany, setSelectedCompany] = useState<any | null>(null);
  const [loadingCompany, setLoadingCompany] = useState(false);
  
  // Dynamic Employee Profiles states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  
  // Onboarding Wizard details (Employee registration data)
  const [onboardingStep, setOnboardingStep] = useState(1);
  
  // Expanded Employee relocated parameters
  const [currentCity, setCurrentCity] = useState("Mumbai");
  const [targetCountry, setTargetCountry] = useState("Japan");
  const [experienceYears, setExperienceYears] = useState("3");
  const [primarySkills, setPrimarySkills] = useState("React, Node.js, TypeScript, SQL");
  const [summary, setSummary] = useState(
    "Experienced Software Engineer with a passion for building robust React & Node.js architectures, now seeking global opportunities."
  );

  // New previous company and education states!
  const [prevCompany, setPrevCompany] = useState("Tata Consultancy Services");
  const [prevJobTitle, setPrevJobTitle] = useState("Junior Web Developer");
  const [prevDuration, setPrevDuration] = useState("2 Years");
  const [educationDegree, setEducationDegree] = useState("Bachelors in Computer Science");
  const [educationSchool, setEducationSchool] = useState("Mumbai University");

  const [relocationVisa, setRelocationVisa] = useState(true);
  const [relocationRoom, setRelocationRoom] = useState(true);
  const [relocationFlight, setRelocationFlight] = useState(true);
  const [uploadedResumeName, setUploadedResumeName] = useState("Resume-Main.pdf");
  const [userResumes, setUserResumes] = useState<any[]>([]);
  const [myJobsSubTab, setMyJobsSubTab] = useState<'applied' | 'saved'>('applied');
  const [userSavedJobs, setUserSavedJobs] = useState<any[]>([]);
  const [userMessages, setUserMessages] = useState<any[]>([
    {
      id: -1,
      company_name: 'Tokyo Tech Labs',
      company_logo: '🤖',
      job_title: 'Software Engineer - Japan',
      message_text: "We reviewed your profile and cover letter! Let's schedule an interview.",
      created_at: new Date().toISOString()
    },
    {
      id: -2,
      company_name: 'Canada Health Corp',
      company_logo: 'CHC',
      job_title: 'Registered Nurse - Relocation',
      message_text: 'Thank you for applying. We are processing your visa sponsorship details.',
      created_at: new Date(Date.now() - 86400000).toISOString()
    }
  ]);
  const [showNotificationsSheet, setShowNotificationsSheet] = useState(false);
  const [coverLetter, setCoverLetter] = useState(
    "Dear Hiring Manager,\n\nI am writing to express my strong interest in relocations opportunities. I am highly flexible, ready to relocate immediately, and seek a role with visa sponsorship support."
  );

  // Real backend sync states
  const [authToken, setAuthToken] = useState<string | null>(localStorage.getItem('token'));
  const [applicationsCount, setApplicationsCount] = useState<number>(0);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [profilePicture, setProfilePicture] = useState<string | null>(null);

  // Profile Edit State
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [employerFindMode, setEmployerFindMode] = useState<'public' | 'limited' | 'hidden'>('public');
  const [showEmployerFindSheet, setShowEmployerFindSheet] = useState(false);

  // Dialog / Bottom Sheet State
  const [showFilterSheet, setShowFilterSheet] = useState(false);
  const [hybridChecked, setHybridChecked] = useState(false);
  const [remoteChecked, setRemoteChecked] = useState(false);
  const [visaFilter, setVisaFilter] = useState(false);
  const [salaryFilter, setSalaryFilter] = useState(false);
  const [countriesList, setCountriesList] = useState<any[]>([]);
  const [selectedCountryId, setSelectedCountryId] = useState<number | null>(null);
  const [showCountrySheet, setShowCountrySheet] = useState(false);

  // Applications tracker
  const [appliedJobIds, setAppliedJobIds] = useState<number[]>([]);
  const [userApplications, setUserApplications] = useState<any[]>([]);
  const [savedJobIds, setSavedJobIds] = useState<number[]>([2]);
  const [notifications, setNotifications] = useState<any[]>([]);
  const [jobAlerts, setJobAlerts] = useState<any[]>([]);
  const [alertKeyword, setAlertKeyword] = useState('');
  const [alertCategoryId, setAlertCategoryId] = useState('1');
  const [alertCountryId, setAlertCountryId] = useState('1');
  const [alertFrequency, setAlertFrequency] = useState('daily');

  // Chat / Messages thread states
  const [currentUserId, setCurrentUserId] = useState<number | null>(null);
  const [activeChat, setActiveChat] = useState<any | null>(null);
  const [chatMessages, setChatMessages] = useState<any[]>([]);
  const [chatReplyText, setChatReplyText] = useState<string>('');
  const [loadingChat, setLoadingChat] = useState<boolean>(false);

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setErrorMessage(null);
    setSuccessMessage(null);

    const token = authToken || localStorage.getItem('token');
    if (!token) {
      setErrorMessage("Please login first to upload a photo.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append('avatar', file);

      const res = await fetch(API_BASE_URL + '/api/v1/auth/upload-avatar', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });
      const data = await res.json();
      if (data.success && data.profilePicture) {
        setProfilePicture(data.profilePicture);
        setSuccessMessage("Profile picture uploaded successfully!");
      } else {
        setErrorMessage(data.message || "Failed to upload photo.");
      }
    } catch (err) {
      console.error("Avatar upload error:", err);
      setErrorMessage("Could not connect to the server. Photo saved locally.");
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') setProfilePicture(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const fetchResumes = async (token: string) => {
    try {
      const res = await fetch(API_BASE_URL + '/api/v1/resumes', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success && data.resumes) {
        setUserResumes(data.resumes);
        const defaultResume = data.resumes.find((r: any) => r.is_default === 1) || data.resumes[0];
        if (defaultResume) {
          setUploadedResumeName(defaultResume.title);
        }
      }
    } catch (err) {
      console.error("Error fetching resumes:", err);
    }
  };

  const handleResumeDelete = async (resumeId: number) => {
    setErrorMessage(null);
    setSuccessMessage(null);
    const token = authToken || localStorage.getItem('token');
    if (!token) return;

    try {
      const res = await fetch(`${API_BASE_URL}/api/v1/resumes/${resumeId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success) {
        setSuccessMessage("Resume deleted successfully!");
        fetchResumes(token);
      } else {
        setErrorMessage(data.message || "Failed to delete resume.");
      }
    } catch (err) {
      console.error("Resume delete error:", err);
      setErrorMessage("Could not delete resume.");
    }
  };

  const handleWithdrawApplication = async (appId: number) => {
    setErrorMessage(null);
    setSuccessMessage(null);
    const token = authToken || localStorage.getItem('token');
    if (!token) return;

    try {
      const res = await fetch(`${API_BASE_URL}/api/v1/jobs/applications/${appId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success) {
        setSuccessMessage("Application withdrawn successfully!");
        fetchApplications(token);
      } else {
        setErrorMessage(data.message || "Failed to withdraw application.");
      }
    } catch (err) {
      console.error("Withdraw application error:", err);
      setErrorMessage("Could not withdraw application.");
    }
  };

  const handleUpdateApplicationStatus = async (appId: number, newStatus: string) => {
    setErrorMessage(null);
    setSuccessMessage(null);
    const token = authToken || localStorage.getItem('token');
    if (!token) return;

    try {
      const res = await fetch(`${API_BASE_URL}/api/v1/jobs/applications/${appId}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ status: newStatus })
      });
      const data = await res.json();
      if (data.success) {
        setSuccessMessage("Application status updated successfully!");
        fetchApplications(token);
      } else {
        setErrorMessage(data.message || "Failed to update status.");
      }
    } catch (err) {
      console.error("Update status error:", err);
      setErrorMessage("Could not update status.");
    }
  };

  const handleClearNotifications = () => {
    setNotifications([]);
    setSuccessMessage("Notifications cleared from view.");
  };

  const handleResumeUpload = async (file: File) => {
    setErrorMessage(null);
    setSuccessMessage(null);
    setUploadedResumeName(file.name);

    const token = authToken || localStorage.getItem('token');
    if (!token) return;

    try {
      const formData = new FormData();
      formData.append('resume', file);
      formData.append('title', file.name);

      const res = await fetch(API_BASE_URL + '/api/v1/resumes/upload', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });
      const data = await res.json();
      if (data.success) {
        setSuccessMessage("Resume file uploaded successfully!");
        fetchResumes(token);
      } else {
        setErrorMessage(data.message || "Failed to upload resume.");
      }
    } catch (err) {
      console.error("Resume upload error:", err);
      setErrorMessage("Could not connect to backend. Resume saved in memory.");
    }
  };

  const fetchCompanyDetails = async (slug: string) => {
    try {
      setLoadingCompany(true);
      const res = await fetch(`${API_BASE_URL}/api/v1/companies/${slug}`);
      const data = await res.json();
      if (data.success && data.company) {
        setSelectedCompany({
          ...data.company,
          jobs: data.jobs || []
        });
      } else {
        // Fallback for offline seeded company match
        const fallback = {
          name: slug === 'tokyo-tech-labs' ? 'Tokyo Tech Labs' : slug === 'nhs-foundation-trust' ? 'NHS Foundation Trust' : 'Vinci Infrastructure',
          logo: slug === 'tokyo-tech-labs' ? '🤖' : slug === 'nhs-foundation-trust' ? '🏥' : '🏗️',
          website: slug === 'tokyo-tech-labs' ? 'https://tokyotechlabs.jp' : slug === 'nhs-foundation-trust' ? 'https://nhs.uk' : 'https://vinci.de',
          description: slug === 'tokyo-tech-labs' ? 'Building next-generation global software and robotics architectures.' : slug === 'nhs-foundation-trust' ? 'National Health Service provider in the United Kingdom.' : 'Civil engineering and heavy industrial infrastructure development.',
          industry: slug === 'tokyo-tech-labs' ? 'Technology' : slug === 'nhs-foundation-trust' ? 'Healthcare' : 'Construction',
          company_size: slug === 'tokyo-tech-labs' ? '100-500 employees' : slug === 'nhs-foundation-trust' ? '10000+ employees' : '5000-10000 employees',
          headquarters: slug === 'tokyo-tech-labs' ? 'Tokyo, Japan' : slug === 'nhs-foundation-trust' ? 'London, UK' : 'Munich, Germany',
          is_verified: 1,
          jobs: jobs.filter(j => (j.company_name || j.company || '').toLowerCase().includes(slug.split('-')[0]))
        };
        setSelectedCompany(fallback);
      }
    } catch (err) {
      console.log("Offline company fallback loaded.");
      const fallback = {
        name: slug === 'tokyo-tech-labs' ? 'Tokyo Tech Labs' : slug === 'nhs-foundation-trust' ? 'NHS Foundation Trust' : 'Vinci Infrastructure',
        logo: slug === 'tokyo-tech-labs' ? '🤖' : slug === 'nhs-foundation-trust' ? '🏥' : '🏗️',
        website: slug === 'tokyo-tech-labs' ? 'https://tokyotechlabs.jp' : slug === 'nhs-foundation-trust' ? 'https://nhs.uk' : 'https://vinci.de',
        description: slug === 'tokyo-tech-labs' ? 'Building next-generation global software and robotics architectures.' : slug === 'nhs-foundation-trust' ? 'National Health Service provider in the United Kingdom.' : 'Civil engineering and heavy industrial infrastructure development.',
        industry: slug === 'tokyo-tech-labs' ? 'Technology' : slug === 'nhs-foundation-trust' ? 'Healthcare' : 'Construction',
        company_size: slug === 'tokyo-tech-labs' ? '100-500 employees' : slug === 'nhs-foundation-trust' ? '10000+ employees' : '5000-10000 employees',
        headquarters: slug === 'tokyo-tech-labs' ? 'Tokyo, Japan' : slug === 'nhs-foundation-trust' ? 'London, UK' : 'Munich, Germany',
        is_verified: 1,
        jobs: jobs.filter(j => (j.company_name || j.company || '').toLowerCase().includes(slug.split('-')[0]))
      };
      setSelectedCompany(fallback);
    } finally {
      setLoadingCompany(false);
    }
  };

  const fetchMessages = async (token: string) => {
    try {
      const res = await fetch(API_BASE_URL + '/api/v1/messages', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success && data.messages) {
        setUserMessages(data.messages);
      }
    } catch (err) {
      console.log("Using offline fallback messages.");
    }
  };

  const fetchChatThread = async (jobId: number, otherUserId: number) => {
    const token = authToken || localStorage.getItem('token');
    if (!token) return;
    setLoadingChat(true);
    try {
      const res = await fetch(`${API_BASE_URL}/api/v1/messages/thread/${jobId}/${otherUserId}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success && data.messages) {
        setChatMessages(data.messages);
      }
    } catch (err) {
      console.error("Fetch chat thread error:", err);
    } finally {
      setLoadingChat(false);
    }
  };

  const handleSendChatReply = async () => {
    if (!chatReplyText.trim() || !activeChat) return;
    const token = authToken || localStorage.getItem('token');
    if (!token) return;
    
    const originalText = chatReplyText;
    setChatReplyText('');
    
    try {
      const res = await fetch(API_BASE_URL + '/api/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          receiver_id: activeChat.otherUserId,
          job_id: activeChat.jobId,
          message_text: originalText
        })
      });
      const data = await res.json();
      if (data.success) {
        fetchChatThread(activeChat.jobId, activeChat.otherUserId);
        fetchMessages(token);
      } else {
        setChatReplyText(originalText);
        alert(data.message || 'Failed to send message.');
      }
    } catch (err) {
      console.error("Send reply error:", err);
      setChatReplyText(originalText);
      alert('Could not send message.');
    }
  };

  const fetchSavedJobs = async (token: string) => {
    try {
      const res = await fetch(API_BASE_URL + '/api/v1/jobs/my/saved', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (res.status === 403 || res.status === 401 || data.message === 'Invalid or expired token.') {
        handleLogout();
        return;
      }
      if (data.success && data.savedJobs) {
        setUserSavedJobs(data.savedJobs);
        const ids = data.savedJobs.map((j: any) => j.id);
        setSavedJobIds(ids);
      }
    } catch (err) {
      console.log("Using offline saved jobs states.");
    }
  };

  const fetchApplications = async (token: string) => {
    try {
      const res = await fetch(API_BASE_URL + '/api/v1/jobs/my/applications', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (res.status === 403 || res.status === 401 || data.message === 'Invalid or expired token.') {
        handleLogout();
        return;
      }
      if (data.success && data.applications) {
        setUserApplications(data.applications);
        const ids = data.applications.map((app: any) => app.job_id);
        setAppliedJobIds(ids);
        setApplicationsCount(data.applications.length);
      }
    } catch (err) {
      console.log("Using offline applications states.");
    }
  };

  const fetchCountriesMetadata = async () => {
    try {
      const res = await fetch(API_BASE_URL + '/api/v1/meta');
      const data = await res.json();
      if (data.success && data.countries) {
        setCountriesList(data.countries);
      }
    } catch (err) {
      console.log("Using offline country list fallback.");
      setCountriesList([
        { id: 1, name: 'United Kingdom', code: 'GB', flag_url: 'https://flagcdn.com/w320/gb.png' },
        { id: 2, name: 'Canada', code: 'CA', flag_url: 'https://flagcdn.com/w320/ca.png' },
        { id: 3, name: 'Germany', code: 'DE', flag_url: 'https://flagcdn.com/w320/de.png' },
        { id: 4, name: 'Japan', code: 'JP', flag_url: 'https://flagcdn.com/w320/jp.png' },
        { id: 5, name: 'United States', code: 'US', flag_url: 'https://flagcdn.com/w320/us.png' }
      ]);
    }
  };

  const fetchNotifications = async (token: string) => {
    try {
      const res = await fetch(API_BASE_URL + '/api/v1/jobs/my/notifications', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success && data.notifications) {
        setNotifications(data.notifications);
      }
    } catch (err) {
      console.log("Using offline notification logs.");
    }
  };

  const fetchJobAlerts = async (token: string) => {
    try {
      const res = await fetch(API_BASE_URL + '/api/v1/jobs/my/alerts', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success && data.alerts) {
        setJobAlerts(data.alerts);
      }
    } catch (err) {
      console.log("Offline alerts loading.");
    }
  };

  const handleCreateAlert = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!alertKeyword.trim()) return;

    const token = authToken || localStorage.getItem('token');
    if (!token) return;

    try {
      const res = await fetch(API_BASE_URL + '/api/v1/jobs/my/alerts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          keyword: alertKeyword,
          category_id: Number(alertCategoryId),
          country_id: Number(alertCountryId),
          frequency: alertFrequency
        })
      });
      const data = await res.json();
      if (data.success) {
        setAlertKeyword('');
        fetchJobAlerts(token);
      }
    } catch (err) {
      // Offline fallback
      const offlineAlert = {
        id: Date.now(),
        keyword: alertKeyword,
        category_name: Number(alertCategoryId) === 1 ? 'Software Engineering' : Number(alertCategoryId) === 2 ? 'Healthcare' : 'Other',
        country_name: Number(alertCountryId) === 1 ? 'United Kingdom' : 'Canada',
        frequency: alertFrequency
      };
      setJobAlerts([offlineAlert, ...jobAlerts]);
      setAlertKeyword('');
    }
  };

  const handleDeleteAlert = async (id: number) => {
    const token = authToken || localStorage.getItem('token');
    if (!token) return;

    try {
      const res = await fetch(`${API_BASE_URL}/api/v1/jobs/my/alerts/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success) {
        fetchJobAlerts(token);
      }
    } catch (err) {
      setJobAlerts(jobAlerts.filter(a => a.id !== id));
    }
  };

  const fetchUserProfile = async (token: string) => {
    try {
      const res = await fetch(API_BASE_URL + '/api/v1/auth/profile', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await res.json();
      if (res.status === 403 || res.status === 401 || data.message === 'Invalid or expired token.') {
        handleLogout();
        return;
      }
      if (data.success && data.user) {
        const u = data.user;
        setName(`${u.first_name || ''} ${u.last_name || ''}`.trim() || 'Gaurav Yadav');
        setEmail(u.email || '');
        setCurrentUserId(u.id);
        if (u.profile_picture) setProfilePicture(u.profile_picture);
        if (u.current_city) setCurrentCity(u.current_city);
        if (u.target_country) setTargetCountry(u.target_country);
        if (u.experience_years) setExperienceYears(String(u.experience_years));
        if (u.primary_skills) setPrimarySkills(u.primary_skills);
        if (u.summary) setSummary(u.summary);
        if (u.prev_company) setPrevCompany(u.prev_company);
        if (u.prev_job_title) setPrevJobTitle(u.prev_job_title);
        if (u.prev_duration) setPrevDuration(u.prev_duration);
        if (u.education_degree) setEducationDegree(u.education_degree);
        if (u.education_school) setEducationSchool(u.education_school);
        if (u.cover_letter) setCoverLetter(u.cover_letter);
        if (typeof u.applications_count !== 'undefined') setApplicationsCount(u.applications_count);

        // Fetch user saved jobs, notifications, and alerts dynamically
        fetchResumes(token).catch(console.error);
        fetchSavedJobs(token).catch(console.error);
        fetchApplications(token).catch(console.error);
        fetchNotifications(token).catch(console.error);
        fetchJobAlerts(token).catch(console.error);
        fetchMessages(token).catch(console.error);
      }
    } catch (err) {
      console.error("Error fetching user profile:", err);
    }
  };

  const demoJobs = [
    {
      id: 1,
      title: 'Senior Data Analyst',
      company_name: 'Wavewood',
      city: 'Mumbai',
      country_name: 'India',
      responds: 'Typically responds within 3 days',
      visa_sponsorship: 1,
      accommodation_provided: 1,
      job_type: 'full-time',
      salary_min: 1200000,
      salary_max: 1900000,
      currency: 'INR',
      description: 'We are looking for a Senior Data Analyst with 3+ years of experience to manage and optimize our data pipelines.',
      skills_required: 'Python, SQL, Tableau, Excel',
      logoText: 'W',
      logoBg: '#e2f0fd'
    },
    {
      id: 2,
      title: 'Data Analyst',
      company_name: 'Beta Experts',
      city: 'Mumbai',
      country_name: 'India',
      responds: 'Typically responds within 1 day',
      visa_sponsorship: 1,
      accommodation_provided: 0,
      job_type: 'full-time',
      salary_min: 70000,
      salary_max: 100000,
      currency: 'INR',
      description: 'Join our team as a Data Analyst! You will analyze user behavior, perform A/B testing, and construct automated dashboards.',
      skills_required: 'SQL, Python, PowerBI',
      logoText: 'B',
      logoBg: '#fbe9e7'
    },
    {
      id: 3,
      title: 'Systems Architect (Visa Relocation)',
      company_name: 'Tokyo Tech Labs',
      city: 'Tokyo',
      country_name: 'Japan',
      responds: 'Typically responds within 2 days',
      visa_sponsorship: 1,
      accommodation_provided: 1,
      job_type: 'full-time',
      salary_min: 8000000,
      salary_max: 12000000,
      currency: 'JPY',
      description: 'We are hiring a Systems Architect who is ready to relocate immediately to Tokyo. Visa and housing support provided!',
      skills_required: 'Go, Rust, AWS, Kubernetes',
      logoText: 'T',
      logoBg: '#e8f5e9'
    }
  ];

  const [jobs, setJobs] = useState<any[]>(demoJobs);
  const [loadingJobs, setLoadingJobs] = useState(false);

  const fetchJobs = async () => {
    try {
      setLoadingJobs(true);
      const res = await fetch(API_BASE_URL + '/api/v1/jobs');
      const data = await res.json();
      if (data.success && data.jobs && data.jobs.length > 0) {
        const mappedJobs = data.jobs.map((j: any) => ({
          ...j,
          logoText: j.company_logo ? j.company_logo : (j.company_name ? j.company_name.charAt(0) : 'J'),
          logoBg: ['#e2f0fd', '#fbe9e7', '#e8f5e9', '#fff3e0', '#f3e5f5'][j.id % 5]
        }));
        setJobs(mappedJobs);
      } else {
        setJobs(demoJobs);
      }
    } catch (err) {
      console.log("Using local offline seeded demo jobs.");
      setJobs(demoJobs);
    } finally {
      setLoadingJobs(false);
    }
  };

  React.useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setAuthToken(token);
      setIsLoggedIn(true);
      fetchUserProfile(token);
    }
    fetchJobs();
    fetchCountriesMetadata();
  }, []);

  const filteredJobs = jobs.filter(job => {
    if (remoteChecked) {
      const isRemote = job.title.toLowerCase().includes('remote') || 
                       job.description.toLowerCase().includes('remote') ||
                       (job.city && job.city.toLowerCase().includes('remote')) ||
                       (job.location && job.location.toLowerCase().includes('remote'));
      if (!isRemote) return false;
    }
    if (hybridChecked) {
      const isHybrid = job.title.toLowerCase().includes('hybrid') || 
                       job.description.toLowerCase().includes('hybrid');
      if (!isHybrid) return false;
    }
    if (visaFilter) {
      if (job.visa_sponsorship !== 1) return false;
    }
    if (salaryFilter) {
      if (job.salary_min && Number(job.salary_min) < 500000) {
        // Less than 5 Lakhs (or 50k depending on currency)
        return false;
      }
    }
    if (selectedCountryId !== null) {
      if (Number(job.country_id) !== selectedCountryId) return false;
    }
    return true;
  });

  const handleApply = async (id: number) => {
    const token = authToken || localStorage.getItem('token');
    if (!token) {
      setScreen('auth');
      setAuthMode('login');
      setErrorMessage("Please sign in or register to apply for jobs.");
      return;
    }

    try {
      const res = await fetch(API_BASE_URL + '/api/v1/jobs/apply', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          job_id: id,
          cover_letter: coverLetter
        })
      });
      const data = await res.json();
      if (res.status === 403 || res.status === 401 || data.message === 'Invalid or expired token.') {
        handleLogout();
        setErrorMessage("Your session has expired. Please sign in again.");
        setTimeout(() => setErrorMessage(null), 4000);
        return;
      }
      if (data.success) {
        setSuccessMessage("Application submitted successfully!");
        setErrorMessage(null);
        setTimeout(() => setSuccessMessage(null), 4000);
        if (!appliedJobIds.includes(id)) {
          setAppliedJobIds([...appliedJobIds, id]);
        }
        setApplicationsCount(prev => prev + 1);
        fetchApplications(token).catch(console.error);
      } else {
        setErrorMessage(data.message || "Failed to apply.");
        setSuccessMessage(null);
        setTimeout(() => setErrorMessage(null), 4000);
      }
    } catch (err) {
      console.error("Apply job sync failed:", err);
      // Fallback local apply
      if (!appliedJobIds.includes(id)) {
        setAppliedJobIds([...appliedJobIds, id]);
        setApplicationsCount(prev => prev + 1);
      }
      setSuccessMessage("Application saved locally.");
      setTimeout(() => setSuccessMessage(null), 4000);
    }
  };

  const toggleSave = async (id: number) => {
    const token = authToken || localStorage.getItem('token');
    
    if (savedJobIds.includes(id)) {
      setSavedJobIds(savedJobIds.filter(item => item !== id));
      setUserSavedJobs(prev => prev.filter(job => job.id !== id && job.job_id !== id));
      if (token) {
        try {
          await fetch(`${API_BASE_URL}/api/v1/jobs/save/${id}`, {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${token}` }
          });
          fetchSavedJobs(token).catch(console.error);
        } catch (err) {
          console.error("Unsave job sync failed:", err);
        }
      }
    } else {
      setSavedJobIds([...savedJobIds, id]);
      const jobToSave = jobs.find(j => j.id === id);
      if (jobToSave) {
        setUserSavedJobs(prev => [...prev, { ...jobToSave, save_id: Date.now(), id: id }]);
      }
      if (token) {
        try {
          await fetch(API_BASE_URL + '/api/v1/jobs/save', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ job_id: id })
          });
          fetchSavedJobs(token).catch(console.error);
        } catch (err) {
          console.error("Save job sync failed:", err);
        }
      }
    }
  };

  const handleAuthSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    if (authMode === 'register') {
      try {
        const names = name.trim().split(' ');
        const firstName = names[0] || 'Employee';
        const lastName = names.slice(1).join(' ') || 'User';

        const res = await fetch(API_BASE_URL + '/api/v1/auth/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email,
            password,
            role: 'seeker',
            first_name: firstName,
            last_name: lastName,
            phone: '1234567890'
          })
        });

        const data = await res.json();
        if (data.success) {
          localStorage.setItem('token', data.accessToken);
          setAuthToken(data.accessToken);
          setSuccessMessage("Account created successfully! Let's setup your profile.");
          setTimeout(() => {
            setScreen('onboarding');
            setOnboardingStep(1);
          }, 1000);
        } else {
          setErrorMessage(data.message || "Registration failed.");
        }
      } catch (err) {
        setErrorMessage("Could not connect to the server. Running in fallback onboarding mode.");
        setTimeout(() => {
          setScreen('onboarding');
          setOnboardingStep(1);
        }, 1500);
      }
    } else {
      try {
        const res = await fetch(API_BASE_URL + '/api/v1/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password })
        });

        const data = await res.json();
        if (data.success) {
          localStorage.setItem('token', data.accessToken);
          setAuthToken(data.accessToken);
          await fetchUserProfile(data.accessToken);
          setSuccessMessage("Login successful!");
          setTimeout(() => {
            setIsLoggedIn(true);
            setScreen('app');
            setActiveTab('home');
          }, 1000);
        } else {
          setErrorMessage(data.message || "Invalid credentials.");
        }
      } catch (err) {
        setErrorMessage("Could not connect to server. Logging in using demo credentials.");
        setTimeout(() => {
          setIsLoggedIn(true);
          setScreen('app');
          setActiveTab('home');
        }, 1500);
      }
    }
  };

  const handleCompleteOnboarding = async () => {
    setErrorMessage(null);
    setSuccessMessage(null);
    const token = authToken || localStorage.getItem('token') || 'demo-token-2026';
    
    try {
      const res = await fetch(API_BASE_URL + '/api/v1/auth/onboarding', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          current_city: currentCity,
          target_country: targetCountry,
          experience_years: experienceYears,
          primary_skills: primarySkills,
          summary: summary,
          prev_company: prevCompany,
          prev_job_title: prevJobTitle,
          prev_duration: prevDuration,
          education_degree: educationDegree,
          education_school: educationSchool,
          cover_letter: coverLetter
        })
      });
      const data = await res.json();
      if (data.success) {
        setSuccessMessage("Onboarding completed and saved successfully!");
        await fetchUserProfile(token);
      }
    } catch (err) {
      console.log("Onboarding sync completed locally.");
    }
    
    setTimeout(() => {
      setIsLoggedIn(true);
      setScreen('app');
      setActiveTab('home');
    }, 1000);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setAuthToken(null);
    setApplicationsCount(0);
    setUserApplications([]);
    setAppliedJobIds([]);
    setCurrentUserId(null);
    setActiveChat(null);
    setChatMessages([]);
    setUserMessages([
      {
        id: -1,
        company_name: 'Tokyo Tech Labs',
        company_logo: '🤖',
        job_title: 'Software Engineer - Japan',
        message_text: "We reviewed your profile and cover letter! Let's schedule an interview.",
        created_at: new Date().toISOString()
      },
      {
        id: -2,
        company_name: 'Canada Health Corp',
        company_logo: 'CHC',
        job_title: 'Registered Nurse - Relocation',
        message_text: 'Thank you for applying. We are processing your visa sponsorship details.',
        created_at: new Date(Date.now() - 86400000).toISOString()
      }
    ]);
    setSuccessMessage(null);
    setErrorMessage(null);
    setIsLoggedIn(false);
    setScreen('auth');
    setAuthMode('login');
    setEmail('');
    setPassword('');
    setName('');
  };

  return (
    <div className="mobile-app-wrapper">
      <div className="mobile-phone-casing">
        {/* Flagship glossy display glare overlay */}
        <div className="screen-glare-reflection" />

        <div className="mobile-screen-content">
          {/* Futuristic Status Bar directly below Notch */}
          <div className="futuristic-status-bar">
            <span className="status-time">23:35</span>
            <div className="status-icons" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Icons.Wifi size={14} color="#2557a7" />
              <Icons.Signal size={14} color="#2557a7" />
              <Icons.Battery size={16} color="#10b981" />
            </div>
          </div>

          {/* Ambient Glowing Blobs inside Screen Background */}
          <div className="ambient-blur-blob blob-blue" />
          <div className="ambient-blur-blob blob-cyan" />
          
          {/* SCREEN A: AUTH STARTING SCREEN */}
          {screen === 'auth' && (
            <div className="auth-view fade-in">
              <div className="auth-container-premium">
                <div className="indeed-logo-header">zyan</div>
                
                <h2 className="mobile-auth-title">
                  {authMode === 'login' ? 'Ready to find your next job?' : 'Create an account'}
                </h2>
                <p className="mobile-auth-subtitle">
                  Apply to thousands of verified international jobs with visa support and relocations.
                </p>

                <button type="button" onClick={handleAuthSubmit} className="google-signin-btn">
                  <Icons.Google size={16} /> Sign in with Google
                </button>

                <div className="auth-divider">
                  <span className="divider-text">or</span>
                </div>

                {errorMessage && (
                  <div className="indeed-error-banner animate-slide-up" style={{
                    backgroundColor: 'rgba(239, 68, 68, 0.1)',
                    border: '1px solid rgba(239, 68, 68, 0.2)',
                    color: '#ef4444',
                    padding: '10px 14px',
                    borderRadius: '12px',
                    fontSize: '12px',
                    marginBottom: '15px',
                    textAlign: 'center',
                    fontWeight: 600,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px'
                  }}>
                    <Icons.Error size={14} color="#ef4444" /> {errorMessage}
                  </div>
                )}

                {successMessage && (
                  <div className="indeed-success-banner animate-slide-up" style={{
                    backgroundColor: 'rgba(16, 185, 129, 0.1)',
                    border: '1px solid rgba(16, 185, 129, 0.2)',
                    color: '#10b981',
                    padding: '10px 14px',
                    borderRadius: '12px',
                    fontSize: '12px',
                    marginBottom: '15px',
                    textAlign: 'center',
                    fontWeight: 600,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px'
                  }}>
                    <Icons.Success size={14} color="#10b981" /> {successMessage}
                  </div>
                )}

                <form onSubmit={handleAuthSubmit} className="mobile-form-premium">
                  {authMode === 'register' && (
                    <div className="mob-input-wrap-premium">
                      <label className="input-label-premium">Full name *</label>
                      <input 
                        type="text" 
                        required 
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="mob-input-field-premium"
                        placeholder="Enter your name"
                      />
                    </div>
                  )}

                  <div className="mob-input-wrap-premium">
                    <label className="input-label-premium">Email address *</label>
                    <input 
                      type="email" 
                      required 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="mob-input-field-premium"
                      placeholder="Enter your email"
                    />
                  </div>

                  <div className="mob-input-wrap-premium">
                    <label className="input-label-premium">Password *</label>
                    <input 
                      type="password" 
                      required 
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="mob-input-field-premium"
                      placeholder="Enter password"
                    />
                  </div>

                  {/* Autofill Demo Chip Helper */}
                  <div className="autofill-chip-container">
                    <button 
                      type="button" 
                      onClick={() => { 
                        setEmail('candidate@jobzyan.com'); 
                        setPassword('Zyan123!'); 
                        setName('Gaurav Yadav'); 
                      }}
                      className="autofill-demo-chip"
                      style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                    >
                      <Icons.Bolt size={12} color="#f59e0b" /> Quick Autofill Demo Credentials
                    </button>
                  </div>

                  <button type="submit" className="indeed-primary-btn-submit">
                    {authMode === 'login' ? 'Sign In' : 'Register Profile'}
                  </button>
                </form>

                <div className="auth-terms-disclaimer">
                  By creating an account or logging in, you understand and agree to Zyan's <span className="blue-link">Terms</span>. You also consent to our <span className="blue-link">Cookie</span> and <span className="blue-link">Privacy</span> policies.
                </div>

                <div className="auth-toggle-premium">
                  {authMode === 'login' ? (
                    <span>
                      New to Zyan?{' '}
                      <button onClick={() => setAuthMode('register')} className="auth-toggle-btn-premium">
                        Register Profile
                      </button>
                    </span>
                  ) : (
                    <span>
                      Already have an account?{' '}
                      <button onClick={() => setAuthMode('login')} className="auth-toggle-btn-premium">
                        Sign in
                      </button>
                    </span>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* SCREEN B: NEW EMPLOYEE REGISTRATION SETUP WIZARD */}
          {screen === 'onboarding' && (
            <div className="onboarding-view fade-in">
              <div className="onboarding-container">
                <div className="onboarding-header">
                  <span className="onboarding-step-indicator">Step {onboardingStep} of 3</span>
                  <div className="onboarding-progress-bar">
                    <div className="progress-fill" style={{ width: `${(onboardingStep / 3) * 100}%` }}></div>
                  </div>
                </div>

                {errorMessage && (
                  <div className="indeed-error-banner animate-slide-up" style={{
                    backgroundColor: 'rgba(239, 68, 68, 0.1)',
                    border: '1px solid rgba(239, 68, 68, 0.2)',
                    color: '#ef4444',
                    padding: '8px 12px',
                    borderRadius: '12px',
                    fontSize: '11px',
                    margin: '10px 15px 0 15px',
                    textAlign: 'center',
                    fontWeight: 600,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px'
                  }}>
                    <Icons.Error size={12} color="#ef4444" /> {errorMessage}
                  </div>
                )}

                {successMessage && (
                  <div className="indeed-success-banner animate-slide-up" style={{
                    backgroundColor: 'rgba(16, 185, 129, 0.1)',
                    border: '1px solid rgba(16, 185, 129, 0.2)',
                    color: '#10b981',
                    padding: '8px 12px',
                    borderRadius: '12px',
                    fontSize: '11px',
                    margin: '10px 15px 0 15px',
                    textAlign: 'center',
                    fontWeight: 600,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px'
                  }}>
                    <Icons.Success size={12} color="#10b981" /> {successMessage}
                  </div>
                )}

                {/* STEP 1: ZYAN RESUME SUMMARY & DETAILS */}
                {onboardingStep === 1 && (
                  <div className="onboarding-step-content fade-in">
                    <h3 className="onboarding-step-title">Employee Details</h3>
                    <p className="onboarding-step-subtitle">Tell us about your background, previous jobs, and education.</p>
                    
                    <div className="mob-input-wrap-premium">
                      <label className="input-label-premium">Current City *</label>
                      <input 
                        type="text" 
                        required 
                        value={currentCity}
                        onChange={(e) => setCurrentCity(e.target.value)}
                        className="mob-input-field-premium"
                        placeholder="e.g. Mumbai, New Delhi"
                      />
                    </div>

                    <div className="mob-input-wrap-premium">
                      <label className="input-label-premium">Target Relocation Country *</label>
                      <select 
                        value={targetCountry}
                        onChange={(e) => setTargetCountry(e.target.value)}
                        className="mob-input-field-premium"
                        style={{ height: '45px' }}
                      >
                        <option value="Japan">Japan</option>
                        <option value="United Kingdom">United Kingdom</option>
                        <option value="Germany">Germany</option>
                        <option value="Canada">Canada</option>
                      </select>
                    </div>

                    <div className="mob-input-wrap-premium">
                      <label className="input-label-premium">Previous Company *</label>
                      <input 
                        type="text" 
                        required 
                        value={prevCompany}
                        onChange={(e) => setPrevCompany(e.target.value)}
                        className="mob-input-field-premium"
                        placeholder="e.g. Tata Consultancy Services"
                      />
                    </div>

                    <div className="mob-input-wrap-premium">
                      <label className="input-label-premium">Previous Job Title *</label>
                      <input 
                        type="text" 
                        required 
                        value={prevJobTitle}
                        onChange={(e) => setPrevJobTitle(e.target.value)}
                        className="mob-input-field-premium"
                        placeholder="e.g. Junior Web Developer"
                      />
                    </div>

                    <div className="mob-input-wrap-premium">
                      <label className="input-label-premium">Education Degree *</label>
                      <input 
                        type="text" 
                        required 
                        value={educationDegree}
                        onChange={(e) => setEducationDegree(e.target.value)}
                        className="mob-input-field-premium"
                        placeholder="e.g. Bachelors in Computer Science"
                      />
                    </div>

                    <div className="mob-input-wrap-premium">
                      <label className="input-label-premium">Institution / University *</label>
                      <input 
                        type="text" 
                        required 
                        value={educationSchool}
                        onChange={(e) => setEducationSchool(e.target.value)}
                        className="mob-input-field-premium"
                        placeholder="e.g. Mumbai University"
                      />
                    </div>

                    <button 
                      onClick={() => setOnboardingStep(2)}
                      className="indeed-primary-btn-submit"
                      style={{ marginTop: '10px' }}
                    >
                      Continue
                    </button>
                  </div>
                )}

                {/* STEP 2: JOB PREFERENCES & RELOCATION */}
                {onboardingStep === 2 && (
                  <div className="onboarding-step-content fade-in">
                    <h3 className="onboarding-step-title">Relocation Preferences</h3>
                    <p className="onboarding-step-subtitle">What support details are essential for your overseas move?</p>
                    
                    <div className="onboarding-checkbox-list">
                      <label className="checkbox-row-option border-box-option">
                        <input 
                          type="checkbox" 
                          checked={relocationVisa} 
                          onChange={() => setRelocationVisa(!relocationVisa)}
                          className="checkbox-clean-input" 
                        />
                        <div className="option-text-group">
                          <strong>Visa Sponsorship Required</strong>
                          <span>You require employer visa endorsement.</span>
                        </div>
                      </label>

                      <label className="checkbox-row-option border-box-option">
                        <input 
                          type="checkbox" 
                          checked={relocationRoom} 
                          onChange={() => setRelocationRoom(!relocationRoom)}
                          className="checkbox-clean-input" 
                        />
                        <div className="option-text-group">
                          <strong>Accommodation Provided</strong>
                          <span>Employer pays or coordinates housing lodging.</span>
                        </div>
                      </label>

                      <label className="checkbox-row-option border-box-option">
                        <input 
                          type="checkbox" 
                          checked={relocationFlight} 
                          onChange={() => setRelocationFlight(!relocationFlight)}
                          className="checkbox-clean-input" 
                        />
                        <div className="option-text-group">
                          <strong>Flight & Travel Paid</strong>
                          <span>Flight tickets covered for travel relocation.</span>
                        </div>
                      </label>
                    </div>

                    <button 
                      onClick={() => setOnboardingStep(3)}
                      className="indeed-primary-btn-submit mt-auto"
                    >
                      Continue
                    </button>
                  </div>
                )}

                {/* STEP 3: RESUME UPLOAD & COVER LETTER */}
                {onboardingStep === 3 && (
                  <div className="onboarding-step-content fade-in">
                    <h3 className="onboarding-step-title">Relocation CV & Letter</h3>
                    <p className="onboarding-step-subtitle">Attach your main resume file and draft a target relocation cover letter.</p>
                    
                    <div className="mock-upload-wrapper">
                      <span className="cv-icon"><Icons.Document size={22} color="#2557a7" /></span>
                      <div className="mock-upload-details">
                        <strong>{uploadedResumeName}</strong>
                        <span>PDF, DOC, DOCX up to 5MB</span>
                      </div>
                      <input 
                        type="file" 
                        id="resume-file-input" 
                        accept=".pdf,.doc,.docx" 
                        style={{ display: 'none' }} 
                        onChange={(e) => { if(e.target.files?.[0]) handleResumeUpload(e.target.files[0]); }} 
                      />
                      <button 
                        onClick={() => document.getElementById('resume-file-input')?.click()}
                        className="change-cv-btn"
                      >
                        Upload
                      </button>
                    </div>

                    <label className="input-label-premium mt-4">Draft relocation cover letter</label>
                    <textarea 
                      value={coverLetter}
                      onChange={(e) => setCoverLetter(e.target.value)}
                      className="onboarding-textarea"
                      placeholder="Write cover letter..."
                      rows={5}
                    />

                    <button 
                      onClick={handleCompleteOnboarding}
                      className="indeed-primary-btn-submit mt-auto"
                    >
                      Complete Employee Setup
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* SCREEN C: MAIN APP VIEW */}
          {screen === 'app' && (
            <div className="indeed-app-layout">
              {selectedCompany && (
                /* COMPANY DETAILS SCREEN OVERLAY */
                <div className="job-details-screen-overlay fade-in" style={{ display: 'flex', flexDirection: 'column', height: '100%', backgroundColor: '#ffffff', position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: 1000 }}>
                  {/* Company Header */}
                  <div className="indeed-header" style={{ borderBottom: '1px solid #e4e2e0', padding: '12px 16px', display: 'flex', alignItems: 'center' }}>
                    <button 
                      onClick={() => setSelectedCompany(null)} 
                      style={{ background: 'none', border: 'none', fontSize: '15px', color: '#2557a7', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', padding: 0 }}
                    >
                      ← Back
                    </button>
                    <span className="indeed-logo" style={{ fontSize: '18px', marginLeft: '12px' }}>zyan</span>
                  </div>

                  {/* Company Body */}
                  <div style={{ flex: 1, overflowY: 'auto', padding: '16px', display: 'flex', flexDirection: 'column', gap: '16px', textAlign: 'left' }}>
                    {/* Hero Info */}
                    <div style={{ display: 'flex', gap: '12px', alignItems: 'start' }}>
                      <div className="company-logo-box" style={{ backgroundColor: '#f3f2f1', width: '60px', height: '60px', fontSize: '24px', borderRadius: '14px', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', border: '1px solid #e4e2e0' }}>
                        {selectedCompany.logo && (selectedCompany.logo.startsWith('http://') || selectedCompany.logo.startsWith('https://')) ? (
                          <img src={selectedCompany.logo} alt="Logo" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '14px' }} />
                        ) : (
                          selectedCompany.logo || '🏢'
                        )}
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                        <h2 style={{ fontSize: '20px', fontWeight: 800, color: 'var(--indeed-text-charcoal)', margin: 0, lineHeight: 1.2, display: 'flex', alignItems: 'center', gap: '6px' }}>
                          {selectedCompany.name}
                          {selectedCompany.is_verified === 1 && (
                            <span style={{ backgroundColor: 'rgba(16, 185, 129, 0.1)', color: '#10b981', fontSize: '10px', padding: '2px 6px', borderRadius: '12px', fontWeight: 'bold', display: 'inline-flex', alignItems: 'center', gap: '2px', border: '1px solid rgba(16, 185, 129, 0.2)' }}>
                              ✓ Verified
                            </span>
                          )}
                        </h2>
                        <span style={{ fontSize: '13px', color: '#2557a7', fontWeight: 600 }}>{selectedCompany.industry || 'Technology'}</span>
                        <p style={{ fontSize: '12px', color: '#6f6f6f', margin: 0 }}>📍 {selectedCompany.headquarters || 'Global'}</p>
                      </div>
                    </div>

                    <hr className="border-subtle" style={{ margin: '4px 0' }} />

                    {/* Quick Stats Grid */}
                    <div className="profile-stats-grid" style={{ borderTop: 'none', marginTop: 0, paddingTop: 0, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                      <div className="stat-item" style={{ background: '#f3f2f1', padding: '10px', borderRadius: '12px', textAlign: 'center', border: '1px solid #e4e2e0' }}>
                        <span className="stat-lbl" style={{ fontSize: '11px', color: '#6f6f6f', display: 'block', textTransform: 'uppercase' }}>Company Size</span>
                        <span className="stat-val" style={{ fontSize: '14px', fontWeight: 'bold', color: 'var(--indeed-text-charcoal)' }}>{selectedCompany.company_size || '10-50 employees'}</span>
                      </div>
                      <div className="stat-item" style={{ background: '#f3f2f1', padding: '10px', borderRadius: '12px', textAlign: 'center', border: '1px solid #e4e2e0' }}>
                        <span className="stat-lbl" style={{ fontSize: '11px', color: '#6f6f6f', display: 'block', textTransform: 'uppercase' }}>Active Postings</span>
                        <span className="stat-val" style={{ fontSize: '14px', fontWeight: 'bold', color: 'var(--indeed-text-charcoal)' }}>{selectedCompany.jobs ? selectedCompany.jobs.length : 0} Jobs</span>
                      </div>
                    </div>

                    {/* Website */}
                    {selectedCompany.website && (
                      <div className="indeed-resume-card" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px', borderRadius: '12px', background: '#f3f2f1', border: '1px solid #e4e2e0' }}>
                        <div style={{ flex: 1 }}>
                          <h4 style={{ fontSize: '12px', margin: 0, color: '#6f6f6f', textTransform: 'uppercase' }}>Official Website</h4>
                          <a href={selectedCompany.website} target="_blank" rel="noreferrer" style={{ fontSize: '13px', color: '#2557a7', fontWeight: 'bold', textDecoration: 'none' }}>
                            {selectedCompany.website}
                          </a>
                        </div>
                        <span style={{ fontSize: '16px' }}>🌐</span>
                      </div>
                    )}

                    {/* Description */}
                    <div>
                      <h4 className="card-inner-title" style={{ fontSize: '14px', marginBottom: '6px', fontWeight: 'bold' }}>About the Company</h4>
                      <div style={{ fontSize: '13px', color: 'var(--indeed-text-charcoal)', lineHeight: 1.5 }}>
                        {selectedCompany.description}
                      </div>
                    </div>

                    {/* Active Jobs Posted */}
                    <div>
                      <h4 className="card-inner-title" style={{ fontSize: '14px', marginBottom: '10px', fontWeight: 'bold' }}>Open Positions</h4>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        {selectedCompany.jobs && selectedCompany.jobs.length > 0 ? (
                          selectedCompany.jobs.map((job: any) => (
                            <div 
                              key={job.id} 
                              className="indeed-glass-card" 
                              onClick={() => {
                                setSelectedJob(job);
                                setSelectedCompany(null);
                              }}
                              style={{ padding: '12px', margin: 0, cursor: 'pointer', background: '#ffffff', border: '1px solid #e4e2e0', borderRadius: '12px' }}
                            >
                              <h5 style={{ fontSize: '14px', fontWeight: 'bold', margin: '0 0 4px 0', color: 'var(--indeed-text-charcoal)' }}>{job.title}</h5>
                              <p style={{ fontSize: '12px', color: '#6f6f6f', margin: '0 0 6px 0' }}>📍 {job.city}, {job.country_name}</p>
                              <div className="perks-pills-wrap" style={{ marginTop: 0 }}>
                                <span className="success-perk-pill" style={{ fontSize: '10px', padding: '2px 6px' }}>✓ {job.job_type || job.type}</span>
                                {job.visa_sponsorship === 1 && (
                                  <span className="success-perk-pill" style={{ fontSize: '10px', padding: '2px 6px' }}>🛂 Visa Sponsored</span>
                                )}
                              </div>
                            </div>
                          ))
                        ) : (
                          <p style={{ fontSize: '12px', color: '#6f6f6f', fontStyle: 'italic', margin: 0 }}>No active open positions at the moment.</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {selectedJob ? (
                /* JOB DETAILS SCREEN */
                <div className="job-details-screen-overlay fade-in" style={{ display: 'flex', flexDirection: 'column', height: '100%', backgroundColor: '#ffffff', position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: 999 }}>
                  {/* Details Header */}
                  <div className="indeed-header" style={{ borderBottom: '1px solid #e4e2e0', padding: '12px 16px', display: 'flex', alignItems: 'center' }}>
                    <button 
                      onClick={() => setSelectedJob(null)} 
                      style={{ background: 'none', border: 'none', fontSize: '15px', color: '#2557a7', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', padding: 0 }}
                    >
                      ← Back
                    </button>
                    <span className="indeed-logo" style={{ fontSize: '18px', marginLeft: '12px' }}>zyan</span>
                    <button 
                      onClick={() => toggleSave(selectedJob.id)} 
                      style={{ background: 'none', border: 'none', cursor: 'pointer', marginLeft: 'auto', padding: 0, display: 'flex', alignItems: 'center' }}
                    >
                      {savedJobIds.includes(selectedJob.id) ? (
                        <Icons.Bookmark size={22} color="#2557a7" filled={true} />
                      ) : (
                        <Icons.Info size={22} color="#4b5563" />
                      )}
                    </button>
                  </div>

                  {/* Details Body (Scrollable) */}
                  <div style={{ flex: 1, overflowY: 'auto', padding: '16px', display: 'flex', flexDirection: 'column', gap: '16px', textAlign: 'left' }}>
                    {errorMessage && (
                      <div className="indeed-error-banner animate-slide-up" style={{
                        backgroundColor: 'rgba(239, 68, 68, 0.1)',
                        border: '1px solid rgba(239, 68, 68, 0.2)',
                        color: '#ef4444',
                        padding: '10px 14px',
                        borderRadius: '12px',
                        fontSize: '12px',
                        fontWeight: 600,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px'
                      }}>
                        <Icons.Error size={14} color="#ef4444" /> {errorMessage}
                      </div>
                    )}
                    {successMessage && (
                      <div className="indeed-success-banner animate-slide-up" style={{
                        backgroundColor: 'rgba(16, 185, 129, 0.1)',
                        border: '1px solid rgba(16, 185, 129, 0.2)',
                        color: '#10b981',
                        padding: '10px 14px',
                        borderRadius: '12px',
                        fontSize: '12px',
                        fontWeight: 600,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px'
                      }}>
                        <Icons.Success size={14} color="#10b981" /> {successMessage}
                      </div>
                    )}
                    
                    {/* Hero Info */}
                    <div style={{ display: 'flex', gap: '12px', alignItems: 'start' }}>
                      <div className="company-logo-box" onClick={() => fetchCompanyDetails(selectedJob.company_slug || 'tokyo-tech-labs')} style={{ backgroundColor: selectedJob.logoBg || '#e2f0fd', width: '52px', height: '52px', fontSize: '20px', borderRadius: '12px', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', color: '#2d2d2d', cursor: 'pointer' }}>
                        {selectedJob.company_logo && (selectedJob.company_logo.startsWith('http://') || selectedJob.company_logo.startsWith('https://')) ? (
                          <img src={selectedJob.company_logo} alt="Logo" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '12px' }} />
                        ) : (
                          selectedJob.logoText || (selectedJob.company_name ? selectedJob.company_name.charAt(0) : 'J')
                        )}
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                        <h2 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--indeed-text-charcoal)', margin: 0, lineHeight: 1.2 }}>{selectedJob.title}</h2>
                        <p style={{ fontSize: '14px', fontWeight: 600, color: '#2557a7', margin: 0, cursor: 'pointer', textDecoration: 'underline' }} onClick={() => fetchCompanyDetails(selectedJob.company_slug || 'tokyo-tech-labs')}>{selectedJob.company_name || selectedJob.company}</p>
                        <p style={{ fontSize: '13px', color: '#6f6f6f', margin: 0, display: 'flex', alignItems: 'center', gap: '4px', flexWrap: 'wrap' }}>
                          <Icons.MapPin size={12} color="#6b7280" style={{ flexShrink: 0 }} />
                          <span style={{ flex: 1, minWidth: 0, whiteSpace: 'normal', wordBreak: 'break-word' }}>
                            {selectedJob.city}, {selectedJob.country_name}
                          </span>
                        </p>
                      </div>
                    </div>

                    <hr className="border-subtle" style={{ margin: '4px 0' }} />

                    {/* Salary & Perks */}
                    <div className="indeed-resume-card" style={{ display: 'flex', flexDirection: 'column', gap: '10px', padding: '14px', borderRadius: '12px', background: '#f3f2f1', border: '1px solid #e4e2e0' }}>
                      <h4 className="card-inner-title" style={{ fontSize: '13px', margin: 0, color: '#2d2d2d', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Salary & Benefits</h4>
                      <div style={{ fontSize: '16px', fontWeight: 800, color: '#10b981', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <Icons.Dollar size={18} color="#10b981" /> {selectedJob.salary_min ? `${selectedJob.currency || 'USD'} ${Number(selectedJob.salary_min).toLocaleString()} - ${Number(selectedJob.salary_max).toLocaleString()} a year` : selectedJob.salary || 'Competitive Salary'}
                      </div>
                      <div className="perks-pills-wrap" style={{ marginTop: '2px' }}>
                        <span className="success-perk-pill" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                          <Icons.Briefcase size={12} color="#2557a7" /> {selectedJob.job_type || selectedJob.type}
                        </span>
                        {selectedJob.visa_sponsorship === 1 && (
                          <span className="success-perk-pill" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                            <Icons.Visa size={12} color="#10b981" /> Visa Sponsored
                          </span>
                        )}
                        {selectedJob.accommodation_provided === 1 && (
                          <span className="success-perk-pill" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                            <Icons.Accommodation size={12} color="#06b6d4" /> Room Provided
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Description */}
                    <div>
                      <h4 className="card-inner-title" style={{ fontSize: '14px', marginBottom: '6px', fontWeight: 'bold' }}>Job Description</h4>
                      <div style={{ fontSize: '13px', color: 'var(--indeed-text-charcoal)', lineHeight: 1.5, whiteSpace: 'pre-line' }}>
                        {selectedJob.description}
                      </div>
                    </div>

                    {/* Skills Required */}
                    {selectedJob.skills_required && (
                      <div style={{ marginBottom: '24px' }}>
                        <h4 className="card-inner-title" style={{ fontSize: '14px', marginBottom: '6px', fontWeight: 'bold' }}>Required Skills</h4>
                        <div className="perks-pills-wrap">
                          {selectedJob.skills_required.split(',').map((skill: string, idx: number) => (
                            <span key={idx} className="success-perk-pill" style={{ background: '#f3f2f1', color: 'var(--indeed-text-charcoal)', border: '1px solid #e4e2e0' }}>
                              {skill.trim()}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Sticky Footer Apply Button */}
                  <div style={{ padding: '12px 16px', borderTop: '1px solid #e4e2e0', backgroundColor: '#ffffff', zIndex: 100 }}>
                    <button
                      onClick={() => {
                        if (!isLoggedIn) {
                          setScreen('auth');
                          setAuthMode('login');
                          setErrorMessage("Please sign in or register to apply for jobs.");
                        } else {
                          handleApply(selectedJob.id);
                        }
                      }}
                      className="indeed-primary-btn-submit"
                      disabled={appliedJobIds.includes(selectedJob.id)}
                      style={{ width: '100%', margin: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}
                    >
                      {appliedJobIds.includes(selectedJob.id) ? (
                        <>
                          <Icons.Success size={16} color="#ffffff" /> Applied
                        </>
                      ) : (
                        'Apply Now'
                      )}
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  {/* TOP HEADER */}
                  <div className="indeed-header">
                    <span className="indeed-logo">zyan</span>
                    <div className="header-right-icons">
                      <span className="bell-icon" onClick={() => setShowNotificationsSheet(true)} style={{ cursor: 'pointer', position: 'relative', display: 'flex', alignItems: 'center' }}>
                        <Icons.Bell size={20} />
                        {notifications.length > 0 && (
                          <span style={{ position: 'absolute', top: '-2px', right: '-2px', width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#ef4444' }} />
                        )}
                      </span>
                      <span className="avatar-icon" onClick={() => setActiveTab('profile')} style={{ cursor: 'pointer' }}><Icons.User size={18} color="#2557a7" /></span>
                    </div>
                  </div>

                  {/* MAIN CONTAINER FOR ACTIVE TABS */}
                  <div className="indeed-main-scrollable">
                    {errorMessage && (
                      <div className="indeed-error-banner animate-slide-up" style={{
                        margin: '10px 16px 0 16px',
                        backgroundColor: 'rgba(239, 68, 68, 0.1)',
                        border: '1px solid rgba(239, 68, 68, 0.2)',
                        color: '#ef4444',
                        padding: '10px 14px',
                        borderRadius: '12px',
                        fontSize: '12px',
                        fontWeight: 600,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px'
                      }}>
                        <Icons.Error size={14} color="#ef4444" /> {errorMessage}
                      </div>
                    )}
                    {successMessage && (
                      <div className="indeed-success-banner animate-slide-up" style={{
                        margin: '10px 16px 0 16px',
                        backgroundColor: 'rgba(16, 185, 129, 0.1)',
                        border: '1px solid rgba(16, 185, 129, 0.2)',
                        color: '#10b981',
                        padding: '10px 14px',
                        borderRadius: '12px',
                        fontSize: '12px',
                        fontWeight: 600,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px'
                      }}>
                        <Icons.Success size={14} color="#10b981" /> {successMessage}
                      </div>
                    )}
                
                {/* TAB 1: HOME SEARCH FEED */}
                {activeTab === 'home' && (
                  <div className="tab-view fade-in">
                    
                    {/* Search Bar Block */}
                    <div className="indeed-search-block">
                      <div className="search-row border-bottom">
                        <span className="search-icon-svg"><Icons.Search size={16} /></span>
                        <input type="text" placeholder="Job title, keywords, or company" className="search-clean-input" />
                      </div>
                      <div className="search-row">
                        <span className="search-icon-svg"><Icons.MapPin size={16} /></span>
                        <input type="text" placeholder="Mumbai, Maharashtra" className="search-clean-input" />
                      </div>
                    </div>

                    {/* Filter Pill Badges with Micro-Interaction Load Simulation */}
                    <div className="filter-pills-row">
                      <button 
                        onClick={() => setShowCountrySheet(true)} 
                        className={`filter-pill-btn ${selectedCountryId !== null ? 'active-filter' : ''}`}
                        style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                      >
                        {selectedCountryId !== null 
                          ? `${countriesList.find(c => c.id === selectedCountryId)?.name || 'Country'} ▾` 
                          : 'Country ▾'}
                      </button>
                      <button 
                        onClick={() => setShowFilterSheet(true)} 
                        className={`filter-pill-btn ${(remoteChecked || hybridChecked) ? 'active-filter' : ''}`}
                      >
                        Remote ▾
                      </button>
                      <button 
                        onClick={() => {
                          setLoadingJobs(true);
                          setVisaFilter(!visaFilter);
                          setTimeout(() => setLoadingJobs(false), 500);
                        }} 
                        className={`filter-pill-btn ${visaFilter ? 'active-filter' : ''}`}
                      >
                        Visa Sponsored
                      </button>
                      <button 
                        onClick={() => {
                          setLoadingJobs(true);
                          setSalaryFilter(!salaryFilter);
                          setTimeout(() => setLoadingJobs(false), 500);
                        }} 
                        className={`filter-pill-btn ${salaryFilter ? 'active-filter' : ''}`}
                      >
                        Salary Estimate
                      </button>
                    </div>

                    <div className="jobs-section-header">
                      <h3 className="section-title-bold">Jobs for you</h3>
                      <p className="section-subtitle-light">Jobs based on your activity on Zyan</p>
                    </div>

                    {/* Job Cards Loop */}
                    <div className="job-cards-feed">
                      {loadingJobs ? (
                        [1, 2, 3].map((n) => (
                          <div key={n} className="skeleton-job-card fade-in">
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                <div className="skeleton-text-title skeleton-shimmer"></div>
                                <div className="skeleton-text-sub skeleton-shimmer" style={{ width: '40%' }}></div>
                                <div className="skeleton-text-sub skeleton-shimmer" style={{ width: '30%', height: '10px' }}></div>
                              </div>
                              <div className="skeleton-circle skeleton-shimmer"></div>
                            </div>
                            <div className="skeleton-text-desc skeleton-shimmer" style={{ height: '18px', width: '35%', borderRadius: '6px' }}></div>
                            <div className="skeleton-badge-wrap">
                              <div className="skeleton-badge skeleton-shimmer"></div>
                              <div className="skeleton-badge skeleton-shimmer" style={{ width: '80px' }}></div>
                            </div>
                          </div>
                        ))
                      ) : filteredJobs.length === 0 ? (
                        <div className="empty-state-card" style={{ padding: '24px', background: 'var(--glass-bg)', border: '1px solid var(--glass-border)', borderRadius: '20px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                          <Icons.Folder size={36} color="#9ca3af" />
                          <p style={{ fontSize: '13px', color: '#6f6f6f', margin: '4px 0 0 0' }}>No relocation openings match the current filters.</p>
                        </div>
                      ) : (
                        filteredJobs.map((job) => (
                          <div key={job.id} className="indeed-glass-card cursor-pointer" onClick={() => setSelectedJob(job)}>
                            {job.is_featured === 1 && (
                              <span className="urgently-badge">Featured Job</span>
                            )}

                            <div className="card-header-row">
                              <div className="card-title-block">
                                <h4 className="job-card-title">{job.title}</h4>
                                
                                <div className="company-rating-row">
                                  <span className="company-name-text" onClick={(e) => { e.stopPropagation(); fetchCompanyDetails(job.company_slug || 'tokyo-tech-labs'); }} style={{ cursor: 'pointer', textDecoration: 'underline' }}>{job.company_name || job.company}</span>
                                  <span className="rating-star-badge">{job.rating || '4.0'} ★</span>
                                </div>
                                
                                <p className="location-text" style={{ display: 'flex', alignItems: 'center', gap: '4px', flexWrap: 'wrap' }}>
                                  <Icons.MapPin size={12} color="#6b7280" style={{ flexShrink: 0 }} />
                                  <span style={{ flex: 1, minWidth: 0, whiteSpace: 'normal', wordBreak: 'break-word' }}>
                                    {job.city}, {job.country_name}
                                  </span>
                                </p>
                              </div>

                              {/* Company Visual Logo Box */}
                              <div className="company-logo-box" onClick={(e) => { e.stopPropagation(); fetchCompanyDetails(job.company_slug || 'tokyo-tech-labs'); }} style={{ backgroundColor: job.logoBg || '#e2f0fd', cursor: 'pointer' }}>
                                {job.company_logo && (job.company_logo.startsWith('http://') || job.company_logo.startsWith('https://')) ? (
                                  <img src={job.company_logo} alt="Logo" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '12px' }} />
                                ) : (
                                  job.logoText || (job.company_name ? job.company_name.charAt(0) : 'J')
                                )}
                              </div>

                              {/* Bookmark & Dislike Column */}
                              <div className="bookmark-dislike-col">
                                <button onClick={(e) => { e.stopPropagation(); toggleSave(job.id); }} className="action-circle-btn">
                                  {savedJobIds.includes(job.id) ? (
                                    <Icons.Bookmark size={15} color="#2557a7" filled={true} />
                                  ) : (
                                    <Icons.Bookmark size={15} color="#4b5563" />
                                  )}
                                </button>
                                <button className="action-circle-btn text-muted" onClick={(e) => e.stopPropagation()}>
                                  <Icons.Dislike size={14} color="#6b7280" />
                                </button>
                              </div>
                            </div>

                            {/* Responds speed row */}
                            <div className="responds-speed-badge" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                              <Icons.Bolt size={12} color="#f59e0b" /> {job.responds || 'Typically responds within 2 days'}
                            </div>

                            {/* Perks Pill Container */}
                            <div className="perks-pills-wrap">
                              <span className="success-perk-pill">✓ {job.job_type || job.type}</span>
                              <span className="success-perk-pill" style={{ textTransform: 'capitalize' }}>
                                {job.salary_min ? `${job.currency || 'USD'} ${Number(job.salary_min).toLocaleString()} - ${Number(job.salary_max).toLocaleString()}` : job.salary || 'Competitive Salary'} ✓
                              </span>
                            </div>

                            {/* Easily Apply footer */}
                            <div className="easily-apply-footer">
                              <button 
                                onClick={(e) => { e.stopPropagation(); handleApply(job.id); }}
                                className="easily-apply-btn"
                                disabled={appliedJobIds.includes(job.id)}
                                style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                              >
                                {appliedJobIds.includes(job.id) ? (
                                  <>
                                    <Icons.Success size={12} color="#10b981" /> Applied
                                  </>
                                ) : (
                                  <>
                                    <Icons.Send size={12} color="#2557a7" /> Easily apply
                                  </>
                                )}
                              </button>
                            </div>

                          </div>
                        ))
                      )}
                    </div>

                  </div>
                )}

                {/* TAB 2: MY JOBS */}
                {activeTab === 'myjobs' && (
                  <div className="tab-view fade-in">
                    <h3 className="tab-heading-bold" style={{ marginBottom: '12px' }}>My Jobs</h3>
                    
                    {/* Mini sub-tabs */}
                    <div className="profile-mini-tabs-bar" style={{ marginBottom: '16px', display: 'flex', padding: '0 16px' }}>
                      <button 
                        onClick={() => setMyJobsSubTab('applied')}
                        className={`mini-tab-btn ${myJobsSubTab === 'applied' ? 'active-mini-tab' : ''}`}
                        style={{ flex: 1, padding: '10px 0', fontSize: '13px', fontWeight: 'bold' }}
                      >
                        Applied ({isLoggedIn ? userApplications.length : appliedJobIds.length})
                      </button>
                      <button 
                        onClick={() => setMyJobsSubTab('saved')}
                        className={`mini-tab-btn ${myJobsSubTab === 'saved' ? 'active-mini-tab' : ''}`}
                        style={{ flex: 1, padding: '10px 0', fontSize: '13px', fontWeight: 'bold' }}
                      >
                        Saved ({isLoggedIn ? userSavedJobs.length : savedJobIds.length})
                      </button>
                    </div>

                    {myJobsSubTab === 'applied' ? (
                      <div className="tracker-cards-container" style={{ display: 'flex', flexDirection: 'column', gap: '12px', padding: '0 16px' }}>
                        {isLoggedIn && userApplications.length > 0 ? (
                          userApplications.map(app => (
                            <div key={app.id} className="tracker-status-card" style={{ padding: '16px', borderRadius: '12px', border: '1px solid #e4e2e0', backgroundColor: '#ffffff', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.03)', display: 'flex', flexDirection: 'column', gap: '10px', textAlign: 'left' }}>
                              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <span 
                                  style={{ 
                                    textTransform: 'capitalize', 
                                    fontSize: '11px', 
                                    fontWeight: 'bold', 
                                    padding: '4px 10px', 
                                    borderRadius: '100px', 
                                    backgroundColor: 
                                      app.status === 'accepted' ? 'rgba(16, 185, 129, 0.1)' :
                                      app.status === 'rejected' ? 'rgba(239, 68, 68, 0.1)' :
                                      app.status === 'interviewing' ? 'rgba(245, 158, 11, 0.1)' :
                                      app.status === 'shortlisted' ? 'rgba(139, 92, 246, 0.1)' : 'rgba(37, 87, 167, 0.1)',
                                    color: 
                                      app.status === 'accepted' ? '#10b981' :
                                      app.status === 'rejected' ? '#ef4444' :
                                      app.status === 'interviewing' ? '#f59e0b' :
                                      app.status === 'shortlisted' ? '#8b5cf6' : '#2557a7',
                                    border: '1px solid currentColor'
                                  }}
                                >
                                  {app.status || 'applied'}
                                </span>
                                <button 
                                  onClick={() => handleWithdrawApplication(app.id)}
                                  style={{
                                    border: 'none',
                                    background: 'none',
                                    color: '#ef4444',
                                    fontSize: '12px',
                                    fontWeight: 'bold',
                                    cursor: 'pointer',
                                    padding: '4px'
                                  }}
                                >
                                  Withdraw
                                </button>
                              </div>
                              
                              <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                                <div style={{ width: '40px', height: '40px', borderRadius: '8px', backgroundColor: '#e2f0fd', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', color: '#2557a7', fontSize: '16px' }}>
                                  {app.company_logo && (app.company_logo.startsWith('http://') || app.company_logo.startsWith('https://')) ? (
                                    <img src={app.company_logo} alt="Logo" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '8px' }} />
                                  ) : (
                                    app.company_logo || (app.company_name ? app.company_name.charAt(0) : 'J')
                                  )}
                                </div>
                                <div style={{ flex: 1 }}>
                                  <h4 className="job-card-title" style={{ margin: 0, fontSize: '14px', color: 'var(--indeed-text-charcoal)', fontWeight: 'bold' }}>{app.job_title}</h4>
                                  <p className="company-name-text" style={{ margin: '2px 0 0 0', fontSize: '12px', color: '#595959' }}>{app.company_name}</p>
                                </div>
                              </div>

                              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '11px', color: '#8f8f8f', borderTop: '1px solid #f3f2f1', paddingTop: '8px', marginTop: '4px' }}>
                                <span>📍 {app.job_city || 'Relocating'}{app.country_name ? `, ${app.country_name}` : ''}</span>
                                <span>Applied {new Date(app.created_at).toLocaleDateString('en-US', { day: 'numeric', month: 'short' })}</span>
                              </div>

                              {/* Sleek Candidate Progress Tracker Stepper (Employee View!) */}
                              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '12px', padding: '0 4px', position: 'relative' }}>
                                {/* Horizontal connecting lines */}
                                <div style={{ position: 'absolute', top: '10px', left: '16px', right: '16px', height: '2px', backgroundColor: '#e4e2e0', zIndex: 0 }} />
                                <div style={{ 
                                  position: 'absolute', 
                                  top: '10px', 
                                  left: '16px', 
                                  width: 
                                    app.status === 'accepted' || app.status === 'rejected' ? 'calc(100% - 32px)' :
                                    app.status === 'interviewing' ? '66%' :
                                    app.status === 'shortlisted' ? '33%' : '0%', 
                                  height: '2px', 
                                  backgroundColor: app.status === 'rejected' ? '#ef4444' : '#10b981', 
                                  zIndex: 0,
                                  transition: 'width 0.3s ease'
                                }} />

                                {/* Step 1: Applied */}
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 1 }}>
                                  <div style={{ width: '20px', height: '20px', borderRadius: '50%', backgroundColor: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ffffff', fontSize: '9px', fontWeight: 'bold' }}>✓</div>
                                  <span style={{ fontSize: '9px', color: '#10b981', fontWeight: 'bold', marginTop: '4px' }}>Applied</span>
                                </div>

                                {/* Step 2: Under Review */}
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 1 }}>
                                  <div style={{ 
                                    width: '20px', 
                                    height: '20px', 
                                    borderRadius: '50%', 
                                    backgroundColor: ['shortlisted', 'interviewing', 'accepted', 'rejected'].includes(app.status) ? '#10b981' : '#ffffff', 
                                    border: ['shortlisted', 'interviewing', 'accepted', 'rejected'].includes(app.status) ? 'none' : '2px solid #d1cfcd',
                                    display: 'flex', 
                                    alignItems: 'center', 
                                    justifyContent: 'center', 
                                    color: '#ffffff', 
                                    fontSize: '9px', 
                                    fontWeight: 'bold' 
                                  }}>
                                    {['shortlisted', 'interviewing', 'accepted', 'rejected'].includes(app.status) ? '✓' : '2'}
                                  </div>
                                  <span style={{ fontSize: '9px', color: ['shortlisted', 'interviewing', 'accepted', 'rejected'].includes(app.status) ? '#10b981' : '#8f8f8f', fontWeight: ['shortlisted', 'interviewing', 'accepted', 'rejected'].includes(app.status) ? 'bold' : 'normal', marginTop: '4px' }}>Review</span>
                                </div>

                                {/* Step 3: Interview */}
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 1 }}>
                                  <div style={{ 
                                    width: '20px', 
                                    height: '20px', 
                                    borderRadius: '50%', 
                                    backgroundColor: ['interviewing', 'accepted', 'rejected'].includes(app.status) ? '#10b981' : '#ffffff', 
                                    border: ['interviewing', 'accepted', 'rejected'].includes(app.status) ? 'none' : '2px solid #d1cfcd',
                                    display: 'flex', 
                                    alignItems: 'center', 
                                    justifyContent: 'center', 
                                    color: '#ffffff', 
                                    fontSize: '9px', 
                                    fontWeight: 'bold' 
                                  }}>
                                    {['interviewing', 'accepted', 'rejected'].includes(app.status) ? '✓' : '3'}
                                  </div>
                                  <span style={{ fontSize: '9px', color: ['interviewing', 'accepted', 'rejected'].includes(app.status) ? '#10b981' : '#8f8f8f', fontWeight: ['interviewing', 'accepted', 'rejected'].includes(app.status) ? 'bold' : 'normal', marginTop: '4px' }}>Interview</span>
                                </div>

                                {/* Step 4: Decision */}
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 1 }}>
                                  <div style={{ 
                                    width: '20px', 
                                    height: '20px', 
                                    borderRadius: '50%', 
                                    backgroundColor: app.status === 'accepted' ? '#10b981' : app.status === 'rejected' ? '#ef4444' : '#ffffff', 
                                    border: ['accepted', 'rejected'].includes(app.status) ? 'none' : '2px solid #d1cfcd',
                                    display: 'flex', 
                                    alignItems: 'center', 
                                    justifyContent: 'center', 
                                    color: '#ffffff', 
                                    fontSize: '9px', 
                                    fontWeight: 'bold' 
                                  }}>
                                    {app.status === 'accepted' ? '✓' : app.status === 'rejected' ? '✕' : '4'}
                                  </div>
                                  <span style={{ 
                                    fontSize: '9px', 
                                    color: app.status === 'accepted' ? '#10b981' : app.status === 'rejected' ? '#ef4444' : '#8f8f8f', 
                                    fontWeight: ['accepted', 'rejected'].includes(app.status) ? 'bold' : 'normal', 
                                    marginTop: '4px' 
                                  }}>
                                    {app.status === 'accepted' ? 'Hired' : app.status === 'rejected' ? 'Declined' : 'Decision'}
                                  </span>
                                </div>
                              </div>
                            </div>
                          ))
                        ) : (
                          jobs.filter(j => appliedJobIds.includes(j.id)).map(job => (
                            <div key={job.id} className="tracker-status-card" style={{ padding: '16px', borderRadius: '12px', border: '1px solid #e4e2e0', backgroundColor: '#ffffff', display: 'flex', flexDirection: 'column', gap: '8px', textAlign: 'left' }}>
                              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <span className="applied-pill-badge" style={{ backgroundColor: 'rgba(37, 87, 167, 0.1)', color: '#2557a7', border: '1px solid #2557a7', padding: '2px 8px', borderRadius: '100px', fontSize: '11px', fontWeight: 'bold' }}>Applied</span>
                                <span style={{ fontSize: '11px', color: '#8f8f8f' }}>Offline Mode</span>
                              </div>
                              <h4 className="job-card-title" style={{ margin: 0, fontSize: '14px', fontWeight: 'bold' }}>{job.title}</h4>
                              <p className="company-name-text" style={{ margin: '2px 0 0 0', fontSize: '13px', color: '#595959' }}>{job.company_name || job.company}</p>
                              <p className="location-text" style={{ margin: '2px 0 0 0', fontSize: '12px', color: '#8f8f8f' }}>📍 {job.city ? `${job.city}, ${job.country_name || 'Relocating'}` : job.location}</p>
                            </div>
                          ))
                        )}

                        {(!isLoggedIn || (userApplications.length === 0 && jobs.filter(j => appliedJobIds.includes(j.id)).length === 0)) && (
                          <div className="empty-state-card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', padding: '24px' }}>
                            <Icons.Folder size={36} color="#9ca3af" />
                            <p style={{ fontSize: '13px', color: '#6f6f6f' }}>No active applications yet. Start applying to jobs!</p>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="tracker-cards-container" style={{ display: 'flex', flexDirection: 'column', gap: '12px', padding: '0 16px' }}>
                        {isLoggedIn && userSavedJobs.length > 0 ? (
                          userSavedJobs.map(job => (
                            <div key={job.save_id} className="tracker-status-card" style={{ padding: '16px', borderRadius: '12px', border: '1px solid #e4e2e0', backgroundColor: '#ffffff', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.03)', display: 'flex', flexDirection: 'column', gap: '10px', textAlign: 'left' }}>
                              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <span className="applied-pill-badge" style={{ backgroundColor: 'rgba(245, 158, 11, 0.1)', color: '#f59e0b', border: '1px solid #f59e0b', padding: '2px 8px', borderRadius: '100px', fontSize: '10px', fontWeight: 'bold' }}>⭐ Saved</span>
                                <button 
                                  onClick={() => toggleSave(job.id)}
                                  style={{
                                    border: 'none',
                                    background: 'none',
                                    color: '#ef4444',
                                    fontSize: '12px',
                                    fontWeight: 'bold',
                                    cursor: 'pointer',
                                    padding: '4px'
                                  }}
                                >
                                  Remove
                                </button>
                              </div>
                              
                              <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                                <div style={{ width: '40px', height: '40px', borderRadius: '8px', backgroundColor: '#fffbeb', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', color: '#d97706', fontSize: '16px' }}>
                                  {job.company_logo && (job.company_logo.startsWith('http://') || job.company_logo.startsWith('https://')) ? (
                                    <img src={job.company_logo} alt="Logo" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '8px' }} />
                                  ) : (
                                    job.company_logo || job.logoText || (job.company_name ? job.company_name.charAt(0) : 'J')
                                  )}
                                </div>
                                <div style={{ flex: 1 }}>
                                  <h4 className="job-card-title" style={{ margin: 0, fontSize: '14px', color: 'var(--indeed-text-charcoal)', fontWeight: 'bold' }}>{job.title}</h4>
                                  <p className="company-name-text" style={{ margin: '2px 0 0 0', fontSize: '12px', color: '#595959' }}>{job.company_name}</p>
                                </div>
                              </div>

                              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '11px', color: '#8f8f8f', borderTop: '1px solid #f3f2f1', paddingTop: '8px', marginTop: '4px' }}>
                                <span>📍 {job.city || 'Relocating'}</span>
                                <span>💵 {job.salary_min ? `${job.currency || 'USD'} ${Number(job.salary_min).toLocaleString()}` : 'Competitive Salary'}</span>
                              </div>

                              <div style={{ display: 'flex', gap: '8px', marginTop: '4px' }}>
                                <button
                                  onClick={async () => {
                                    const token = authToken || localStorage.getItem('token');
                                    if (!token) return;
                                    try {
                                      const applyRes = await fetch(API_BASE_URL + '/api/v1/jobs/apply', {
                                        method: 'POST',
                                        headers: {
                                          'Content-Type': 'application/json',
                                          'Authorization': `Bearer ${token}`
                                        },
                                        body: JSON.stringify({ job_id: job.id, cover_letter: coverLetter })
                                      });
                                      const applyData = await applyRes.json();
                                      if (applyData.success) {
                                        setSuccessMessage("Applied successfully directly from saved list!");
                                        fetchApplications(token);
                                        setMyJobsSubTab('applied');
                                      } else {
                                        setErrorMessage(applyData.message || "Failed to apply.");
                                      }
                                    } catch (e) {
                                      setErrorMessage("Failed to apply for job.");
                                    }
                                  }}
                                  disabled={appliedJobIds.includes(job.id)}
                                  style={{
                                    flex: 1,
                                    padding: '8px 12px',
                                    borderRadius: '8px',
                                    border: 'none',
                                    background: appliedJobIds.includes(job.id) ? '#e4e2e0' : 'linear-gradient(135deg, #2557a7, #144492)',
                                    color: appliedJobIds.includes(job.id) ? '#9f9f9f' : '#ffffff',
                                    fontSize: '12px',
                                    fontWeight: 'bold',
                                    cursor: appliedJobIds.includes(job.id) ? 'not-allowed' : 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '4px'
                                  }}
                                >
                                  {appliedJobIds.includes(job.id) ? '✓ Applied' : '⚡ Apply Now'}
                                </button>
                              </div>
                            </div>
                          ))
                        ) : (
                          jobs.filter(j => savedJobIds.includes(j.id)).map(job => (
                            <div key={job.id} className="tracker-status-card" style={{ padding: '16px', borderRadius: '12px', border: '1px solid #e4e2e0', backgroundColor: '#ffffff', display: 'flex', flexDirection: 'column', gap: '8px', textAlign: 'left' }}>
                              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <span style={{ backgroundColor: 'rgba(245, 158, 11, 0.1)', color: '#f59e0b', border: '1px solid #f59e0b', padding: '2px 8px', borderRadius: '100px', fontSize: '11px', fontWeight: 'bold' }}>⭐ Saved</span>
                                <button onClick={() => toggleSave(job.id)} style={{ border: 'none', background: 'none', color: '#ef4444', fontSize: '11px', cursor: 'pointer' }}>Remove</button>
                              </div>
                              <h4 className="job-card-title" style={{ margin: 0, fontSize: '14px', fontWeight: 'bold' }}>{job.title}</h4>
                              <p className="company-name-text" style={{ margin: '2px 0 0 0', fontSize: '13px', color: '#595959' }}>{job.company_name || job.company}</p>
                            </div>
                          ))
                        )}

                        {(!isLoggedIn || (userSavedJobs.length === 0 && jobs.filter(j => savedJobIds.includes(j.id)).length === 0)) && (
                          <div className="empty-state-card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', padding: '24px' }}>
                            <Icons.Bookmark size={36} color="#9ca3af" />
                            <p style={{ fontSize: '13px', color: '#6f6f6f' }}>No saved jobs yet. Bookmark jobs to save them!</p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}

                {/* TAB 3: MESSAGES / CHATS */}
                {activeTab === 'messages' && (
                  <div className="tab-view fade-in" style={{ padding: activeChat ? '0' : '0 0 16px 0', height: '100%', display: 'flex', flexDirection: 'column' }}>
                    {activeChat ? (
                      /* CHAT WINDOW WINDOW */
                      <div className="chat-window-container" style={{ display: 'flex', flexDirection: 'column', height: '420px', background: '#f4f2ee', position: 'relative', borderRadius: '12px', overflow: 'hidden', border: '1px solid #cbd2d6' }}>
                        {/* Header */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '12px 16px', background: '#ffffff', borderBottom: '1px solid #e4e2e0', position: 'sticky', top: 0, zIndex: 10 }}>
                          <button 
                            type="button"
                            onClick={() => {
                              setActiveChat(null);
                              setChatMessages([]);
                            }}
                            style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '18px', color: '#2557a7', padding: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}
                          >
                            ← Back
                          </button>
                          
                          <div style={{ display: 'flex', flexDirection: 'column', minWidth: 0, textAlign: 'left', flex: 1 }}>
                            <strong style={{ fontSize: '14px', color: 'var(--indeed-text-charcoal)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                              {activeChat.companyName}
                            </strong>
                            <span style={{ fontSize: '11px', color: '#2557a7', fontWeight: 'bold', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                              {activeChat.jobTitle}
                            </span>
                          </div>
                        </div>

                        {/* Scrollable Message List */}
                        <div style={{ flex: 1, overflowY: 'auto', padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                          {loadingChat ? (
                            <div style={{ display: 'flex', justifyContent: 'center', padding: '20px' }}>
                              <div style={{ width: '20px', height: '20px', border: '2px solid #2557a7', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
                            </div>
                          ) : (
                            chatMessages.map((cMsg: any) => {
                              const isSelf = cMsg.sender_id === currentUserId;
                              return (
                                <div 
                                  key={cMsg.id} 
                                  style={{ 
                                    alignSelf: isSelf ? 'flex-end' : 'flex-start',
                                    maxWidth: '85%',
                                    background: isSelf ? '#2557a7' : '#ffffff',
                                    color: isSelf ? '#ffffff' : '#2d2d2d',
                                    padding: '10px 14px',
                                    borderRadius: isSelf ? '16px 16px 2px 16px' : '16px 16px 16px 2px',
                                    boxShadow: '0 1px 2px rgba(0, 0, 0, 0.08)',
                                    textAlign: 'left',
                                    fontSize: '13px',
                                    lineHeight: '1.4'
                                  }}
                                >
                                  <p style={{ margin: 0, wordBreak: 'break-word' }}>{cMsg.message_text}</p>
                                  <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '4px' }}>
                                    <span style={{ fontSize: '9px', color: isSelf ? '#cbdffa' : '#7f7f7f' }}>
                                      {new Date(cMsg.created_at).toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })}
                                    </span>
                                  </div>
                                </div>
                              );
                            })
                          )}
                          {chatMessages.length === 0 && !loadingChat && (
                            <div style={{ color: '#6f6f6f', fontSize: '12px', fontStyle: 'italic', textAlign: 'center', marginTop: '20px' }}>
                              No messages in this conversation.
                            </div>
                          )}
                        </div>

                        {/* Reply input footer */}
                        <div style={{ padding: '10px 12px', background: '#ffffff', borderTop: '1px solid #e4e2e0', display: 'flex', gap: '8px', alignItems: 'center' }}>
                          <input 
                            type="text" 
                            placeholder="Type a message..."
                            value={chatReplyText}
                            onChange={(e) => setChatReplyText(e.target.value)}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') {
                                handleSendChatReply();
                              }
                            }}
                            style={{ 
                              flex: 1, 
                              border: '1px solid #cbd2d6', 
                              borderRadius: '20px', 
                              padding: '8px 16px', 
                              fontSize: '13px', 
                              outline: 'none', 
                              background: '#f4f2ee' 
                            }}
                          />
                          <button 
                            type="button"
                            onClick={handleSendChatReply}
                            disabled={!chatReplyText.trim()}
                            style={{ 
                              background: '#2557a7', 
                              color: '#ffffff', 
                              border: 'none', 
                              borderRadius: '20px', 
                              padding: '8px 16px', 
                              fontSize: '12px', 
                              fontWeight: 'bold', 
                              cursor: chatReplyText.trim() ? 'pointer' : 'default', 
                              opacity: chatReplyText.trim() ? 1 : 0.6 
                            }}
                          >
                            Send
                          </button>
                        </div>
                      </div>
                    ) : (
                      /* ORIGINAL MESSAGES LIST */
                      <>
                        <div className="tracker-cards-container" style={{ display: 'flex', flexDirection: 'column', gap: '12px', padding: '0 16px' }}>
                          {isLoggedIn ? (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                              {userMessages.map((msg: any) => {
                                const isUrl = msg.company_logo && (msg.company_logo.startsWith('http://') || msg.company_logo.startsWith('https://'));
                                const initials = (msg.company_name || 'CO').split(' ').map((n: string) => n[0]).join('').slice(0, 3).toUpperCase();
                                
                                return (
                                  <div 
                                    key={msg.id}
                                    className="indeed-resume-card" 
                                    onClick={() => {
                                      const otherId = msg.sender_id === currentUserId ? msg.receiver_id : msg.sender_id;
                                      setActiveChat({
                                        jobId: msg.job_id,
                                        otherUserId: otherId,
                                        jobTitle: msg.job_title,
                                        companyName: msg.company_name,
                                        companyLogo: msg.company_logo
                                      });
                                      fetchChatThread(msg.job_id, otherId);
                                    }}
                                    style={{ 
                                      display: 'flex', 
                                      gap: '12px', 
                                      padding: '14px', 
                                      alignItems: 'center', 
                                      background: '#ffffff', 
                                      border: '1px solid #e4e2e0',
                                      borderRadius: '12px',
                                      textAlign: 'left',
                                      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.02)',
                                      cursor: 'pointer'
                                    }}
                                  >
                                    <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#e2f0fd', display: 'flex', alignItems: 'center', justifyCenter: 'center', fontWeight: 'bold', color: '#2557a7', fontSize: '14px', flexShrink: 0, overflow: 'hidden' }}>
                                      {isUrl ? (
                                        <img src={msg.company_logo} alt="Logo" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                      ) : (
                                        msg.company_logo && msg.company_logo.length <= 2 ? msg.company_logo : initials
                                      )}
                                    </div>
                                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '2px', minWidth: 0 }}>
                                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <strong style={{ fontSize: '13px', color: 'var(--indeed-text-charcoal)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{msg.company_name}</strong>
                                        <span style={{ fontSize: '10px', color: '#9f9f9f' }}>
                                          {msg.created_at && msg.created_at.includes('T') ? new Date(msg.created_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric' }) : 'Just now'}
                                        </span>
                                      </div>
                                      <span style={{ fontSize: '11px', color: '#2557a7', fontWeight: 'bold' }}>{msg.job_title}</span>
                                      <p style={{ fontSize: '12px', color: '#2d2d2d', margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontWeight: '500' }}>
                                        {msg.message_text}
                                      </p>
                                    </div>
                                  </div>
                                );
                              })}
                              
                              {userMessages.length === 0 && (
                                <div className="empty-state-card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', padding: '24px' }}>
                                  <Icons.ChatBubble size={36} color="#9ca3af" />
                                  <p style={{ fontSize: '13px', color: '#6f6f6f' }}>No messages received yet.</p>
                                </div>
                              )}
                            </div>
                          ) : (
                            <div className="empty-state-card" style={{ width: '100%', margin: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', padding: '24px' }}>
                              <Icons.ChatBubble size={36} color="#9ca3af" />
                              <p style={{ fontSize: '13px', color: '#6f6f6f' }}>Please login to view your recruiter chat messages.</p>
                            </div>
                          )}
                        </div>
                      </>
                    )}
                  </div>
                )}

                {/* TAB 4: PROFILE */}
                {activeTab === 'profile' && (
                  <div className="tab-view fade-in">
                    {!isLoggedIn ? (
                      <div className="profile-logged-out-view" style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: '65vh',
                        padding: '24px',
                        textAlign: 'center',
                        gap: '16px'
                      }}>
                        <span style={{ marginBottom: '8px', color: '#9ca3af' }}><Icons.User size={64} /></span>
                        <h3 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--indeed-text-charcoal)' }}>Create a profile to find your dream job</h3>
                        <p style={{ fontSize: '13px', color: '#6f6f6f', lineHeight: 1.5, maxWidth: '280px' }}>
                          Upload your resume, search for international relocations, and track all your job applications in one place.
                        </p>
                        <button 
                          onClick={() => { setScreen('auth'); setAuthMode('login'); }}
                          className="indeed-primary-btn-submit"
                          style={{ width: '100%', maxWidth: '240px', marginTop: '12px' }}
                        >
                          Sign In or Register
                        </button>
                      </div>
                    ) : (
                      <>
                    
                    {/* Curve Wave banner background */}
                    <div className="profile-banner-wave">
                      <div className="wave-curve-graphic"></div>
                      
                      {/* Avatar centered */}
                      <input 
                        type="file" 
                        id="avatar-file-input" 
                        accept="image/*" 
                        style={{ display: 'none' }} 
                        onChange={handleAvatarChange} 
                      />
                      <div 
                        className="avatar-uploader-circle cursor-pointer" 
                        onClick={() => document.getElementById('avatar-file-input')?.click()}
                      >
                        {profilePicture ? (
                          <img 
                            src={profilePicture.startsWith('data:') || profilePicture.startsWith('blob:') ? profilePicture : `${API_BASE_URL}${profilePicture}`} 
                            alt="Avatar" 
                            style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }} 
                          />
                        ) : (
                          <span className="profile-emoji-avatar" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Icons.User size={40} color="#000000" />
                          </span>
                        )}
                        <button className="camera-overlay-badge" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 0 }}><Icons.Camera size={12} color="#ffffff" /></button>
                      </div>
                    </div>

                    <div className="profile-details-center">
                      <h3 className="profile-display-name">{name || 'Gaurav Yadav'}</h3>
                      <p className="profile-sub-email">{email || 'gaurav.yadav@zyanmail.com'}</p>
                      <p className="profile-sub-phone">{experienceYears} Years Exp • Relocating to {targetCountry}</p>
                      <p className="profile-sub-location" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}>
                        <Icons.MapPin size={12} color="#6b7280" /> {currentCity}, India
                      </p>

                      <button 
                        onClick={() => setShowEmployerFindSheet(true)}
                        className="employers-find-badge" 
                        style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                      >
                        <Icons.Eye size={12} color="#ffffff" /> 
                        {employerFindMode === 'public' ? 'Employers can find you (Public)' : 
                         employerFindMode === 'limited' ? 'Only verified employers (Limited)' : 
                         'Private - Only applied jobs (Hidden)'} ▾
                      </button>
                    </div>

                    {/* Profile mini tabs */}
                    <div className="profile-mini-tabs-bar">
                      <button 
                        onClick={() => setProfileSubTab('profile')}
                        className={`mini-tab-btn ${profileSubTab === 'profile' ? 'active-mini-tab' : ''}`}
                      >
                        Profile
                      </button>
                      <button 
                        onClick={() => setProfileSubTab('preferences')}
                        className={`mini-tab-btn ${profileSubTab === 'preferences' ? 'active-mini-tab' : ''}`}
                      >
                        Preferences
                      </button>
                      <button 
                        onClick={() => setProfileSubTab('resume')}
                        className={`mini-tab-btn ${profileSubTab === 'resume' ? 'active-mini-tab' : ''}`}
                      >
                        Resume
                      </button>
                    </div>

                    <div className="profile-sub-content">
                      {profileSubTab === 'profile' && (
                        <div className="indeed-resume-card flex-col-layout gap-4">
                          
                          {/* Applications Count Statistics */}
                          <div className="profile-stats-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', borderTop: 'none', marginTop: 0, paddingTop: 0 }}>
                            <div className="stat-item" style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '14px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.015)', transition: 'all 0.2s ease', cursor: 'pointer' }}>
                              <div style={{ background: '#000000', width: '36px', height: '36px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                <Icons.Briefcase size={16} color="#ffffff" />
                              </div>
                              <span className="stat-val" style={{ fontSize: '20px', fontWeight: 800, color: '#000000', margin: 0 }}>{Math.max(applicationsCount, appliedJobIds.length)}</span>
                              <span className="stat-lbl" style={{ fontSize: '10px', fontWeight: 800, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Applied</span>
                            </div>
                            <div className="stat-item" style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '14px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.015)', transition: 'all 0.2s ease', cursor: 'pointer' }}>
                              <div style={{ background: '#000000', width: '36px', height: '36px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                <Icons.Bookmark size={16} color="#ffffff" filled={true} />
                              </div>
                              <span className="stat-val" style={{ fontSize: '20px', fontWeight: 800, color: '#000000', margin: 0 }}>{savedJobIds.length}</span>
                              <span className="stat-lbl" style={{ fontSize: '10px', fontWeight: 800, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Bookmarked</span>
                            </div>
                          </div>

                          <hr className="border-subtle" style={{ margin: 0, border: '0.5px solid #e2e8f0' }} />

                          {isEditingProfile ? (
                            /* EDIT MODE INPUTS */
                            <div className="flex-col-layout gap-3 text-left">
                              <h4 className="card-inner-title" style={{ fontSize: '15px', color: '#000000', margin: 0 }}>Edit Profile Details</h4>
                              
                              <div className="mob-input-wrap-premium" style={{ marginBottom: '8px' }}>
                                <label className="input-label-premium" style={{ fontSize: '11px', fontWeight: 'bold' }}>Current City *</label>
                                <input 
                                  type="text" 
                                  value={currentCity}
                                  onChange={(e) => setCurrentCity(e.target.value)}
                                  className="mob-input-field-premium"
                                  style={{ padding: '8px 10px', height: '36px' }}
                                />
                              </div>

                              <div className="mob-input-wrap-premium" style={{ marginBottom: '8px' }}>
                                <label className="input-label-premium" style={{ fontSize: '11px', fontWeight: 'bold' }}>Relocation Target Country *</label>
                                <select 
                                  value={targetCountry}
                                  onChange={(e) => setTargetCountry(e.target.value)}
                                  className="mob-input-field-premium"
                                  style={{ padding: '8px 10px', height: '36px' }}
                                >
                                  <option value="Japan">Japan</option>
                                  <option value="United Kingdom">United Kingdom</option>
                                  <option value="Germany">Germany</option>
                                  <option value="Canada">Canada</option>
                                </select>
                              </div>

                              <div className="mob-input-wrap-premium" style={{ marginBottom: '8px' }}>
                                <label className="input-label-premium" style={{ fontSize: '11px', fontWeight: 'bold' }}>Experience Years *</label>
                                <input 
                                  type="number" 
                                  value={experienceYears}
                                  onChange={(e) => setExperienceYears(e.target.value)}
                                  className="mob-input-field-premium"
                                  style={{ padding: '8px 10px', height: '36px' }}
                                />
                              </div>

                              <div className="mob-input-wrap-premium" style={{ marginBottom: '8px' }}>
                                <label className="input-label-premium" style={{ fontSize: '11px', fontWeight: 'bold' }}>Primary Skills (comma-separated) *</label>
                                <input 
                                  type="text" 
                                  value={primarySkills}
                                  onChange={(e) => setPrimarySkills(e.target.value)}
                                  className="mob-input-field-premium"
                                  style={{ padding: '8px 10px', height: '36px' }}
                                />
                              </div>

                              <div className="mob-input-wrap-premium" style={{ marginBottom: '8px' }}>
                                <label className="input-label-premium" style={{ fontSize: '11px', fontWeight: 'bold' }}>Previous Company *</label>
                                <input 
                                  type="text" 
                                  value={prevCompany}
                                  onChange={(e) => setPrevCompany(e.target.value)}
                                  className="mob-input-field-premium"
                                  style={{ padding: '8px 10px', height: '36px' }}
                                />
                              </div>

                              <div className="mob-input-wrap-premium" style={{ marginBottom: '8px' }}>
                                <label className="input-label-premium" style={{ fontSize: '11px', fontWeight: 'bold' }}>Previous Job Title *</label>
                                <input 
                                  type="text" 
                                  value={prevJobTitle}
                                  onChange={(e) => setPrevJobTitle(e.target.value)}
                                  className="mob-input-field-premium"
                                  style={{ padding: '8px 10px', height: '36px' }}
                                />
                              </div>

                              <div className="mob-input-wrap-premium" style={{ marginBottom: '8px' }}>
                                <label className="input-label-premium" style={{ fontSize: '11px', fontWeight: 'bold' }}>Duration *</label>
                                <input 
                                  type="text" 
                                  value={prevDuration}
                                  onChange={(e) => setPrevDuration(e.target.value)}
                                  className="mob-input-field-premium"
                                  style={{ padding: '8px 10px', height: '36px' }}
                                />
                              </div>

                              <div className="mob-input-wrap-premium" style={{ marginBottom: '8px' }}>
                                <label className="input-label-premium" style={{ fontSize: '11px', fontWeight: 'bold' }}>Education Degree *</label>
                                <input 
                                  type="text" 
                                  value={educationDegree}
                                  onChange={(e) => setEducationDegree(e.target.value)}
                                  className="mob-input-field-premium"
                                  style={{ padding: '8px 10px', height: '36px' }}
                                />
                              </div>

                              <div className="mob-input-wrap-premium" style={{ marginBottom: '8px' }}>
                                <label className="input-label-premium" style={{ fontSize: '11px', fontWeight: 'bold' }}>Institution / University *</label>
                                <input 
                                  type="text" 
                                  value={educationSchool}
                                  onChange={(e) => setEducationSchool(e.target.value)}
                                  className="mob-input-field-premium"
                                  style={{ padding: '8px 10px', height: '36px' }}
                                />
                              </div>

                              <div className="mob-input-wrap-premium" style={{ marginBottom: '8px' }}>
                                <label className="input-label-premium" style={{ fontSize: '11px', fontWeight: 'bold' }}>Zyan Resume Summary *</label>
                                <textarea 
                                  value={summary}
                                  onChange={(e) => setSummary(e.target.value)}
                                  className="onboarding-textarea"
                                  rows={3}
                                  style={{ padding: '8px 10px', fontSize: '12px' }}
                                />
                              </div>

                              <div style={{ display: 'flex', gap: '10px', marginTop: '12px' }}>
                                <button 
                                  onClick={async () => {
                                    await handleCompleteOnboarding();
                                    setIsEditingProfile(false);
                                  }} 
                                  className="indeed-primary-btn-submit"
                                  style={{ margin: 0, flex: 1, height: '40px', background: '#000000', color: '#ffffff', borderRadius: '8px', border: 'none', fontWeight: 'bold', cursor: 'pointer' }}
                                >
                                  Save Profile
                                </button>
                                <button 
                                  onClick={() => setIsEditingProfile(false)} 
                                  className="mob-logout-btn"
                                  style={{ margin: 0, flex: 1, height: '40px', backgroundColor: '#ffffff', color: '#000000', border: '1px solid #e2e8f0', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px', cursor: 'pointer', fontWeight: 'bold' }}
                                >
                                  <Icons.Close size={12} color="#000000" /> Cancel
                                </button>
                              </div>
                            </div>
                          ) : (
                            /* STATIC DETAILS VIEW */
                            <>
                              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                  <Icons.Document size={16} color="#000000" />
                                  <h4 className="card-inner-title" style={{ margin: 0, fontSize: '13px', fontWeight: 800, color: '#000000', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Zyan Resume</h4>
                                </div>
                                <p className="card-inner-subtitle" style={{ fontSize: '11px', color: '#64748b', margin: '2px 0 6px 0', textTransform: 'uppercase', letterSpacing: '0.3px', fontWeight: 'bold' }}>Summary Profile</p>
                                <div className="summary-text-box" style={{ background: '#f8fafc', borderLeft: '4px solid #000000', padding: '16px', borderRadius: '12px', fontSize: '12px', color: '#1e293b', lineHeight: '1.6', textAlign: 'left', fontStyle: 'italic', boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.02)' }}>
                                  "{summary || 'Experienced Software Engineer with a passion for building robust React & Node.js architectures, now seeking global opportunities.'}"
                                </div>
                              </div>

                              {/* Work Experience Section */}
                              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                  <Icons.Briefcase size={16} color="#000000" />
                                  <h4 className="card-inner-title" style={{ margin: 0, fontSize: '13px', fontWeight: 800, color: '#000000', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Work Experience</h4>
                                </div>
                                <p className="card-inner-subtitle" style={{ fontSize: '11px', color: '#64748b', margin: '2px 0 6px 0', textTransform: 'uppercase', letterSpacing: '0.3px', fontWeight: 'bold' }}>Previous Employment Details</p>
                                <div className="experience-detail-block" style={{ display: 'flex', gap: '14px', alignItems: 'center', background: '#ffffff', border: '1px solid #e2e8f0', padding: '16px', borderRadius: '16px', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.015)' }}>
                                  <div className="exp-icon" style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#000000', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #000000', flexShrink: 0 }}>
                                    <Icons.Briefcase size={18} color="#ffffff" />
                                  </div>
                                  <div className="exp-details-text" style={{ display: 'flex', flexDirection: 'column', gap: '3px', textAlign: 'left' }}>
                                    <strong style={{ fontSize: '14px', fontWeight: 800, color: '#000000' }}>{prevJobTitle || 'Junior Web Developer'}</strong>
                                    <span style={{ fontSize: '12px', color: '#1e293b', fontWeight: '700' }}>{prevCompany || 'Tata Consultancy Services'}</span>
                                    <span style={{ fontSize: '11px', color: '#64748b', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                      🕒 {prevDuration || '2 Years'}
                                    </span>
                                  </div>
                                </div>
                              </div>

                              {/* Education Details Section */}
                              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                  <Icons.Graduation size={18} color="#000000" />
                                  <h4 className="card-inner-title" style={{ margin: 0, fontSize: '13px', fontWeight: 800, color: '#000000', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Education Background</h4>
                                </div>
                                <p className="card-inner-subtitle" style={{ fontSize: '11px', color: '#64748b', margin: '2px 0 6px 0', textTransform: 'uppercase', letterSpacing: '0.3px', fontWeight: 'bold' }}>Academic Qualifications</p>
                                <div className="experience-detail-block" style={{ display: 'flex', gap: '14px', alignItems: 'center', background: '#ffffff', border: '1px solid #e2e8f0', padding: '16px', borderRadius: '16px', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.015)' }}>
                                  <div className="exp-icon" style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#000000', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #000000', flexShrink: 0 }}>
                                    <Icons.Graduation size={18} color="#ffffff" />
                                  </div>
                                  <div className="exp-details-text" style={{ display: 'flex', flexDirection: 'column', gap: '3px', textAlign: 'left' }}>
                                    <strong style={{ fontSize: '14px', fontWeight: 800, color: '#000000' }}>{educationDegree || 'Bachelors in Computer Science'}</strong>
                                    <span style={{ fontSize: '12px', color: '#1e293b', fontWeight: '700' }}>{educationSchool || 'Mumbai University'}</span>
                                  </div>
                                </div>
                              </div>

                              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                  <Icons.Sparkles size={16} color="#000000" />
                                  <h4 className="card-inner-title" style={{ margin: 0, fontSize: '13px', fontWeight: 800, color: '#000000', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Primary Skills</h4>
                                </div>
                                <p className="card-inner-subtitle" style={{ fontSize: '11px', color: '#64748b', margin: '2px 0 6px 0', textTransform: 'uppercase', letterSpacing: '0.3px', fontWeight: 'bold' }}>Core Expertise & Technical Skills</p>
                                <div className="perks-pills-wrap" style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '8px' }}>
                                  {primarySkills.split(',').map((skill, idx) => (
                                    <span 
                                      key={idx} 
                                      className="success-perk-pill"
                                      style={{ 
                                        background: '#ffffff', 
                                        border: '1px solid #000000', 
                                        color: '#000000', 
                                        fontSize: '11px', 
                                        fontWeight: 700, 
                                        padding: '6px 14px', 
                                        borderRadius: '20px', 
                                        display: 'inline-flex', 
                                        alignItems: 'center', 
                                        gap: '6px', 
                                        boxShadow: '0 2px 6px rgba(0,0,0,0.03)',
                                        cursor: 'default'
                                      }}
                                    >
                                      <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#000000' }} />
                                      {skill.trim()}
                                    </span>
                                  ))}
                                </div>
                              </div>

                              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '12px' }}>
                                <button 
                                  onClick={() => setIsEditingProfile(true)} 
                                  className="indeed-primary-btn-submit"
                                  style={{ margin: 0, background: '#000000', color: '#ffffff', border: 'none', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}
                                >
                                  <Icons.Edit size={14} color="#ffffff" /> Edit Profile Details
                                </button>
                                <button 
                                  onClick={handleLogout} 
                                  className="mob-logout-btn" 
                                  style={{ 
                                    margin: '4px 0 0 0', 
                                    height: '40px', 
                                    backgroundColor: '#ffffff', 
                                    color: '#ef4444', 
                                    border: '1px solid #fecaca', 
                                    borderRadius: '8px', 
                                    fontWeight: 'bold', 
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '6px'
                                  }}
                                >
                                  <Icons.Close size={12} color="#ef4444" /> Sign Out
                                </button>
                              </div>
                            </>
                          )}
                        </div>
                      )}

                      {profileSubTab === 'preferences' && (
                        <div className="flex-col-layout gap-4" style={{ textAlign: 'left' }}>
                          <div className="indeed-resume-card" style={{ padding: '14px', borderRadius: '12px', background: '#ffffff', border: '1px solid #e4e2e0' }}>
                            <h4 className="card-inner-title" style={{ fontSize: '14px', margin: '0 0 4px 0', fontWeight: 'bold' }}>Job Preferences</h4>
                            <p className="card-inner-subtitle" style={{ fontSize: '12px', color: '#6f6f6f', margin: '0 0 10px 0' }}>Relocation Options</p>
                            <ul className="prefs-list" style={{ margin: 0, padding: 0, listStyle: 'none', fontSize: '13px', lineHeight: 2.0, color: '#2d2d2d', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                              {relocationVisa && <li style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#f8fafc', border: '1px solid #e2e8f0', color: '#0f172a', padding: '10px 14px', borderRadius: '8px', fontWeight: '600' }}><Icons.Visa size={14} color="#000000" /> Visa Sponsorship Required</li>}
                              {relocationRoom && <li style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#f8fafc', border: '1px solid #e2e8f0', color: '#0f172a', padding: '10px 14px', borderRadius: '8px', fontWeight: '600' }}><Icons.Accommodation size={14} color="#000000" /> Accommodation Provided</li>}
                              {relocationFlight && <li style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#f8fafc', border: '1px solid #e2e8f0', color: '#0f172a', padding: '10px 14px', borderRadius: '8px', fontWeight: '600' }}><Icons.Flight size={14} color="#000000" /> Flight & Relocation Allowance Provided</li>}
                              {!relocationVisa && !relocationRoom && !relocationFlight && (
                                <li className="text-muted" style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#f8fafc', border: '1px solid #e2e8f0', color: '#64748b', padding: '10px 14px', borderRadius: '8px', fontWeight: '500' }}><Icons.Info size={14} color="#64748b" /> No specific relocation perks set.</li>
                              )}
                            </ul>
                          </div>

                          <div className="indeed-resume-card" style={{ padding: '14px', borderRadius: '12px', background: '#ffffff', border: '1px solid #e4e2e0' }}>
                            <h4 className="card-inner-title" style={{ fontSize: '14px', margin: '0 0 4px 0', fontWeight: 'bold' }}>Job Alerts</h4>
                            <p className="card-inner-subtitle" style={{ fontSize: '12px', color: '#6f6f6f', margin: '0 0 10px 0' }}>Manage search alert subscriptions</p>

                            {/* Alert Form */}
                            <form onSubmit={handleCreateAlert} className="flex-col-layout gap-2" style={{ marginTop: '12px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                              <div className="mob-input-wrap-premium" style={{ marginBottom: '4px' }}>
                                <label className="input-label-premium" style={{ fontSize: '11px', fontWeight: 'bold', display: 'block', marginBottom: '4px' }}>Alert Keyword *</label>
                                <input 
                                  type="text" 
                                  required 
                                  value={alertKeyword}
                                  onChange={(e) => setAlertKeyword(e.target.value)}
                                  className="mob-input-field-premium"
                                  placeholder="e.g. React Developer, Nursing"
                                  style={{ padding: '8px 10px', height: '36px', fontSize: '12px', width: '100%', boxSizing: 'border-box', border: '1px solid #d1cfcd', borderRadius: '8px' }}
                                />
                              </div>

                              <div style={{ display: 'flex', gap: '8px' }}>
                                <div className="mob-input-wrap-premium" style={{ flex: 1, marginBottom: '4px' }}>
                                  <label className="input-label-premium" style={{ fontSize: '11px', fontWeight: 'bold', display: 'block', marginBottom: '4px' }}>Category</label>
                                  <select 
                                    value={alertCategoryId}
                                    onChange={(e) => setAlertCategoryId(e.target.value)}
                                    className="mob-input-field-premium"
                                    style={{ padding: '4px 10px', height: '36px', fontSize: '12px', width: '100%', boxSizing: 'border-box', border: '1px solid #d1cfcd', borderRadius: '8px' }}
                                  >
                                    <option value="1">Software Eng.</option>
                                    <option value="2">Healthcare</option>
                                    <option value="3">Hospitality</option>
                                    <option value="4">Construction</option>
                                  </select>
                                </div>

                                <div className="mob-input-wrap-premium" style={{ flex: 1, marginBottom: '4px' }}>
                                  <label className="input-label-premium" style={{ fontSize: '11px', fontWeight: 'bold', display: 'block', marginBottom: '4px' }}>Country</label>
                                  <select 
                                    value={alertCountryId}
                                    onChange={(e) => setAlertCountryId(e.target.value)}
                                    className="mob-input-field-premium"
                                    style={{ padding: '4px 10px', height: '36px', fontSize: '12px', width: '100%', boxSizing: 'border-box', border: '1px solid #d1cfcd', borderRadius: '8px' }}
                                  >
                                    <option value="1">United Kingdom</option>
                                    <option value="2">Canada</option>
                                    <option value="3">Germany</option>
                                    <option value="4">Japan</option>
                                    <option value="5">United States</option>
                                  </select>
                                </div>
                              </div>

                              <div className="mob-input-wrap-premium" style={{ marginBottom: '8px' }}>
                                <label className="input-label-premium" style={{ fontSize: '11px', fontWeight: 'bold', display: 'block', marginBottom: '4px' }}>Digest Frequency</label>
                                <select 
                                  value={alertFrequency}
                                  onChange={(e) => setAlertFrequency(e.target.value)}
                                  className="mob-input-field-premium"
                                  style={{ padding: '4px 10px', height: '36px', fontSize: '12px', width: '100%', boxSizing: 'border-box', border: '1px solid #d1cfcd', borderRadius: '8px' }}
                                >
                                  <option value="daily">Daily Email Summary</option>
                                  <option value="weekly">Weekly Email Summary</option>
                                </select>
                              </div>

                              <button 
                                type="submit" 
                                className="indeed-primary-btn-submit"
                                style={{ margin: 0, height: '36px', fontSize: '12px', background: '#000000', color: '#ffffff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}
                              >
                                <Icons.Bell size={14} color="#ffffff" /> Create Job Alert
                              </button>
                            </form>

                            {/* Active Alerts List */}
                            <div style={{ marginTop: '16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                              <p style={{ fontSize: '12px', fontWeight: 'bold', margin: '0 0 4px 0', color: '#2d2d2d' }}>Active Alerts ({jobAlerts.length})</p>
                              {jobAlerts.length > 0 ? (
                                jobAlerts.map((alert) => (
                                  <div 
                                    key={alert.id}
                                    style={{
                                      padding: '10px 12px',
                                      backgroundColor: '#f3f2f1',
                                      borderRadius: '10px',
                                      border: '1px solid #e4e2e0',
                                      display: 'flex',
                                      justifyContent: 'space-between',
                                      alignItems: 'center',
                                      gap: '8px',
                                      textAlign: 'left'
                                    }}
                                  >
                                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '2px' }}>
                                      <strong style={{ fontSize: '13px', color: '#000000' }}>{alert.keyword}</strong>
                                      <span style={{ fontSize: '11px', color: '#6f6f6f' }}>
                                        📍 {alert.country_name || 'United Kingdom'} • {alert.category_name || 'Software Engineering'}
                                      </span>
                                      <span style={{ fontSize: '10px', color: '#64748b', display: 'flex', alignItems: 'center', gap: '2px', fontWeight: 'bold' }}>
                                        🕒 {alert.frequency} digest
                                      </span>
                                    </div>
                                    <button 
                                      onClick={() => handleDeleteAlert(alert.id)}
                                      style={{
                                        border: 'none',
                                        background: 'none',
                                        color: '#ef4444',
                                        cursor: 'pointer',
                                        padding: '4px 8px',
                                        display: 'flex',
                                        alignItems: 'center'
                                      }}
                                    >
                                      <Icons.Trash size={14} color="#ef4444" />
                                    </button>
                                  </div>
                                ))
                              ) : (
                                <p style={{ fontSize: '12px', color: '#8f8f8f', fontStyle: 'italic', margin: 0 }}>No active alerts set up yet.</p>
                              )}
                            </div>
                          </div>
                        </div>
                      )}

                      {profileSubTab === 'resume' && (
                        <div className="indeed-resume-card flex-col-layout gap-4" style={{ textAlign: 'left' }}>
                          <div>
                            <h4 className="card-inner-title" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '0 0 12px 0' }}>
                              <span>Resumes Uploaded ({userResumes.length})</span>
                              <button
                                onClick={() => document.getElementById('profile-resume-file-input')?.click()}
                                style={{
                                  background: '#000000',
                                  color: '#ffffff',
                                  border: 'none',
                                  padding: '6px 12px',
                                  borderRadius: '6px',
                                  fontSize: '11px',
                                  fontWeight: 'bold',
                                  cursor: 'pointer',
                                  display: 'inline-flex',
                                  alignItems: 'center',
                                  gap: '4px'
                                }}
                              >
                                ＋ Upload New
                              </button>
                            </h4>
                            <input 
                              type="file" 
                              id="profile-resume-file-input" 
                              accept=".pdf,.doc,.docx" 
                              style={{ display: 'none' }} 
                              onChange={(e) => { if(e.target.files?.[0]) handleResumeUpload(e.target.files[0]); }} 
                            />

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                              {userResumes.length > 0 ? (
                                userResumes.map((resume) => (
                                  <div 
                                    key={resume.id}
                                    style={{
                                      padding: '10px 12px',
                                      backgroundColor: '#f3f2f1',
                                      borderRadius: '10px',
                                      border: '1px solid #e4e2e0',
                                      display: 'flex',
                                      justifyContent: 'space-between',
                                      alignItems: 'center',
                                      gap: '8px'
                                    }}
                                  >
                                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '2px' }}>
                                      <strong style={{ fontSize: '13px', color: 'var(--indeed-text-charcoal)' }}>{resume.title}</strong>
                                      <span style={{ fontSize: '11px', color: '#6f6f6f' }}>
                                        {resume.is_default ? (
                                          <span style={{ color: '#000000', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                            ✓ Default Resume
                                          </span>
                                        ) : (
                                          <button
                                            onClick={async () => {
                                              const token = authToken || localStorage.getItem('token');
                                              if (!token) return;
                                              await fetch(`${API_BASE_URL}/api/v1/resumes/${resume.id}/default`, {
                                                method: 'PATCH',
                                                headers: { 'Authorization': `Bearer ${token}` }
                                              });
                                              fetchResumes(token);
                                            }}
                                            style={{ border: 'none', background: 'none', color: '#64748b', cursor: 'pointer', padding: 0, fontSize: '11px', textDecoration: 'underline', fontWeight: '600' }}
                                          >
                                            Set as default
                                          </button>
                                        )}
                                      </span>
                                    </div>
                                    <button 
                                      onClick={() => handleResumeDelete(resume.id)}
                                      style={{
                                        border: 'none',
                                        background: 'none',
                                        color: '#ef4444',
                                        cursor: 'pointer',
                                        padding: '4px 8px',
                                        display: 'flex',
                                        alignItems: 'center'
                                      }}
                                    >
                                      <Icons.Trash size={14} color="#ef4444" />
                                    </button>
                                  </div>
                                ))
                              ) : (
                                <div className="resume-pill-block" style={{ textAlign: 'center', padding: '16px' }}>
                                  <strong>No Resumes Uploaded</strong>
                                  <span style={{ fontSize: '12px', color: '#6f6f6f', display: 'block', marginTop: '4px' }}>
                                    Please upload a resume first to apply for relocation jobs.
                                  </span>
                                </div>
                              )}
                            </div>
                          </div>

                          <div style={{ marginTop: '16px' }}>
                            <h4 className="card-inner-title" style={{ margin: '0 0 8px 0' }}>Cover Letter Draft</h4>
                            <textarea
                              value={coverLetter}
                              onChange={(e) => setCoverLetter(e.target.value)}
                              className="onboarding-textarea"
                              rows={6}
                              style={{ 
                                width: '100%', 
                                padding: '10px', 
                                fontSize: '12px', 
                                borderRadius: '8px', 
                                border: '1px solid #d1cfcd', 
                                boxSizing: 'border-box',
                                lineHeight: '1.4',
                                fontFamily: 'inherit'
                              }}
                            />
                            <button
                              onClick={async () => {
                                setErrorMessage(null);
                                setSuccessMessage(null);
                                const token = authToken || localStorage.getItem('token');
                                if (!token) return;
                                try {
                                  const res = await fetch(API_BASE_URL + '/api/v1/auth/onboarding', {
                                    method: 'POST',
                                    headers: {
                                      'Content-Type': 'application/json',
                                      'Authorization': `Bearer ${token}`
                                    },
                                    body: JSON.stringify({
                                      current_city: currentCity,
                                      target_country: targetCountry,
                                      experience_years: experienceYears,
                                      primary_skills: primarySkills,
                                      summary: summary,
                                      prev_company: prevCompany,
                                      prev_job_title: prevJobTitle,
                                      prev_duration: prevDuration,
                                      education_degree: educationDegree,
                                      education_school: educationSchool,
                                      cover_letter: coverLetter
                                    })
                                  });
                                  const data = await res.json();
                                  if (data.success) {
                                    setSuccessMessage("Cover letter updated successfully!");
                                  } else {
                                    setErrorMessage(data.message || "Failed to update cover letter.");
                                  }
                                } catch (e) {
                                  setErrorMessage("Failed to save cover letter.");
                                }
                              }}
                              className="indeed-primary-btn-submit"
                              style={{ 
                                margin: '8px 0 0 0', 
                                width: '100%', 
                                height: '36px', 
                                fontSize: '12px',
                                background: '#000000',
                                color: '#ffffff',
                                border: 'none',
                                borderRadius: '8px',
                                cursor: 'pointer',
                                fontWeight: 'bold'
                              }}
                            >
                              Update Cover Letter Draft
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </>
                )}
              </div>
            )}

              </div>

              {/* BOTTOM TAB NAV BAR */}
              <div className="indeed-bottom-tabs-nav">
                <button 
                  onClick={() => setActiveTab('home')}
                  className={`bottom-nav-item ${activeTab === 'home' ? 'active-nav-tab' : ''}`}
                >
                  <span className="nav-icon-badge">
                    <Icons.Home color={activeTab === 'home' ? '#2557a7' : '#4b5563'} size={20} />
                  </span>
                  <span className="nav-lbl-text">Home</span>
                </button>

                <button 
                  onClick={() => setActiveTab('myjobs')}
                  className={`bottom-nav-item ${activeTab === 'myjobs' ? 'active-nav-tab' : ''}`}
                >
                  <span className="nav-icon-badge">
                    <Icons.Bookmark color={activeTab === 'myjobs' ? '#2557a7' : '#4b5563'} size={20} filled={activeTab === 'myjobs'} />
                  </span>
                  <span className="nav-lbl-text">My Jobs</span>
                </button>

                <button 
                  onClick={() => setActiveTab('messages')}
                  className={`bottom-nav-item ${activeTab === 'messages' ? 'active-nav-tab' : ''}`}
                >
                  <span className="nav-icon-badge">
                    <Icons.Messages color={activeTab === 'messages' ? '#2557a7' : '#4b5563'} size={20} />
                  </span>
                  <span className="nav-lbl-text">Messages</span>
                </button>

                <button 
                  onClick={() => setActiveTab('profile')}
                  className={`bottom-nav-item ${activeTab === 'profile' ? 'active-nav-tab' : ''}`}
                >
                  <span className="nav-icon-badge">
                    <Icons.User color={activeTab === 'profile' ? '#2557a7' : '#4b5563'} size={20} />
                  </span>
                  <span className="nav-lbl-text">Profile</span>
                </button>
              </div>
            </>
            )}
            </div>
          )}

          {/* SCREEN D: BOTTOM SHEET FILTER DRAWER DIALOG */}
          {showFilterSheet && (
            <div className="bottom-sheet-overlay fade-in">
              <div className="bottom-sheet-modal">
                <div className="bottom-sheet-drag-handle"></div>
                
                <div className="bottom-sheet-header">
                  <span className="bottom-sheet-title">Remote</span>
                  <button onClick={() => setShowFilterSheet(false)} className="close-sheet-btn">✕</button>
                </div>

                <div className="bottom-sheet-body">
                  <label className="checkbox-row-option">
                    <input 
                      type="checkbox" 
                      checked={hybridChecked} 
                      onChange={() => setHybridChecked(!hybridChecked)}
                      className="checkbox-clean-input" 
                    />
                    <span className="checkbox-label-text">Hybrid work</span>
                  </label>

                  <label className="checkbox-row-option">
                    <input 
                      type="checkbox" 
                      checked={remoteChecked} 
                      onChange={() => setRemoteChecked(!remoteChecked)}
                      className="checkbox-clean-input" 
                    />
                    <span className="checkbox-label-text">Only remote</span>
                  </label>
                </div>

                <div className="bottom-sheet-footer">
                  <button onClick={() => setShowFilterSheet(false)} className="btn-sheet-update">
                    Update
                  </button>
                  <button 
                    onClick={() => { setHybridChecked(false); setRemoteChecked(false); }}
                    className="btn-sheet-clear"
                  >
                    Clear all
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* SCREEN E: BOTTOM SHEET COUNTRY FILTER DRAWER */}
          {showCountrySheet && (
            <div className="bottom-sheet-overlay fade-in" style={{ zIndex: 1001 }}>
              <div className="bottom-sheet-modal" style={{ maxHeight: '70vh' }}>
                <div className="bottom-sheet-drag-handle"></div>
                
                <div className="bottom-sheet-header">
                  <span className="bottom-sheet-title" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Icons.MapPin size={18} color="#000000" /> Filter by Country
                  </span>
                  <button onClick={() => setShowCountrySheet(false)} className="close-sheet-btn">✕</button>
                </div>

                <div className="bottom-sheet-body" style={{ display: 'flex', flexDirection: 'column', gap: '8px', padding: '16px 20px', overflowY: 'auto', maxHeight: '40vh' }}>
                  {/* "All Countries" Option */}
                  <label 
                    className="checkbox-row-option" 
                    style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'space-between',
                      padding: '12px 14px', 
                      borderRadius: '12px', 
                      background: selectedCountryId === null ? 'rgba(0, 0, 0, 0.04)' : 'transparent',
                      border: selectedCountryId === null ? '1px solid #000000' : '1px solid #e4e2e0',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                    onClick={() => {
                      setLoadingJobs(true);
                      setSelectedCountryId(null);
                      setShowCountrySheet(false);
                      setTimeout(() => setLoadingJobs(false), 500);
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <span style={{ fontSize: '18px' }}>🌐</span>
                      <strong style={{ fontSize: '13px', color: 'var(--indeed-text-charcoal)' }}>All Countries</strong>
                    </div>
                    {selectedCountryId === null && <Icons.Success size={16} color="#000000" />}
                  </label>

                  {/* List of Countries from SQL */}
                  {countriesList.map((c) => (
                    <label 
                      key={c.id}
                      className="checkbox-row-option" 
                      style={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'space-between',
                        padding: '12px 14px', 
                        borderRadius: '12px', 
                        background: selectedCountryId === c.id ? 'rgba(0, 0, 0, 0.04)' : 'transparent',
                        border: selectedCountryId === c.id ? '1px solid #000000' : '1px solid #e4e2e0',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease'
                      }}
                      onClick={() => {
                        setLoadingJobs(true);
                        setSelectedCountryId(c.id);
                        setShowCountrySheet(false);
                        setTimeout(() => setLoadingJobs(false), 500);
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        {c.flag_url ? (
                          <img src={c.flag_url} alt={c.name} style={{ width: '24px', height: '16px', borderRadius: '2px', objectFit: 'cover' }} />
                        ) : (
                          <span style={{ fontSize: '18px' }}>📍</span>
                        )}
                        <strong style={{ fontSize: '13px', color: 'var(--indeed-text-charcoal)' }}>{c.name}</strong>
                      </div>
                      {selectedCountryId === c.id && <Icons.Success size={16} color="#000000" />}
                    </label>
                  ))}
                </div>

                <div className="bottom-sheet-footer" style={{ borderTop: '1px solid #e4e2e0', paddingTop: '12px' }}>
                  <button 
                    onClick={() => {
                      setLoadingJobs(true);
                      setSelectedCountryId(null);
                      setShowCountrySheet(false);
                      setTimeout(() => setLoadingJobs(false), 500);
                    }}
                    className="btn-sheet-clear"
                    style={{ width: '100%', margin: 0, justifyContent: 'center' }}
                  >
                    Clear Filter
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* SCREEN F: BOTTOM SHEET NOTIFICATIONS DRAWER WITH CLEAR ALL OPTION */}
          {showNotificationsSheet && (
            <div className="bottom-sheet-overlay fade-in" style={{ zIndex: 1001 }}>
              <div className="bottom-sheet-modal" style={{ maxHeight: '80vh', display: 'flex', flexDirection: 'column' }}>
                <div className="bottom-sheet-drag-handle"></div>
                
                <div className="bottom-sheet-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 20px', borderBottom: '1px solid #e4e2e0' }}>
                  <span className="bottom-sheet-title" style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '15px', fontWeight: 'bold' }}>
                    <Icons.Bell size={18} color="#000000" /> Notifications ({notifications.length})
                  </span>
                  <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                    {notifications.length > 0 && (
                      <button 
                        onClick={handleClearNotifications}
                        style={{
                          border: 'none',
                          background: 'none',
                          color: '#ef4444',
                          fontSize: '12px',
                          fontWeight: 'bold',
                          cursor: 'pointer',
                          padding: '4px 8px'
                        }}
                      >
                        Clear All
                      </button>
                    )}
                    <button onClick={() => setShowNotificationsSheet(false)} className="close-sheet-btn" style={{ fontSize: '16px', border: 'none', background: 'none', cursor: 'pointer' }}>✕</button>
                  </div>
                </div>

                <div className="bottom-sheet-body" style={{ display: 'flex', flexDirection: 'column', gap: '12px', padding: '20px', overflowY: 'auto', flex: 1, maxHeight: '50vh', textAlign: 'left' }}>
                  {notifications.length > 0 ? (
                    notifications.map((notif) => (
                      <div 
                        key={notif.id} 
                        style={{ 
                          display: 'flex', 
                          gap: '12px', 
                          padding: '14px', 
                          alignItems: 'start', 
                          background: '#f3f2f1', 
                          border: '1px solid #e4e2e0',
                          borderRadius: '12px'
                        }}
                      >
                        <span style={{ flexShrink: 0, display: 'flex', alignItems: 'center', marginTop: '2px' }}>
                          <Icons.Bell size={18} color="#4b5563" />
                        </span>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
                          <strong style={{ fontSize: '13px', color: 'var(--indeed-text-charcoal)' }}>{notif.title}</strong>
                          <p style={{ fontSize: '12px', color: '#595959', margin: 0, lineHeight: 1.4 }}>{notif.message}</p>
                          <span style={{ fontSize: '9px', color: '#9f9f9f', marginTop: '2px' }}>
                            {new Date(notif.created_at).toLocaleDateString('en-US', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}
                          </span>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', padding: '30px 0', color: '#9ca3af' }}>
                      <Icons.Bell size={36} color="#9ca3af" />
                      <p style={{ fontSize: '13px', margin: 0 }}>No new notifications yet.</p>
                    </div>
                  )}
                </div>

                <div className="bottom-sheet-footer" style={{ borderTop: '1px solid #e4e2e0', padding: '12px 20px' }}>
                  <button 
                    onClick={() => setShowNotificationsSheet(false)}
                    className="btn-sheet-update"
                    style={{ width: '100%', margin: 0 }}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          )}

          {showEmployerFindSheet && (
            <div className="bottom-sheet-overlay fade-in" style={{ zIndex: 1001 }}>
              <div className="bottom-sheet-modal" style={{ maxHeight: '80vh', display: 'flex', flexDirection: 'column' }}>
                <div className="bottom-sheet-drag-handle"></div>
                
                <div className="bottom-sheet-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 20px', borderBottom: '1px solid #e4e2e0' }}>
                  <span className="bottom-sheet-title" style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '15px', fontWeight: 'bold' }}>
                    <Icons.Eye size={18} color="#000000" /> Employers Privacy Preferences
                  </span>
                  <button onClick={() => setShowEmployerFindSheet(false)} className="close-sheet-btn" style={{ fontSize: '16px', border: 'none', background: 'none', cursor: 'pointer' }}>✕</button>
                </div>

                <div className="bottom-sheet-body" style={{ display: 'flex', flexDirection: 'column', gap: '12px', padding: '20px', overflowY: 'auto', flex: 1, maxHeight: '50vh', textAlign: 'left' }}>
                  
                  {/* Option 1: Public */}
                  <div 
                    className="checkbox-row-option" 
                    style={{ 
                      display: 'flex', 
                      alignItems: 'start', 
                      gap: '12px',
                      padding: '14px', 
                      borderRadius: '12px', 
                      background: employerFindMode === 'public' ? 'rgba(0, 0, 0, 0.04)' : 'transparent',
                      border: employerFindMode === 'public' ? '1px solid #000000' : '1px solid #e4e2e0',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                    onClick={() => {
                      setEmployerFindMode('public');
                      setSuccessMessage("Privacy updated to Public!");
                      setTimeout(() => setSuccessMessage(null), 2500);
                      setShowEmployerFindSheet(false);
                    }}
                  >
                    <div style={{ marginTop: '2px' }}>
                      <Icons.Eye size={18} color={employerFindMode === 'public' ? '#000000' : '#6b7280'} />
                    </div>
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '2px' }}>
                      <strong style={{ fontSize: '13px', color: 'var(--indeed-text-charcoal)' }}>Public (Searchable)</strong>
                      <span style={{ fontSize: '11px', color: '#6f6f6f', lineHeight: '1.4' }}>
                        All registered global recruiters on Zyan can search and view your resumes, cover letter, target country, and contact details.
                      </span>
                    </div>
                    {employerFindMode === 'public' && <Icons.Success size={16} color="#000000" style={{ marginLeft: 'auto', alignSelf: 'center' }} />}
                  </div>

                  {/* Option 2: Limited */}
                  <div 
                    className="checkbox-row-option" 
                    style={{ 
                      display: 'flex', 
                      alignItems: 'start', 
                      gap: '12px',
                      padding: '14px', 
                      borderRadius: '12px', 
                      background: employerFindMode === 'limited' ? 'rgba(0, 0, 0, 0.04)' : 'transparent',
                      border: employerFindMode === 'limited' ? '1px solid #000000' : '1px solid #e4e2e0',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                    onClick={() => {
                      setEmployerFindMode('limited');
                      setSuccessMessage("Privacy updated to Limited!");
                      setTimeout(() => setSuccessMessage(null), 2500);
                      setShowEmployerFindSheet(false);
                    }}
                  >
                    <div style={{ marginTop: '2px' }}>
                      <Icons.Success size={18} color={employerFindMode === 'limited' ? '#000000' : '#6b7280'} />
                    </div>
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '2px' }}>
                      <strong style={{ fontSize: '13px', color: 'var(--indeed-text-charcoal)' }}>Limited (Only Verified)</strong>
                      <span style={{ fontSize: '11px', color: '#6f6f6f', lineHeight: '1.4' }}>
                        Only verified employers with active, vetted visa sponsorships can search and discover your profile.
                      </span>
                    </div>
                    {employerFindMode === 'limited' && <Icons.Success size={16} color="#000000" style={{ marginLeft: 'auto', alignSelf: 'center' }} />}
                  </div>

                  {/* Option 3: Hidden */}
                  <div 
                    className="checkbox-row-option" 
                    style={{ 
                      display: 'flex', 
                      alignItems: 'start', 
                      gap: '12px',
                      padding: '14px', 
                      borderRadius: '12px', 
                      background: employerFindMode === 'hidden' ? 'rgba(0, 0, 0, 0.04)' : 'transparent',
                      border: employerFindMode === 'hidden' ? '1px solid #000000' : '1px solid #e4e2e0',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                    onClick={() => {
                      setEmployerFindMode('hidden');
                      setSuccessMessage("Privacy updated to Private!");
                      setTimeout(() => setSuccessMessage(null), 2500);
                      setShowEmployerFindSheet(false);
                    }}
                  >
                    <div style={{ marginTop: '2px' }}>
                      <Icons.Close size={18} color={employerFindMode === 'hidden' ? '#ef4444' : '#6b7280'} />
                    </div>
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '2px' }}>
                      <strong style={{ fontSize: '13px', color: 'var(--indeed-text-charcoal)' }}>Private (Hidden)</strong>
                      <span style={{ fontSize: '11px', color: '#6f6f6f', lineHeight: '1.4' }}>
                        No employers can find or discover you through search. Only companies you explicitly apply to can view your details.
                      </span>
                    </div>
                    {employerFindMode === 'hidden' && <Icons.Success size={16} color="#000000" style={{ marginLeft: 'auto', alignSelf: 'center' }} />}
                  </div>

                </div>

                <div className="bottom-sheet-footer" style={{ borderTop: '1px solid #e4e2e0', padding: '12px 20px' }}>
                  <button 
                    onClick={() => setShowEmployerFindSheet(false)}
                    className="btn-sheet-update"
                    style={{ width: '100%', margin: 0 }}
                  >
                    Save & Close
                  </button>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
