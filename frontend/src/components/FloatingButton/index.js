import './FloatingButton.css'

const FloatingButton = props => {
  return (
    <div
      className={props.hidden ? 'fab-button hidden' : 'fab-button'}
      onClick={props.onClick}
    >
      <span class="fas fa-plus"></span>
    </div>
  )
}


export default FloatingButton;
