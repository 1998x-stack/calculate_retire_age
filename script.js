// Populate Year and Month Dropdowns with defaults set
window.onload = function () {
  const yearSelect = document.getElementById('year');
  const monthSelect = document.getElementById('month');
  const typeSelect = document.getElementById('type');

  populateYearDropdown(yearSelect);
  populateMonthDropdown(monthSelect);

  // Set default values
  yearSelect.value = '1990';
  monthSelect.value = '6';
  typeSelect.value = '1';
};

function populateYearDropdown(selectElement) {
  const startYear = 1950;
  const endYear = new Date().getFullYear();
  for (let i = endYear; i >= startYear; i--) {
    const option = document.createElement('option');
    option.value = i;
    option.textContent = i;
    selectElement.appendChild(option);
  }
}

function populateMonthDropdown(selectElement) {
  for (let i = 1; i <= 12; i++) {
    const option = document.createElement('option');
    option.value = i;
    option.textContent = i;
    selectElement.appendChild(option);
  }
}

// Event listeners for calculate and reset buttons
document.getElementById('submit').addEventListener('click', calculateRetirement);
document.getElementById('reset').addEventListener('click', resetForm);

function calculateRetirement() {
  const year = document.getElementById('year').value;
  const month = document.getElementById('month').value;
  const type = document.getElementById('type').value;

  if (!year || !month || !type) {
    alert('请选择所有字段');
    return;
  }

  let retirementAge, delayMonths;

  switch (type) {
    case '1': // 男职员
      retirementAge = year < 1965 ? 60 : 63;
      delayMonths = year > 1976 ? 36 : 0;
      break;
    case '2': // 女职员（55岁退休）
      retirementAge = year < 1970 ? 55 : 58;
      delayMonths = year > 1981 ? 36 : 0;
      break;
    case '3': // 女职员（50岁退休）
      retirementAge = year < 1975 ? 50 : 55;
      delayMonths = year > 1984 ? 60 : 0;
      break;
  }

  const retirementDate = calculateRetirementDate(year, month, retirementAge, delayMonths);
  
  document.getElementById('result').textContent = `${retirementAge} 岁`;
  document.getElementById('result_time').textContent = retirementDate;
  document.getElementById('result_month').textContent = `${delayMonths} 个月`;
}

function calculateRetirementDate(year, month, retirementAge, delayMonths) {
  const date = new Date(year, month - 1);
  date.setFullYear(date.getFullYear() + retirementAge);
  date.setMonth(date.getMonth() + delayMonths);
  return `${date.getFullYear()} 年 ${date.getMonth() + 1} 月`;
}

function resetForm() {
  document.getElementById('year').value = '1990';
  document.getElementById('month').value = '6';
  document.getElementById('type').value = '1';
  document.getElementById('result').textContent = '---';
  document.getElementById('result_time').textContent = '---';
  document.getElementById('result_month').textContent = '---';
}