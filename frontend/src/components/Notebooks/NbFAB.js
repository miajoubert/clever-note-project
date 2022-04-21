import './NbFAB.css'

const NbFloatingButton = props => {
  return (
    <div
      className={props.hidden ? 'fab-button hidden' : 'fab-button'}
      onClick={props.onClick}
    >
      <span className="fas fa-plus"></span>
    </div>
  )
}

export default NbFloatingButton;
