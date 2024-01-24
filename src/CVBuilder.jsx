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
    isEditing: false,
    title: "University of Wollongong",
    role: "Web Application Engineer",
    date: "Jul 2019 - Apr 2022",
    location: "Wollongong, Australia",
    paragraph: "▪ Design and development of web applications using the Appian platform.▪ Front-end design and development using Appian Interfaces.▪ Back-end development using Appian expressions, process models, web APIs and integrations.▪ Database design and development using MySQL."
  };

  const kidsUpEntry = {
    id: uuidv4(),
    isEditing: false,
    title: "KidsUp",
    role: "English Teacher",
    date: "May 2023 - Nov 2023",
    location: "Tokyo, Japan",
    paragraph: "I hated this position"
  };

  const workEntries = [uowEntry, kidsUpEntry];

  const uowEducation = {
    id: uuidv4(),
    isEditing: false,
    title: "University of Wollongong",
    role: "Bachelor of Computer Science (Cybersecurity)",
    date: "Graduated Nov 2019",
    location: "Wollongong, Australia"
  };

  const educationEntries = [uowEducation];

  const lsi = {
    id: uuidv4(),
    paragraph: "Design and developmen"
  };

  const [sections, setSections] = useState([
    {
      id: uuidv4(),
      isFreeText: false,
      isEditing: false,
      name: "Work Experience",
      className: "work-experience",
      entries: workEntries
    }, 
    {
      id: uuidv4(),
      isFreeText: false,
      isEditing: false,
      name: "Education",
      className: "education",
      entries: educationEntries
    },
    {
      id: uuidv4(),
      isFreeText: true,
      isEditing: false,
      name: "Languages, Skills & Interests",
      className: "languages-skills-interests",
      entries: [lsi]
    }
  ]);
  const onSectionChangeHandler = (newSection, isDelete = false) => {
    const ids = sections.map(section => section.id);
    if(!ids.includes(newSection.id)) {
      setSections([...sections, newSection]);
    } else if(isDelete) {
      setSections(sections.filter((filterSection) => {
        return filterSection.id != newSection.id;
      }))
    } else {
      setSections(sections.map(section => {
        if(section.id == newSection.id) {
          return newSection;
        } else {
          return section;
        }
      }));
    }
  };
  const onSectionEntryChangeHandler = (sectionId, newEntry, isDelete = false) => {
    setSections(sections.map(section => {
      if(section.id == sectionId) {
        const ids = section.entries.map(entry => entry.id);
        if(!ids.includes(newEntry.id)) {
          return({...section, entries: [...section.entries, newEntry]});
        } else if(isDelete) {
          return {...section, entries: section.entries.filter((filterEntry) => {
            return filterEntry.id != newEntry.id;
          })}
        } else {
          return {...section,
            entries: section.entries.map(entry => {
              if(entry.id == newEntry.id) {
                  return newEntry;
              } else {
                  return entry;
              }
          })}
        }
      } else {
        return section;
      }
    }));
    return newEntry;
  }
  return (
    <div className="cv-builder">
      <ResumeTools generalInfo={generalInfo} onGeneralInfoChange={onGeneralInfoChange} sections={sections} onSectionChangeHandler={onSectionChangeHandler} onSectionEntryChangeHandler={onSectionEntryChangeHandler}/>
      <Resume generalInfo={generalInfo} sections={sections}/>
    </div>
  );
}

export default CVBuilder;
