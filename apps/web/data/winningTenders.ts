export interface WinningTender {
  id: string;
  projectName: string;
  projectNameBn?: string;
  tenderId: string;
  department: string;
  departmentBn?: string;
  departmentShort: string;
  location: string;
  locationBn?: string;
  projectValue: string;
  projectValueBn?: string;
  year: string;
  winningClient: string;
  winningClientBn?: string;
  image: string;
  summary: string;
  summaryBn?: string;
  tags: string[];
}

export const winningTendersData: WinningTender[] = [
  {
    id: 'rhd-bridge-meghna',
    projectName: 'Construction of 4-Lane Pre-Stressed Concrete Girder Bridge & Approach Road',
    projectNameBn: '৪-লেন বিশিষ্ট প্রি-স্ট্রেসড কংক্রিট গার্ডার ব্রিজ ও সংযোগ সড়ক নির্মাণ',
    tenderId: '948201',
    department: 'Roads and Highways Department',
    departmentBn: 'সড়ক ও জনপথ অধিদপ্তর',
    departmentShort: 'RHD',
    location: 'Bhairab - Kishoreganj Highway, Dhaka Division',
    locationBn: 'ভৈরব - কিশোরগঞ্জ মহাসড়ক, ঢাকা বিভাগ',
    projectValue: '৳ 52.80 Crore',
    projectValueBn: '৳ ৫২.৮০ কোটি',
    year: '2025',
    winningClient: 'Spectra Infrastructure Ltd.',
    winningClientBn: 'স্পেক্ট্রা ইনফ্রাস্ট্রাকচার লিমিটেড',
    image: '/images/project-rhd-bridge.jpg',
    summary: 'Successfully prepared and submitted end-to-end technical proposal, plant & equipment matrix, and responsive financial bid on e-GP.',
    summaryBn: 'ই-জিপিতে সম্পূর্ণ টেকনিক্যাল প্রস্তাবনা, ইকুইপমেন্ট ম্যাট্রিক্স এবং রেসপনসিভ ফিন্যান্সিয়াল অফার সফলভাবে দাখিল করা হয়েছে।',
    tags: ['Pre-Stressed Concrete', '4-Lane Bridge', 'e-GP e-PW3']
  },
  {
    id: 'pwd-hospital-complex',
    projectName: 'Construction of 10-Storied 250-Bed Specialized Medical College & Hospital',
    projectNameBn: '১০-তলা বিশিষ্ট ২৫০-শয্যার বিশেষায়িত মেডিকেল কলেজ ও হাসপাতাল নির্মাণ',
    tenderId: '935104',
    department: 'Public Works Department',
    departmentBn: 'গণপূর্ত অধিদপ্তর',
    departmentShort: 'PWD',
    location: 'Rajshahi Sadar, Rajshahi Division',
    locationBn: 'রাজশাহী সদর, রাজশাহী বিভাগ',
    projectValue: '৳ 78.40 Crore',
    projectValueBn: '৳ ৭৮.৪০ কোটি',
    year: '2025',
    winningClient: 'Apex Construction & Engineering Ltd.',
    winningClientBn: 'এপেক্স কনস্ট্রাকশন অ্যান্ড ইঞ্জিনিয়ারিং লিমিটেড',
    image: '/images/project-pwd-hospital.jpg',
    summary: 'Comprehensive BOQ rate breakdown, MEP electro-mechanical sub-contracting responsiveness, and turnkey hospital compliance verification.',
    summaryBn: 'বিস্তারিত বিওকিউ রেট অ্যানালাইসিস, ইলেকট্রো-মেকানিক্যাল শর্তাবলী ও টার্নকি হাসপাতাল কমপ্লায়েন্স যাচাই সহ দাখিল।',
    tags: ['Hospital Complex', 'Multi-Storied', 'Turnkey Facility']
  },
  {
    id: 'bwdb-padma-revetment',
    projectName: 'Padma River Bank Protection & CC Block Revetment Works with Geo-Textile Bags',
    projectNameBn: 'পদ্মা নদী তীর সংরক্ষণ ও জিও-টেক্সটাইল ব্যাগ সহযোগে সিসি ব্লক রিভেটমেন্ট কাজ',
    tenderId: '928419',
    department: 'Bangladesh Water Development Board',
    departmentBn: 'বাংলাদেশ পানি উন্নয়ন বোর্ড',
    departmentShort: 'BWDB',
    location: 'Naria, Shariatpur District',
    locationBn: 'নড়িয়া, শরীয়তপুর জেলা',
    projectValue: '৳ 36.20 Crore',
    projectValueBn: '৳ ৩৬.২০ কোটি',
    year: '2024',
    winningClient: 'Bengal Infrastructure Ltd.',
    winningClientBn: 'বেঙ্গল ইনফ্রাস্ট্রাকচার লিমিটেড',
    image: '/images/project-bwdb-revetment.jpg',
    summary: 'Critical hydraulic modeling compliance, high-volume CC block casting schedule, and riverbank dredging equipment mobilization guarantee.',
    summaryBn: 'হাইড্রোলিক মডেলিং নিয়মাবলী, সিসি ব্লক কাস্টিং শিডিউল ও নদী ড্রেজিং যন্ত্রপাতি মোতায়েন নিশ্চয়তা সহ অনুমোদন।',
    tags: ['CC Block Revetment', 'Geo-Textile', 'Flood Control']
  },
  {
    id: 'lged-upazila-road',
    projectName: 'Improvement & Bituminous Paving of 14.50 km Upazila Connecting Road & Culverts',
    projectNameBn: '১৪.৫০ কিমি উপজেলা সংযোগ সড়ক উন্নয়ন, বিটুমিনাস পেভিং ও আরসিসি কালভার্ট নির্মাণ',
    tenderId: '914082',
    department: 'Local Government Engineering Department',
    departmentBn: 'স্থানীয় সরকার প্রকৌশল অধিদপ্তর',
    departmentShort: 'LGED',
    location: 'Bogura Sadar to Gabtoli, Bogura',
    locationBn: 'বগুড়া সদর হতে গাবতলী, বগুড়া',
    projectValue: '৳ 18.60 Crore',
    projectValueBn: '৳ ১৮.৬০ কোটি',
    year: '2024',
    winningClient: 'Standard Builders Bangladesh',
    winningClientBn: 'স্ট্যান্ডার্ড বিল্ডার্স বাংলাদেশ',
    image: '/images/project-lged-road.jpg',
    summary: 'Optimized pavement schedule, equipment availability verification, and seamless electronic tender security banking confirmation.',
    summaryBn: 'সড়ক পেভিং পরিকল্পনা, ইকুইপমেন্ট সহজলভ্যতা প্রমাণ ও ইলেকট্রনিক টেন্ডার সিকিউরিটি কনফার্মেশন সহ পূর্ণাঙ্গ প্যাকেজ।',
    tags: ['Rural Highway', 'Bituminous Carpet', 'RCC Culverts']
  },
  {
    id: 'dphe-water-treatment',
    projectName: 'Installation of 5 MLD Surface Water Treatment Plant & Transmission Pipeline Network',
    projectNameBn: '৫ এমএলডি সারফেস ওয়াটার ট্রিটমেন্ট প্ল্যান্ট ও ট্রান্সমিশন পাইপলাইন নেটওয়ার্ক স্থাপন',
    tenderId: '951230',
    department: 'Department of Public Health Engineering',
    departmentBn: 'জনস্বাস্থ্য প্রকৌশল অধিদপ্তর',
    departmentShort: 'DPHE',
    location: 'Cox\'s Bazar Municipality, Chattogram',
    locationBn: 'কক্সবাজার পৌরসভা, চট্টগ্রাম',
    projectValue: '৳ 24.75 Crore',
    projectValueBn: '৳ ২৪.৭৫ কোটি',
    year: '2025',
    winningClient: 'Meghna Builders & Environmental Tech',
    winningClientBn: 'মেঘনা বিল্ডার্স অ্যান্ড এনভায়রনমেন্টাল টেক',
    image: '/images/project-pwd-hospital.jpg',
    summary: 'Water purification filter compliance, pump machinery OEM authorization, and strict compliance with national environmental standards.',
    summaryBn: 'ওয়াটার পিউরিফিকেশন ফিল্টার মানদণ্ড, পাম্প যন্ত্রাংশের অথরাইজেশন ও পরিবেশগত ছাড়পত্র প্রতিপালন।',
    tags: ['Water Treatment', '5 MLD Plant', 'Pipeline Grid']
  },
  {
    id: 'eed-academic-campus',
    projectName: 'Construction of 6-Storied Modern Academic Building with Rooftop Solar Grid',
    projectNameBn: 'রুফটপ সোলার গ্রিড সহ ৬-তলা বিশিষ্ট আধুনিক একাডেমিক ভবন নির্মাণ',
    tenderId: '908754',
    department: 'Education Engineering Department',
    departmentBn: 'শিক্ষা প্রকৌশল অধিদপ্তর',
    departmentShort: 'EED',
    location: 'Mymensingh Sadar, Mymensingh',
    locationBn: 'ময়মনসিংহ সদর, ময়মনসিংহ',
    projectValue: '৳ 11.20 Crore',
    projectValueBn: '৳ ১১.২০ কোটি',
    year: '2024',
    winningClient: 'Navana Infra-Build Ltd.',
    winningClientBn: 'নাভানা ইনফ্রা-বিল্ড লিমিটেড',
    image: '/images/project-rhd-bridge.jpg',
    summary: 'Detailed seismic structural analysis submission, green building electrical specs, and competitive price tender scheduling.',
    summaryBn: 'ভূমিকম্প প্রতিরোধক কাঠামোগত বিবরণী, গ্রিন বিল্ডিং ইলেকট্রিক্যাল শিডিউল ও সময়োপযোগী দরপ্রস্তাব।',
    tags: ['Academic Building', 'Solar Power Grid', 'EED Standards']
  }
];
