import './FloatingButton.css'

const FloatingButton = props => {
  return (
    <div
      className={props.hidden ? 'fab-button hidden' : 'fab-button'}
      onClick={props.onClick}
    >
      <span className="fab-icon"> ➕ </span>
    </div>
  )
}


export default FloatingButton;
