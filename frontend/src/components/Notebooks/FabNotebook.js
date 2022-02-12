import './FabNotebook.css'

const FloatingNotebookButton = props => {
  return (
    <div
      className={props.hidden ? 'fabNB hiddenNB' : 'fabNB'}
      onClick={props.onClick}
    >
      <span className="fab-icon"> ➕ </span>
    </div>
  )
}


export default FloatingNotebookButton;
