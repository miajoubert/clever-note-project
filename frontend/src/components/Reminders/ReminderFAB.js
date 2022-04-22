import './ReminderFAB.css'

const ReminderFloatingButton = props => {
  return (
    <div
      className={props.hidden ? 'rem-fab-button hidden' : 'rem-fab-button'}
      onClick={props.onClick}
    >
      <span className="fas fa-plus" id="rem"></span>
    </div>
  )
}

export default ReminderFloatingButton;
