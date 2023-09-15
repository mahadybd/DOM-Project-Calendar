let calendar = document.querySelector('.calendar')
let calendar_days = calendar.querySelector('.calendar-days')
let dark_mode_toggle = document.querySelector('.dark-mode-switch')
let prev_year_btn = document.querySelector('#prev-year')
let next_year_btn = document.querySelector('#next-year')
let prev_years_btn = document.querySelector('#prev-years')
let next_years_btn = document.querySelector('#next-years')
let month_list = document.querySelector('.month-list')
let year_list = document.querySelector('.year-list')
let year_list_container = document.querySelector('.year-list-container')
let year_list_header = document.querySelector('.year-list-header')
let month_picker = calendar.querySelector('#month-picker')
let calendar_header_year = calendar.querySelector('#year')
let year_list_title = calendar.querySelector('#current-year')

let currDate = new Date()

let curr_month = currDate.getMonth()
let curr_year = currDate.getFullYear()

const month_names = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

// Determining The Number Of Days In A Month take from: https://dzone.com/articles/determining-number-days-month
function daysInMonth(iMonth, iYear){
    return 32 - new Date(iYear, iMonth, 32).getDate();
}

function generateCalendar (month, year){

    calendar_days.innerHTML = ''

    // if (!month) month = currDate.getMonth()
    // if (!year) year = currDate.getFullYear()

    let temp_month = `${month_names[month]}`
    month_picker.innerHTML = temp_month
    calendar_header_year.innerHTML = year

    let first_day = new Date(year, month, 1)

    for (let i = 0; i <= daysInMonth(month, year) + first_day.getDay() - 1; i++) {
        let day = document.createElement('div')
        if (i >= first_day.getDay()) {
            day.classList.add('calendar-day-hover')
            day.innerHTML = i - first_day.getDay() + 1
            if (i - first_day.getDay() + 1 === currDate.getDate() && year === currDate.getFullYear() && month === currDate.getMonth()) {
                day.classList.add('curr-date')
            }
        }
        calendar_days.appendChild(day)
    }

    return calendar_days
}


month_picker.onclick = () => {
    month_list.classList.add('show')
    createMonths ();
}

function createMonths () {
    if(month_list.hasChildNodes()){
        month_list.removeChild()
    }

    month_names.forEach((month_name, index) => {
        let month = document.createElement('div')
        month.innerHTML = `<div>${month_name}</div>`
        month.onclick = () => {
            month_list.classList.remove('show')
            curr_month = index
            generateCalendar(curr_month, curr_year)
            console.log(curr_month, curr_year)
        }
        month_list.appendChild(month)
    })

    return month_list;
};




//create html elements
function createNestedElements(preText1, preText2) {
    let divElement = document.createElement('div');

    let createSpan = function() {
        let spanElement = document.createElement('span');
        spanElement.setAttribute('class', 'year-change');
        return spanElement;
    }

    let preElement1 = createPreElement(preText1);
    let preElement2 = createPreElement(preText2);

    let spanElement1 = createSpan();
    spanElement1.appendChild(preElement1);

    let spanElement2 = createSpan();
    spanElement2.appendChild(preElement2);

    divElement.appendChild(spanElement1);
    divElement.appendChild(spanElement2);

    return divElement;
}

function createPreElement(textContent) {
    let preElement = document.createElement('pre');
    preElement.textContent = textContent;
    return preElement;
}

const year_list_controller = createNestedElements('<', '>');

//End

let years = []; 

function generateYears (startYear = curr_year){
    years = []; 
    if(year_list.hasChildNodes()){
        year_list.innerHTML = ""
    }
    //let countYear = curr_year + startYear;
    for (let i = 0; i < 12; i++) {

        years.push(startYear + i)
        let year = document.createElement('div')
        year.innerHTML = `<div> ${years[i]}</div>`
        year.onclick = () => {
            year_list_container.classList.remove('show')
            year_list.classList.remove('show')
            curr_year = parseInt(year.textContent, 10);
            generateCalendar(curr_month, curr_year)
        }
        
        year_list.appendChild(year)   
    } 

    return year_list;

}

year_list_title.innerHTML = curr_year;

year_list_title.onclick = () => {    
    year_list_container.classList.remove('show')
    year_list.classList.remove('show')
    curr_year = parseInt(year.textContent, 10);
    generateCalendar(curr_month, curr_year)
}

calendar_header_year.onclick = () => {    
    year_list_container.classList.add('show')
    year_list.classList.add('show')
  
    generateYears (curr_year);
}

prev_years_btn.onclick = () => {
    let firstYearItem = years[0]
    firstYearItem =+ firstYearItem - 12;
    console.log(firstYearItem)
    generateYears (firstYearItem);
}

next_years_btn.onclick = () => {   
    let lastYearItem = years[years.length - 1]
    console.log(lastYearItem)
    generateYears (lastYearItem );
}


prev_year_btn.onclick = ()=>{
    curr_year = (curr_month === 0) ? curr_year - 1 : curr_year;
    curr_month = (curr_month === 0) ? 11 : curr_month - 1;
    generateCalendar(curr_month, curr_year)
}

next_year_btn.onclick = ()=>{
    curr_year = (curr_month === 11) ? curr_year + 1 : curr_year;
    curr_month = (curr_month + 1) % 12;
    generateCalendar(curr_month, curr_year)
}

dark_mode_toggle.onclick = () => {
    document.querySelector('body').classList.toggle('light')
    document.querySelector('body').classList.toggle('dark')
}

generateCalendar(curr_month, curr_year)

