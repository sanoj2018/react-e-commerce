import React, {Component} from 'react';
import Product from './Product';
import Title from './Title';
import {ProductConsumer} from '../context';
import FilterList from './FilterList';
import LoadingIcon from './LoadingIcon';
import PriceFilter from './PriceFilter';


class ProductList extends Component {
    state = {noOfItems: 0};
    render() {
        return (
            <React.Fragment>
                <div className="py-5">
                    <div className="container">
                        <Title name="Our" title="Product"/>
                        <div className="row">
                        <PriceFilter/>
                        </div>
                        <div className="row">
                            <div className="col-12 col-md-3 col-lg-3 text-center mx-auto my-2">
                                <FilterList/>
                                <LoadingIcon/>
                            </div>
                            <div className="col-md-9">
                            <div className="mr-auto">
                            <ProductConsumer>
                                {(value) => {
                                    return <p style={{fontFamily:'Roboto,sans-serif'}}>{value.productOnDisplay.length} Product(s) found.</p>
                                }}
                            </ProductConsumer>
                            </div>
                                <div className="row">
                                <ProductConsumer>
                                {(value)=> {
                                   return value.productOnDisplay.map(product => {
                                       return <Product key={product.id} product={product} handleDetails={value.handleDetails}/>
                                   })
                                }}
                            </ProductConsumer>
                                </div>
                            </div>
                        </div>    
                    </div>
                </div>
            </React.Fragment>
        );
    }
}
export default ProductList;