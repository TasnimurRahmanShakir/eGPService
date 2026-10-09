export type Language = 'en' | 'bn';

export interface Translations {
  nav: {
    brandName: string;
    brandSub: string;
    links: {
      home: string;
      winningTenders: string;
      services: string;
      about: string;
      contact: string;
    };
    consultationBtn: string;
    consultationCompact: string;
    langToggle: string;
    menuOpen: string;
    menuClose: string;
  };
  hero: {
    line1: string;
    line2: string;
    description: string;
    bullet1: string;
    bullet2: string;
    primaryCta: string;
    secondaryCta: string;
  };
  metrics: {
    yearsExp: string;
    clientsCount: string;
    tendersCount: string;
    satisfaction: string;
    winRate: string;
  };
  clients: {
    eyebrow: string;
    title: string;
  };
  winningTenders: {
    eyebrow: string;
    title: string;
    subtext: string;
    seeMore: string;
    tenderIdPrefix: string;
    viewDetails: string;
    closeDetails: string;
    pageTitle: string;
    pageSubtitle: string;
    searchPlaceholder: string;
    allDepts: string;
    noResultsTitle: string;
    noResultsSub: string;
    filterByDept: string;
    badgeValuePrefix: string;
    ctaBannerTitle: string;
    ctaBannerSub: string;
    ctaBannerBtn: string;
  };
  whyChoose: {
    eyebrow: string;
    title1: string;
    title2: string;
    pillars: {
      p1Title: string;
      p1Desc: string;
      p2Title: string;
      p2Desc: string;
      p3Title: string;
      p3Desc: string;
      p4Title: string;
      p4Desc: string;
    };
    cta: string;
    handwriting: string;
  };
  services: {
    eyebrow: string;
    title1: string;
    title2: string;
    subtext: string;
    items: {
      egpRegTitle: string;
      egpRegDesc: string;
      tenderPrepTitle: string;
      tenderPrepDesc: string;
      liquidAssetTitle: string;
      liquidAssetDesc: string;
      consultancyTitle: string;
      consultancyDesc: string;
      trainingTitle: string;
      trainingDesc: string;
    };
    requestLabel: string;
  };
  projectCost: {
    eyebrow: string;
    title1: string;
    title2: string;
    subtext: string;
    steps: {
      step1: string;
      step2: string;
      step3: string;
      step4: string;
    };
    cta: string;
    preview: {
      activeProject: string;
      budgetUtilized: string;
      projectBudget: string;
      totalExpenses: string;
      remainingBalance: string;
      materialCost: string;
      laborCost: string;
      equipmentRental: string;
      transportLogistics: string;
      liveSync: string;
      statusActive: string;
    };
  };
  compliance: {
    eyebrow: string;
    title: string;
    subtext: string;
    inquireBtn: string;
    items: {
      vatRegTitle: string;
      vatRegDesc: string;
      vatReturnTitle: string;
      vatReturnDesc: string;
      taxRegTitle: string;
      taxRegDesc: string;
      taxReturnTitle: string;
      taxReturnDesc: string;
    };
  };
  whoWeServe: {
    eyebrow: string;
    title1: string;
    title2: string;
    subtext: string;
    handwriting: string;
    chips: {
      govt: string;
      privateCo: string;
      ngos: string;
      entrepreneurs: string;
    };
  };
  finalCta: {
    eyebrow: string;
    title1: string;
    title2: string;
    subtitle: string;
    consultBtn: string;
    callNumber: string;
    handwriting: string;
  };
  footer: {
    brandDesc: string;
    navHeading: string;
    contactHeading: string;
    address: string;
    requestConsult: string;
    facebookLabel: string;
    emergencyHotline: string;
    rightsReserved: string;
  };
  leadModal: {
    eyebrow: string;
    heading: string;
    subheading: string;
    fields: {
      fullName: string;
      fullNamePlaceholder: string;
      company: string;
      companyPlaceholder: string;
      phone: string;
      phonePlaceholder: string;
      tenderRef: string;
      tenderRefPlaceholder: string;
      serviceRequired: string;
      selectService: string;
      message: string;
      messagePlaceholder: string;
    };
    sendBtn: string;
    cancelBtn: string;
    phoneError: string;
    success: {
      title: string;
      subtitle: string;
      callNote: string;
      closeBtn: string;
    };
  };
  stickyBar: {
    callSupport: string;
    whatsApp: string;
  };
  aboutPage: {
    eyebrow: string;
    title1: string;
    title2: string;
    subtitle: string;
    missionTitle: string;
    missionDesc: string;
    visionTitle: string;
    visionDesc: string;
    whyChooseTitle: string;
    whyChooseSub: string;
    statsExp: string;
    statsClients: string;
    statsSubmissions: string;
    statsRate: string;
  };
  contactPage: {
    eyebrow: string;
    heroTitle: string;
    heroSubtitle: string;
    getInTouch: string;
    getInTouchDesc: string;
    labelPhone: string;
    labelWhatsApp: string;
    whatsAppChat: string;
    labelEmail: string;
    labelOffice: string;
    officeAddress: string;
    labelHours: string;
    hoursTime: string;
    inquiryEyebrow: string;
    inquiryHeading: string;
    inquirySubheading: string;
    phoneNoteBefore: string;
    phoneNoteRegarding: string;
    submitAnother: string;
    servicesList: string[];
  };
  mapHubs: {
    dhakaHq: string;
    chattogram: string;
    sylhet: string;
    rajshahi: string;
    khulna: string;
    barishal: string;
    rangpur: string;
    mymensingh: string;
  };
}

export const translations: Record<Language, Translations> = {
  en: {
    nav: {
      brandName: 'e-GP TENDER BD',
      brandSub: 'Professional Tender Consulting',
      links: {
        home: 'Home',
        winningTenders: 'Winning Tenders',
        services: 'Services',
        about: 'About',
        contact: 'Contact',
      },
      consultationBtn: 'Get Consultation',
      consultationCompact: 'Consult',
      langToggle: 'বাংলা',
      menuOpen: 'Open menu',
      menuClose: 'Close menu',
    },
    hero: {
      line1: "Country's First",
      line2: 'Tender & Project Management Solution',
      description: 'End-to-end e-GP bid preparation, technical proposal engineering & compliance management across Bangladesh.',
      bullet1: 'Technical & Financial Bid Responsiveness',
      bullet2: 'Timely e-GP Submission & Banking Coordination',
      primaryCta: 'Get Free Consultation',
      secondaryCta: 'Explore Services',
    },
    metrics: {
      yearsExp: 'Years of Experience',
      clientsCount: 'Clients',
      tendersCount: 'Tender Submissions',
      satisfaction: 'Client Satisfaction',
      winRate: 'Win Rate*',
    },
    clients: {
      eyebrow: 'TRUSTED BY INDUSTRY LEADERS',
      title: 'Empowering Top Construction & Engineering Contractors in Bangladesh',
    },
    winningTenders: {
      eyebrow: 'TRACK RECORD OF SUCCESS',
      title: 'Winning Tenders',
      subtext: 'Some of our top tender winning features & successfully executed bids across Bangladesh.',
      seeMore: 'See More Projects',
      tenderIdPrefix: 'Tender ID: #',
      viewDetails: 'View Details',
      closeDetails: 'Close Details',
      pageTitle: 'Winning Tenders & Success Portfolio',
      pageSubtitle: 'Explore high-value tenders won and successfully executed by our clients through rigorous compliance and technical proposal engineering.',
      searchPlaceholder: 'Search by Tender ID, Project Name, Client or Location...',
      allDepts: 'All Departments',
      noResultsTitle: 'No Matching Tenders Found',
      noResultsSub: 'Try adjusting your search query or department filter.',
      filterByDept: 'Filter by Department:',
      badgeValuePrefix: 'Value:',
      ctaBannerTitle: 'Want to Win Your Next Big Tender?',
      ctaBannerSub: 'Connect with our technical proposal specialists for precise documentation and responsive submissions.',
      ctaBannerBtn: 'Discuss Your Tender Opportunity',
    },
    whyChoose: {
      eyebrow: 'WHY CHOOSE US',
      title1: 'Professional Support.',
      title2: 'Practical Solutions.',
      pillars: {
        p1Title: 'Tender-Focused',
        p1Desc: 'Groundwork rooted in real tender requirements, evaluation criteria and procurement guidelines.',
        p2Title: 'Responsive',
        p2Desc: 'Thorough technical and financial proposal assistance with full document responsiveness.',
        p3Title: 'Deadline-Conscious',
        p3Desc: 'Structured timelines for upload, verification and submission well before closing.',
        p4Title: 'Technology-Enabled',
        p4Desc: 'Digital tracking and software-based project cost management for post-award financial control.',
      },
      cta: 'Get Free Consultation',
      handwriting: 'Practical Solutions, Real Results',
    },
    services: {
      eyebrow: 'OUR SERVICES',
      title1: 'Complete Tender Support',
      title2: 'Under One Roof.',
      subtext: 'Practical guidance, documentation and proposal assistance for your public procurement tenders in Bangladesh.',
      items: {
        egpRegTitle: 'e-GP Registration',
        egpRegDesc: 'Registration, setup and documentation assistance.',
        tenderPrepTitle: 'Tender Preparation & Submission',
        tenderPrepDesc: 'Technical and financial proposal, documentation and e-GP submission support.',
        liquidAssetTitle: 'Liquid Asset / Line of Credit Preparation',
        liquidAssetDesc: 'Financial documentation support for tender participation.',
        consultancyTitle: 'e-GP Consultancy',
        consultancyDesc: 'Practical guidance for e-GP and tender requirements.',
        trainingTitle: 'e-GP Training',
        trainingDesc: 'Hands-on training for individuals and business teams.',
      },
      requestLabel: 'Click to request',
    },
    projectCost: {
      eyebrow: 'PROJECT COST MANAGEMENT',
      title1: 'Manage Project Costs',
      title2: 'in Real Time.',
      subtext: 'A separate software-based solution to record, track and manage project expenses and costs through secure business access.',
      steps: {
        step1: 'Create Projects',
        step2: 'Record Costs',
        step3: 'Track Expenses',
        step4: 'Manage',
      },
      cta: 'Request a Demo',
      preview: {
        activeProject: 'ACTIVE PROJECT',
        budgetUtilized: 'BUDGET UTILIZED',
        projectBudget: 'Total Project Budget',
        totalExpenses: 'Total Expenses Incurred',
        remainingBalance: 'Remaining Cash Balance',
        materialCost: 'Direct Material Procurement',
        laborCost: 'Site Labor & Subcontractor Payroll',
        equipmentRental: 'Heavy Equipment Rental & Fuel',
        transportLogistics: 'Site Transport & Logistics',
        liveSync: 'REAL-TIME TRACKING',
        statusActive: 'Active & Verified',
      },
    },
    compliance: {
      eyebrow: 'BUSINESS COMPLIANCE',
      title: 'Essential Compliance Support.',
      subtext: 'Professional support for essential business registration and filing requirements.',
      inquireBtn: 'Inquire Now',
      items: {
        vatRegTitle: 'VAT Registration',
        vatRegDesc: 'Online business VAT registration and BIN acquisition assistance.',
        vatReturnTitle: 'VAT Return Submission',
        vatReturnDesc: 'Monthly VAT return filing, challan processing and compliance reporting.',
        taxRegTitle: 'Tax Registration',
        taxRegDesc: 'e-TIN corporate and individual tax registration and certificate setup.',
        taxReturnTitle: 'Tax Return Submission',
        taxReturnDesc: 'Annual income tax return preparation, assessment and tax clearance filing.',
      },
    },
    whoWeServe: {
      eyebrow: 'WHO WE SERVE',
      title1: 'We Work With',
      title2: 'Various Organizations',
      subtext: 'From small businesses to large enterprises, we support organizations across different sectors in Bangladesh.',
      handwriting: 'Supporting Businesses, Building Bangladesh',
      chips: {
        govt: 'Government & Semi-Government',
        privateCo: 'Private Companies',
        ngos: 'NGOs & Development Partners',
        entrepreneurs: 'Individual Entrepreneurs',
      },
    },
    finalCta: {
      eyebrow: 'READY TO GET STARTED?',
      title1: "Let's Make Your",
      title2: 'Next Submission Successful.',
      subtitle: 'Get expert tender support and move your business forward with confidence.',
      consultBtn: 'Get Consultation',
      callNumber: '+880 1886-970197',
      handwriting: 'Professional Support, Real Results',
    },
    footer: {
      brandDesc: 'Professional e-GP registration, tender preparation, submission and project cost management solution for businesses in Bangladesh.',
      navHeading: 'Navigation',
      contactHeading: 'Contact & Office',
      address: 'House 6, Road 2/B, Baridhara J Block, Dhaka 1212, Bangladesh',
      requestConsult: 'Request Consultation',
      facebookLabel: 'Facebook: @bdegptender',
      emergencyHotline: 'Emergency Tender Hotline',
      rightsReserved: 'All rights reserved. e-GP Tender BD.',
    },
    leadModal: {
      eyebrow: 'DIRECT CONSULTING INQUIRY',
      heading: 'Tell Us About Your Tender.',
      subheading: 'Have a tender coming up or need help with the e-GP process? Send us the details and our specialists will assist you immediately.',
      fields: {
        fullName: 'Full Name *',
        fullNamePlaceholder: 'e.g. Md. Rafiqul Islam',
        company: 'Company Name',
        companyPlaceholder: 'e.g. Islam Construction & Engineering Ltd.',
        phone: 'Phone Number *',
        phonePlaceholder: '1886-970197',
        tenderRef: 'Tender / Memo Reference (Optional)',
        tenderRefPlaceholder: 'e.g. Tender ID: 948201 or Memo Ref',
        serviceRequired: 'Service Required *',
        selectService: 'Select a Service',
        message: 'Specific Request or Message',
        messagePlaceholder: 'Briefly describe your tender deadline, procurement questions or challenges...',
      },
      sendBtn: 'Send Request',
      cancelBtn: 'Cancel',
      phoneError: 'Please enter a valid 10-11 digit mobile number (e.g. 01886-970197)',
      success: {
        title: 'Thank you! Your request has been received.',
        subtitle: 'We will get in touch with you shortly.',
        callNote: 'Our tender consulting team will call you shortly regarding your request.',
        closeBtn: 'Close Window',
      },
    },
    stickyBar: {
      callSupport: 'Call Support',
      whatsApp: 'WhatsApp',
    },
    aboutPage: {
      eyebrow: 'ABOUT US',
      title1: 'Empowering Contractors & Businesses',
      title2: 'Across Bangladesh.',
      subtitle: 'From initial registration to tender winning and project tracking, we stand by your side.',
      missionTitle: 'Our Mission',
      missionDesc: 'To simplify the government e-GP procurement workflow for Bangladeshi businesses through technical accuracy, deep regulatory understanding and dedicated support.',
      visionTitle: 'Our Vision',
      visionDesc: 'To be the most trusted end-to-end procurement and project consulting partner for contractors and commercial enterprises nationwide.',
      whyChooseTitle: 'Core Value Pillars',
      whyChooseSub: 'Our services are guided by practical expertise and strict adherence to Bangladesh e-GP procurement laws.',
      statsExp: 'Years in Operation',
      statsClients: 'Contractors Served',
      statsSubmissions: 'Bids Processed',
      statsRate: 'Satisfaction Rating',
    },
    contactPage: {
      eyebrow: 'GET IN TOUCH',
      heroTitle: 'Contact Us',
      heroSubtitle: 'Have questions about an upcoming e-GP tender or need consultation? Reach out to our team directly.',
      getInTouch: 'Get in Touch',
      getInTouchDesc: 'Feel free to call, email, or message us on WhatsApp. You can also visit our Dhaka office during working hours.',
      labelPhone: 'Phone',
      labelWhatsApp: 'WhatsApp',
      whatsAppChat: 'Chat on WhatsApp',
      labelEmail: 'Email',
      labelOffice: 'Office Location',
      officeAddress: 'House 6, Road 2/B, Baridhara J Block, Dhaka 1212',
      labelHours: 'Working Hours',
      hoursTime: 'Saturday — Thursday: 9:00 AM – 7:00 PM',
      inquiryEyebrow: 'DIRECT CONSULTING INQUIRY',
      inquiryHeading: 'Tell Us About Your Tender.',
      inquirySubheading: 'Have a tender coming up or need help with the e-GP process? Send us the details and our specialists will assist you immediately.',
      phoneNoteBefore: 'Our tender consulting team will call you shortly at',
      phoneNoteRegarding: 'regarding',
      submitAnother: 'Submit Another Request',
      servicesList: [
        'e-GP Registration',
        'Tender Preparation & Submission',
        'Liquid Asset / Line of Credit Preparation',
        'e-GP Consultancy',
        'e-GP Training',
        'Project Cost Management',
        'VAT Registration',
        'VAT Return Submission',
        'Tax Registration',
        'Tax Return Submission',
      ],
    },
    mapHubs: {
      dhakaHq: 'DHAKA (HQ)',
      chattogram: 'CHATTOGRAM',
      sylhet: 'SYLHET',
      rajshahi: 'RAJSHAHI',
      khulna: 'KHULNA',
      barishal: 'BARISHAL',
      rangpur: 'RANGPUR',
      mymensingh: 'MYMENSINGH',
    },
  },
  bn: {
    nav: {
      brandName: 'ই-জিপি টেন্ডার বিডি',
      brandSub: 'প্রফেশনাল টেন্ডার কনসাল্টিং',
      links: {
        home: 'হোম',
        winningTenders: 'সফল টেন্ডার',
        services: 'সেবাসমূহ',
        about: 'আমাদের সম্পর্কে',
        contact: 'যোগাযোগ',
      },
      consultationBtn: 'ফ্রি পরামর্শ নিন',
      consultationCompact: 'পরামর্শ',
      langToggle: 'English',
      menuOpen: 'মেনু খুলুন',
      menuClose: 'মেনু বন্ধ করুন',
    },
    hero: {
      line1: 'দেশের প্রথম সম্পূর্ণ',
      line2: 'টেন্ডার ও প্রজেক্ট ম্যানেজমেন্ট সলিউশন',
      description: 'সম্পূর্ণ ই-জিপি টেন্ডার প্রস্তুতি, টেকনিক্যাল প্রস্তাবনা প্রণয়ন এবং নিয়মতান্ত্রিক সাবমিশন সহ নির্ভরযোগ্য সহায়তা।',
      bullet1: 'টেকনিক্যাল ও ফিন্যান্সিয়াল প্রস্তাবনার পূর্ণ নির্ভুলতা',
      bullet2: 'সঠিক সময়ে ই-জিপি সাবমিশন ও ব্যাংক কো-অর্ডিনেশন',
      primaryCta: 'ফ্রি পরামর্শ নিন',
      secondaryCta: 'সেবাসমূহ দেখুন',
    },
    metrics: {
      yearsExp: 'বছরের অভিজ্ঞতা',
      clientsCount: 'সম্মানিত ক্লায়েন্ট',
      tendersCount: 'টেন্ডার সাবমিশন',
      satisfaction: 'ক্লায়েন্ট সন্তুষ্টি',
      winRate: 'সফলতার হার*',
    },
    clients: {
      eyebrow: 'দেশের শীর্ষস্থানীয় ঠিকাদারদের আস্থা',
      title: 'বাংলাদেশের নির্মাণ ও ইঞ্জিনিয়ারিং খাতের সফল প্রতিষ্ঠানসমূহের বিশ্বস্ত সঙ্গী',
    },
    winningTenders: {
      eyebrow: 'আমাদের ট্র্যাক রেকর্ড ও সফলতা',
      title: 'সফল টেন্ডারসমূহ',
      subtext: 'আমাদের ক্লায়েন্টদের জিতেছে এমন কিছু শীর্ষস্থানীয় বাস্তবায়িত টেন্ডারের বিবরণ।',
      seeMore: 'সকল প্রজেক্ট দেখুন',
      tenderIdPrefix: 'টেন্ডার আইডি: #',
      viewDetails: 'বিস্তারিত দেখুন',
      closeDetails: 'বন্ধ করুন',
      pageTitle: 'সফল টেন্ডার ও প্রজেক্ট পোর্টফোলিও',
      pageSubtitle: 'আমাদের কারিগরি প্রস্তাবনা ও সঠিক নির্দেশনায় দেশের বিভিন্ন সরকারি অধিদপ্তরে ঠিকাদারদের অর্জিত সফল টেন্ডারসমূহ।',
      searchPlaceholder: 'টেন্ডার আইডি, প্রজেক্টের নাম, ক্লায়েন্ট বা স্থান দিয়ে খুঁজুন...',
      allDepts: 'সকল অধিদপ্তর',
      noResultsTitle: 'কোনো ফলাফল পাওয়া যায়নি',
      noResultsSub: 'আপনার সার্চ বা ডিপার্টমেন্ট ফিল্টার পরিবর্তন করে আবার চেষ্টা করুন।',
      filterByDept: 'ডিপার্টমেন্ট অনুযায়ী ফিল্টার:',
      badgeValuePrefix: 'মূল্য:',
      ctaBannerTitle: 'পরবর্তী বড় টেন্ডারে জয়ী হতে চান?',
      ctaBannerSub: 'সঠিক কাগজপত্র প্রস্তুতি ও টেকনিক্যাল প্রস্তাবনার জন্য আমাদের বিশেষজ্ঞদের সাথে এখনই আলোচনা করুন।',
      ctaBannerBtn: 'আপনার টেন্ডার নিয়ে আলোচনা করুন',
    },
    whyChoose: {
      eyebrow: 'কেন আমাদের বেছে নেবেন',
      title1: 'পেশাদার পরামর্শ।',
      title2: 'কার্যকর সমাধান।',
      pillars: {
        p1Title: 'টেন্ডার-কেন্দ্রিক',
        p1Desc: 'সরকারি টেন্ডারের বাস্তব নিয়মাবলী, মূল্যায়ন মানদণ্ড ও নির্দেশিকা অনুযায়ী পুঙ্খানুপুঙ্খ কাজ।',
        p2Title: 'শতভাগ রেসপনসিভ',
        p2Desc: 'টেকনিক্যাল ও ফিন্যান্সিয়াল প্রস্তাবনার প্রতিটি শর্ত নিখুঁতভাবে পূরণ করা।',
        p3Title: 'সময় সচেতন',
        p3Desc: 'টেন্ডার শেষ সময়ের বহু আগেই আপলোড ও ভেরিফিকেশন সম্পন্ন করা।',
        p4Title: 'প্রযুক্তি নির্ভর',
        p4Desc: 'কাজ পাওয়ার পর প্রজেক্টের খরচ নিয়ন্ত্রণে ডিজিটাল সফটওয়্যার সমাধান।',
      },
      cta: 'ফ্রি পরামর্শ নিন',
      handwriting: 'কার্যকর সমাধান, বাস্তব ফলাফল',
    },
    services: {
      eyebrow: 'আমাদের সেবাসমূহ',
      title1: 'সম্পূর্ণ টেন্ডার সমাধান',
      title2: 'একই ছাদের নিচে।',
      subtext: 'বাংলাদেশে সরকারি ই-জিপি টেন্ডারের সকল প্রকার গাইডলাইন, ডকুমেন্টস এবং প্রস্তাবনা সহায়তা।',
      items: {
        egpRegTitle: 'ই-জিপি রেজিস্ট্রেশন',
        egpRegDesc: 'নতুন অ্যাকাউন্ট খোলা, সেটআপ এবং প্রয়োজনীয় ডকুমেন্ট সহায়তা।',
        tenderPrepTitle: 'টেন্ডার প্রস্তুতি ও সাবমিশন',
        tenderPrepDesc: 'টেকনিক্যাল ও ফিন্যান্সিয়াল অফার তৈরি, কাগজপত্র গুছানো ও চূড়ান্ত সাবমিশন।',
        liquidAssetTitle: 'লিকুইড অ্যাসেট / লাইন অফ ক্রেডিট',
        liquidAssetDesc: 'টেন্ডারে অংশগ্রহণের জন্য ব্যাংকিং আর্থিক সক্ষমতার ডকুমেন্টস প্রস্তুতি।',
        consultancyTitle: 'ই-জিপি কনসালটেন্সি',
        consultancyDesc: 'ই-জিপি ও টেন্ডার বিষয়ক যেকোনো জটিল সমস্যার দ্রুত ও নির্ভরযোগ্য সমাধান।',
        trainingTitle: 'ই-জিপি ট্রেনিং',
        trainingDesc: 'ব্যক্তি ও কর্পোরেট টিমের জন্য প্র্যাকটিক্যাল হ্যান্ডস-অন প্রশিক্ষণ।',
      },
      requestLabel: 'সার্ভিসটি বেছে নিন',
    },
    projectCost: {
      eyebrow: 'প্রজেক্ট কস্ট ম্যানেজমেন্ট',
      title1: 'প্রজেক্টের খরচ নিয়ন্ত্রণ করুন',
      title2: 'রিয়েল-টাইমে।',
      subtext: 'একটি বিশেষ সফটওয়্যার সমাধান যার মাধ্যমে কাজের খরচ রেকর্ড, ট্র্যাক ও মনিটর করা যায় সহজে।',
      steps: {
        step1: 'প্রজেক্ট তৈরি',
        step2: 'খরচ এন্ট্রি',
        step3: 'খরচ ট্র্যাক',
        step4: 'নিয়ন্ত্রণ',
      },
      cta: 'ডেমো দেখতে অনুরোধ করুন',
      preview: {
        activeProject: 'চলমান প্রজেক্ট',
        budgetUtilized: 'বাজেট ব্যবহার',
        projectBudget: 'মোট প্রজেক্ট বাজেট',
        totalExpenses: 'মোট প্রজেক্ট খরচ',
        remainingBalance: 'অবশিষ্ট নগদ ব্যালেন্স',
        materialCost: 'কাঁচামাল কেনাকাটা বাবদ',
        laborCost: 'সাইট শ্রমিক ও মিস্ত্রি বিল',
        equipmentRental: 'যন্ত্রপাতি ভাড়া ও জ্বালানি',
        transportLogistics: 'মালামাল পরিবহন ও সাইট লজিস্টিকস',
        liveSync: 'রিয়েল-টাইম হিসাব',
        statusActive: 'অ্যাক্টিভ ও ভেরিফাইড',
      },
    },
    compliance: {
      eyebrow: 'ব্যবসা ও আইনি কমপ্লায়েন্স',
      title: 'প্রয়োজনীয় বিজনেস কমপ্লায়েন্স।',
      subtext: 'আপনার ব্যবসার ভ্যাট, ট্যাক্স ও যাবতীয় প্রয়োজনীয় আইনি কাগজপত্র প্রস্তুতের সহায়তা।',
      inquireBtn: 'বিস্তারিত জানুন',
      items: {
        vatRegTitle: 'ভ্যাট রেজিস্ট্রেশন',
        vatRegDesc: 'অনলাইন বিজনেস ভ্যাট নিবন্ধন ও নতুন BIN প্রাপ্তিতে সহায়তা।',
        vatReturnTitle: 'ভ্যাট রিটার্ন দাখিল',
        vatReturnDesc: 'প্রতি মাসের ভ্যাট রিটার্ন প্রস্তুত, চালান প্রসেসিং ও সাবমিশন।',
        taxRegTitle: 'ট্যাক্স / ই-টিন রেজিস্ট্রেশন',
        taxRegDesc: 'ব্যক্তিগত ও কর্পোরেট ই-টিন তৈরি ও ট্যাক্স সার্টিফিকেট সংগ্রহ।',
        taxReturnTitle: 'আয়কর রিটার্ন দাখিল',
        taxReturnDesc: 'বার্ষিক আয়কর হিসাব, অ্যাসেসমেন্ট ও ট্যাক্স ক্লিয়ারেন্স ফাইল করা।',
      },
    },
    whoWeServe: {
      eyebrow: 'আমাদের গ্রাহকবৃন্দ',
      title1: 'আমরা কাজ করি',
      title2: 'বিভিন্ন ধরণের প্রতিষ্ঠানের সাথে',
      subtext: 'ছোট ঠিকাদারি প্রতিষ্ঠান থেকে শুরু করে বড় কর্পোরেট ও এনজিও—সবার জন্যই রয়েছে আমাদের বিশেষ সেবা।',
      handwriting: 'ব্যবসার সমৃদ্ধি, দেশ গড়ার অঙ্গীকার',
      chips: {
        govt: 'সরকারি ও আধাসরকারি প্রতিষ্ঠান',
        privateCo: 'প্রাইভেট কোম্পানি ও ঠিকাদার',
        ngos: 'এনজিও ও উন্নয়ন সংস্থা',
        entrepreneurs: 'নতুন উদ্যোক্তা ও সাপ্লায়ার',
      },
    },
    finalCta: {
      eyebrow: 'শুরু করতে প্রস্তুত?',
      title1: 'আসুন আপনার পরবর্তী টেন্ডারটি',
      title2: 'শতভাগ সফল করে তুলি।',
      subtitle: 'অভিজ্ঞ টেন্ডার বিশেষজ্ঞদের সাহায্য নিন এবং আত্মবিশ্বাসের সাথে এগিয়ে যান।',
      consultBtn: 'ফ্রি পরামর্শ নিন',
      callNumber: '+৮৮০ ১৮৮৬-৯৭০১৯৭',
      handwriting: 'পেশাদার পরামর্শ, বাস্তব ফলাফল',
    },
    footer: {
      brandDesc: 'বাংলাদেশে ই-জিপি রেজিস্ট্রেশন, টেন্ডার প্রস্তুতি, সাবমিশন ও প্রজেক্ট কস্ট ম্যানেজমেন্টের পেশাদার সেবা প্রদানকারী।',
      navHeading: 'ন্যাভিগেশন',
      contactHeading: 'যোগাযোগ ও অফিস',
      address: 'বাড়ি ৬, রোড ২/বি, বারিধারা জে ব্লক, ঢাকা ১২১২, বাংলাদেশ',
      requestConsult: 'পরামর্শের অনুরোধ করুন',
      facebookLabel: 'ফেসবুক: @bdegptender',
      emergencyHotline: 'ইমার্জেন্সি টেন্ডার হটলাইন',
      rightsReserved: 'সর্বস্বত্ব সংরক্ষিত। ই-জিপি টেন্ডার বিডি।',
    },
    leadModal: {
      eyebrow: 'সরাসরি কনসাল্টিং অনুরোধ',
      heading: 'আপনার টেন্ডার সম্পর্কে জানান।',
      subheading: 'সামনে কোনো টেন্ডার আছে বা ই-জিপি সংক্রান্ত কোনো প্রশ্ন রয়েছে? বিস্তারিত লিখে পাঠান, আমাদের টিম দ্রুত যোগাযোগ করবে।',
      fields: {
        fullName: 'আপনার পূর্ণ নাম *',
        fullNamePlaceholder: 'যেমন: মোঃ রফিকুল ইসলাম',
        company: 'প্রতিষ্ঠানের নাম',
        companyPlaceholder: 'যেমন: ইসলাম কনস্ট্রাকশন অ্যান্ড ইঞ্জিনিয়ারিং লিঃ',
        phone: 'মোবাইল নম্বর *',
        phonePlaceholder: '১৮৮৬-৯৭০১৯৭',
        tenderRef: 'টেন্ডার আইডি বা রেফারেন্স (ঐচ্ছিক)',
        tenderRefPlaceholder: 'যেমন: টেন্ডার আইডি ৯৪৮২০১',
        serviceRequired: 'প্রয়োজনীয় সেবা *',
        selectService: 'একটি সেবা নির্বাচন করুন',
        message: 'আপনার প্রশ্ন বা বিস্তারিত বার্তা',
        messagePlaceholder: 'আপনার টেন্ডারের শেষ সময়, কাজের ধরণ বা কী ধরনের সহায়তা প্রয়োজন সংক্ষেপে লিখুন...',
      },
      sendBtn: 'অনুরোধ পাঠান',
      cancelBtn: 'বাতিল',
      phoneError: 'দয়া করে একটি সঠিক ১০-১১ ডিজিটের মোবাইল নম্বর লিখুন (যেমন: 01886-970197)',
      success: {
        title: 'ধন্যবাদ! আপনার অনুরোধ গ্রহণ করা হয়েছে।',
        subtitle: 'আমরা অতি দ্রুত আপনার সাথে যোগাযোগ করব।',
        callNote: 'আমাদের টেন্ডার কনসাল্টিং টিম আপনার দেওয়া নম্বরে দ্রুত কল করবে।',
        closeBtn: 'উইন্ডো বন্ধ করুন',
      },
    },
    stickyBar: {
      callSupport: 'কল করুন',
      whatsApp: 'হোয়াটসঅ্যাপ',
    },
    aboutPage: {
      eyebrow: 'আমাদের পরিচিতি',
      title1: 'ঠিকাদার ও ব্যবসায়ীদের ক্ষমতায়নে',
      title2: 'সারাদেশে বিশ্বস্ত সঙ্গী।',
      subtitle: 'ই-জিপি রেজিস্ট্রেশন থেকে শুরু করে টেন্ডার জয় এবং প্রজেক্ট ট্র্যাকিং—আমরা সবসময় আপনার পাশে।',
      missionTitle: 'আমাদের লক্ষ্য',
      missionDesc: 'কারিগরি নির্ভুলতা, সরকারি প্রকিউরমেন্ট আইনের গভীর জ্ঞান ও পেশাদার সেবার মাধ্যমে বাংলাদেশের ঠিকাদারদের জন্য ই-জিপি প্রক্রিয়াকে সহজ ও সফল করা।',
      visionTitle: 'আমাদের রূপকল্প',
      visionDesc: 'সারাদেশে টেন্ডার পরামর্শ ও প্রজেক্ট ম্যানেজমেন্টে সবচেয়ে নির্ভরযোগ্য ও অগ্রণী প্রতিষ্ঠান হিসেবে প্রতিষ্ঠিত হওয়া।',
      whyChooseTitle: 'আমাদের মূল আদর্শ',
      whyChooseSub: 'আমাদের প্রতিটি সেবা বাস্তব অভিজ্ঞতা এবং গণপ্রজাতন্ত্রী বাংলাদেশ সরকারের প্রকিউরমেন্ট রুলস (PPR) অনুযায়ী পরিচালিত।',
      statsExp: 'বছরের অভিজ্ঞতা',
      statsClients: 'সেবাপ্রাপ্ত ঠিকাদার',
      statsSubmissions: 'দাখিলকৃত টেন্ডার',
      statsRate: 'সন্তুষ্টির রেটিং',
    },
    contactPage: {
      eyebrow: 'যোগাযোগ করুন',
      heroTitle: 'যোগাযোগ করুন',
      heroSubtitle: 'আসন্ন কোনো ই-জিপি টেন্ডার সংক্রান্ত প্রশ্ন বা পরামর্শের জন্য আমাদের সাথে সরাসরি যোগাযোগ করুন।',
      getInTouch: 'সরাসরি যোগাযোগ',
      getInTouchDesc: 'কল, ইমেইল বা হোয়াটসঅ্যাপে মেসেজ পাঠিয়ে যেকোনো তথ্য জানতে পারেন। এছাড়া অফিস চলাকালীন সময়ে আমাদের অফিসেও আসতে পারেন।',
      labelPhone: 'মোবাইল',
      labelWhatsApp: 'হোয়াটসঅ্যাপ',
      whatsAppChat: 'হোয়াটসঅ্যাপে চ্যাট করুন',
      labelEmail: 'ইমেইল',
      labelOffice: 'অফিস ঠিকানা',
      officeAddress: 'বাড়ি ৬, রোড ২/বি, বারিধারা জে ব্লক, ঢাকা ১২১২',
      labelHours: 'অফিস সময়সূচী',
      hoursTime: 'শনিবার — বৃহস্পতিবার: সকাল ৯:০০ – সন্ধ্যা ৭:০০',
      inquiryEyebrow: 'সরাসরি কনসাল্টিং অনুরোধ',
      inquiryHeading: 'আপনার টেন্ডার সম্পর্কে জানান।',
      inquirySubheading: 'সামনে কোনো টেন্ডার আছে বা ই-জিপি সংক্রান্ত সহায়তা প্রয়োজন? বিস্তারিত লিখে পাঠান, আমাদের টিম দ্রুত যোগাযোগ করবে।',
      phoneNoteBefore: 'আমাদের টেন্ডার কনসাল্টিং টিম অতি দ্রুত আপনার দেওয়া নম্বরে যোগাযোগ করবে',
      phoneNoteRegarding: 'বিষয়ে:',
      submitAnother: 'আরেকটি অনুরোধ পাঠান',
      servicesList: [
        'ই-জিপি রেজিস্ট্রেশন',
        'টেন্ডার প্রস্তুতি ও সাবমিশন',
        'লিকুইড অ্যাসেট / লাইন অফ ক্রেডিট',
        'ই-জিপি কনসালটেন্সি',
        'ই-জিপি ট্রেনিং',
        'প্রজেক্ট কস্ট ম্যানেজমেন্ট',
        'ভ্যাট রেজিস্ট্রেশন',
        'ভ্যাট রিটার্ন দাখিল',
        'ট্যাক্স / ই-টিন রেজিস্ট্রেশন',
        'আয়কর রিটার্ন দাখিল',
      ],
    },
    mapHubs: {
      dhakaHq: 'ঢাকা (প্রধান কার্যালয়)',
      chattogram: 'চট্টগ্রাম',
      sylhet: 'সিলেট',
      rajshahi: 'রাজশাহী',
      khulna: 'খুলনা',
      barishal: 'বরিশাল',
      rangpur: 'রংপুর',
      mymensingh: 'ময়মনসিংহ',
    },
  },
};
