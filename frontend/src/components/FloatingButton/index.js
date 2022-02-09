import './FloatingButton.css'

const FloatingButton = props => {
  return (
    <div
      className={props.hidden ? 'fab hidden' : 'fab'}
      onClick={props.onClick}
    >
      <span className="fab-icon"> ➕ </span>
    </div>
  )
}


export default FloatingButton;
