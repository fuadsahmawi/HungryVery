import React from "react";
import MenuItem from './MenuItem';

class Cart extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            list : this.props.props
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.props !== this.props.props) {
            this.setState({
                list : this.props.props
              });
        }
      }

    render(){
        if (this.state.list.length > 0) {
            var cart = this.state.list;
            console.log(cart);
            return (
  			<table className="table">
    			<thead>
      				<tr>
        				<th>ID</th>
        				<th>Name</th>
        				<th>Category</th>
        				<th>Price</th>
                        <th>Quantity</th>
      				</tr>
    			</thead>
    			<tbody>
     				{cart.map(food =>
						<MenuItem key={food.foodid} props={food}/>
     				)}
				</tbody>
 			</table>)
        } else {
            return (<table className="table">
            <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th>Quantity</th>
                  </tr>
            </thead>
         </table>)

        }
        
    }
}

export default Cart;