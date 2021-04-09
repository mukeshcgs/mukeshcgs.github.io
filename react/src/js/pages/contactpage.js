import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from "react-redux"
import { bindActionCreators } from 'redux'
import ReactDOM from "react-dom"

class ContactPage extends Component {
    render() {
        return (<div class="page-container">
            <div class="page-heading">
                say Hi...
            </div>

            <div class="about-details">
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ea distinctio, earum eaque, dolorem recusandae reiciendis eveniet ipsum quidem expedita voluptates quasi atque blanditiis sapiente architecto amet delectus laboriosam non tempora doloribus praesentium assumenda culpa quas aspernatur ad? Minus consectetur libero pariatur distinctio optio impedit delectus omnis sunt facilis, ipsam explicabo dignissimos ratione praesentium in numquam quasi, esse magnam sed sint minima? Harum, veritatis cum, aspernatur debitis dignissimos laboriosam illum commodi, ratione fuga possimus obcaecati voluptatem, ab rem consectetur cupiditate. Fugit libero consequuntur magni non eius provident sapiente, tempora laudantium illum eos accusamus ad modi iure quod nostrum nobis! Accusantium ex hic adipisci quaerat asperiores praesentium quisquam nihil accusamus aliquam, quia excepturi illo voluptatum. Officia hic unde labore, temporibus dolores reiciendis natus, neque nemo. Quibusdam illum soluta provident sit perspiciatis optio neque ipsum quis vel itaque nesciunt, dolor odio architecto qui sunt voluptatem, reprehenderit vitae dignissimos id doloremque libero fuga, ratione.
                </p>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ea distinctio, earum eaque, dolorem reculis, ipsam explicabo dignissimos ratione praesentium in numquam quasi, esse magnam sed </p>            <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ea distinctio, earum eaque, dolorem recusandae reiciendis eveniet ipsum quidem expedita voluptates quasi atque blanditiis sapiente architecto amet delectus laboriosam non tempora doloribus praesentium assumenda culpa quas aspernatur ad? Minus consectetur libero pariatur distinctio optio impedit delectus omnis sunt facilis, ipsam explicabo dignissimos ratione praesentium in numquam quasi, esse magnam sed </p>
            </div>
        </div>)
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(dispatch)
}

export default connect(mapDispatchToProps)(ContactPage);


