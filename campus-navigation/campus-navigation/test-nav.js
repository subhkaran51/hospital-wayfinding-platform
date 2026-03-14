
import { searchDepartments, computeRoute } from './src/data/navigationEngine.js';
import { ALL_DEPARTMENTS } from './src/data/campusData.js';

console.log('Testing Search "Emergency":');
const results = searchDepartments('Emergency');
console.log(JSON.stringify(results, null, 2));

console.log('\nTesting computeRoute for dep-001:');
try {
  const route = computeRoute('dep-001', false, 'scheduled');
  console.log('Route found:', !!route);
  if (route) {
    console.log('Steps:', route.steps.length);
    console.log('Path:', route.path);
  }
} catch (e) {
  console.error('Error in computeRoute:', e);
}
