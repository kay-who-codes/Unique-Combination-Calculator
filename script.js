// Get DOM elements
const variablesInput = document.getElementById('variables');
const groupSizeInput = document.getElementById('group-size');
const totalCombinations = document.getElementById('total-combinations');
const combinationsList = document.getElementById('combinations-list');

// Function to calculate factorial
function factorial(n) {
  if (n === 0 || n === 1) return 1;
  return n * factorial(n - 1);
}

// Function to calculate permutations
function calculatePermutations(n, r) {
  return factorial(n) / factorial(n - r);
}

// Function to generate all unique combinations
function generateCombinations(variables, groupSize) {
  const result = [];
  const used = new Set();

  function backtrack(current) {
    if (current.length === groupSize) {
      result.push([...current]);
      return;
    }
    for (let i = 1; i <= variables; i++) {
      if (!used.has(i)) {
        used.add(i);
        current.push(i);
        backtrack(current);
        current.pop();
        used.delete(i);
      }
    }
  }

  backtrack([]);
  return result;
}

// Function to update results
function updateResults() {
  const variables = parseInt(variablesInput.value);
  const groupSize = parseInt(groupSizeInput.value);

  if (isNaN(variables) || isNaN(groupSize) || variables < 1 || groupSize < 1 || groupSize > variables) {
    totalCombinations.textContent = '0';
    combinationsList.innerHTML = '';
    return;
  }

  const total = calculatePermutations(variables, groupSize);
  const combinations = generateCombinations(variables, groupSize);

  totalCombinations.textContent = total;
  combinationsList.innerHTML = combinations
    .map(combo => `<div>${combo.join(', ')}</div>`)
    .join('');
}

// Event listeners for input changes
variablesInput.addEventListener('input', updateResults);
groupSizeInput.addEventListener('input', updateResults);