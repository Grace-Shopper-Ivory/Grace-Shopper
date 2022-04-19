import React from 'react'
import {connect} from 'react-redux'
import {fetchProducts} from '../store/products'

export class AllProducts extends React.Component{

    componentDidMount(){
        this.props.fetchProductsThunk()
    }

    render() {
        console.log(this.props)
        let productsArr = this.props.products.products || [];
    
        return (
          <div className="productsList">
            {productsArr.map((products) => (
              <div key={products.id}>
                <Link to={`/products/${products.id}`} className="products">
                  <h2>
                    {products.name}
                  </h2>
                </Link>
                {/* <button
                  type="button"
                  className="deleteStudentButton"
                  onClick={() => this.props.deleteStudentThunk(student.id)}
                >
                  X
                </button> */}
                <img src={products.img} />
              </div>
            ))}
          </div>
        );
      }
    }
    
    const mapState = (state) => {
      return {
        products: state.products,
      };
    };
    
    const mapDispatch = (dispatch) => {
      return {
        fetchProductsThunk: () => dispatch(fetchProducts()),
      };
    };
    
    export default connect(mapState, mapDispatch)(AllProducts);