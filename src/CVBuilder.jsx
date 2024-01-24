import './CVBuilder.css';
import Resume from './Resume.jsx';
import ResumeTools from './ResumeTools.jsx';
import { v4 as uuidv4 } from 'uuid';
import { useState } from "react";

function CVBuilder() {
  const [generalInfo, setGeneralInfo] = useState({
    id: uuidv4(),
    name: "",
    email: "",
    number: "",
    location: ""
  });

  const onGeneralInfoChange = (id, newGeneralInfo) => {
    setGeneralInfo(newGeneralInfo);
  };

  const [sections, setSections] = useState([]);
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
