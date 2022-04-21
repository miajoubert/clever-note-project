import './NoteFAB.css'

const NoteFloatingButton = props => {
  return (
    <div
      className={props.hidden ? 'note-fab-button hidden' : 'note-fab-button'}
      onClick={props.onClick}
    >
      <span className="fas fa-plus"></span>
    </div>
  )
}

export default NoteFloatingButton;
