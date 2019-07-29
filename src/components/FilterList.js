import React, { Component } from 'react';
import { ProductConsumer } from '../context'; 
import {ButtonContainer} from './Button';
import Filter from './Filter';

class FilterList extends Component {
    state = {  }
    render() { 
        return ( 
            <div className="row">
            <div className="col-10 col-md-10 col-lg-10 my-1 mx-2">
            <p>Filter By Company:</p>
            </div>
            <ProductConsumer>
                {(value) => {
                    return value.productBrands.map(item => {
                        return <Filter key={item} item= {item} updateSelectedCompanyList={value.updateSelectedCompanyList} />
                    })
                }}
            </ProductConsumer>
            </div>
         );
    }
}
 
export default FilterList;