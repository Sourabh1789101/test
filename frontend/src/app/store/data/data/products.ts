// Mock product data generator
export interface Product {
  id: string;
  name: string;
  code: string;
  image: string;
  category: string;
  materials: ('aluminum' | '3MM FOAMEX' | '1MM FOAMEX' | '4MM CORREX' | 'SELF ADHESIVE VINYL' | 'acrylic' | 'vinyl')[];
  sizes: { name: string; dimensions: string }[];
  priceRange: { min: number; max: number };
  description: string;
}

const materialIcons = {
  aluminum: 'AL',
  '3MM FOAMEX': '3MM FOAMEX',
  '1MM FOAMEX': '1MM FOAMEX',
  '4MM CORREX': '4MM CORREX',
  'SELF ADHESIVE VINYL': 'SELF ADHESIVE VINYL',
  acrylic: 'AC',
  vinyl: 'VI',
};

const signImages = [
  'https://images.unsplash.com/photo-1768391548073-afe6a7255b8a?w=400',
  'https://images.unsplash.com/photo-1758691737535-57edd2a11d73?w=400',
  'https://images.unsplash.com/photo-1758520145175-aa3b593b81af?w=400',
  'https://images.unsplash.com/photo-1759803516315-c022bae806bc?w=400',
  'https://images.unsplash.com/photo-1695048168808-4bbfa1efdfa7?w=400',
  'https://images.unsplash.com/photo-1570566920413-fd6410fec24c?w=400',
  'https://images.unsplash.com/photo-1758691737535-57edd2a11d73?w=400',
  'https://images.unsplash.com/photo-1758520145175-aa3b593b81af?w=400',
  'https://images.unsplash.com/photo-1759803516315-c022bae806bc?w=400',
  'https://images.unsplash.com/photo-1695048168808-4bbfa1efdfa7?w=400',
];

const commonSizes = [
  { name: 'Small', dimensions: '6x6"' },
  { name: 'Medium', dimensions: '12x12"' },
  { name: 'Large', dimensions: '24x24"' },
  { name: 'X-Large', dimensions: '36x48"' },
];

const signTypes: Record<string, string[]> = {
  safety: [
    'Emergency Exit', 'First Aid Station', 'Fire Extinguisher', 'Eye Wash Station',
    'Safety Shower', 'Hard Hat Required', 'Safety Glasses Required', 'Hearing Protection',
    'High Voltage', 'Caution Wet Floor', 'Authorized Personnel Only', 'Emergency Assembly',
    'No Smoking', 'Fire Door Keep Clear', 'Safety Equipment Location', 'Danger Keep Out',
    'Lockout Tagout', 'Hot Surface Warning', 'Chemical Storage', 'Biohazard',
    'Radiation Warning', 'Laser Radiation', 'Confined Space', 'Fall Protection',
    'Forklift Traffic', 'Pedestrian Crossing', 'Machine Guard', 'Pinch Point',
    'Moving Parts', 'Safety First', 'PPE Required', 'Emergency Stop'
  ],
  directional: [
    'Exit Arrow Left', 'Exit Arrow Right', 'Exit Arrow Up', 'Exit Arrow Down',
    'Reception Arrow', 'Restroom Arrow', 'Conference Room', 'Elevator Arrow',
    'Stairs Arrow', 'Emergency Exit Route', 'Parking Arrow', 'Loading Dock',
    'Entrance Arrow', 'Delivery Entrance', 'Employee Entrance', 'Visitor Entrance',
    'One Way Arrow', 'Do Not Enter', 'Way Out', 'This Way',
    'Emergency Route', 'Assembly Point', 'Evacuation Route', 'Fire Exit',
    'North Arrow', 'Building Directory', 'You Are Here', 'Floor Level',
    'Department Directory', 'Office Locator', 'Facility Map', 'Navigation Guide'
  ],
  office: [
    'Conference Room', 'Private Office', 'Reception', 'Lobby',
    'Break Room', 'Kitchen', 'Copy Room', 'Mail Room',
    'Server Room', 'IT Department', 'Human Resources', 'Finance',
    'Marketing', 'Sales', 'Executive Suite', 'Meeting Room',
    'Training Room', 'Board Room', 'Storage Room', 'Supply Closet',
    'Quiet Zone', 'Phone Booth', 'Collaboration Space', 'Hot Desk',
    'Reserved Parking', 'Employee Parking', 'Visitor Parking', 'Handicap Parking',
    'No Parking', 'Loading Zone', 'Fire Lane', 'Reserved Space'
  ],
  informational: [
    'Hours of Operation', 'Business Hours', 'Open Sign', 'Closed Sign',
    'Please Ring Bell', 'Push to Open', 'Pull to Open', 'Automatic Door',
    'No Soliciting', 'Private Property', 'Video Surveillance', 'Alarm System',
    'Maximum Capacity', 'Weight Limit', 'Height Clearance', 'Width Restriction',
    'Speed Limit', 'Slow Down', 'Stop', 'Yield',
    'WiFi Available', 'Restroom Available', 'ATM Location', 'Elevator Out',
    'Under Construction', 'Pardon Our Dust', 'Coming Soon', 'Now Open',
    'Grand Opening', 'Special Hours', 'Closed for Holiday', 'By Appointment',
    'Walk-Ins Welcome', 'Reservations Required', 'Call for Service', 'Information Desk'
  ],
  hazard: [
    'Danger High Voltage', 'Warning Electrical Hazard', 'Caution Moving Parts', 'Hot Surface',
    'Toxic Materials', 'Flammable Liquids', 'Explosive Materials', 'Compressed Gas',
    'Corrosive Materials', 'Oxidizing Agent', 'Poison', 'Biohazard Warning',
    'Radiation Area', 'Laser Hazard', 'High Pressure', 'Overhead Load',
    'Fork Lift Traffic', 'Slippery Surface', 'Trip Hazard', 'Low Clearance',
    'Sharp Objects', 'Heavy Objects', 'Chemical Storage', 'Gas Cylinder',
    'Confined Space Entry', 'Permit Required', 'Danger Do Not Enter', 'Keep Clear',
    'Energized Equipment', 'Live Wires', 'Underground Cable', 'Overhead Power Lines'
  ],
  electrical: [
    'Electrical Panel', 'Main Breaker', 'Sub Panel', 'Emergency Shutoff',
    'High Voltage', 'Danger Live Wires', 'Authorized Personnel', 'Electricians Only',
    'Generator Room', 'Battery Room', 'UPS Room', 'Electrical Closet',
    'Transformer', 'Disconnect Switch', 'Service Entrance', 'Meter Room',
    'Lightning Protection', 'Ground Connection', 'Bonding Point', 'Test Point',
    'Circuit Breaker', 'Fuse Box', 'Junction Box', 'Pull Box',
    'Control Panel', 'Motor Starter', 'Variable Frequency Drive', 'PLC Cabinet',
    'Cable Tray', 'Conduit Route', 'Wire Identification', 'Phase Marking'
  ],
  construction: [
    'Hard Hat Area', 'Construction Zone', 'Men Working', 'Work Zone Ahead',
    'Road Work Ahead', 'Detour', 'Road Closed', 'Lane Closed',
    'Flagman Ahead', 'Slow Construction', 'Heavy Equipment', 'Trucks Entering',
    'Falling Objects', 'Overhead Work', 'Scaffolding', 'Ladder Access',
    'Excavation Site', 'Trenching Area', 'Blasting Zone', 'Demolition Area',
    'Concrete Curing', 'Wet Paint', 'Fresh Tar', 'Uneven Surface',
    'Temporary Road', 'Rough Road', 'Loose Gravel', 'Bump Ahead',
    'Ramp Ahead', 'Steep Grade', 'Sharp Turn', 'Narrow Road'
  ],
  parking: [
    'Visitor Parking', 'Employee Parking', 'Reserved Parking', 'Handicap Parking',
    'Expectant Mother', 'Electric Vehicle', 'Motorcycle Parking', 'Bicycle Parking',
    'Compact Car Only', 'No Parking', 'Tow Away Zone', 'Fire Lane',
    'Loading Zone', 'Delivery Only', 'Customer Parking', 'Staff Only',
    'Parking Lot Full', 'Parking This Way', 'Exit Only', 'Entrance Only',
    'One Way Traffic', 'Speed Limit 5', 'Speed Limit 10', 'Speed Bump',
    'Stop Sign', 'Yield Sign', 'Do Not Block', 'Keep Clear',
    'Parking Permit', 'Pay Station', 'Parking Rates', 'Time Limit'
  ],
  warehouse: [
    'Warehouse Entrance', 'Shipping Dock', 'Receiving Dock', 'Loading Bay',
    'Forklift Zone', 'Pallet Storage', 'Racking Area', 'Clear Aisle',
    'Fire Exit Keep Clear', 'Emergency Equipment', 'Sprinkler Valve', 'Fire Alarm',
    'Assembly Area', 'Staging Area', 'Quality Control', 'Inspection Zone',
    'Quarantine Area', 'Returns Processing', 'Damage Claims', 'Lost & Found',
    'Inventory Storage', 'Cold Storage', 'Hazmat Storage', 'Flammable Storage',
    'Tool Crib', 'Parts Room', 'Maintenance Shop', 'Equipment Storage',
    'Trash Compactor', 'Recycling Center', 'Cardboard Baler', 'Waste Disposal'
  ],
  outdoor: [
    'Entrance', 'Exit', 'Private Property', 'No Trespassing',
    'Keep Off Grass', 'Pet Policy', 'Leash Required', 'No Dogs',
    'Bike Path', 'Walking Trail', 'Hiking Trail', 'Nature Trail',
    'Picnic Area', 'Playground', 'Swimming Pool', 'Beach Access',
    'Boat Launch', 'Fishing Allowed', 'No Swimming', 'No Diving',
    'Campsite', 'RV Parking', 'Tent Area', 'Fire Pit',
    'Wildlife Area', 'Bird Watching', 'Protected Species', 'Natural Habitat',
    'Stay on Trail', 'Erosion Control', 'Restoration Area', 'Conservation Zone'
  ],
  restroom: [
    'Men Restroom', 'Women Restroom', 'Unisex Restroom', 'Family Restroom',
    'ADA Compliant', 'Accessible Restroom', 'Baby Changing', 'Nursing Room',
    'Gender Neutral', 'All Gender', 'Private Restroom', 'Single Occupancy',
    'Multi-Stall', 'Restroom Closed', 'Out of Order', 'Under Maintenance',
    'Restroom This Way', 'Facilities Nearby', 'Next Floor Up', 'Next Floor Down',
    'Handicap Accessible', 'Wheelchair Access', 'Elevator Access', 'Ramp Access',
    'Service Animal', 'Assistance Available', 'Call Button', 'Emergency Pull',
    'Occupancy Indicator', 'Vacant Sign', 'Occupied Sign', 'Please Knock'
  ],
  custom: [
    'Company Logo Sign', 'Welcome Sign', 'Thank You Sign', 'Company Name',
    'Department Name', 'Building Name', 'Suite Number', 'Office Number',
    'Employee Name', 'Job Title', 'Company Slogan', 'Mission Statement',
    'Core Values', 'Safety Policy', 'Quality Policy', 'Vision Statement',
    'Company History', 'Awards & Recognition', 'Certifications', 'Accreditations',
    'Hours of Operation', 'Contact Information', 'Phone Directory', 'Emergency Contacts',
    'Product Display', 'Service Menu', 'Price List', 'Promotional Sign',
    'Event Signage', 'Wayfinding', 'Building Directory', 'Floor Plan'
  ],
  compliance: [
    'OSHA Required', 'ADA Compliant', 'FDA Regulation', 'EPA Standard',
    'ANSI Standard', 'ISO Certified', 'Fire Code', 'Building Code',
    'Health Inspection', 'Food Safety', 'Sanitation Required', 'Hand Washing',
    'PPE Required', 'Safety Data Sheet', 'Chemical Label', 'Hazard Communication',
    'Right to Know', 'Workplace Safety', 'MSDS Location', 'Emergency Plan',
    'Evacuation Map', 'Assembly Point', 'Fire Drill', 'Emergency Contact',
    'Accident Report', 'Incident Report', 'Near Miss', 'Safety Committee',
    'Safety Meeting', 'Training Required', 'Certification Posted', 'License Display'
  ],
};

export function generateProducts(category: string, count: number = 30): Product[] {
  const types = signTypes[category] || [];
  const products: Product[] = [];
  
  for (let i = 0; i < count && i < types.length; i++) {
    const materials: Product['materials'] = [];
    const numMaterials = Math.floor(Math.random() * 3) + 2; // 2-4 materials
    
    const allMaterials: Product['materials'][number][] = [
      'aluminum',
      '3MM FOAMEX',
      '1MM FOAMEX',
      '4MM CORREX',
      'SELF ADHESIVE VINYL',
      'acrylic',
      'vinyl',
    ];
    for (let j = 0; j < numMaterials; j++) {
      const mat = allMaterials[Math.floor(Math.random() * allMaterials.length)];
      if (!materials.includes(mat)) materials.push(mat);
    }
    
    products.push({
      id: `${category}-${i + 1}`,
      name: types[i],
      code: `${category.substring(0, 3).toUpperCase()}-${String(i + 1).padStart(3, '0')}`,
      image: signImages[i % signImages.length],
      category,
      materials,
      sizes: commonSizes,
      priceRange: { min: 12.99, max: 89.99 },
      description: `Professional ${types[i]} sign for commercial and industrial use. Available in multiple materials and sizes.`,
    });
  }
  
  return products;
}

export { materialIcons };
