import React from 'react';
import classes from './MyPagination.module.css'

const MyPagination = ({count_pages, page, changePage}) => {

    const range = (start, stop, step) =>
    Array.from({ length: (stop - start) / step + 1 }, (_, i) => start + i * step);

    const pages_array_1 = range(1, 1, 1)

    // условия для вывода номеров страниц 
    const check_page = (p) => {
      if ((count_pages >= 1) && (count_pages<=7)) {
        return range(2, count_pages-1, 1) 
      }
      if (p == 1) {
        return range(2, 8, 1) 
      }
      if ((p >= 1) && (p<=7)) {
        return range(2, 8, 1) 
      }
      if ((p <= count_pages) && (p >=(count_pages-7))) {
        return range(count_pages-8, count_pages-1, 1) 
      }
      else if ((5 <= p) && (p <= (count_pages-5))) {
        return range(p - 2, p + 2, 1) 
      }
      else {
        return false
      }
    }

    let pages_array_2 = check_page(page)
    
    const pages_array_3 = range(count_pages, count_pages, 1)

    return (
    <div className={classes.button_group}>
      
      {pages_array_1.map(p =>  
              <button className={page === p ? classes.page__current : classes.page}
                    onClick={e => changePage(p)}
                    key={p}>
                {p}
              </button>)}
     
      <div className={classes.btn}>
      {count_pages !== (1 || 0) ?
      (pages_array_2.map(p =>  
              <button className={page === p ? classes.page__current : classes.page}
                    onClick={e => changePage(p)}
                    key={p}>
                {p}
              </button>))
        : <div>...</div>
      }
      </div>
      {pages_array_3.map(p =>  
              <button className={page === p ? classes.page__current : classes.page}
                    onClick={e => changePage(p)}
                    key={p}>
                {p}
              </button>)}
    </div>
    );
}

export default MyPagination;