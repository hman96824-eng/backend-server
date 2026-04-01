import fs from 'fs';
import path from 'path';

const userIds = [
  'USR-RHU-0001', 'USR-TY2-0002', 'USR-VGM-0003', 'USR-MX0-0007', 'USR-F46-0008',
  'USR-1NL-0009', 'USR-YG0-0010', 'USR-OTB-0011', 'USR-5CL-0012', 'USR-26P-0013',
  'USR-UMR-0004', 'USR-F33-0006', 'USR-7YY-0023', 'USR-5RO-0024', 'USR-7C6-0025',
  'USR-5W3-0026', 'USR-NMT-0027', 'USR-2X3-0028', 'USR-EOK-0032', 'USR-BAP-0033',
  'USR-L99-0034', 'USR-I1T-0035', 'USR-SKO-0029', 'USR-QJ7-0030', 'USR-89Y-0031',
  'USR-2LK-0036', 'USR-L2C-0037'
];

const productIds = [
  'MOB-SEI-0001', 'ELE-O9C-0001', 'HOM-FY0-0001', 'ELE-MEK-0002', 'SPO-668-0001',
  'ELE-6OW-0003', 'ELE-28Q-0004', 'SPO-QE7-0002', 'KIT-8UE-0001', 'CLO-3TB-0001',
  'ELE-1ZF-0005', 'SPO-AZA-0003', 'SPO-OZX-0004', 'FUR-PRF-0001', 'CLO-4FQ-0002',
  'KIT-BED-0002', 'ELE-TW6-0006', 'KIT-E4N-0003', 'KIT-3UE-0004', 'CLO-822-0003',
  'CLO-CPL-0004', 'KIT-B3Q-0005', 'ACC-HNP-0001', 'ACC-TJL-0002', 'ELE-86P-0008',
  'HOM-2VU-0002', 'HOM-981-0003', 'ELE-CEO-0009', 'ELE-N51-0010', 'ELE-2JN-0011',
  'KIT-HGO-0006', 'CLO-JNF-0005', 'ELE-Y22-0013', 'ACC-RFF-0003', 'KIT-W6R-0007',
  'CLO-Y7S-0006', 'ELE-G0K-0012', 'ELE-VUV-0014', 'CLO-9JR-0007', 'ACC-A4W-0004',
  'TOO-QYI-0001', 'HOM-ZOK-0004', 'GAR-HEG-0001', 'HOM-8N9-0005', 'SPO-614-0006',
  'ELE-VLB-0015', 'TOO-Y2P-0002', 'KIT-0FU-0008', 'OUT-HGM-0001', 'OUT-788-0002',
  'SPO-23K-0007', 'HOM-YSJ-0006', 'ELE-CCJ-0016', 'KIT-AWW-0009', 'FUR-3P2-0002',
  'HOM-ZX3-0007', 'ELE-9UF-0017', 'ACC-TUN-0005', 'OFF-A6L-0001', 'PER-5ND-0001',
  'ELE-OHK-0018', 'SPO-LLV-0008', 'CLO-EEU-0008', 'ELE-6UB-0019', 'KIT-BDK-0010',
  'TOO-OSM-0003', 'HOM-92E-0008', 'ACC-OGN-0006', 'ACC-KP6-0007', 'ACC-MNX-0008',
  'SPO-CDM-0009', 'TOO-CFB-0004', 'CLO-Z1M-0009', 'OFF-PX9-0002', 'ELE-0CV-0007',
  'SPO-QPP-0005', 'KIT-LGK-0011', 'ACC-2MP-0009', 'PER-TDF-0002', 'OFF-HX3-0004',
  'OFF-XRI-0003', 'ELE-IT0-0020'
];

const statuses = ['pending', 'pending', 'pending', 'shipped', 'delivered'];

function unitPriceFromId(productId) {
  const hash = productId.split('').reduce((sum, c) => sum + c.charCodeAt(0), 0);
  return (hash % 180) + 20;
}

function generateOrders(count = 120) {
  const orders = [];

  for (let i = 0; i < count; i += 1) {
    const userId = userIds[i % userIds.length];
    const itemCount = (i % 4) + 2;
    const used = new Set();
    const items = [];
    let total = 0;

    for (let j = 0; j < itemCount; j += 1) {
      let index = (i * 7 + j * 11) % productIds.length;
      while (used.has(index)) {
        index = (index + 1) % productIds.length;
      }
      used.add(index);

      const productId = productIds[index];
      const quantity = ((i + j) % 3) + 1;
      const unitPrice = unitPriceFromId(productId);

      items.push({ productId, quantity });
      total += unitPrice * quantity;
    }

    orders.push({
      userId,
      items,
      total,
      status: statuses[i % statuses.length]
    });
  }

  return orders;
}

const payload = { orders: generateOrders(120) };
const outDir = path.join(process.cwd(), 'data');
const outFile = path.join(outDir, 'orders-bulk-120.json');

fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(outFile, JSON.stringify(payload, null, 2));

console.log(`Created ${outFile} with ${payload.orders.length} orders.`);
