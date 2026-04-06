import React from "react"
import PropTypes from "prop-types"

export default class AuthorizeOperationBtn extends React.Component {
    static propTypes = {
      isAuthorized: PropTypes.bool.isRequired,
      onClick: PropTypes.func,
      getComponent: PropTypes.func.isRequired,
      t: PropTypes.func,
    }

  onClick =(e) => {
    e.stopPropagation()
    let { onClick } = this.props

    if(onClick) {
      onClick()
    }
  }

  render() {
    let { isAuthorized, getComponent, t } = this.props

    const LockAuthOperationIcon = getComponent("LockAuthOperationIcon", true)
    const UnlockAuthOperationIcon = getComponent("UnlockAuthOperationIcon", true)
    const tFn = t || ((key) => key)

    return (
      <button className="authorization__btn"
        aria-label={isAuthorized ? tFn("aria.authorization_button_locked") : tFn("aria.authorization_button_unlocked")}
        onClick={this.onClick}>
        {isAuthorized ? <LockAuthOperationIcon className="locked" /> : <UnlockAuthOperationIcon className="unlocked"/>}
      </button>

    )
  }
}
