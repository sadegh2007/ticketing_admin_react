import moment from 'jalali-moment'
import React from 'react';

const PersianDate = ({ date, format, className }) => {

  let jalaliDate = moment(date).locale('fa');

  let formatedDate = '';
  switch (format) {

    case 'shortDate':
      formatedDate = jalaliDate.format('YYYY/MM/DD')
      break
    case 'shortDateTime':
      formatedDate = jalaliDate.format('YYYY/MM/DD - HH:MM')
      break
    case 'mediumDate':
      formatedDate = jalaliDate.format('DD MMMM YYYY')
      break
    case 'mediumDateTime':
      formatedDate = jalaliDate.format('DD MMMM YYYY - HH:MM')
      break
    case 'fullDate':
      formatedDate = jalaliDate.format('dddd DD MMMM jYYYY')
      break
    case 'fullDateTime':
      formatedDate = jalaliDate.format('dddd DD MMMM YYYY - HH:MM')
      break

    default: formatedDate = jalaliDate.format('YYYY/MM/DD')
  }

  return (
    <span className={className} dir="ltr">
      {formatedDate}
    </span>
  )
}
export default PersianDate;