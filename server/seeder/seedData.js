import dotenv from 'dotenv';
dotenv.config();

export const getSeedUsers = () => {
  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;
  const name = process.env.ADMIN_NAME || 'System Administrator';

  if (!email || !password) {
    throw new Error('[Security Exception] ADMIN_EMAIL and ADMIN_PASSWORD environment variables are required to seed admin user.');
  }

  return [
    {
      name,
      email: email.toLowerCase(),
      password,
      role: 'admin',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80',
    },
  ];
};

export const seedUsers = process.env.ADMIN_EMAIL && process.env.ADMIN_PASSWORD ? getSeedUsers() : [];


export const seedProducts = [
  {
    name: 'Novamide® PA66-GF30 Structural Composite',
    code: 'NV-PA66-30GF',
    category: 'Engineering Materials',
    polymerFamily: 'Polyamide 66',
    shortDescription: '30% glass-fiber reinforced Polyamide 66 with outstanding mechanical strength, high stiffness, and elevated heat deflection resistance.',
    fullDescription: 'Novamide® PA66-GF30 is a high-grade injection molding compound reinforced with 30% chemically-coupled glass fibers. It delivers high dimensional stability, outstanding creep resistance under continuous load, and superior heat resistance up to 250°C peak temperatures. Ideal for demanding metal-replacement automotive and industrial applications.',
    featuredImage: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80',
    ],
    datasheetUrl: 'https://nova-materials.com/docs/TDS_NV_PA66_30GF.pdf',
    isFeatured: true,
    status: 'active',
    specifications: [
      { label: 'Tensile Modulus', value: '9,800', unit: 'MPa', testStandard: 'ISO 527' },
      { label: 'Tensile Strength at Break', value: '175', unit: 'MPa', testStandard: 'ISO 527' },
      { label: 'Melt Flow Index (275°C / 5kg)', value: '14.5', unit: 'g/10min', testStandard: 'ISO 1133' },
      { label: 'Density', value: '1.36', unit: 'g/cm³', testStandard: 'ISO 1183' },
      { label: 'Heat Deflection Temp (1.8 MPa)', value: '250', unit: '°C', testStandard: 'ISO 75' },
      { label: 'Charpy Notched Impact (23°C)', value: '11.0', unit: 'kJ/m²', testStandard: 'ISO 179' },
      { label: 'Flammability Rating', value: 'HB (UL94)', unit: '', testStandard: 'UL 94' },
      { label: 'Processing Melt Temperature', value: '280 – 305', unit: '°C', testStandard: 'Internal Standard' },
      { label: 'Mold Temperature', value: '80 – 100', unit: '°C', testStandard: 'Internal Standard' },
    ],
    keyBenefits: [
      'Up to 40% weight reduction compared to aluminum die-cast parts',
      'Superior fatigue strength under vibrational stresses',
      'High chemical resistance to engine oils, greases, and glycol coolants',
      'Outstanding surface finish and high weld-line strength',
    ],
    applications: [
      'Automotive intake manifolds & cylinder head covers',
      'Power tool housings & high-torque gear wheels',
      'Industrial pump impellers and fluid connectors',
      'Heavy-duty conveyor chain links',
    ],
    industries: ['Automotive', 'Manufacturing', 'Electronics', 'Consumer Products'],
    processingMethods: ['Injection Molding'],
    certifications: ['ISO 9001', 'IATF 16949', 'RoHS Compliant', 'REACH SVHC Free'],
  },
  {
    name: 'NovaPeak® PEEK-4500 Ultra High-Performance',
    code: 'NV-PEEK-4500',
    category: 'Engineering Materials',
    polymerFamily: 'Polyetheretherketone (PEEK)',
    shortDescription: 'Unfilled high-flow polyetheretherketone granules offering unmatched chemical resistance, continuous service up to 260°C, and exceptional wear resistance.',
    fullDescription: 'NovaPeak® PEEK-4500 represents the pinnacle of high-performance thermoplastic engineering. It exhibits continuous working temperatures up to 260°C, extreme resistance to harsh chemicals, steam, and radiation, coupled with high biocompatibility for precision aerospace and medical environments.',
    featuredImage: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=800&q=80',
    images: ['https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=800&q=80'],
    datasheetUrl: 'https://nova-materials.com/docs/TDS_NV_PEEK_4500.pdf',
    isFeatured: true,
    status: 'active',
    specifications: [
      { label: 'Tensile Strength', value: '100', unit: 'MPa', testStandard: 'ISO 527' },
      { label: 'Tensile Modulus', value: '3,800', unit: 'MPa', testStandard: 'ISO 527' },
      { label: 'Melt Flow Index (380°C / 5kg)', value: '45.0', unit: 'g/10min', testStandard: 'ISO 1133' },
      { label: 'Density', value: '1.30', unit: 'g/cm³', testStandard: 'ISO 1183' },
      { label: 'Continuous Service Temp', value: '260', unit: '°C', testStandard: 'UL 746B' },
      { label: 'Melting Point', value: '343', unit: '°C', testStandard: 'ISO 11357' },
      { label: 'Flammability Rating', value: 'V-0 (1.5mm)', unit: '', testStandard: 'UL 94' },
    ],
    keyBenefits: [
      'Continuous operating capability in extreme thermal environments (260°C)',
      'Exceptional hydrolysis resistance across pressurized steam cycles',
      'Low outgassing compliant with aerospace standards (NASA SP-R-0022A)',
      'Self-extinguishing with minimal smoke generation',
    ],
    applications: [
      'Aerospace seal rings & backup rings',
      'Semiconductor wafer baskets and CMP rings',
      'Sterilizable surgical instrument handles & dental abutments',
      'Deep-sea oil & gas electrical downhole connectors',
    ],
    industries: ['Aerospace & Defense', 'Medical & Healthcare', 'Electronics'],
    processingMethods: ['Injection Molding', 'Extrusion', 'Compression Molding'],
    certifications: ['ISO 9001', 'ISO 13485 (Medical)', 'FDA 21 CFR 177.2415', 'UL94 V-0'],
  },
  {
    name: 'Novaprene® PP-5100 High-Impact Copolymer',
    code: 'NV-PP-5100',
    category: 'Polymer Granules',
    polymerFamily: 'Polypropylene Copolymer',
    shortDescription: 'Heterophasic polypropylene copolymer granules optimized for high impact retention at sub-zero temperatures and high flow injection molding.',
    fullDescription: 'Novaprene® PP-5100 is an advanced impact copolymer designed with an ethylene-propylene rubber phase dispersed within a crystalline PP matrix. It guarantees superior impact toughness down to -20°C, rapid cycle times in thin-wall injection molds, and excellent antistatic additives.',
    featuredImage: 'https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=800&q=80',
    images: ['https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=800&q=80'],
    datasheetUrl: 'https://nova-materials.com/docs/TDS_NV_PP_5100.pdf',
    isFeatured: true,
    status: 'active',
    specifications: [
      { label: 'Melt Flow Rate (230°C / 2.16kg)', value: '30.0', unit: 'g/10min', testStandard: 'ISO 1133' },
      { label: 'Density', value: '0.905', unit: 'g/cm³', testStandard: 'ISO 1183' },
      { label: 'Flexural Modulus', value: '1,350', unit: 'MPa', testStandard: 'ISO 178' },
      { label: 'Izod Notched Impact (23°C)', value: '9.5', unit: 'kJ/m²', testStandard: 'ISO 180' },
      { label: 'Izod Notched Impact (-20°C)', value: '5.2', unit: 'kJ/m²', testStandard: 'ISO 180' },
      { label: 'Vicat Softening Temperature', value: '152', unit: '°C', testStandard: 'ISO 306' },
    ],
    keyBenefits: [
      'Sub-zero impact resistance prevents cracking during winter transport',
      'High melt flow enables fast cycle times and lower energy consumption',
      'Outstanding organoleptic properties with zero odor contamination',
    ],
    applications: [
      'Industrial storage crates & stackable logistic totes',
      'Automotive battery cases & interior trim panels',
      'Deep-freeze food packaging containers',
      'Large household appliance components',
    ],
    industries: ['Packaging', 'Automotive', 'Consumer Products', 'Manufacturing'],
    processingMethods: ['Injection Molding', 'Thin-Wall Molding'],
    certifications: ['ISO 9001', 'FDA 21 CFR 177.1520', 'EU 10/2011 Food Contact'],
  },
  {
    name: 'NovaShield® Flame Retardant ABS V-0',
    code: 'NV-ABS-FRV0',
    category: 'Industrial Compounds',
    polymerFamily: 'Acrylonitrile Butadiene Styrene (ABS)',
    shortDescription: 'Halogen-free flame retardant ABS compound with high gloss surface finish, superior impact strength, and certified UL94 V-0 flammability.',
    fullDescription: 'NovaShield® NV-ABS-FRV0 is an engineered ABS formulation compounded with halogen-free flame retardant additives. It complies with strict RoHS and WEEE ecological directives while offering outstanding surface aesthetics, electrical insulation, and high rigidity for consumer and commercial electronic enclosures.',
    featuredImage: 'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&w=800&q=80',
    images: ['https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&w=800&q=80'],
    datasheetUrl: 'https://nova-materials.com/docs/TDS_NV_ABS_FRV0.pdf',
    isFeatured: true,
    status: 'active',
    specifications: [
      { label: 'Melt Volume Rate (220°C / 10kg)', value: '22.0', unit: 'cm³/10min', testStandard: 'ISO 1133' },
      { label: 'Density', value: '1.18', unit: 'g/cm³', testStandard: 'ISO 1183' },
      { label: 'Tensile Strength', value: '45', unit: 'MPa', testStandard: 'ISO 527' },
      { label: 'Charpy Notched Impact (23°C)', value: '14.0', unit: 'kJ/m²', testStandard: 'ISO 179' },
      { label: 'Flammability Class (1.5mm)', value: 'V-0', unit: '', testStandard: 'UL 94' },
      { label: 'Glow Wire Flammability Index (GWFI)', value: '960', unit: '°C', testStandard: 'IEC 60695-2-12' },
    ],
    keyBenefits: [
      'Certified UL94 V-0 flame retardancy at 1.5mm wall thickness',
      'Halogen-free composition complying with global eco-design mandates',
      'High gloss mirror-finish mold replication',
    ],
    applications: [
      'Telecommunication routers & server chassis bezels',
      'Commercial electrical junction boxes & power meter housings',
      'Smart home automation and EV charging station enclosures',
    ],
    industries: ['Electronics', 'Manufacturing', 'Consumer Products'],
    processingMethods: ['Injection Molding'],
    certifications: ['ISO 9001', 'UL94 V-0 Yellow Card', 'RoHS Compliant', 'IEC 60695'],
  },
  {
    name: 'NovaFlex® TPU-85A High-Resilience Elastomer',
    code: 'NV-TPU-85A',
    category: 'Industrial Compounds',
    polymerFamily: 'Thermoplastic Polyurethane (TPU)',
    shortDescription: 'Polyester-based thermoplastic polyurethane granules combining elastic flexibility (85 Shore A), superior abrasion resistance, and grease resistance.',
    fullDescription: 'NovaFlex® TPU-85A provides rubber-like elasticity combined with the processing efficiency of thermoplastics. Engineered for high tear resistance, dynamic flex fatigue endurance, and resistance to oils, greases, and atmospheric ozone.',
    featuredImage: 'https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?auto=format&fit=crop&w=800&q=80',
    images: ['https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?auto=format&fit=crop&w=800&q=80'],
    datasheetUrl: 'https://nova-materials.com/docs/TDS_NV_TPU_85A.pdf',
    isFeatured: true,
    status: 'active',
    specifications: [
      { label: 'Hardness', value: '85', unit: 'Shore A', testStandard: 'ISO 868' },
      { label: 'Tensile Strength', value: '48', unit: 'MPa', testStandard: 'ISO 37' },
      { label: 'Elongation at Break', value: '550', unit: '%', testStandard: 'ISO 37' },
      { label: 'Tear Resistance', value: '95', unit: 'kN/m', testStandard: 'ISO 34-1' },
      { label: 'Abrasion Loss', value: '30', unit: 'mm³', testStandard: 'ISO 4649' },
      { label: 'Density', value: '1.20', unit: 'g/cm³', testStandard: 'ISO 1183' },
    ],
    keyBenefits: [
      'Exceptional abrasion resistance extending component lifespan',
      'Dynamic flexibility across -40°C to +90°C temperatures',
      'Excellent damping capacity for vibration attenuation',
    ],
    applications: [
      'Pneumatic hoses and hydraulic seals',
      'Industrial conveyor belts and timing belt coatings',
      'Overmolded ergonomic grips and protective phone casings',
      'Automotive dust boots and suspension bushings',
    ],
    industries: ['Manufacturing', 'Automotive', 'Consumer Products'],
    processingMethods: ['Injection Molding', 'Extrusion'],
    certifications: ['ISO 9001', 'RoHS', 'REACH'],
  },
  {
    name: 'NovaEco® Bio-Circular PLA/Mineral Compound',
    code: 'NV-ECO-PLA35',
    category: 'Custom Materials',
    polymerFamily: 'Polylactic Acid (PLA Compound)',
    shortDescription: '35% mineral-reinforced bio-circular compound derived from renewable plant sugars with elevated heat resistance and industrial compostability.',
    fullDescription: 'NovaEco® NV-ECO-PLA35 bridges sustainability and performance. By incorporating specialized mineral micro-fillers into an ISCC+ certified bio-based PLA matrix, this compound achieves thermal deflection performance comparable to polystyrene while lowering lifecycle carbon footprint by up to 65%.',
    featuredImage: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=800&q=80',
    images: ['https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=800&q=80'],
    datasheetUrl: 'https://nova-materials.com/docs/TDS_NV_ECO_PLA35.pdf',
    isFeatured: true,
    status: 'active',
    specifications: [
      { label: 'Bio-based Carbon Content', value: '> 65', unit: '%', testStandard: 'ASTM D6866' },
      { label: 'Tensile Modulus', value: '4,200', unit: 'MPa', testStandard: 'ISO 527' },
      { label: 'Tensile Strength', value: '52', unit: 'MPa', testStandard: 'ISO 527' },
      { label: 'Heat Deflection Temp (0.45 MPa)', value: '105', unit: '°C', testStandard: 'ISO 75' },
      { label: 'Density', value: '1.42', unit: 'g/cm³', testStandard: 'ISO 1183' },
      { label: 'Melt Flow Index (190°C / 2.16kg)', value: '12.0', unit: 'g/10min', testStandard: 'ISO 1133' },
    ],
    keyBenefits: [
      'Low cradle-to-gate carbon footprint verified by third-party LCA',
      'Enhanced thermal deflection up to 105°C via proprietary crystallization nucleator',
      'Industrial compostability compliant with EN 13432 and ASTM D6400',
    ],
    applications: [
      'Thermoformed hot-beverage lids and food service trays',
      'Sustainable cosmetics packaging compacts and closures',
      'Horticultural pots and agricultural planting stakes',
    ],
    industries: ['Packaging', 'Consumer Products', 'Manufacturing'],
    processingMethods: ['Injection Molding', 'Sheet Extrusion', 'Thermoforming'],
    certifications: ['ISO 9001', 'ISCC PLUS Certified', 'EN 13432 Compostable', 'FDA Food Contact'],
  },
  {
    name: 'Novaclear® PET-2800 Bottle & Sheet Grade',
    code: 'NV-PET-2800',
    category: 'Polymer Granules',
    polymerFamily: 'Polyethylene Terephthalate (PET)',
    shortDescription: 'High intrinsic viscosity bottle-grade PET granules offering crystal-clear transparency, low acetaldehyde, and exceptional gas barrier properties.',
    fullDescription: 'Novaclear® PET-2800 is a premium copolymer resin characterized by high optical clarity and uniform melt viscosity. Formulated with fast reheat additives for energy-efficient stretch blow molding of pressurized beverage bottles and food containers.',
    featuredImage: 'https://images.unsplash.com/photo-1527011046414-4781f1f94f8c?auto=format&fit=crop&w=800&q=80',
    images: ['https://images.unsplash.com/photo-1527011046414-4781f1f94f8c?auto=format&fit=crop&w=800&q=80'],
    datasheetUrl: 'https://nova-materials.com/docs/TDS_NV_PET_2800.pdf',
    isFeatured: false,
    status: 'active',
    specifications: [
      { label: 'Intrinsic Viscosity (IV)', value: '0.84 ± 0.02', unit: 'dL/g', testStandard: 'ISO 1628-5' },
      { label: 'Acetaldehyde Content', value: '< 1.0', unit: 'ppm', testStandard: 'ASTM F2013' },
      { label: 'Melting Peak Temp', value: '248', unit: '°C', testStandard: 'ISO 11357' },
      { label: 'Crystallinity', value: '> 50', unit: '%', testStandard: 'Internal Standard' },
      { label: 'Density', value: '1.40', unit: 'g/cm³', testStandard: 'ISO 1183' },
    ],
    keyBenefits: [
      'High optical clarity with minimal haze (< 1.5%)',
      'Superior CO2 and O2 barrier performance preserving beverage shelf life',
      'Low acetaldehyde content ensuring pure taste neutrality',
    ],
    applications: [
      'Carbonated soft drink and mineral water bottles',
      'Edible oil packaging and pharmaceutical bottles',
      'Thermoformed blister trays and clamshells',
    ],
    industries: ['Packaging', 'Consumer Products'],
    processingMethods: ['Injection Stretch Blow Molding (ISBM)', 'Sheet Extrusion'],
    certifications: ['ISO 9001', 'FDA 21 CFR 177.1630', 'EU 10/2011'],
  },
  {
    name: 'Novathene® HDPE-6000 Blow Molding Grade',
    code: 'NV-HDPE-6000',
    category: 'Polymer Granules',
    polymerFamily: 'High-Density Polyethylene (HDPE)',
    shortDescription: 'High molecular weight HDPE granules with bimodal molecular weight distribution for exceptional Environmental Stress Crack Resistance (ESCR).',
    fullDescription: 'Novathene® HDPE-6000 provides optimum parison stability and stiffness-to-weight ratio. Engineered for the blow molding of large containers, drums, and Jerry cans storing hazardous chemicals and agrochemicals.',
    featuredImage: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
    images: ['https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80'],
    datasheetUrl: 'https://nova-materials.com/docs/TDS_NV_HDPE_6000.pdf',
    isFeatured: false,
    status: 'active',
    specifications: [
      { label: 'Melt Flow Index (190°C / 5kg)', value: '0.35', unit: 'g/10min', testStandard: 'ISO 1133' },
      { label: 'Density', value: '0.955', unit: 'g/cm³', testStandard: 'ISO 1183' },
      { label: 'ESCR (100% Igepal, F50)', value: '> 1,000', unit: 'hours', testStandard: 'ASTM D1693' },
      { label: 'Tensile Modulus', value: '1,200', unit: 'MPa', testStandard: 'ISO 527' },
      { label: 'Charpy Notched Impact (23°C)', value: '18.0', unit: 'kJ/m²', testStandard: 'ISO 179' },
    ],
    keyBenefits: [
      'Bimodal molecular structure guarantees highest ESCR against surfactants',
      'High melt strength minimizes parison sag in large blow molding machines',
      'UN dangerous goods packaging certified performance',
    ],
    applications: [
      '20L – 200L chemical drums and Jerry cans',
      'Automotive fuel tanks and washer fluid reservoirs',
      'Industrial IBC containers and intermediate bulk packaging',
    ],
    industries: ['Manufacturing', 'Automotive', 'Packaging'],
    processingMethods: ['Extrusion Blow Molding'],
    certifications: ['ISO 9001', 'UN Dangerous Goods Approved', 'RoHS'],
  },
  {
    name: 'Novatough® PC/ABS-750 Automotive Grade',
    code: 'NV-PCABS-750',
    category: 'Engineering Materials',
    polymerFamily: 'Polycarbonate / ABS Blend',
    shortDescription: 'High-impact PC/ABS blend engineered for automotive interiors and electronic housings, featuring high dimensional stability and low emissions.',
    fullDescription: 'Novatough® PC/ABS-750 combines the high heat resistance and tensile modulus of Polycarbonate with the low-temperature ductile toughness and melt flow processability of ABS.',
    featuredImage: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=800&q=80',
    images: ['https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=800&q=80'],
    datasheetUrl: 'https://nova-materials.com/docs/TDS_NV_PCABS_750.pdf',
    isFeatured: false,
    status: 'active',
    specifications: [
      { label: 'Melt Volume Rate (260°C / 5kg)', value: '18.0', unit: 'cm³/10min', testStandard: 'ISO 1133' },
      { label: 'Density', value: '1.14', unit: 'g/cm³', testStandard: 'ISO 1183' },
      { label: 'Vicat Softening Temp (B/120)', value: '128', unit: '°C', testStandard: 'ISO 306' },
      { label: 'Izod Notched Impact (-30°C)', value: '40.0', unit: 'kJ/m²', testStandard: 'ISO 180' },
      { label: 'Tensile Modulus', value: '2,400', unit: 'MPa', testStandard: 'ISO 527' },
    ],
    keyBenefits: [
      'Low VOC emissions complying with VDA 278 automotive interior standards',
      'Exceptional cold-temperature impact resistance preventing brittle fracture',
      'Uniform matte aesthetic minimizing cockpit glare',
    ],
    applications: [
      'Automotive instrument panels and pillar trims',
      'Door handle assemblies and center console bezels',
      'High-end consumer audio equipment frames',
    ],
    industries: ['Automotive', 'Consumer Products', 'Electronics'],
    processingMethods: ['Injection Molding'],
    certifications: ['ISO 9001', 'IATF 16949', 'VDA 278 Low VOC', 'RoHS'],
  },
  {
    name: 'NovaConduct® ESD Conductive Polypropylene',
    code: 'NV-ESD-PP20',
    category: 'Industrial Compounds',
    polymerFamily: 'Conductive Polypropylene Compound',
    shortDescription: 'Carbon nanotube and conductive carbon black filled polypropylene compound for static dissipation and ESD-safe cleanroom packaging.',
    fullDescription: 'NovaConduct® NV-ESD-PP20 provides permanent, humidity-independent electrostatic dissipation (ESD) protection for sensitive microelectronics assembly and volatile chemical handling.',
    featuredImage: 'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&w=800&q=80',
    images: ['https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&w=800&q=80'],
    datasheetUrl: 'https://nova-materials.com/docs/TDS_NV_ESD_PP20.pdf',
    isFeatured: false,
    status: 'active',
    specifications: [
      { label: 'Surface Resistivity', value: '10⁴ – 10⁶', unit: 'Ohm/sq', testStandard: 'IEC 61340-2-3' },
      { label: 'Volume Resistivity', value: '10⁴', unit: 'Ohm·cm', testStandard: 'IEC 61340-2-3' },
      { label: 'Density', value: '0.98', unit: 'g/cm³', testStandard: 'ISO 1183' },
      { label: 'Melt Flow Rate (230°C / 5kg)', value: '8.0', unit: 'g/10min', testStandard: 'ISO 1133' },
      { label: 'Flexural Modulus', value: '1,900', unit: 'MPa', testStandard: 'ISO 178' },
    ],
    keyBenefits: [
      'Permanent electrical conductivity unaffected by ambient humidity',
      'No sloughing or carbon particulate shedding during handling',
      'High chemical resistance against isopropyl alcohol and common cleanroom solvents',
    ],
    applications: [
      'IC chip handling trays and SMD tape reels',
      'ATEX certified chemical pump housings and conductive piping',
      'ESD protective tote boxes and warehouse storage bins',
    ],
    industries: ['Electronics', 'Manufacturing', 'Aerospace & Defense'],
    processingMethods: ['Injection Molding', 'Extrusion'],
    certifications: ['ISO 9001', 'ANSI/ESD S20.20', 'IEC 61340-5-1', 'ATEX Directive'],
  },
  {
    name: 'Novamid® PA6-MOS2 Self-Lubricating Grade',
    code: 'NV-PA6-MOS2',
    category: 'Engineering Materials',
    polymerFamily: 'Polyamide 6 (Nylon 6)',
    shortDescription: 'Molybdenum disulfide (MoS2) modified Polyamide 6 compound offering enhanced lubricity, low friction coefficient, and extended wear life.',
    fullDescription: 'Novamid® PA6-MOS2 incorporates fine molybdenum disulfide particles directly into the polyamide matrix to increase crystal structure density and deliver exceptional self-lubricating properties in dry-running mechanical drives.',
    featuredImage: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
    images: ['https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80'],
    datasheetUrl: 'https://nova-materials.com/docs/TDS_NV_PA6_MOS2.pdf',
    isFeatured: false,
    status: 'active',
    specifications: [
      { label: 'Dynamic Friction Coefficient (vs Steel)', value: '0.18', unit: '', testStandard: 'ASTM D1894' },
      { label: 'Tensile Strength', value: '85', unit: 'MPa', testStandard: 'ISO 527' },
      { label: 'Tensile Modulus', value: '3,400', unit: 'MPa', testStandard: 'ISO 527' },
      { label: 'Density', value: '1.16', unit: 'g/cm³', testStandard: 'ISO 1183' },
      { label: 'Melting Point', value: '220', unit: '°C', testStandard: 'ISO 11357' },
    ],
    keyBenefits: [
      'Eliminates maintenance oiling in food-grade and textile machinery',
      'Reduces acoustic gear noise by up to 12 dB compared to brass/steel gearing',
      'High resistance to abrasive wear under continuous rotation',
    ],
    applications: [
      'Heavy-load spur gears and helical pinions',
      'Linear guide wear pads and sleeve bushings',
      'Food processing conveyor sprockets',
    ],
    industries: ['Manufacturing', 'Automotive', 'Consumer Products'],
    processingMethods: ['Injection Molding', 'Extrusion'],
    certifications: ['ISO 9001', 'RoHS', 'REACH'],
  },
  {
    name: 'Novathene® LLDPE-1800 Cast Film Grade',
    code: 'NV-LLDPE-1800',
    category: 'Polymer Granules',
    polymerFamily: 'Linear Low-Density Polyethylene (LLDPE)',
    shortDescription: 'High-clarity butene-comonomer LLDPE resin engineered for high-speed automated stretch wrap and industrial pallet stabilization films.',
    fullDescription: 'Novathene® LLDPE-1800 offers the ideal balance of high tensile elongation, puncture resistance, and cling retention for multi-layer cast stretch films and agricultural silage sheeting.',
    featuredImage: 'https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=800&q=80',
    images: ['https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=800&q=80'],
    datasheetUrl: 'https://nova-materials.com/docs/TDS_NV_LLDPE_1800.pdf',
    isFeatured: false,
    status: 'active',
    specifications: [
      { label: 'Melt Flow Index (190°C / 2.16kg)', value: '2.8', unit: 'g/10min', testStandard: 'ISO 1133' },
      { label: 'Density', value: '0.918', unit: 'g/cm³', testStandard: 'ISO 1183' },
      { label: 'Dart Drop Impact Resistance', value: '180', unit: 'g', testStandard: 'ASTM D1709' },
      { label: 'Tensile Strain at Break (MD)', value: '620', unit: '%', testStandard: 'ISO 527-3' },
      { label: 'Puncture Energy', value: '3.8', unit: 'J', testStandard: 'ASTM D5748' },
    ],
    keyBenefits: [
      'High stretch ratio (up to 300%) without film tear propagation',
      'Superior puncture resistance against sharp pallet corners',
      'High transparency for barcode scannability through wrap',
    ],
    applications: [
      'Automatic power pre-stretch machine wrapping films',
      'Heavy-duty collation shrink films',
      'Agricultural greenhouse and silage wraps',
    ],
    industries: ['Packaging', 'Manufacturing'],
    processingMethods: ['Cast Film Extrusion', 'Blown Film Extrusion'],
    certifications: ['ISO 9001', 'FDA 21 CFR 177.1520', 'EU 10/2011'],
  },
];

export const seedBlogPosts = [
  {
    title: 'Polymer Rheology: Understanding Melt Flow Index in High-Precision Injection Molding',
    excerpt: 'A comprehensive technical examination of how MFI and shear thinning behavior dictate mold filling, shrinkage uniformity, and internal part stress.',
    category: 'Polymer Processing',
    author: {
      name: 'Dr. Evelyn Vance',
      role: 'Chief Materials Engineer',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=256&q=80',
    },
    readTimeMinutes: 7,
    coverImage: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80',
    tags: ['MFI', 'Rheology', 'Injection Molding', 'Quality Control'],
    seoTitle: 'Polymer Rheology & Melt Flow Index (MFI) in Injection Molding | NOVA',
    seoDescription: 'Master polymer melt flow index, shear rate curves, and mold flow analysis to eliminate part warpage and splay in engineering plastics.',
    content: `## The Physical Significance of Melt Flow Index (MFI)

In industrial polymer processing, the **Melt Flow Index (MFI)**—or Melt Flow Rate (MFR)—serves as the primary standard metric for characterizing the flow behavior of a thermoplastic polymer under prescribed temperature and load conditions (ISO 1133 / ASTM D1238).

While MFI represents a single point on a broader shear rate spectrum, understanding its implications is vital for processing engineers when sizing runners, predicting cycle times, and avoiding mold cavitation defects.

---

## 1. Newtonian vs. Non-Newtonian Shear Thinning Behavior

Most commercial polymers, such as Polypropylene (PP), Polyamides (PA66), and PEEK, behave as **pseudoplastic (shear-thinning)** fluids. When subjected to the high shear rates encountered in injection molding nozzles and gates (typically $10^3$ to $10^5 \\text{ s}^{-1}$):

* Polymer molecular chains uncoil and align in the direction of flow.
* Apparent viscosity drops dramatically compared to low-shear static state values.
* High MFI grades fill thin wall cavities rapidly, but require strict gate velocity management to prevent molecular shear degradation.

---

## 2. Practical Trouble-Shooting Matrix

| Symptom | Probable Rheological Cause | Recommended Process Adjustment |
| :--- | :--- | :--- |
| **Flash at parting line** | MFI too high or excessive melt temperature | Lower melt temperature by 10–15°C; reduce hold pressure |
| **Hesitation / Short Shot** | MFI too low or premature freeze-off | Increase injection speed; switch to high-flow nucleated grade |
| **High Mold Shrinkage** | High crystallinity rate in slow-flowing resin | Optimize mold cooling channels; verify holding phase duration |

---

## 3. NOVA's Laboratory Rheology Standards

At NOVA, every production batch is subjected to multi-point capillary rheometer testing across varying shear rates. This guarantees lot-to-lot consistency within $\\pm 4.5\\%$ of nominal TDS specifications, ensuring that automated molding cells maintain zero downtime.`,
  },
  {
    title: 'Engineering Plastics Selection Guide for Automotive Powertrain Components',
    excerpt: 'How modern glass-reinforced PA66, PPA, and PPS formulations are systematically replacing aluminum cast alloys in high-heat engine bays.',
    category: 'Material Science',
    author: {
      name: 'Marcus Thorne',
      role: 'Automotive Applications Specialist',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80',
    },
    readTimeMinutes: 9,
    coverImage: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=80',
    tags: ['Automotive', 'PA66', 'Weight Reduction', 'Powertrain'],
    seoTitle: 'Engineering Plastics for Automotive Powertrain Components | NOVA',
    seoDescription: 'Discover how 30-50% glass fiber reinforced engineering polymers replace cast metal in automotive powertrain and cooling circuits.',
    content: `## The Metal-to-Plastic Conversion Revolution

Automotive Tier 1 suppliers face relentless pressure to reduce vehicle mass, lower emissions, and consolidate multi-piece assemblies into single-shot injection-molded components. 

Replacing structural cast aluminum ($\approx 2.70 \\text{ g/cm}^3$) with glass-fiber reinforced engineering polymers like **Novamide® PA66-GF30** ($\approx 1.36 \\text{ g/cm}^3$) achieves an immediate **40% to 50% mass reduction** per sub-assembly.

---

## 1. Key Performance Criteria for Engine Bay Environments

Under-the-hood components must endure an aggressive combination of environmental stresses:

1. **Continuous Thermal Loads:** Engine compartments regularly experience continuous operating temperatures between 120°C and 160°C, with peak hot-soak excursions reaching 200°C.
2. **Chemical Attack:** Constant exposure to engine oils, synthetic transmission fluids, brake fluids, and ethylene-glycol water coolant mixtures.
3. **Dynamic Fatigue:** High-frequency vibrational harmonics transferred from the engine block and chassis.

---

## 2. Material Comparison: Aluminum vs. Reinforced Polyamides

| Property | Die-Cast A380 Aluminum | Novamide® PA66-GF30 | Novamide® PA66-GF50 |
| :--- | :--- | :--- | :--- |
| **Density (g/cm³)** | 2.74 | 1.36 | 1.58 |
| **Tensile Modulus (MPa)** | 71,000 | 9,800 | 16,500 |
| **Tensile Strength (MPa)** | 310 | 175 | 230 |
| **Corrosion Resistance** | Moderate (Requires Coating) | Inherent (High) | Inherent (High) |
| **Secondary Machining** | Extensive (CNC required) | Zero (Net shape mold) | Zero (Net shape mold) |

---

## Summary Recommendation

For static housing covers, coolant pumps, and intake manifolds, Novamide® PA66-GF30 delivers optimal strength-to-cost economics. For pressurized oil filter modules and turbocharger resonator tubes, high-temperature PPA (Polyphthalamide) or PPS grades are recommended.`,
  },
  {
    title: 'Circular Polymers in Modern Packaging: Overcoming Degraded Tensile Properties',
    excerpt: 'Overcoming polymer chain scission, thermal degradation, and contamination in post-consumer recycled (PCR) polyolefins for high-speed conversion.',
    category: 'Sustainability & Circular Economy',
    author: {
      name: 'Elena Rostova',
      role: 'Director of Sustainable Materials',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=256&q=80',
    },
    readTimeMinutes: 6,
    coverImage: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=1200&q=80',
    tags: ['PCR', 'Circular Economy', 'Packaging', 'Recycling'],
    seoTitle: 'Circular Polymers & PCR Degradation Solutions | NOVA Materials',
    seoDescription: 'How advanced compatibilizers and chain extenders restore virgin-like mechanical performance in recycled packaging polymers.',
    content: `## The Technical Reality of Mechanical Recycling

While brand owners face statutory targets for incorporating 30% to 50% Post-Consumer Recycled (PCR) content by 2030, mechanical recycling inherently causes **molecular degradation**:

* **Chain Scission:** Repeated thermal cycles during re-extrusion shorten polymer chain lengths, leading to lower tensile elongation and reduced drop-impact resistance.
* **Cross-Contamination:** Trace PE contamination in PP streams (or vice versa) disrupts crystalline boundaries, creating micro-voids under load.

---

## Engineering Solutions: Upcycling PCR Polymers

At NOVA, our **NovaEco®** compounding team utilizes three primary upcycling techniques:

1. **Reactive Compatibilization:** Grafted block copolymers that chemically bridge incompatible polyolefin phases.
2. **Chain Extenders & Branching Agents:** Re-linking severed polymer chains to restore high intrinsic viscosity in recycled PET and Polyamides.
3. **Advanced Melt Filtration:** Continuous screen changers capable of filtering down to 25 microns to remove foreign particulates.`,
  },
  {
    title: 'Flame Retardancy Mechanisms: Achieving UL94 V-0 Compliance in Modern Electronics',
    excerpt: 'Comparing halogen-free phosphorus and mineral flame retardant mechanisms in engineering polymer enclosures.',
    category: 'Quality Assurance & Testing',
    author: {
      name: 'Dr. Evelyn Vance',
      role: 'Chief Materials Engineer',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=256&q=80',
    },
    readTimeMinutes: 8,
    coverImage: 'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&w=1200&q=80',
    tags: ['UL94', 'Flame Retardant', 'Electronics', 'Compliance'],
    seoTitle: 'Flame Retardancy Mechanisms for UL94 V-0 Compliance | NOVA',
    seoDescription: 'Understand solid-phase char formation and vapor-phase radical trapping in halogen-free flame retardant engineering polymers.',
    content: `## The UL94 Vertical Burning Test Standard

The Underwriters Laboratories **UL94 V-0** certification is the global benchmark for flammability in electrical and telecommunications equipment.

To achieve a V-0 rating at a given wall thickness:
* Flaming combustion must extinguish within 10 seconds after each flame application.
* Total flaming combustion time for 5 test specimens must not exceed 50 seconds.
* No flaming drips may ignite the dry surgical cotton placed underneath the specimen.

---

## Solid-Phase vs. Vapor-Phase Flame Retardants

Modern regulatory frameworks (e.g. EU RoHS and REACH) actively restrict brominated and chlorinated additives. NOVA engineers halogen-free solutions using two synergistic mechanisms:

1. **Intumescent Char Formation (Solid Phase):** Under heat, phosphorus-based compounds expand into a porous carbonaceous char layer that insulates the underlying substrate from oxygen and heat.
2. **Endothermic Metal Hydroxides:** Mineral fillers like Aluminum Trihydroxide (ATH) and Magnesium Hydroxide (MDH) release water vapor above 200°C, cooling the combustion zone and diluting flammable pyrolysis gases.`,
  },
  {
    title: 'Preventing Splay and Moisture Defects in Hygroscopic Engineering Polymers',
    excerpt: 'Proper desiccant drying protocols for Polyamides (PA6, PA66), PBT, and Polycarbonates to prevent hydrolytic degradation during processing.',
    category: 'Polymer Processing',
    author: {
      name: 'Marcus Thorne',
      role: 'Automotive Applications Specialist',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80',
    },
    readTimeMinutes: 5,
    coverImage: 'https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=1200&q=80',
    tags: ['Drying', 'Polyamide', 'Moisture', 'Defects'],
    seoTitle: 'Preventing Moisture Splay in Polyamides & Engineering Polymers | NOVA',
    seoDescription: 'Master desiccant dryer dew-point monitoring and moisture analysis to eliminate silver streaks and brittleness in injection molding.',
    content: `## The Hidden Danger of Hydrolytic Degradation

Unlike non-polar polyolefins (PP, PE), engineering polymers such as Polyamides (PA66, PA6), Polycarbonate (PC), and Polybutylene Terephthalate (PBT) are **hygroscopic**—they actively absorb atmospheric moisture into their molecular matrix.

When processed with excessive moisture content ($> 0.15\\%$ for PA66; $> 0.02\\%$ for PC):
1. **Hydrolysis Occurs:** Water molecules break ester and amide bonds at elevated melt temperatures, causing irreversible molecular weight loss.
2. **Cosmetic Splay:** Steam bubbles vaporize at the flow front, resulting in silver streaks on the part surface.
3. **Severe Brittleness:** The finished component fails prematurely under impact load despite appearing visually sound.

---

## Recommended Desiccant Drying Parameters

| Polymer Grade | Target Moisture Content | Drying Temp (°C) | Recommended Drying Time |
| :--- | :--- | :--- | :--- |
| **Novamide® PA66-GF30** | $< 0.12\\%$ | 80 – 90°C | 4 – 6 hours |
| **NovaTough® PC/ABS** | $< 0.02\\%$ | 100 – 110°C | 3 – 4 hours |
| **NovaPeak® PEEK-4500** | $< 0.05\\%$ | 150°C | 3 – 4 hours |

Always ensure your desiccant air dryer operates with a verified dew point of **$-40\\text{°C}$** or lower.`,
  },
  {
    title: 'Global B2B Polymer Supply Chain: Managing Feedstock Volatility and Lead Times',
    excerpt: 'Strategic inventory management, dual-sourcing polymer compounds, and ocean freight logistics in volatile international markets.',
    category: 'Industrial Supply Chain',
    author: {
      name: 'Elena Rostova',
      role: 'Director of Sustainable Materials',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=256&q=80',
    },
    readTimeMinutes: 7,
    coverImage: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=1200&q=80',
    tags: ['Supply Chain', 'Logistics', 'Procurement', 'B2B'],
    seoTitle: 'B2B Polymer Supply Chain & Feedstock Volatility | NOVA Materials',
    seoDescription: 'How manufacturing procurement teams mitigate monomer price spikes, shipping container disruptions, and safety stock shortages.',
    content: `## Navigating Feedstock Volatility

Polymer granule prices correlate directly with crude oil and natural gas monomer feedstocks (Ethylene, Propylene, Benzene). For procurement managers and plant operations directors, unexpected raw material spikes can erode margins on fixed-price manufacturing contracts.

---

## Strategic Pillars for Resilient Procurement

1. **Dual-Sourcing Qualified Equivalent Grades:** Never qualify a single resin code for a critical production line. Work with NOVA technical support to pre-qualify equivalent polymer grades that can be switched without mold re-tooling.
2. **Buffer Inventory via Strategic Warehousing:** NOVA maintains regional distribution hubs across North America, Europe, and Asia-Pacific to buffer 4 to 8 weeks of emergency production stock for contracted clients.
3. **Incoterms Optimization:** Aligning transport terms (FOB vs. CIF vs. DDP) with enterprise customs clearance capabilities to minimize port demurrage fees.`,
  },
];

export const seedProjects = [
  {
    title: 'Automotive Thermal Management System Mass Reduction',
    industry: 'Automotive',
    clientType: 'Tier 1 European Automotive Supplier',
    materialUsed: 'Novamide® PA66-GF30 Structural Composite',
    challenge: 'The client needed to replace a die-cast aluminum thermostat housing assembly to meet strict EURO-7 vehicle mass limits while maintaining burst pressure resistance above 18 bar under continuous 135°C coolant cycling.',
    solution: 'NOVA formulated a customized Novamide® PA66-GF30 compound with an optimized heat stabilizer package and high weld-line retention additives, followed by mold flow simulation support to prevent core-pin deflection.',
    results: [
      'Achieved 44% overall weight reduction per vehicle sub-assembly',
      'Zero burst failures across 1,500 hours of continuous thermal shock endurance testing (-40°C to +135°C)',
      'Eliminated 3 secondary CNC machining steps, lowering total manufacturing cost by 22%',
    ],
    metrics: [
      { label: 'Weight Reduction', value: '-44%' },
      { label: 'Burst Pressure Rating', value: '24 Bar' },
      { label: 'Cycle Time Reduction', value: '18%' },
      { label: 'Unit Cost Savings', value: '22%' },
    ],
    coverImage: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1000&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1000&q=80',
    ],
    isFeatured: true,
  },
  {
    title: 'Sterilizable Surgical Device Housing with High Biocompatibility',
    industry: 'Medical & Healthcare',
    clientType: 'Global Medical Device Manufacturer',
    materialUsed: 'NovaPeak® PEEK-4500 Ultra High-Performance',
    challenge: 'A medical robotics leader required a lightweight, non-conductive structural handle capable of enduring more than 1,000 autoclave steam sterilization cycles without dimensional drift or color degradation.',
    solution: 'Supplied medical-grade NovaPeak® PEEK-4500 certified to ISO 10993 biocompatibility standards, with tight intrinsic viscosity tolerances ensuring clean surface micro-machining.',
    results: [
      '100% compliance across 1,200 autoclave cycles at 134°C with zero micro-cracking',
      'Full ISO 10993 and USP Class VI biological safety certification achieved',
      'Superior tactile ergonomic feel with low thermal conductivity',
    ],
    metrics: [
      { label: 'Autoclave Cycles', value: '1,200+' },
      { label: 'Biocompatibility', value: 'ISO 10993' },
      { label: 'Dimensional Stability', value: '±0.02 mm' },
    ],
    coverImage: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=1000&q=80',
    gallery: ['https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=1000&q=80'],
    isFeatured: true,
  },
  {
    title: 'High-Speed Automated Logistics Crate Toughness Optimization',
    industry: 'Packaging',
    clientType: 'Continental Logistics & Supply Chain Provider',
    materialUsed: 'Novaprene® PP-5100 High-Impact Copolymer',
    challenge: 'High-speed robotic fulfillment centers were experiencing recurring corner impact fractures on automated logistics totes during cold winter distribution runs down to -15°C.',
    solution: 'NOVA delivered Novaprene® PP-5100 copolymer modified with tailored ethylene-octene elastomer domains to disperse impact energy and maintain high flexural modulus.',
    results: [
      'Zero container drop fractures at -20°C drop testing from 2.5 meters height',
      '12% faster injection molding cycle time through high-flow nucleation',
      'Estimated $1.4M saved annually in container replacement and merchandise protection',
    ],
    metrics: [
      { label: 'Cold Impact Resistance', value: '-20°C' },
      { label: 'Drop Height Certified', value: '2.5 m' },
      { label: 'Annual Cost Avoided', value: '$1.4M' },
    ],
    coverImage: 'https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=1000&q=80',
    gallery: ['https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=1000&q=80'],
    isFeatured: true,
  },
  {
    title: 'Telecommunications EV Charging Station Flame Retardant Housing',
    industry: 'Electronics',
    clientType: 'Clean Energy Infrastructure Developer',
    materialUsed: 'NovaShield® Flame Retardant ABS V-0',
    challenge: 'Engineering an outdoor DC fast-charging enclosure meeting stringent UL94 V-0 flame safety, 5VA wall fire containment, and UV solar weathering (UL 746C f1).',
    solution: 'Compounded NovaShield® ABS with a balanced phosphorus flame-retardant chemistry and HALS UV stabilizers, eliminating halogen toxicity.',
    results: [
      'Certified UL94 V-0 and UL 746C f1 outdoor suitability',
      'High surface gloss finish achieved straight from mold without secondary painting',
      'Deployed across 12,000+ public charging stations worldwide',
    ],
    metrics: [
      { label: 'Flammability Rating', value: 'UL94 V-0' },
      { label: 'Stations Deployed', value: '12,000+' },
      { label: 'UV Resistance', value: '5,000 hrs' },
    ],
    coverImage: 'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&w=1000&q=80',
    gallery: ['https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&w=1000&q=80'],
    isFeatured: false,
  },
  {
    title: 'Bio-Circular Single-Use Cosmetics Packaging Transition',
    industry: 'Consumer Products',
    clientType: 'Global Luxury Cosmetics Brand',
    materialUsed: 'NovaEco® Bio-Circular PLA/Mineral Compound',
    challenge: 'Transitioning secondary cosmetic compact packaging from virgin fossil-based polystyrene to bio-circular materials without losing tactile heavy-weight luxury feel or thermal stability.',
    solution: 'Customized mineral-loaded NovaEco® PLA compound matching exact color tone, mold shrinkage, and specific gravity of legacy luxury packaging.',
    results: [
      '62% reduction in lifecycle greenhouse gas footprint (LCA verified)',
      '100% drop-in replacement on existing injection molds with zero tooling modification',
      'Awarded Global Sustainable Packaging Product of the Year 2025',
    ],
    metrics: [
      { label: 'GHG Reduction', value: '-62%' },
      { label: 'Tooling Modification', value: '$0 (Drop-in)' },
      { label: 'Bio-Based Carbon', value: '68%' },
    ],
    coverImage: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=1000&q=80',
    gallery: ['https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=1000&q=80'],
    isFeatured: false,
  },
];

export const seedQuotes = [
  {
    quoteNumber: 'RFQ-2026-1048',
    fullName: 'Alexander Wright',
    companyName: 'Bavaria Precision Plastics GmbH',
    corporateEmail: 'a.wright@bavaria-plastics.de',
    phone: '+49 89 2442 8190',
    country: 'Germany',
    productName: 'Novamide® PA66-GF30 Structural Composite',
    productCode: 'NV-PA66-30GF',
    quantity: 48,
    unit: 'Metric Tons',
    packaging: '1000kg Octabins',
    incoterms: 'CIF (Cost, Insurance & Freight)',
    message: 'Seeking ongoing monthly supply agreement starting Q4 2026. Target destination: Hamburg Port.',
    status: 'reviewing',
    adminNotes: 'Contacted logistics for Rotterdam vs Hamburg freight quote.',
  },
  {
    quoteNumber: 'RFQ-2026-1092',
    fullName: 'Samantha Chen',
    companyName: 'Apex Medical Devices Corp',
    corporateEmail: 'procurement@apexmedical.com',
    phone: '+1 (415) 890-4421',
    country: 'United States',
    productName: 'NovaPeak® PEEK-4500 Ultra High-Performance',
    productCode: 'NV-PEEK-4500',
    quantity: 2500,
    unit: 'Kilograms',
    packaging: '25kg Multi-layer Bags',
    incoterms: 'DDP (Delivered Duty Paid)',
    message: 'Require lot-traceable TDS and ISO 10993 biocompatibility test certificates with initial sample shipment.',
    status: 'new',
    adminNotes: '',
  },
  {
    quoteNumber: 'RFQ-2026-0975',
    fullName: 'David Tanaka',
    companyName: 'Osaka Industrial Molding Ltd',
    corporateEmail: 'd.tanaka@osaka-molding.co.jp',
    phone: '+81 6 6208 7712',
    country: 'Japan',
    productName: 'Novaprene® PP-5100 High-Impact Copolymer',
    productCode: 'NV-PP-5100',
    quantity: 4,
    unit: 'Containers (40ft)',
    packaging: '500kg Big Bags',
    incoterms: 'FOB (Free On Board)',
    message: 'Target delivery by October 2026 for automotive battery tray expansion project.',
    status: 'quoted',
    adminNotes: 'Formal quote quotation pack dispatched via email.',
  },
];

export const seedMessages = [
  {
    name: 'Jean-Luc Moreau',
    email: 'jl.moreau@aero-composites.fr',
    company: 'Aero Composites France',
    phone: '+33 1 42 68 55 00',
    subject: 'Request for PEEK-4500 Outgassing & Flammability Certifications',
    inquiryType: 'Technical Support & TDS',
    message: 'We are qualifying material grades for satellite avionics mounting brackets. Could you provide full NASA SP-R-0022A outgassing reports for NovaPeak® PEEK-4500?',
    isRead: false,
    status: 'new',
  },
  {
    name: 'Sarah Jenkins',
    email: 'sjenkins@packaging-innovations.co.uk',
    company: 'Packaging Innovations UK Ltd',
    phone: '+44 20 7946 0912',
    subject: 'Sample request: NovaEco Bio-Circular PLA Compound (25kg)',
    inquiryType: 'Sample Request',
    message: 'We would like to request a 25kg trial bag of NovaEco PLA compound for thermoforming tool trials next month.',
    isRead: true,
    status: 'in_progress',
  },
];
