import React, { Component } from 'react';
import {ProductConsumer} from '../context';

class PriceFilter extends Component {
    state = {  }
    render() { 
        return ( 
            <ProductConsumer>
                {(value) => {
                    return <div className="ml-auto">
                    Order by: 
                    <select onChange={(e)=> {
                        value.setPriceFilter(e.target.value);
                    }} className="mx-2 my-4">
                        <option value=''>--select--</option>
                        <option value="lowtohigh">Lowest to highest</option>
                        <option value="hightolow">Highest to lowest</option>
                    </select>
                </div>
                }}
            </ProductConsumer>
         );
    }
}
 
export default PriceFilter;
