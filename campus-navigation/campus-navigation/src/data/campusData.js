// George E. Whalen VA Medical Center — Real Campus Data
// ASI Signage Innovations — Based on official VA campus map & ASI blueprints

export const CAMPUS_CENTER = { lng: -111.8910, lat: 40.7587 };

// Campus Entrances (real from campus map)
export const CAMPUS_ENTRANCES = [
  { id: 'ENT-MAIN', name: 'Main Entrance', street: 'Valdez Drive / Bennion Blvd', coords: { lng: -111.8928, lat: 40.7574 }, type: 'main', icon: '🟡' },
  { id: 'ENT-WAHLEN', name: 'Wahlen Entrance', street: 'Wahlen Way / Foothill Dr', coords: { lng: -111.8928, lat: 40.7610 }, type: 'secondary', icon: '🟣' },
  { id: 'ENT-SUNNY', name: 'Sunnyside Entrance', street: 'Sunnyside Ave (East)', coords: { lng: -111.8862, lat: 40.7590 }, type: 'secondary', icon: '🟣' },
  { id: 'ENT-GUARD', name: 'Guardsman Entrance', street: '500 South / Valdez Dr', coords: { lng: -111.8900, lat: 40.7566 }, type: 'secondary', icon: '🟣' },
];

// Parking Lots (real from campus map)
export const PARKING_LOTS = {
  'P-GARAGE': { id: 'P-GARAGE', name: 'Parking Garage', label: 'Visitor & Veteran', coords: { lng: -111.8920, lat: 40.7570 }, isGarage: true, nearBuildings: ['B1','B14'] },
  'P-ER': { id: 'P-ER', name: 'ER Parking', label: 'Emergency Room', coords: { lng: -111.8915, lat: 40.7582 }, nearBuildings: ['B1'] },
  'P-NORTH': { id: 'P-NORTH', name: 'Parking North', label: 'Staff / Visitor', coords: { lng: -111.8905, lat: 40.7606 }, nearBuildings: ['B16','B3'] },
  'P-EAST': { id: 'P-EAST', name: 'Parking East', coords: { lng: -111.8882, lat: 40.7582 }, nearBuildings: ['B8','B9'] },
  'P-550': { id: 'P-550', name: 'Parking 550', coords: { lng: -111.8908, lat: 40.7614 }, nearBuildings: ['B550'] },
  'P-590': { id: 'P-590', name: 'Parking 590', coords: { lng: -111.8892, lat: 40.7614 }, nearBuildings: ['B590'] },
};

// ALL BUILDINGS — from official VA campus map
export const BUILDINGS = {
  B1: {
    id: 'B1', num: '1', name: 'Building 1', displayName: 'Building 1 — Main Hospital',
    description: 'Main clinical hub: Emergency, ICU, Cardiology, Surgery, Internal Medicine across 6 levels.',
    coords: { lng: -111.8912, lat: 40.7583 },
    levels: ['B','G','1','2','3','4','5'], defaultLevel: '1',
    color: '#1e3a8a', asiColor: '#4472C4',
    polygon: [[-111.8920,40.7578],[-111.8904,40.7578],[-111.8904,40.7590],[-111.8920,40.7590]],
    entrances: [
      { id: 'B1-E1', name: 'Main Entrance (Valdez Dr)', type: 'main', side: 'west' },
      { id: 'B1-E2', name: 'Emergency Entrance', type: 'emergency', side: 'south' },
    ],
    parking: ['P-GARAGE','P-ER'],
  },
  B14: {
    id: 'B14', num: '14', name: 'Building 14', displayName: 'Building 14 — Main Hospital (South)',
    description: 'Emergency hub and outpatient clinics including Primary Care, Optometry, Mental Health.',
    coords: { lng: -111.8904, lat: 40.7575 },
    levels: ['B','G','1','2','3'], defaultLevel: '1',
    color: '#7f1d1d', asiColor: '#E25C27',
    polygon: [[-111.8912,40.7570],[-111.8896,40.7570],[-111.8896,40.7580],[-111.8912,40.7580]],
    splitEntrance: true,
    entrances: [
      { id: 'B14-EA', name: 'Entrance A — Emergency', type: 'emergency', side: 'west' },
      { id: 'B14-EB', name: 'Entrance B — Scheduled Care', type: 'scheduled', side: 'east' },
    ],
    parking: ['P-GARAGE','P-ER'],
  },
  B2: {
    id: 'B2', num: '2', name: 'Building 2', displayName: 'Building 2 — Inpatient',
    description: 'Inpatient wards, nursing stations, and family waiting areas.',
    coords: { lng: -111.8926, lat: 40.7596 },
    levels: ['G','1','2','3'], defaultLevel: 'G',
    color: '#065f46', asiColor: '#70AD47',
    polygon: [[-111.8930,40.7593],[-111.8922,40.7593],[-111.8922,40.7599],[-111.8930,40.7599]],
    entrances: [{ id: 'B2-E1', name: 'Main Entrance', type: 'main', side: 'south' }],
    parking: ['P-ER'],
  },
  B3: {
    id: 'B3', num: '3', name: 'Building 3', displayName: 'Building 3 — Inpatient Mental Health',
    description: 'Inpatient Mental Health services, nursing stations, family support areas.',
    coords: { lng: -111.8906, lat: 40.7602 },
    levels: ['G','1','2','3'], defaultLevel: 'G',
    color: '#4c1d95', asiColor: '#7030A0',
    polygon: [[-111.8912,40.7598],[-111.8900,40.7598],[-111.8900,40.7606],[-111.8912,40.7606]],
    entrances: [{ id: 'B3-E1', name: 'Main Entrance', type: 'main', side: 'south' }],
    parking: ['P-NORTH'],
  },
  B4: {
    id: 'B4', num: '4', name: 'Building 4', displayName: 'Building 4 — Employee Health & HR',
    description: 'Employee Health, Human Resources offices.',
    coords: { lng: -111.8916, lat: 40.7600 },
    levels: ['G','1'], defaultLevel: 'G',
    color: '#374151', asiColor: '#808080',
    polygon: [[-111.8920,40.7597],[-111.8912,40.7597],[-111.8912,40.7603],[-111.8920,40.7603]],
    entrances: [{ id: 'B4-E1', name: 'Main Entrance', type: 'main', side: 'south' }],
    parking: ['P-NORTH'],
  },
  B5: {
    id: 'B5', num: '5', name: 'Building 5', displayName: 'Building 5 — Food & Nutrition Hub',
    description: 'Food and Nutrition services, dietary support.',
    coords: { lng: -111.8901, lat: 40.7587 },
    levels: ['G','1'], defaultLevel: 'G',
    color: '#92400e', asiColor: '#FFC000',
    polygon: [[-111.8905,40.7584],[-111.8897,40.7584],[-111.8897,40.7590],[-111.8905,40.7590]],
    entrances: [{ id: 'B5-E1', name: 'Main Entrance', type: 'main', side: 'west' }],
    parking: ['P-EAST'],
  },
  B6: {
    id: 'B6', num: '6', name: 'Building 6', displayName: 'Building 6 — Support Services',
    description: 'Support and administrative services.',
    coords: { lng: -111.8887, lat: 40.7590 },
    levels: ['G','1'], defaultLevel: 'G', color: '#374151', asiColor: '#808080',
    polygon: [[-111.8892,40.7587],[-111.8882,40.7587],[-111.8882,40.7593],[-111.8892,40.7593]],
    entrances: [{ id: 'B6-E1', name: 'Main Entrance', type: 'main', side: 'west' }],
    parking: ['P-EAST'],
  },
  B7: {
    id: 'B7', num: '7', name: 'Building 7', displayName: 'Building 7 — Specialty Clinics',
    description: 'Specialty outpatient clinics.',
    coords: { lng: -111.8887, lat: 40.7595 },
    levels: ['G','1'], defaultLevel: 'G', color: '#374151', asiColor: '#808080',
    polygon: [[-111.8892,40.7592],[-111.8882,40.7592],[-111.8882,40.7598],[-111.8892,40.7598]],
    entrances: [{ id: 'B7-E1', name: 'Main Entrance', type: 'main', side: 'west' }],
    parking: ['P-EAST'],
  },
  B8: {
    id: 'B8', num: '8', name: 'Building 8', displayName: 'Building 8 — Canteen & MPC',
    description: 'Canteen, Multipurpose Center (MPC), Voluntary Service (CDCE).',
    coords: { lng: -111.8892, lat: 40.7580 },
    levels: ['G','1'], defaultLevel: 'G', color: '#b45309', asiColor: '#FFC000',
    polygon: [[-111.8897,40.7577],[-111.8887,40.7577],[-111.8887,40.7583],[-111.8897,40.7583]],
    entrances: [{ id: 'B8-E1', name: 'Main Entrance', type: 'main', side: 'west' }],
    parking: ['P-EAST'],
  },
  B9: {
    id: 'B9', num: '9', name: 'Building 9', displayName: 'Building 9 — Auditorium',
    description: 'Auditorium and event space.',
    coords: { lng: -111.8894, lat: 40.7572 },
    levels: ['G'], defaultLevel: 'G', color: '#374151', asiColor: '#808080',
    polygon: [[-111.8899,40.7569],[-111.8889,40.7569],[-111.8889,40.7575],[-111.8899,40.7575]],
    entrances: [{ id: 'B9-E1', name: 'Main Entrance', type: 'main', side: 'north' }],
    parking: ['P-EAST'],
  },
  B13: {
    id: 'B13', num: '13', name: 'Building 13', displayName: 'Building 13 — First Friends Child Care',
    description: 'First Friends Child Care Center.',
    coords: { lng: -111.8900, lat: 40.7608 },
    levels: ['G'], defaultLevel: 'G', color: '#059669', asiColor: '#70AD47',
    polygon: [[-111.8904,40.7605],[-111.8896,40.7605],[-111.8896,40.7611],[-111.8904,40.7611]],
    entrances: [{ id: 'B13-E1', name: 'Main Entrance', type: 'main', side: 'south' }],
    parking: ['P-NORTH'],
  },
  B16: {
    id: 'B16', num: '16', name: 'Building 16', displayName: 'Building 16 — Outpatient Mental Health',
    description: 'Outpatient Mental Health services.',
    coords: { lng: -111.8896, lat: 40.7602 },
    levels: ['G','1','2'], defaultLevel: 'G', color: '#4c1d95', asiColor: '#7030A0',
    polygon: [[-111.8901,40.7599],[-111.8891,40.7599],[-111.8891,40.7605],[-111.8901,40.7605]],
    entrances: [{ id: 'B16-E1', name: 'Main Entrance', type: 'main', side: 'south' }],
    parking: ['P-NORTH'],
  },
  B18: {
    id: 'B18', num: '18', name: 'Building 18', displayName: 'Building 18 — Support',
    description: 'Administrative and support services.',
    coords: { lng: -111.8882, lat: 40.7572 },
    levels: ['G'], defaultLevel: 'G', color: '#374151', asiColor: '#808080',
    polygon: [[-111.8887,40.7569],[-111.8877,40.7569],[-111.8877,40.7575],[-111.8887,40.7575]],
    entrances: [{ id: 'B18-E1', name: 'Main Entrance', type: 'main', side: 'north' }],
    parking: ['P-EAST'],
  },
  B20: {
    id: 'B20', num: '20', name: 'Building 20', displayName: 'Building 20 — Valor House',
    description: 'Valor House transitional housing for veterans.',
    coords: { lng: -111.8880, lat: 40.7580 },
    levels: ['G','1','2'], defaultLevel: 'G', color: '#1e40af', asiColor: '#4472C4',
    polygon: [[-111.8885,40.7577],[-111.8875,40.7577],[-111.8875,40.7583],[-111.8885,40.7583]],
    entrances: [{ id: 'B20-E1', name: 'Main Entrance', type: 'main', side: 'west' }],
    parking: ['P-EAST'],
  },
  B32: {
    id: 'B32', num: '32', name: 'Building 32', displayName: 'Building 32 — Fisher House',
    description: 'Fisher House — free lodging for families of veterans receiving care.',
    coords: { lng: -111.8880, lat: 40.7585 },
    levels: ['G','1','2'], defaultLevel: 'G', color: '#dc2626', asiColor: '#FF0000',
    polygon: [[-111.8885,40.7582],[-111.8875,40.7582],[-111.8875,40.7588],[-111.8885,40.7588]],
    entrances: [{ id: 'B32-E1', name: 'Main Entrance', type: 'main', side: 'west' }],
    parking: ['P-EAST'],
  },
  B38: {
    id: 'B38', num: '38', name: 'Building 38', displayName: 'Building 38 — East Campus',
    description: 'East campus administrative and clinical support.',
    coords: { lng: -111.8873, lat: 40.7592 },
    levels: ['G'], defaultLevel: 'G', color: '#374151', asiColor: '#808080',
    polygon: [[-111.8878,40.7589],[-111.8868,40.7589],[-111.8868,40.7595],[-111.8878,40.7595]],
    entrances: [{ id: 'B38-E1', name: 'Main Entrance', type: 'main', side: 'west' }],
    parking: ['P-EAST'],
  },
  B47: {
    id: 'B47', num: '47', name: 'Building 47', displayName: 'Building 47 — Driver Rehab / Prosthetics',
    description: 'Driver Rehabilitation, Prosthetic & Orthotic services.',
    coords: { lng: -111.8886, lat: 40.7606 },
    levels: ['G','1'], defaultLevel: 'G', color: '#0369a1', asiColor: '#4472C4',
    polygon: [[-111.8891,40.7603],[-111.8881,40.7603],[-111.8881,40.7609],[-111.8891,40.7609]],
    entrances: [{ id: 'B47-E1', name: 'Main Entrance', type: 'main', side: 'south' }],
    parking: ['P-NORTH'],
  },
  B550: {
    id: 'B550', num: '550', name: 'Building 550', displayName: 'Building 550 — Veterans Benefits Administration',
    description: 'VBA — Benefits claims, enrollment, compensation.',
    coords: { lng: -111.8903, lat: 40.7618 },
    levels: ['G','1','2'], defaultLevel: 'G', color: '#1e3a8a', asiColor: '#4472C4',
    polygon: [[-111.8908,40.7614],[-111.8898,40.7614],[-111.8898,40.7622],[-111.8908,40.7622]],
    entrances: [{ id: 'B550-E1', name: 'Main Entrance', type: 'main', side: 'south' }],
    parking: ['P-550'],
  },
  B590: {
    id: 'B590', num: '590', name: 'Building 590', displayName: 'Building 590 — Audiology / Dental / Enrollment',
    description: 'Audiology, Dental clinic, and Enrollment services.',
    coords: { lng: -111.8893, lat: 40.7618 },
    levels: ['G','1'], defaultLevel: 'G', color: '#0369a1', asiColor: '#4472C4',
    polygon: [[-111.8898,40.7614],[-111.8888,40.7614],[-111.8888,40.7622],[-111.8898,40.7622]],
    entrances: [{ id: 'B590-E1', name: 'Main Entrance', type: 'main', side: 'south' }],
    parking: ['P-590'],
  },
};

// ─── FLOOR DATA ───────────────────────────────────────────────
// Building 1 — ASI Blueprint (Blue/Navy color scheme)
// Building 14 — ASI Blueprint (Orange color scheme)

export const FLOOR_DATA = {
  B1: {
    B: { label: 'Level B — Basement / Tunnel', restricted: false, rooms: [
      { id:'B1-B-TUN', spatialId:'ASI-B1-B-A01', name:'Tunnel Corridor A', type:'tunnel', top:'38%', left:'8%', w:'42%', h:'22%', bg:'#bfdbfe', landmark:true },
      { id:'B1-B-TUNX', spatialId:'ASI-B1-B-A02', name:'Tunnel Corridor B', type:'tunnel', top:'38%', left:'50%', w:'42%', h:'22%', bg:'#bfdbfe' },
      { id:'B1-B-ELB', spatialId:'ASI-B1-B-B01', name:'Elevator Bank B', type:'elevator', top:'8%', left:'80%', w:'14%', h:'26%', bg:'#e0e7ff' },
      { id:'B1-B-MECH', spatialId:'ASI-B1-B-C01', name:'Mechanical Phase 1', type:'service', top:'8%', left:'8%', w:'18%', h:'26%', bg:'#f1f5f9' },
      { id:'B1-B-MECH2', spatialId:'ASI-B1-B-C02', name:'Mechanical Phase 2', type:'service', top:'8%', left:'28%', w:'18%', h:'26%', bg:'#f1f5f9' },
      { id:'B1-B-SUP', spatialId:'ASI-B1-B-D01', name:'Central Supply East', type:'service', top:'8%', left:'50%', w:'14%', h:'26%', bg:'#f1f5f9' },
      { id:'B1-B-SUP2', spatialId:'ASI-B1-B-D02', name:'Central Supply West', type:'service', top:'8%', left:'65%', w:'13%', h:'26%', bg:'#f1f5f9' },
      { id:'B1-B-TJ1', spatialId:'ASI-B1-B-T01', name:'Junction A → B2', type:'tunnel', top:'64%', left:'8%', w:'18%', h:'16%', bg:'#93c5fd' },
      { id:'B1-B-TJ2', spatialId:'ASI-B1-B-T02', name:'Junction B → B3/4', type:'tunnel', top:'64%', left:'28%', w:'18%', h:'16%', bg:'#93c5fd' },
      { id:'B1-B-TJ3', spatialId:'ASI-B1-B-T03', name:'Junction C → B8', type:'tunnel', top:'64%', left:'50%', w:'20%', h:'16%', bg:'#93c5fd' },
      { id:'B1-B-TJ4', spatialId:'ASI-B1-B-T04', name:'Junction D → B14', type:'tunnel', top:'64%', left:'72%', w:'20%', h:'16%', bg:'#93c5fd' },
    ]},
    G: { label: 'Level G — Main Lobby', rooms: [
      { id:'B1-G-LOBBY', spatialId:'ASI-B1-G-001', name:'Main Lobby & Info Desk', type:'waiting', top:'28%', left:'22%', w:'56%', h:'36%', bg:'#fef9c3', landmark:true },
      { id:'B1-G-ADM', spatialId:'ASI-B1-G-002', name:'Admissions & Registration', type:'department', top:'8%', left:'8%', w:'28%', h:'18%', bg:'#dbeafe' },
      { id:'B1-G-CAFE', spatialId:'ASI-B1-G-003', name:'Café / Canteen', type:'service', top:'8%', left:'40%', w:'22%', h:'18%', bg:'#fef3c7', landmark:true },
      { id:'B1-G-GIFT', spatialId:'ASI-B1-G-004', name:'Gift Shop', type:'service', top:'8%', left:'66%', w:'18%', h:'18%', bg:'#fce7f3' },
      { id:'B1-G-CHPL', spatialId:'ASI-B1-G-005', name:'Chapel', type:'service', top:'68%', left:'8%', w:'18%', h:'22%', bg:'#f5f3ff', landmark:true },
      { id:'B1-G-SEC', spatialId:'ASI-B1-G-006', name:'Security / Police', type:'service', top:'68%', left:'76%', w:'16%', h:'22%', bg:'#fee2e2' },
      { id:'B1-G-ELA', spatialId:'ASI-B1-G-007', name:'Elevator Bank A', type:'elevator', top:'68%', left:'42%', w:'14%', h:'22%', bg:'#e0e7ff', landmark:true },
      { id:'B1-G-STR', spatialId:'ASI-B1-G-008', name:'Stairwell', type:'stairs', top:'68%', left:'58%', w:'12%', h:'22%', bg:'#f1f5f9' },
    ]},
    '1': { label: 'Level 1 — Emergency & ICU', rooms: [
      { id:'B1-1-ED', spatialId:'ASI-B1-1-001', name:'Emergency Department', type:'emergency', top:'6%', left:'6%', w:'44%', h:'44%', bg:'#fecaca', landmark:true },
      { id:'B1-1-TRIG', spatialId:'ASI-B1-1-002', name:'Triage & Intake', type:'department', top:'52%', left:'6%', w:'20%', h:'26%', bg:'#fee2e2' },
      { id:'B1-1-TRMA', spatialId:'ASI-B1-1-003', name:'Trauma Bay', type:'department', top:'52%', left:'28%', w:'22%', h:'26%', bg:'#fca5a5' },
      { id:'B1-1-ICU', spatialId:'ASI-B1-1-004', name:'ICU — Intensive Care Unit', type:'department', top:'6%', left:'54%', w:'38%', h:'44%', bg:'#fed7aa', landmark:true },
      { id:'B1-1-PHRM', spatialId:'ASI-B1-1-005', name:'Main Pharmacy', type:'department', top:'52%', left:'54%', w:'24%', h:'26%', bg:'#bbf7d0', landmark:true },
      { id:'B1-1-NRS1', spatialId:'ASI-B1-1-006', name:'Nurse Station 1A', type:'nurse', top:'52%', left:'80%', w:'14%', h:'26%', bg:'#e0e7ff' },
      { id:'B1-1-ELA', spatialId:'ASI-B1-1-007', name:'Elevator Bank A', type:'elevator', top:'80%', left:'40%', w:'14%', h:'16%', bg:'#e0e7ff', landmark:true },
      { id:'B1-1-STR', spatialId:'ASI-B1-1-008', name:'Stairwell N', type:'stairs', top:'80%', left:'56%', w:'12%', h:'16%', bg:'#f1f5f9' },
      { id:'B1-1-WAIT', spatialId:'ASI-B1-1-009', name:'Family Waiting', type:'waiting', top:'80%', left:'6%', w:'30%', h:'16%', bg:'#fef9c3' },
      { id:'B1-1-RST', spatialId:'ASI-B1-1-010', name:'Restrooms', type:'restroom', top:'80%', left:'70%', w:'10%', h:'16%', bg:'#f0fdf4' },
    ]},
    '2': { label: 'Level 2 — Internal Medicine', rooms: [
      { id:'B1-2-INTMA', spatialId:'ASI-B1-2-A01', name:'Internal Medicine A', type:'department', top:'6%', left:'6%', w:'18%', h:'32%', bg:'#d1fae5', landmark:true },
      { id:'B1-2-INTMB', spatialId:'ASI-B1-2-B01', name:'Internal Medicine B', type:'department', top:'6%', left:'26%', w:'18%', h:'32%', bg:'#d1fae5' },
      { id:'B1-2-INTMC', spatialId:'ASI-B1-2-C01', name:'Internal Medicine C', type:'department', top:'6%', left:'46%', w:'18%', h:'32%', bg:'#d1fae5' },
      { id:'B1-2-INTMD', spatialId:'ASI-B1-2-D01', name:'Internal Medicine D', type:'department', top:'6%', left:'66%', w:'18%', h:'32%', bg:'#d1fae5' },
      { id:'B1-2-INTME', spatialId:'ASI-B1-2-E01', name:'Internal Medicine E', type:'department', top:'40%', left:'6%', w:'18%', h:'32%', bg:'#d1fae5' },
      { id:'B1-2-INTMF', spatialId:'ASI-B1-2-F01', name:'Internal Medicine F', type:'department', top:'40%', left:'26%', w:'18%', h:'32%', bg:'#d1fae5' },
      { id:'B1-2-INTMG', spatialId:'ASI-B1-2-G01', name:'Internal Medicine G', type:'department', top:'40%', left:'46%', w:'18%', h:'32%', bg:'#d1fae5', landmark:true },
      { id:'B1-2-WOMA', spatialId:'ASI-B1-2-H01', name:"Women's Health A", type:'department', top:'74%', left:'6%', w:'14%', h:'22%', bg:'#fce7f3' },
      { id:'B1-2-WOMB', spatialId:'ASI-B1-2-I01', name:"Women's Health B", type:'department', top:'74%', left:'22%', w:'14%', h:'22%', bg:'#fce7f3' },
      { id:'B1-2-WOMC', spatialId:'ASI-B1-2-J01', name:"Women's Health C", type:'department', top:'74%', left:'38%', w:'14%', h:'22%', bg:'#fce7f3' },
      { id:'B1-2-SLEEP', spatialId:'ASI-B1-2-K01', name:'Sleep Medicine', type:'department', top:'40%', left:'66%', w:'22%', h:'32%', bg:'#e0e7ff' },
      { id:'B1-2-ICUWT', spatialId:'ASI-B1-2-L01', name:'ICU Waiting Room', type:'waiting', top:'74%', left:'54%', w:'24%', h:'22%', bg:'#fef9c3', landmark:true },
      { id:'B1-2-ELA', spatialId:'ASI-B1-2-Z01', name:'Elevator Bank A', type:'elevator', top:'74%', left:'80%', w:'14%', h:'22%', bg:'#e0e7ff', landmark:true },
    ]},
    '3': { label: 'Level 3 — Rehabilitation', rooms: [
      { id:'B1-3-PTA', spatialId:'ASI-B1-3-A01', name:'Physical Therapy A', type:'therapy', top:'6%', left:'6%', w:'22%', h:'44%', bg:'#d1fae5' },
      { id:'B1-3-PTB', spatialId:'ASI-B1-3-B01', name:'Physical Therapy B', type:'therapy', top:'6%', left:'30%', w:'22%', h:'44%', bg:'#d1fae5' },
      { id:'B1-3-OTA', spatialId:'ASI-B1-3-C01', name:'Occupational Therapy A', type:'therapy', top:'54%', left:'6%', w:'22%', h:'34%', bg:'#fef9c3' },
      { id:'B1-3-OTB', spatialId:'ASI-B1-3-D01', name:'Occupational Therapy B', type:'therapy', top:'54%', left:'30%', w:'22%', h:'34%', bg:'#fef9c3' },
      { id:'B1-3-GYM', spatialId:'ASI-B1-3-G01', name:'Rehabilitation Gym', type:'therapy', top:'6%', left:'54%', w:'40%', h:'60%', bg:'#dcfce7', landmark:true },
      { id:'B1-3-NRS', spatialId:'ASI-B1-3-N01', name:'Nurse Station 3A', type:'nurse', top:'70%', left:'54%', w:'18%', h:'22%', bg:'#e0e7ff', landmark:true },
      { id:'B1-3-ELA', spatialId:'ASI-B1-3-Z01', name:'Elevator Bank A', type:'elevator', top:'70%', left:'76%', w:'18%', h:'22%', bg:'#e0e7ff' },
    ]},
    '4': { label: 'Level 4 — Cardiology & Surgery', rooms: [
      { id:'B1-4-CARD', spatialId:'ASI-B1-4-A01', name:'Cardiology Department', type:'department', top:'6%', left:'6%', w:'54%', h:'44%', bg:'#fee2e2', landmark:true },
      { id:'B1-4-SURG', spatialId:'ASI-B1-4-S01', name:'Surgical Suites', type:'department', restricted:true, top:'6%', left:'64%', w:'28%', h:'44%', bg:'#fecaca' },
      { id:'B1-4-PRE', spatialId:'ASI-B1-4-P01', name:'Pre-Op / Post-Op', type:'department', top:'54%', left:'6%', w:'34%', h:'34%', bg:'#fef3c7' },
      { id:'B1-4-BLOOD', spatialId:'ASI-B1-4-L01', name:'Blood Lab / Pathology', type:'lab', top:'54%', left:'44%', w:'28%', h:'34%', bg:'#fde8ff' },
      { id:'B1-4-ELA', spatialId:'ASI-B1-4-Z01', name:'Elevator Bank A', type:'elevator', top:'54%', left:'76%', w:'14%', h:'34%', bg:'#e0e7ff', landmark:true },
    ]},
    '5': { label: 'Level 5 — Service Areas (Restricted)', restricted:true, rooms: [
      { id:'B1-5-ADM', spatialId:'ASI-B1-5-A01', name:'Administrative Offices', type:'service', restricted:true, top:'8%', left:'8%', w:'40%', h:'44%', bg:'#f1f5f9' },
      { id:'B1-5-IT', spatialId:'ASI-B1-5-H01', name:'IT & Communications', type:'service', restricted:true, top:'8%', left:'52%', w:'38%', h:'44%', bg:'#f1f5f9' },
      { id:'B1-5-ENG', spatialId:'ASI-B1-5-E01', name:'Hospital Engineering', type:'service', restricted:true, top:'56%', left:'8%', w:'82%', h:'32%', bg:'#f1f5f9' },
    ]},
  },

  B14: {
    B: { label: 'Level B — Tunnel Level', rooms: [
      { id:'B14-B-TUN', spatialId:'ASI-B14-B-T01', name:'Tunnel Connection → Building 1', type:'tunnel', top:'38%', left:'12%', w:'76%', h:'22%', bg:'#bfdbfe', landmark:true },
      { id:'B14-B-EL', spatialId:'ASI-B14-B-Z01', name:'Elevator Bank', type:'elevator', top:'8%', left:'80%', w:'12%', h:'26%', bg:'#e0e7ff' },
      { id:'B14-B-STO', spatialId:'ASI-B14-B-S01', name:'Storage / Supply', type:'service', top:'8%', left:'8%', w:'42%', h:'26%', bg:'#f1f5f9' },
    ]},
    G: { label: 'Level G — Primary Care', rooms: [
      { id:'B14-G-PRIM', spatialId:'ASI-B14-G-P01', name:'Primary Care Clinic', type:'department', top:'6%', left:'6%', w:'52%', h:'48%', bg:'#dcfce7', landmark:true },
      { id:'B14-G-REG', spatialId:'ASI-B14-G-R01', name:'Registration & Check-In', type:'department', top:'6%', left:'62%', w:'30%', h:'48%', bg:'#fef9c3', landmark:true },
      { id:'B14-G-WAIT', spatialId:'ASI-B14-G-W01', name:'Main Waiting Area', type:'waiting', top:'58%', left:'6%', w:'62%', h:'32%', bg:'#fef9c3' },
      { id:'B14-G-EL', spatialId:'ASI-B14-G-Z01', name:'Elevator Bank', type:'elevator', top:'58%', left:'82%', w:'12%', h:'32%', bg:'#e0e7ff', landmark:true },
    ]},
    '1': { label: 'Level 1 — Emergency (Split Entrance)', splitEntrance:true, rooms: [
      { id:'B14-1-EDA', spatialId:'ASI-B14-1-A01', name:'Emergency Entrance A (West)', type:'emergency', top:'6%', left:'6%', w:'44%', h:'56%', bg:'#fecaca', landmark:true },
      { id:'B14-1-EDB', spatialId:'ASI-B14-1-B01', name:'Scheduled Care Entrance B (East)', type:'department', top:'6%', left:'54%', w:'38%', h:'56%', bg:'#d1fae5' },
      { id:'B14-1-NRS', spatialId:'ASI-B14-1-N01', name:'Nurse Station', type:'nurse', top:'66%', left:'38%', w:'22%', h:'24%', bg:'#e0e7ff', landmark:true },
      { id:'B14-1-WAIT', spatialId:'ASI-B14-1-W01', name:'Emergency Waiting', type:'waiting', top:'66%', left:'6%', w:'28%', h:'24%', bg:'#fef9c3' },
      { id:'B14-1-EL', spatialId:'ASI-B14-1-Z01', name:'Elevator Bank', type:'elevator', top:'66%', left:'82%', w:'12%', h:'24%', bg:'#e0e7ff' },
    ]},
    '2': { label: 'Level 2 — Optometry & Specialty', rooms: [
      { id:'B14-2-OPT', spatialId:'ASI-B14-2-O01', name:'Optometry Clinic', type:'department', top:'6%', left:'6%', w:'42%', h:'48%', bg:'#e0e7ff', landmark:true },
      { id:'B14-2-SPEC', spatialId:'ASI-B14-2-S01', name:'Specialty Clinics', type:'department', top:'6%', left:'52%', w:'40%', h:'48%', bg:'#fef3c7' },
      { id:'B14-2-WAIT', spatialId:'ASI-B14-2-W01', name:'Waiting Area', type:'waiting', top:'58%', left:'6%', w:'62%', h:'30%', bg:'#fef9c3' },
      { id:'B14-2-EL', spatialId:'ASI-B14-2-Z01', name:'Elevator Bank', type:'elevator', top:'58%', left:'82%', w:'12%', h:'30%', bg:'#e0e7ff' },
    ]},
    '3': { label: 'Level 3 — Mental Health', rooms: [
      { id:'B14-3-MH', spatialId:'ASI-B14-3-M01', name:'Mental Health Services', type:'department', top:'6%', left:'6%', w:'58%', h:'48%', bg:'#f5f3ff', landmark:true },
      { id:'B14-3-SUP', spatialId:'ASI-B14-3-S01', name:'Peer Support Center', type:'department', top:'6%', left:'68%', w:'24%', h:'48%', bg:'#e0e7ff' },
      { id:'B14-3-NRS', spatialId:'ASI-B14-3-N01', name:'Nurse Station 3B', type:'nurse', top:'58%', left:'6%', w:'26%', h:'30%', bg:'#e0e7ff', landmark:true },
      { id:'B14-3-FAM', spatialId:'ASI-B14-3-F01', name:'Family Support Lounge', type:'waiting', top:'58%', left:'36%', w:'36%', h:'30%', bg:'#fef9c3' },
      { id:'B14-3-EL', spatialId:'ASI-B14-3-Z01', name:'Elevator Bank', type:'elevator', top:'58%', left:'82%', w:'12%', h:'30%', bg:'#e0e7ff' },
    ]},
  },

  B2: {
    G: { label: 'Level G — Admissions', rooms: [
      { id:'B2-G-ADM', spatialId:'ASI-B2-G-A01', name:'Admissions Center', type:'department', top:'10%', left:'10%', w:'50%', h:'40%', bg:'#dbeafe', landmark:true },
      { id:'B2-G-WAIT', spatialId:'ASI-B2-G-W01', name:'Admissions Waiting', type:'waiting', top:'10%', left:'65%', w:'25%', h:'40%', bg:'#fef9c3' },
      { id:'B2-G-EL', spatialId:'ASI-B2-G-Z01', name:'Elevator', type:'elevator', top:'60%', left:'80%', w:'10%', h:'30%', bg:'#e0e7ff' },
    ]},
    '1': { label: 'Level 1 — Inpatient Ward 1', rooms: [
      { id:'B2-1-WARD', spatialId:'ASI-B2-1-A01', name:'Inpatient Ward 1A', type:'department', top:'10%', left:'10%', w:'70%', h:'50%', bg:'#dcfce7', landmark:true },
      { id:'B2-1-NRS', spatialId:'ASI-B2-1-N01', name:'Nurse Station 1B', type:'nurse', top:'70%', left:'10%', w:'40%', h:'20%', bg:'#e0e7ff' },
      { id:'B2-1-EL', spatialId:'ASI-B2-1-Z01', name:'Elevator', type:'elevator', top:'70%', left:'80%', w:'10%', h:'20%', bg:'#e0e7ff' },
    ]},
    '2': { label: 'Level 2 — Inpatient Ward 2', rooms: [
      { id:'B2-2-WARD', spatialId:'ASI-B2-2-A01', name:'Inpatient Ward 2A', type:'department', top:'10%', left:'10%', w:'70%', h:'50%', bg:'#dcfce7', landmark:true },
      { id:'B2-2-EL', spatialId:'ASI-B2-2-Z01', name:'Elevator', type:'elevator', top:'70%', left:'80%', w:'10%', h:'20%', bg:'#e0e7ff' },
    ]},
    '3': { label: 'Level 3 — Inpatient Ward 3', rooms: [
      { id:'B2-3-WARD', spatialId:'ASI-B2-3-A01', name:'Inpatient Ward 3A', type:'department', top:'10%', left:'10%', w:'70%', h:'50%', bg:'#dcfce7', landmark:true },
      { id:'B2-3-EL', spatialId:'ASI-B2-3-Z01', name:'Elevator', type:'elevator', top:'70%', left:'80%', w:'10%', h:'20%', bg:'#e0e7ff' },
    ]},
  },

  B3: {
    G: { label: 'Level G — MH Inpatient', rooms: [
      { id:'B3-G-MH', spatialId:'ASI-B3-G-M01', name:'Inpatient Mental Health', type:'department', top:'10%', left:'10%', w:'60%', h:'50%', bg:'#f5f3ff', landmark:true },
      { id:'B3-G-EL', spatialId:'ASI-B3-G-Z01', name:'Elevator', type:'elevator', top:'70%', left:'80%', w:'10%', h:'20%', bg:'#e0e7ff' },
    ]},
    '1': { label: 'Level 1 — MH Ward 1', rooms: [{ id:'B3-1-WA', spatialId:'ASI-B3-1-A01', name:'MH Ward 1', type:'department', top:'10%', left:'10%', w:'80%', h:'80%', bg:'#f5f3ff' }]},
    '2': { label: 'Level 2 — MH Ward 2', rooms: [{ id:'B3-2-WA', spatialId:'ASI-B3-2-A01', name:'MH Ward 2', type:'department', top:'10%', left:'10%', w:'80%', h:'80%', bg:'#f5f3ff' }]},
    '3': { label: 'Level 3 — MH Ward 3', rooms: [{ id:'B3-3-WA', spatialId:'ASI-B3-3-A01', name:'MH Ward 3', type:'department', top:'10%', left:'10%', w:'80%', h:'80%', bg:'#f5f3ff' }]},
  },

  B4: {
    G: { label: 'Level G — Employee Health', rooms: [
      { id:'B4-G-EHLTH', spatialId:'ASI-B4-G-E01', name:'Employee Health Clinic', type:'department', top:'10%', left:'10%', w:'80%', h:'80%', bg:'#dcfce7', landmark:true },
    ]},
    '1': { label: 'Level 1 — Human Resources', rooms: [
      { id:'B4-1-HR', spatialId:'ASI-B4-1-A01', name:'Human Resources', type:'department', top:'10%', left:'10%', w:'80%', h:'80%', bg:'#f1f5f9' },
    ]},
  },

  B5: {
    G: { label: 'Level G — Nutrition', rooms: [
      { id:'B5-G-NUT', spatialId:'ASI-B5-G-F01', name:'Food & Nutrition Hub', type:'department', top:'10%', left:'10%', w:'80%', h:'80%', bg:'#fef3c7', landmark:true },
    ]},
    '1': { label: 'Level 1 — Dietary Admin', rooms: [
      { id:'B5-1-ADM', spatialId:'ASI-B5-1-A01', name:'Dietary Administration', type:'department', top:'10%', left:'10%', w:'80%', h:'80%', bg:'#f1f5f9' },
    ]},
  },

  B8: {
    G: { label: 'Level G — Canteen', rooms: [
      { id:'B8-G-CAN', spatialId:'ASI-B8-G-C01', name:'Canteen / MPC', type:'department', top:'10%', left:'10%', w:'80%', h:'80%', bg:'#fef3c7', landmark:true },
    ]},
    '1': { label: 'Level 1 — MPC Offices', rooms: [
      { id:'B8-1-OFF', spatialId:'ASI-B8-1-A01', name:'MPC Administration', type:'department', top:'10%', left:'10%', w:'80%', h:'80%', bg:'#f1f5f9' },
    ]},
  },

  B16: {
    G: { label: 'Level G — OP Mental Health', rooms: [
      { id:'B16-G-OPMH', spatialId:'ASI-B16-G-M01', name:'Outpatient Mental Health', type:'department', top:'10%', left:'10%', w:'80%', h:'80%', bg:'#f5f3ff', landmark:true },
    ]},
    '1': { label: 'Level 1 — MH Offices', rooms: [{ id:'B16-1-OFF', spatialId:'ASI-B16-1-A01', name:'Clinical Psychology', type:'department', top:'10%', left:'10%', w:'80%', h:'80%', bg:'#f5f3ff' }]},
    '2': { label: 'Level 2 — MH Specialty', rooms: [{ id:'B16-2-SPEC', spatialId:'ASI-B16-2-A01', name:'MH Specialty Care', type:'department', top:'10%', left:'10%', w:'80%', h:'80%', bg:'#f5f3ff' }]},
  },

  B20: {
    G: { label: 'Level G — Valor House G', rooms: [
      { id:'B20-G-RES', spatialId:'ASI-B20-G-V01', name:'Valor House Lounge', type:'department', top:'10%', left:'10%', w:'80%', h:'80%', bg:'#dbeafe', landmark:true },
    ]},
    '1': { label: 'Level 1 — Valor House 1', rooms: [{ id:'B20-1-RES', spatialId:'ASI-B20-1-A01', name:'Resident Wing 1', type:'department', top:'10%', left:'10%', w:'80%', h:'80%', bg:'#dbeafe' }]},
    '2': { label: 'Level 2 — Valor House 2', rooms: [{ id:'B20-2-RES', spatialId:'ASI-B20-2-A01', name:'Resident Wing 2', type:'department', top:'10%', left:'10%', w:'80%', h:'80%', bg:'#dbeafe' }]},
  },

  B32: {
    G: { label: 'Level G — Fisher House G', rooms: [
      { id:'B32-G-FISH', spatialId:'ASI-B32-G-F01', name:'Fisher House Center', type:'department', top:'10%', left:'10%', w:'80%', h:'80%', bg:'#fee2e2', landmark:true },
    ]},
    '1': { label: 'Level 1 — Fisher House 1', rooms: [{ id:'B32-1-RES', spatialId:'ASI-B32-1-A01', name:'Guest Rooms Level 1', type:'department', top:'10%', left:'10%', w:'80%', h:'80%', bg:'#fee2e2' }]},
    '2': { label: 'Level 2 — Fisher House 2', rooms: [{ id:'B32-2-RES', spatialId:'ASI-B32-2-A01', name:'Guest Rooms Level 2', type:'department', top:'10%', left:'10%', w:'80%', h:'80%', bg:'#fee2e2' }]},
  },

  B47: {
    G: { label: 'Level G — Prosthetics', rooms: [
      { id:'B47-G-PROST', spatialId:'ASI-B47-G-P01', name:'Prosthetics & Orthotics', type:'department', top:'10%', left:'10%', w:'40%', h:'80%', bg:'#dbeafe', landmark:true },
      { id:'B47-G-DRIV', spatialId:'ASI-B47-G-R01', name:'Driver Rehabilitation', type:'department', top:'10%', left:'55%', w:'35%', h:'80%', bg:'#dcfce7', landmark:true },
    ]},
    '1': { label: 'Level 1 — Support', rooms: [{ id:'B47-1-OFF', spatialId:'ASI-B47-1-A01', name:'Clinical Support', type:'department', top:'10%', left:'10%', w:'80%', h:'80%', bg:'#f1f5f9' }]},
  },

  B550: {
    G: { label: 'Level G — VBA Intake', rooms: [
      { id:'B550-G-VBA', spatialId:'ASI-B550-G-V01', name:'Veterans Benefits (VBA)', type:'department', top:'10%', left:'10%', w:'80%', h:'80%', bg:'#dbeafe', landmark:true },
    ]},
    '1': { label: 'Level 1 — Claims', rooms: [{ id:'B550-1-CLAIMS', spatialId:'ASI-B550-1-A01', name:'Claims Processing', type:'department', top:'10%', left:'10%', w:'80%', h:'80%', bg:'#dbeafe' }]},
    '2': { label: 'Level 2 — VBA Admin', rooms: [{ id:'B550-2-ADM', spatialId:'ASI-B550-2-A01', name:'VBA Administration', type:'department', top:'10%', left:'10%', w:'80%', h:'80%', bg:'#dbeafe' }]},
  },

  B590: {
    G: { label: 'Level G — Audiology/Dental', rooms: [
      { id:'B590-G-AUD', spatialId:'ASI-B590-G-A01', name:'Audiology Clinic', type:'department', top:'10%', left:'10%', w:'40%', h:'80%', bg:'#dbeafe', landmark:true },
      { id:'B590-G-DEN', spatialId:'ASI-B590-G-D01', name:'Dental Clinic', type:'department', top:'10%', left:'55%', w:'35%', h:'80%', bg:'#dcfce7', landmark:true },
    ]},
    '1': { label: 'Level 1 — Enrollment', rooms: [{ id:'B590-1-ENR', spatialId:'ASI-B590-1-A01', name:'Veteran Enrollment', type:'department', top:'10%', left:'10%', w:'80%', h:'80%', bg:'#dbeafe', landmark:true }]},
  },

  B6: {
    G: { label: 'Level G — Ground Floor', rooms: [{ id:'B6-G-SVC', spatialId:'ASI-B6-G-001', name:'Support Services G', type:'department', top:'10%', left:'10%', w:'80%', h:'80%', bg:'#f1f5f9' }] },
    '1': { label: 'Level 1 — Upper Floor', rooms: [{ id:'B1-1-SVC', spatialId:'ASI-B6-1-001', name:'Support Services 1', type:'department', top:'10%', left:'10%', w:'80%', h:'80%', bg:'#f1f5f9' }] },
  },
  B7: {
    G: { label: 'Level G — Ground Floor', rooms: [{ id:'B7-G-SPEC', spatialId:'ASI-B7-G-001', name:'Specialty Clinic G', type:'department', top:'10%', left:'10%', w:'80%', h:'80%', bg:'#fef3c7' }] },
    '1': { label: 'Level 1 — Upper Floor', rooms: [{ id:'B7-1-SPEC', spatialId:'ASI-B7-1-001', name:'Specialty Clinic 1', type:'department', top:'10%', left:'10%', w:'80%', h:'80%', bg:'#fef3c7' }] },
  },
  B9: { G: { label: 'Level G — Auditorium', rooms: [{ id:'B9-G-AUD', spatialId:'ASI-B9-G-A01', name:'Main Auditorium', type:'department', top:'10%', left:'10%', w:'80%', h:'80%', bg:'#f1f5f9', landmark:true }] } },
  B13: { G: { label: 'Level G — Child Care', rooms: [{ id:'B13-G-KIDS', spatialId:'ASI-B13-G-C01', name:'First Friends Child Care', type:'department', top:'10%', left:'10%', w:'80%', h:'80%', bg:'#dcfce7', landmark:true }] } },
  B18: { G: { label: 'Level G — Support G', rooms: [{ id:'B18-G-SVC', spatialId:'ASI-B18-G-S01', name:'Support Services', type:'department', top:'10%', left:'10%', w:'80%', h:'80%', bg:'#f1f5f9' }] } },
  B38: { G: { label: 'Level G — East Campus', rooms: [{ id:'B38-G-EAST', spatialId:'ASI-B38-G-E01', name:'East Campus Services', type:'department', top:'10%', left:'10%', w:'80%', h:'80%', bg:'#f1f5f9' }] } },

  // Generic floor layout for support buildings
  _generic: {
    G: { label: 'Level G — Ground Floor', rooms: [
      { id:'gen-G-LOBBY', spatialId:'ASI-GEN-G-001', name:'Reception / Lobby', type:'waiting', top:'28%', left:'22%', w:'56%', h:'38%', bg:'#fef9c3', landmark:true },
      { id:'gen-G-SVC', spatialId:'ASI-GEN-G-002', name:'Services', type:'department', top:'8%', left:'8%', w:'80%', h:'18%', bg:'#dbeafe' },
    ]},
    '1': { label: 'Level 1 — Upper Floor', rooms: [
      { id:'gen-1-SVC', spatialId:'ASI-GEN-1-001', name:'Department Services', type:'department', top:'8%', left:'8%', w:'80%', h:'60%', bg:'#dbeafe', landmark:true },
    ]},
  },
};

// Searchable departments
export const ALL_DEPARTMENTS = [
  { id:'dep-001', name:'Emergency Department', building:'B1', buildingName:'Building 1', floor:'1', spatialId:'ASI-B1-1-001', type:'emergency', tags:['ER','emergency','urgent'] },
  { id:'dep-002', name:'ICU — Intensive Care Unit', building:'B1', buildingName:'Building 1', floor:'1', spatialId:'ASI-B1-1-004', type:'department', tags:['ICU','intensive care'] },
  { id:'dep-003', name:'Main Pharmacy', building:'B1', buildingName:'Building 1', floor:'1', spatialId:'ASI-B1-1-005', type:'pharmacy', tags:['pharmacy','prescriptions','medications'] },
  { id:'dep-004', name:'Internal Medicine Clinic', building:'B1', buildingName:'Building 1', floor:'2', spatialId:'ASI-B1-2-A01', type:'clinic', tags:['internal medicine','primary'] },
  { id:'dep-005', name:"Women's Health Clinic", building:'B1', buildingName:'Building 1', floor:'2', spatialId:'ASI-B1-2-H01', type:'clinic', tags:["women's health",'OB','GYN'] },
  { id:'dep-006', name:'Sleep Medicine', building:'B1', buildingName:'Building 1', floor:'2', spatialId:'ASI-B1-2-K01', type:'clinic', tags:['sleep','insomnia','apnea'] },
  { id:'dep-007', name:'Physical Therapy', building:'B1', buildingName:'Building 1', floor:'3', spatialId:'ASI-B1-3-A01', type:'therapy', tags:['PT','physical therapy','rehab'] },
  { id:'dep-008', name:'Occupational Therapy', building:'B1', buildingName:'Building 1', floor:'3', spatialId:'ASI-B1-3-C01', type:'therapy', tags:['OT','occupational therapy'] },
  { id:'dep-009', name:'Rehabilitation Gym', building:'B1', buildingName:'Building 1', floor:'3', spatialId:'ASI-B1-3-G01', type:'therapy', tags:['rehab','gym','exercise'] },
  { id:'dep-010', name:'Cardiology', building:'B1', buildingName:'Building 1', floor:'4', spatialId:'ASI-B1-4-A01', type:'department', tags:['cardiology','heart','cardiac','EKG'] },
  { id:'dep-011', name:'Blood Lab / Pathology', building:'B1', buildingName:'Building 1', floor:'4', spatialId:'ASI-B1-4-L01', type:'lab', tags:['blood lab','pathology','lab','blood draw'] },
  { id:'dep-012', name:'Admissions & Registration', building:'B2', buildingName:'Building 2', floor:'G', spatialId:'ASI-B2-G-A01', type:'admin', tags:['admissions','registration','check-in'] },
  { id:'dep-013', name:'Café / Canteen', building:'B1', buildingName:'Building 1', floor:'G', spatialId:'ASI-B1-G-003', type:'service', tags:['cafe','food','coffee','lunch'] },
  { id:'dep-014', name:'Chapel', building:'B1', buildingName:'Building 1', floor:'G', spatialId:'ASI-B1-G-005', type:'service', tags:['chapel','prayer','spiritual'] },
  { id:'dep-015', name:'Primary Care Clinic', building:'B14', buildingName:'Building 14', floor:'G', spatialId:'ASI-B14-G-P01', type:'clinic', tags:['primary care','PCP','general'] },
  { id:'dep-016', name:'Optometry Clinic', building:'B14', buildingName:'Building 14', floor:'2', spatialId:'ASI-B14-2-O01', type:'clinic', tags:['optometry','eye','vision','glasses'] },
  { id:'dep-017', name:'Mental Health Services', building:'B14', buildingName:'Building 14', floor:'3', spatialId:'ASI-B14-3-M01', type:'mental health', tags:['mental health','psychiatry','counseling'] },
  { id:'dep-018', name:'Peer Support Center', building:'B14', buildingName:'Building 14', floor:'3', spatialId:'ASI-B14-3-S01', type:'mental health', tags:['peer support','veterans'] },
  { id:'dep-019', name:'Veterans Benefits (VBA)', building:'B550', buildingName:'Building 550', floor:'G', spatialId:'ASI-B550-G-V01', type:'admin', tags:['VBA','benefits','claims','compensation'] },
  { id:'dep-020', name:'Audiology Clinic', building:'B590', buildingName:'Building 590', floor:'G', spatialId:'ASI-B590-G-A01', type:'clinic', tags:['audiology','hearing','hearing aids'] },
  { id:'dep-021', name:'Dental Clinic', building:'B590', buildingName:'Building 590', floor:'G', spatialId:'ASI-B590-G-D01', type:'clinic', tags:['dental','dentist','teeth'] },
  { id:'dep-022', name:'Driver Rehabilitation', building:'B47', buildingName:'Building 47', floor:'G', spatialId:'ASI-B47-G-R01', type:'therapy', tags:['driver rehab','driving','adaptive'] },
  { id:'dep-023', name:'Prosthetics & Orthotics', building:'B47', buildingName:'Building 47', floor:'G', spatialId:'ASI-B47-G-P01', type:'clinic', tags:['prosthetics','orthotics','limbs'] },
  { id:'dep-024', name:'Food & Nutrition Hub', building:'B5', buildingName:'Building 5', floor:'G', spatialId:'ASI-B5-G-F01', type:'service', tags:['food','nutrition','dietary'] },
  { id:'dep-025', name:'Canteen / MPC', building:'B8', buildingName:'Building 8', floor:'G', spatialId:'ASI-B8-G-C01', type:'service', tags:['canteen','cafeteria','food','MPC'] },
  { id:'dep-026', name:'Employee Health', building:'B4', buildingName:'Building 4', floor:'G', spatialId:'ASI-B4-G-E01', type:'clinic', tags:['employee health','occupational health','staff'] },
  { id:'dep-027', name:'Outpatient Mental Health', building:'B16', buildingName:'Building 16', floor:'G', spatialId:'ASI-B16-G-M01', type:'mental health', tags:['outpatient','mental health','counseling'] },
  { id:'dep-028', name:'Fisher House', building:'B32', buildingName:'Building 32', floor:'G', spatialId:'ASI-B32-G-F01', type:'service', tags:['fisher house','lodging','family','housing'] },
  { id:'dep-029', name:'Valor House', building:'B20', buildingName:'Building 20', floor:'G', spatialId:'ASI-B20-G-V01', type:'service', tags:['valor house','transitional','housing','veterans'] },
  { id:'dep-030', name:'Inpatient Mental Health', building:'B3', buildingName:'Building 3', floor:'G', spatialId:'ASI-B3-G-M01', type:'mental health', tags:['inpatient','mental health','psychiatric'] },
];

// Routing nodes & edges (key paths)
export const ROUTING_NODES = {
  'park-garage': { id:'park-garage', label:'Parking Garage', type:'parking', landmark:'Main Visitor Parking Garage (enter from Valdez Drive)' },
  'park-er': { id:'park-er', label:'ER Parking', type:'parking', landmark:'Emergency Room Parking (red signs, north of Bldg 1 Emergency entrance)' },
  'ent-main': { id:'ent-main', label:'Main Entrance', building:null, floor:null, type:'entrance', landmark:'Main Entrance Gate on Valdez Drive (US Flag, yellow bollards)' },
  'B1-G-ENT': { id:'B1-G-ENT', label:'Building 1 Main Doors', building:'B1', floor:'G', type:'entrance', landmark:'Building 1 main glass doors (straight ahead from parking garage)' },
  'B1-G-LOBBY': { id:'B1-G-LOBBY', label:'Main Lobby', building:'B1', floor:'G', type:'landmark', landmark:'Blue Information Desk in the Main Lobby — primary landmark' },
  'B1-G-ELA': { id:'B1-G-ELA', label:'Elevator Bank A - LG', building:'B1', floor:'G', type:'elevator', landmark:'Elevator Bank A (past the Café on your left)' },
  'B1-1-ELA': { id:'B1-1-ELA', label:'Elevator Bank A - L1', building:'B1', floor:'1', type:'elevator', landmark:'Elevator Bank A on Level 1' },
  'B1-1-PHRM': { id:'B1-1-PHRM', label:'Main Pharmacy L1', building:'B1', floor:'1', type:'landmark', landmark:'Main Pharmacy — on your RIGHT' },
  'B1-1-ED': { id:'B1-1-ED', label:'Emergency Dept L1', building:'B1', floor:'1', type:'destination' },
  'B1-2-ELA': { id:'B1-2-ELA', label:'Elevator Bank A - L2', building:'B1', floor:'2', type:'elevator', landmark:'Elevator Bank A on Level 2' },
  'ASI-B1-2-A01': { id:'ASI-B1-2-A01', label:'Internal Medicine L2', building:'B1', floor:'2', type:'destination' },
  'B1-3-ELA': { id:'B1-3-ELA', label:'Elevator Bank A - L3', building:'B1', floor:'3', type:'elevator' },
  'B1-4-ELA': { id:'B1-4-ELA', label:'Elevator Bank A - L4', building:'B1', floor:'4', type:'elevator', landmark:'Elevator Bank A — Level 4' },
  'ASI-B1-4-A01': { id:'ASI-B1-4-A01', label:'Cardiology L4', building:'B1', floor:'4', type:'destination' },
  'B1-B-ELB': { id:'B1-B-ELB', label:'Elevator Bank B - LB', building:'B1', floor:'B', type:'elevator', landmark:'Elevator Bank B — take to Level B (Basement)' },
  'B1-B-TUN': { id:'B1-B-TUN', label:'Tunnel Corridor', building:'B1', floor:'B', type:'tunnel', landmark:'Underground Tunnel (follow blue floor markings)' },
  'B14-B-TUN': { id:'B14-B-TUN', label:'Tunnel Exit Bldg 14', building:'B14', floor:'B', type:'tunnel', landmark:'Tunnel exit — turn RIGHT at the Building 14 sign' },
  'B14-B-EL': { id:'B14-B-EL', label:'Elevator Bldg 14 LB', building:'B14', floor:'B', type:'elevator' },
  'ASI-B14-1-A01': { id:'ASI-B14-1-A01', label:'Bldg 14 Emergency Entrance A', building:'B14', floor:'1', type:'destination' },
  'ASI-B14-1-B01': { id:'ASI-B14-1-B01', label:'Bldg 14 Scheduled Entrance B', building:'B14', floor:'1', type:'destination' },
  'ASI-B14-G-P01': { id:'ASI-B14-G-P01', label:'Primary Care Clinic', building:'B14', floor:'G', type:'destination' },
  'ASI-B14-2-O01': { id:'ASI-B14-2-O01', label:'Optometry Bldg14 L2', building:'B14', floor:'2', type:'destination' },
  'ASI-B14-3-M01': { id:'ASI-B14-3-M01', label:'Mental Health Bldg14 L3', building:'B14', floor:'3', type:'destination' },
  'ent-main-B2': { id:'ent-main-B2', label:'B2 Entrance', building:'B2', floor:'G', type:'entrance' },
  'ASI-B2-G-A01': { id:'ASI-B2-G-A01', label:'Admissions Center', building:'B2', floor:'G', type:'destination' },
};

export const ROUTING_EDGES = [
  { from:'park-garage', to:'ent-main', cost:2, accessible:true, type:'walking', instruction:'Exit the Parking Garage and walk toward the Main Entrance on Valdez Drive (2 min).' },
  { from:'park-er', to:'B1-1-ED', cost:1, accessible:true, type:'walking', instruction:'Walk directly from ER Parking to the Emergency Entrance of Building 1.' },
  { from:'ent-main', to:'B1-G-ENT', cost:1, accessible:true, type:'walking', instruction:'Enter campus from Main Gate and walk straight to Building 1 main glass doors (flag poles on your right).' },
  { from:'B1-G-ENT', to:'B1-G-LOBBY', cost:1, accessible:true, type:'corridor', instruction:'Go through the main doors. The Blue Information Desk is straight ahead in the Lobby.' },
  { from:'B1-G-LOBBY', to:'B1-G-ELA', cost:1, accessible:true, type:'corridor', instruction:'Pass the Café on your right, then turn LEFT. Elevator Bank A is at the end of the corridor.' },
  { from:'B1-G-ELA', to:'B1-1-ELA', cost:1, accessible:true, type:'elevator', instruction:'Take Elevator Bank A to Level 1.' },
  { from:'B1-G-ELA', to:'B1-2-ELA', cost:1, accessible:true, type:'elevator', instruction:'Take Elevator Bank A to Level 2.' },
  { from:'B1-G-ELA', to:'B1-3-ELA', cost:1, accessible:true, type:'elevator', instruction:'Take Elevator Bank A to Level 3.' },
  { from:'B1-G-ELA', to:'B1-4-ELA', cost:1, accessible:true, type:'elevator', instruction:'Take Elevator Bank A to Level 4.' },
  { from:'B1-G-ELA', to:'B1-B-ELB', cost:1, accessible:true, type:'elevator', instruction:'Take Elevator Bank B all the way down to Level B (Basement).' },
  { from:'B1-1-ELA', to:'B1-1-PHRM', cost:1, accessible:true, type:'corridor', instruction:'Exit elevator. Main Pharmacy is on your RIGHT.' },
  { from:'B1-1-PHRM', to:'B1-1-ED', cost:1, accessible:true, type:'corridor', instruction:'Pass the Pharmacy and turn LEFT at the junction. Emergency Dept is ahead.' },
  { from:'B1-2-ELA', to:'ASI-B1-2-A01', cost:1, accessible:true, type:'corridor', instruction:'Exit elevator, turn LEFT. Internal Medicine Clinic is the first door on your left.' },
  { from:'B1-4-ELA', to:'ASI-B1-4-A01', cost:1, accessible:true, type:'corridor', instruction:'Exit elevator, turn RIGHT. Cardiology is at the end of the corridor.' },
  { from:'B1-B-ELB', to:'B1-B-TUN', cost:1, accessible:true, type:'corridor', instruction:'Exit Elevator Bank B at Level B. Enter the Tunnel Corridor. Follow the BLUE floor markings.' },
  { from:'B1-B-TUN', to:'B14-B-TUN', cost:2, accessible:true, type:'tunnel', instruction:'Walk through the underground tunnel toward Building 14. Follow signs marked "Bldg 14." (~4 min walk).' },
  { from:'B14-B-TUN', to:'B14-B-EL', cost:1, accessible:true, type:'corridor', instruction:'Exit the tunnel. Turn RIGHT. Take the Building 14 elevator.' },
  { from:'B14-B-EL', to:'ASI-B14-1-A01', cost:1, accessible:true, type:'elevator', instruction:'Take elevator to Level 1. Emergency Entrance A is directly in front of you.' },
  { from:'B14-B-EL', to:'ASI-B14-1-B01', cost:1, accessible:true, type:'elevator', instruction:'Take elevator to Level 1. Scheduled Care Entrance B is to your right.' },
  { from:'B14-B-EL', to:'ASI-B14-G-P01', cost:1, accessible:true, type:'elevator', instruction:'Take elevator to Level G. Primary Care Registration is straight ahead.' },
  { from:'B14-B-EL', to:'ASI-B14-2-O01', cost:1, accessible:true, type:'elevator', instruction:'Take elevator to Level 2. Optometry is the first door on your right.' },
  { from:'B14-B-EL', to:'ASI-B14-3-M01', cost:1, accessible:true, type:'elevator', instruction:'Take elevator to Level 3. Mental Health Services is on your left.' },
  { from:'ent-main', to:'ent-main-B2', cost:3, accessible:true, type:'walking', instruction:'Walk south from the main entrance toward Building 2.' },
  { from:'ent-main-B2', to:'ASI-B2-G-A01', cost:1, accessible:true, type:'corridor', instruction:'Enter Building 2. Admissions is in the main lobby.' },
];

export const PRESET_ROUTES = {
  'garage-cardiology': { name:'Parking Garage → Cardiology', nodes:['park-garage','ent-main','B1-G-ENT','B1-G-LOBBY','B1-G-ELA','B1-4-ELA','ASI-B1-4-A01'], estimatedMinutes:10 },
  'er-parking-emergency': { name:'ER Parking → Emergency Dept', nodes:['park-er','B1-1-ED'], estimatedMinutes:2 },
  'bldg1-to-bldg14-tunnel': { name:'Building 1 → Building 14 (via Tunnel)', nodes:['B1-G-ELA','B1-B-ELB','B1-B-TUN','B14-B-TUN','B14-B-EL','ASI-B14-1-B01'], estimatedMinutes:14 },
};
