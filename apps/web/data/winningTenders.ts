export interface WinningTender {
  id: string;
  projectName: string;
  tenderId: string;
  department: string;
  departmentShort: string;
  location: string;
  projectValue: string;
  year: string;
  winningClient: string;
  image: string;
  summary: string;
  tags: string[];
}

export const winningTendersData: WinningTender[] = [
  {
    id: 'rhd-bridge-meghna',
    projectName: 'Construction of 4-Lane Pre-Stressed Concrete Girder Bridge & Approach Road',
    tenderId: '948201',
    department: 'Roads and Highways Department',
    departmentShort: 'RHD',
    location: 'Bhairab - Kishoreganj Highway, Dhaka Division',
    projectValue: '৳ 52.80 Crore',
    year: '2025',
    winningClient: 'Spectra Infrastructure Ltd.',
    image: '/images/project-rhd-bridge.jpg',
    summary: 'Successfully prepared and submitted end-to-end technical proposal, plant & equipment matrix, and responsive financial bid on e-GP.',
    tags: ['Pre-Stressed Concrete', '4-Lane Bridge', 'e-GP e-PW3']
  },
  {
    id: 'pwd-hospital-complex',
    projectName: 'Construction of 10-Storied 250-Bed Specialized Medical College & Hospital',
    tenderId: '935104',
    department: 'Public Works Department',
    departmentShort: 'PWD',
    location: 'Rajshahi Sadar, Rajshahi Division',
    projectValue: '৳ 78.40 Crore',
    year: '2025',
    winningClient: 'Apex Construction & Engineering Ltd.',
    image: '/images/project-pwd-hospital.jpg',
    summary: 'Comprehensive BOQ rate breakdown, MEP electro-mechanical sub-contracting responsiveness, and turnkey hospital compliance verification.',
    tags: ['Hospital Complex', 'Multi-Storied', 'Turnkey Facility']
  },
  {
    id: 'bwdb-padma-revetment',
    projectName: 'Padma River Bank Protection & CC Block Revetment Works with Geo-Textile Bags',
    tenderId: '928419',
    department: 'Bangladesh Water Development Board',
    departmentShort: 'BWDB',
    location: 'Naria, Shariatpur District',
    projectValue: '৳ 36.20 Crore',
    year: '2024',
    winningClient: 'Bengal Infrastructure Ltd.',
    image: '/images/project-bwdb-revetment.jpg',
    summary: 'Critical hydraulic modeling compliance, high-volume CC block casting schedule, and riverbank dredging equipment mobilization guarantee.',
    tags: ['CC Block Revetment', 'Geo-Textile', 'Flood Control']
  },
  {
    id: 'lged-upazila-road',
    projectName: 'Improvement & Bituminous Paving of 14.50 km Upazila Connecting Road & Culverts',
    tenderId: '914082',
    department: 'Local Government Engineering Department',
    departmentShort: 'LGED',
    location: 'Bogura Sadar to Gabtoli, Bogura',
    projectValue: '৳ 18.60 Crore',
    year: '2024',
    winningClient: 'Standard Builders Bangladesh',
    image: '/images/project-lged-road.jpg',
    summary: 'Optimized pavement schedule, equipment availability verification, and seamless electronic tender security banking confirmation.',
    tags: ['Rural Highway', 'Bituminous Carpet', 'RCC Culverts']
  },
  {
    id: 'dphe-water-treatment',
    projectName: 'Installation of 5 MLD Surface Water Treatment Plant & Transmission Pipeline Network',
    tenderId: '951230',
    department: 'Department of Public Health Engineering',
    departmentShort: 'DPHE',
    location: 'Cox\'s Bazar Municipality, Chattogram',
    projectValue: '৳ 24.75 Crore',
    year: '2025',
    winningClient: 'Meghna Builders & Environmental Tech',
    image: '/images/project-pwd-hospital.jpg',
    summary: 'Water purification filter compliance, pump machinery OEM authorization, and strict compliance with national environmental standards.',
    tags: ['Water Treatment', '5 MLD Plant', 'Pipeline Grid']
  },
  {
    id: 'eed-academic-campus',
    projectName: 'Construction of 6-Storied Modern Academic Building with Rooftop Solar Grid',
    tenderId: '908754',
    department: 'Education Engineering Department',
    departmentShort: 'EED',
    location: 'Mymensingh Sadar, Mymensingh',
    projectValue: '৳ 11.20 Crore',
    year: '2024',
    winningClient: 'Navana Infra-Build Ltd.',
    image: '/images/project-rhd-bridge.jpg',
    summary: 'Detailed seismic structural analysis submission, green building electrical specs, and competitive price tender scheduling.',
    tags: ['Academic Building', 'Solar Power Grid', 'EED Standards']
  }
];
