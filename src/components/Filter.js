import React, { Component } from 'react';
import {ButtonContainer} from './Button';

class Filter extends Component {
    state = { isSelected : false};
    handleClick = (item) => {
        this.setState((prevState) => {
            return {isSelected: !prevState.isSelected}
        }, () => {
            this.props.updateSelectedCompanyList(item, this.state.isSelected);
        });
    }
    render() {
        const item = this.props.item;
        return ( 
            <ButtonContainer selected ={this.state.isSelected} className="col-5 col-md-10 col-lg-10 my-2 mx-2" onClick={() => {
                this.handleClick(item);
               }}>{item}</ButtonContainer>
         );
    }
}
 
export default Filter;