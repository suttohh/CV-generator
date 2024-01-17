import './CVBuilder.css';
import Resume from './Resume.jsx';
import ResumeTools from './ResumeTools.jsx';
import { v4 as uuidv4 } from 'uuid';
import { useState } from "react";

function CVBuilder() {
  const uowEntry = {
    id: 1,
    title: "University of Wollongong",
    role: "Web Application Engineer",
    date: "Jul 2019 - Apr 2022",
    location: "Wollongong, Australia",
    paragraph: (
    <>▪ Design and development of web applications using the Appian platform.
    <br/>
    <span className="tabbed-content">▪ Front-end design and development using Appian Interfaces.</span><br/>
    <span className="tabbed-content">▪ Back-end development using Appian expressions, process models, web APIs and integrations.</span><br/>
    <span className="tabbed-content">▪ Database design and development using MySQL.</span></>)
  }

  const kidsUpEntry = {
    id: 2,
    title: "KidsUp",
    role: "English Teacher",
    date: "May 2023 - Nov 2023",
    location: "Tokyo, Japan",
    paragraph: "I hated this position"
  }

  const [workEntries, setWorkEntries] = useState([uowEntry, kidsUpEntry]);

  const onWorkEntryChange = (id, newEntry) => {
    setWorkEntries(workEntries.map(entry => {
      if(entry.id == id) {
        return newEntry;
      } else {
        return entry;
      }
    }));
  };

  const uowEducation = {
    id: uuidv4(),
    title: "University of Wollongong",
    role: "Bachelor of Computer Science (Cybersecurity)",
    date: "Graduated Nov 2019",
    location: "Wollongong, Australia"
  }

  const [educationEntries, setEducationEntries] = useState([uowEducation]);

  const onEducationEntryChange = (id, newEntry) => {
    setEducationEntries(educationEntries.map(entry => {
      if(entry.id == id) {
        return newEntry;
      } else {
        return entry;
      }
    }));
  };

  const lsiList = [{
    id: uuidv4(),
    paragraph: <>▪ Design and development</>
  }];
  return (
    <div className="cv-builder">
      <ResumeTools workEntries={workEntries} onWorkEntryChange={onWorkEntryChange} educationEntries={educationEntries} onEducationEntryChange={onEducationEntryChange}/>
      <Resume workEntries={workEntries} educationEntries={educationEntries} lsiList={lsiList}/>
    </div>
  );
}

export default CVBuilder;
