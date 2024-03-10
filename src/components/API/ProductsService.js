import md5 from 'md5'

export default class ProductsService {
    // генерациия пароля к API
    static generateAuthHeader = () => {
      const password = 'Valantis';
      const timestamp = new Date().toISOString().split('T')[0].replace(/-/g, '');
      const authString = `${password}_${timestamp}`;
      return md5(authString);
    };
    // удаление дубликатов id
    static delete_duplicate = (arr) => {
      arr = arr.filter((value, index, self) =>   
      index === self.findIndex((t) => (
        t === value
      ))
     )
     return arr
     }
     // удаление дубликатов items
     static delete_duplicate_2 = (arr) => {
      arr = arr.filter((value, index, self) =>   
      index === self.findIndex((t) => (
        t.id === value.id
      ))
     )
     return arr
    }
   // заполняет массив после удаления

    static fetchIds = async (offset, limit) => {
        try {
         const response = await fetch("http://api.valantis.store:40000/", {
          method: "POST",
          headers: {
            "X-Auth": this.generateAuthHeader(),
            "Content-type": "application/json; charset=UTF-8"}, 
          body: JSON.stringify({
            "action": "get_ids",      
            "params": {"offset": offset, "limit": limit}})})
        if (!response.ok) {
            throw new Error('Network response was not ok')
          }

        const data = await response.json();    
              
        return data.result

      } catch (error) {
        console.error('Error:', error);   
        const data = this.fetchIds()
        return data
      }}

      static fetchItems = async (arr) => {
        try {
          const response = await fetch("http://api.valantis.store:40000/", {
           method: "POST",
           headers: {
             "X-Auth": this.generateAuthHeader(), 
             "Content-type": "application/json; charset=UTF-8"
           }, 
           body: JSON.stringify({
             "action": "get_items",      
             "params": {ids: arr} 
           }),
         })
         if (!response.ok) {
             throw new Error('Network response was not ok');
         }
         const data = await response.json(); 
         return data.result
  
       } catch (error) {
         console.error('Error:', error);
         const data = this.fetchItems(arr)
         return data
       }}

       static fetch_search_priceItems = async (value) => {
        try {
          const response = await fetch("http://api.valantis.store:40000/", {
           method: "POST",
           headers: {
             "X-Auth": this.generateAuthHeader(), 
             "Content-type": "application/json; charset=UTF-8"
           }, 
           body: JSON.stringify({
             "action": "filter",     
             "params": {"price": Number(value)}
           }),
         })
         if (!response.ok) {
             throw new Error('Network response was not ok');
         }
         const data = await response.json(); 
         return data.result
  
       } catch (error) {
         console.error('Error:', error);
       }}

       static fetch_search_nameItems = async (value) => {
        try {
          const response = await fetch("http://api.valantis.store:40000/", {
           method: "POST",
           headers: {
             "X-Auth": this.generateAuthHeader(), 
             "Content-type": "application/json; charset=UTF-8"
           }, 
           body: JSON.stringify({
             "action": "filter",     
             "params": {"product": value}
           }),
         })
         if (!response.ok) {
             throw new Error('Network response was not ok');
         }
         const data = await response.json(); 
         return data.result
  
       } catch (error) {
         console.error('Error:', error);
       }}

       static fetch_search_brandItems = async (value) => {
        try {
          const response = await fetch("http://api.valantis.store:40000/", {
           method: "POST",
           headers: {
             "X-Auth": this.generateAuthHeader(), 
             "Content-type": "application/json; charset=UTF-8"
           }, 
           body: JSON.stringify({
             "action": "filter",     
             "params": {"brand": value}
           }),
         })
         if (!response.ok) {
             throw new Error('Network response was not ok');
         }
         const data = await response.json(); 
         return data.result
  
       } catch (error) {
         console.error('Error:', error);
       }}

}