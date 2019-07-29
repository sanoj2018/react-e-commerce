import React, { Component } from 'react';
import {storeProducts, detailProduct} from './data';
const ProductContext = React.createContext();

class ProductProvider extends Component {
    state = { 
        products: [],
        productOnDisplay: [],
        detailProduct: [],
        productBrands:[],
        filteredProduct: [],
        selectedCompanyList: [],
        showLoadingIcon: false,
        priceFilterOrder: '',
     }
     componentDidMount() {
         this.setState(() => {
            return {
                showLoadingIcon: true
            }
         }, () => {
            this.setProducts();
         });
     }
     updateSelectedCompanyList = (company, isSelected) => {
         let tempCompanyList = [...this.state.selectedCompanyList],
            index;
         if (isSelected) {
            tempCompanyList.push(company);
         } else {
            index = tempCompanyList.indexOf(company);
            tempCompanyList.splice(index, 1);
         }
         this.setState({showLoadingIcon: true});
         this.setState(() => {
            return {
                selectedCompanyList: tempCompanyList
            }
         }, () => {
             if (this.state.selectedCompanyList.length > 0) {
                this.filterProductByCompany();
             } else {
                this.setProducts();
             }
         });

     }
     setProducts = () => {
         let tempProducts = [], productBrands = [];
         storeProducts.forEach(item => {
            const singleItem = {...item};
            tempProducts = [...tempProducts, singleItem];
            if (productBrands.indexOf(singleItem.company) < 0) {
                productBrands.push(singleItem.company);
            }
         })
         this.setState(() => {
             return { products: tempProducts,
                      productOnDisplay: tempProducts,
                      productBrands: productBrands};
         }, () => {
             setTimeout(() => {
                this.setState({showLoadingIcon: false});
             }, 500)
         })
     }
     getItem = (id) => {
        return this.state.productOnDisplay.find(item => item.id === id);
     }
     setPriceFilter = (filter) => {
         if (filter === 'lowtohigh' || filter === 'hightolow') {
            this.setState(() => {
                return {
                    showLoadingIcon: true,
                    priceFilterOrder: filter
                }
             }, () => {
                this.filterProductByPrice();
             })
         }
     }
     filterProductByPrice = () => {
        let tempProduct;
        if (this.state.priceFilterOrder === 'lowtohigh') {
            tempProduct = this.state.productOnDisplay.sort((a,b) => {
                return a.price -b.price;
            })
        } else if (this.state.priceFilterOrder === 'hightolow') {
            tempProduct = this.state.productOnDisplay.sort((a,b) => {
                return b.price -a.price;
            })
        }
        this.setState(()=> {
            return {
                productOnDisplay: tempProduct
            }
        }, () => {
            setTimeout(()=> {
                this.setState({showLoadingIcon: false});
            }, 500)
        })
     }
     filterProductByCompany = () => {
         let tempProduct = this.state.products.filter((item) => {
             if (this.state.selectedCompanyList.indexOf(item.company) > -1) {
                return item;
             }
         })
        this.setState(() => {
            return {
                productOnDisplay: tempProduct
            }
        }, () => {
            setTimeout(()=> {
                this.setState({showLoadingIcon: false});
            }, 400)
        });
     }
     handleDetails = (id) => {
         const product = this.getItem(id);
         this.setState(() => {
             return {detailProduct: product}
         });
     }
     addToCart = (id) => {
        console.log('Hello from cart'+id);
    }
    render() { 
        return ( 
            <ProductContext.Provider value={{
                ...this.state,
                handleDetails: this.handleDetails,
                addToCart: this.addToCart,
                updateSelectedCompanyList: this.updateSelectedCompanyList,
                setPriceFilter: this.setPriceFilter
            }}>
                {this.props.children}
            </ProductContext.Provider>
         );
    }
}
 
const ProductConsumer = ProductContext.Consumer;

export {ProductProvider, ProductConsumer};