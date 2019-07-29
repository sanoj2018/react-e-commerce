import React, { Component } from 'react';
import styled from 'styled-components';
import {ProductConsumer} from '../context';

class LoadingIcon extends Component {
    state = {  }
    render() { 
        return ( 
            <ProductConsumer>
                {(value) => {
                    return value.showLoadingIcon ? 
                    <Loading src="img/loading-icon.gif">
                    </Loading> : null;
                }}
            </ProductConsumer>
         );
    }
}
 
export default LoadingIcon;

const Loading = styled.img`
position: fixed;
top: 60%;
left: 60%;
margin-left: -32px;
margin-top: -32px;
background: #000;
width: 64px;
height: 64px;
z-index: 2;
`