let calendar = document.querySelector('.calendar')
let dark_mode_toggle = document.querySelector('.dark-mode-switch')
let pre_year_btn = document.querySelector('#prev-year')
let next_year_btn = document.querySelector('#next-year')

let currDate = new Date()

const month_names = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']


// Determining The Number Of Days In A Month take from: https://dzone.com/articles/determining-number-days-month
function daysInMonth(iMonth, iYear){
    return 32 - new Date(iYear, iMonth, 32).getDate();
}

generateCalendar = (month, year) => {

    let calendar_days = calendar.querySelector('.calendar-days')
    let calendar_header_year = calendar.querySelector('#year')
    let month_picker = calendar.querySelector('#month-picker')

    calendar_days.innerHTML = ''

    // if (!month) month = currDate.getMonth()
    // if (!year) year = currDate.getFullYear()

    let curr_month = `${month_names[month]}`
    month_picker.innerHTML = curr_month
    calendar_header_year.innerHTML = year

    let first_day = new Date(year, month, 1)

    for (let i = 0; i <= daysInMonth(month, year) + first_day.getDay() - 1; i++) {
        console.log(daysInMonth(month, year) + first_day.getDay() - 1)
        console.log(first_day.getDay() + 1)
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
}

let curr_month = currDate.getMonth()
let curr_year = currDate.getFullYear()

pre_year_btn.onclick = ()=>{
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

