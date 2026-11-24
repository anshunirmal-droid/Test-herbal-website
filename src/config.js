// Edit this file to rebrand the whole site.
// "Vanyaa Roots" is a placeholder name: check trademark availability (USPTO, Class 5) before using it.

export const brand = {
  name: 'Vanyaa Roots',
  tagline: 'Single-origin Ayurvedic herbs, tested lot by lot.',
  email: 'hello@example.com', // replace with your real address
  amazonStoreUrl: '', // paste your Amazon storefront URL when live; leave '' to show "Coming soon"
  instagram: '', // optional
  // Paste a Formspree (or similar) endpoint to collect waitlist emails, e.g. 'https://formspree.io/f/abcd1234'.
  // Leave '' and the form opens the visitor's email app instead.
  waitlistEndpoint: '',
}

export const products = [
  {
    id: 'ashwagandha',
    role: 'Hero',
    name: 'Root-Only Ashwagandha',
    latin: 'Withania somnifera',
    origin: 'Madhya Pradesh & Rajasthan',
    format: '600 mg × 60 vegan capsules',
    benefit: 'Supports a healthy stress response and restful sleep.*',
    details: [
      'Root-only extract standardised to 5% withanolides',
      'No leaf material, in line with India’s 2026 root-only rule',
      'Tested every lot for identity, potency and heavy metals',
    ],
    caution:
      'Not for use during pregnancy or breastfeeding. Consult your doctor if you have a liver or thyroid condition or take prescription medication.',
    price: '$24.99',
    color: '#B5651D',
  },
  {
    id: 'psyllium',
    role: 'Daily essential',
    name: 'Organic Psyllium Husk',
    latin: 'Plantago ovata',
    origin: 'North Gujarat',
    format: 'Powder 12 oz · Capsules 180 ct',
    benefit: 'A daily source of soluble fibre for digestive regularity.*',
    details: [
      'From the region that grows most of the world’s psyllium',
      'Certified organic, single ingredient, nothing added',
      'Tested every lot for purity and micro limits',
    ],
    caution: 'Take with a full glass of water. Separate from medications by at least 2 hours.',
    price: '$16.99',
    color: '#5E7F5B',
  },
  {
    id: 'boswellia',
    role: 'Joint care',
    name: 'Boswellia AKBA',
    latin: 'Boswellia serrata',
    origin: 'Central India',
    format: '500 mg × 60 vegan capsules',
    benefit: 'Supports joint comfort and mobility for active lives.*',
    details: [
      'Standardised gum resin extract, AKBA enriched',
      'Vegan capsules, no fillers or artificial colours',
      'Tested every lot for identity, potency and heavy metals',
    ],
    caution: 'Consult your doctor before use if pregnant, nursing or taking medication.',
    price: '$21.99',
    color: '#8C6A3F',
  },
]

export const faqs = [
  {
    q: 'Where are your herbs grown?',
    a: 'Each herb comes from the Indian region where it has been grown for generations: ashwagandha from Madhya Pradesh and Rajasthan, psyllium from North Gujarat and boswellia from central India. Every label names the region.',
  },
  {
    q: 'How are products tested?',
    a: 'Every production lot is tested by an independent ISO 17025 laboratory for identity, potency, heavy metals (lead, arsenic, cadmium, mercury) and microbes. Ask us for the certificate of analysis for your lot number.',
  },
  {
    q: 'Where are the capsules made?',
    a: 'Extracts are made in India and encapsulated in the USA at a facility that follows FDA current Good Manufacturing Practices (21 CFR 111).',
  },
  {
    q: 'Is ashwagandha safe for everyone?',
    a: 'No supplement is right for everyone. Do not use ashwagandha if you are pregnant or breastfeeding, and speak with your doctor first if you have a liver or thyroid condition or take prescription medication.',
  },
  {
    q: 'When can I buy?',
    a: 'We are launching on Amazon US first. Join the list and we will email you on launch day.',
  },
]
