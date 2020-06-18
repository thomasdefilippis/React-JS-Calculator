import React from 'react';
import './components.css';

export default class Display extends React.Component {
    render(){
        return(
            <tr className="table-row">
                <td colspan='4' id="display" className="corner-top-left">
                    {this.props.text}
                </td>
                
            </tr>
        )
    }
}