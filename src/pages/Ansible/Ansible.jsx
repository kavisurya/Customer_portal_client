import React,{useState} from 'react'
import { Header } from '../../components';
// import Board from 'react-trello';

const Ansible = () => {

  const [data, setData] = useState({
    lanes: [
      {
        id: 'lane1',
        title: 'To Do',
        cards: [
          {
            id: 'Card1',
            title: 'Task 1',
            description: 'This is the first task'
          },
          {
            id: 'Card2',
            title: 'Task 2',
            description: 'This is the second task'
          }
        ]
      },
      {
        id: 'lane2',
        title: 'In Progress',
        cards: [
          {
            id: 'Card3',
            title: 'Task 3',
            description: 'This is the third task'
          }
        ]
      },
      {
        id: 'lane3',
        title: 'Done',
        cards: []
      }
    ]
  });



	return (
		<div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
    <Header  title="Ansible" bread={[{value:"Dashboard",nav:"dashboard"},{value:"Ansible",nav:"Ansible"}]} />
   {/*  <Board
      data={data}
      draggable
      handleDragEnd={handleDragEnd}
      style={{ backgroundColor: '#f1f1f1', minHeight: '500px' }}
    />
*/}
    </div>
		)
}

export default Ansible