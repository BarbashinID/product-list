import React, { useState, useEffect, useMemo } from 'react'
import ProductsService from '../API/ProductsService'
import classes from './MyProducts.module.css'
import MyPagination from '../MyPagination/MyPagination'

const MyProducts = () => {

  const [id, setId] = useState([])
  const [loading, setLoading] = useState(false)
  const limit = 50
  const [items, setItems] = useState([])
  const [pagesArray, setPagesArray] = useState([])
  const [page, setPage] = useState(1)
  const [price, setPrice] = useState("")
  const [product, setProduct] = useState("")
  const [brand, setBrand] = useState("")


  const getid = async () =>{
    setLoading(true);
    const data = await ProductsService.fetchIds()
    setId(ProductsService.delete_duplicate(data))
  }
  const getItems = async (arr) =>{
    const data = await ProductsService.fetchItems(arr)
    setItems(ProductsService.delete_duplicate_2(data))
    setLoading(false);
  }

  const getPrice = async (price) =>{
    setLoading(true);
    const data = await ProductsService.fetch_search_priceItems(price)
    setId(data)
    const data2 = await ProductsService.fetchItems(data)
    setItems(data2.slice(limit*page-limit, limit*page)) 
    setPagesArray(Math.ceil((data2.length)/limit))
    setLoading(false);
 
  }
  const getProduct = async (product) =>{
    setLoading(true);
    const data = await ProductsService.fetch_search_nameItems(product)
    const data2 = await ProductsService.fetchItems(data)
    setId(data)
    setItems(data2.slice(limit*page-limit, limit*page)) 
    setPagesArray(Math.ceil((data2.length)/limit))
    setLoading(false);
  }
  const getBrand = async (brand) =>{
    setLoading(true);
    const data = await ProductsService.fetch_search_brandItems(brand)
    setId(data)
    const data2 = await ProductsService.fetchItems(data)
    setItems(data2.slice(limit*page-limit, limit*page)) 
    setPagesArray(Math.ceil((data2.length)/limit))
    setLoading(false);
  }

  useEffect(() => {
    getid()
  }, [])
  useEffect(() =>{
    setPagesArray(Math.ceil((id.length)/limit))
    getItems(id.slice(0, limit))
  }, [id])

  useEffect(() => {
    getItems(id.slice(limit*page-limit, limit*page))
  }, [page])

  useEffect(() => {
    if (price !== "") {
    getPrice(price)
  } else if (price == "") {
    getid()
  }
  }, [price])

  useEffect(() => {
    if (brand !== "") {
    getBrand(brand)
  } else if (brand == "") {
    getid()
  }
  }, [brand])

  useEffect(() => {
    if (product !== "") {
    getProduct(product)
    }
    else if (product == "") {
      getid()
    }
  }, [product])

    return (
      <div>
        <div className={classes.filters_group}>
        <input className={classes.filter}
          onChange={e => setProduct(e.target.value)}
          placeholder='product...'>
        </input>
        <input className={classes.filter}
          onChange={e => setPrice(e.target.value)}
          placeholder='price...'>
        </input>  
        <input className={classes.filter}
          onChange={e => setBrand(e.target.value)}
          placeholder='brand...'>
        </input>
        </div>
           {loading ? (
        <div>Loading...</div>
         ) : 
         <div> 
          <table  className={classes.table}>
            
            <tbody>
            {items.length !== 0 
              &&   
              items.map((items, k) => 
                  <tr key={k+1}>
                    <td key={k+1}> {k+1} </td>
                    <td key={items.id}> {items.id}</td>
                    <td key={items.product}> {items.product}</td>
                    <td key={items.price}> {items.price}</td>
                    <td key={items.brand}> {items.brand}</td>
                  </tr> 
                      )}          
            </tbody>
          </table> 
          {items.length !== 0 
              ? 
          <MyPagination 
          count_pages={pagesArray} 
          page = {page} 
          changePage={setPage}
        /> :  <div>Not found!</div>} 
       
        </div>
          }
     
          </div>
      );
}

export default MyProducts;