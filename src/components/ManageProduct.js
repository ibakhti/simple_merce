import React, { Component } from 'react'
import axios from 'axios'
import {connect} from 'react-redux'


class ManageProduct extends Component {
    state = {
        products: [],
        index: 0,
        flag: true
    }

    componentDidMount() {
        this.getProduct()
    }

    getProduct = () => {
        axios.get('http://localhost:1996/products')
            .then(res => {
                this.setState({products: res.data})
            })
        }

    inputProducts = () => {
    
        const name = this.name.value;
        const desc = this.desc.value;
        const price = this.price.value;
        const src = this.pict.value;

        axios.post('http://localhost:1996/products',{
            name,
            desc,
            price,
            src
        }).then( res => {
            // console.log('db update')
            // axios.get('http://localhost:1996/products')
            // .then(res => {
            //     this.setState({products: res.data})
            // })
            this.getProduct()
        }).catch( err => console.log(err))
        this.name.value = ''
        this.desc.value = ''
        this.price.value = ''
        this.pict.value = ''
    }

    deleteButton = (i) => {
        
        axios.delete(`http://localhost:1996/products/${i}`)
            .then( res => {
            // console.log('delete')
            this.getProduct()
        }).catch( err => console.log(err))
    };

    editClick = (index) => {
        this.setState({
            index: index,
            flag: false
        })
    }

    saveChangeClick = () => {
        const i = this.state.index + 1
        const name = this.n.value || this.state.products[this.state.index].name;
        const price = this.p.value || this.state.products[this.state.index].price;
        const desc = this.d.value || this.state.products[this.state.index].desc;
        const src = this.pi.value || this.state.products[this.state.index].src;

        axios.put(`http://localhost:1996/products/${i}`, {
            name, price, desc, src
        }).then( res => {
            axios.get('http://localhost:1996/products')
            .then(res => {
                this.setState({
                    products: res.data,
                    flag: true
                })
            })
        })
    }

    renderList = () => {
        return this.state.products.map((item, i) => {
            return (
                <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td>{item.desc}</td>
                    <td>{item.price}</td>
                    <td><img className="list" src={item.src} alt={item.desc}></img></td>
                    <td>
                        <button onClick={() => {this.editClick(i)}} className="btn btn-primary mr-2">Edit</button>
                        <button onClick ={() => {this.deleteButton(item.id)}} className="btn btn-danger">Delete</button>
                    </td>
                </tr>
            )
        })
    }


    render() {
        if (this.state.flag) {
            return (
                <div className="container">
                    <h1 className="display-4 text-center">Manage Product</h1>
                    <table className="table table-hover mb-5">
                            <thead>
                                <tr>
                                    <th scope="col">ID</th>
                                    <th scope="col">NAME</th>
                                    <th scope="col">DESC</th>
                                    <th scope="col">PRICE</th>
                                    <th scope="col">PICTURE</th>
                                    <th scope="col">ACTION</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.renderList()}
                            </tbody>
                        </table>
                        <h1 className="display-4 text-center">input Product</h1>
                        
                        {/* tabel input */}
                        <table className="table text-center">
                            <thead>
                                <tr>
                                    <th scope="col">NAME</th>
                                    <th scope="col">DESC</th>
                                    <th scope="col">PRICE</th>
                                    <th scope="col">PICTURE</th>
                                    <th scope="col">ACTION</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th scope="col"><input ref={input => this.name = input} className="form-control" type="text" /></th>
                                    <th scope="col"><input ref={input => this.desc = input} className="form-control" type="text" /></th>
                                    <th scope="col"><input ref={input => this.price = input} className="form-control" type="text" /></th>
                                    <th scope="col"><input ref={input => this.pict = input} className="form-control" type="text" /></th>
                                    <th scope="col"><button onClick={this.inputProducts} className="btn btn-outline-warning" >Add</button></th>
                                </tr>
                            </tbody>
                        </table>
                    </div>
            )          
        }else {
            return (
                <div className="container">
                    <div className="row justify-content-center bg-dark text-white my-5">
                        <h1 className="display-4">Edit Product</h1>
                    </div>

                    <div className="row justify-content-center">
                        <div className="col-sm-4">
                            <ul className="list-group">
                                <li className="list-group-item">
                                    <form className="form-group">
                                        <label for="#namechange">Name</label>
                                        <input ref={input => this.n =input} type="text" className="form-control" id="namechange" placeholder={this.state.products[this.state.index].name} />
                                    </form>
                                </li>
                                <li className="list-group-item">
                                    <form className="form-group">
                                        <label for="#descchange">Description</label>
                                        <input ref={input => this.d =input} type="text" className="form-control" id="descchange" placeholder={this.state.products[this.state.index].desc} />
                                    </form>
                                </li>
                                <li className="list-group-item">
                                    <form className="form-group">
                                        <label for="#pricechange">Price</label>
                                        <input ref={input => this.p =input} type="text" className="form-control" id="pricechange" placeholder={this.state.products[this.state.index].price} />
                                    </form>
                                </li>
                                <button onClick={this.saveChangeClick} className="btn btn-outline-primary mt-2">Save Changes</button>
                            </ul>
                        </div>
                        <div className="col-sm-4">
                            <ul className='list-group'>
                                <li className="list-group-item">
                                    <img src={this.state.products[this.state.index].src} className="image-fluid" alt="..." id="imagechange" />
                                </li>
                                <li className="list-group-item">
                                    <form className="form-group">
                                        <label for="pictchange">Picture Source</label>
                                        <input ref={input => this.pi =input} type="text" className="form-control" placeholder={this.state.products[this.state.index].src} />
                                    </form>
                                </li>
                            </ul>

                        </div>
                    </div>
                </div>
            )
        }
        
    }
}

export default connect()(ManageProduct)
