import React, { useState, useEffect } from 'react';
import './App.css';

interface Schedule {
  workName: string;
  startTime: string;
  endTime: string;
}

const App: React.FC = () => {
  const [showBoard, setShowBoard] = useState(false);
  const [showNote, setShowNote] = useState(false);
  const [noteText, setNoteText] = useState('');
  const [rainbowText, setRainbowText] = useState<string[]>([]);
  const [fileContent, setFileContent] = useState('');
  const [schedules, setSchedules] = useState<Schedule[]>([]);

  const handleBoardClick = () => {
    setShowBoard(true);
    setShowNote(false);
  };

  const handleNoteClick = () => {
    setShowBoard(false);
    setShowNote(true);
  };

  const handleNoteChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNoteText(e.target.value);
  };

  useEffect(() => {
    const text = "Đường Đến Thiên Đàng 4.0";
    setRainbowText(text.split('-'));
  }, []);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const content = await file.text();
      setFileContent(content);
    }
  };

  const handleOkClick = () => {
    try {
      const data: Schedule[] = JSON.parse(fileContent);
      setSchedules(data);
    } catch (error) {
      console.error('Failed to parse JSON:', error);
    }
  };

  const handleSaveClick = () => {
    const jsonContent = JSON.stringify(schedules, null, 2);
    const blob = new Blob([jsonContent], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'schedules.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <>
      <header className="header-background">
        <div>
          <button onClick={handleBoardClick}>Board</button>
          <button onClick={handleNoteClick}>Note</button>
        </div>
      </header>
      <div className="container2">
        {rainbowText.map((char, index) => (
          <span key={index} style={{ animationDelay: `${index * 0.1}s` }}>
            {char}
          </span>
        ))}
      </div>
      <div className="container">
        <input type="file" onChange={handleFileChange} accept=".json" />
        <button onClick={handleOkClick}>OK</button>
        <button onClick={handleSaveClick}>Save</button>
        {showBoard && (
          <table>
            <thead>
              <tr>
                <th>Task</th>
                <th>Start Time</th>
                <th>End Time</th>
              </tr>
            </thead>
            <tbody>
              {schedules.map((schedule, index) => (
                <tr key={index}>
                  <td>{schedule.workName}</td>
                  <td>{schedule.startTime}</td>
                  <td>{schedule.endTime}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        {showNote && (
          <div>
            <textarea
              value={noteText}
              onChange={handleNoteChange}
              placeholder="Enter your note here..."
            />
          </div>
        )}
      </div>
    </>
  );
};

export default App;
