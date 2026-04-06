import React, { Component } from "react"
import PropTypes from "prop-types"

export default class Clear extends Component {

  onClick =() => {
    let { specActions, path, method } = this.props
    specActions.clearResponse( path, method )
    specActions.clearRequest( path, method )
  }

  render(){
    const { t } = this.props
    return (
      <button className="btn btn-clear opblock-control__btn" onClick={ this.onClick }>
        {(t || (key => key))("button.clear")}
      </button>
    )
  }

  static propTypes = {
    specActions: PropTypes.object.isRequired,
    path: PropTypes.string.isRequired,
    method: PropTypes.string.isRequired,
    t: PropTypes.func,
  }
}
