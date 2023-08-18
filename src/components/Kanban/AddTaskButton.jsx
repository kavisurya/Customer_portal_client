const AddTaskButton = ({ handleClick }) => {
  return (
    <div  style={{width:'60%'}} className='add-task-button' onClick={handleClick}>
      +
    </div>
  );
};

export default AddTaskButton;
