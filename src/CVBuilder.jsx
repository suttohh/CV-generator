import './CVBuilder.css';
import Resume from './Resume.jsx';
import ResumeTools from './ResumeTools.jsx';
import { v4 as uuidv4 } from 'uuid';
import { useState } from "react";

function CVBuilder() {
  const [generalInfo, setGeneralInfo] = useState({
    id: uuidv4(),
    name: "Justin Sutton",
    email: "justin_sutton98@outlook.com",
    number: "0477962174",
    location: "Parkes, NSW"
  });

  const onGeneralInfoChange = (id, newGeneralInfo) => {
    setGeneralInfo(newGeneralInfo);
  };

  const uowEntry = {
    id: uuidv4(),
    title: "University of Wollongong",
    role: "Web Application Engineer",
    date: "Jul 2019 - Apr 2022",
    location: "Wollongong, Australia",
    paragraph: "▪ Design and development of web applications using the Appian platform.▪ Front-end design and development using Appian Interfaces.▪ Back-end development using Appian expressions, process models, web APIs and integrations.▪ Database design and development using MySQL."
  };

  const kidsUpEntry = {
    id: uuidv4(),
    title: "KidsUp",
    role: "English Teacher",
    date: "May 2023 - Nov 2023",
    location: "Tokyo, Japan",
    paragraph: "I hated this position"
  };

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
  };

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

  const [lsi, setLSI] = useState({
    id: uuidv4(),
    paragraph: "Design and developmen"
  });

  const onLSIChange = (id, newLSI) => {
    setLSI({
      id: id,
      title: newLSI.title,
      paragraph: newLSI.paragraph
    });
  };
  return (
    <div className="cv-builder">
      <ResumeTools generalInfo={generalInfo} onGeneralInfoChange={onGeneralInfoChange} workEntries={workEntries} onWorkEntryChange={onWorkEntryChange} educationEntries={educationEntries} onEducationEntryChange={onEducationEntryChange} lsi={lsi} onLSIChange={onLSIChange}/>
      <Resume generalInfo={generalInfo} workEntries={workEntries} educationEntries={educationEntries} lsiList={[lsi]}/>
    </div>
  );
}

export default CVBuilder;
