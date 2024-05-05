import React, { useState, useEffect } from 'react';
import { submitTask, TaskRecommendations, fetchTasks } from '../actions/authActions';
import { useDispatch, useSelector} from 'react-redux'; 
import './Tasks.css';


function Tasks() {
  const dispatch = useDispatch(); // Accessing dispatch function

  const username = useSelector(state => state.auth.username);
  const [tasks, setTasks] = useState([[], [], [], [], [], [], []]); // Initialize tasks state with empty arrays
  const [loading, setLoading] = useState(true); // Initialize loading state
  const [recommendedTasks, setRecommendedTasks] = useState( [
    {
        title: "Morning Yoga Routine",
        description: "Start your day with a 30-minute morning yoga session at home to improve flexibility and strength. This will help increase your overall fitness levels and mental wellbeing."
    },
    {
        title: "Flashcard Review for Assembly Exam",
        description: "Spend 15 minutes each day quizzing yourself with flashcards on key concepts for your upcoming assembly exam. This will help reinforce your understanding and improve retention."
    },
    {
        title: "Research and Note-taking for History Class Essay",
        description: "Take some time to research and gather information for your history class essay topic. Begin outlining your essay structure and main points to ensure a well-organized and coherent piece."
    }]);

  const daysOfWeek = [ 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  const [currentDayIndex, setCurrentDayIndex] = useState(new Date().getDay() - 1); // Index of the current day (0 for Sunday, 1 for Monday, etc.)

  useEffect(() => {
    GetCurrentWeekTasks();
  }, []);
  useEffect(() => {
    console.log("Recommended Tasks Updated:", recommendedTasks);
}, [recommendedTasks]);
  
  const SetRecommendations = async () => {
    try {
        console.log(recommendedTasks)
        const randomTasks = GetRandomTasks(tasks); // Pass tasks array to GetRandomTasks
        console.log("random tasks: ", randomTasks);
        const response = await dispatch(TaskRecommendations(randomTasks)); // Send only description as recommendation
        const parsedResponse = JSON.parse(response);
        console.log(parsedResponse)
        setRecommendedTasks(parsedResponse); 
    } catch (err) {
        console.log(err);
    }
};

  const GetCurrentWeekTasks = async () => {
    try {
      const response = await dispatch(fetchTasks());
      const updatedTasks = [[], [], [], [], [], [], []]; // Create a new array to store updated tasks
      // Sort the tasks depending on the day of week
      for (let i = 0; i < response.length; i++) {
        if(response[i].userID === username){ 
          const isoDateString = String(response[i].Duedate);
          const dateParts = isoDateString.split("T")[0].split("-");
          const year = parseInt(dateParts[0]);
          const month = parseInt(dateParts[1]);
          const day = parseInt(dateParts[2]);
          const date = new Date(year, month - 1, day);
          //console.log(daysOfWeek[date.getDay()])
          response[i].Duetime = convertTo24Hour(response[i].Duetime)
          //Stores each task that the current user
          updatedTasks[date.getDay()].push([response[i].Description, response[i].Duetime])
        }
      }
      console.log(tasks)
      setTasks(updatedTasks); // Update tasks state with the new data
      setLoading(false); // Set loading state to false
    } catch (err) {
      console.log(err);
    }
  };

  function convertTo24Hour(time12h) {
    const [time, modifier] = time12h.split(' ');
  
    let [hours, minutes] = time.split(':');
  
    if (hours === '12') {
      hours = '00';
    }
  
    if (modifier === 'PM') {
      hours = parseInt(hours, 10) + 12;
    }
  
    return `${hours}:${minutes}`;
  }
  

  const handleAddTask = async (e) => {
    e.preventDefault(); // Prevents default form submission behavior
  
    const task = e.target.elements.task.value;
    const description = e.target.elements.description.value;
    const date = e.target.elements.date.value;
    const time = e.target.elements.time.value;
  
    const newTask = { 
      title: task,
      Description: description,
      Duetime: time,
      Duedate: date,
      userID: username
    };
  
    try {
      await dispatch(submitTask(newTask));

      await GetCurrentWeekTasks(); 
      
      //Reset placeholders after a successful task addition
      e.target.elements.task.value = '';
      e.target.elements.description.value = '';
      e.target.elements.date.value = '';
      e.target.elements.time.value = '';
    } catch (err) {
        console.log(err)
    }
  };

  function GetRandomTasks(){
    //Gets 7 random tasks from the scheduled
    const availableTasks = tasks.flat();
    const randomTasks = [];
    const numTasksToSelect = 3;
    
    if (availableTasks.length >= numTasksToSelect) {
        for (let i = availableTasks.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [availableTasks[i], availableTasks[j]] = [availableTasks[j], availableTasks[i]];
        }
        
        randomTasks.push(...availableTasks.slice(0, numTasksToSelect));
    } else {
        console.log("Not enough tasks available to select random tasks.");
    }

    console.log(randomTasks);
    return randomTasks;
}



  // Inputs the recommended task information to task addition form
  const handleRecommendationClick = (task) => {
    const taskInput = document.querySelector('input[name="task"]');
    const descriptionInput = document.querySelector('input[name="description"]');

    // Fill placeholders with values from the recommendation
    taskInput.value = task.title;
    descriptionInput.value = task.description;
  };

  const timeSlots = [];
  for (let i = 8; i <= 22; i += 1) {
    const time = `${i < 10 ? '0' + i : i}:00`;
    timeSlots.push(time); 
  }

  // Render loading spinner while loading data
  if (loading) {
    return <div>Loading...</div>;
  }

  // Render table once data is loaded
  return (
    <div className="App">
      <div className="Table">
      <h1>Weekly Task Planner</h1>
      <table>
        <thead>
          <tr>
            <th>Time</th>
            {daysOfWeek.map((day, index) => (
              <th key={index} className={index === currentDayIndex ? 'current-day' : ''}>{day}</th> //highlights the current day
            ))}
          </tr>
        </thead>
        <tbody>
          {timeSlots.map((time, timeIndex) => (
            <tr key={timeIndex}>
              <td>{time}</td>
              {tasks.map((dayTasks, dayIndex) => (
                <td key={dayIndex}>
                  {dayTasks.map((task, taskIndex) => (
                    <div key={taskIndex}>
                      {task[1] === time ? task[0] : null}
                    </div>
                  ))}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      </div>
      <div className="Recommendations">
        <h1>Recommendations</h1>
          <button onClick={() => SetRecommendations()} className='ShowRecommendations'>Show Recommendations</button> 
        <div className="recommended-tasks-container">
          {recommendedTasks.map((task, index) => (
            <button
              key={index}
              className="recommended-task"
              onClick={() => handleRecommendationClick(task)}
              data-task={task.title}
              data-description={task.description}
            >
              <br />
              <h3>{task.title}</h3>
              <span>{task.description}</span>
            </button>
          ))}
        </div>
      </div>
      <div className="task-form">
        <h2>Add New Task</h2>
        <form onSubmit={handleAddTask}>
          <label>
            Task:
            <input type="text" name="task" placeholder="Enter task" />
          </label>
          <label>
            Description:
            <input type="text" name="description" placeholder="Enter Description" />
          </label>   
          <label>
            Date:<br/>
            <input type="date" name="date" />
          </label><br/> <br/>
          <label>
            Time:<br/>
            <input  type="time" name="time" /> 
          </label> <br/> <br/>
          <button type="submit">Add Task</button>
        </form>
      </div>
    </div>
  );
}

export default Tasks;