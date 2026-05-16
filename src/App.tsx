/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  User, 
  Briefcase, 
  Cpu, 
  GraduationCap, 
  Award, 
  Mail, 
  Phone, 
  MapPin, 
  ExternalLink,
  ChevronRight,
  Layout,
  Database,
  Terminal,
  BarChart3,
  X,
  Smartphone,
  FileText,
  AlertCircle,
  Link,
  ShieldCheck,
  CreditCard,
  Plus,
  Trash2,
  Edit2,
  Save,
  History,
  LogIn,
  LogOut,
  Camera,
  Layers,
  Settings,
  Sun,
  Moon,
  Copy
} from 'lucide-react';
import { 
  DragDropContext, 
  Droppable, 
  Draggable,
  DropResult
} from '@hello-pangea/dnd';

const TypedDraggable = Draggable as any;

import { 
  collection, 
  query, 
  onSnapshot, 
  doc, 
  setDoc, 
  updateDoc, 
  deleteDoc, 
  addDoc,
  getDoc,
  orderBy
} from 'firebase/firestore';
import { onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';
import { ref, uploadBytes, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { db, auth, storage, signInWithGoogle, logout } from './lib/firebase';

const ICON_MAP: Record<string, any> = {
  Smartphone, FileText, Link, ShieldCheck, CreditCard, Cpu, Layout, BarChart3, Terminal, Database, Briefcase, User, GraduationCap, Award, MapPin, Mail, Phone
};

const CV_DATA = {
  name: "Deni Permana Riyadi",
  role: "IT Product Manager | IT Business Analyst",
  location: "Sukabumi, West Java",
  phone: "+62 858-8620-7701",
  email: "dpermanariyadi@gmail.com",
  summary: "Senior IT Leader with 15+ years of experience delivering enterprise technology solutions across multifinance and telecommunications industries. I specialize in driving digital transformation, leading product development, and aligning technology initiatives with business strategy.",
  competencies: [
    { title: "Product Leadership", skills: ["Agile/Scrum Framework", "Sprint Planning", "Backlog Grooming", "Roadmap Strategy"], icon: Layout },
    { title: "Business Analysis", skills: ["BRD", "User Stories", "Functional Specifications", "UAT"], icon: BarChart3 },
    { title: "Technical Proficiency", skills: ["SQL (MySQL & SQL Server)", "PHP", "Python", "Shell Scripting", "Linux"], icon: Terminal },
    { title: "Tools & Frameworks", skills: ["Jira", "Trello", "Figma", "GitLab CI/CD", "Docker"], icon: Database },
  ],
  experience: [
    {
      company: "PT Teknologi Operator Prima",
      role: "IT Product Manager",
      period: "October 2025 – Present",
      highlights: [
        "Owned end-to-end product lifecycle from client onboarding to post-production monitoring.",
        "Translated business needs into structured product requirements (BRD).",
        "Led cross-functional collaboration ensuring seamless product delivery.",
        "Managed product delivery timelines and project milestones."
      ]
    },
    {
      company: "BPR Kredit Mandiri Indonesia",
      role: "IT Unit Head Business Analyst",
      period: "June 2024 – October 2025",
      highlights: [
        "Managed the Business System Analyst team to deliver technology solutions.",
        "Analyzed and optimized existing business processes for efficiency.",
        "Designed database architecture for application modifications.",
        "Ensured project delivery remained within budget and timelines."
      ]
    },
    {
      company: "PT Smartfren Telecom Tbk",
      role: "IT Digital & Application Support",
      period: "May 2022 – March 2024",
      highlights: [
        "Provided L2 support for critical applications including AppMySmartfren.",
        "Developed transaction monitoring dashboards using Prometheus and Grafana.",
        "Automated reporting processes through scheduler shell scripts."
      ]
    },
    {
      company: "PT Esta Dana Ventura",
      role: "IT Operation Unit Head",
      period: "Jan 2015 – Feb 2021",
      highlights: [
        "Monitored and maintained health of all running systems.",
        "Provided comprehensive IT support for 240 branches nationwide.",
        "Managed technology vendors and service providers."
      ]
    },
    {
      company: "PT Asia Multidana",
      role: "Finance & Accounting Manager",
      period: "October 2014 – November 2015",
      highlights: [
        "Financial Strategy & Cash Management: Strategized, coordinated, and controlled company cash flow to ensure optimal liquidity and fund availability for daily operations.",
        "Regulatory Compliance: Oversaw the preparation and accuracy of monthly and annual financial statements for internal stakeholders and the Financial Services Authority (OJK).",
        "Taxation Oversight: Reviewed and authorized annual tax reports (SPT) to ensure full compliance with local tax regulations.",
        "Process Optimization: Managed the end-to-end accounting function and maintained the Chart of Accounts (CoA) to produce accurate, data-driven financial insights.",
        "Internal Controls: Verified and validated all financial transaction records while evaluating company expenses to ensure budget adherence and fiscal health.",
        "Leadership & Supervision: Managed and mentored the accounting staff, fostering a high-performance team environment while concurrently supervising IT infrastructure initiatives.",
        "Asset Management: Responsible for the strategic management and safeguarding of company assets."
      ]
    },
    {
      company: "PT Asia Multidana",
      role: "IT Specialist",
      period: "January 2009 – October 2014",
      highlights: [
        "Set Up & maintain office network and internet conection.",
        "Troubleshoot & resolve IT Problem.",
        "Maintain Software and hardware",
        "Take trips to all operating units.",
        "Support new branch opening installation"
      ]
    }
  ],
  education: [
    { degree: "Bachelor of Science: Computer Information Engineering", school: "MH Thamrin College, Jakarta", year: "2013" },
    { degree: "Associate of Science: Computer Information Systems", school: "AMIK Yapri, Jakarta", year: "2008" }
  ],
  projects: [
    {
      title: "Pengembangan Aplikasi Mobile Banking",
      role: "IT Product Owner Manager",
      description: "Memimpin inisiatif transformasi digital dengan membangun platform mobile banking dari nol. Proyek ini mendigitalkan layanan nasabah tradisional menjadi pengalaman mobile-first, mengurangi waktu antrean di kantor cabang hingga 40% dan memberikan akses transaksi finansial 24/7 bagi lebih dari 50.000 nasabah aktif melalui sistem real-time yang aman.",
      image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=1200&auto=format&fit=crop",
      techStack: "Figma, REST API, Frontend Angular, Backend Golang",
      responsibilities: [
        "Mengumpulkan dan menyusun Business Requirement Document (BRD) dan User Stories berdasarkan kebutuhan bisnis dan ekspektasi pengguna.",
        "Merancang wireframe dan purwarupa high-fidelity (UI/UX) interaktif menggunakan Figma.",
        "Memetakan integrasi sistem front-end dengan backend core banking melalui arsitektur berbasis API."
      ],
      tags: ["Mobile", "Banking", "Fintech"],
      status: "Completed",
      icon: Smartphone
    },
    {
      title: "Loan Origination System (LOS)",
      role: "IT Product Owner Manager",
      description: "Mengembangkan sistem otomasi kredit (LOS) terintegrasi yang memangkas waktu pemrosesan aplikasi pinjaman dari 5 hari menjadi kurang dari 24 jam. Dengan mengintegrasikan sistem scoring otomatis dan validasi data secara real-time, tingkat kesalahan entri data menurun drastis dan efisiensi operasional meningkat sebesar 60% dalam pemrosesan portofolio kredit perusahaan.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop",
      techStack: "Angular, Golang, MongoDB, RabbitMq",
      responsibilities: [
        "Memimpin transformasi tata kelola IT dan pengembangan produk untuk sistem LOS internal perusahaan.",
        "Menyusun dokumentasi alur bisnis (BPMN) dan logika sistem yang kompleks.",
        "Mengelola infrastruktur manajemen proyek internal menggunakan Redmine.",
        "Menginisiasi transisi dokumentasi ke Markdown untuk efisiensi kolaborasi visual tim pengembang."
      ],
      tags: ["LOS", "Financing", "TOP Operator"],
      status: "Completed",
      icon: FileText
    },
    {
      title: "Integrasi API Loan Channeling",
      role: "IT Product Owner Manager",
      description: "Membangun jembatan teknologi B2B antara platform FinTech SAMIR dan ekosistem perbankan mitra. Integrasi API ini memungkinkan disbursement pinjaman otomatis senilai miliaran rupiah setiap bulannya dengan tingkat akurasi transaksi 99.99%. Proyek ini memperluas jangkauan layanan finansial ke segmen yang sebelumnya tidak terlayani (underbanked) dengan mempermudah kolaborasi lintas institusi.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop",
      techStack: "Golang, MySQL, JSON, REST API",
      responsibilities: [
        "Merancang spesifikasi teknis API dan skema database relasional (MySQL).",
        "Audit alur bisnis untuk akurasi request inquiry dari SAMIR API ke sistem bank.",
        "Analisis payload API dan penyesuaian struktur JSON untuk memastikan pengiriman data kritikal."
      ],
      tags: ["API", "P2P", "Channeling"],
      status: "Completed",
      icon: Link
    },
    {
      title: "Modul Pelaporan & Integrasi Core Banking",
      role: "IT Product Owner Manager",
      description: "Modernisasi sistem pelaporan regulatori dan rekonsiliasi data pada infrastruktur core banking. Solusi ini memastikan kepatuhan 100% terhadap regulasi OJK melalui sinkronisasi data SLIK yang akurat, serta mengotomatisasi manajemen penagihan yang membantu pemulihan aset (loan recovery) senilai Rp 15 miliar dalam satu tahun fiskal melalui identifikasi dini kredit macet.",
      image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1200&auto=format&fit=crop",
      techStack: "Delphi, MySQL, Internal Core System, API Integration",
      responsibilities: [
        "Analisis kepatuhan regulasi perbankan terkait status pelaporan SLIK (Written-off loans).",
        "Menyelesaikan isu sistemik dan error pada sinkronisasi penagihan (billing).",
        "Memastikan integritas data transaksi harian dengan sistem pelaporan eksternal.",
        "Integrasi API dengan Loan Origination System (LOS)."
      ],
      tags: ["Core Banking", "SLIK", "Reporting"],
      status: "Completed",
      icon: ShieldCheck
    },
    {
      title: "Sistem Transaksi Finance: RFF",
      role: "Business Analyst",
      description: "Merevolusi manajemen keuangan internal dengan menggantikan proses persetujuan dana berbasis kertas menjadi sistem workflow digital yang seamless. Inisiatif ini mempercepat siklus Request for Funding (RFF) sebesar 70%, memberikan visibilitas pengeluaran secara real-time bagi manajemen, dan memastikan audit trail yang ketat untuk mencegah kebocoran anggaran operasional.",
      image: "https://images.unsplash.com/photo-1554224154-26032ffc0d07?q=80&w=1200&auto=format&fit=crop",
      techStack: "PHP, MySQL, BPMN, Open Project",
      responsibilities: [
        "Pembuatan BRD untuk kontrol finansial dan approval matrix.",
        "Pemodelan alur RFF dengan flowchart untuk identifikasi bottleneck persetujuan manual.",
        "Kolaborasi dengan tim engineer untuk validasi limit pendanaan dan audit trail otomatis."
      ],
      tags: ["Finance", "Workflow", "Automation"],
      status: "Completed",
      icon: CreditCard
    },
    {
      title: "Bank Sampah GoGreen",
      role: "IT Product Owner Manager",
      description: "Bank Sampah GoGreen adalah solusi transformasi digital di sektor ESG yang mengintegrasikan ekosistem pengelolaan sampah secara end-to-end. Mengubah paradigma pengelolaan sampah tradisional menjadi platform ekonomi sirkular yang terintegrasi, sistem ini memfasilitasi transaksi real-time antara nasabah, pengelola bank sampah, dan pengepul. Melalui fitur pelacakan lokasi drop-off dan manajemen stok yang akurat, proyek ini berhasil meningkatkan partisipasi masyarakat dalam pemilahan sampah serta memberikan dampak ekonomi langsung bagi pengguna melalui insentif digital yang terukur.",
      image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=1200&auto=format&fit=crop",
      techStack: "React Native, Node.js, MySQL, Firebase, Google Maps API",
      responsibilities: [
        "Modul Bank Sampah Untuk Nasabah, Bank Sampah & Pengepul.",
        "Modul Daftar Bank Sampah & Lokasi Drop-off.",
        "Modul BACK OFFICE - Approval Aktivasi Nasabah.",
        "Modul BANK SAMPAH - List & Kelola Request Drop-off.",
        "Modul BANK SAMPAH - Stock Management & Inventory.",
        "Modul BANK SAMPAH - Request Pick Up (Pengepul).",
        "Modul BANK SAMPAH - Master Harga Sampah (PPL).",
        "Modul BANK SAMPAH - Laporan Transaksi & Dampak Lingkungan."
      ],
      tags: ["ESG", "Sustainability", "Fintech"],
      status: "Completed",
      icon: Cpu
    }
  ],
  certifications: [
    "SAP Business One Essential – NASBA",
    "Certified Business Intelligence (2018)",
    "Leadership & Managerial Excellence Program (2019)",
    "Foundation Program Leader – Binus University (2020)",
    "E-Commerce Web Development (Ruby on Rails) (2021)"
  ]
};

const SectionHeading = ({ children, icon: Icon }: { children: React.ReactNode, icon: any }) => (
  <div className="flex items-center gap-3 mb-8">
    <div className="p-2 bg-indigo-600 rounded-lg text-white shadow-lg shadow-indigo-200 dark:shadow-indigo-900/20">
      <Icon size={20} />
    </div>
    <h2 className="text-2xl font-display font-bold tracking-tight text-slate-800 dark:text-white uppercase">{children}</h2>
  </div>
);

export default function App() {
  const [selectedProject, setSelectedProject] = React.useState<any>(null);
  const [editingProject, setEditingProject] = React.useState<any>(null);

  const [activeFilter, setActiveFilter] = React.useState<string>("All");
  const [user, setUser] = React.useState<FirebaseUser | null>(null);
  const [isEditMode, setIsEditMode] = React.useState(false);
  const [showUnsavedChangesPrompt, setShowUnsavedChangesPrompt] = React.useState(false);
  const [draftToRestore, setDraftToRestore] = React.useState<any>(null);
  const [projects, setProjects] = React.useState<any[]>([]);
  const [experience, setExperience] = React.useState<any[]>([]);
  const [showUrlPromptId, setShowUrlPromptId] = React.useState<string | null>(null);
  const [urlPromptValue, setUrlPromptValue] = React.useState("");
  
  // Sync editing project state
  React.useEffect(() => {
    if (selectedProject && isEditMode) {
      if (!editingProject || editingProject.id !== selectedProject.id) {
        const p = projects.find(proj => proj.id === selectedProject.id) || selectedProject;
        setEditingProject({ ...p });
      }
    } else {
      if (editingProject) setEditingProject(null);
    }
  }, [selectedProject, isEditMode, projects, editingProject?.id]);

  React.useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (hasProjectChanges()) {
        e.preventDefault();
        e.returnValue = '';
        return '';
      }
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [editingProject, projects]);

  const [lastAutoSave, setLastAutoSave] = React.useState<number | null>(null);

  React.useEffect(() => {
    if (editingProject && isEditMode) {
      const original = projects.find(p => p.id === editingProject.id) || (selectedProject?.id === editingProject.id ? selectedProject : null);
      if (!original) return;

      const isChanged = JSON.stringify(editingProject) !== JSON.stringify(original);
      
      if (isChanged) {
        localStorage.setItem(`project_draft_${editingProject.id}`, JSON.stringify({
          data: editingProject,
          timestamp: Date.now()
        }));
        setLastAutoSave(Date.now());
      }
    }
  }, [editingProject, isEditMode, projects, selectedProject]);

  // Check for draft when selecting a project
  React.useEffect(() => {
    if (selectedProject && isEditMode) {
      const savedDraft = localStorage.getItem(`project_draft_${selectedProject.id}`);
      if (savedDraft) {
        try {
          const { data, timestamp } = JSON.parse(savedDraft);
          // Only offer to restore if it's within 24 hours
          if (Date.now() - timestamp < 24 * 60 * 60 * 1000) {
            // Only show if it's actually different from current
            const p = projects.find(proj => proj.id === selectedProject.id) || selectedProject;
            const isDifferent = JSON.stringify(data) !== JSON.stringify(p);
            if (isDifferent) {
              setDraftToRestore(data);
            }
          } else {
            localStorage.removeItem(`project_draft_${selectedProject.id}`);
          }
        } catch (e) {
          console.error("Failed to parse draft", e);
        }
      }
    } else {
      setDraftToRestore(null);
    }
  }, [selectedProject, isEditMode, projects]);

  const [profile, setProfile] = React.useState<any>(CV_DATA);
  const [isSeeding, setIsSeeding] = React.useState(false);
  const [isDarkMode, setIsDarkMode] = React.useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme');
      if (saved) return saved === 'dark';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });
  const [deleteConfirm, setDeleteConfirm] = React.useState<{id: string, type: 'project' | 'experience', title?: string} | null>(null);
  const [previewImage, setPreviewImage] = React.useState<string | null>(null);

  // Apply dark mode
  React.useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  // Check if admin
  const isAdmin = user && (user.email === 'riyadi83@gmail.com' || user.email === 'dpermanariyadi@gmail.com');

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUser(u);
    });
    return () => unsubscribe();
  }, []);

  React.useEffect(() => {
    // Fetch projects
    const qProjects = query(collection(db, 'projects'), orderBy('order', 'asc'));
    const unsubProjects = onSnapshot(qProjects, (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setProjects(data);
    });

    // Fetch experience
    const qExp = query(collection(db, 'experience'), orderBy('order', 'asc'));
    const unsubExp = onSnapshot(qExp, (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setExperience(data);
    });

    // Fetch profile
    const unsubProfile = onSnapshot(doc(db, 'settings', 'profile'), (snapshot) => {
      if (snapshot.exists()) {
        setProfile((prev: any) => ({ ...prev, ...snapshot.data() }));
      }
    });

    return () => {
      unsubProjects();
      unsubExp();
      unsubProfile();
    };
  }, []);

  const seedDatabase = async () => {
    if (!isAdmin) return;
    setIsSeeding(true);
    try {
      // Seed Projects
      // Fetch latest projects directly from Firestore to check for existing ones accurately
      const { getDocs } = await import('firebase/firestore');
      const projectSnap = await getDocs(collection(db, 'projects'));
      const existingProjectTitles = projectSnap.docs.map(doc => doc.data().title);
      
      for (let i = 0; i < CV_DATA.projects.length; i++) {
        const p = CV_DATA.projects[i];
        if (existingProjectTitles.includes(p.title)) continue;
        
        const iconName = Object.keys(ICON_MAP).find(key => ICON_MAP[key] === p.icon) || 'Smartphone';
        await addDoc(collection(db, 'projects'), { ...p, icon: null, iconName, order: existingProjectTitles.length + i });
      }

      // Seed Experience
      const expSnap = await getDocs(collection(db, 'experience'));
      const existingExpIdentities = expSnap.docs.map(e => `${e.data().company}-${e.data().role}`);
      
      for (let i = 0; i < CV_DATA.experience.length; i++) {
        const exp = CV_DATA.experience[i];
        if (existingExpIdentities.includes(`${exp.company}-${exp.role}`)) continue;
        await addDoc(collection(db, 'experience'), { ...exp, order: existingExpIdentities.length + i });
      }

      // Seed Profile
      const profileSnap = await getDoc(doc(db, 'settings', 'profile'));
      if (!profileSnap.exists()) {
        await setDoc(doc(db, 'settings', 'profile'), {
          name: CV_DATA.name,
          role: CV_DATA.role,
          summary: CV_DATA.summary,
          location: CV_DATA.location,
          phone: CV_DATA.phone,
          email: CV_DATA.email,
          certifications: CV_DATA.certifications
        });
      }
      alert("Missing default data has been synced!");
    } catch (err) {
      console.error(err);
      alert("Failed to sync data.");
    } finally {
      setIsSeeding(false);
    }
  };

  const deleteProject = (id: string, e: React.MouseEvent, title?: string) => {
    e.stopPropagation();
    console.log("🗑️ Delete confirmation triggered for project:", title || id);
    
    if (!id) {
      console.warn("🚫 Delete aborted: No project ID provided (likely demo data)");
      alert("This project is currently using demo data. Please 'Sync Missing Data' from the CMS toolbar first if you want to manage it in the database.");
      return;
    }

    setDeleteConfirm({ id, type: 'project', title });
  };

  const executeDelete = async () => {
    if (!deleteConfirm) return;
    const { id, type } = deleteConfirm;
    
    console.log(`📡 Executing ${type} delete for ID:`, id);
    setDeleteConfirm(null);

    try {
      await deleteDoc(doc(db, type === 'project' ? 'projects' : 'experience', id));
      console.log(`✅ ${type} deleted successfully`);
    } catch (err) { 
      console.error(`💀 ${type} deletion failed:`, err);
      const errorMessage = err instanceof Error ? err.message : String(err);
      alert("Delete failed: " + errorMessage); 
    }
  };

  const updateProjectStatus = async (id: string, status: string, e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await updateDoc(doc(db, 'projects', id), { status });
    } catch (err) { alert("Update failed"); }
  };

  const categories = ["All", "Fintech", "Banking", "API", "ESG", "Finance"];
  
  const projectsToDisplay = projects.length > 0 ? projects : CV_DATA.projects;
  const experienceToDisplay = experience.length > 0 ? experience : CV_DATA.experience;

  const filteredProjects = activeFilter === "All" 
    ? projectsToDisplay 
    : projectsToDisplay.filter((p: any) => p.tags?.some((t: string) => t.includes(activeFilter)) || p.tags?.includes(activeFilter));

  const handleLogin = async () => {
    try {
      await signInWithGoogle();
    } catch (err) {
      console.error(err);
    }
  };

  const EditableField = ({ value, onBlur, className, type = 'input', placeholder = '', label = 'Field' }: any) => {
    const [localValue, setLocalValue] = React.useState(value);
    const [isFocused, setIsFocused] = React.useState(false);
    
    React.useEffect(() => {
      setLocalValue(value);
    }, [value]);

    if (!isEditMode) return null;

    const InputTag = type === 'textarea' ? 'textarea' : 'input';
    const isChanged = localValue !== value;

    return (
      <div className="relative group w-full">
        <AnimatePresence>
          {(isFocused || isChanged) && (
            <motion.div 
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 5 }}
              className="absolute -top-6 left-0 z-50 flex items-center gap-2"
            >
              <div className={`px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-widest flex items-center gap-1 shadow-sm ${isChanged ? 'bg-amber-500 text-white' : 'bg-indigo-600 text-white'}`}>
                {isChanged ? <Save size={8} /> : <Edit2 size={8} />}
                {isChanged ? `Saving ${label}...` : `Editing ${label}`}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
        <InputTag
          value={localValue}
          onFocus={() => setIsFocused(true)}
          onChange={(e: any) => setLocalValue(e.target.value)}
          onBlur={() => {
            setIsFocused(false);
            if (localValue !== value) onBlur(localValue);
          }}
          className={`${className} transition-all duration-200 ${isFocused ? 'ring-2 ring-indigo-500 bg-white dark:bg-slate-900 shadow-md' : ''} ${isChanged ? 'border-amber-400 dark:border-amber-600' : ''} ${type === 'textarea' ? 'pr-4' : 'pr-8'}`}
          placeholder={placeholder}
          rows={type === 'textarea' ? 6 : 1}
        />
        <div className={`absolute right-2 ${type === 'textarea' ? 'top-3' : 'top-1/2 -translate-y-1/2'} transition-all ${isFocused ? 'text-indigo-600 opacity-100' : 'text-indigo-400 opacity-50'} pointer-events-none`}>
          {isChanged ? <Save size={12} className="animate-pulse" /> : <Edit2 size={12} />}
        </div>
      </div>
    );
  };

  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const cvInputRef = React.useRef<HTMLInputElement>(null);
  const companyLogoInputRef = React.useRef<HTMLInputElement>(null);
  const uploadTargetRef = React.useRef<{id: string, type: 'project' | 'experience'} | null>(null);
  const [uploadingForId, setUploadingForId] = React.useState<string | null>(null);
  const [uploadingType, setUploadingType] = React.useState<'project' | 'experience' | null>(null);
  const [isUploading, setIsUploading] = React.useState(false);
  const [isUploadingCV, setIsUploadingCV] = React.useState(false);

  const performUpload = async (blob: Blob, target: {id: string, type: 'project' | 'experience'}) => {
    setIsUploading(true);
    setUploadingForId(target.id);
    setUploadingType(target.type);

    try {
      console.log(`🛰️ Converting ${target.type} image to Base64...`);
      
      // Compress the image before converting to Base64 to prevent exceeding Firestore 1MB document limit
      const compressImage = (fileBlob: Blob): Promise<string> => {
        return new Promise((resolve, reject) => {
          const img = new Image();
          img.src = URL.createObjectURL(fileBlob);
          img.onload = () => {
            const canvas = document.createElement('canvas');
            const MAX_WIDTH = 1000;
            const MAX_HEIGHT = 1000;
            let width = img.width;
            let height = img.height;

            if (width > height) {
              if (width > MAX_WIDTH) {
                height *= MAX_WIDTH / width;
                width = MAX_WIDTH;
              }
            } else {
              if (height > MAX_HEIGHT) {
                width *= MAX_HEIGHT / height;
                height = MAX_HEIGHT;
              }
            }
            canvas.width = width;
            canvas.height = height;
            const ctx = canvas.getContext('2d');
            if (ctx) {
              ctx.drawImage(img, 0, 0, width, height);
              resolve(canvas.toDataURL('image/jpeg', 0.8));
            } else {
              reject(new Error("Canvas context is null"));
            }
          };
          img.onerror = reject;
        });
      };

      const base64Url = await compressImage(blob);
      
      const docRef = doc(db, target.type === 'project' ? 'projects' : 'experience', target.id);
      const updateData = target.type === 'project' ? { image: base64Url } : { logo: base64Url };
      await updateDoc(docRef, updateData);

      // Update with final URL (base64)
      if (target.type === 'project') {
        if (selectedProject && selectedProject.id === target.id) {
          setSelectedProject((p: any) => ({ ...p, image: base64Url }));
        }
        setEditingProject((p: any) => p && p.id === target.id ? { ...p, image: base64Url } : p);
        setProjects((prev) => prev.map(p => p.id === target.id ? { ...p, image: base64Url } : p));
      } else {
        setExperience((prev) => prev.map(e => e.id === target.id ? { ...e, logo: base64Url } : e));
      }
      
      alert(`${target.type === 'project' ? 'Project cover' : 'Company logo'} updated and saved successfully!`);
    } catch (err) {
      console.error("💀 Critical Upload Failure:", err);
      const msg = err instanceof Error ? err.message : String(err);
      alert("Error during upload: " + msg);
    } finally {
      setIsUploading(false);
      setUploadingType(null);
      setUploadingForId(null);
      uploadTargetRef.current = null;
    }
  };

  const handleExperienceLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    const target = uploadTargetRef.current;
    
    if (!file || !target || target.type !== 'experience') return;

    if (file.size > 5 * 1024 * 1024) {
      alert("Logo is too large. Please use a file smaller than 5MB.");
      return;
    }

    // Direct upload instead of cropping
    await performUpload(file, target);
    if (companyLogoInputRef.current) companyLogoInputRef.current.value = '';
  };

  const handleCVUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      setIsUploadingCV(false);
      return;
    }

    if (file.type !== 'application/pdf') {
      alert("Please upload a PDF file for your CV.");
      if (cvInputRef.current) cvInputRef.current.value = '';
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      alert("File is too large. Please use a file smaller than 10MB.");
      if (cvInputRef.current) cvInputRef.current.value = '';
      return;
    }

    if (!window.confirm("Are you sure you want to upload a new CV? This will replace the existing file.")) {
      if (cvInputRef.current) cvInputRef.current.value = '';
      setIsUploadingCV(false);
      return;
    }

    setIsUploadingCV(true);
    try {
      const fileName = `cv/deni-permana-riyadi-cv-${Date.now()}.pdf`;
      const storageRef = ref(storage, fileName);
      
      const uploadTask = uploadBytesResumable(storageRef, file, {
        contentType: 'application/pdf'
      });

      // Handle upload with retries
      const MAX_RETRIES = 3;
      let attempt = 0;
      let uploadResult = null;

      while (attempt < MAX_RETRIES) {
        try {
          uploadResult = await new Promise<any>((resolve, reject) => {
            uploadTask.on('state_changed', null, (error) => reject(error), async () => resolve(uploadTask.snapshot));
          });
          break; // Success
        } catch (error: any) {
          attempt++;
          console.error(`🔥 CV Upload Attempt ${attempt} failed:`, error);
          if (attempt >= MAX_RETRIES) throw error;
          await new Promise(resolve => setTimeout(resolve, 1000 * attempt)); // Exponential backoff
        }
      }

      const downloadURL = await getDownloadURL(uploadResult.ref);
      
      setProfile((p: any) => ({ ...p, cvUrl: downloadURL }));
      await updateDoc(doc(db, 'settings', 'profile'), { cvUrl: downloadURL });
      alert("CV Updated successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to upload CV.");
    } finally {
      setIsUploadingCV(false);
      if (cvInputRef.current) cvInputRef.current.value = '';
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    const target = uploadTargetRef.current;
    
    if (!file || !target || target.type !== 'project') return;

    if (file.size > 10 * 1024 * 1024) {
      alert("Image is too large. Please use a file smaller than 10MB.");
      return;
    }

    // Direct upload instead of cropping
    await performUpload(file, target);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const hasProjectChanges = () => {
    if (!isEditMode || !editingProject || !selectedProject) return false;
    const original = projects.find(p => p.id === selectedProject.id) || selectedProject;
    
    const fieldsToCompare = ['title', 'description', 'role', 'techStack', 'image', 'status', 'link', 'github'];
    for (const field of fieldsToCompare) {
      const currentVal = editingProject[field] === undefined ? '' : editingProject[field];
      const originalVal = original[field] === undefined ? '' : original[field];
      if (String(currentVal).trim() !== String(originalVal).trim()) return true;
    }
    
    // Compare responsibilities (array)
    const originalResp = original.responsibilities || [];
    const currentResp = editingProject.responsibilities || [];
    if (originalResp.length !== currentResp.length) return true;
    for (let i = 0; i < originalResp.length; i++) {
      if (originalResp[i] !== currentResp[i]) return true;
    }
    
    // Compare tags (array)
    const originalTags = original.tags || [];
    const currentTags = editingProject.tags || [];
    if (originalTags.length !== currentTags.length) return true;
    for (let i = 0; i < originalTags.length; i++) {
      if (originalTags[i] !== currentTags[i]) return true;
    }
    
    return false;
  };

  const handleCloseProjectModal = () => {
    if (hasProjectChanges()) {
      setShowUnsavedChangesPrompt(true);
    } else {
      setSelectedProject(null);
    }
  };

  const handleSaveProjectEdits = async () => {
    if (!editingProject || !editingProject.id) return;
    
    try {
      // Create a clean copy for Firestore
      const { id, ...dataToSave } = editingProject;
      await updateDoc(doc(db, 'projects', id), dataToSave);
      
      // Clear auto-save draft
      localStorage.removeItem(`project_draft_${id}`);
      
      alert("Project details saved successfully!");
      setEditingProject(null);
      setSelectedProject(null);
    } catch (err) {
      console.error("Failed to save project:", err);
      alert("Failed to save project details. Please try again.");
    }
  };

  const triggerUpload = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    console.log("🎯 triggerUpload called for project ID:", id);
    if (!id) {
      alert("This project is currently using fallback data. Please 'Sync Missing Data' from the CMS toolbar first.");
      return;
    }
    // Pre-set states for visual feedback
    uploadTargetRef.current = { id, type: 'project' };
    setUploadingForId(id);
    setUploadingType('project');
    
    // Reset file input value to allow re-upload of same file
    if (fileInputRef.current) fileInputRef.current.value = '';
    
    // Trigger file dialog
    fileInputRef.current?.click();
  };

  const triggerLogoUpload = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    console.log("🎯 triggerLogoUpload called for experience ID:", id);
    if (!id) {
      alert("This experience is currently using fallback data. Please 'Sync Missing Data' from the CMS toolbar first.");
      return;
    }
    // Pre-set states for visual feedback
    uploadTargetRef.current = { id, type: 'experience' };
    setUploadingForId(id);
    setUploadingType('experience');
    
    // Reset logo input value to allow re-upload of same file
    if (companyLogoInputRef.current) companyLogoInputRef.current.value = '';
    
    // Trigger file dialog
    companyLogoInputRef.current?.click();
  };

  const handleOnDragEnd = async (result: DropResult) => {
    if (!result.destination || !isEditMode) return;

    const items: any[] = Array.from(filteredProjects);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    // Update local state immediately for snappy UI
    setProjects(prev => {
      const newFullList = [...prev];
      // Get the original orders of the items being reordered
      const originalOrders = [...filteredProjects].map(p => p.order).sort((a, b) => a - b);
      
      // Map the new order to these original order values
      const itemsWithNewOrders = items.map((item, index) => ({
        ...item,
        order: originalOrders[index]
      }));

      const itemsMap = new Map(itemsWithNewOrders.map(item => [item.id, item]));
      
      const updatedList = newFullList.map(p => itemsMap.has(p.id) ? itemsMap.get(p.id)! : p);
      return updatedList.sort((a, b) => a.order - b.order);
    });

    // Persist to Firestore
    try {
      // Get the original orders again for persistence
      const originalOrders = [...filteredProjects].map(p => p.order).sort((a, b) => a - b);
      const batchPromises = items.map((item: any, index: number) => 
        updateDoc(doc(db, 'projects', item.id), { order: originalOrders[index] })
      );
      await Promise.all(batchPromises);
    } catch (err) {
      console.error("Failed to update order:", err);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300 flex flex-col font-sans selection:bg-indigo-100 dark:selection:bg-indigo-900/40">
      {/* CMS Toolbar */}
      {isAdmin && (
        <div className="bg-indigo-600 dark:bg-indigo-700 text-white px-6 py-2 flex items-center justify-between sticky top-0 z-[60] shadow-xl shadow-indigo-500/20">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-2 text-xs font-black uppercase tracking-widest">
              <Settings size={14} className="animate-spin-slow" /> CMS Console
            </span>
            <div className="h-4 w-px bg-white/20" />
            
            <button 
              onClick={seedDatabase} 
              disabled={isSeeding}
              className={`text-[10px] font-bold uppercase transition-all px-3 py-1 rounded-md flex items-center gap-2 ${
                projects.length === 0 
                ? 'bg-amber-400 text-slate-900 animate-pulse shadow-[0_0_15px_rgba(251,191,36,0.5)]' 
                : 'bg-white/20 hover:bg-white/30'
              }`}
            >
              <Database size={12} /> {isSeeding ? 'Syncing...' : projects.length === 0 ? 'Sync Required (Database Empty)' : 'Sync Defaults'}
            </button>

            {!isEditMode ? (
              <button 
                onClick={() => setIsEditMode(true)}
                className="text-[10px] font-black uppercase px-4 py-1.5 bg-white text-indigo-600 rounded-full hover:bg-indigo-50 transition-all flex items-center gap-2 shadow-inner"
              >
                <Edit2 size={12} /> Enter Edit Mode
              </button>
            ) : (
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => setIsEditMode(false)}
                  className="text-[10px] font-black uppercase px-4 py-1.5 bg-green-500 text-white rounded-full hover:bg-green-600 transition-all flex items-center gap-2 shadow-lg"
                >
                  <Save size={12} /> Save All Changes
                </button>
                <button 
                  onClick={() => {
                    if (window.confirm("Discard all current edits?")) {
                      setIsEditMode(false);
                      window.location.reload(); // Hard reset to discard any onBlur saved changes that haven't been reverted
                    }
                  }}
                  className="text-[10px] font-black uppercase px-4 py-1.5 bg-slate-800 text-slate-300 rounded-full hover:bg-red-600 hover:text-white transition-all flex items-center gap-2"
                >
                  <X size={12} /> Cancel
                </button>
              </div>
            )}
          </div>
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-1.5 bg-white/10 hover:bg-white/20 rounded-md transition-all flex items-center gap-2 text-[10px] uppercase font-bold"
              title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              {isDarkMode ? <Sun size={14} /> : <Moon size={14} />}
              Theme
            </button>
            <button onClick={logout} className="text-[10px] font-bold uppercase flex items-center gap-2 hover:text-indigo-200 transition-colors">
              <LogOut size={14} /> Exit
            </button>
          </div>
        </div>
      )}

      {/* Hidden File Inputs for Uploads */}
      <input 
        type="file" 
        ref={fileInputRef} 
        className="hidden" 
        accept="image/*"
        onChange={handleFileUpload}
      />
      <input 
        type="file" 
        ref={cvInputRef} 
        className="hidden" 
        accept=".pdf"
        onChange={handleCVUpload}
      />
      <input 
        type="file" 
        ref={companyLogoInputRef} 
        className="hidden" 
        accept="image/*"
        onChange={handleExperienceLogoUpload}
      />

      {/* Header Section */}
      <header className={`min-h-24 py-4 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex flex-col md:flex-row items-center justify-between px-6 md:px-10 shadow-sm z-50 gap-4 ${isAdmin ? '' : 'sticky top-0'}`}>
        <div className="flex flex-col items-center md:items-start text-center md:text-left group relative w-full md:w-auto min-w-[200px]">
          {isEditMode ? (
            <EditableField 
              value={profile.name} 
              label="Full Name"
              onBlur={async (v: string) => {
                setProfile((p: any) => ({ ...p, name: v }));
                await updateDoc(doc(db, 'settings', 'profile'), { name: v });
              }}
              className="text-xl md:text-3xl font-bold tracking-tight text-slate-900 dark:text-white uppercase font-display leading-tight bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded px-2 outline-none w-full"
            />
          ) : (
            <h1 className="text-xl md:text-3xl font-bold tracking-tight text-slate-900 dark:text-white uppercase font-display leading-tight">
              {profile.name}
            </h1>
          )}
          
          {isEditMode ? (
            <EditableField 
              value={profile.role} 
              label="Professional Role"
              onBlur={async (v: string) => {
                setProfile((p: any) => ({ ...p, role: v }));
                await updateDoc(doc(db, 'settings', 'profile'), { role: v });
              }}
              className="mt-1 text-indigo-600 dark:text-indigo-400 font-bold tracking-wider text-[10px] md:sm uppercase lg:mt-1 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded px-2 outline-none w-full"
            />
          ) : (
            <p className="text-indigo-600 dark:text-indigo-400 font-bold tracking-wider text-[10px] md:sm uppercase lg:mt-1">
              {profile.role}
            </p>
          )}
        </div>
        <div className="flex gap-3 md:gap-4 w-full md:w-auto justify-center">
          <div className="hidden lg:flex items-center gap-2 px-3 md:px-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-[9px] md:text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400 whitespace-nowrap">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse shrink-0"></span>
            Available For New Projects
          </div>
          <button 
            onClick={() => {
              const element = document.getElementById('contact-section');
              if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
                element.classList.add('ring-2', 'ring-indigo-500', 'ring-offset-4', 'transition-all');
                setTimeout(() => {
                  element.classList.remove('ring-2', 'ring-indigo-500', 'ring-offset-4');
                }, 2000);
              }
            }}
            className="group flex-1 md:flex-none relative overflow-hidden bg-indigo-600 dark:bg-indigo-500 text-white px-6 md:px-10 py-2.5 md:py-3 rounded-2xl text-[11px] md:text-sm font-black uppercase tracking-[0.2em] hover:bg-indigo-700 dark:hover:bg-indigo-400 transition-all shadow-[0_10px_30px_-10px_rgba(79,70,229,0.5)] dark:shadow-none hover:shadow-[0_20px_40px_-10px_rgba(79,70,229,0.6)] active:scale-95 whitespace-nowrap flex items-center justify-center gap-3 border border-indigo-400/30"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-from)_0%,_transparent_70%)] from-indigo-400/20 transition-opacity duration-300" />
            <Mail size={16} className="relative z-10 group-hover:rotate-12 transition-transform duration-300" />
            <span className="relative z-10">Hire Me</span>
          </button>
          
          <div className="flex gap-2 flex-1 md:flex-none">
            {profile.cvUrl ? (
              <a 
                href={profile.cvUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex-1 md:flex-none bg-white dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 px-5 md:px-6 py-2 md:py-2.5 rounded-xl text-[11px] md:text-sm font-bold hover:bg-slate-50 dark:hover:bg-slate-700 transition-all shadow-sm active:scale-95 whitespace-nowrap flex items-center justify-center gap-2"
              >
                <FileText size={14} className="text-indigo-600 dark:text-indigo-400" />
                {isUploadingCV ? 'Uploading...' : 'Download CV'}
              </a>
            ) : (
              <button 
                disabled={!isEditMode || isUploadingCV}
                onClick={() => cvInputRef.current?.click()}
                className={`flex-1 md:flex-none px-5 md:px-6 py-2 md:py-2.5 rounded-xl text-[11px] md:text-sm font-bold whitespace-nowrap border transition-all flex items-center justify-center gap-2 ${
                  isEditMode 
                    ? "bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 border-indigo-200 dark:border-indigo-800 hover:bg-indigo-100 dark:hover:bg-indigo-900/40" 
                    : "bg-slate-50 dark:bg-slate-800 text-slate-400 dark:text-slate-500 border-slate-200 dark:border-slate-700 opacity-50 cursor-not-allowed"
                }`}
              >
                {isUploadingCV ? 'Uploading...' : 'Download CV'}
              </button>
            )}

            {isEditMode && profile.cvUrl && (
              <button 
                onClick={() => cvInputRef.current?.click()}
                className="p-2.5 bg-slate-900 text-white rounded-xl hover:bg-indigo-600 transition-all shadow-md active:scale-95 group relative"
                title="Update CV (PDF)"
              >
                <Camera size={14} />
                <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-slate-900 text-[8px] rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">Change CV</span>
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl mx-auto w-full flex flex-col lg:flex-row p-6 md:p-8 gap-8 overflow-x-hidden">
        
        {/* Left Column: Sidebar Details */}
        <aside className="lg:w-1/3 flex flex-col gap-6">
          {/* About Section */}
          <motion.section 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="theme-card"
          >
            <h2 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-3">About Me</h2>
            {isEditMode ? (
              <EditableField 
                value={profile.summary}
                type="textarea"
                label="Summary"
                onBlur={async (v: string) => {
                  setProfile((p: any) => ({ ...p, summary: v }));
                  await updateDoc(doc(db, 'settings', 'profile'), { summary: v });
                }}
                className="w-full text-slate-600 dark:text-slate-300 text-sm leading-relaxed bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded p-2 outline-none"
              />
            ) : (
              <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                {profile.summary}
              </p>
            )}
          </motion.section>

          {/* Contact Info */}
          <motion.section 
            id="contact-section"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="theme-card"
          >
            <h2 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-4">Contact</h2>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded flex items-center justify-center">
                  <Mail size={14} />
                </div>
                {isEditMode ? (
                  <EditableField 
                    value={profile.email}
                    label="Email Address"
                    onBlur={async (v: string) => {
                      setProfile((p: any) => ({ ...p, email: v }));
                      await updateDoc(doc(db, 'settings', 'profile'), { email: v });
                    }}
                    className="flex-1 text-sm text-slate-600 dark:text-slate-300 font-medium bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded px-2 outline-none"
                  />
                ) : (
                  <div className="flex-1 group relative">
                    <a href={`mailto:${profile.email}`} className="text-sm text-slate-600 dark:text-slate-300 font-medium hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">{profile.email}</a>
                    <button 
                      onClick={() => {
                        navigator.clipboard.writeText(profile.email);
                        // Optional: trigger some toast or subtle feedback
                      }}
                      className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity p-1 bg-slate-100 dark:bg-slate-800 rounded hover:bg-slate-200 dark:hover:bg-slate-700"
                      title="Copy Email"
                    >
                      <Copy size={10} className="text-slate-400" />
                    </button>
                  </div>
                )}
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded flex items-center justify-center">
                  <Phone size={14} />
                </div>
                {isEditMode ? (
                  <EditableField 
                    value={profile.phone}
                    label="Phone Number"
                    onBlur={async (v: string) => {
                      setProfile((p: any) => ({ ...p, phone: v }));
                      await updateDoc(doc(db, 'settings', 'profile'), { phone: v });
                    }}
                    className="flex-1 text-sm text-slate-600 dark:text-slate-300 font-medium bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded px-2 outline-none"
                  />
                ) : (
                  <span className="text-sm text-slate-600 dark:text-slate-300 font-medium">{profile.phone}</span>
                )}
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded flex items-center justify-center">
                  <MapPin size={14} />
                </div>
                {isEditMode ? (
                  <EditableField 
                    value={profile.location}
                    label="Location"
                    onBlur={async (v: string) => {
                      setProfile((p: any) => ({ ...p, location: v }));
                      await updateDoc(doc(db, 'settings', 'profile'), { location: v });
                    }}
                    className="flex-1 text-sm text-slate-600 dark:text-slate-300 font-medium bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded px-2 outline-none"
                  />
                ) : (
                  <span className="text-sm text-slate-600 dark:text-slate-300 font-medium">{profile.location}</span>
                )}
              </div>
            </div>
          </motion.section>

          {/* Skills / Expertise */}
          <motion.section 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-indigo-900 p-6 rounded-xl text-white shadow-lg lg:flex-1"
          >
            <h2 className="text-xs font-bold text-indigo-300 uppercase tracking-widest mb-6">Expertise</h2>
            <div className="space-y-6">
              {CV_DATA.competencies.map((cat, idx) => (
                <div key={idx}>
                  <p className="text-[10px] uppercase font-bold text-indigo-400 mb-3 tracking-tighter">{cat.title}</p>
                  <div className="flex flex-wrap gap-2">
                    {cat.skills.map((skill, sIdx) => (
                      <span key={sIdx} className="px-3 py-1 bg-indigo-800 rounded-md text-[11px] font-medium border border-indigo-700/50">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.section>
        </aside>

        {/* Right Column: Main Timeline/Portfolio */}
        <div className="lg:w-2/3 flex flex-col gap-6">
          {/* Projects Section */}
          <motion.section
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="theme-card pt-8"
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 px-2 gap-5">
              <div className="flex items-center gap-3">
                <h2 className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em]">Featured Projects</h2>
                {isEditMode && (
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={async () => {
                        await addDoc(collection(db, 'projects'), {
                          title: "New Project",
                          description: "Description here",
                          role: "Your Role",
                          image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c",
                          techStack: "React, Firebase",
                          responsibilities: ["Lead development"],
                          tags: ["New"],
                          status: "In Progress",
                          iconName: "Smartphone",
                          order: projects.length
                        });
                      }}
                      className="p-1 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
                      title="Add Project"
                    >
                      <Plus size={12} />
                    </button>

                    <button 
                      onClick={() => setIsEditMode(false)}
                      className="flex items-center gap-1.5 px-3 py-1 bg-green-600 text-white text-[10px] font-black uppercase tracking-widest rounded-md hover:bg-green-700 transition-all shadow-sm"
                    >
                      <Save size={12} /> Save
                    </button>

                    <button 
                      onClick={() => {
                        if (window.confirm("Are you sure you want to discard your changes and exit edit mode?")) {
                          setIsEditMode(false);
                        }
                      }}
                      className="flex items-center gap-1.5 px-3 py-1 bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-[10px] font-black uppercase tracking-widest rounded-md hover:bg-slate-300 dark:hover:bg-slate-700 transition-all shadow-sm"
                    >
                      <X size={12} /> Cancel
                    </button>
                  </div>
                )}
              </div>
              <div className="flex flex-wrap gap-2 sm:justify-end">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveFilter(cat)}
                    className={`px-3 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-wider transition-all active:scale-95 ${
                      activeFilter === cat 
                        ? "bg-indigo-600 text-white shadow-lg shadow-indigo-200 ring-2 ring-indigo-600 ring-offset-2" 
                        : "bg-white dark:bg-slate-800 text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-700 hover:border-indigo-300 dark:hover:border-indigo-800 hover:text-indigo-600 dark:hover:text-indigo-400"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <DragDropContext onDragEnd={handleOnDragEnd}>
              <Droppable droppableId="projects" direction="horizontal" isDropDisabled={!isEditMode}>
                {(provided) => (
                  <div 
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className="grid sm:grid-cols-2 gap-4"
                  >
                    <AnimatePresence mode="popLayout">
                      {filteredProjects.map((project: any, index: number) => (
                        <TypedDraggable 
                          key={project.id || `demo-project-${index}`} 
                          draggableId={project.id || `demo-project-${index}`} 
                          index={index}
                          isDragDisabled={!isEditMode}
                        >
                          {(draggableProvided, snapshot) => (
                            <motion.div
                              ref={draggableProvided.innerRef}
                              {...draggableProvided.draggableProps}
                              layout
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ 
                                opacity: 1, 
                                y: 0,
                                scale: snapshot.isDragging ? 1.05 : 1,
                                zIndex: snapshot.isDragging ? 50 : 1
                              }}
                              exit={{ opacity: 0, scale: 0.9 }}
                              transition={{ 
                                type: "spring",
                                stiffness: 300,
                                damping: 25
                              }}
                              whileHover={!snapshot.isDragging ? { 
                                y: -10,
                                scale: 1.02,
                                boxShadow: "0 30px 60px -12px rgba(0, 0, 0, 0.15), 0 18px 36px -18px rgba(0, 0, 0, 0.2)"
                              } : {}}
                              whileTap={!snapshot.isDragging ? { scale: 0.98 } : {}}
                              onClick={() => !snapshot.isDragging && setSelectedProject(project)}
                              className={`rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 hover:border-indigo-300/50 dark:hover:border-indigo-800/50 transition-all duration-300 group cursor-pointer overflow-hidden shadow-sm shadow-slate-200/50 relative ${snapshot.isDragging ? 'shadow-2xl ring-2 ring-indigo-500 ring-offset-4 dark:ring-offset-slate-950' : ''}`}
                            >
                              {/* Glow Aura - Subtle Indigo bloom on hover */}
                              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-0">
                                <div className="absolute inset-[-10px] bg-indigo-500/5 dark:bg-indigo-500/10 blur-2xl" />
                              </div>
                              {/* Drag Handle Overlay */}
                              {isEditMode && project.id && (
                                <div 
                                  {...draggableProvided.dragHandleProps}
                                  className="absolute top-2 left-2 z-40 p-2 bg-indigo-600/90 backdrop-blur-md text-white rounded-xl shadow-lg opacity-0 group-hover:opacity-100 transition-opacity cursor-grab active:cursor-grabbing"
                                  title="Drag to reorder"
                                >
                                  <Layers size={14} />
                                </div>
                              )}

                              {!project.id && (
                                <div className="absolute top-2 left-2 z-40 px-2 py-1 bg-amber-500/90 backdrop-blur-md text-white text-[8px] font-black uppercase tracking-widest rounded-lg shadow-lg">
                                  Demo Content
                                </div>
                              )}

                              {/* Hover Shine Overlay */}
                              <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none z-30" />
                              
                              {isEditMode && (
                                <div className="absolute top-2 right-2 z-40 flex flex-col gap-2">
                                  <button 
                                    onClick={(e) => {
                                      console.log("🖱️ Card delete button triggered for project ID:", project.id);
                                      deleteProject(project.id, e, project.title);
                                    }}
                                    className="p-2 bg-red-500/90 backdrop-blur-md text-white rounded-xl shadow-lg hover:bg-red-600 transition-all hover:scale-110 active:scale-95"
                                    title="Delete Project"
                                  >
                                    <Trash2 size={14} />
                                  </button>
                                  <button 
                                    onClick={(e) => triggerUpload(project.id, e)}
                                    className="p-2 bg-indigo-600/90 backdrop-blur-md text-white rounded-xl shadow-lg hover:bg-indigo-700 transition-all hover:scale-110 active:scale-95"
                                    title="Upload Image"
                                  >
                                    <Camera size={14} />
                                  </button>
                                  <button 
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setShowUrlPromptId(project.id);
                                      setUrlPromptValue(project.image);
                                    }}
                                    className="p-2 bg-slate-800/90 backdrop-blur-md text-white rounded-xl shadow-lg hover:bg-slate-900 transition-all hover:scale-110 active:scale-95"
                                    title="Change Link"
                                  >
                                    <Link size={14} />
                                  </button>
                                </div>
                              )}

                              <div className="aspect-video overflow-hidden relative group/cover cursor-zoom-in">
                                <motion.img 
                                  layoutId={`project-image-${project.id}`}
                                  src={project.image} 
                                  alt={project.title} 
                                  onClick={(e) => {
                                    if (!isEditMode) {
                                      e.stopPropagation();
                                      setPreviewImage(project.image);
                                    }
                                  }}
                                  className="w-full h-full object-cover group-hover:scale-110 transition-all duration-700 ease-in-out"
                                  referrerPolicy="no-referrer"
                                  loading="lazy"
                                />
                                
                                {isEditMode && (
                                  <div 
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      triggerUpload(project.id, e);
                                    }}
                                    className="absolute inset-0 z-30 bg-slate-900/40 opacity-0 group-hover/cover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2 cursor-pointer backdrop-blur-[2px]"
                                  >
                                    <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white transform scale-90 group-hover/cover:scale-100 transition-transform">
                                      <Camera size={24} />
                                    </div>
                                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white drop-shadow-md">Change Cover</span>
                                  </div>
                                )}

                                <div className="absolute inset-0 bg-indigo-600/0 group-hover:bg-indigo-600/10 transition-colors z-10 duration-500" />
                                <img 
                                  src={project.image} 
                                  alt={project.title} 
                                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
                                  referrerPolicy="no-referrer"
                                  loading="lazy"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent flex items-end p-4 z-20">
                                  <div className="flex justify-between items-end w-full">
                                    <motion.div 
                                      initial={false}
                                      whileHover={{ rotate: 360, scale: 1.2 }}
                                      transition={{ type: "spring", stiffness: 200, damping: 10 }}
                                      className="w-9 h-9 rounded-xl bg-indigo-600/80 backdrop-blur-md border border-white/30 flex items-center justify-center text-white shadow-lg"
                                    >
                                      {React.createElement(ICON_MAP[project.iconName || 'Smartphone'] || Smartphone, { size: 18 })}
                                    </motion.div>
                                    <div className="flex flex-col items-end gap-1">
                                      {isEditMode ? (
                                        <select 
                                          value={project.status}
                                          onClick={(e) => e.stopPropagation()}
                                          onChange={(e) => updateProjectStatus(project.id, e.target.value, e as any)}
                                          className="text-[9px] font-bold bg-slate-900/80 text-white rounded px-1 outline-none"
                                        >
                                          <option value="Completed">Completed</option>
                                          <option value="In Progress">In Progress</option>
                                          <option value="On Hold">On Hold</option>
                                        </select>
                                      ) : (
                                        <span className={`text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-lg backdrop-blur-md border border-white/20 text-white shadow-sm ${
                                          project.status === "Completed" ? "bg-green-500/40" : 
                                          project.status === "In Progress" ? "bg-amber-500/40" : "bg-slate-500/40"
                                        }`}>
                                          {project.status}
                                        </span>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="p-5">
                                <div className="flex items-center gap-2 mb-2">
                                  <motion.h3 
                                    layoutId={`project-title-${project.id}`}
                                    className="font-bold text-slate-800 dark:text-white text-sm group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors line-clamp-1"
                                  >
                                    {project.title}
                                  </motion.h3>
                                  <div className="h-1 w-1 rounded-full bg-slate-300 dark:bg-slate-700 group-hover:bg-indigo-400 transition-colors" />
                                </div>
                                <p className="text-[11px] text-slate-500 dark:text-slate-400 mb-5 line-clamp-2 leading-relaxed group-hover:text-slate-600 dark:group-hover:text-slate-300 transition-colors">{project.description}</p>
                                
                                <div className="flex items-center gap-2 mb-4 group/stack">
                                  <div className="h-px flex-1 bg-slate-100 dark:bg-slate-800 group-hover:bg-indigo-100 dark:group-hover:bg-indigo-900/50 transition-colors" />
                                  <span className="text-[9px] font-black text-slate-300 dark:text-slate-600 group-hover:text-indigo-400 dark:group-hover:text-indigo-500 uppercase tracking-widest px-2 transition-colors">Stack</span>
                                  <div className="h-px flex-1 bg-slate-100 dark:bg-slate-800 group-hover:bg-indigo-100 dark:group-hover:bg-indigo-900/50 transition-colors" />
                                </div>
           
                                <p className="text-[10px] text-slate-400 dark:text-slate-500 font-medium mb-5 truncate group-hover:text-slate-700 dark:group-hover:text-slate-300 transition-colors italic">
                                  {project.techStack}
                                </p>
                                <div className="flex flex-wrap gap-1.5">
                                  {project.tags.map((tag: string, tIdx: number) => (
                                    <span 
                                      key={tIdx} 
                                      className="text-[9px] font-bold uppercase tracking-tight px-2 py-0.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-400 dark:text-slate-500 rounded-md group-hover:border-indigo-100 dark:group-hover:border-indigo-900 group-hover:bg-indigo-50 dark:group-hover:bg-indigo-900/30 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-all hover:scale-105 duration-200"
                                    >
                                      {tag}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </TypedDraggable>
                      ))}
                      {provided.placeholder}
                    </AnimatePresence>
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          </motion.section>

          <motion.section 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white dark:bg-slate-900 p-8 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm"
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-5">
              <h2 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">Professional Experience</h2>
              {isEditMode && (
                <div className="flex items-center gap-2">
                  <button 
                    onClick={async () => {
                      await addDoc(collection(db, 'experience'), {
                        company: "Company Name",
                        role: "Your Role",
                        period: "Period",
                        highlights: ["New highlight"],
                        order: experience.length
                      });
                    }}
                    className="flex items-center gap-2 text-[10px] font-bold uppercase py-1 px-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors shadow-sm"
                  >
                    <Plus size={14} /> Add Experience
                  </button>

                  <button 
                    onClick={() => setIsEditMode(false)}
                    className="flex items-center gap-1.5 px-3 py-1 bg-green-600 text-white text-[10px] font-black uppercase tracking-widest rounded-md hover:bg-green-700 transition-all shadow-sm"
                  >
                    <Save size={12} /> Save
                  </button>

                  <button 
                    onClick={() => {
                      if (window.confirm("Are you sure you want to discard your changes and exit edit mode?")) {
                        setIsEditMode(false);
                      }
                    }}
                    className="flex items-center gap-1.5 px-3 py-1 bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-[10px] font-black uppercase tracking-widest rounded-md hover:bg-slate-300 dark:hover:bg-slate-700 transition-all shadow-sm"
                  >
                    <X size={12} /> Cancel
                  </button>
                </div>
              )}
            </div>
            <div className="space-y-12">
              {experienceToDisplay.map((exp: any, idx: number) => (
                <div key={exp.id || `demo-exp-${idx}`} className="timeline-line group relative pb-4">
                  {!exp.id && (
                    <div className="absolute -left-12 top-6 z-40 px-2 py-1 bg-amber-500/90 backdrop-blur-md text-white text-[8px] font-black uppercase tracking-widest rounded-lg shadow-lg">
                      Demo
                    </div>
                  )}
                  {isEditMode && (
                    <div className="absolute -left-12 top-0 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button 
                        onClick={() => {
                          console.log("🗑️ Experience delete confirmation triggered for:", exp.company);
                          if (!exp.id) {
                            alert("Cannot delete demo data. Please 'Sync Missing Data' first.");
                            return;
                          }
                          setDeleteConfirm({ id: exp.id, type: 'experience', title: exp.company });
                        }}
                        className="p-1.5 bg-red-100 text-red-600 rounded-md hover:bg-red-200 transition-colors"
                      >
                        <Trash2 size={12} />
                      </button>
                      <button 
                        onClick={(e) => triggerLogoUpload(exp.id, e)}
                        className="p-1.5 bg-indigo-100 text-indigo-600 rounded-md"
                        title="Upload Company Logo"
                      >
                        <Camera size={12} />
                      </button>
                    </div>
                  )}
                  <div className={`timeline-dot ${idx === 0 ? 'bg-indigo-600' : 'bg-slate-300'}`}></div>
                  
                  <div className="flex gap-4">
                    {/* Company Logo Display */}
                    <div className="shrink-0 pt-1 flex flex-col items-center">
                      {exp.logo ? (
                        <div className="w-10 h-10 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 overflow-hidden shadow-sm flex items-center justify-center p-1 group/logo relative">
                          <img 
                            src={exp.logo} 
                            alt={exp.company} 
                            className="w-full h-full object-contain"
                          />
                          {isEditMode && (
                            <button 
                              onClick={(e) => triggerLogoUpload(exp.id, e)}
                              className="absolute inset-0 bg-indigo-600/60 opacity-0 group-hover/logo:opacity-100 flex items-center justify-center text-white transition-opacity"
                            >
                              <Camera size={14} />
                            </button>
                          )}
                        </div>
                      ) : (
                        <div className={`w-10 h-10 rounded-xl border border-dashed flex items-center justify-center transition-colors ${
                          isEditMode 
                            ? 'border-indigo-300 bg-indigo-50/30 text-indigo-400 hover:border-indigo-400 hover:bg-indigo-50 cursor-pointer' 
                            : 'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 text-slate-300 dark:text-slate-700'
                        }`}
                        onClick={(e) => isEditMode && triggerLogoUpload(exp.id, e)}
                        >
                          <Briefcase size={18} />
                        </div>
                      )}
                      
                      {isEditMode && (
                        <button 
                          onClick={(e) => triggerLogoUpload(exp.id, e)}
                          className="mt-2 group/upload flex items-center gap-1.5 px-3 py-1 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-lg hover:bg-green-600 hover:text-white dark:hover:bg-green-500 dark:hover:text-white transition-all shadow-sm border border-indigo-100 dark:border-indigo-900/50"
                        >
                          <Camera size={12} className="group-hover/upload:hidden" />
                          <Save size={12} className="hidden group-hover/upload:block" />
                          <span className="text-[10px] font-black uppercase tracking-widest whitespace-nowrap">Upload & Save Logo</span>
                        </button>
                      )}
                    </div>

                    <div className="flex-1">
                      <div className="flex flex-col md:flex-row justify-between items-start mb-2 gap-2">
                        {isEditMode ? (
                          <EditableField 
                            value={exp.role}
                            label="Job Title"
                            onBlur={async (v: string) => {
                              await updateDoc(doc(db, 'experience', exp.id), { role: v });
                            }}
                            className="text-lg font-bold text-slate-800 dark:text-white bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded px-2 outline-none"
                          />
                        ) : (
                          <h3 className="text-lg font-bold text-slate-800 dark:text-white">{exp.role}</h3>
                        )}
                        
                        {isEditMode ? (
                          <EditableField 
                            value={exp.period}
                            label="Duration"
                            onBlur={async (v: string) => {
                              await updateDoc(doc(db, 'experience', exp.id), { period: v });
                            }}
                            className="text-[10px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 px-3 py-1 rounded-full uppercase tracking-wider outline-none"
                          />
                        ) : (
                          <span className="text-[10px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 px-3 py-1 rounded-full uppercase tracking-wider">
                            {exp.period}
                          </span>
                        )}
                      </div>

                      {isEditMode ? (
                        <EditableField 
                          value={exp.company}
                          label="Company Name"
                          onBlur={async (v: string) => {
                            await updateDoc(doc(db, 'experience', exp.id), { company: v });
                          }}
                          className="text-indigo-600 dark:text-indigo-400 text-sm font-semibold mb-4 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded px-2 outline-none"
                        />
                      ) : (
                        <p className="text-indigo-600 dark:text-indigo-400 text-sm font-semibold mb-4">{exp.company}</p>
                      )}

                      <ul className="space-y-3">
                        {exp.highlights.map((h: string, hIdx: number) => (
                          <li key={hIdx} className="text-slate-500 dark:text-slate-400 text-xs leading-relaxed flex gap-2">
                            <span className="text-indigo-300 dark:text-indigo-700 mt-0.5">•</span>
                            {isEditMode ? (
                              <EditableField 
                                value={h}
                                label={`Highlight #${hIdx + 1}`}
                                onBlur={async (v: string) => {
                                  const newH = [...exp.highlights];
                                  newH[hIdx] = v;
                                  await updateDoc(doc(db, 'experience', exp.id), { highlights: newH });
                                }}
                                className="flex-1 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded px-2 outline-none"
                              />
                            ) : h}
                          </li>
                        ))}
                        {isEditMode && (
                          <button 
                            onClick={async () => {
                              const newH = [...exp.highlights, "New highlight"];
                              await updateDoc(doc(db, 'experience', exp.id), { highlights: newH });
                            }}
                            className="text-[10px] font-bold text-indigo-400 hover:text-indigo-600 pl-5"
                          >
                            + Add Highlight
                          </button>
                        )}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.section>

          {/* Education and Certs Row */}
          <div className="grid md:grid-cols-2 gap-6">
            <motion.section 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="theme-card"
            >
              <h2 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-4">Education</h2>
              <div className="space-y-6">
                {CV_DATA.education.map((edu, idx) => (
                  <div key={`edu-${idx}`}>
                    <h3 className="text-sm font-bold text-slate-800 dark:text-white">{edu.degree}</h3>
                    <p className="text-slate-500 dark:text-slate-400 text-[11px] font-medium">{edu.school}</p>
                    <p className="text-indigo-600 dark:text-indigo-400 text-[10px] font-bold mt-1 uppercase tracking-tighter">{edu.year}</p>
                  </div>
                ))}
              </div>
            </motion.section>
            
            <motion.section 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="theme-card"
            >
              <h2 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-4">Certifications</h2>
              <div className="space-y-2">
                {CV_DATA.certifications.slice(0, 5).map((cert, idx) => (
                  <div key={`cert-${idx}`} className="flex flex-col">
                    <h3 className="text-xs font-bold text-slate-800 dark:text-white leading-tight mb-0.5 line-clamp-1 truncate">{cert}</h3>
                  </div>
                ))}
                {CV_DATA.certifications.length > 5 && (
                  <p className="text-[10px] text-indigo-600 dark:text-indigo-400 font-bold uppercase mt-2">Plus {CV_DATA.certifications.length - 5} others</p>
                )}
              </div>
            </motion.section>
          </div>
        </div>
      </main>

      {/* Footer Bar */}
      <footer className="h-auto md:h-14 py-6 md:py-0 bg-slate-900 flex flex-col md:flex-row items-center justify-between px-10 text-[10px] text-slate-400 uppercase tracking-widest gap-4">
        <div className="flex items-center gap-4">
          <span>Built with React & Professional Polish</span>
          <div className="h-3 w-px bg-slate-700" />
          <button 
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="flex items-center gap-2 hover:text-white transition-colors cursor-pointer"
          >
            {isDarkMode ? <Sun size={12} /> : <Moon size={12} />}
            {isDarkMode ? 'Light Mode' : 'Dark Mode'}
          </button>
          {!user && (
            <>
              <div className="h-3 w-px bg-slate-700" />
              <button onClick={handleLogin} className="flex items-center gap-2 hover:text-white transition-colors">
                <LogIn size={12} /> Admin Login
              </button>
            </>
          )}
        </div>
        <span>© {new Date().getFullYear()} {profile.name}. All Rights Reserved.</span>
        <div className="flex gap-6">
          <a href="https://www.linkedin.com/in/dpr83" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">LinkedIn</a>
          <span className="hover:text-white transition-colors cursor-pointer">GitHub</span>
          <a href={`mailto:${profile.email}`} className="hover:text-white transition-colors">Email</a>
        </div>
      </footer>

      {/* Project Detail Modal */}
      <AnimatePresence>
        {selectedProject && (() => {
          const currentProject = isEditMode ? (editingProject || selectedProject) : (projects.find(p => p.id === selectedProject.id) || selectedProject);
          return (
            <div className="fixed inset-0 z-[60] flex items-center justify-center p-3 sm:p-6 lg:p-8">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={handleCloseProjectModal}
                className="absolute inset-0 bg-slate-900/80 backdrop-blur-md"
              />
              <motion.div
                layoutId={`project-card-${currentProject.id}`}
                className="relative w-full max-w-3xl bg-white dark:bg-slate-900 rounded-[2rem] shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
              >
                {/* Draft Restoration Prompt */}
                <AnimatePresence>
                  {draftToRestore && (
                    <motion.div 
                      initial={{ opacity: 0, y: -20, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -20, scale: 0.95 }}
                      className="absolute top-20 left-1/2 -translate-x-1/2 z-[55] w-full max-w-sm px-4"
                    >
                      <div className="bg-indigo-600 dark:bg-indigo-500 text-white p-5 rounded-3xl shadow-[0_20px_50px_rgba(79,70,229,0.4)] flex flex-col gap-4 border border-indigo-400/30 backdrop-blur-xl">
                        <div className="flex items-center gap-4">
                          <div className="p-3 bg-white/20 rounded-2xl">
                            <History size={24} />
                          </div>
                          <div className="flex-1">
                            <h4 className="text-sm font-black uppercase tracking-widest leading-none mb-1">Unsaved Progress Found</h4>
                            <p className="text-[10px] opacity-90 leading-tight">We found a local backup with unsaved changes. Would you like to restore it?</p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <button 
                            onClick={() => {
                              setEditingProject(draftToRestore);
                              setDraftToRestore(null);
                            }}
                            className="flex-1 px-4 py-2.5 bg-white text-indigo-600 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-indigo-50 transition-all active:scale-95 shadow-lg"
                          >
                            Restore Version
                          </button>
                          <button 
                            onClick={() => {
                              localStorage.removeItem(`project_draft_${selectedProject.id}`);
                              setDraftToRestore(null);
                            }}
                            className="px-4 py-2.5 bg-indigo-700/50 hover:bg-indigo-700 text-white rounded-xl text-[10px] font-black uppercase tracking-widest transition-all active:scale-95"
                          >
                            Discard
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="relative aspect-video shrink-0 overflow-hidden bg-slate-100 dark:bg-slate-800 group cursor-zoom-in">
                  <motion.img 
                    layoutId={`project-image-${currentProject.id}`}
                    src={currentProject.image} 
                    alt={currentProject.title} 
                    onClick={() => !isEditMode && setPreviewImage(currentProject.image)}
                    className="w-full h-full object-cover transition-all duration-700"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                  />
                  
                  {isEditMode && (
                    <div className="absolute inset-0 flex items-center justify-center bg-slate-900/10 hover:bg-slate-900/40 backdrop-blur-[0px] hover:backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-all duration-300 z-10 flex-col gap-3 p-4">
                      <button 
                        onClick={(e) => triggerUpload(currentProject.id, e)}
                        className="bg-white/90 backdrop-blur-md text-slate-900 px-6 py-3 rounded-2xl flex items-center gap-2 shadow-2xl scale-90 group-hover:scale-100 transition-all hover:bg-green-600 hover:text-white active:scale-95 group/uploadbtn"
                      >
                        <Camera size={20} className="text-indigo-600 group-hover/uploadbtn:hidden" />
                        <Save size={20} className="hidden group-hover/uploadbtn:block" />
                        <span className="font-bold text-sm">Upload & Save Cover</span>
                      </button>
                      <button 
                        onClick={async (e) => {
                          e.stopPropagation();
                          setShowUrlPromptId(currentProject.id);
                          setUrlPromptValue(currentProject.image);
                        }}
                        className="bg-slate-900/80 backdrop-blur-md text-white px-6 py-2 rounded-xl flex items-center gap-2 shadow-2xl scale-90 group-hover:scale-100 transition-all hover:bg-slate-900 active:scale-95 text-xs"
                      >
                        <Link size={14} className="text-indigo-400" />
                        <span>Use Image URL</span>
                      </button>
                    </div>
                  )}
                  
                  <div className="absolute top-4 right-4 flex items-center gap-2 z-20">
                    {isEditMode ? (
                      <div className="flex items-center gap-3">
                        <AnimatePresence>
                          {lastAutoSave && (
                            <motion.div 
                              initial={{ opacity: 0, x: 20 }}
                              animate={{ opacity: 1, x: 0 }}
                              exit={{ opacity: 0 }}
                              className="bg-indigo-600/20 backdrop-blur-md px-3 py-1.5 rounded-full border border-indigo-500/30 flex items-center gap-2"
                            >
                              <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-pulse" />
                              <span className="text-[9px] font-black text-indigo-400 uppercase tracking-widest">Draft Saved</span>
                            </motion.div>
                          )}
                        </AnimatePresence>
                        <button 
                          onClick={handleSaveProjectEdits}
                          className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-full flex items-center gap-2 shadow-2xl transition-all active:scale-95 border border-indigo-500/50"
                        >
                          <Save size={18} />
                          <span className="font-black text-[10px] uppercase tracking-widest hidden sm:inline">Save Project</span>
                        </button>
                        <button 
                          onClick={handleCloseProjectModal}
                          className="p-2.5 bg-slate-900/50 backdrop-blur-xl hover:bg-red-600 rounded-full transition-all text-white active:scale-90"
                          title="Cancel"
                        >
                          <X size={20} />
                        </button>
                      </div>
                    ) : (
                      <button 
                        onClick={handleCloseProjectModal}
                        className="p-2.5 bg-slate-900/50 backdrop-blur-xl hover:bg-indigo-600 rounded-full transition-all text-white active:scale-90"
                      >
                        <X size={20} />
                      </button>
                    )}
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-slate-900 via-transparent to-transparent opacity-60" />
                </div>

                {/* Unsaved Changes Confirmation Dialog */}
                <AnimatePresence>
                  {showUnsavedChangesPrompt && (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="absolute inset-0 z-[70] flex items-center justify-center p-6 bg-slate-900/40 dark:bg-slate-900/60 backdrop-blur-md"
                    >
                      <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-3xl max-w-sm w-full text-center border border-slate-200 dark:border-slate-700">
                        <div className="w-16 h-16 bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 rounded-full flex items-center justify-center mx-auto mb-6">
                            <AlertCircle size={32} />
                        </div>
                        <h3 className="text-xl font-black text-slate-900 dark:text-white mb-3">Unsaved Changes</h3>
                        <p className="text-slate-500 dark:text-slate-400 text-sm mb-8 leading-relaxed">
                          You have unsaved changes. Are you sure you want to discard them?
                        </p>
                        <div className="flex flex-col gap-3">
                          <button 
                            onClick={async () => {
                              await handleSaveProjectEdits();
                              setShowUnsavedChangesPrompt(false);
                            }}
                            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-black py-4 rounded-2xl flex items-center justify-center gap-2 transition-all active:scale-95 shadow-xl shadow-indigo-200 dark:shadow-none uppercase text-xs tracking-widest"
                          >
                            <Save size={18} />
                            Save Changes
                          </button>
                          <div className="flex gap-3">
                            <button 
                              onClick={() => {
                                if (editingProject?.id) {
                                  localStorage.removeItem(`project_draft_${editingProject.id}`);
                                }
                                setShowUnsavedChangesPrompt(false);
                                setEditingProject(null);
                                setSelectedProject(null);
                              }}
                              className="flex-1 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/40 font-black py-4 rounded-2xl transition-all active:scale-95 uppercase text-[10px] tracking-widest"
                            >
                              Discard
                            </button>
                            <button 
                              onClick={() => setShowUnsavedChangesPrompt(false)}
                              className="flex-1 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600 font-black py-4 rounded-2xl transition-all active:scale-95 uppercase text-[10px] tracking-widest"
                            >
                              Go Back
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 }}
                  className="flex-1 overflow-y-auto custom-scrollbar p-6 sm:p-8 lg:p-10"
                >
                  {isEditMode ? (
                     <div className="space-y-4 mb-10">
                       <div className="flex flex-col gap-1">
                         <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">Project Title</label>
                         <EditableField 
                          value={currentProject.title}
                          label="Project Title"
                          onBlur={async (v: string) => {
                            setEditingProject((prev: any) => ({ ...prev, title: v }));
                          }}
                          className="text-2xl font-black w-full border-b border-slate-200 dark:border-slate-700 outline-none focus:border-indigo-500 bg-transparent text-slate-900 dark:text-white"
                          placeholder="Project Title"
                         />
                       </div>
                       
                       <div className="flex flex-col gap-1">
                         <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">Description</label>
                         <EditableField 
                          value={currentProject.description}
                          type="textarea"
                          label="Full Description"
                          onBlur={async (v: string) => {
                            setEditingProject((prev: any) => ({ ...prev, description: v }));
                          }}
                          className="text-sm w-full border-b border-slate-200 dark:border-slate-700 outline-none focus:border-indigo-500 bg-slate-50 dark:bg-slate-800 p-2 rounded text-slate-600 dark:text-slate-300"
                          placeholder="Project Description"
                         />
                       </div>

                       <div className="flex flex-col gap-1">
                         <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Image URL</label>
                         <EditableField 
                          value={currentProject.image}
                          label="Image URL"
                          onBlur={async (v: string) => {
                            setEditingProject((prev: any) => ({ ...prev, image: v }));
                          }}
                          className="text-xs w-full bg-slate-50 border border-slate-200 rounded p-2 outline-none focus:ring-2 ring-indigo-500"
                          placeholder="Image URL (Unsplash or direct link)"
                         />
                       </div>

                       <div className="flex flex-col gap-1">
                         <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Core Role</label>
                         <EditableField 
                          value={currentProject.role}
                          label="Project Role"
                          onBlur={async (v: string) => {
                            setEditingProject((prev: any) => ({ ...prev, role: v }));
                          }}
                          className="text-xs w-full bg-slate-50 border border-slate-200 rounded p-2 outline-none focus:ring-2 ring-indigo-500"
                          placeholder="Project Role"
                         />
                       </div>

                       <div className="flex flex-col gap-1">
                         <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Stack & Tools (Comma separated)</label>
                         <EditableField 
                          value={currentProject.techStack}
                          label="Tech Stack"
                          onBlur={async (v: string) => {
                            setEditingProject((prev: any) => ({ ...prev, techStack: v }));
                          }}
                          className="text-xs w-full bg-slate-50 border border-slate-200 rounded p-2 outline-none focus:ring-2 ring-indigo-500"
                          placeholder="React, Firebase, etc."
                         />
                       </div>

                       <div className="flex flex-col gap-1">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Project Status</label>
                        <select 
                          value={currentProject.status || "Completed"}
                          onChange={(e) => setEditingProject((prev: any) => ({ ...prev, status: e.target.value }))}
                          className="text-xs w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded p-2 outline-none focus:ring-2 ring-indigo-500 text-slate-900 dark:text-white"
                        >
                          <option value="Completed">Completed</option>
                          <option value="In Progress">In Progress</option>
                          <option value="Planned">Planned</option>
                        </select>
                       </div>
                     </div>
                  ) : (
                    <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6 mb-10">
                      <div className="w-14 h-14 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shrink-0 shadow-xl shadow-indigo-100 ring-4 ring-indigo-50">
                        {React.createElement(ICON_MAP[currentProject.iconName || 'Smartphone'] || Smartphone, { size: 28 })}
                      </div>
                      <div className="flex-1">
                        <motion.h2 
                          layoutId={`project-title-${currentProject.id}`}
                          className="text-xl sm:text-2xl lg:text-3xl font-display font-black text-slate-900 dark:text-white leading-tight"
                        >
                          {currentProject.title}
                        </motion.h2>
                        <div className="flex flex-wrap gap-2 mt-4">
                          {(currentProject.tags || []).map((tag: string, i: number) => (
                            <span key={`modal-tag-${i}`} className="text-[9px] sm:text-[10px] font-black uppercase tracking-wider py-1 px-3 bg-slate-50 dark:bg-slate-800 text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-700 rounded-lg">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="space-y-10">
                    <section className="bg-slate-50 dark:bg-slate-800/50 p-5 sm:p-6 rounded-2xl border border-slate-100 dark:border-slate-800">
                      <h3 className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-4">Project Overview</h3>
                      <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
                        {currentProject.description}
                      </p>
                    </section>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 lg:gap-12">
                      <section>
                        <h3 className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-4">Core Role</h3>
                        <div className="relative group">
                          <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl opacity-20 dark:opacity-10 blur group-hover:opacity-30 dark:group-hover:opacity-20 transition duration-500" />
                          <p className="relative text-indigo-700 dark:text-indigo-300 font-black text-xs sm:text-sm bg-white dark:bg-slate-900 border border-indigo-100 dark:border-indigo-900/50 px-4 py-3 rounded-xl shadow-sm">
                            {currentProject.role}
                          </p>
                        </div>
                      </section>

                      <section>
                        <h3 className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-4">Project Status</h3>
                        <div className="flex items-center gap-3">
                          <span className={`text-[10px] sm:text-[11px] font-black uppercase py-1.5 px-4 rounded-xl inline-flex items-center gap-2 shadow-sm ${
                            currentProject.status === "Completed" ? "bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-400 ring-1 ring-green-200 dark:ring-green-900/50" :
                            currentProject.status === "In Progress" ? "bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-400 ring-1 ring-amber-200 dark:ring-amber-900/50" : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-400 ring-1 ring-slate-200 dark:ring-slate-700"
                          }`}>
                            <span className={`w-2 h-2 rounded-full ${
                               currentProject.status === "Completed" ? "bg-green-500 animate-pulse" : 
                               currentProject.status === "In Progress" ? "bg-amber-500 animate-pulse" : "bg-slate-500"
                            }`} />
                            {currentProject.status}
                          </span>
                        </div>
                      </section>
                    </div>

                    <section>
                      <h3 className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-4">Stack & Tools</h3>
                      <div className="flex flex-wrap gap-2 md:gap-3">
                        {(currentProject.techStack || "").split(',').map((tech: string, i: number) => (
                          <span key={`modal-stack-${i}`} className="px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 text-[10px] sm:text-xs font-bold rounded-xl hover:border-indigo-200 dark:hover:border-indigo-800 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors shadow-sm">
                            {tech.trim()}
                          </span>
                        ))}
                      </div>
                    </section>

                    <section className="border-t border-slate-100 dark:border-slate-800 pt-10">
                      <div className="flex items-center justify-between mb-8">
                        <div>
                          <h3 className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1">Key Responsibilities & Impact</h3>
                          <p className="text-[10px] text-slate-400">Define your contributions and measurable results</p>
                        </div>
                        {isEditMode && (
                          <button 
                            onClick={async () => {
                              const newR = [...(currentProject.responsibilities || []), "Describe a key achievement or task"];
                              setEditingProject((prev: any) => ({ ...prev, responsibilities: newR }));
                            }}
                            className="flex items-center gap-2 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-[10px] font-black uppercase tracking-widest rounded-lg transition-all shadow-lg shadow-indigo-200 dark:shadow-none active:scale-95"
                          >
                            <Plus size={12} />
                            Add Item
                          </button>
                        )}
                      </div>
                      <div className="grid gap-3">
                        {(currentProject.responsibilities || []).map((res: string, i: number) => (
                          <div key={`modal-res-${i}`} className="flex gap-4 p-4 bg-slate-50/50 dark:bg-slate-800/30 border border-transparent hover:border-indigo-100 dark:hover:border-indigo-900/50 hover:bg-white dark:hover:bg-slate-800/50 rounded-2xl transition-all group relative">
                            <div className="w-8 h-8 rounded-xl bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0 text-xs font-black shadow-sm group-hover:bg-indigo-600 group-hover:text-white transition-colors border border-slate-100 dark:border-slate-800">
                              {i + 1}
                            </div>
                            <div className="flex-1 min-w-0">
                              {isEditMode ? (
                                <EditableField 
                                  value={res}
                                  label={`Responsibility #${i + 1}`}
                                  placeholder="Describe your responsibility..."
                                  onBlur={async (v: string) => {
                                    if (v === res) return;
                                    const newR = [...currentProject.responsibilities];
                                    newR[i] = v;
                                    setEditingProject((prev: any) => ({ ...prev, responsibilities: newR }));
                                  }}
                                  className="w-full text-slate-700 dark:text-slate-200 text-sm leading-relaxed font-medium bg-transparent border-0 focus:ring-0 p-0"
                                />
                              ) : (
                                <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed font-medium py-1">{res}</p>
                              )}
                            </div>
                            {isEditMode && (
                              <button 
                                onClick={async () => {
                                  if (!window.confirm("Delete this responsibility item?")) return;
                                  const newR = currentProject.responsibilities.filter((_: any, idx: number) => idx !== i);
                                  setEditingProject((prev: any) => ({ ...prev, responsibilities: newR }));
                                }}
                                className="p-1.5 bg-red-100 text-red-600 rounded-lg opacity-0 group-hover:opacity-100 hover:bg-red-600 hover:text-white transition-all transform hover:scale-110"
                                title="Delete Item"
                              >
                                <Trash2 size={12} />
                              </button>
                            )}
                          </div>
                        ))}
                      </div>
                    </section>
                  </div>
                </motion.div>
                
                <div className="bg-slate-50/80 dark:bg-slate-950/80 backdrop-blur-md px-6 sm:px-10 py-5 flex items-center justify-between border-t border-slate-200 dark:border-slate-800 shrink-0">
                   <p className="hidden sm:block text-[9px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">
                     Expert Delivery by {CV_DATA.name}
                   </p>
                  <button 
                    onClick={() => setSelectedProject(null)}
                    className="w-full sm:w-auto bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-8 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-indigo-600 dark:hover:bg-indigo-500 hover:text-white transition-all active:scale-95 shadow-lg shadow-slate-200 dark:shadow-none"
                  >
                    Close Case Study
                  </button>
                </div>
              </motion.div>
            </div>
          );
        })()}
      </AnimatePresence>

      <AnimatePresence>
        {deleteConfirm && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-md"
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="bg-white dark:bg-slate-900 p-8 rounded-[2rem] shadow-2xl max-w-md w-full border border-slate-100 dark:border-slate-800"
            >
              <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-2xl flex items-center justify-center mb-6 mx-auto">
                <Trash2 size={32} />
              </div>
              <h3 className="text-xl font-black text-slate-800 dark:text-white text-center mb-2 uppercase tracking-tight">Confirm Deletion</h3>
              <p className="text-slate-600 dark:text-slate-400 text-center mb-8 text-sm leading-relaxed">
                Are you sure you want to delete <span className="font-bold text-slate-800 dark:text-white">"{deleteConfirm.title || 'this item'}"</span>? This action is permanent and cannot be undone.
              </p>
              <div className="flex gap-3">
                <button 
                  onClick={() => setDeleteConfirm(null)}
                  className="flex-1 px-6 py-3 rounded-xl font-bold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={executeDelete}
                  className="flex-1 px-6 py-3 rounded-xl font-bold text-white bg-red-500 hover:bg-red-600 transition-colors shadow-lg shadow-red-200 dark:shadow-none"
                >
                  Delete Now
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>


      {/* URL Input Modal */}
      <AnimatePresence>
        {showUrlPromptId && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-2xl w-full max-w-md border border-slate-200 dark:border-slate-800"
            >
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                <Link size={18} className="text-indigo-500" />
                Change Image URL
              </h3>
              <input
                type="url"
                value={urlPromptValue}
                onChange={(e) => setUrlPromptValue(e.target.value)}
                placeholder="https://..."
                className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl mb-6 text-slate-900 dark:text-white focus:outline-none focus:ring-2 ring-indigo-500"
                autoFocus
              />
              <div className="flex items-center gap-3 justify-end">
                <button
                  onClick={() => setShowUrlPromptId(null)}
                  className="px-5 py-2.5 rounded-xl font-bold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={async () => {
                    const id = showUrlPromptId;
                    const val = urlPromptValue.trim();
                    setShowUrlPromptId(null);
                    
                    if (val) {
                      if (selectedProject && selectedProject.id === id) {
                        setEditingProject((prev: any) => ({ ...prev, image: val }));
                      } else {
                        // Optimistic update
                        setProjects((prev) => prev.map(p => p.id === id ? { ...p, image: val } : p));
                        try {
                          await updateDoc(doc(db, 'projects', id), { image: val });
                        } catch (err) {
                          console.error('Failed to update URL in Firestore', err);
                        }
                      }
                    }
                  }}
                  className="px-5 py-2.5 rounded-xl font-bold bg-indigo-600 hover:bg-indigo-700 text-white transition-colors"
                >
                  Save URL
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Full Screen Image Preview Modal */}
      <AnimatePresence>
        {previewImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setPreviewImage(null)}
            className="fixed inset-0 z-[120] flex items-center justify-center p-4 md:p-10 bg-slate-950/95 backdrop-blur-xl cursor-zoom-out"
          >
            <motion.button
              initial={{ scale: 0, rotate: -90 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: 90 }}
              className="absolute top-6 right-6 p-3 bg-white/10 hover:bg-white/20 text-white rounded-full transition-all z-[130] backdrop-blur-md border border-white/10"
              onClick={(e) => {
                e.stopPropagation();
                setPreviewImage(null);
              }}
            >
              <X size={24} />
            </motion.button>
            <motion.img
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              src={previewImage}
              alt="Preview"
              className="max-w-full max-h-full object-contain rounded-lg shadow-2xl shadow-black/50"
              onClick={(e) => e.stopPropagation()}
              referrerPolicy="no-referrer"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
